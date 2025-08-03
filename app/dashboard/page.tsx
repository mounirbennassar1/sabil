"use client"

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { 
  HomeIcon,
  BriefcaseIcon,
  BookOpenIcon, 
  HeartIcon,
  StarIcon,
  AcademicCapIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SparklesIcon,
  CpuChipIcon
} from "@heroicons/react/24/outline"
import coursesData from "@/scripts/couses_seed.json"

interface Course {
  id: string
  title: string
  description: string
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
  _count?: {
    enrollments: number
  }
}

// Transform JSON course data to match the expected format
const transformCoursesData = () => {
  return coursesData.courses.map(course => ({
    id: course.id.toString(),
    title: course.title,
    description: course.description,
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
    _count: {
      enrollments: course.total_students
    }
  }))
}

// Categories based on the course data
const categories = [
  { id: '1', name: 'Programming', description: 'Learn coding and software development', color: '#23544e', icon: '💻' },
  { id: '2', name: 'Data Science', description: 'Master data analysis and machine learning', color: '#0b867a', icon: '📊' },
  { id: '3', name: 'Design', description: 'Create beautiful digital experiences', color: '#8b5cf6', icon: '🎨' },
  { id: '4', name: 'Business', description: 'Develop business and leadership skills', color: '#f59e0b', icon: '💼' },
  { id: '5', name: 'IT & Software', description: 'Master technology and systems', color: '#ef4444', icon: '⚙️' },
  { id: '6', name: 'Office Productivity', description: 'Improve workplace efficiency', color: '#10b981', icon: '📈' }
]

