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
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ArrowUpIcon,
  DocumentChartBarIcon,
  BriefcaseIcon,
  FunnelIcon,
  PresentationChartLineIcon,
  ChartPieIcon,
  ClockIcon,
  LightBulbIcon,
  TargetIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  BuildingOfficeIcon,
  UsersIcon
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

  // Mock data for gap analysis (in real app, this would come from assessment results)
  const roles = ['All Roles', 'Project Manager', 'Operations Specialist', 'Learning & Development Officer', 'Engineer', 'Sustainability Officer', 'HR Business Partner']
  
  const coreSkillsData = [
    { id: 'projectPlanning', name: 'Project Planning & Execution', current: 3.2, target: 4.0, gap: -0.8, priority: 'High', trend: 'up', improvement: 0.3 },
    { id: 'technicalExpertise', name: 'Technical Expertise', current: 2.8, target: 4.5, gap: -1.7, priority: 'Critical', trend: 'down', improvement: -0.1 },
    { id: 'dataAnalysis', name: 'Data Analysis & Reporting', current: 2.5, target: 3.5, gap: -1.0, priority: 'High', trend: 'up', improvement: 0.2 },
    { id: 'processImprovement', name: 'Process Improvement & Innovation', current: 3.0, target: 4.0, gap: -1.0, priority: 'Medium', trend: 'stable', improvement: 0.0 },
    { id: 'digitalTools', name: 'Digital Tools & Systems', current: 3.5, target: 4.0, gap: -0.5, priority: 'Medium', trend: 'up', improvement: 0.4 }
  ]

  const behavioralCompetencies = [
    { id: 'collaboration', name: 'Collaboration & Teamwork', current: 3.8, target: 4.2, gap: -0.4, priority: 'Low', trend: 'up', improvement: 0.2 },
    { id: 'problemSolving', name: 'Problem Solving & Critical Thinking', current: 3.0, target: 4.0, gap: -1.0, priority: 'High', trend: 'up', improvement: 0.3 },
    { id: 'communication', name: 'Communication Skills', current: 3.2, target: 4.5, gap: -1.3, priority: 'High', trend: 'up', improvement: 0.4 },
    { id: 'adaptability', name: 'Adaptability & Change Management', current: 2.9, target: 4.0, gap: -1.1, priority: 'High', trend: 'stable', improvement: 0.1 },
    { id: 'leadership', name: 'Leadership & Initiative', current: 2.7, target: 4.2, gap: -1.5, priority: 'Critical', trend: 'up', improvement: 0.5 }
  ]

  // Sample departmental data
  const departmentAnalysis = [
    { department: 'Engineering', avgGap: -1.2, criticalGaps: 3, employees: 45, budget: 125000, completionRate: 78 },
    { department: 'Operations', avgGap: -0.8, criticalGaps: 2, employees: 32, budget: 85000, completionRate: 85 },
    { department: 'HR', avgGap: -1.0, criticalGaps: 2, employees: 18, budget: 55000, completionRate: 92 },
    { department: 'Sustainability', avgGap: -1.4, criticalGaps: 4, employees: 24, budget: 70000, completionRate: 70 },
    { department: 'Learning & Dev', avgGap: -0.6, criticalGaps: 1, employees: 12, budget: 35000, completionRate: 95 }
  ]

  // Gap distribution for pie chart
  const gapDistribution = [
    { category: 'Critical (1.5+)', count: 2, percentage: 20, color: 'bg-red-500' },
    { category: 'High (1.0-1.4)', count: 5, percentage: 50, color: 'bg-orange-500' },
    { category: 'Medium (0.5-0.9)', count: 2, percentage: 20, color: 'bg-yellow-500' },
    { category: 'Low (<0.5)', count: 1, percentage: 10, color: 'bg-green-500' }
  ]

  // Training recommendations
  const trainingRecommendations = [
    { skill: 'Technical Expertise', urgency: 'Critical', estimatedTime: '6 months', cost: 15000, roi: '250%' },
    { skill: 'Leadership & Initiative', urgency: 'Critical', estimatedTime: '4 months', cost: 8000, roi: '180%' },
    { skill: 'Communication Skills', urgency: 'High', estimatedTime: '3 months', cost: 5000, roi: '150%' },
    { skill: 'Data Analysis', urgency: 'High', estimatedTime: '2 months', cost: 3000, roi: '120%' }
  ]

  // Quarterly progression data
  const quarterlyProgress = [
    { quarter: 'Q1 2024', avgGap: 1.8, improved: 2, deteriorated: 1 },
    { quarter: 'Q2 2024', avgGap: 1.6, improved: 3, deteriorated: 0 },
    { quarter: 'Q3 2024', avgGap: 1.4, improved: 4, deteriorated: 1 },
    { quarter: 'Q4 2024', avgGap: 1.1, improved: 5, deteriorated: 0 }
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
                  <p className="text-xs text-red-600 mt-1">Immediate action required</p>
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
                  <p className="text-xs text-orange-600 mt-1">Plan training soon</p>
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
                  <p className="text-xs text-blue-600 mt-1">Organization-wide</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <UsersIcon className="w-5 h-5 text-green-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Employees</p>
                  <p className="text-2xl font-bold text-gray-900">131</p>
                  <p className="text-xs text-green-600 mt-1">Assessed across 5 depts</p>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Gap Distribution Pie Chart */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center mb-6">
                <ChartPieIcon className="w-5 h-5 text-[#23544e] mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Gap Distribution</h3>
              </div>
              
              {/* Simple pie chart visualization */}
              <div className="flex items-center justify-center mb-6">
                <div className="relative w-48 h-48">
                  <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
                    {/* Background circle */}
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#f3f4f6" strokeWidth="8"/>
                    
                    {/* Critical segment (20%) */}
                    <circle 
                      cx="50" cy="50" r="40" 
                      fill="none" 
                      stroke="#ef4444" 
                      strokeWidth="8"
                      strokeDasharray="50.4 251.2"
                      strokeDashoffset="0"
                    />
                    
                    {/* High segment (50%) */}
                    <circle 
                      cx="50" cy="50" r="40" 
                      fill="none" 
                      stroke="#f97316" 
                      strokeWidth="8"
                      strokeDasharray="125.6 175.6"
                      strokeDashoffset="-50.4"
                    />
                    
                    {/* Medium segment (20%) */}
                    <circle 
                      cx="50" cy="50" r="40" 
                      fill="none" 
                      stroke="#eab308" 
                      strokeWidth="8"
                      strokeDasharray="50.4 251.2"
                      strokeDashoffset="-176"
                    />
                    
                    {/* Low segment (10%) */}
                    <circle 
                      cx="50" cy="50" r="40" 
                      fill="none" 
                      stroke="#22c55e" 
                      strokeWidth="8"
                      strokeDasharray="25.2 276.4"
                      strokeDashoffset="-226.4"
                    />
                  </svg>
                  
                  {/* Center text */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{allSkills.length}</div>
                      <div className="text-sm text-gray-600">Total Skills</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="space-y-3">
                {gapDistribution.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-3 ${item.color}`}></div>
                      <span className="text-sm text-gray-700">{item.category}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-900">{item.count}</span>
                      <span className="text-xs text-gray-500">({item.percentage}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quarterly Progress Chart */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center mb-6">
                <PresentationChartLineIcon className="w-5 h-5 text-[#23544e] mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Quarterly Progress</h3>
              </div>
              
              {/* Progress chart */}
              <div className="space-y-4 mb-6">
                {quarterlyProgress.map((quarter, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium text-gray-700 w-20">{quarter.quarter}</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2 w-32">
                        <div
                          className="bg-[#23544e] h-2 rounded-full transition-all duration-500"
                          style={{ width: `${((2.0 - quarter.avgGap) / 2.0) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{quarter.avgGap.toFixed(1)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <TrendingUpIcon className="w-4 h-4 text-green-600 mr-1" />
                        <span className="text-xs text-green-600">{quarter.improved}</span>
                      </div>
                      <div className="flex items-center">
                        <TrendingDownIcon className="w-4 h-4 text-red-600 mr-1" />
                        <span className="text-xs text-red-600">{quarter.deteriorated}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center">
                  <TrendingUpIcon className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-sm font-medium text-green-800">
                    39% improvement over the year
                  </span>
                </div>
                <p className="text-xs text-green-700 mt-1">
                  Average gap reduced from 1.8 to 1.1
                </p>
              </div>
            </div>
          </div>

          {/* Training Recommendations */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <LightBulbIcon className="w-5 h-5 text-[#23544e] mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Training Recommendations</h3>
              </div>
              <span className="bg-[#23544e] text-white px-3 py-1 rounded-full text-sm font-medium">
                AI-Powered
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {trainingRecommendations.map((rec, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-gray-900">{rec.skill}</h4>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                        rec.urgency === 'Critical' ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'
                      }`}>
                        {rec.urgency} Priority
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-[#23544e]">{rec.roi}</div>
                      <div className="text-xs text-gray-600">Expected ROI</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="flex items-center">
                      <ClockIcon className="w-4 h-4 text-gray-400 mr-2" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{rec.estimatedTime}</div>
                        <div className="text-xs text-gray-600">Duration</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <TargetIcon className="w-4 h-4 text-gray-400 mr-2" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">${rec.cost.toLocaleString()}</div>
                        <div className="text-xs text-gray-600">Investment</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Skills Gap Analysis */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Core Skills Gap Analysis</h3>
            <div className="space-y-4">
              {coreSkillsData.map((skill) => (
                <div key={skill.id} className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <h4 className="font-medium text-gray-900">{skill.name}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(skill.priority)}`}>
                        {skill.priority}
                      </span>
                      {/* Trend indicator */}
                      {skill.trend === 'up' && <TrendingUpIcon className="w-4 h-4 text-green-600" />}
                      {skill.trend === 'down' && <TrendingDownIcon className="w-4 h-4 text-red-600" />}
                      {skill.trend === 'stable' && <div className="w-4 h-4 bg-gray-400 rounded-full"></div>}
                    </div>
                    <div className="text-sm text-gray-600">
                      Gap: <span className="font-semibold text-red-600">{skill.gap.toFixed(1)}</span>
                      {skill.improvement !== 0 && (
                        <span className={`ml-2 text-xs ${skill.improvement > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          ({skill.improvement > 0 ? '+' : ''}{skill.improvement.toFixed(1)})
                        </span>
                      )}
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
                <div key={competency.id} className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <h4 className="font-medium text-gray-900">{competency.name}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(competency.priority)}`}>
                        {competency.priority}
                      </span>
                      {/* Trend indicator */}
                      {competency.trend === 'up' && <TrendingUpIcon className="w-4 h-4 text-green-600" />}
                      {competency.trend === 'down' && <TrendingDownIcon className="w-4 h-4 text-red-600" />}
                      {competency.trend === 'stable' && <div className="w-4 h-4 bg-gray-400 rounded-full"></div>}
                    </div>
                    <div className="text-sm text-gray-600">
                      Gap: <span className="font-semibold text-red-600">{competency.gap.toFixed(1)}</span>
                      {competency.improvement !== 0 && (
                        <span className={`ml-2 text-xs ${competency.improvement > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          ({competency.improvement > 0 ? '+' : ''}{competency.improvement.toFixed(1)})
                        </span>
                      )}
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
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <div className="flex items-center mb-6">
              <BuildingOfficeIcon className="w-5 h-5 text-[#23544e] mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Department Gap Overview</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Department</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Employees</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Avg Gap</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Critical Gaps</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Budget</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Completion Rate</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Priority</th>
                  </tr>
                </thead>
                <tbody>
                  {departmentAnalysis.map((dept, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
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
                      <td className="py-3 px-4 text-gray-600">
                        ${dept.budget.toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2 min-w-[60px]">
                            <div
                              className={`h-2 rounded-full ${
                                dept.completionRate >= 90 ? 'bg-green-500' :
                                dept.completionRate >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${dept.completionRate}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">{dept.completionRate}%</span>
                        </div>
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

          {/* Action Items & Next Steps */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center mb-6">
              <CheckCircleIcon className="w-5 h-5 text-[#23544e] mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Recommended Action Items</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Immediate Actions */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 flex items-center">
                  <ExclamationTriangleIcon className="w-4 h-4 text-red-600 mr-2" />
                  Immediate Actions (Next 30 days)
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Launch Technical Expertise Training</p>
                      <p className="text-xs text-gray-600">Critical gap affecting 45 engineers</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Leadership Development Program</p>
                      <p className="text-xs text-gray-600">Address critical leadership gaps</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Communication Skills Workshop</p>
                      <p className="text-xs text-gray-600">High priority across all departments</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Long-term Strategy */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 flex items-center">
                  <TargetIcon className="w-4 h-4 text-blue-600 mr-2" />
                  Long-term Strategy (90+ days)
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Competency-based Career Paths</p>
                      <p className="text-xs text-gray-600">Align development with growth opportunities</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Mentorship Program</p>
                      <p className="text-xs text-gray-600">Peer-to-peer skill development</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Digital Skills Platform</p>
                      <p className="text-xs text-gray-600">Continuous learning infrastructure</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Metrics */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#23544e]">$31K</div>
                  <div className="text-sm text-gray-600">Total Training Investment</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">385%</div>
                  <div className="text-sm text-gray-600">Expected ROI</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">6-8</div>
                  <div className="text-sm text-gray-600">Months to Close Critical Gaps</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}