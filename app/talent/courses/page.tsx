'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
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
  DocumentChartBarIcon,
  BriefcaseIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  ClockIcon,
  StarIcon,
  UsersIcon,
  TagIcon,
  CheckBadgeIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline'

export default function CoursesPage() {
  // Sidebar state
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({
    learningCapability: true, // Expanded by default since we're on courses
    talentGrowth: false,
    talentInsight: false,
    futureStrategic: false,
    executionIntegration: false
  })

  // Filter state
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedLevel, setSelectedLevel] = useState('All')

  // Sidebar configuration
  const sidebarItems = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, current: false },
    { name: 'My Career Journey', href: '/career', icon: BriefcaseIcon, current: false },
    { name: 'Learning Hub', href: '/learn', icon: BookOpenIcon, current: false },
    { name: 'Content Library', href: '/library', icon: DocumentChartBarIcon, current: false },
    { name: 'AI Assistant', href: '/ai', icon: CogIcon, current: false },
  ]

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
      name: 'Future & Strategic Layer',
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
      name: 'Execution & Integration Layer',
      icon: CogIcon,
      expanded: expandedSections.executionIntegration,
      subItems: [
        { name: 'Integration Placeholders', href: '/talent/integration' },
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

  // Sample courses data based on the image provided
  const courses = [
    {
      id: 1,
      title: 'Fundamentals of Manual Handling',
      category: 'Health & Safety',
      level: 'BEGINNER LEVEL',
      duration: '2-3 hrs',
      students: '98,716',
      rating: 4.8,
      certificate: true,
      thumbnail: '/courses/manual-handling.jpg',
      description: 'Learn essential manual handling techniques to prevent workplace injuries and maintain safety standards.',
      color: 'bg-blue-500'
    },
    {
      id: 2,
      title: 'ISO 45001:2018 - Principles of Occupational Health and Safety Management Systems',
      category: 'Management',
      level: 'BEGINNER LEVEL',
      duration: '2-3 hrs',
      students: '127,110',
      rating: 4.9,
      certificate: true,
      thumbnail: '/courses/iso-45001.jpg',
      description: 'Comprehensive guide to occupational health and safety management systems.',
      color: 'bg-green-500'
    },
    {
      id: 3,
      title: 'ISO 13485:2016 - Quality Management Systems for Medical Devices',
      category: 'Management',
      level: 'INTERMEDIATE LEVEL',
      duration: '3-4 hrs',
      students: '89,342',
      rating: 4.7,
      certificate: true,
      thumbnail: '/courses/iso-13485.jpg',
      description: 'Quality management systems specifically designed for medical device industry.',
      color: 'bg-purple-500'
    },
    {
      id: 4,
      title: 'ISO 9001:2015 - Quality Management System (QMS)',
      category: 'Management',
      level: 'INTERMEDIATE LEVEL',
      duration: '2-3 hrs',
      students: '156,234',
      rating: 4.8,
      certificate: true,
      thumbnail: '/courses/iso-9001.jpg',
      description: 'International standard for quality management systems implementation.',
      color: 'bg-blue-600'
    },
    {
      id: 5,
      title: 'Food Safety and Hygiene in the Catering Industry',
      category: 'Food Safety',
      level: 'BEGINNER LEVEL',
      duration: '2-4 hrs',
      students: '234,892',
      rating: 4.9,
      certificate: true,
      thumbnail: '/courses/food-safety.jpg',
      description: 'Essential food safety practices for catering and hospitality professionals.',
      color: 'bg-green-600'
    },
    {
      id: 6,
      title: 'Mastering Conflict Management',
      category: 'Management',
      level: 'ADVANCED LEVEL',
      duration: '2-3 hrs',
      students: '87,156',
      rating: 4.6,
      certificate: true,
      thumbnail: '/courses/conflict-management.jpg',
      description: 'Advanced techniques for managing and resolving workplace conflicts.',
      color: 'bg-orange-500'
    },
    {
      id: 7,
      title: 'Rigging Equipment for Material Handling and Hoisting - OSHA',
      category: 'Management',
      level: 'INTERMEDIATE LEVEL',
      duration: '2-3 hrs',
      students: '56,789',
      rating: 4.5,
      certificate: true,
      thumbnail: '/courses/rigging-equipment.jpg',
      description: 'OSHA-compliant training for safe rigging and material handling operations.',
      color: 'bg-gray-600'
    },
    {
      id: 8,
      title: 'ISO 14001:2015 - Environmental Management Systems (EMS)',
      category: 'Management',
      level: 'BEGINNER LEVEL',
      duration: '2-3 hrs',
      students: '112,456',
      rating: 4.7,
      certificate: true,
      thumbnail: '/courses/iso-14001.jpg',
      description: 'Environmental management systems for sustainable business practices.',
      color: 'bg-green-700'
    },
    {
      id: 9,
      title: 'Hazard Recognition and Risk Assessment',
      category: 'Health & Safety',
      level: 'BEGINNER LEVEL',
      duration: '2-3 hrs',
      students: '78,234',
      rating: 4.6,
      certificate: true,
      thumbnail: '/courses/hazard-recognition.jpg',
      description: 'Learn to identify workplace hazards and conduct risk assessments.',
      color: 'bg-red-500'
    },
    {
      id: 10,
      title: 'Discussing Diversity, Equity and Inclusion in the Workplace',
      category: 'Personal Development',
      level: 'ADVANCED LEVEL',
      duration: '2-3 hrs',
      students: '91,567',
      rating: 4.8,
      certificate: true,
      thumbnail: '/courses/diversity-equity.jpg',
      description: 'Building inclusive workplaces through diversity and equity practices.',
      color: 'bg-purple-600'
    },
    {
      id: 11,
      title: 'Food Allergen Awareness',
      category: 'Food Safety',
      level: 'INTERMEDIATE LEVEL',
      duration: '1-2 hrs',
      students: '67,890',
      rating: 4.4,
      certificate: true,
      thumbnail: '/courses/food-allergen.jpg',
      description: 'Critical knowledge for managing food allergens in food service.',
      color: 'bg-yellow-600'
    },
    {
      id: 12,
      title: 'Risk Assessments & Control: Health & Safety',
      category: 'Management',
      level: 'BEGINNER LEVEL',
      duration: '2-3 hrs',
      students: '134,678',
      rating: 4.9,
      certificate: true,
      thumbnail: '/courses/risk-assessment.jpg',
      description: 'Comprehensive risk assessment and control methodologies.',
      color: 'bg-red-600'
    },
    {
      id: 13,
      title: 'Training on Restraint Awareness',
      category: 'Business',
      level: 'ADVANCED LEVEL',
      duration: '2-3 hrs',
      students: '45,123',
      rating: 4.3,
      certificate: true,
      thumbnail: '/courses/restraint-awareness.jpg',
      description: 'Professional training on appropriate restraint techniques and awareness.',
      color: 'bg-indigo-500'
    },
    {
      id: 14,
      title: 'Security Management',
      category: 'Management',
      level: 'ADVANCED LEVEL',
      duration: '3-4 hrs',
      students: '76,543',
      rating: 4.7,
      certificate: true,
      thumbnail: '/courses/security-management.jpg',
      description: 'Comprehensive security management strategies and implementation.',
      color: 'bg-gray-700'
    },
    {
      id: 15,
      title: 'Accident Prevention and Investigation in Occupational Systems',
      category: 'Health & Safety',
      level: 'INTERMEDIATE LEVEL',
      duration: '2-4 hrs',
      students: '89,123',
      rating: 4.6,
      certificate: true,
      thumbnail: '/courses/accident-prevention.jpg',
      description: 'Methods for preventing workplace accidents and conducting investigations.',
      color: 'bg-orange-600'
    },
    {
      id: 16,
      title: 'Fundamentals of HIPAA Law and Its Privacy Rules',
      category: 'Business',
      level: 'BEGINNER LEVEL',
      duration: '2-3 hrs',
      students: '123,456',
      rating: 4.8,
      certificate: true,
      thumbnail: '/courses/hipaa-law.jpg',
      description: 'Essential understanding of HIPAA regulations and privacy requirements.',
      color: 'bg-teal-600'
    }
  ]

  // Filter functions
  const categories = ['All', ...Array.from(new Set(courses.map(course => course.category)))]
  const levels = ['All', 'BEGINNER LEVEL', 'INTERMEDIATE LEVEL', 'ADVANCED LEVEL']

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory
    const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel
    
    return matchesSearch && matchesCategory && matchesLevel
  })

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-center border-b border-gray-200">
            <Image className="h-8 w-auto" src="/logo.png" alt="Sabil" width={32} height={32} />
          </div>

          {/* Navigation */}
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {/* Home */}
            <Link href="/dashboard" className="group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors text-gray-600 hover:text-[#23544e] hover:bg-gray-50">
              <HomeIcon className="mr-3 flex-shrink-0 h-5 w-5 text-[#23544e]" />
              Home
            </Link>

            {/* Talent Management Strategy Header */}
            <div className="pt-4 pb-2">
              <div className="flex items-center px-3">
                <UserGroupIcon className="mr-2 h-5 w-5 text-[#23544e]" />
                <h3 className="text-sm font-semibold text-[#23544e] uppercase tracking-wider">Talent Management Strategy</h3>
              </div>
            </div>

            {/* Strategy Overview Link */}
            <Link href="/dashboard/talent-strategy" className="group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors text-gray-600 hover:text-[#23544e] hover:bg-gray-50">
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
                    <ChevronUpIcon className="ml-2 h-4 w-4" />
                  ) : (
                    <ChevronDownIcon className="ml-2 h-4 w-4" />
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
                            ? 'text-[#23544e] bg-gray-50 font-medium'
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

            {/* Rest of sidebar items */}
            {sidebarItems.slice(1).map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors text-gray-600 hover:text-[#23544e] hover:bg-gray-50"
              >
                <item.icon className="mr-3 flex-shrink-0 h-5 w-5 text-[#23544e]" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="ml-64 flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Professional Courses</h1>
            <p className="mt-2 text-gray-600">Enhance your skills with industry-leading certifications and training programs</p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#23544e] focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#23544e] focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              {/* Level Filter */}
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#23544e] focus:border-transparent"
              >
                {levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>

              {/* Results Count */}
              <div className="flex items-center justify-center bg-gray-50 rounded-lg px-4 py-2">
                <span className="text-sm text-gray-600">
                  {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} found
                </span>
              </div>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCourses.map((course) => (
              <Link
                key={course.id}
                href={`/course/${course.id}`}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group"
              >
                {/* Course Image with Overlay */}
                <div className="relative h-48 overflow-hidden">
                  <div className={`absolute inset-0 ${course.color} opacity-90`}></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/40"></div>
                  
                  {/* Certificate Badge */}
                  {course.certificate && (
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                      <CheckBadgeIcon className="w-5 h-5 text-[#23544e]" />
                    </div>
                  )}

                  {/* Level Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-semibold">
                      📜 CERTIFICATE
                    </span>
                  </div>

                  {/* Level Badge Bottom */}
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-semibold">
                      {course.level}
                    </span>
                  </div>

                  {/* Category */}
                  <div className="absolute bottom-4 right-4">
                    <span className="text-white text-sm font-medium">
                      {course.category}
                    </span>
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#23544e] transition-colors">
                    {course.title}
                  </h3>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        {course.duration}
                      </span>
                      <span className="flex items-center">
                        <UsersIcon className="h-4 w-4 mr-1" />
                        {course.students}
                      </span>
                    </div>
                  </div>

                  {/* Rating and Action */}
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
                      <span className="ml-2 text-sm text-gray-600">{course.rating}</span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="text-[#23544e] hover:text-[#1a3f3a] text-sm font-medium">
                        More Info
                      </button>
                      <button className="bg-[#23544e] hover:bg-[#1a3f3a] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        Start Learning
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <AcademicCapIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No courses found</h3>
              <p className="mt-1 text-sm text-gray-500">Try adjusting your search filters to find more courses.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}