export default function StudentDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  // Carousel refs
  const topPicksRef = useRef<HTMLDivElement>(null)
  const weeklyCoursesRef = useRef<HTMLDivElement>(null)
  const skillsCoursesRef = useRef<HTMLDivElement>(null)

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

    // Load courses from JSON data
    const transformedCourses = transformCoursesData()
    setCourses(transformedCourses)
    setLoading(false)
  }, [session, status, router])

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" })
  }

  const scrollCarousel = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = 320 // Width of one card plus margin
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  // Get courses by category for different sections
  const getTopPicksCourses = () => {
    return courses.filter(course => course.rating >= 4.8).slice(0, 8)
  }

  const getWeeklyCourses = () => {
    return courses.filter(course => course.category === 'Programming' || course.category === 'Data Science').slice(0, 8)
  }

  const getSkillsCourses = () => {
    return courses.filter(course => course.category === 'Design' || course.category === 'Business').slice(0, 8)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#23544e] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
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
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 text-gray-400 hover:text-gray-600 lg:hidden"
              >
                <ChevronLeftIcon className="h-6 w-6" />
              </button>
              <Link href="/dashboard" className="flex items-center space-x-3">
              <Image 
                src="/logo.png" 
              alt="NEOM Talent Platform" 
              width={32}
                height={32}
              className="rounded-lg"
              />
            <span className="text-xl font-bold text-[#23544e]">NEOM Talent Platform</span>
              </Link>
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
                onClick={handleSignOut}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <ChevronRightIcon className="h-5 w-5" />
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
              className="flex items-center px-3 py-2 text-sm font-medium text-[#23544e] bg-[#23544e]/10 rounded-lg"
            >
              <HomeIcon className="h-5 w-5 mr-3" />
              Home
            </Link>
            <Link
              href="/career"
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-[#23544e] hover:bg-gray-50 rounded-lg transition-colors"
            >
              <BriefcaseIcon className="h-5 w-5 mr-3" />
              My Career Journey
            </Link>
            <Link
              href="/learn"
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-[#23544e] hover:bg-gray-50 rounded-lg transition-colors"
            >
              <BookOpenIcon className="h-5 w-5 mr-3" />
              Learn
            </Link>
            <Link
              href="/library"
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-[#23544e] hover:bg-gray-50 rounded-lg transition-colors"
            >
              <HeartIcon className="h-5 w-5 mr-3" />
              My Library
            </Link>
            <Link
              href="/content"
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-[#23544e] hover:bg-gray-50 rounded-lg transition-colors"
            >
              <StarIcon className="h-5 w-5 mr-3" />
              Content
            </Link>
            <Link
              href="/ai"
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-[#23544e] hover:bg-gray-50 rounded-lg transition-colors"
            >
              <SparklesIcon className="h-5 w-5 mr-3" />
              Apply AI
            </Link>
            <Link
              href="/coding"
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-[#23544e] hover:bg-gray-50 rounded-lg transition-colors"
            >
              <CpuChipIcon className="h-5 w-5 mr-3" />
              Coding Practice
            </Link>
            <Link
              href="/certificates"
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-[#23544e] hover:bg-gray-50 rounded-lg transition-colors"
            >
              <AcademicCapIcon className="h-5 w-5 mr-3" />
              Certifications
            </Link>
          </nav>

          <div className="px-3 py-4 border-t border-gray-200 mt-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Trending topics
            </h3>
            <div className="space-y-1">
              <Link href="https://alison.com/lms/login" target="_blank" rel="noopener noreferrer" className="block px-3 py-2 text-sm text-gray-600 hover:text-[#23544e] hover:bg-gray-50 rounded-lg transition-colors">
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
              <ChevronRightIcon className="h-5 w-5 mr-3" />
              Help
            </Link>
          </div>
        </div>

      {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Hello, {session?.user?.name}!
              </h1>
              <p className="text-lg text-gray-600">
                Ready to grow your skills and advance your career with Neon Green Hydrogen Learning?
              </p>
            </div>

            {/* Top Picks Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Top picks for you</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => scrollCarousel(topPicksRef, 'left')}
                    className="p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-md hover:shadow-lg transition-all border border-gray-200"
                  >
                    <ChevronLeftIcon className="w-6 h-6 text-gray-600" />
                  </button>
                  <button
                    onClick={() => scrollCarousel(topPicksRef, 'right')}
                    className="p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-md hover:shadow-lg transition-all border border-gray-200"
                  >
                    <ChevronRightIcon className="w-6 h-6 text-gray-600" />
                  </button>
                </div>
              </div>
              <div
                ref={topPicksRef}
                className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4"
              >
                {getTopPicksCourses().map((course) => (
                  <Link
                    key={course.id}
                    href={`/course/${course.id}`}
                    className="flex-none w-80 h-80 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 overflow-hidden group"
                  >
                    <div className="relative h-48">
                      <Image
                        src={course.thumbnail}
                        alt={course.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                      <div className="absolute top-2 right-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#23544e] text-white">
                          {course.level}
                        </span>
                  </div>
                </div>
                    <div className="p-4 h-32 flex flex-col justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-2">
                          {course.title}
                        </h3>
                        <p className="text-xs text-gray-600 mb-2">
                          {course.instructor.name}
                    </p>
                  </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <StarIcon
                                key={i}
                                className={`h-3 w-3 ${
                                  i < Math.floor(course.rating)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-600">
                            {course.rating} ({course.total_reviews.toLocaleString()})
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-gray-900">
                            ${course.discount_price}
                          </div>
                          <div className="text-xs text-gray-500 line-through">
                            ${course.price}
                </div>
              </div>
                  </div>
                </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Weekly Courses Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Because you viewed programming courses</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => scrollCarousel(weeklyCoursesRef, 'left')}
                    className="p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-md hover:shadow-lg transition-all border border-gray-200"
                  >
                    <ChevronLeftIcon className="w-6 h-6 text-gray-600" />
                  </button>
                  <button
                    onClick={() => scrollCarousel(weeklyCoursesRef, 'right')}
                    className="p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-md hover:shadow-lg transition-all border border-gray-200"
                  >
                    <ChevronRightIcon className="w-6 h-6 text-gray-600" />
                  </button>
                </div>
              </div>
              <div
                ref={weeklyCoursesRef}
                className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4"
              >
                {getWeeklyCourses().map((course) => (
                  <Link
                    key={course.id}
                    href={`/course/${course.id}`}
                    className="flex-none w-80 h-80 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 overflow-hidden group"
                  >
                  <div className="relative h-48">
                    <Image
                      src={course.thumbnail}
                      alt={course.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                      <div className="absolute top-2 right-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#23544e] text-white">
                        {course.level}
                      </span>
                    </div>
                    </div>
                    <div className="p-4 h-32 flex flex-col justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-2">
                      {course.title}
                    </h3>
                        <p className="text-xs text-gray-600 mb-2">
                          {course.instructor.name}
                    </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <StarIcon
                                key={i}
                                className={`h-3 w-3 ${
                                  i < Math.floor(course.rating)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-600">
                            {course.rating} ({course.total_reviews.toLocaleString()})
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-gray-900">
                            ${course.discount_price}
                          </div>
                          <div className="text-xs text-gray-500 line-through">
                            ${course.price}
                          </div>
                        </div>
                      </div>
                    </div>
                    </Link>
                ))}
                </div>
            </div>

            {/* Skills Development Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Build essential skills</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => scrollCarousel(skillsCoursesRef, 'left')}
                    className="p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-md hover:shadow-lg transition-all border border-gray-200"
                  >
                    <ChevronLeftIcon className="w-6 h-6 text-gray-600" />
                  </button>
                  <button
                    onClick={() => scrollCarousel(skillsCoursesRef, 'right')}
                    className="p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-md hover:shadow-lg transition-all border border-gray-200"
                  >
                    <ChevronRightIcon className="w-6 h-6 text-gray-600" />
                  </button>
                </div>
              </div>
              <div
                ref={skillsCoursesRef}
                className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4"
              >
                {getSkillsCourses().map((course) => (
                  <Link
                    key={course.id}
                    href={`/course/${course.id}`}
                    className="flex-none w-80 h-80 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 overflow-hidden group"
                  >
                      <div className="relative h-48">
                        <Image
                          src={course.thumbnail}
                          alt={course.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                      <div className="absolute top-2 right-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#23544e] text-white">
                            {course.level}
                          </span>
                      </div>
                        </div>
                    <div className="p-4 h-32 flex flex-col justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-2">
                          {course.title}
                        </h3>
                        <p className="text-xs text-gray-600 mb-2">
                          {course.instructor.name}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <StarIcon
                                key={i}
                                className={`h-3 w-3 ${
                                  i < Math.floor(course.rating)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-600">
                            {course.rating} ({course.total_reviews.toLocaleString()})
                            </span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-gray-900">
                            ${course.discount_price}
                          </div>
                          <div className="text-xs text-gray-500 line-through">
                            ${course.price}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
                      </div>
                    </div>
                    
            {/* Categories Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore categories</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/courses?category=${category.name}`}
                    className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 group"
                  >
                    <div className="flex items-center space-x-4">
                      <div 
                        className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                        style={{ backgroundColor: `${category.color}20` }}
                      >
                        {category.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 group-hover:text-[#23544e] transition-colors">
                          {category.name}
                      </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {category.description}
                        </p>
                      </div>
                      <ChevronRightIcon className="h-5 w-5 text-gray-400 group-hover:text-[#23544e] transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 