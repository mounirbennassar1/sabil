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
  MagnifyingGlassIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  FolderIcon,
  AcademicCapIcon,
  UsersIcon
} from '@heroicons/react/24/outline'

export default function CourseCategoriesPage() {
  // Sidebar state
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({
    learningCapability: true, // Expanded by default since we're on course categories
    talentGrowth: false,
    talentInsight: false,
    futureStrategic: false,
    executionIntegration: false
  })

  // Filter and management state
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedView, setSelectedView] = useState<'grid' | 'list'>('grid')

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

  // Sample categories data
  const categories = [
    {
      id: 1,
      name: 'Health & Safety',
      description: 'Workplace safety, occupational health, and safety management systems',
      icon: '🛡️',
      color: 'bg-red-500',
      courseCount: 45,
      totalStudents: 12500,
      avgCompletionTime: '2.5 hrs',
      popularCourses: ['Manual Handling', 'Hazard Recognition', 'Risk Assessment'],
      createdAt: '2024-01-15',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Management Systems',
      description: 'ISO standards, quality management, and business process optimization',
      icon: '⚙️',
      color: 'bg-blue-500',
      courseCount: 32,
      totalStudents: 8900,
      avgCompletionTime: '3.2 hrs',
      popularCourses: ['ISO 9001:2015', 'ISO 45001:2018', 'ISO 14001:2015'],
      createdAt: '2024-01-10',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Food Safety',
      description: 'Food handling, hygiene practices, and allergen management',
      icon: '🍽️',
      color: 'bg-green-500',
      courseCount: 18,
      totalStudents: 5600,
      avgCompletionTime: '2.1 hrs',
      popularCourses: ['Food Safety & Hygiene', 'Allergen Awareness', 'HACCP Principles'],
      createdAt: '2024-01-20',
      status: 'Active'
    },
    {
      id: 4,
      name: 'Personal Development',
      description: 'Leadership, communication, diversity, and professional growth',
      icon: '📈',
      color: 'bg-purple-500',
      courseCount: 28,
      totalStudents: 7200,
      avgCompletionTime: '2.8 hrs',
      popularCourses: ['Conflict Management', 'Diversity & Inclusion', 'Leadership Skills'],
      createdAt: '2024-01-25',
      status: 'Active'
    },
    {
      id: 5,
      name: 'Technical Skills',
      description: 'Engineering, equipment handling, and technical competencies',
      icon: '🔧',
      color: 'bg-orange-500',
      courseCount: 22,
      totalStudents: 4800,
      avgCompletionTime: '3.5 hrs',
      popularCourses: ['Rigging Equipment', 'Material Handling', 'Equipment Safety'],
      createdAt: '2024-02-01',
      status: 'Active'
    },
    {
      id: 6,
      name: 'Business & Compliance',
      description: 'Legal compliance, business practices, and regulatory requirements',
      icon: '📋',
      color: 'bg-indigo-500',
      courseCount: 15,
      totalStudents: 3200,
      avgCompletionTime: '2.4 hrs',
      popularCourses: ['HIPAA Fundamentals', 'Security Management', 'Compliance Training'],
      createdAt: '2024-02-05',
      status: 'Active'
    },
    {
      id: 7,
      name: 'Environmental',
      description: 'Environmental management, sustainability, and green practices',
      icon: '🌱',
      color: 'bg-green-600',
      courseCount: 12,
      totalStudents: 2800,
      avgCompletionTime: '2.9 hrs',
      popularCourses: ['Environmental Management', 'Sustainability Practices', 'Waste Management'],
      createdAt: '2024-02-10',
      status: 'Active'
    },
    {
      id: 8,
      name: 'Healthcare',
      description: 'Medical devices, healthcare compliance, and patient safety',
      icon: '🏥',
      color: 'bg-teal-500',
      courseCount: 8,
      totalStudents: 1900,
      avgCompletionTime: '3.1 hrs',
      popularCourses: ['Medical Device QMS', 'Patient Safety', 'Healthcare Compliance'],
      createdAt: '2024-02-15',
      status: 'Draft'
    }
  ]

  // Filter categories
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Calculate total stats
  const totalCourses = categories.reduce((sum, cat) => sum + cat.courseCount, 0)
  const totalStudents = categories.reduce((sum, cat) => sum + cat.totalStudents, 0)
  const activeCategories = categories.filter(cat => cat.status === 'Active').length

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
                          subItem.name === 'Course Categories'
                            ? 'text-[#23544e] bg-gray-50 font-medium'
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
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Course Categories</h1>
                <p className="mt-2 text-gray-600">Organize and manage your learning content by categories</p>
              </div>
              <button 
                onClick={() => {/* TODO: Implement create modal */}}
                className="bg-[#23544e] text-white px-6 py-3 rounded-lg hover:bg-[#1a3f3a] transition-colors flex items-center"
              >
                <PlusIcon className="w-5 h-5 mr-2" />
                Add Category
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FolderIcon className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Categories</p>
                  <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <BookOpenIcon className="w-5 h-5 text-green-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Courses</p>
                  <p className="text-2xl font-bold text-gray-900">{totalCourses}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <UsersIcon className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Students</p>
                  <p className="text-2xl font-bold text-gray-900">{totalStudents.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <AcademicCapIcon className="w-5 h-5 text-orange-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Categories</p>
                  <p className="text-2xl font-bold text-gray-900">{activeCategories}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <div className="flex items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#23544e] focus:border-transparent"
                />
              </div>

              {/* View Toggle */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">View:</span>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setSelectedView('grid')}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      selectedView === 'grid'
                        ? 'bg-white text-[#23544e] shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Grid
                  </button>
                  <button
                    onClick={() => setSelectedView('list')}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      selectedView === 'list'
                        ? 'bg-white text-[#23544e] shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    List
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Categories Grid/List */}
          {selectedView === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCategories.map((category) => (
                <div
                  key={category.id}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group"
                >
                  {/* Category Header */}
                  <div className={`${category.color} p-6 text-white relative`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-3xl mb-2">{category.icon}</div>
                        <h3 className="text-xl font-semibold">{category.name}</h3>
                        <p className="text-white/80 text-sm mt-1">{category.description}</p>
                      </div>
                      <div className="flex space-x-1">
                        <button className="p-1 hover:bg-white/20 rounded">
                          <EyeIcon className="w-4 h-4" />
                        </button>
                        <button className="p-1 hover:bg-white/20 rounded">
                          <PencilIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Category Stats */}
                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">{category.courseCount}</div>
                        <div className="text-sm text-gray-600">Courses</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">{category.totalStudents.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">Students</div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                        <span>Avg. Completion Time</span>
                        <span className="font-medium">{category.avgCompletionTime}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          category.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {category.status}
                        </span>
                        <Link 
                          href={`/talent/courses?category=${encodeURIComponent(category.name)}`}
                          className="text-[#23544e] hover:text-[#1a3f3a] font-medium"
                        >
                          View Courses →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* List View */
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-3 px-6 font-medium text-gray-700">Category</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Courses</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Students</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Avg. Time</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCategories.map((category, index) => (
                      <tr key={category.id} className={`border-b border-gray-100 hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                        <td className="py-4 px-6">
                          <div className="flex items-center">
                            <div className={`w-10 h-10 ${category.color} rounded-lg flex items-center justify-center text-white text-lg mr-3`}>
                              {category.icon}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{category.name}</div>
                              <div className="text-sm text-gray-600">{category.description}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-900 font-medium">{category.courseCount}</td>
                        <td className="py-4 px-4 text-gray-900">{category.totalStudents.toLocaleString()}</td>
                        <td className="py-4 px-4 text-gray-600">{category.avgCompletionTime}</td>
                        <td className="py-4 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            category.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {category.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <Link 
                              href={`/talent/courses?category=${encodeURIComponent(category.name)}`}
                              className="p-1 hover:bg-gray-200 rounded"
                            >
                              <EyeIcon className="w-4 h-4 text-gray-600" />
                            </Link>
                            <button className="p-1 hover:bg-gray-200 rounded">
                              <PencilIcon className="w-4 h-4 text-gray-600" />
                            </button>
                            <button className="p-1 hover:bg-gray-200 rounded">
                              <TrashIcon className="w-4 h-4 text-red-600" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Empty State */}
          {filteredCategories.length === 0 && (
            <div className="text-center py-12">
              <FolderIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No categories found</h3>
              <p className="mt-1 text-sm text-gray-500">Try adjusting your search or create a new category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}