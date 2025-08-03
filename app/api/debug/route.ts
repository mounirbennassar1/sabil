import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    // Check database connection and contents
    await prisma.$connect()
    
    const [categoriesCount, coursesCount, usersCount] = await Promise.all([
      prisma.category.count(),
      prisma.course.count(),
      prisma.user.count()
    ])
    
    const categories = await prisma.category.findMany({
      include: {
        courses: true
      }
    })
    
    const courses = await prisma.course.findMany({
      include: {
        category: true
      }
    })
    
    return NextResponse.json({
      status: 'connected',
      counts: {
        categories: categoriesCount,
        courses: coursesCount,
        users: usersCount
      },
      categories,
      courses
    })
  } catch (error) {
    console.error("Database debug error:", error)
    return NextResponse.json(
      { 
        status: 'error', 
        message: error instanceof Error ? error.message : 'Unknown error',
        error 
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}