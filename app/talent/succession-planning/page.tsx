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
  FunnelIcon,
  EyeIcon,
  UsersIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline'

export default function SuccessionPlanningPage() {
  // Sidebar state
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({
    learningCapability: false,
    talentGrowth: false,
    talentInsight: true, // Expanded by default since we're on succession planning
    futureStrategic: false,
    executionIntegration: false
  })

  // Filter state
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('All')
  const [selectedReadiness, setSelectedReadiness] = useState('All')

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

  // Sample succession planning data
  const successionData = [
    {
      id: 1,
      role: 'Chief Technology Officer',
      department: 'Technology',
      currentHolder: 'Sarah Johnson',
      successor: 'Michael Chen',
      successorTitle: 'VP of Engineering',
      readiness: 'Ready Now',
      riskLevel: 'Low',
      developmentPlan: 'Leadership training, board exposure',
      lastUpdated: '2024-01-15'
    },
    {
      id: 2,
      role: 'VP of Engineering',
      department: 'Technology',
      currentHolder: 'Michael Chen',
      successor: 'Emily Rodriguez',
      successorTitle: 'Senior Engineering Manager',
      readiness: '1–2 Years',
      riskLevel: 'Medium',
      developmentPlan: 'Strategic planning, budget management',
      lastUpdated: '2024-01-20'
    },
    {
      id: 3,
      role: 'Director of Marketing',
      department: 'Marketing',
      currentHolder: 'David Thompson',
      successor: 'Lisa Wang',
      successorTitle: 'Marketing Manager',
      readiness: '1–2 Years',
      riskLevel: 'Medium',
      developmentPlan: 'Brand strategy, team leadership',
      lastUpdated: '2024-01-18'
    },
    {
      id: 4,
      role: 'Head of Sales',
      department: 'Sales',
      currentHolder: 'Robert Miller',
      successor: 'Jennifer Adams',
      successorTitle: 'Senior Sales Manager',
      readiness: '3+ Years',
      riskLevel: 'High',
      developmentPlan: 'P&L responsibility, enterprise sales',
      lastUpdated: '2024-01-22'
    },
    {
      id: 5,
      role: 'Chief Financial Officer',
      department: 'Finance',
      currentHolder: 'Amanda Foster',
      successor: 'Thomas Lee',
      successorTitle: 'Finance Director',
      readiness: 'Ready Now',
      riskLevel: 'Low',
      developmentPlan: 'Investor relations, strategic finance',
      lastUpdated: '2024-01-10'
    },
    {
      id: 6,
      role: 'HR Director',
      department: 'Human Resources',
      currentHolder: 'Maria Gonzalez',
      successor: 'James Wilson',
      successorTitle: 'Senior HR Manager',
      readiness: 'Not Ready',
      riskLevel: 'Critical',
      developmentPlan: 'Executive coaching, change management',
      lastUpdated: '2024-01-25'
    },
    {
      id: 7,
      role: 'Product Manager',
      department: 'Product',
      currentHolder: 'Alex Parker',
      successor: 'Rachel Green',
      successorTitle: 'Senior Product Analyst',
      readiness: '1–2 Years',
      riskLevel: 'Medium',
      developmentPlan: 'Product strategy, market analysis',
      lastUpdated: '2024-01-12'
    },
    {
      id: 8,
      role: 'Operations Director',
      department: 'Operations',
      currentHolder: 'Kevin Brown',
      successor: 'Nina Patel',
      successorTitle: 'Operations Manager',
      readiness: '3+ Years',
      riskLevel: 'High',
      developmentPlan: 'Process optimization, vendor management',
      lastUpdated: '2024-01-28'
    }
  ]

  // Get readiness badge styling
  const getReadinessBadge = (readiness: string) => {
    switch (readiness) {
      case 'Ready Now':
        return {
          bg: 'bg-green-100',
          text: 'text-green-800',
          icon: CheckCircleIcon
        }
      case '1–2 Years':
        return {
          bg: 'bg-yellow-100',
          text: 'text-yellow-800',
          icon: ClockIcon
        }
      case '3+ Years':
        return {
          bg: 'bg-orange-100',
          text: 'text-orange-800',
          icon: ExclamationTriangleIcon
        }
      case 'Not Ready':
        return {
          bg: 'bg-red-100',
          text: 'text-red-800',
          icon: XCircleIcon
        }
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-800',
          icon: ClockIcon
        }
    }
  }

  // Get risk level styling
  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'Low':
        return 'bg-green-100 text-green-800'
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'High':
        return 'bg-orange-100 text-orange-800'
      case 'Critical':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  // Filter data
  const departments = ['All', ...Array.from(new Set(successionData.map(item => item.department)))]
  const readinessLevels = ['All', 'Ready Now', '1–2 Years', '3+ Years', 'Not Ready']

  const filteredData = successionData.filter(item => {
    const matchesSearch = item.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.successor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.currentHolder.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === 'All' || item.department === selectedDepartment
    const matchesReadiness = selectedReadiness === 'All' || item.readiness === selectedReadiness
    
    return matchesSearch && matchesDepartment && matchesReadiness
  })

  // Calculate summary stats
  const readyNowCount = successionData.filter(item => item.readiness === 'Ready Now').length
  const criticalRiskCount = successionData.filter(item => item.riskLevel === 'Critical').length
  const totalPositions = successionData.length

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-center border-b border-gray-200">
            <Image className="h-8 w-auto" src="/logo.png" alt="Logo" width={32} height={32} />
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
                          subItem.name === 'Succession Planning Matrix'
                            ? 'text-[#23544e] bg-gray-50 font-medium'
                            : 'text-gray-600 hover:text-[#23544e] hover:bg-gray-50'
                        }`}
                      >
                        <div className={`mr-3 flex-shrink-0 w-2 h-2 rounded-full ${
                          subItem.name === 'Succession Planning Matrix'
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
                <h1 className="text-3xl font-bold text-gray-900">Succession Planning Matrix</h1>
                <p className="mt-2 text-gray-600">Strategic planning for key leadership positions and succession readiness</p>
              </div>
              <div className="flex space-x-3">
                <button className="bg-white text-gray-700 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors flex items-center">
                  <EyeIcon className="w-5 h-5 mr-2" />
                  Export Report
                </button>
                <button className="bg-[#23544e] text-white px-6 py-2 rounded-lg hover:bg-[#1a3f3a] transition-colors">
                  Update Matrix
                </button>
              </div>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <UsersIcon className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Positions</p>
                  <p className="text-2xl font-bold text-gray-900">{totalPositions}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircleIcon className="w-5 h-5 text-green-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Ready Now</p>
                  <p className="text-2xl font-bold text-gray-900">{readyNowCount}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                    <ExclamationTriangleIcon className="w-5 h-5 text-red-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Critical Risk</p>
                  <p className="text-2xl font-bold text-gray-900">{criticalRiskCount}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <ChartBarIcon className="w-5 h-5 text-yellow-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Readiness Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{Math.round((readyNowCount / totalPositions) * 100)}%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search roles or people..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#23544e] focus:border-transparent"
                />
              </div>

              {/* Department Filter */}
              <div className="relative">
                <FunnelIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#23544e] focus:border-transparent appearance-none"
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              {/* Readiness Filter */}
              <div className="relative">
                <ClockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={selectedReadiness}
                  onChange={(e) => setSelectedReadiness(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#23544e] focus:border-transparent appearance-none"
                >
                  {readinessLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Succession Matrix Table */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-4 px-6 font-medium text-gray-700">Role</th>
                    <th className="text-left py-4 px-4 font-medium text-gray-700">Current Holder</th>
                    <th className="text-left py-4 px-4 font-medium text-gray-700">Successor</th>
                    <th className="text-left py-4 px-4 font-medium text-gray-700">Readiness Status</th>
                    <th className="text-left py-4 px-4 font-medium text-gray-700">Risk Level</th>
                    <th className="text-left py-4 px-4 font-medium text-gray-700">Development Plan</th>
                    <th className="text-left py-4 px-4 font-medium text-gray-700">Last Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item, index) => {
                    const readinessBadge = getReadinessBadge(item.readiness)
                    const ReadinessIcon = readinessBadge.icon
                    
                    return (
                      <tr key={item.id} className={`border-b border-gray-100 hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                        <td className="py-4 px-6">
                          <div>
                            <div className="font-medium text-gray-900">{item.role}</div>
                            <div className="text-sm text-gray-600">{item.department}</div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="font-medium text-gray-900">{item.currentHolder}</div>
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <div className="font-medium text-gray-900">{item.successor}</div>
                            <div className="text-sm text-gray-600">{item.successorTitle}</div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${readinessBadge.bg} ${readinessBadge.text}`}>
                            <ReadinessIcon className="w-3 h-3 mr-1" />
                            {item.readiness}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRiskBadge(item.riskLevel)}`}>
                            {item.riskLevel}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-sm text-gray-600 max-w-xs">{item.developmentPlan}</div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-sm text-gray-600">{item.lastUpdated}</div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Empty State */}
          {filteredData.length === 0 && (
            <div className="text-center py-12">
              <UsersIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No succession plans found</h3>
              <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}