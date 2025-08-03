import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    // Add connection check
    await prisma.$connect()
    
    const categories = await prisma.category.findMany({
      orderBy: {
        name: 'asc'
      }
    })

    console.log(`Found ${categories.length} categories`)
    return NextResponse.json(categories)
  } catch (error) {
    console.error("Error fetching categories:", error)
    
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