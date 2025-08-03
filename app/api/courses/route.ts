import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    // Add connection check
    await prisma.$connect()
    
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const category = searchParams.get('category') || 'all'
    const level = searchParams.get('level') || 'all'

    const whereClause: Record<string, unknown> = {
      status: 'PUBLISHED'
    }

    if (search) {
      whereClause.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ]
    }

    if (category && category !== 'all') {
      whereClause.categoryId = category
    }

    if (level && level !== 'all') {
      whereClause.level = level
    }

    const courses = await prisma.course.findMany({
      where: whereClause,
      include: {
        category: true,
        _count: {
          select: {
            enrollments: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    console.log(`Found ${courses.length} courses`)
    return NextResponse.json(courses)
  } catch (error) {
    console.error("Error fetching courses:", error)
    
    // Return empty array instead of error object to prevent frontend crashes
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json([])
    }
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { message: "Internal server error", error: errorMessage },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
} 