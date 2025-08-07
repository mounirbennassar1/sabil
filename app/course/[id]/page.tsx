"use client"

import { useSession } from "next-auth/react"
import { useRouter, useParams } from "next/navigation"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import coursesData from "@/scripts/couses_seed.json"
import { 
  HomeIcon,
  BookOpenIcon,
  AcademicCapIcon,
  DocumentTextIcon,
  UserIcon,
  BoltIcon,
  CodeBracketIcon,
  ShieldCheckIcon,
  QuestionMarkCircleIcon,
  ArrowLeftIcon,
  PlayIcon,
  ShareIcon,
  HeartIcon,
  StarIcon,
  ClockIcon,
  UsersIcon,
  CheckIcon,
  ArrowRightOnRectangleIcon
} from "@heroicons/react/24/outline"
import { signOut } from "next-auth/react"

interface Course {
  id: string
  title: string
  description: string
  long_description: string
  thumbnail: string
  duration: string
  level: string
  category: string
  sub_category: string
  price: number
  discount_price: number
  rating: number
  total_reviews: number
  total_students: number
  instructor: {
    name: string
    bio: string
    profile_picture: string
  }
  requirements: string[]
  what_you_will_learn: string[]
  sections: Array<{
    id: number
    title: string
    lectures: Array<{
      id: number
      title: string
      duration: string
      video_url: string
      is_preview: boolean
    }>
  }>
}

// Get course data from JSON
const getCourseData = (courseId: string): Course | null => {
  const course = coursesData.courses.find(c => c.id.toString() === courseId)
  return course ? {
    id: course.id.toString(),
    title: course.title,
    description: course.description,
    long_description: course.long_description,
    thumbnail: course.thumbnail,
    duration: course.duration,
    level: course.level,
    category: course.category,
    sub_category: course.sub_category,
    price: course.price,
    discount_price: course.discount_price,
    rating: course.rating,
    total_reviews: course.total_reviews,
    total_students: course.total_students,
    instructor: course.instructor,
    requirements: course.requirements,
    what_you_will_learn: course.what_you_will_learn,
    sections: course.sections
  } : null
}

