"use client"

import React, { useState, useEffect } from 'react'
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
  UserGroupIcon,
  ArrowTrendingUpIcon,
  ChartBarIcon,
  MapIcon,
  CogIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  DocumentTextIcon,
  CalendarDaysIcon,
  ArrowPathIcon,
  ChartPieIcon
} from '@heroicons/react/24/outline'

interface ComplianceItem {
  id: string
  title: string
  category: string
  status: 'completed' | 'in-progress' | 'overdue' | 'upcoming'
  dueDate: string
  completionRate: number
  priority: 'high' | 'medium' | 'low'
  assignedEmployees: number
  completedEmployees: number
}

export default function ComplianceTrackingPage(): React.JSX.Element {
  const { data: session } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [selectedTimeframe, setSelectedTimeframe] = useState('This Quarter')
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  
  // Sidebar state
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({
    learningCapability: true,
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

  // Mock compliance data
  const complianceItems: ComplianceItem[] = [
    {
      id: '1',
      title: 'Health & Safety Training',
      category: 'Safety',
      status: 'completed',
      dueDate: '2024-03-15',
      completionRate: 95,
      priority: 'high',
      assignedEmployees: 150,
      completedEmployees: 143
    },
    {
      id: '2',
      title: 'Data Protection & GDPR',
      category: 'Security',
      status: 'in-progress',
      dueDate: '2024-04-01',
      completionRate: 78,
      priority: 'high',
      assignedEmployees: 120,
      completedEmployees: 94
    },
    {
      id: '3',
      title: 'Anti-Harassment Training',
      category: 'HR Compliance',
      status: 'overdue',
      dueDate: '2024-02-28',
      completionRate: 65,
      priority: 'high',
      assignedEmployees: 180,
      completedEmployees: 117
    },
    {
      id: '4',
      title: 'Financial Compliance',
      category: 'Finance',
      status: 'upcoming',
      dueDate: '2024-05-15',
      completionRate: 0,
      priority: 'medium',
      assignedEmployees: 45,
      completedEmployees: 0
    },
    {
      id: '5',
      title: 'Quality Management System',
      category: 'Quality',
      status: 'in-progress',
      dueDate: '2024-04-20',
      completionRate: 82,
      priority: 'medium',
      assignedEmployees: 85,
      completedEmployees: 70
    }
  ]

  const overallStats = {
    totalCompliance: 84,
    completedTrainings: 424,
    overdueTrainings: 63,
    upcomingDeadlines: 12
  }

  const categoryStats = [
    { name: 'Safety', completion: 95, total: 3, color: 'bg-green-500' },
    { name: 'Security', completion: 78, total: 2, color: 'bg-blue-500' },
    { name: 'HR Compliance', completion: 65, total: 4, color: 'bg-red-500' },
    { name: 'Finance', completion: 45, total: 2, color: 'bg-yellow-500' },
    { name: 'Quality', completion: 82, total: 3, color: 'bg-purple-500' }
  ]

  useEffect(() => {
    if (!session) {
      router.push('/auth/signin')
      return
    }
    setLoading(false)
  }, [session, router])

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#23544e]"></div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#23544e]"></div>
      </div>
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />
      case 'in-progress':
        return <ClockIcon className="h-5 w-5 text-blue-500" />
      case 'overdue':
        return <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
      case 'upcoming':
        return <CalendarDaysIcon className="h-5 w-5 text-gray-500" />
      default:
        return <ClockIcon className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'overdue':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'upcoming':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50'
      case 'medium':
        return 'text-yellow-600 bg-yellow-50'
      case 'low':
        return 'text-green-600 bg-green-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <>
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
                            subItem.href === '/talent/compliance-tracking'
                              ? 'text-[#23544e] bg-[#23544e]/10 font-medium'
                              : 'text-gray-600 hover:text-[#23544e] hover:bg-gray-50'
                          }`}
                        >
                          <div className={`mr-3 flex-shrink-0 w-2 h-2 rounded-full ${
                            subItem.href === '/talent/compliance-tracking'
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
          <div className="flex-1 overflow-auto">
            <div className="p-8">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="p-2 bg-[#23544e]/10 rounded-lg">
                        <ShieldCheckIcon className="h-8 w-8 text-[#23544e]" />
                      </div>
                      <div>
                        <h1 className="text-3xl font-bold text-gray-900">Compliance Tracking</h1>
                        <p className="text-gray-600">Monitor and manage organizational compliance requirements</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <select 
                      value={selectedTimeframe}
                      onChange={(e) => setSelectedTimeframe(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#23544e] focus:border-transparent"
                    >
                      <option>This Quarter</option>
                      <option>This Year</option>
                      <option>Last 12 Months</option>
                    </select>
                    <button className="px-4 py-2 bg-[#23544e] text-white rounded-lg hover:bg-[#1a3f39] transition-colors flex items-center space-x-2">
                      <ArrowPathIcon className="h-4 w-4" />
                      <span>Refresh</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Overall Compliance</p>
                      <p className="text-3xl font-bold text-[#23544e] mt-1">{overallStats.totalCompliance}%</p>
                    </div>
                    <div className="p-3 bg-[#23544e]/10 rounded-full">
                      <ChartPieIcon className="h-6 w-6 text-[#23544e]" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-[#23544e] h-2 rounded-full transition-all duration-300"
                        style={{ width: `${overallStats.totalCompliance}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Completed Trainings</p>
                      <p className="text-3xl font-bold text-green-600 mt-1">{overallStats.completedTrainings}</p>
                    </div>
                    <div className="p-3 bg-green-100 rounded-full">
                      <CheckCircleIcon className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                  <p className="text-sm text-green-600 mt-2">↗ +12% from last month</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Overdue Items</p>
                      <p className="text-3xl font-bold text-red-600 mt-1">{overallStats.overdueTrainings}</p>
                    </div>
                    <div className="p-3 bg-red-100 rounded-full">
                      <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
                    </div>
                  </div>
                  <p className="text-sm text-red-600 mt-2">Requires immediate attention</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Upcoming Deadlines</p>
                      <p className="text-3xl font-bold text-yellow-600 mt-1">{overallStats.upcomingDeadlines}</p>
                    </div>
                    <div className="p-3 bg-yellow-100 rounded-full">
                      <CalendarDaysIcon className="h-6 w-6 text-yellow-600" />
                    </div>
                  </div>
                  <p className="text-sm text-yellow-600 mt-2">Next 30 days</p>
                </div>
              </div>

              {/* Category Performance Chart */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Compliance by Category</h3>
                  <div className="flex items-center space-x-2">
                    <ChartBarIcon className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-500">Performance Overview</span>
                  </div>
                </div>
                <div className="space-y-4">
                  {categoryStats.map((category, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-24 text-sm font-medium text-gray-700">{category.name}</div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <div className="flex-1 bg-gray-200 rounded-full h-3">
                            <div 
                              className={`h-3 rounded-full transition-all duration-500 ${category.color}`}
                              style={{ width: `${category.completion}%` }}
                            ></div>
                          </div>
                          <div className="text-sm font-medium text-gray-900 w-12">{category.completion}%</div>
                          <div className="text-sm text-gray-500 w-16">{category.total} items</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Compliance Items List */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Compliance Items</h3>
                    <select 
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#23544e] focus:border-transparent"
                    >
                      <option>All Categories</option>
                      <option>Safety</option>
                      <option>Security</option>
                      <option>HR Compliance</option>
                      <option>Finance</option>
                      <option>Quality</option>
                    </select>
                  </div>
                </div>
                <div className="divide-y divide-gray-200">
                  {complianceItems.map((item) => (
                    <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          {getStatusIcon(item.status)}
                          <div>
                            <h4 className="text-lg font-medium text-gray-900">{item.title}</h4>
                            <div className="flex items-center space-x-4 mt-1">
                              <span className="text-sm text-gray-500">{item.category}</span>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(item.status)}`}>
                                {item.status.replace('-', ' ').toUpperCase()}
                              </span>
                              <span className={`px-2 py-1 text-xs font-medium rounded ${getPriorityColor(item.priority)}`}>
                                {item.priority.toUpperCase()} PRIORITY
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500">Due: {new Date(item.dueDate).toLocaleDateString()}</div>
                          <div className="text-sm text-gray-700 mt-1">
                            {item.completedEmployees}/{item.assignedEmployees} employees
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-600">Progress</span>
                          <span className="text-sm font-medium text-gray-900">{item.completionRate}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${
                              item.status === 'completed' ? 'bg-green-500' :
                              item.status === 'in-progress' ? 'bg-blue-500' :
                              item.status === 'overdue' ? 'bg-red-500' : 'bg-gray-400'
                            }`}
                            style={{ width: `${item.completionRate}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}