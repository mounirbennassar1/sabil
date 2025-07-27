"use client"

import { useSession } from "next-auth/react"
import { useRouter, useParams } from "next/navigation"
import { useEffect, useState, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { 
  ClockIcon, 
  UsersIcon, 
  StarIcon,
  ArrowLeftIcon,
  PlayIcon,
  AcademicCapIcon,
  BookOpenIcon
} from "@heroicons/react/24/outline"

interface Course {
  id: string
  title: string
  description: string
  content: string
  thumbnail: string
  duration: number
  level: string
  category: {
    name: string
    color: string
  }
  _count: {
    enrollments: number
  }
}

export default function CoursePage() {
  const { data: session } = useSession()
  const router = useRouter()
  const params = useParams()
  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)
  const [enrolling, setEnrolling] = useState(false)

  const fetchCourse = useCallback(async () => {
    try {
      const response = await fetch(`/api/courses/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setCourse(data)
      } else {
        router.push('/dashboard')
      }
    } catch (error) {
      console.error("Error fetching course:", error)
      router.push('/dashboard')
    } finally {
      setLoading(false)
    }
  }, [params.id])

  useEffect(() => {
    if (params.id) {
      fetchCourse()
    }
  }, [params.id, fetchCourse])

  const handleEnroll = async () => {
    if (!session) {
      router.push('/auth/signin')
      return
    }

    setEnrolling(true)
    try {
      const response = await fetch('/api/enrollments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId: params.id,
        }),
      })

      if (response.ok) {
        // Redirect to learning interface or show success message
        router.push('/dashboard?tab=my-courses')
      } else {
        const data = await response.json()
        alert(data.message || 'Failed to enroll in course')
      }
    } catch (error) {
      console.error("Error enrolling in course:", error)
      alert('Network error. Please try again.')
    } finally {
      setEnrolling(false)
    }
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours}h ${mins}m`
    }
    return `${mins}m`
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'BEGINNER':
        return 'bg-green-100 text-green-800'
      case 'INTERMEDIATE':
        return 'bg-yellow-100 text-yellow-800'
      case 'ADVANCED':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#23544e]"></div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <BookOpenIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Course Not Found</h3>
          <p className="text-gray-600 mb-6">The course you&apos;re looking for doesn&apos;t exist.</p>
          <Link
            href="/dashboard"
            className="bg-[#23544e] text-white px-6 py-2 rounded-md hover:bg-[#1d453f] transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Image 
                src="/sabil.png" 
                alt="SABIL" 
                width={120}
                height={32}
                className="h-8 w-auto"
              />
              <span className="ml-2 text-sm text-gray-500">Learning Portal</span>
            </div>
            
            <Link
              href="/dashboard"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Course Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Course Image */}
              <div className="relative h-64 lg:h-80">
                <Image
                  src={course.thumbnail}
                  alt={course.title}
                  width={800}
                  height={400}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <div 
                    className="w-4 h-4 rounded-full mr-2 inline-block"
                    style={{ backgroundColor: course.category.color }}
                  ></div>
                  <span className="text-white text-sm font-medium bg-black/50 px-2 py-1 rounded">
                    {course.category.name}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getLevelColor(course.level)}`}>
                    {course.level}
                  </span>
                </div>
              </div>

              {/* Course Info */}
              <div className="p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {course.title}
                </h1>

                <div className="flex items-center space-x-6 mb-6 text-sm text-gray-500">
                  <div className="flex items-center">
                    <ClockIcon className="h-5 w-5 mr-2" />
                    {formatDuration(course.duration)}
                  </div>
                  <div className="flex items-center">
                    <UsersIcon className="h-5 w-5 mr-2" />
                    {course._count.enrollments} enrolled
                  </div>
                  <div className="flex items-center">
                    <StarIcon className="h-5 w-5 mr-2" />
                    {course.level}
                  </div>
                </div>

                <div className="prose max-w-none">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Course Description</h3>
                  <p className="text-gray-600 mb-6">
                    {course.description}
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3">What You'll Learn</h3>
                  <div className="text-gray-600 whitespace-pre-wrap">
                    {course.content}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-[#23544e] mb-2">Free</div>
                <p className="text-gray-600">Full access to course content</p>
              </div>

              <button
                onClick={handleEnroll}
                disabled={enrolling}
                className="w-full bg-[#23544e] text-white py-3 px-6 rounded-md hover:bg-[#1d453f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 mb-4"
              >
                {enrolling ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Enrolling...</span>
                  </>
                ) : (
                  <>
                    <PlayIcon className="h-5 w-5" />
                    <span>Enroll Now</span>
                  </>
                )}
              </button>

              <div className="border-t pt-6">
                <h4 className="font-semibold text-gray-900 mb-4">Course Includes:</h4>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-center">
                    <PlayIcon className="h-4 w-4 mr-3 text-[#23544e]" />
                    On-demand video content
                  </li>
                  <li className="flex items-center">
                    <BookOpenIcon className="h-4 w-4 mr-3 text-[#23544e]" />
                    Downloadable resources
                  </li>
                  <li className="flex items-center">
                    <AcademicCapIcon className="h-4 w-4 mr-3 text-[#23544e]" />
                    Certificate of completion
                  </li>
                  <li className="flex items-center">
                    <ClockIcon className="h-4 w-4 mr-3 text-[#23544e]" />
                    Lifetime access
                  </li>
                </ul>
              </div>

              <div className="border-t pt-6 mt-6">
                <h4 className="font-semibold text-gray-900 mb-4">Course Details:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{formatDuration(course.duration)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Level:</span>
                    <span className="font-medium">{course.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category:</span>
                    <span className="font-medium">{course.category.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Students:</span>
                    <span className="font-medium">{course._count.enrollments}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 