export default function CourseDetailPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const params = useParams()
  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)
  const [enrolling, setEnrolling] = useState(false)

  useEffect(() => {
    if (!session) {
      router.push('/auth/signin')
      return
    }

    if (params.id) {
      const courseData = getCourseData(params.id as string)
      if (courseData) {
        setCourse(courseData)
      } else {
        router.push('/dashboard')
      }
      setLoading(false)
    }
  }, [session, params.id, router])

  const handleStartLearning = async () => {
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
        // Redirect to learning interface
        router.push(`/course/${params.id}/learn`)
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

  if (!session) {
    return <div>Redirecting...</div>
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
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h1>
          <Link
            href="/dashboard"
            className="bg-[#23544e] text-white px-6 py-2 rounded-md hover:bg-[#0b867a] transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="p-2 text-gray-400 hover:text-gray-600 lg:hidden"
              >
                <ArrowLeftIcon className="h-6 w-6" />
              </button>
              <Link href="/dashboard" className="flex items-center space-x-3">
                                <Image 
                  src="/logo.png" 
                  alt="Neom Green Hydrogen Logo" 
                  width={32}
                  height={32}
                  className="rounded-lg"
                />
                <span className="text-xl font-bold text-[#23544e]">Neom Green Hydrogen</span>
              </Link>
              <div className="hidden lg:block text-sm text-gray-500">
                / {course.title}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-3">
                <Image
                  src={session?.user?.image || '/placeholder-avatar.svg'}
                  alt="Profile"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span className="text-sm font-medium text-gray-700">
                  {session?.user?.name}
                </span>
              </div>
              <button
                onClick={() => signOut()}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
          <nav className="px-3 py-4 space-y-1">
            <Link
              href="/dashboard"
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-[#23544e] hover:bg-gray-50 rounded-lg transition-colors"
            >
              <HomeIcon className="h-5 w-5 mr-3" />
              Home
            </Link>
            <Link
              href="/dashboard?tab=my-learning"
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-[#23544e] hover:bg-gray-50 rounded-lg transition-colors"
            >
              <BookOpenIcon className="h-5 w-5 mr-3" />
              My Career Journey
            </Link>
            <Link
              href="/dashboard?tab=my-learning"
              className="flex items-center px-3 py-2 text-sm font-medium text-[#23544e] bg-[#23544e]/10 rounded-lg"
            >
              <AcademicCapIcon className="h-5 w-5 mr-3" />
              Learn
            </Link>
            <Link
              href="/dashboard?tab=my-courses"
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-[#23544e] hover:bg-gray-50 rounded-lg transition-colors"
            >
              <DocumentTextIcon className="h-5 w-5 mr-3" />
              My Library
            </Link>
            <Link
              href="/content"
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-[#23544e] hover:bg-gray-50 rounded-lg transition-colors"
            >
              <UserIcon className="h-5 w-5 mr-3" />
              Content
            </Link>
            <Link
              href="/ai"
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-[#23544e] hover:bg-gray-50 rounded-lg transition-colors"
            >
              <BoltIcon className="h-5 w-5 mr-3" />
              Apply AI
            </Link>
            <Link
              href="/coding"
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-[#23544e] hover:bg-gray-50 rounded-lg transition-colors"
            >
              <CodeBracketIcon className="h-5 w-5 mr-3" />
              Coding Practice
            </Link>
            <Link
              href="/certificates"
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-[#23544e] hover:bg-gray-50 rounded-lg transition-colors"
            >
              <ShieldCheckIcon className="h-5 w-5 mr-3" />
              Certifications
            </Link>
          </nav>

          <div className="px-3 py-4 border-t border-gray-200 mt-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Trending topics
            </h3>
            <div className="space-y-1">
              <Link href="#" className="block px-3 py-2 text-sm text-gray-600 hover:text-[#23544e] hover:bg-gray-50 rounded-lg transition-colors">
                Leadership and Management
              </Link>
              <Link href="#" className="block px-3 py-2 text-sm text-gray-600 hover:text-[#23544e] hover:bg-gray-50 rounded-lg transition-colors">
                Artificial Intelligence
              </Link>
              <Link href="#" className="block px-3 py-2 text-sm text-gray-600 hover:text-[#23544e] hover:bg-gray-50 rounded-lg transition-colors">
                Cybersecurity
              </Link>
            </div>
          </div>

          <div className="px-3 py-4 border-t border-gray-200">
            <Link
              href="/help"
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-[#23544e] hover:bg-gray-50 rounded-lg transition-colors"
            >
              <QuestionMarkCircleIcon className="h-5 w-5 mr-3" />
              Help
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Course Hero Section */}
          <div className="relative h-96 bg-gradient-to-r from-[#23544e] to-[#0b867a]">
            <div className="absolute inset-0">
              <Image
                src={course.thumbnail}
                alt={course.title}
                fill
                className="object-cover opacity-20"
              />
            </div>
            <div className="relative h-full flex items-center">
              <div className="max-w-4xl mx-auto px-6 text-white">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                    {course.category}
                  </span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                    {course.sub_category}
                  </span>
                </div>
                
                <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
                <p className="text-xl text-white/90 mb-6 max-w-2xl">
                  {course.description}
                </p>
                
                <div className="flex items-center space-x-6 mb-8">
                  <div className="flex items-center space-x-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(course.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-white/40'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-white/90 ml-2">
                      {course.rating} ({course.total_reviews.toLocaleString()} reviews)
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 text-white/90">
                    <UsersIcon className="h-5 w-5" />
                    <span>{course.total_students.toLocaleString()} students</span>
                  </div>
                  <div className="flex items-center space-x-1 text-white/90">
                    <ClockIcon className="h-5 w-5" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl font-bold">${course.discount_price}</div>
                    <div className="text-xl text-white/60 line-through">${course.price}</div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={handleStartLearning}
                      disabled={enrolling}
                      className="bg-white text-[#23544e] px-8 py-3 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 font-semibold"
                    >
                      {enrolling ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#23544e]"></div>
                          <span>Starting...</span>
                        </>
                      ) : (
                        <>
                          <PlayIcon className="h-5 w-5" />
                          <span>Start Learning</span>
                        </>
                      )}
                    </button>
                    
                    <button className="bg-white/10 text-white px-6 py-3 rounded-full hover:bg-white/20 transition-colors flex items-center space-x-2">
                      <PlayIcon className="h-4 w-4" />
                      <span>Preview</span>
                    </button>
                    
                    <button className="bg-white/10 text-white p-3 rounded-full hover:bg-white/20 transition-colors">
                      <ShareIcon className="h-5 w-5" />
                    </button>
                    
                    <button className="bg-white/10 text-white p-3 rounded-full hover:bg-white/20 transition-colors">
                      <HeartIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Course Content */}
          <div className="max-w-4xl mx-auto px-6 py-8">
            {/* Instructor Info */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Your Instructor</h2>
              <div className="flex items-center space-x-4">
                <Image
                  src={course.instructor.profile_picture}
                  alt={course.instructor.name}
                  width={64}
                  height={64}
                  className="rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{course.instructor.name}</h3>
                  <p className="text-gray-600 mt-1">{course.instructor.bio}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Course Description */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">About this course</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">{course.long_description}</p>
                </div>

                {/* What You'll Learn */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">What you&apos;ll learn</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {course.what_you_will_learn.map((item, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckIcon className="h-5 w-5 text-[#0b867a] mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Course Content */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Course Content</h2>
                  <div className="space-y-4">
                    {course.sections.map((section, index) => (
                      <div key={section.id} className="border border-gray-200 rounded-lg">
                        <div className="p-4 bg-gray-50 font-medium text-gray-900">
                          Section {index + 1}: {section.title}
                        </div>
                        <div className="divide-y divide-gray-200">
                          {section.lectures.map((lecture) => (
                            <div key={lecture.id} className="p-4 flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <PlayIcon className="h-4 w-4 text-gray-400" />
                                <span className="text-gray-700">{lecture.title}</span>
                                {lecture.is_preview && (
                                  <span className="bg-[#23544e] text-white px-2 py-1 text-xs rounded">
                                    Preview
                                  </span>
                                )}
                              </div>
                              <span className="text-sm text-gray-500">{lecture.duration}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Course Stats */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Course includes</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <ClockIcon className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-700">{course.duration} on-demand video</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <DocumentTextIcon className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-700">{course.sections.length} sections</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <PlayIcon className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-700">
                        {course.sections.reduce((total, section) => total + section.lectures.length, 0)} lectures
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <AcademicCapIcon className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-700">Certificate of completion</span>
                    </div>
                  </div>
                </div>

                {/* Requirements */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Requirements</h3>
                  <div className="space-y-2">
                    {course.requirements.map((req, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700 text-sm">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 