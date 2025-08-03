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
  CalendarIcon,
  TrophyIcon,
  UserIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  MinusIcon
} from '@heroicons/react/24/outline'
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function PerformanceAnalyticsPage() {
  // Sidebar state
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({
    learningCapability: false,
    talentGrowth: false,
    talentInsight: true, // Expanded by default since we're on performance analytics
    futureStrategic: false,
    executionIntegration: false
  })

  // Filter state
  const [selectedDepartment, setSelectedDepartment] = useState('All')
  const [selectedPeriod, setSelectedPeriod] = useState('Last 12 Months')
  const [selectedBand, setSelectedBand] = useState('All')

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

  // Performance data
  const departments = ['All', 'Engineering', 'Marketing', 'Sales', 'Product', 'HR', 'Finance', 'Operations']
  const timePeriods = ['Last 3 Months', 'Last 6 Months', 'Last 12 Months', 'Last 2 Years']
  const performanceBands = ['All', 'Exceptional (4.5-5.0)', 'Exceeds (4.0-4.4)', 'Meets (3.0-3.9)', 'Below (2.0-2.9)', 'Poor (1.0-1.9)']

  // Sample performance data
  const departmentPerformance = [
    { department: 'Engineering', avgRating: 4.2, trend: 'up', employees: 45, change: 0.3 },
    { department: 'Marketing', avgRating: 4.0, trend: 'up', employees: 28, change: 0.1 },
    { department: 'Sales', avgRating: 3.8, trend: 'down', employees: 32, change: -0.2 },
    { department: 'Product', avgRating: 4.1, trend: 'up', employees: 22, change: 0.2 },
    { department: 'HR', avgRating: 3.9, trend: 'stable', employees: 12, change: 0.0 },
    { department: 'Finance', avgRating: 3.7, trend: 'down', employees: 18, change: -0.1 },
    { department: 'Operations', avgRating: 3.6, trend: 'up', employees: 35, change: 0.4 }
  ]

  // Performance trends data for line chart
  const performanceTrends = [
    { month: 'Jan', overall: 3.6, engineering: 4.0, marketing: 3.8, sales: 3.5 },
    { month: 'Feb', overall: 3.7, engineering: 4.1, marketing: 3.9, sales: 3.6 },
    { month: 'Mar', overall: 3.8, engineering: 4.0, marketing: 3.8, sales: 3.7 },
    { month: 'Apr', overall: 3.9, engineering: 4.2, marketing: 4.0, sales: 3.8 },
    { month: 'May', overall: 4.0, engineering: 4.1, marketing: 4.1, sales: 3.9 },
    { month: 'Jun', overall: 4.1, engineering: 4.3, marketing: 4.0, sales: 3.8 },
    { month: 'Jul', overall: 4.0, engineering: 4.2, marketing: 4.0, sales: 3.7 },
    { month: 'Aug', overall: 4.1, engineering: 4.2, marketing: 4.1, sales: 3.8 },
    { month: 'Sep', overall: 4.0, engineering: 4.1, marketing: 3.9, sales: 3.8 },
    { month: 'Oct', overall: 4.1, engineering: 4.2, marketing: 4.0, sales: 3.8 },
    { month: 'Nov', overall: 4.2, engineering: 4.3, marketing: 4.1, sales: 3.9 },
    { month: 'Dec', overall: 4.1, engineering: 4.2, marketing: 4.0, sales: 3.8 }
  ]

  const topPerformers = [
    { name: 'Sarah Chen', department: 'Engineering', rating: 4.9, role: 'Senior Developer' },
    { name: 'Michael Rodriguez', department: 'Sales', rating: 4.8, role: 'Account Manager' },
    { name: 'Emily Johnson', department: 'Marketing', rating: 4.7, role: 'Marketing Manager' },
    { name: 'David Kim', department: 'Product', rating: 4.6, role: 'Product Manager' },
    { name: 'Lisa Wang', department: 'Engineering', rating: 4.6, role: 'Tech Lead' }
  ]

  const performanceDistribution = [
    { band: 'Exceptional', count: 23, percentage: 12, color: 'bg-green-500' },
    { band: 'Exceeds', count: 67, percentage: 35, color: 'bg-blue-500' },
    { band: 'Meets', count: 89, percentage: 46, color: 'bg-yellow-500' },
    { band: 'Below', count: 12, percentage: 6, color: 'bg-orange-500' },
    { band: 'Poor', count: 2, percentage: 1, color: 'bg-red-500' }
  ]

  // Brand colors
  const brandColors = {
    primary: '#23544e',
    secondary: '#2d6b63',
    tertiary: '#3a7c75',
    light: '#e8f4f3',
    gray: '#6b7280'
  }

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: { 
    active?: boolean; 
    payload?: Array<{ name: string; value: number; color: string }>; 
    label?: string 
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="text-sm font-medium text-gray-900">{label}</p>
          {payload.map((entry, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <ArrowUpIcon className="w-4 h-4 text-green-600" />
      case 'down':
        return <ArrowDownIcon className="w-4 h-4 text-red-600" />
      default:
        return <MinusIcon className="w-4 h-4 text-gray-600" />
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-600'
      case 'down':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

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
                          subItem.name === 'Performance Analytics'
                            ? 'text-[#23544e] bg-gray-50 font-medium'
                            : 'text-gray-600 hover:text-[#23544e] hover:bg-gray-50'
                        }`}
                      >
                        <div className={`mr-3 flex-shrink-0 w-2 h-2 rounded-full ${
                          subItem.name === 'Performance Analytics'
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
                <h1 className="text-3xl font-bold text-gray-900">Performance Analytics</h1>
                <p className="mt-2 text-gray-600">Track and analyze employee performance trends across the organization</p>
              </div>
              <div className="flex space-x-3">
                <button className="bg-white text-gray-700 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                  Export Report
                </button>
                <button className="bg-[#23544e] text-white px-6 py-2 rounded-lg hover:bg-[#1a3f3a] transition-colors">
                  Schedule Report
                </button>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

              {/* Time Period Filter */}
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#23544e] focus:border-transparent appearance-none"
                >
                  {timePeriods.map(period => (
                    <option key={period} value={period}>{period}</option>
                  ))}
                </select>
              </div>

              {/* Performance Band Filter */}
              <div className="relative">
                <ChartBarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={selectedBand}
                  onChange={(e) => setSelectedBand(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#23544e] focus:border-transparent appearance-none"
                >
                  {performanceBands.map(band => (
                    <option key={band} value={band}>{band}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Performance Trends Chart */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Trends Over Time</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="month" 
                      stroke={brandColors.gray}
                      fontSize={12}
                    />
                    <YAxis 
                      domain={[3, 5]}
                      stroke={brandColors.gray}
                      fontSize={12}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="overall" 
                      stroke={brandColors.primary} 
                      strokeWidth={3}
                      name="Overall"
                      dot={{ fill: brandColors.primary, strokeWidth: 2, r: 4 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="engineering" 
                      stroke={brandColors.secondary} 
                      strokeWidth={2}
                      name="Engineering"
                      dot={{ fill: brandColors.secondary, strokeWidth: 2, r: 3 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="marketing" 
                      stroke={brandColors.tertiary} 
                      strokeWidth={2}
                      name="Marketing"
                      dot={{ fill: brandColors.tertiary, strokeWidth: 2, r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Performance Distribution */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Distribution</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={performanceDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="count"
                      label={({ name, percentage }) => `${name}: ${percentage}%`}
                    >
                      <Cell fill={brandColors.primary} />
                      <Cell fill={brandColors.secondary} />
                      <Cell fill={brandColors.tertiary} />
                      <Cell fill={brandColors.gray} />
                      <Cell fill="#d1d5db" />
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Department Performance and Top Performers */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Department Performance */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Performance</h3>
              <div className="space-y-4">
                {departmentPerformance.map((dept) => (
                  <div key={dept.department} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{dept.department}</h4>
                      <p className="text-sm text-gray-600">{dept.employees} employees</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-lg font-semibold text-gray-900">{dept.avgRating.toFixed(1)}</div>
                        <div className={`text-sm flex items-center ${getTrendColor(dept.trend)}`}>
                          {getTrendIcon(dept.trend)}
                          <span className="ml-1">{Math.abs(dept.change).toFixed(1)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Performers */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performers</h3>
              <div className="space-y-4">
                {topPerformers.map((performer, index) => (
                  <div key={performer.name} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                        {index < 3 ? (
                          <TrophyIcon className="w-5 h-5 text-yellow-600" />
                        ) : (
                          <UserIcon className="w-5 h-5 text-gray-600" />
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{performer.name}</h4>
                      <p className="text-sm text-gray-600">{performer.role} • {performer.department}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-gray-900">{performer.rating}</div>
                      <div className="text-sm text-gray-600">Rating</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Performance Distribution Table */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Band Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {performanceDistribution.map((band) => (
                <div key={band.band} className="text-center p-4 rounded-lg border border-gray-200">
                  <div className={`w-16 h-16 mx-auto rounded-full ${band.color} flex items-center justify-center mb-3`}>
                    <span className="text-white font-bold text-lg">{band.count}</span>
                  </div>
                  <h4 className="font-medium text-gray-900">{band.band}</h4>
                  <p className="text-sm text-gray-600">{band.percentage}% of total</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}