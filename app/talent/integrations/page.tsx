'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
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
  BriefcaseIcon,
  HeartIcon,
  StarIcon,
  SparklesIcon,
  CpuChipIcon,
  AcademicCapIcon,
  LinkIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline'

export default function IntegrationsPage() {
  // Sidebar state
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({
    learningCapability: false,
    talentGrowth: false,
    talentInsight: false,
    futureStrategic: false,
    executionIntegration: true // Expanded since we're in this section
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

  // Integration systems data
  const integrations = [
    {
      id: 'sap',
      name: 'SAP SuccessFactors',
      description: 'HR and talent management integration',
      logo: 'https://logos-world.net/wp-content/uploads/2020/09/SAP-Logo.png',
      status: 'Connected',
      lastSync: '2 hours ago',
      category: 'HR Systems',
      features: ['Employee Data', 'Performance Reviews', 'Learning Records'],
      color: '#0073e6'
    },
    {
      id: 'salesforce',
      name: 'Salesforce',
      description: 'CRM and customer relationship management',
      logo: 'https://logoeps.com/wp-content/uploads/2013/03/salesforce-vector-logo.png',
      status: 'Connected',
      lastSync: '1 hour ago',
      category: 'CRM',
      features: ['Customer Data', 'Sales Training', 'Lead Management'],
      color: '#00a1e0'
    },
    {
      id: 'hubspot',
      name: 'HubSpot',
      description: 'Marketing automation and CRM platform',
      logo: 'https://www.hubspot.com/hubfs/HubSpot_Logos/HubSpot-Inversed-Favicon.png',
      status: 'Connected',
      lastSync: '30 minutes ago',
      category: 'Marketing',
      features: ['Marketing Analytics', 'Customer Journey', 'Sales Enablement'],
      color: '#ff7a59'
    },
    {
      id: 'workday',
      name: 'Workday',
      description: 'Enterprise cloud applications for finance and HR',
      logo: 'https://logos-world.net/wp-content/uploads/2021/02/Workday-Logo.png',
      status: 'Pending',
      lastSync: 'Not synced',
      category: 'HR Systems',
      features: ['Payroll Integration', 'Workforce Analytics', 'Benefits Management'],
      color: '#e74c3c'
    },
    {
      id: 'slack',
      name: 'Slack',
      description: 'Team collaboration and communication platform',
      logo: 'https://a.slack-edge.com/80588/marketing/img/icons/icon_slack_hash_colored.png',
      status: 'Connected',
      lastSync: '5 minutes ago',
      category: 'Communication',
      features: ['Notifications', 'Learning Reminders', 'Team Updates'],
      color: '#4a154b'
    },
    {
      id: 'teams',
      name: 'Microsoft Teams',
      description: 'Collaboration platform for modern workplace',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg',
      status: 'Connected',
      lastSync: '15 minutes ago',
      category: 'Communication',
      features: ['Video Learning', 'Team Collaboration', 'Document Sharing'],
      color: '#6264a7'
    },
    {
      id: 'tableau',
      name: 'Tableau',
      description: 'Business intelligence and analytics platform',
      logo: 'https://logos-world.net/wp-content/uploads/2021/10/Tableau-Logo.png',
      status: 'Connected',
      lastSync: '1 hour ago',
      category: 'Analytics',
      features: ['Data Visualization', 'Learning Analytics', 'Performance Dashboards'],
      color: '#e97627'
    },
    {
      id: 'zoom',
      name: 'Zoom',
      description: 'Video conferencing and webinar platform',
      logo: 'https://st1.zoom.us/zoom.ico',
      status: 'Connected',
      lastSync: '45 minutes ago',
      category: 'Communication',
      features: ['Virtual Classrooms', 'Webinars', 'Meeting Integration'],
      color: '#2d8cff'
    },
    {
      id: 'jira',
      name: 'Jira',
      description: 'Project management and issue tracking',
      logo: 'https://wac-cdn.atlassian.com/dam/jcr:8f27f43f-b2d0-4f0b-8c6e-4b8e3b7d7b1b/jira-icon-blue.svg',
      status: 'Pending',
      lastSync: 'Not synced',
      category: 'Project Management',
      features: ['Project Tracking', 'Skill Development', 'Task Management'],
      color: '#0052cc'
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Connected':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />
      case 'Pending':
        return <ClockIcon className="h-5 w-5 text-yellow-500" />
      case 'Error':
        return <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
      default:
        return <ClockIcon className="h-5 w-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Connected':
        return 'bg-green-100 text-green-800'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'Error':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
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
                          subItem.name === 'Integration'
                            ? 'text-[#23544e] bg-[#23544e]/10 font-medium'
                            : 'text-gray-600 hover:text-[#23544e] hover:bg-gray-50'
                        }`}
                      >
                        <div className={`mr-3 flex-shrink-0 w-2 h-2 rounded-full ${
                          subItem.name === 'Integration'
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
        <div className="flex-1 overflow-auto bg-gray-50">
          <div className="p-8">
            {/* Header */}
            <div className="mb-8 bg-[#23544e] rounded-lg p-6 text-white">
              <h1 className="text-2xl font-bold mb-2">System Integrations</h1>
              <p className="text-green-100">Connect and sync with your existing business applications</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-[#23544e] rounded-lg">
                    <LinkIcon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Integrations</p>
                    <p className="text-2xl font-bold text-gray-900">{integrations.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-500 rounded-lg">
                    <CheckCircleIcon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Connected</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {integrations.filter(i => i.status === 'Connected').length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-500 rounded-lg">
                    <ClockIcon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Pending</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {integrations.filter(i => i.status === 'Pending').length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-500 rounded-lg">
                    <ArrowPathIcon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Last Sync</p>
                    <p className="text-lg font-bold text-gray-900">5 min ago</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Integration Cards - 3 per line */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {integrations.map((integration) => (
                <div key={integration.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                  {/* Card Header */}
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                          {/* Logo placeholder - using colored background */}
                          <div 
                            className="w-8 h-8 rounded"
                            style={{ backgroundColor: integration.color }}
                          ></div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{integration.name}</h3>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(integration.status)}`}>
                            {getStatusIcon(integration.status)}
                            <span className="ml-1">{integration.status}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-3">{integration.description}</p>
                    
                    <div className="text-xs text-gray-500">
                      <span className="font-medium">Category:</span> {integration.category}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    {/* Features */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Features:</h4>
                      <div className="flex flex-wrap gap-1">
                        {integration.features.map((feature, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Last Sync */}
                    <div className="mb-4">
                      <div className="flex items-center text-xs text-gray-500">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        Last sync: {integration.lastSync}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2">
                      {integration.status === 'Connected' ? (
                        <>
                          <button className="flex-1 px-3 py-2 bg-[#23544e] text-white text-sm rounded hover:bg-[#1a3f3a] transition-colors">
                            Configure
                          </button>
                          <button className="px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50 transition-colors">
                            <ArrowPathIcon className="h-4 w-4" />
                          </button>
                        </>
                      ) : (
                        <button className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
                          Connect
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Integration Button */}
            <div className="mt-8 text-center">
              <button className="px-6 py-3 bg-[#23544e] text-white rounded-lg hover:bg-[#1a3f3a] transition-colors">
                <LinkIcon className="h-5 w-5 inline mr-2" />
                Add New Integration
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}