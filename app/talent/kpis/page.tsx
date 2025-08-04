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
  CheckCircleIcon,
  UsersIcon,
  ClockIcon,
  TrophyIcon,
  BuildingOfficeIcon,
  AcademicCapIcon,
  HeartIcon,
  CurrencyDollarIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  MinusIcon
} from '@heroicons/react/24/outline'

export default function TalentKPIsPage() {
  // Sidebar state
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({
    learningCapability: false,
    talentGrowth: false,
    talentInsight: true, // Expanded by default since we're on talent KPIs
    futureStrategic: false,
    executionIntegration: false
  })

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

  // Brand colors
  const brandColors = {
    primary: '#23544e',
    secondary: '#2d6b63',
    tertiary: '#3a7c75',
    light: '#e8f4f3',
    gray: '#6b7280'
  }

  // KPI data
  const talentKPIs = [
    {
      id: 1,
      title: 'Critical Roles Filled',
      value: '87%',
      target: '90%',
      trend: 'up',
      change: '+3%',
      icon: CheckCircleIcon,
      color: 'green',
      description: 'Percentage of critical positions with qualified incumbents'
    },
    {
      id: 2,
      title: 'Ready-Now Successors',
      value: '42%',
      target: '60%',
      trend: 'up',
      change: '+8%',
      icon: UsersIcon,
      color: 'blue',
      description: 'Percentage of critical roles with ready successors'
    },
    {
      id: 3,
      title: 'Internal Mobility Rate',
      value: '18%',
      target: '25%',
      trend: 'up',
      change: '+2%',
      icon: ArrowTrendingUpIcon,
      color: 'purple',
      description: 'Percentage of positions filled internally'
    },
    {
      id: 4,
      title: 'Average Time in Role',
      value: '2.3 years',
      target: '2.5 years',
      trend: 'down',
      change: '-0.2',
      icon: ClockIcon,
      color: 'orange',
      description: 'Average tenure in current position'
    },
    {
      id: 5,
      title: 'High Performer Retention',
      value: '94%',
      target: '95%',
      trend: 'stable',
      change: '0%',
      icon: TrophyIcon,
      color: 'yellow',
      description: 'Retention rate of top 20% performers'
    },
    {
      id: 6,
      title: 'Leadership Pipeline Health',
      value: '78%',
      target: '85%',
      trend: 'up',
      change: '+5%',
      icon: BuildingOfficeIcon,
      color: 'indigo',
      description: 'Percentage of leadership roles with identified successors'
    },
    {
      id: 7,
      title: 'Skills Gap Coverage',
      value: '65%',
      target: '80%',
      trend: 'up',
      change: '+12%',
      icon: AcademicCapIcon,
      color: 'pink',
      description: 'Percentage of identified skill gaps being addressed'
    },
    {
      id: 8,
      title: 'Employee Engagement',
      value: '7.8/10',
      target: '8.5/10',
      trend: 'up',
      change: '+0.3',
      icon: HeartIcon,
      color: 'red',
      description: 'Overall employee engagement score'
    },
    {
      id: 9,
      title: 'Training ROI',
      value: '340%',
      target: '300%',
      trend: 'up',
      change: '+40%',
      icon: CurrencyDollarIcon,
      color: 'green',
      description: 'Return on investment for training programs'
    }
  ]



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

  // Summary calculations
  const onTrackKPIs = talentKPIs.filter(kpi => {
    if (kpi.value.includes('%')) {
      const current = parseFloat(kpi.value.replace('%', ''))
      const target = parseFloat(kpi.target.replace('%', ''))
      return current >= target * 0.9 // Within 90% of target
    } else if (kpi.value.includes('/')) {
      const current = parseFloat(kpi.value.split('/')[0])
      const target = parseFloat(kpi.target.split('/')[0])
      return current >= target * 0.9
    } else {
      return true // For other metrics, assume on track
    }
  }).length

  const improvingKPIs = talentKPIs.filter(kpi => kpi.trend === 'up').length

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
                          subItem.name === 'Talent KPIs'
                            ? 'text-[#23544e] bg-gray-50 font-medium'
                            : 'text-gray-600 hover:text-[#23544e] hover:bg-gray-50'
                        }`}
                      >
                        <div className={`mr-3 flex-shrink-0 w-2 h-2 rounded-full ${
                          subItem.name === 'Talent KPIs'
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
                <h1 className="text-3xl font-bold text-gray-900">Talent KPIs</h1>
                <p className="mt-2 text-gray-600">Executive-level key performance indicators for talent management</p>
              </div>
              <div className="flex space-x-3">
                <button className="bg-white text-gray-700 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                  Export Dashboard
                </button>
                <button className="bg-[#23544e] text-white px-6 py-2 rounded-lg hover:bg-[#1a3f3a] transition-colors">
                  Configure KPIs
                </button>
              </div>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <ChartBarIcon className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total KPIs</p>
                  <p className="text-2xl font-bold text-gray-900">{talentKPIs.length}</p>
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
                  <p className="text-sm font-medium text-gray-600">On Track</p>
                  <p className="text-2xl font-bold text-gray-900">{onTrackKPIs}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <ArrowTrendingUpIcon className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Improving</p>
                  <p className="text-2xl font-bold text-gray-900">{improvingKPIs}</p>
                </div>
              </div>
            </div>
          </div>

          {/* KPI Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {talentKPIs.map((kpi) => {
              const IconComponent = kpi.icon
              
              return (
                <div key={kpi.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
                  {/* KPI Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6" style={{ color: brandColors.primary }} />
                    </div>
                    <div className={`flex items-center ${getTrendColor(kpi.trend)}`}>
                      {getTrendIcon(kpi.trend)}
                      <span className="ml-1 text-sm font-medium">{kpi.change}</span>
                    </div>
                  </div>

                  {/* KPI Content */}
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{kpi.title}</h3>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-3xl font-bold text-gray-900">{kpi.value}</span>
                      <span className="text-sm text-gray-500">/ {kpi.target}</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-300"
                        style={{ 
                          backgroundColor: brandColors.primary,
                          width: `${Math.min(
                            kpi.value.includes('%') ? 
                              (parseFloat(kpi.value.replace('%', '')) / parseFloat(kpi.target.replace('%', ''))) * 100 :
                            kpi.value.includes('/') ?
                              (parseFloat(kpi.value.split('/')[0]) / parseFloat(kpi.target.split('/')[0])) * 100 :
                              75, // Default for other metrics
                            100
                          )}%` 
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600">{kpi.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}