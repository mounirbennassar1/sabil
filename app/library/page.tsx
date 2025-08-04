"use client"

import { useState, useEffect } from 'react'
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
  SparklesIcon,
  CpuChipIcon,
  ClockIcon,
  UsersIcon,
  BookmarkIcon,
  ArrowDownTrayIcon,
  PlayIcon,
  CheckCircleIcon,
  EyeIcon,
  UserGroupIcon,
  ArrowTrendingUpIcon,
  ChartBarIcon,
  MapIcon,
  CogIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@heroicons/react/24/outline'
import coursesData from '@/scripts/couses_seed.json'

export default function LibraryPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('enrolled')
  
  // Sidebar state
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
        { name: 'Talent KPIs', href: '/talent/kpis' },
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

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  // Mock enrolled courses (first 4 courses from the data)
  const enrolledCourses = coursesData.courses.slice(0, 4).map(course => ({
    id: course.id.toString(),
    title: course.title,
    description: course.description,
    thumbnail: course.thumbnail,
    duration: course.duration,
    level: course.level,
    rating: course.rating,
    students: course.total_students,
    category: course.category,
    progress: Math.floor(Math.random() * 100), // Random progress for demo
    lastWatched: new Date(Date.now() - Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000), // Random date within last week
    instructor: {
      name: course.instructor.name,
      avatar: course.instructor.profile_picture
    }
  }))

  // Mock bookmarked courses (next 3 courses)
  const bookmarkedCourses = coursesData.courses.slice(4, 7).map(course => ({
    id: course.id.toString(),
    title: course.title,
    description: course.description,
    thumbnail: course.thumbnail,
    duration: course.duration,
    level: course.level,
    rating: course.rating,
    students: course.total_students,
    category: course.category,
    bookmarkedAt: new Date(Date.now() - Math.floor(Math.random() * 14) * 24 * 60 * 60 * 1000), // Random date within last 2 weeks
    instructor: {
      name: course.instructor.name,
      avatar: course.instructor.profile_picture
    }
  }))

  // Mock completed courses (next 2 courses)
  const completedCourses = coursesData.courses.slice(7, 9).map(course => ({
    id: course.id.toString(),
    title: course.title,
    description: course.description,
    thumbnail: course.thumbnail,
    duration: course.duration,
    level: course.level,
    rating: course.rating,
    students: course.total_students,
    category: course.category,
    completedAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000), // Random date within last month
    certificateAvailable: Math.random() > 0.5, // Random certificate availability
    instructor: {
      name: course.instructor.name,
      avatar: course.instructor.profile_picture
    }
  }))

  const tabs = [
    { id: 'enrolled', label: 'Enrolled', count: enrolledCourses.length, icon: PlayIcon },
    { id: 'bookmarked', label: 'Bookmarked', count: bookmarkedCourses.length, icon: BookmarkIcon },
    { id: 'completed', label: 'Completed', count: completedCourses.length, icon: CheckCircleIcon },
    { id: 'downloads', label: 'Downloads', count: 0, icon: ArrowDownTrayIcon }
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
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="flex h-16 items-center justify-center border-b border-gray-200">
            <Image className="h-8 w-auto" src="/logo.png" alt="Logo" width={32} height={32} />
          </div>

          <nav className="px-3 py-4 space-y-1">
            {/* Home */}
            <Link
              href="/dashboard"
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-[#23544e] hover:bg-gray-50 rounded-lg transition-colors"
            >
              <HomeIcon className="h-5 w-5 mr-3" />
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

            {/* Rest of navigation items */}
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
              className="flex items-center px-3 py-2 text-sm font-medium text-[#23544e] bg-gray-50 rounded-lg transition-colors"
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
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">
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
                    <HeartIcon className="h-6 w-6 text-[#23544e]" />
                    <h1 className="text-xl font-bold text-gray-900">My Library</h1>
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
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Learning Library</h2>
                <p className="text-lg text-gray-600">Access your enrolled courses, bookmarks, and completed learning</p>
              </div>

              {/* Tabs */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
                <div className="border-b border-gray-200">
                  <nav className="flex space-x-8 px-6" aria-label="Tabs">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap flex items-center space-x-2 ${
                          activeTab === tab.id
                            ? 'border-[#23544e] text-[#23544e]'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <tab.icon className="h-5 w-5" />
                        <span>{tab.label}</span>
                        {tab.count > 0 && (
                          <span className={`ml-2 py-0.5 px-2 rounded-full text-xs ${
                            activeTab === tab.id
                              ? 'bg-[#23544e] text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}>
                            {tab.count}
                          </span>
                        )}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  {/* Enrolled Courses */}
                  {activeTab === 'enrolled' && (
                    <div className="space-y-6">
                      {enrolledCourses.map((course) => (
                        <div key={course.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start space-x-4">
                            <div className="relative w-32 h-20 rounded-lg overflow-hidden flex-shrink-0">
                              <Image
                                src={course.thumbnail}
                                alt={course.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg font-semibold text-gray-900 mb-1">{course.title}</h3>
                              <p className="text-sm text-gray-600 mb-2 line-clamp-2">{course.description}</p>
                              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                                <span className="flex items-center">
                                  <ClockIcon className="h-4 w-4 mr-1" />
                                  {course.duration}
                                </span>
                                <span className="flex items-center">
                                  <EyeIcon className="h-4 w-4 mr-1" />
                                  Last watched {course.lastWatched.toLocaleDateString()}
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex-1 mr-4">
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm text-gray-600">Progress</span>
                                    <span className="text-sm font-medium text-gray-900">{course.progress}%</span>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div 
                                      className="bg-[#23544e] h-2 rounded-full transition-all duration-300"
                                      style={{ width: `${course.progress}%` }}
                                    ></div>
                                  </div>
                                </div>
                                <Link
                                  href={`/course/${course.id}/learn`}
                                  className="bg-[#23544e] text-white px-4 py-2 rounded-lg hover:bg-[#1d453f] transition-colors"
                                >
                                  Continue
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Bookmarked Courses */}
                  {activeTab === 'bookmarked' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {bookmarkedCourses.map((course) => (
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
                            <div className="absolute top-2 right-2">
                              <BookmarkIcon className="h-6 w-6 text-red-500 fill-current" />
                            </div>
                          </div>
                          <div className="p-4">
                            <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">{course.title}</h4>
                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{course.description}</p>
                            <div className="flex items-center justify-between text-sm text-gray-500">
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
                            <div className="flex items-center justify-between mt-3">
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
                              <span className="text-xs text-gray-500">
                                Saved {course.bookmarkedAt.toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Completed Courses */}
                  {activeTab === 'completed' && (
                    <div className="space-y-6">
                      {completedCourses.map((course) => (
                        <div key={course.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-start space-x-4">
                            <div className="relative w-24 h-16 rounded-lg overflow-hidden flex-shrink-0">
                              <Image
                                src={course.thumbnail}
                                alt={course.title}
                                fill
                                className="object-cover"
                              />
                              <div className="absolute inset-0 bg-green-500 bg-opacity-20 flex items-center justify-center">
                                <CheckCircleIcon className="h-6 w-6 text-green-600" />
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{course.title}</h3>
                                  <p className="text-sm text-gray-600 mb-2">
                                    Completed on {course.completedAt.toLocaleDateString()}
                                  </p>
                                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                                    <span className="flex items-center">
                                      <ClockIcon className="h-4 w-4 mr-1" />
                                      {course.duration}
                                    </span>
                                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                                      Completed
                                    </span>
                                  </div>
                                </div>
                                <div className="flex flex-col space-y-2">
                                  {course.certificateAvailable && (
                                    <button className="bg-[#0b867a] text-white px-4 py-2 rounded-lg hover:bg-[#0a766b] transition-colors text-sm">
                                      View Certificate
                                    </button>
                                  )}
                                  <Link
                                    href={`/course/${course.id}`}
                                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm text-center"
                                  >
                                    Review Course
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Downloads */}
                  {activeTab === 'downloads' && (
                    <div className="text-center py-12">
                      <ArrowDownTrayIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No downloads yet</h3>
                      <p className="text-gray-600">
                        Download course materials for offline access when available.
                      </p>
                    </div>
                  )}
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