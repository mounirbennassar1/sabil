"use client"

import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {
  HomeIcon,
  BriefcaseIcon,
  BookOpenIcon,
  HeartIcon,
  StarIcon,
  AcademicCapIcon,
  ChevronRightIcon,
  SparklesIcon,
  CpuChipIcon,
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ClockIcon,
  UsersIcon,
  FunnelIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  UserGroupIcon,
  ArrowTrendingUpIcon,
  ChartBarIcon,
  MapIcon,
  CogIcon
} from '@heroicons/react/24/outline'
import coursesData from '@/scripts/couses_seed.json'

interface RawCourseData {
  id: number
  title: string
  description: string
  thumbnail: string
  duration: string
  level: string
  rating: number
  total_students: number
  category: string
  price: number
  instructor: {
    name: string
    profile_picture: string
  }
}

export default function LearnPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedLevel, setSelectedLevel] = useState('All')
  const topPicksRef = useRef<HTMLDivElement>(null)
  const newCoursesRef = useRef<HTMLDivElement>(null)
  
  // State for expandable menu sections
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({
    learningCapability: false,
    talentGrowth: false,
    talentInsight: false,
    futureStrategic: false,
    executionIntegration: false
  })

  const talentManagementSections = [
    {
      id: 'learningCapability',
      name: 'Learning & Capability',
      icon: BookOpenIcon,
      expanded: expandedSections.learningCapability,
      subItems: [
        { name: 'LMS Dashboard', href: '/dashboard/talent/lms-dashboard' },
        { name: 'Capability Assessment Tool', href: '/talent/capability-assessment' },
        { name: 'Gap Analysis View', href: '/dashboard/talent/gap-analysis' },
        { name: 'Courses', href: '/talent/courses' },
        { name: 'Course Categories', href: '/talent/course-categories' }
      ]
    },
    {
      id: 'talentGrowth',
      name: 'Talent Growth',
      icon: ArrowTrendingUpIcon,
      expanded: expandedSections.talentGrowth,
      subItems: [
        { name: 'Succession Planning Matrix', href: '/talent/succession-planning' },
        { name: 'Career Pathing Map', href: '/talent/career-pathing' },
        { name: 'Competency Framework', href: '/talent/competency-framework' }
      ]
    },
    {
      id: 'talentInsight',
      name: 'Talent Insight',
      icon: ChartBarIcon,
      expanded: expandedSections.talentInsight,
      subItems: [
        { name: 'Performance Analytics', href: '/talent/performance-analytics' },
        { name: 'Talent KPIs', href: '/talent/talent-kpis' },
        { name: 'Culture & Engagement', href: '/talent/culture-engagement' }
      ]
    },
    {
      id: 'futureStrategic',
      name: 'Future & Strategic',
      icon: MapIcon,
      expanded: expandedSections.futureStrategic,
      subItems: [
        { name: 'Workforce Planning', href: '/talent/workforce-planning' },
        { name: 'Personalized Learning', href: '/talent/personalized-learning' },
        { name: 'Internal Talent Marketplace', href: '/talent/talent-marketplace' }
      ]
    },
    {
      id: 'executionIntegration',
      name: 'Execution & Integration',
      icon: CogIcon,
      expanded: expandedSections.executionIntegration,
      subItems: [
        { name: 'Integration', href: '/talent/integrations' },
        { name: 'Change Management Plan', href: '/talent/change-management' },
        { name: 'ROI Tracking', href: '/talent/roi-tracking' }
      ]
    }
  ]

  const sidebarItems = [
    { name: 'Home', href: '/dashboard', icon: HomeIcon, current: false },
    { name: 'My Career Journey', href: '/career', icon: BriefcaseIcon, current: false, isSection: true },
    { name: 'Learn', href: '/learn', icon: BookOpenIcon, current: true, isSection: true },
    { name: 'My Library', href: '/library', icon: HeartIcon, current: false },
    { name: 'Content', href: '/content', icon: StarIcon, current: false },
    { name: 'Apply AI', href: '/ai', icon: SparklesIcon, current: false, isSection: true },
    { name: 'Coding Practice', href: '/coding', icon: CpuChipIcon, current: false },
    { name: 'Certifications', href: '/certificates', icon: AcademicCapIcon, current: false },
  ]

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  // Transform courses data for rendering
  const transformCoursesData = (coursesData: { courses: RawCourseData[] }) => {
    return coursesData.courses.map((course: RawCourseData) => ({
      id: course.id.toString(),
      title: course.title,
      description: course.description,
      thumbnail: course.thumbnail,
      duration: course.duration,
      level: course.level,
      rating: course.rating,
      students: course.total_students,
      category: course.category,
      price: course.price,
      instructor: {
        name: course.instructor.name,
        avatar: course.instructor.profile_picture
      }
    }))
  }

  const courses = transformCoursesData(coursesData)
  const categories = ['All', 'Programming', 'Data Science', 'Design', 'Business', 'Marketing']
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced']

  const scrollCarousel = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = 320
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  // Filter courses based on search and filters
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory
    const matchesLevel = selectedLevel === 'All' || course.level.includes(selectedLevel)
    
    return matchesSearch && matchesCategory && matchesLevel
  })

  const getTopPicksCourses = () => {
    return courses.filter(course => course.rating >= 4.8).slice(0, 8)
  }

  const getNewCourses = () => {
    return courses.slice(0, 8) // Simulate new courses
  }

  const learningPaths = [
    {
      title: 'Full-Stack Developer',
      description: 'Master frontend and backend technologies',
      courses: 8,
      duration: '6 months',
      level: 'Beginner to Advanced',
      color: 'bg-blue-500',
      icon: '💻'
    },
    {
      title: 'Data Scientist',
      description: 'Learn data analysis, ML, and AI',
      courses: 12,
      duration: '8 months',
      level: 'Intermediate',
      color: 'bg-green-500',
      icon: '📊'
    },
    {
      title: 'UI/UX Designer',
      description: 'Design beautiful user experiences',
      courses: 6,
      duration: '4 months',
      level: 'Beginner',
      color: 'bg-purple-500',
      icon: '🎨'
    },
    {
      title: 'Project Manager',
      description: 'Lead teams and deliver projects',
      courses: 5,
      duration: '3 months',
      level: 'Intermediate',
      color: 'bg-orange-500',
      icon: '📋'
    }
  ]

  useEffect(() => {
    if (!session) {
      router.push('/auth/signin')
      return
    }
    setLoading(false)
  }, [session, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#23544e]"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex-1 flex flex-col min-h-0 bg-white shadow-lg">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4 mb-8">
                <Link href="/dashboard" className="flex items-center space-x-3">
                  <Image 
                    src="/logo.png" 
                    alt="Neon Green Hydrogen Logo" 
                    width={32}
                    height={32}
                    className="rounded-lg"
                  />
                  <span className="text-xl font-bold text-[#23544e]">Neon Green Hydrogen</span>
                </Link>
              </div>
              <nav className="mt-5 flex-1 px-2 space-y-1">
                {/* Home */}
                <Link
                  href="/dashboard"
                  className="group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors text-gray-600 hover:text-[#23544e] hover:bg-gray-50"
                >
                  <HomeIcon className="mr-3 flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                  Home
                </Link>

                {/* Talent Management Strategy Header */}
                <div className="pt-4 pb-2">
                  <div className="flex items-center px-3">
                    <UserGroupIcon className="mr-2 h-5 w-5 text-[#23544e]" />
                    <h3 className="text-sm font-semibold text-[#23544e] uppercase tracking-wider">
                      Talent Management Strategy
                    </h3>
                  </div>
                </div>

                {/* Strategy Overview Link */}
                <Link
                  href="/dashboard/talent-strategy"
                  className="group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors text-gray-600 hover:text-[#23544e] hover:bg-gray-50"
                >
                  <MapIcon className="mr-3 flex-shrink-0 h-5 w-5 text-[#23544e]" />
                  Strategy Overview
                </Link>

                {/* Talent Management Sections */}
                {talentManagementSections.map((section) => (
                  <div key={section.id} className="space-y-1">
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="w-full group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors text-gray-700 hover:text-[#23544e] hover:bg-gray-50"
                    >
                      <div className="flex items-center">
                        <section.icon className="mr-3 flex-shrink-0 h-5 w-5 text-[#23544e]" />
                        {section.name}
                      </div>
                      {section.expanded ? (
                        <ChevronUpIcon className="h-4 w-4 text-gray-400" />
                      ) : (
                        <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                    
                    {section.expanded && (
                      <div className="ml-6 space-y-1">
                        {section.subItems.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="group flex items-center px-3 py-2 text-sm rounded-lg transition-colors text-gray-600 hover:text-[#23544e] hover:bg-gray-50"
                          >
                            <div className="mr-3 flex-shrink-0 w-2 h-2 bg-gray-300 rounded-full group-hover:bg-[#23544e]"></div>
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {/* Divider */}
                <div className="pt-4 border-t border-gray-200"></div>

                {/* Rest of sidebar items */}
                {sidebarItems.slice(1).map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      item.current
                        ? 'bg-[#23544e] text-white'
                        : item.isSection
                        ? 'text-gray-900 hover:text-[#23544e] hover:bg-gray-50 font-medium'
                        : 'text-gray-600 hover:text-[#23544e] hover:bg-gray-50'
                    }`}
                  >
                    <item.icon
                      className={`mr-3 flex-shrink-0 h-5 w-5 ${
                        item.current 
                          ? 'text-white' 
                          : item.isSection 
                          ? 'text-[#23544e]' 
                          : 'text-gray-400 group-hover:text-gray-500'
                      }`}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-hidden">
        <div className="flex flex-col h-screen">
          {/* Top header */}
          <div className="bg-white shadow-sm border-b border-gray-200">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center space-x-4">
                  <div className="flex lg:hidden">
                    <Link href="/dashboard" className="flex items-center space-x-2">
                      <Image 
                        src="/logo.png" 
                        alt="Neon Green Hydrogen Logo" 
                        width={32}
                        height={32}
                        className="rounded-lg"
                      />
                      <span className="text-xl font-bold text-[#23544e]">Neon Green Hydrogen</span>
                    </Link>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BookOpenIcon className="h-6 w-6 text-[#23544e]" />
                    <h1 className="text-xl font-bold text-gray-900">Learn</h1>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-3">
                    <Image
                      src={session?.user?.image || '/placeholder-avatar.svg'}
                      alt="Profile"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <div className="hidden md:block">
                      <p className="text-sm font-medium text-gray-900">{session?.user?.name}</p>
                      <p className="text-xs text-gray-500">{session?.user?.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Page content */}
          <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
              {/* Welcome Section */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Expand Your Knowledge</h2>
                <p className="text-lg text-gray-600">Discover courses, learning paths, and skills to advance your career</p>
              </div>

              {/* Search and Filters */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search courses..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#23544e]"
                    />
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <FunnelIcon className="h-5 w-5 text-gray-400" />
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#23544e]"
                      >
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                    <select
                      value={selectedLevel}
                      onChange={(e) => setSelectedLevel(e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#23544e]"
                    >
                      {levels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Learning Paths */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Learning Paths</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {learningPaths.map((path, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                      <div className={`${path.color} p-4 text-white text-center`}>
                        <div className="text-3xl mb-2">{path.icon}</div>
                        <h4 className="font-bold text-lg">{path.title}</h4>
                      </div>
                      <div className="p-4">
                        <p className="text-gray-600 text-sm mb-3">{path.description}</p>
                        <div className="space-y-1 text-xs text-gray-500">
                          <div className="flex justify-between">
                            <span>Courses:</span>
                            <span>{path.courses}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Duration:</span>
                            <span>{path.duration}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Level:</span>
                            <span>{path.level}</span>
                          </div>
                        </div>
                        <button className="w-full mt-4 bg-[#23544e] text-white py-2 rounded-lg hover:bg-[#1d453f] transition-colors">
                          Start Path
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Picks Section */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">Top Picks for You</h3>
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
                      className="flex-none w-80 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="relative h-48">
                        <Image
                          src={course.thumbnail}
                          alt={course.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">{course.title}</h4>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{course.description}</p>
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                          <div className="flex items-center space-x-4">
                            <span className="flex items-center">
                              <ClockIcon className="h-4 w-4 mr-1" />
                              {course.duration}
                            </span>
                            <span className="flex items-center">
                              <UsersIcon className="h-4 w-4 mr-1" />
                              {course.students.toLocaleString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <StarIcon
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(course.rating)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                            <span className="ml-1 text-sm text-gray-600">{course.rating}</span>
                          </div>
                          <span className="px-2 py-1 bg-[#23544e]/10 text-[#23544e] text-xs font-medium rounded">
                            {course.level}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* New Courses Section */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">New Courses</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => scrollCarousel(newCoursesRef, 'left')}
                      className="p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-md hover:shadow-lg transition-all border border-gray-200"
                    >
                      <ChevronLeftIcon className="w-6 h-6 text-gray-600" />
                    </button>
                    <button
                      onClick={() => scrollCarousel(newCoursesRef, 'right')}
                      className="p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-md hover:shadow-lg transition-all border border-gray-200"
                    >
                      <ChevronRightIcon className="w-6 h-6 text-gray-600" />
                    </button>
                  </div>
                </div>
                <div
                  ref={newCoursesRef}
                  className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4"
                >
                  {getNewCourses().map((course) => (
                    <Link
                      key={course.id}
                      href={`/course/${course.id}`}
                      className="flex-none w-80 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="relative h-48">
                        <Image
                          src={course.thumbnail}
                          alt={course.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-2 left-2">
                          <span className="bg-green-500 text-white text-xs font-medium px-2 py-1 rounded">
                            NEW
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">{course.title}</h4>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{course.description}</p>
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                          <div className="flex items-center space-x-4">
                            <span className="flex items-center">
                              <ClockIcon className="h-4 w-4 mr-1" />
                              {course.duration}
                            </span>
                            <span className="flex items-center">
                              <UsersIcon className="h-4 w-4 mr-1" />
                              {course.students.toLocaleString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <StarIcon
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(course.rating)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                            <span className="ml-1 text-sm text-gray-600">{course.rating}</span>
                          </div>
                          <span className="px-2 py-1 bg-[#0b867a]/10 text-[#0b867a] text-xs font-medium rounded">
                            {course.level}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* All Courses Grid */}
              {(searchTerm || selectedCategory !== 'All' || selectedLevel !== 'All') && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">
                      Search Results ({filteredCourses.length} courses)
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses.map((course) => (
                      <Link
                        key={course.id}
                        href={`/course/${course.id}`}
                        className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <div className="relative h-48">
                          <Image
                            src={course.thumbnail}
                            alt={course.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">{course.title}</h4>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{course.description}</p>
                          <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                            <div className="flex items-center space-x-4">
                              <span className="flex items-center">
                                <ClockIcon className="h-4 w-4 mr-1" />
                                {course.duration}
                              </span>
                              <span className="flex items-center">
                                <UsersIcon className="h-4 w-4 mr-1" />
                                {course.students.toLocaleString()}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <StarIcon
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < Math.floor(course.rating)
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                              <span className="ml-1 text-sm text-gray-600">{course.rating}</span>
                            </div>
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                              {course.category}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 