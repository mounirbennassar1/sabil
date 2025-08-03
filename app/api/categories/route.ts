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
    
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
} 