import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      )
    }

    const { courseId } = await request.json()

    if (!courseId) {
      return NextResponse.json(
        { message: "Course ID is required" },
        { status: 400 }
      )
    }

    // Check if course exists and is published
    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
        status: 'PUBLISHED'
      }
    })

    if (!course) {
      return NextResponse.json(
        { message: "Course not found or not available" },
        { status: 404 }
      )
    }

    // Check if user is already enrolled
    const existingEnrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: session.user.id,
          courseId: courseId
        }
      }
    })

    if (existingEnrollment) {
      return NextResponse.json(
        { message: "You are already enrolled in this course" },
        { status: 400 }
      )
    }

    // Create enrollment
    const enrollment = await prisma.enrollment.create({
      data: {
        userId: session.user.id,
        courseId: courseId,
        enrolledAt: new Date()
      }
    })

    return NextResponse.json({
      message: "Successfully enrolled in course",
      enrollment
    })
  } catch (error) {
    console.error("Error creating enrollment:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      )
    }

    const enrollments = await prisma.enrollment.findMany({
      where: {
        userId: session.user.id
      },
      include: {
        course: {
          include: {
            category: true,
            _count: {
              select: {
                enrollments: true
              }
            }
          }
        }
      },
      orderBy: {
        enrolledAt: 'desc'
      }
    })

    return NextResponse.json(enrollments)
  } catch (error) {
    console.error("Error fetching enrollments:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
} 