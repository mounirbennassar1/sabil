import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import coursesData from "@/scripts/couses_seed.json"

export async function GET(
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
    
    // Find course in JSON data
    const courseData = coursesData.courses.find(c => c.id.toString() === courseId)
    
    if (!courseData) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 }
      )
    }

    // Return dummy enrollment with course data
    const dummyEnrollment = {
      id: `dummy-enrollment-${courseId}`,
      userId: session.user.id,
      courseId: courseId,
      enrolledAt: new Date(),
      progress: 15, // 15% progress for demo
      completedAt: null,
      course: {
        id: courseData.id.toString(),
        title: courseData.title,
        description: courseData.description,
        content: courseData.long_description,
        thumbnail: courseData.thumbnail,
        duration: 32, // Convert duration string to number for compatibility
        level: courseData.level,
        category: {
          name: courseData.category,
          color: '#23544e'
        }
      }
    }

    return NextResponse.json(dummyEnrollment)
  } catch (error) {
    console.error("Error fetching enrollment:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
} 