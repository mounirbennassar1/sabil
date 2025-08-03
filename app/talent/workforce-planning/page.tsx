'use client'

import { useState } from 'react'
import TalentLayout from '../../../components/layout/TalentLayout'
import {
  UserGroupIcon,
  FunnelIcon,
  ExclamationTriangleIcon,
  ArrowTrendingUpIcon as TrendingUpIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'

export default function WorkforcePlanning() {
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [selectedLocation, setSelectedLocation] = useState('all')
  const [selectedScenario, setSelectedScenario] = useState('current')

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  // Sidebar navigation data
  const sidebarItems = [
    { name: 'My Career Journey', href: '/career', icon: HomeIcon, current: false },
    { name: 'Learning Hub', href: '/learn', icon: BookOpenIcon, current: false },
    { name: 'Content Library', href: '/content', icon: BookOpenIcon, current: false },
    { name: 'AI Assistant', href: '/ai', icon: ArrowTrendingUpIcon, current: false },
  ]

  const talentManagementSections = [
    {
      id: 'learningCapability',
      name: 'Learning & Capability',
      icon: BookOpenIcon,
      items: [
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
      items: [
        { name: 'Succession Planning Matrix', href: '/talent/succession-planning' },
        { name: 'Career Pathing Map', href: '/talent/career-pathing' },
        { name: 'Competency Framework', href: '/talent/competency-framework' }
      ]
    },
    {
      id: 'talentInsight',
      name: 'Talent Insight',
      icon: ChartBarIcon,
      items: [
        { name: 'Performance Analytics', href: '/talent/performance-analytics' },
        { name: 'Talent KPIs', href: '/talent/kpis' },
        { name: 'Culture & Engagement', href: '/talent/culture-engagement' }
      ]
    },
    {
      id: 'futureStrategic',
      name: 'Future & Strategic',
      icon: MapIcon,
      items: [
        { name: 'Workforce Planning', href: '/talent/workforce-planning' },
        { name: 'Personalized Learning', href: '/talent/personalized-learning' },
        { name: 'Internal Talent Marketplace', href: '/talent/talent-marketplace' }
      ]
    },
    {
      id: 'executionIntegration',
      name: 'Execution & Integration',
      icon: CogIcon,
      items: [
        { name: 'Integration Placeholders', href: '/talent/integrations' },
        { name: 'Change Management Plan', href: '/talent/change-management' },
        { name: 'ROI Tracking', href: '/talent/roi-tracking' }
      ]
    }
  ]

  // Mock data for workforce planning
  const headcountForecast = [
    { month: 'Jan', current: 450, projected: 465, demand: 480 },
    { month: 'Feb', current: 455, projected: 475, demand: 490 },
    { month: 'Mar', current: 460, projected: 485, demand: 500 },
    { month: 'Apr', current: 465, projected: 495, demand: 510 },
    { month: 'May', current: 470, projected: 505, demand: 520 },
    { month: 'Jun', current: 475, projected: 515, demand: 530 }
  ]

  const skillsGapData = [
    { skill: 'Data Analytics', current: 75, required: 95, gap: 20 },
    { skill: 'Project Management', current: 85, required: 90, gap: 5 },
    { skill: 'Digital Marketing', current: 60, required: 85, gap: 25 },
    { skill: 'AI/ML', current: 40, required: 70, gap: 30 },
    { skill: 'Leadership', current: 70, required: 80, gap: 10 }
  ]

  const attritionRisk = [
    { department: 'Engineering', highRisk: 12, mediumRisk: 25, lowRisk: 63 },
    { department: 'Sales', highRisk: 18, mediumRisk: 32, lowRisk: 50 },
    { department: 'Marketing', highRisk: 8, mediumRisk: 22, lowRisk: 70 },
    { department: 'Operations', highRisk: 15, mediumRisk: 28, lowRisk: 57 },
    { department: 'HR', highRisk: 5, mediumRisk: 15, lowRisk: 80 }
  ]

  const departmentBreakdown = [
    { name: 'Engineering', value: 35, color: '#23544e' },
    { name: 'Sales', value: 25, color: '#2d6a5f' },
    { name: 'Marketing', value: 20, color: '#378070' },
    { name: 'Operations', value: 15, color: '#419681' },
    { name: 'HR', value: 5, color: '#4bac92' }
  ]

  const forecastData = [
    { quarter: 'Q1 2024', engineering: 120, sales: 85, marketing: 65, operations: 50, hr: 15 },
    { quarter: 'Q2 2024', engineering: 135, sales: 92, marketing: 70, operations: 55, hr: 18 },
    { quarter: 'Q3 2024', engineering: 145, sales: 98, marketing: 75, operations: 60, hr: 20 },
    { quarter: 'Q4 2024', engineering: 155, sales: 105, marketing: 80, operations: 65, hr: 22 }
  ]

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{label}</p>
          {payload.map((entry) => (
            <p key={entry.name} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-[#23544e]">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <h1 className="text-xl font-bold text-white">Talent Hub</h1>
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {/* Home */}
              <Link
                href="/dashboard"
                className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              >
                <HomeIcon className="text-gray-400 mr-3 flex-shrink-0 h-6 w-6" />
                Home
              </Link>

              {/* Talent Management Strategy Header */}
              <div className="pt-4">
                <h3 className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Talent Management Strategy
                </h3>
                
                {/* Strategy Overview */}
                <Link
                  href="/dashboard/talent-strategy"
                  className="mt-2 text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                >
                  <MapIcon className="text-gray-400 mr-3 flex-shrink-0 h-6 w-6" />
                  Strategy Overview
                </Link>

                {/* Expandable Sections */}
                <div className="mt-2 space-y-1">
                  {talentManagementSections.map((section) => (
                    <div key={section.id}>
                      <button
                        onClick={() => toggleSection(section.id as keyof typeof expandedSections)}
                        className="w-full text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                      >
                        <section.icon className="text-gray-400 mr-3 flex-shrink-0 h-6 w-6" />
                        <span className="flex-1 text-left">{section.name}</span>
                        {expandedSections[section.id as keyof typeof expandedSections] ? (
                          <ChevronUpIcon className="ml-2 h-4 w-4 text-gray-400" />
                        ) : (
                          <ChevronDownIcon className="ml-2 h-4 w-4 text-gray-400" />
                        )}
                      </button>
                      
                      {expandedSections[section.id as keyof typeof expandedSections] && (
                        <div className="ml-6 mt-1 space-y-1">
                          {section.items.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                                item.name === 'Workforce Planning'
                                  ? 'bg-gray-800 text-white'
                                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                              }`}
                            >
                              <span className="truncate">{item.name}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Original sidebar items */}
              <div className="pt-4 mt-4 border-t border-gray-700">
                {sidebarItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      item.current ? 'bg-gray-900 text-white' : ''
                    }`}
                  >
                    <item.icon className="text-gray-400 mr-3 flex-shrink-0 h-6 w-6" />
                    {item.name}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-64 flex flex-col flex-1">
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Workforce Planning</h1>
                <p className="mt-2 text-gray-600">Strategic workforce supply and demand analysis</p>
              </div>

              {/* Filters */}
              <div className="bg-white rounded-lg shadow p-6 mb-8">
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2">
                    <FunnelIcon className="h-5 w-5 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">Filters:</span>
                  </div>
                  
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#23544e]"
                  >
                    <option value="all">All Departments</option>
                    <option value="engineering">Engineering</option>
                    <option value="sales">Sales</option>
                    <option value="marketing">Marketing</option>
                    <option value="operations">Operations</option>
                    <option value="hr">HR</option>
                  </select>

                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#23544e]"
                  >
                    <option value="all">All Locations</option>
                    <option value="neom">NEOM</option>
                    <option value="riyadh">Riyadh</option>
                    <option value="jeddah">Jeddah</option>
                    <option value="remote">Remote</option>
                  </select>

                  <select
                    value={selectedScenario}
                    onChange={(e) => setSelectedScenario(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#23544e]"
                  >
                    <option value="current">Current Scenario</option>
                    <option value="optimistic">Optimistic Growth</option>
                    <option value="conservative">Conservative Growth</option>
                    <option value="aggressive">Aggressive Expansion</option>
                  </select>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <UserGroupIcon className="h-8 w-8 text-[#23544e]" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">Current Headcount</p>
                      <p className="text-2xl font-bold text-gray-900">475</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <TrendingUpIcon className="h-8 w-8 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">Projected (6M)</p>
                      <p className="text-2xl font-bold text-gray-900">515</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <ExclamationTriangleIcon className="h-8 w-8 text-yellow-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">Skills Gap</p>
                      <p className="text-2xl font-bold text-gray-900">18%</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <ArrowPathIcon className="h-8 w-8 text-red-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">Attrition Risk</p>
                      <p className="text-2xl font-bold text-gray-900">12%</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Headcount Forecast */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Headcount Forecast</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={headcountForecast}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Line type="monotone" dataKey="current" stroke="#23544e" strokeWidth={2} name="Current" />
                      <Line type="monotone" dataKey="projected" stroke="#2d6a5f" strokeWidth={2} name="Projected" />
                      <Line type="monotone" dataKey="demand" stroke="#419681" strokeWidth={2} name="Demand" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Department Breakdown */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Current Workforce by Department</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={departmentBreakdown}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {departmentBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Skills Gap Analysis */}
              <div className="bg-white rounded-lg shadow p-6 mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Skills Gap Analysis</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={skillsGapData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="skill" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="current" fill="#23544e" name="Current Level" />
                    <Bar dataKey="required" fill="#419681" name="Required Level" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Attrition Risk Table */}
              <div className="bg-white rounded-lg shadow p-6 mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Attrition Risk by Department</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Department
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          High Risk %
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Medium Risk %
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Low Risk %
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {attritionRisk.map((dept) => (
                        <tr key={dept.department}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {dept.department}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              {dept.highRisk}%
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              {dept.mediumRisk}%
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {dept.lowRisk}%
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {dept.highRisk > 15 ? (
                              <span className="text-red-600 font-medium">Action Required</span>
                            ) : dept.highRisk > 10 ? (
                              <span className="text-yellow-600 font-medium">Monitor</span>
                            ) : (
                              <span className="text-green-600 font-medium">Stable</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Quarterly Forecast Table */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Quarterly Headcount Forecast by Department</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quarter
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Engineering
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Sales
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Marketing
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Operations
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          HR
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {forecastData.map((quarter) => (
                        <tr key={quarter.quarter}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {quarter.quarter}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{quarter.engineering}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{quarter.sales}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{quarter.marketing}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{quarter.operations}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{quarter.hr}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {quarter.engineering + quarter.sales + quarter.marketing + quarter.operations + quarter.hr}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}