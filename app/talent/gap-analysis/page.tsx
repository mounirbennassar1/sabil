'use client'

import { useState, useEffect } from 'react'
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
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  DocumentChartBarIcon,
  BriefcaseIcon,
  FunnelIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline'

export default function GapAnalysisView() {
  // Sidebar state
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({
    learningCapability: true, // Expanded by default since we're on gap analysis
    talentGrowth: false,
    talentInsight: false,
    futureStrategic: false,
    executionIntegration: false
  })

  // Filter and analysis state
  const [selectedRole, setSelectedRole] = useState<string>('all')
  const [selectedSkillType, setSelectedSkillType] = useState<string>('all')
  const [gapThreshold, setGapThreshold] = useState<number>(2)

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
        { name: 'Gap Analysis View', href: '/talent/gap-analysis' },
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

  // Mock data for gap analysis (in real app, this would come from assessment results)
  const roles = ['All Roles', 'Project Manager', 'Operations Specialist', 'Learning & Development Officer', 'Engineer', 'Sustainability Officer', 'HR Business Partner']
  
  const coreSkillsData = [
    { id: 'projectPlanning', name: 'Project Planning & Execution', current: 3.2, target: 4.0, gap: -0.8, priority: 'High' },
    { id: 'technicalExpertise', name: 'Technical Expertise', current: 2.8, target: 4.5, gap: -1.7, priority: 'Critical' },
    { id: 'dataAnalysis', name: 'Data Analysis & Reporting', current: 2.5, target: 3.5, gap: -1.0, priority: 'High' },
    { id: 'processImprovement', name: 'Process Improvement & Innovation', current: 3.0, target: 4.0, gap: -1.0, priority: 'Medium' },
    { id: 'digitalTools', name: 'Digital Tools & Systems', current: 3.5, target: 4.0, gap: -0.5, priority: 'Medium' }
  ]

  const behavioralCompetencies = [
    { id: 'collaboration', name: 'Collaboration & Teamwork', current: 3.8, target: 4.2, gap: -0.4, priority: 'Low' },
    { id: 'problemSolving', name: 'Problem Solving & Critical Thinking', current: 3.0, target: 4.0, gap: -1.0, priority: 'High' },
    { id: 'communication', name: 'Communication Skills', current: 3.2, target: 4.5, gap: -1.3, priority: 'High' },
    { id: 'adaptability', name: 'Adaptability & Change Management', current: 2.9, target: 4.0, gap: -1.1, priority: 'High' },
    { id: 'leadership', name: 'Leadership & Initiative', current: 2.7, target: 4.2, gap: -1.5, priority: 'Critical' }
  ]

  // Sample departmental data
  const departmentAnalysis = [
    { department: 'Engineering', avgGap: -1.2, criticalGaps: 3, employees: 45 },
    { department: 'Operations', avgGap: -0.8, criticalGaps: 2, employees: 32 },
    { department: 'HR', avgGap: -1.0, criticalGaps: 2, employees: 18 },
    { department: 'Sustainability', avgGap: -1.4, criticalGaps: 4, employees: 24 },
    { department: 'Learning & Dev', avgGap: -0.6, criticalGaps: 1, employees: 12 }
  ]

  // Calculate overall statistics
  const allSkills = [...coreSkillsData, ...behavioralCompetencies]
  const criticalGaps = allSkills.filter(skill => Math.abs(skill.gap) >= 1.5).length
  const highPriorityGaps = allSkills.filter(skill => skill.priority === 'High' || skill.priority === 'Critical').length
  const averageGap = allSkills.reduce((acc, skill) => acc + Math.abs(skill.gap), 0) / allSkills.length

  // Priority color mapping
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'text-red-600 bg-red-50'
      case 'High': return 'text-orange-600 bg-orange-50'
      case 'Medium': return 'text-yellow-600 bg-yellow-50'
      case 'Low': return 'text-green-600 bg-green-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getGapBarColor = (gap: number) => {
    const absGap = Math.abs(gap)
    if (absGap >= 1.5) return 'bg-red-500'
    if (absGap >= 1.0) return 'bg-orange-500'
    if (absGap >= 0.5) return 'bg-yellow-500'
    return 'bg-green-500'
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
                          subItem.name === 'Gap Analysis View'
                            ? 'text-[#23544e] bg-gray-50 font-medium'
                            : 'text-gray-600 hover:text-[#23544e] hover:bg-gray-50'
                        }`}
                      >
                        <div className={`mr-3 flex-shrink-0 w-2 h-2 rounded-full ${
                          subItem.name === 'Gap Analysis View'
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
                <h1 className="text-3xl font-bold text-gray-900">Gap Analysis View</h1>
                <p className="mt-2 text-gray-600">Identify skill gaps and prioritize development initiatives</p>
              </div>
              <Link
                href="/talent/capability-assessment"
                className="bg-[#23544e] text-white px-6 py-3 rounded-lg hover:bg-[#1a3f3a] transition-colors"
              >
                Take Assessment
              </Link>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <div className="flex items-center mb-4">
              <FunnelIcon className="w-5 h-5 text-[#23544e] mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Analysis Filters</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#23544e] focus:border-transparent"
                >
                  {roles.map(role => (
                    <option key={role} value={role.toLowerCase().replace(/\s+/g, '-')}>{role}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Skill Type</label>
                <select
                  value={selectedSkillType}
                  onChange={(e) => setSelectedSkillType(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#23544e] focus:border-transparent"
                >
                  <option value="all">All Skills</option>
                  <option value="core">Core Skills</option>
                  <option value="behavioral">Behavioral Competencies</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gap Threshold</label>
                <select
                  value={gapThreshold}
                  onChange={(e) => setGapThreshold(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#23544e] focus:border-transparent"
                >
                  <option value={0.5}>0.5+ Gap</option>
                  <option value={1.0}>1.0+ Gap</option>
                  <option value={1.5}>1.5+ Gap</option>
                  <option value={2.0}>2.0+ Gap</option>
                </select>
              </div>
            </div>
          </div>

          {/* Summary Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                    <ExclamationTriangleIcon className="w-5 h-5 text-red-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Critical Gaps</p>
                  <p className="text-2xl font-bold text-gray-900">{criticalGaps}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <ArrowUpIcon className="w-5 h-5 text-orange-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">High Priority</p>
                  <p className="text-2xl font-bold text-gray-900">{highPriorityGaps}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <ChartBarIcon className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Average Gap</p>
                  <p className="text-2xl font-bold text-gray-900">{averageGap.toFixed(1)}</p>
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
                  <p className="text-sm font-medium text-gray-600">Total Skills</p>
                  <p className="text-2xl font-bold text-gray-900">{allSkills.length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Core Skills Gap Analysis */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Core Skills Gap Analysis</h3>
            <div className="space-y-4">
              {coreSkillsData.map((skill) => (
                <div key={skill.id} className="border border-gray-100 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <h4 className="font-medium text-gray-900">{skill.name}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(skill.priority)}`}>
                        {skill.priority}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Gap: <span className="font-semibold text-red-600">{skill.gap.toFixed(1)}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Current</p>
                      <p className="text-lg font-semibold text-gray-900">{skill.current.toFixed(1)}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Target</p>
                      <p className="text-lg font-semibold text-[#23544e]">{skill.target.toFixed(1)}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Gap</p>
                      <p className="text-lg font-semibold text-red-600">{Math.abs(skill.gap).toFixed(1)}</p>
                    </div>
                  </div>

                  {/* Visual Gap Bar */}
                  <div className="relative">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500 w-8">0</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-3 relative">
                        {/* Current level */}
                        <div
                          className="bg-blue-500 h-3 rounded-full"
                          style={{ width: `${(skill.current / 5) * 100}%` }}
                        ></div>
                        {/* Target level indicator */}
                        <div
                          className="absolute top-0 w-1 h-3 bg-[#23544e]"
                          style={{ left: `${(skill.target / 5) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500 w-8">5</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Current: {skill.current}</span>
                      <span>Target: {skill.target}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Behavioral Competencies Gap Analysis */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Behavioral Competencies Gap Analysis</h3>
            <div className="space-y-4">
              {behavioralCompetencies.map((competency) => (
                <div key={competency.id} className="border border-gray-100 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <h4 className="font-medium text-gray-900">{competency.name}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(competency.priority)}`}>
                        {competency.priority}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Gap: <span className="font-semibold text-red-600">{competency.gap.toFixed(1)}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Current</p>
                      <p className="text-lg font-semibold text-gray-900">{competency.current.toFixed(1)}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Target</p>
                      <p className="text-lg font-semibold text-[#23544e]">{competency.target.toFixed(1)}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Gap</p>
                      <p className="text-lg font-semibold text-red-600">{Math.abs(competency.gap).toFixed(1)}</p>
                    </div>
                  </div>

                  {/* Visual Gap Bar */}
                  <div className="relative">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500 w-8">0</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-3 relative">
                        {/* Current level */}
                        <div
                          className="bg-green-500 h-3 rounded-full"
                          style={{ width: `${(competency.current / 5) * 100}%` }}
                        ></div>
                        {/* Target level indicator */}
                        <div
                          className="absolute top-0 w-1 h-3 bg-[#23544e]"
                          style={{ left: `${(competency.target / 5) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500 w-8">5</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Current: {competency.current}</span>
                      <span>Target: {competency.target}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Department Analysis */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Department Gap Overview</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Department</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Employees</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Avg Gap</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Critical Gaps</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Priority</th>
                  </tr>
                </thead>
                <tbody>
                  {departmentAnalysis.map((dept, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-3 px-4 font-medium text-gray-900">{dept.department}</td>
                      <td className="py-3 px-4 text-gray-600">{dept.employees}</td>
                      <td className="py-3 px-4">
                        <span className={`font-semibold ${Math.abs(dept.avgGap) >= 1.0 ? 'text-red-600' : 'text-orange-600'}`}>
                          {dept.avgGap.toFixed(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-medium">
                          {dept.criticalGaps}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                          Math.abs(dept.avgGap) >= 1.2 ? 'bg-red-100 text-red-800' :
                          Math.abs(dept.avgGap) >= 0.8 ? 'bg-orange-100 text-orange-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {Math.abs(dept.avgGap) >= 1.2 ? 'High' :
                           Math.abs(dept.avgGap) >= 0.8 ? 'Medium' : 'Low'}
                        </span>
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
  )
}