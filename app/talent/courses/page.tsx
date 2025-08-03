'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  HomeIcon,
  BookOpenIcon,
  UserGroupIcon,
  ArrowTrendingUpIcon,
  ChartBarIcon,
  MapIcon,
  CogIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  BriefcaseIcon,
  HeartIcon,
  StarIcon,
  SparklesIcon,
  CpuChipIcon,
  AcademicCapIcon,
  MagnifyingGlassIcon,
  ClockIcon,
  UsersIcon,
  CheckBadgeIcon,
  PlayIcon
} from '@heroicons/react/24/outline'

export default function CoursesPage() {
  // Sidebar state - same as dashboard
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({
    learningCapability: true, // Expanded by default since we're on courses
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

  // Filter state
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedLevel, setSelectedLevel] = useState('All')

  // Updated courses data matching the seed data
  const courses = [
    {
      id: 1,
      title: 'Mastering Supervision: Skills and Strategies for Effective Leadership',
      description: 'Develop leadership, manage teams effectively, and enhance organisational performance with this comprehensive free online course.',
      thumbnail: 'https://i.ytimg.com/vi_webp/exDHuEr_low/mqdefault.webp',
      duration: 360, // 6 hours
      level: 'Advanced',
      category: 'Leadership & Management',
      instructor: 'Prof. Sarah Johnson',
      rating: 4.8,
      students: 1200,
      price: 'Free',
      status: 'Published'
    },
    {
      id: 2,
      title: 'Leadership Skills & Remote Team Management',
      description: 'Amp up your ability to manage and lead remote teams by enrolling for this comprehensive free online skills course.',
      thumbnail: 'https://cdn01.alison-static.net/courses/6694/alison_courseware_intro_6694.jpg',
      duration: 240, // 4 hours
      level: 'Advanced',
      category: 'Leadership & Management',
      instructor: 'Dr. Michael Chen',
      rating: 4.7,
      students: 980,
      price: 'Free',
      status: 'Published'
    },
    {
      id: 3,
      title: 'Transformational Leadership',
      description: 'Discover cutting-edge tools and strategies that will improve your ability to lead others with this free online course.',
      thumbnail: 'https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/8847cbfd-260a-4bba-86fc-aa99911f9e09_wm',
      duration: 360, // 6 hours
      level: 'Beginner',
      category: 'Leadership & Management',
      instructor: 'Prof. Paul Cline',
      rating: 4.9,
      students: 1500,
      price: 'Free',
      status: 'Published'
    },
    {
      id: 4,
      title: 'Diploma in Leadership and Management Styles',
      description: 'Study management and leadership principles and how to apply them in business management with this comprehensive diploma course.',
      thumbnail: 'https://i.ytimg.com/vi_webp/c62zJnD_Jr8/mqdefault.webp',
      duration: 720, // 12 hours
      level: 'Advanced',
      category: 'Leadership & Management',
      instructor: 'Dr. Amanda Roberts',
      rating: 4.6,
      students: 750,
      price: 'Free',
      status: 'Published'
    },
    {
      id: 5,
      title: 'Leadership Skills Training - Become a Successful Leader',
      description: 'Explore leadership, the value of training, and the essential skills that define great leaders in this free online course.',
      thumbnail: 'https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/b9e1fc41-b347-4bdd-8942-193781c13da7_wm',
      duration: 300, // 5 hours
      level: 'Beginner',
      category: 'Leadership & Management',
      instructor: 'James Wilson',
      rating: 4.5,
      students: 2100,
      price: 'Free',
      status: 'Published'
    },
    {
      id: 6,
      title: 'Digital Marketing Strategy',
      description: 'Master modern digital marketing techniques and build comprehensive marketing campaigns.',
      thumbnail: 'https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/099f64ae-53e4-4627-ae3a-5dad8f18e394_wm',
      duration: 360, // 6 hours
      level: 'Intermediate',
      category: 'Professional Development',
      instructor: 'Lisa Anderson',
      rating: 4.7,
      students: 890,
      price: 'Free',
      status: 'Published'
    },
    {
      id: 7,
      title: 'Brand Management & Strategy',
      description: 'Develop comprehensive brand strategies and learn to manage brand identity effectively.',
      thumbnail: 'https://cdn01.alison-static.net/courses/6160/alison_courseware_intro_6160.jpg',
      duration: 240, // 4 hours
      level: 'Beginner',
      category: 'Professional Development',
      instructor: 'Mark Thompson',
      rating: 4.4,
      students: 560,
      price: 'Free',
      status: 'Published'
    },
    {
      id: 8,
      title: 'Content Marketing Mastery',
      description: 'Create compelling content strategies that engage audiences and drive conversions.',
      thumbnail: 'https://i.ytimg.com/vi_webp/c85Ypp_d6Vc/mqdefault.webp',
      duration: 280, // 4.7 hours
      level: 'Beginner',
      category: 'Professional Development',
      instructor: 'Rachel Green',
      rating: 4.6,
      students: 720,
      price: 'Free',
      status: 'Published'
    }
  ]

  const categories = ['All', 'Leadership & Management', 'Professional Development', 'Technical Skills', 'Communication']
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced']

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory
    const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel
    
    return matchesSearch && matchesCategory && matchesLevel
  })

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
    }
    return `${mins}m`
  }

  const renderSidebar = () => (
    <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="flex h-16 items-center justify-center border-b border-gray-200">
        <Image className="h-8 w-auto" src="/logo.png" alt="Sabil" width={32} height={32} />
        <span className="ml-2 text-lg font-bold text-[#23544e]">Sabil</span>
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
                    className={`group flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                      subItem.name === 'Courses'
                        ? 'text-[#23544e] bg-[#23544e]/10 font-medium'
                        : 'text-gray-600 hover:text-[#23544e] hover:bg-gray-50'
                    }`}
                  >
                    <div className={`mr-3 flex-shrink-0 w-2 h-2 rounded-full ${
                      subItem.name === 'Courses'
                        ? 'bg-[#23544e]'
                        : 'bg-gray-300 group-hover:bg-[#23544e]'
                    }`}></div>
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
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {renderSidebar()}
        {/* Main content */}
        <div className="flex-1 overflow-auto bg-gray-50">
          <div className="p-8">
            {/* Header */}
            <div className="mb-8 bg-[#23544e] rounded-lg p-6 text-white">
              <h1 className="text-2xl font-bold mb-2">Courses</h1>
              <p className="text-green-100">Discover our comprehensive course library and enhance your skills</p>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Search */}
                <div className="md:col-span-2">
                  <div className="relative">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search courses..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#23544e] focus:border-[#23544e]"
                    />
                  </div>
                </div>

                {/* Category Filter */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#23544e] focus:border-[#23544e]"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>

                {/* Level Filter */}
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#23544e] focus:border-[#23544e]"
                >
                  {levels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <div key={course.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                  {/* Course Thumbnail */}
                  <div className="relative h-48 rounded-t-lg overflow-hidden">
                    <Image
                      src={course.thumbnail}
                      alt={course.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                        course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {course.level}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="px-2 py-1 bg-[#23544e] text-white text-xs font-medium rounded-full">
                        {course.price}
                      </span>
                    </div>
                  </div>

                  {/* Course Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {course.category}
                      </span>
                      <div className="flex items-center">
                        <StarIcon className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">{course.rating}</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        {formatDuration(course.duration)}
                      </div>
                      <div className="flex items-center">
                        <UsersIcon className="h-4 w-4 mr-1" />
                        {course.students.toLocaleString()}
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-4">By {course.instructor}</p>

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <button className="flex-1 flex items-center justify-center px-4 py-2 bg-[#23544e] text-white rounded-lg hover:bg-[#1a3f3a] transition-colors">
                        <PlayIcon className="h-4 w-4 mr-2" />
                        Start Course
                      </button>
                      <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        <HeartIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <BookOpenIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
                <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}