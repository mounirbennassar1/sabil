import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

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

    // Dummy enrollment - just return success
    console.log(`User ${session.user.email} enrolled in course ${courseId}`)
    
    return NextResponse.json({
      message: "Successfully enrolled in course",
      enrollment: {
        id: `dummy-${Date.now()}`,
        userId: session.user.id,
        courseId: courseId,
        enrolledAt: new Date(),
        progress: 0
      }
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

    // Dummy enrollments - return empty array for now
    return NextResponse.json([])
  } catch (error) {
    console.error("Error fetching enrollments:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
} 