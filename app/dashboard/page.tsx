"use client"

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { 
  MagnifyingGlassIcon, 
  FunnelIcon, 
  BookOpenIcon, 
  AcademicCapIcon,
  ClockIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  StarIcon,
  PlayIcon,
  UsersIcon,
  TagIcon
} from "@heroicons/react/24/outline"

interface Category {
  id: string
  name: string
  description: string
  color: string
  icon: string
}

interface Course {
  id: string
  title: string
  description: string
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

interface Enrollment {
  id: string
  enrolledAt: string
  completedAt: string | null
  progress: number
  course: Course
}

interface Certificate {
  id: string
  number: string
  issuedAt: string
  course: {
    title: string
    level: string
    category: {
      name: string
      color: string
    }
  }
}

export default function StudentDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("catalog")
  const [categories, setCategories] = useState<Category[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [enrolledCourses, setEnrolledCourses] = useState<Enrollment[]>([])
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedLevel, setSelectedLevel] = useState<string>("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "loading") return

    if (!session) {
      router.push("/auth/signin")
      return
    }

    if (session.user.role === "ADMIN") {
      router.push("/admin")
      return
    }

    // Check for tab parameter in URL
    const params = new URLSearchParams(window.location.search)
    const tab = params.get('tab')
    if (tab && ['catalog', 'my-courses', 'certificates', 'progress'].includes(tab)) {
      setActiveTab(tab)
    }

    fetchData()
  }, [session, status, router])

  const fetchData = useCallback(async () => {
    try {
      // Fetch categories
      const categoriesResponse = await fetch("/api/categories")
      if (categoriesResponse.ok) {
        const categoriesData = await categoriesResponse.json()
        setCategories(categoriesData)
      }

      // Fetch courses
      const coursesResponse = await fetch("/api/courses")
      if (coursesResponse.ok) {
        const coursesData = await coursesResponse.json()
        setCourses(coursesData)
      }

      // Fetch enrolled courses if user is logged in
      if (session) {
        const enrollmentsResponse = await fetch("/api/enrollments")
        if (enrollmentsResponse.ok) {
          const enrollmentsData = await enrollmentsResponse.json()
          setEnrolledCourses(enrollmentsData)
        }

        // Fetch certificates
        const certificatesResponse = await fetch("/api/certificates")
        if (certificatesResponse.ok) {
          const certificatesData = await certificatesResponse.json()
          setCertificates(certificatesData)
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (status === "loading") return

    if (!session) {
      router.push("/auth/signin")
      return
    }

    if (session.user.role === "ADMIN") {
      router.push("/admin")
      return
    }

    const params = new URLSearchParams(window.location.search)
    const tab = params.get('tab')
    if (tab && ['catalog', 'my-courses', 'certificates', 'progress'].includes(tab)) {
      setActiveTab(tab)
    }

    fetchData()
  }, [session, status, router, fetchData])

  const fetchFilteredCourses = async () => {
    try {
      const params = new URLSearchParams()
      if (searchTerm) params.append('search', searchTerm)
      if (selectedCategory !== 'all') params.append('category', selectedCategory)
      if (selectedLevel !== 'all') params.append('level', selectedLevel)

      const response = await fetch(`/api/courses?${params.toString()}`)
      if (response.ok) {
        const data = await response.json()
        setCourses(data)
      }
    } catch (error) {
      console.error("Error fetching filtered courses:", error)
    }
  }

  useEffect(() => {
    if (!loading) {
      fetchFilteredCourses()
    }
  }, [searchTerm, selectedCategory, selectedLevel])

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" })
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

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#23544e]"></div>
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
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <UserIcon className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-700">{session?.user?.name}</span>
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                <ArrowRightOnRectangleIcon className="h-4 w-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-[#23544e] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'catalog', label: 'Course Catalog', icon: BookOpenIcon },
              { id: 'my-courses', label: 'My Courses', icon: PlayIcon },
              { id: 'certificates', label: 'Certificates', icon: AcademicCapIcon },
              { id: 'progress', label: 'Progress', icon: StarIcon },
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-1 pt-4 pb-3 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'border-b-2 border-white text-white'
                      : 'border-b-2 border-transparent text-white/70 hover:text-white hover:border-white/20'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'catalog' && (
          <div>
            {/* Welcome Section */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {session?.user?.name?.split(' ')[0]}!
              </h2>
              <p className="text-lg text-gray-600">
                Discover new courses and continue your learning journey.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <BookOpenIcon className="h-8 w-8 text-[#23544e]" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Available Courses</p>
                    <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <PlayIcon className="h-8 w-8 text-[#0b867a]" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Enrolled Courses</p>
                    <p className="text-2xl font-bold text-gray-900">{enrolledCourses.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <ClockIcon className="h-8 w-8 text-[#f39c12]" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Hours Learned</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {Math.floor(enrolledCourses.reduce((total, enrollment) => total + (enrollment.course?.duration || 0), 0) / 60)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <AcademicCapIcon className="h-8 w-8 text-[#e74c3c]" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Certificates</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {enrolledCourses.filter(e => e.completedAt).length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#23544e] focus:border-[#23544e]"
                  />
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2">
                    <FunnelIcon className="h-5 w-5 text-gray-400" />
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#23544e] focus:border-[#23544e]"
                    >
                      <option value="all">All Categories</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <TagIcon className="h-5 w-5 text-gray-400" />
                    <select
                      value={selectedLevel}
                      onChange={(e) => setSelectedLevel(e.target.value)}
                      className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#23544e] focus:border-[#23544e]"
                    >
                      <option value="all">All Levels</option>
                      <option value="BEGINNER">Beginner</option>
                      <option value="INTERMEDIATE">Intermediate</option>
                      <option value="ADVANCED">Advanced</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div key={course.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src={course.thumbnail}
                      alt={course.title}
                      width={400}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getLevelColor(course.level)}`}>
                        {course.level}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center mb-2">
                      <div 
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: course.category.color }}
                      ></div>
                      <span className="text-sm text-gray-500">{course.category.name}</span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {course.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {course.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        {formatDuration(course.duration)}
                      </div>
                      <div className="flex items-center">
                        <UsersIcon className="h-4 w-4 mr-1" />
                        {course._count.enrollments} enrolled
                      </div>
                    </div>
                    
                    <Link
                      href={`/course/${course.id}`}
                      className="block w-full text-center bg-[#23544e] text-white py-2 px-4 rounded-md hover:bg-[#1d453f] transition-colors"
                    >
                      View Course
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {courses.length === 0 && (
              <div className="text-center py-12">
                <BookOpenIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No courses found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'my-courses' && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">My Courses</h2>
            
            {enrolledCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledCourses.map((enrollment) => {
                  const course = enrollment.course
                  return (
                    <div key={enrollment.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                      <div className="relative h-48">
                        <Image
                          src={course.thumbnail}
                          alt={course.title}
                          width={400}
                          height={200}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 left-3">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getLevelColor(course.level)}`}>
                            {course.level}
                          </span>
                        </div>
                        <div className="absolute top-3 right-3">
                          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                            Enrolled
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <div className="flex items-center mb-2">
                          <div 
                            className="w-3 h-3 rounded-full mr-2"
                            style={{ backgroundColor: course.category.color }}
                          ></div>
                          <span className="text-sm text-gray-500">{course.category.name}</span>
                        </div>
                        
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                          {course.title}
                        </h3>
                        
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {course.description}
                        </p>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <div className="flex items-center">
                            <ClockIcon className="h-4 w-4 mr-1" />
                            {formatDuration(course.duration)}
                          </div>
                          <div className="flex items-center">
                            <span className="text-xs text-gray-500">
                              Enrolled {new Date(enrollment.enrolledAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Link
                            href={`/course/${course.id}/learn`}
                            className="flex-1 text-center bg-[#23544e] text-white py-2 px-4 rounded-md hover:bg-[#1d453f] transition-colors"
                          >
                            Continue Learning
                          </Link>
                          <Link
                            href={`/course/${course.id}`}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                          >
                            Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                <PlayIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Enrolled Courses</h3>
                <p className="text-gray-600 mb-6">
                  You haven&apos;t enrolled in any courses yet. Browse our catalog to get started!
                </p>
                <button
                  onClick={() => setActiveTab('catalog')}
                  className="bg-[#23544e] text-white px-6 py-2 rounded-md hover:bg-[#1d453f] transition-colors"
                >
                  Browse Courses
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'certificates' && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">My Certificates</h2>
            
            {certificates.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificates.map((certificate) => (
                  <div key={certificate.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative h-48 bg-gradient-to-br from-[#23544e] to-[#0b867a] flex items-center justify-center">
                      <div className="text-center text-white">
                        <AcademicCapIcon className="h-16 w-16 mx-auto mb-4 opacity-80" />
                        <h3 className="text-lg font-bold mb-2">Certificate of Completion</h3>
                        <p className="text-sm opacity-90">SABIL Learning Portal</p>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center mb-2">
                        <div 
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: certificate.course.category.color }}
                        ></div>
                        <span className="text-sm text-gray-500">{certificate.course.category.name}</span>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {certificate.course.title}
                      </h3>
                      
                      <div className="space-y-2 text-sm text-gray-600 mb-4">
                        <div className="flex justify-between">
                          <span>Certificate #:</span>
                          <span className="font-mono text-xs">{certificate.number}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Issued:</span>
                          <span>{new Date(certificate.issuedAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Level:</span>
                          <span className="font-medium">{certificate.course.level}</span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button className="flex-1 text-center bg-[#23544e] text-white py-2 px-4 rounded-md hover:bg-[#1d453f] transition-colors text-sm">
                          Download PDF
                        </button>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm">
                          Share
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                <AcademicCapIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Certificates Yet</h3>
                <p className="text-gray-600 mb-6">
                  Complete courses to earn certificates and showcase your achievements.
                </p>
                <button
                  onClick={() => setActiveTab('catalog')}
                  className="bg-[#23544e] text-white px-6 py-2 rounded-md hover:bg-[#1d453f] transition-colors"
                >
                  Start Learning
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'progress' && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Learning Progress</h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <StarIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Track Your Progress</h3>
              <p className="text-gray-600 mb-6">
                Your learning progress and achievements will be displayed here once you start taking courses.
              </p>
              <button
                onClick={() => setActiveTab('catalog')}
                className="bg-[#23544e] text-white px-6 py-2 rounded-md hover:bg-[#1d453f] transition-colors"
              >
                Begin Your Journey
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
} 