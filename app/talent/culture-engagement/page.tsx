'use client'

import React, { useState } from 'react'
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
  HeartIcon,
  ChatBubbleLeftRightIcon,
  BuildingOfficeIcon,
  AcademicCapIcon,
  FaceSmileIcon,
  CalendarIcon,
  StarIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
  FaceFrownIcon
} from '@heroicons/react/24/outline'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

export default function CultureEngagementPage(): React.JSX.Element {
  // Sidebar state
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({
    learningCapability: false,
    talentGrowth: false,
    talentInsight: true, // Expanded by default since we're on culture & engagement
    futureStrategic: false,
    executionIntegration: false
  })

  // Filter state
  const [selectedPeriod, setSelectedPeriod] = useState('Q4 2024')
  const [selectedLocation, setSelectedLocation] = useState('All Locations')

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

  // Engagement data
  const engagementOverview = {
    overallScore: 7.8,
    responseRate: 87,
    totalResponses: 523,
    previousScore: 7.3,
    trend: 'up'
  }

  const sentimentCategories = [
    {
      category: 'Leadership',
      score: 8.2,
      trend: 'up',
      color: 'blue',
      icon: BuildingOfficeIcon,
      description: 'Trust and confidence in leadership'
    },
    {
      category: 'Belonging',
      score: 7.5,
      trend: 'up',
      color: 'purple',
      icon: HeartIcon,
      description: 'Sense of inclusion and belonging'
    },
    {
      category: 'Growth',
      score: 7.9,
      trend: 'stable',
      color: 'green',
      icon: AcademicCapIcon,
      description: 'Career development opportunities'
    },
    {
      category: 'Recognition',
      score: 6.8,
      trend: 'down',
      color: 'yellow',
      icon: StarIcon,
      description: 'Feeling valued and recognized'
    },
    {
      category: 'Work-Life Balance',
      score: 8.0,
      trend: 'up',
      color: 'orange',
      icon: FaceSmileIcon,
      description: 'Balance between work and personal life'
    },
    {
      category: 'Communication',
      score: 7.2,
      trend: 'stable',
      color: 'indigo',
      icon: ChatBubbleLeftRightIcon,
      description: 'Transparency and open communication'
    }
  ]

  const teamEngagement = [
    { team: 'Engineering', score: 8.1, participation: 92, size: 45 },
    { team: 'Product', score: 7.9, participation: 88, size: 22 },
    { team: 'Marketing', score: 7.7, participation: 85, size: 28 },
    { team: 'Sales', score: 7.4, participation: 89, size: 32 },
    { team: 'HR', score: 8.3, participation: 95, size: 12 },
    { team: 'Finance', score: 7.1, participation: 83, size: 18 },
    { team: 'Operations', score: 7.6, participation: 87, size: 35 }
  ]

  const recentComments = [
    {
      id: 1,
      text: "I appreciate the flexible work arrangements and how leadership has been transparent about company goals.",
      sentiment: 'positive',
      category: 'Work-Life Balance',
      date: '2024-01-28',
      anonymous: true
    },
    {
      id: 2,
      text: "The new learning platform is great, but I wish we had more time allocated for professional development.",
      sentiment: 'mixed',
      category: 'Growth',
      date: '2024-01-27',
      anonymous: true
    },
    {
      id: 3,
      text: "Team collaboration has improved significantly since the new project management tools were introduced.",
      sentiment: 'positive',
      category: 'Communication',
      date: '2024-01-26',
      anonymous: true
    },
    {
      id: 4,
      text: "Recognition for achievements could be more consistent across different teams and departments.",
      sentiment: 'negative',
      category: 'Recognition',
      date: '2024-01-25',
      anonymous: true
    },
    {
      id: 5,
      text: "Leadership is very approachable and I feel comfortable sharing ideas and concerns.",
      sentiment: 'positive',
      category: 'Leadership',
      date: '2024-01-24',
      anonymous: true
    }
  ]

  // Brand colors
  const brandColors = {
    primary: '#23544e',
    secondary: '#2d6b63',
    tertiary: '#3a7c75',
    light: '#e8f4f3',
    gray: '#6b7280'
  }

  // Donut chart data for overall engagement
  const engagementData = [
    { name: 'Engaged', value: engagementOverview.overallScore, color: brandColors.primary },
    { name: 'Remaining', value: 10 - engagementOverview.overallScore, color: '#e5e7eb' }
  ]

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number }> }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="text-sm font-medium text-gray-900">
            {payload[0].name}: {payload[0].value.toFixed(1)}
          </p>
        </div>
      )
    }
    return null
  }

  // Donut chart component
  const DonutChart = ({ score }: { score: number }) => (
    <div className="relative flex items-center justify-center">
      <div className="w-32 h-32">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={engagementData}
              cx="50%"
              cy="50%"
              innerRadius={35}
              outerRadius={60}
              startAngle={90}
              endAngle={450}
              dataKey="value"
            >
              {engagementData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{score}</div>
            <div className="text-xs text-gray-600">/ 10</div>
          </div>
        </div>
      </div>
    </div>
  )

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <HandThumbUpIcon className="w-4 h-4 text-green-600" />
      case 'negative':
        return <HandThumbDownIcon className="w-4 h-4 text-red-600" />
      default:
        return <FaceFrownIcon className="w-4 h-4 text-yellow-600" />
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'border-l-green-500 bg-green-50'
      case 'negative':
        return 'border-l-red-500 bg-red-50'
      default:
        return 'border-l-yellow-500 bg-yellow-50'
    }
  }

  const getColorClasses = (color: string) => {
    const colorMap: {[key: string]: {bg: string, text: string}} = {
      blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
      green: { bg: 'bg-green-100', text: 'text-green-600' },
      yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600' },
      orange: { bg: 'bg-orange-100', text: 'text-orange-600' },
      indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600' }
    }
    return colorMap[color] || colorMap.blue
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
                          subItem.name === 'Culture & Engagement'
                            ? 'text-[#23544e] bg-gray-50 font-medium'
                            : 'text-gray-600 hover:text-[#23544e] hover:bg-gray-50'
                        }`}
                      >
                        <div className={`mr-3 flex-shrink-0 w-2 h-2 rounded-full ${
                          subItem.name === 'Culture & Engagement'
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
              <DocumentChartBarIcon className="h-5 w-5 mr-3" />
              My Library
            </Link>
            <Link
              href="/content"
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-[#23544e] hover:bg-gray-50 rounded-lg transition-colors"
            >
              <DocumentChartBarIcon className="h-5 w-5 mr-3" />
              Content
            </Link>
            <Link
              href="/ai"
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-[#23544e] hover:bg-gray-50 rounded-lg transition-colors"
            >
              <CogIcon className="h-5 w-5 mr-3" />
              Apply AI
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
                <h1 className="text-3xl font-bold text-gray-900">Culture & Engagement</h1>
                <p className="mt-2 text-gray-600">Monitor employee engagement and organizational culture health</p>
              </div>
              <div className="flex space-x-3">
                <button className="bg-white text-gray-700 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                  Export Results
                </button>
                <button className="bg-[#23544e] text-white px-6 py-2 rounded-lg hover:bg-[#1a3f3a] transition-colors">
                  New Survey
                </button>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Period Filter */}
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#23544e] focus:border-transparent appearance-none"
                >
                  <option value="Q4 2024">Q4 2024</option>
                  <option value="Q3 2024">Q3 2024</option>
                  <option value="Q2 2024">Q2 2024</option>
                  <option value="Q1 2024">Q1 2024</option>
                </select>
              </div>

              {/* Location Filter */}
              <div className="relative">
                <BuildingOfficeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#23544e] focus:border-transparent appearance-none"
                >
                  <option value="All Locations">All Locations</option>
                  <option value="New York">New York</option>
                  <option value="San Francisco">San Francisco</option>
                  <option value="London">London</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>
            </div>
          </div>

          {/* Overall Engagement Score */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Overall Engagement Score</h3>
              <div className="text-sm text-gray-600">
                Response Rate: <span className="font-semibold text-gray-900">{engagementOverview.responseRate}%</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="col-span-1 flex justify-center">
                <DonutChart score={engagementOverview.overallScore} />
              </div>
              
              <div className="col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold text-gray-900">{engagementOverview.totalResponses}</div>
                  <div className="text-sm text-gray-600">Total Responses</div>
                </div>
                
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-700">
                    +{(engagementOverview.overallScore - engagementOverview.previousScore).toFixed(1)}
                  </div>
                  <div className="text-sm text-gray-600">vs Previous Survey</div>
                </div>
                
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-700">{engagementOverview.responseRate}%</div>
                  <div className="text-sm text-gray-600">Participation Rate</div>
                </div>
              </div>
            </div>
          </div>

          {/* Sentiment Categories */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Engagement Categories</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sentimentCategories.map((category) => {
                const colorClasses = getColorClasses(category.color)
                const IconComponent = category.icon
                
                return (
                  <div key={category.category} className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 ${colorClasses.bg} rounded-lg flex items-center justify-center`}>
                        <IconComponent className={`w-6 h-6 ${colorClasses.text}`} />
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">{category.score}</div>
                        <div className="text-sm text-gray-600">/ 10</div>
                      </div>
                    </div>
                    
                    <h4 className="font-semibold text-gray-900 mb-2">{category.category}</h4>
                    <p className="text-sm text-gray-600 mb-4">{category.description}</p>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          category.color === 'blue' ? 'bg-blue-500' :
                          category.color === 'purple' ? 'bg-purple-500' :
                          category.color === 'green' ? 'bg-green-500' :
                          category.color === 'yellow' ? 'bg-yellow-500' :
                          category.color === 'orange' ? 'bg-orange-500' :
                          'bg-indigo-500'
                        }`}
                        style={{ width: `${(category.score / 10) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Team Engagement */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Engagement Scores</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={teamEngagement} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      type="number" 
                      domain={[0, 10]}
                      stroke={brandColors.gray}
                      fontSize={12}
                    />
                    <YAxis 
                      type="category" 
                      dataKey="team" 
                      stroke={brandColors.gray}
                      fontSize={12}
                      width={80}
                    />
                    <Tooltip 
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload
                          return (
                            <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                              <p className="text-sm font-medium text-gray-900">{label}</p>
                              <p className="text-sm" style={{ color: brandColors.primary }}>
                                Score: {data.score}/10
                              </p>
                              <p className="text-sm text-gray-600">
                                {data.size} members • {data.participation}% participation
                              </p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Bar 
                      dataKey="score" 
                      fill={brandColors.primary}
                      radius={[0, 4, 4, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Comments */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Feedback</h3>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {recentComments.map((comment) => (
                  <div key={comment.id} className={`p-4 border-l-4 rounded-r-lg ${getSentimentColor(comment.sentiment)}`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getSentimentIcon(comment.sentiment)}
                        <span className="text-sm font-medium text-gray-700">{comment.category}</span>
                      </div>
                      <span className="text-xs text-gray-500">{comment.date}</span>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{comment.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}