"use client"

import { useSession } from "next-auth/react"
import { useRouter, useParams } from "next/navigation"
import { useEffect, useState, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { 
  ArrowLeftIcon,
  CheckCircleIcon,
  PlayIcon,
  BookOpenIcon,
  DocumentArrowDownIcon,
  AcademicCapIcon
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
}

interface Enrollment {
  id: string
  enrolledAt: string
  completedAt?: string
  progress: number
  course: Course
}

export default function CourseLearningPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const params = useParams()
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null)
  const [loading, setLoading] = useState(true)
  const [completing, setCompleting] = useState(false)

  useEffect(() => {
    if (!session) {
      router.push('/auth/signin')
      return
    }

    if (params.id) {
      fetchEnrollment()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, params.id])

  const fetchEnrollment = async () => {
    try {
      const response = await fetch(`/api/enrollments/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setEnrollment(data)
      } else {
        router.push('/dashboard?tab=my-courses')
      }
    } catch (error) {
      console.error("Error fetching enrollment:", error)
      router.push('/dashboard?tab=my-courses')
    } finally {
      setLoading(false)
    }
  }

  const handleComplete = async () => {
    if (!enrollment || enrollment.completedAt) return

    setCompleting(true)
    try {
      const response = await fetch(`/api/enrollments/${params.id}/complete`, {
        method: 'POST'
      })

      if (response.ok) {
        const updatedEnrollment = await response.json()
        setEnrollment(updatedEnrollment)
      }
    } catch (error) {
      console.error("Error completing course:", error)
    } finally {
      setCompleting(false)
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#23544e]"></div>
      </div>
    )
  }

  if (!enrollment) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <BookOpenIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Course Not Found</h3>
                      <p className="text-gray-600 mb-6">You are not enrolled in this course or it doesn&apos;t exist.</p>
          <Link
            href="/dashboard?tab=my-courses"
            className="bg-[#23544e] text-white px-6 py-2 rounded-md hover:bg-[#1d453f] transition-colors"
          >
            Back to My Courses
          </Link>
        </div>
      </div>
    )
  }

  const course = enrollment.course

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
            
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard?tab=my-courses"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                <ArrowLeftIcon className="h-4 w-4" />
                <span>My Courses</span>
              </Link>
              
              {enrollment.completedAt ? (
                <div className="flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-2 rounded-md text-sm font-medium">
                  <CheckCircleIcon className="h-4 w-4" />
                  <span>Completed</span>
                </div>
              ) : (
                <button
                  onClick={handleComplete}
                  disabled={completing}
                  className="bg-[#23544e] text-white px-4 py-2 rounded-md hover:bg-[#1d453f] transition-colors disabled:opacity-50 flex items-center space-x-2"
                >
                  {completing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Completing...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircleIcon className="h-4 w-4" />
                      <span>Mark Complete</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Course Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
              {/* Video Player */}
              <div className="relative bg-black aspect-video flex items-center justify-center">
                <Image
                  src={course.thumbnail}
                  alt={course.title}
                  fill
                  className="object-cover opacity-60"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-6">
                    <PlayIcon className="h-12 w-12 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h2 className="text-xl font-bold mb-1">{course.title}</h2>
                  <div className="flex items-center space-x-4 text-sm">
                    <span>{course.category.name}</span>
                    <span>•</span>
                    <span>{formatDuration(course.duration)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Content */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Course Content</h3>
              
              <div className="prose max-w-none">
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Overview</h4>
                  <p className="text-gray-600 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Learning Objectives</h4>
                  <div className="text-gray-600 whitespace-pre-wrap leading-relaxed">
                    {course.content}
                  </div>
                </div>
              </div>

              {/* Resources */}
              <div className="mt-8 pt-6 border-t">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Course Resources</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    <DocumentArrowDownIcon className="h-8 w-8 text-[#23544e] mr-3" />
                    <div>
                      <h5 className="font-medium text-gray-900">Course Materials</h5>
                      <p className="text-sm text-gray-500">Download supplementary materials</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    <BookOpenIcon className="h-8 w-8 text-[#23544e] mr-3" />
                    <div>
                      <h5 className="font-medium text-gray-900">Reading List</h5>
                      <p className="text-sm text-gray-500">Recommended reading materials</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
              <h4 className="font-semibold text-gray-900 mb-4">Course Progress</h4>
              
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progress</span>
                  <span>{enrollment.completedAt ? '100%' : '0%'}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-[#23544e] h-2 rounded-full transition-all duration-300"
                    style={{ width: enrollment.completedAt ? '100%' : '0%' }}
                  ></div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{formatDuration(course.duration)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Level:</span>
                  <span className="font-medium">{course.level}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium">{course.category.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Enrolled:</span>
                  <span className="font-medium">
                    {new Date(enrollment.enrolledAt).toLocaleDateString()}
                  </span>
                </div>
                {enrollment.completedAt && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Completed:</span>
                    <span className="font-medium text-green-600">
                      {new Date(enrollment.completedAt).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>

              {enrollment.completedAt && (
                <div className="border-t pt-6">
                  <div className="flex items-center justify-center p-4 bg-green-50 border border-green-200 rounded-lg">
                    <AcademicCapIcon className="h-8 w-8 text-green-600 mr-3" />
                    <div className="text-center">
                      <h5 className="font-medium text-green-900">Certificate Ready!</h5>
                      <p className="text-sm text-green-600">Download your certificate</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 