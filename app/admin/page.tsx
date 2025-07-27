"use client"

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Image from "next/image"
import { 
  UserGroupIcon,
  BookOpenIcon,
  AcademicCapIcon,
  ChartBarIcon,
  Cog6ToothIcon
} from "@heroicons/react/24/outline"
// Chart imports commented out for future use
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart } from "recharts"

interface DashboardStats {
  totalUsers: number
  totalCourses: number
  totalEnrollments: number
  totalCertificates: number
  activeUsers: number
  completionRate: number
}

interface User {
  id: string
  name: string
  email: string
  role: string
  department: string
  createdAt: string
}

interface Course {
  id: string
  title: string
  status: string
  enrollments: number
  category: {
    name: string
  }
}

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "loading") return

    if (!session) {
      router.push("/auth/signin")
      return
    }

    if (session.user.role !== "ADMIN") {
      router.push("/dashboard")
      return
    }

    fetchDashboardData()
  }, [session, status, router])

  const fetchDashboardData = async () => {
    try {
          // Fetch stats (commented out for future implementation)
    // const statsResponse = await fetch("/api/admin/stats")
    // if (statsResponse.ok) {
    //   const statsData = await statsResponse.json()
    //   setStats(statsData)
    // }

    // Fetch users (commented out for future implementation)
    // const usersResponse = await fetch("/api/admin/users")
    // if (usersResponse.ok) {
    //   const usersData = await usersResponse.json()
    //   setUsers(usersData)
    // }

    // Fetch courses (commented out for future implementation)
    // const coursesResponse = await fetch("/api/admin/courses")
    // if (coursesResponse.ok) {
    //   const coursesData = await coursesResponse.json()
    //   setCourses(coursesData)
    // }
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#23544e]"></div>
      </div>
    )
  }

  // Mock data for charts (commented out for future use)
  // const enrollmentData = [
  //   { month: 'Jan', enrollments: 0 },
  //   { month: 'Feb', enrollments: 0 },
  //   { month: 'Mar', enrollments: 0 },
  //   { month: 'Apr', enrollments: 0 },
  //   { month: 'May', enrollments: 0 },
  //   { month: 'Jun', enrollments: 0 },
  // ]

       // const departmentData = [
  //   { name: 'Engineering', value: 0, color: '#23544e' },
  //   { name: 'Marketing', value: 0, color: '#0b867a' },
  //   { name: 'HR', value: 0, color: '#4a90e2' },
  //   { name: 'Sales', value: 0, color: '#f39c12' },
  //   { name: 'Other', value: 0, color: '#e74c3c' },
  // ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Image 
                src="/sabil.png" 
                alt="SABIL" 
                width={100}
                height={32}
                className="h-8 w-auto"
              />
              <span className="ml-2 text-sm text-gray-500">Admin Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">{session?.user?.name}</span>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-gray-600">Welcome to the SABIL Learning Management System admin panel.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                     <div className="bg-white p-6 rounded-lg shadow border">
             <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Users</h3>
             <p className="text-3xl font-bold text-[#23544e]">1</p>
           </div>
           <div className="bg-white p-6 rounded-lg shadow border">
             <h3 className="text-lg font-semibold text-gray-900 mb-2">Courses</h3>
             <p className="text-3xl font-bold text-[#0b867a]">0</p>
           </div>
           <div className="bg-white p-6 rounded-lg shadow border">
             <h3 className="text-lg font-semibold text-gray-900 mb-2">Enrollments</h3>
             <p className="text-3xl font-bold text-[#f39c12]">0</p>
           </div>
           <div className="bg-white p-6 rounded-lg shadow border">
             <h3 className="text-lg font-semibold text-gray-900 mb-2">Certificates</h3>
             <p className="text-3xl font-bold text-[#e74c3c]">0</p>
           </div>
        </div>

        <div className="bg-white rounded-lg shadow border p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="bg-[#23544e] text-white px-6 py-3 rounded-md hover:bg-[#1d453f]">
              Create Course
            </button>
            <button className="bg-[#0b867a] text-white px-6 py-3 rounded-md hover:bg-[#0a766b]">
              Manage Users
            </button>
            <button className="bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700">
              View Reports
            </button>
          </div>
        </div>
      </main>
    </div>
  )
} 