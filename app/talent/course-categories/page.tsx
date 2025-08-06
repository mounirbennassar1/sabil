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
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  FolderIcon,
  UsersIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

export default function CourseCategoriesPage() {
  // Initial categories data
  const initialCategories = [
    {
      id: 'fallback-1',
      name: 'Leadership & Management',
      description: 'Develop leadership skills and management capabilities',
      icon: '👑',
      image: 'https://picsum.photos/800/600?random=1',
      color: '#23544e',
      courseCount: 17,
      totalStudents: 8500,
      avgCompletionTime: '5.2 hrs',
      popularCourses: ['Mastering Supervision', 'Remote Team Management', 'Transformational Leadership'],
      status: 'Active'
    },
    {
      id: 'fallback-2',
      name: 'Professional Development',
      description: 'Advance your career with professional development courses',
      icon: '📈',
      image: 'https://picsum.photos/800/600?random=2',
      color: '#e74c3c',
      courseCount: 12,
      totalStudents: 3600,
      avgCompletionTime: '4.8 hrs',
      popularCourses: ['Digital Marketing Strategy', 'Brand Management', 'Content Marketing'],
      status: 'Active'
    },
    {
      id: 'fallback-3',
      name: 'Technical Skills',
      description: 'Enhance your technical expertise and knowledge',
      icon: '💻',
      image: 'https://picsum.photos/800/600?random=3',
      color: '#0b867a',
      courseCount: 8,
      totalStudents: 2400,
      avgCompletionTime: '6.2 hrs',
      popularCourses: ['React Development', 'JavaScript ES6+', 'Python Programming'],
      status: 'Active'
    },
    {
      id: 'fallback-4',
      name: 'Communication',
      description: 'Improve communication and interpersonal skills',
      icon: '💬',
      image: 'https://picsum.photos/800/600?random=4',
      color: '#4a90e2',
      courseCount: 8,
      totalStudents: 1800,
      avgCompletionTime: '4.0 hrs',
      popularCourses: ['Public Speaking', 'Effective Communication', 'Presentation Skills'],
      status: 'Active'
    },
    {
      id: 'fallback-5',
      name: 'Compliance & Safety',
      description: 'Stay updated with compliance requirements and safety protocols',
      icon: '🛡️',
      image: 'https://picsum.photos/800/600?random=5',
      color: '#f39c12',
      courseCount: 4,
      totalStudents: 950,
      avgCompletionTime: '2.8 hrs',
      popularCourses: ['Workplace Safety', 'OSHA Standards', 'Emergency Protocols'],
      status: 'Active'
    }
  ]

  // Sidebar state
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({
    learningCapability: true,
    talentGrowth: false,
    talentInsight: false,
    futureStrategic: false,
    executionIntegration: false
  })

  const [searchTerm, setSearchTerm] = useState('')
  
  // Modal and form state
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [categoriesState, setCategoriesState] = useState(initialCategories)
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    icon: '📚',
    color: '#23544e'
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
        { name: 'Course Categories', href: '/talent/course-categories' },
        { name: 'Compliance Tracking', href: '/talent/compliance-tracking' },
        { name: 'Learner Journeys', href: '/talent/learner-journeys' }
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

  // Handle creating new category
  const handleCreateCategory = () => {
    if (!newCategory.name || !newCategory.description) {
      alert('Please fill in all required fields')
      return
    }

    const newCategoryItem = {
      id: `category-${Date.now()}`,
      name: newCategory.name,
      description: newCategory.description,
      icon: newCategory.icon,
      image: `https://picsum.photos/800/600?random=${Date.now()}`,
      color: newCategory.color,
      courseCount: 0,
      totalStudents: 0,
      avgCompletionTime: '0 hrs',
      popularCourses: [],
      status: 'Active' as const
    }

    setCategoriesState([...categoriesState, newCategoryItem])
    setShowCreateModal(false)
    resetForm()
  }

  // Reset form
  const resetForm = () => {
    setNewCategory({
      name: '',
      description: '',
      icon: '📚',
      color: '#23544e'
    })
  }


    {
      id: 'fallback-1',
      name: 'Leadership & Management',
      description: 'Develop leadership skills and management capabilities',
      icon: '👑',
      image: 'https://picsum.photos/800/600?random=1',
      color: '#23544e',
      courseCount: 17,
      totalStudents: 8500,
      avgCompletionTime: '5.2 hrs',
      popularCourses: ['Mastering Supervision', 'Remote Team Management', 'Transformational Leadership'],
      status: 'Active'
    },
    {
      id: 'fallback-2',
      name: 'Professional Development',
      description: 'Advance your career with professional development courses',
      icon: '📈',
      image: 'https://picsum.photos/800/600?random=2',
      color: '#e74c3c',
      courseCount: 12,
      totalStudents: 3600,
      avgCompletionTime: '4.8 hrs',
      popularCourses: ['Digital Marketing Strategy', 'Brand Management', 'Content Marketing'],
      status: 'Active'
    },
    {
      id: 'fallback-3',
      name: 'Technical Skills',
      description: 'Enhance your technical expertise and knowledge',
      icon: '💻',
      image: 'https://picsum.photos/800/600?random=3',
      color: '#0b867a',
      courseCount: 8,
      totalStudents: 2400,
      avgCompletionTime: '6.2 hrs',
      popularCourses: ['React Development', 'JavaScript ES6+', 'Python Programming'],
      status: 'Active'
    },
    {
      id: 'fallback-4',
      name: 'Communication',
      description: 'Improve communication and interpersonal skills',
      icon: '💬',
      image: 'https://picsum.photos/800/600?random=4',
      color: '#4a90e2',
      courseCount: 8,
      totalStudents: 1800,
      avgCompletionTime: '4.0 hrs',
      popularCourses: ['Public Speaking', 'Effective Communication', 'Presentation Skills'],
      status: 'Active'
    },
    {
      id: 'fallback-5',
      name: 'Compliance & Safety',
      description: 'Stay updated with compliance requirements and safety protocols',
      icon: '🛡️',
      image: 'https://picsum.photos/800/600?random=5',
      color: '#f39c12',
      courseCount: 4,
      totalStudents: 950,
      avgCompletionTime: '2.8 hrs',
      popularCourses: ['Workplace Safety', 'OSHA Standards', 'Emergency Protocols'],
      status: 'Active'
    }
  ]

  const filteredCategories = categoriesState.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalCourses = categoriesState.reduce((sum, cat) => sum + cat.courseCount, 0)
  const totalStudents = categoriesState.reduce((sum, cat) => sum + cat.totalStudents, 0)
  const activeCategories = categoriesState.filter(cat => cat.status === 'Active').length

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
                        className={`group flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                          subItem.name === 'Course Categories'
                            ? 'text-[#23544e] bg-[#23544e]/10 font-medium'
                            : 'text-gray-600 hover:text-[#23544e] hover:bg-gray-50'
                        }`}
                      >
                        <div className={`mr-3 flex-shrink-0 w-2 h-2 rounded-full ${
                          subItem.name === 'Course Categories'
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

        {/* Main content */}
        <div className="flex-1 overflow-auto bg-gray-50">
          <div className="p-8">
            {/* Header */}
            <div className="mb-8 bg-[#23544e] rounded-lg p-6 text-white">
              <h1 className="text-2xl font-bold mb-2">Course Categories</h1>
              <p className="text-green-100">Manage and organize your learning content by categories</p>
              {/* Build: {new Date().toISOString()} */}
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-[#23544e] rounded-lg">
                    <FolderIcon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Categories</p>
                    <p className="text-2xl font-bold text-gray-900">{activeCategories}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-[#23544e] rounded-lg">
                    <BookOpenIcon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Courses</p>
                    <p className="text-2xl font-bold text-gray-900">{totalCourses}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-[#23544e] rounded-lg">
                    <UsersIcon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Students</p>
                    <p className="text-2xl font-bold text-gray-900">{totalStudents.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-[#23544e] rounded-lg">
                    <AcademicCapIcon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Avg Completion</p>
                    <p className="text-2xl font-bold text-gray-900">3.8 hrs</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Search and Actions */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                <div className="relative flex-1 max-w-md">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search categories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#23544e] focus:border-[#23544e]"
                  />
                </div>
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => setShowCreateModal(true)}
                    className="flex items-center px-4 py-2 bg-[#23544e] text-white rounded-lg hover:bg-[#1a3f3a] transition-colors"
                  >
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Add Category
                  </button>
                </div>
              </div>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCategories.map((category) => (
                <div key={category.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                  {/* Category Image */}
                  <div className="relative h-48 rounded-t-lg overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                    <div className="absolute top-4 left-4">
                      <span className="text-2xl">{category.icon}</span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                        {category.status}
                      </span>
                    </div>
                  </div>

                  {/* Category Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h3>
                    <p className="text-gray-600 mb-4">{category.description}</p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-[#23544e]">{category.courseCount}</p>
                        <p className="text-sm text-gray-600">Courses</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-[#23544e]">{category.totalStudents.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">Students</p>
                      </div>
                    </div>

                    {/* Popular Courses */}
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-900 mb-2">Popular Courses:</p>
                      <div className="flex flex-wrap gap-1">
                        {category.popularCourses.slice(0, 2).map((course, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                            {course}
                          </span>
                        ))}
                        {category.popularCourses.length > 2 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                            +{category.popularCourses.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2">
                        <button className="p-2 text-gray-400 hover:text-[#23544e] transition-colors">
                          <EyeIcon className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-[#23544e] transition-colors">
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                      <Link
                        href="/talent/courses"
                        className="px-3 py-1 bg-[#23544e] text-white text-sm rounded hover:bg-[#1a3f3a] transition-colors"
                      >
                        View Courses
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredCategories.length === 0 && (
              <div className="text-center py-12">
                <FolderIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No categories found</h3>
                <p className="text-gray-600">Try adjusting your search criteria or add a new category.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create Category Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Create New Category</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category Name *
                  </label>
                  <input
                    type="text"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23544e] focus:border-transparent"
                    placeholder="e.g., Data Science"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    value={newCategory.description}
                    onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23544e] focus:border-transparent"
                    placeholder="Describe what this category covers..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Icon
                  </label>
                  <div className="grid grid-cols-6 gap-2">
                    {['📚', '💻', '🎯', '📈', '🔬', '🎨', '⚖️', '🏥', '🔧', '🌍', '💡', '🎓'].map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => setNewCategory({ ...newCategory, icon: emoji })}
                        className={`p-2 text-2xl rounded border-2 hover:border-[#23544e] ${
                          newCategory.icon === emoji ? 'border-[#23544e] bg-[#23544e]/10' : 'border-gray-200'
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Color Theme
                  </label>
                  <div className="grid grid-cols-6 gap-2">
                    {['#23544e', '#0b867a', '#1d453f', '#0a7a6e', '#e74c3c', '#4a90e2', '#f39c12', '#9b59b6', '#27ae60', '#e67e22'].map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setNewCategory({ ...newCategory, color })}
                        className={`w-8 h-8 rounded-full border-2 ${
                          newCategory.color === color ? 'border-gray-800 scale-110' : 'border-gray-200'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </form>

              <div className="flex items-center justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#23544e] focus:ring-offset-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateCategory}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#23544e] border border-transparent rounded-md hover:bg-[#1a3f3a] focus:outline-none focus:ring-2 focus:ring-[#23544e] focus:ring-offset-2"
                >
                  Create Category
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}