import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      )
    }

    const { courseId } = await params
    // Find the enrollment
    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: session.user.id,
          courseId
        }
      }
    })

    if (!enrollment) {
      return NextResponse.json(
        { message: "Enrollment not found" },
        { status: 404 }
      )
    }

    if (enrollment.completedAt) {
      return NextResponse.json(
        { message: "Course already completed" },
        { status: 400 }
      )
    }

    // Mark course as completed
    const updatedEnrollment = await prisma.enrollment.update({
      where: {
        id: enrollment.id
      },
      data: {
        completedAt: new Date(),
        progress: 100
      },
      include: {
        course: {
          include: {
            category: true
          }
        }
      }
    })

    // Create certificate with unique number
    const certificateNumber = `CERT-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    
    await prisma.certificate.create({
      data: {
        userId: session.user.id,
        courseId,
        number: certificateNumber,
        issuedAt: new Date()
      }
    })

    return NextResponse.json(updatedEnrollment)
  } catch (error) {
    console.error("Error completing course:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
} 