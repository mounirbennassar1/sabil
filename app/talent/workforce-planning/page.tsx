'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  HomeIcon,
  UserGroupIcon,
  ChartBarIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  AcademicCapIcon,
  UserPlusIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  BriefcaseIcon,
  BuildingOfficeIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon
} from '@heroicons/react/24/outline'

export default function WorkforcePlanningPage() {
  const pathname = usePathname()
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    'Learning & Capability': true,
    'Talent Growth': false,
    'Talent Insight': false,
    'Future & Strategic': true,
    'Execution & Integration': false
  })

  const [selectedTimeframe, setSelectedTimeframe] = useState('next-12-months')
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [selectedView, setSelectedView] = useState('demand-supply')

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const talentManagementSections = [
    {
      name: 'Learning & Capability',
      icon: AcademicCapIcon,
      items: [
        { name: 'LMS Dashboard', href: '/dashboard/talent/lms-dashboard' },
        { name: 'Capability Assessment Tool', href: '/talent/capability-assessment' },
        { name: 'Gap Analysis View', href: '/dashboard/talent/gap-analysis' },
        { name: 'Courses', href: '/talent/courses' },
        { name: 'Course Categories', href: '/talent/course-categories' }
      ]
    },
    {
      name: 'Talent Growth',
      icon: ArrowTrendingUpIcon,
      items: [
        { name: 'Succession Planning Matrix', href: '/talent/succession-planning' },
        { name: 'Career Pathing Map', href: '/talent/career-pathing' },
        { name: 'Competency Framework', href: '/talent/competency-framework' }
      ]
    },
    {
      name: 'Talent Insight',
      icon: ChartBarIcon,
      items: [
        { name: 'Performance Analytics', href: '/talent/performance-analytics' },
        { name: 'Talent KPIs', href: '/talent/kpis' },
        { name: 'Culture & Engagement', href: '/talent/culture-engagement' }
      ]
    },
    {
      name: 'Future & Strategic',
      icon: ArrowTrendingUpIcon,
      items: [
        { name: 'Workforce Planning', href: '/talent/workforce-planning' },
        { name: 'Personalized Learning', href: '/talent/personalized-learning' },
        { name: 'Internal Talent Marketplace', href: '/talent/talent-marketplace' }
      ]
    },
    {
      name: 'Execution & Integration',
      icon: CheckCircleIcon,
      items: [
        { name: 'Change Management Plan', href: '/talent/change-management' },
        { name: 'ROI Tracking', href: '/talent/roi-tracking' }
      ]
    }
  ]

  // Sample workforce data
  const workforceData = {
    totalEmployees: 1247,
    projectedGrowth: 15.2,
    openPositions: 34,
    retirementRisk: 18,
    skillGaps: 12,
    turnoverRate: 8.3
  }

  const demandSupplyData = [
    {
      department: 'Engineering',
      currentCount: 145,
      projectedDemand: 180,
      projectedSupply: 165,
      gap: 15,
      gapType: 'shortage',
      priority: 'high'
    },
    {
      department: 'Product Management',
      currentCount: 32,
      projectedDemand: 45,
      projectedSupply: 38,
      gap: 7,
      gapType: 'shortage',
      priority: 'high'
    },
    {
      department: 'Sales',
      currentCount: 89,
      projectedDemand: 110,
      projectedSupply: 95,
      gap: 15,
      gapType: 'shortage',
      priority: 'medium'
    },
    {
      department: 'Marketing',
      currentCount: 56,
      projectedDemand: 65,
      projectedSupply: 68,
      gap: 3,
      gapType: 'surplus',
      priority: 'low'
    },
    {
      department: 'Human Resources',
      currentCount: 28,
      projectedDemand: 35,
      projectedSupply: 32,
      gap: 3,
      gapType: 'shortage',
      priority: 'medium'
    }
  ]

  const criticalRoles = [
    {
      role: 'Senior Software Engineer',
      department: 'Engineering',
      timeToFill: '45 days',
      difficulty: 'High',
      impactOnBusiness: 'Critical',
      currentOpenings: 8
    },
    {
      role: 'Product Manager',
      department: 'Product',
      timeToFill: '60 days',
      difficulty: 'High',
      impactOnBusiness: 'High',
      currentOpenings: 3
    },
    {
      role: 'Data Scientist',
      department: 'Engineering',
      timeToFill: '55 days',
      difficulty: 'High',
      impactOnBusiness: 'High',
      currentOpenings: 4
    },
    {
      role: 'Sales Manager',
      department: 'Sales',
      timeToFill: '35 days',
      difficulty: 'Medium',
      impactOnBusiness: 'High',
      currentOpenings: 2
    }
  ]

  const renderSidebar = () => (
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

        {/* Talent Management Strategy */}
        <div className="pt-4 pb-2">
          <div className="flex items-center px-3">
            <UserGroupIcon className="mr-2 h-5 w-5 text-[#23544e]" />
            <h3 className="text-sm font-semibold text-[#23544e] uppercase tracking-wider">
              Talent Management Strategy
            </h3>
          </div>
        </div>

        <Link
          href="/dashboard/talent-strategy"
          className="group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors text-gray-600 hover:text-[#23544e] hover:bg-gray-50"
        >
          <ArrowTrendingUpIcon className="mr-3 flex-shrink-0 h-5 w-5 text-[#23544e]" />
          Strategy Overview
        </Link>

        {talentManagementSections.map((section) => (
          <div key={section.name} className="space-y-1">
            <button
              onClick={() => toggleSection(section.name)}
              className="w-full group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors text-gray-700 hover:text-[#23544e] hover:bg-gray-50"
            >
              <div className="flex items-center">
                <section.icon className="mr-3 flex-shrink-0 h-5 w-5 text-[#23544e]" />
                {section.name}
              </div>
              {expandedSections[section.name] ? (
                <ChevronDownIcon className="h-4 w-4 text-gray-400" />
              ) : (
                <ChevronRightIcon className="h-4 w-4 text-gray-400" />
              )}
            </button>
            
            {expandedSections[section.name] && (
              <div className="ml-6 space-y-1">
                {section.items.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                      pathname === item.href
                        ? 'text-[#23544e] bg-[#23544e]/10 font-medium'
                        : 'text-gray-600 hover:text-[#23544e] hover:bg-gray-50'
                    }`}
                  >
                    <div className={`mr-3 flex-shrink-0 w-2 h-2 rounded-full ${
                      pathname === item.href ? 'bg-[#23544e]' : 'bg-gray-300 group-hover:bg-[#23544e]'
                    }`}></div>
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}

        <div className="pt-4 border-t border-gray-200"></div>

        {/* Other navigation items */}
        <Link href="/career" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-[#23544e] hover:bg-gray-50 rounded-lg transition-colors">
          <BriefcaseIcon className="h-5 w-5 mr-3" />
          My Career Journey
        </Link>
        
        <Link href="/learn" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-[#23544e] hover:bg-gray-50 rounded-lg transition-colors">
          <AcademicCapIcon className="h-5 w-5 mr-3" />
          Learn
        </Link>
      </nav>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {renderSidebar()}
        
        <div className="flex-1 overflow-auto bg-gray-50">
          <div className="p-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Workforce Planning</h1>
              <p className="text-lg text-gray-600">
                Strategic workforce supply and demand analysis with predictive planning capabilities
              </p>
            </div>

            {/* Controls */}
            <div className="mb-8 bg-white rounded-lg shadow p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time Frame</label>
                  <select
                    value={selectedTimeframe}
                    onChange={(e) => setSelectedTimeframe(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23544e] focus:border-transparent"
                  >
                    <option value="next-6-months">Next 6 Months</option>
                    <option value="next-12-months">Next 12 Months</option>
                    <option value="next-18-months">Next 18 Months</option>
                    <option value="next-24-months">Next 24 Months</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23544e] focus:border-transparent"
                  >
                    <option value="all">All Departments</option>
                    <option value="engineering">Engineering</option>
                    <option value="product">Product Management</option>
                    <option value="sales">Sales</option>
                    <option value="marketing">Marketing</option>
                    <option value="hr">Human Resources</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">View</label>
                  <select
                    value={selectedView}
                    onChange={(e) => setSelectedView(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23544e] focus:border-transparent"
                  >
                    <option value="demand-supply">Demand vs Supply</option>
                    <option value="gap-analysis">Gap Analysis</option>
                    <option value="risk-assessment">Risk Assessment</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <UserGroupIcon className="h-8 w-8 text-[#23544e]" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Employees</p>
                    <p className="text-2xl font-bold text-gray-900">{workforceData.totalEmployees.toLocaleString()}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <ArrowTrendingUpIcon className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Projected Growth</p>
                    <p className="text-2xl font-bold text-gray-900">{workforceData.projectedGrowth}%</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <UserPlusIcon className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Open Positions</p>
                    <p className="text-2xl font-bold text-gray-900">{workforceData.openPositions}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <ClockIcon className="h-8 w-8 text-yellow-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Retirement Risk</p>
                    <p className="text-2xl font-bold text-gray-900">{workforceData.retirementRisk}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <ExclamationTriangleIcon className="h-8 w-8 text-red-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Skill Gaps</p>
                    <p className="text-2xl font-bold text-gray-900">{workforceData.skillGaps}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <ArrowTrendingDownIcon className="h-8 w-8 text-red-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Turnover Rate</p>
                    <p className="text-2xl font-bold text-gray-900">{workforceData.turnoverRate}%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Demand vs Supply Analysis */}
            <div className="mb-8">
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">Workforce Demand vs Supply Analysis</h2>
                  <p className="text-sm text-gray-600 mt-1">12-month projection by department</p>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Projected Demand</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Projected Supply</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gap</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {demandSupplyData.map((dept, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <BuildingOfficeIcon className="h-5 w-5 text-gray-400 mr-3" />
                              <div className="text-sm font-medium text-gray-900">{dept.department}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{dept.currentCount}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{dept.projectedDemand}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{dept.projectedSupply}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              dept.gapType === 'shortage' 
                                ? 'bg-red-100 text-red-800' 
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {dept.gapType === 'shortage' ? '-' : '+'}{dept.gap}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              dept.priority === 'high' ? 'bg-red-100 text-red-800' :
                              dept.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {dept.priority.charAt(0).toUpperCase() + dept.priority.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-[#23544e] hover:text-[#1a3d39] transition-colors">
                              Create Plan
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Critical Roles */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Critical Roles & Hard-to-Fill Positions</h2>
                <p className="text-sm text-gray-600 mt-1">Focus areas for immediate attention</p>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Openings</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time to Fill</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Difficulty</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Business Impact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {criticalRoles.map((role, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{role.role}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{role.department}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {role.currentOpenings}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{role.timeToFill}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            role.difficulty === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {role.difficulty}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            role.impactOnBusiness === 'Critical' ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'
                          }`}>
                            {role.impactOnBusiness}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <button className="text-[#23544e] hover:text-[#1a3d39] transition-colors">
                            Create Hiring Plan
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}