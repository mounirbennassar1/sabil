'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  DocumentArrowDownIcon,
  UsersIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  CalendarDaysIcon,
  ChartBarIcon,
  HomeIcon,
  BookOpenIcon,
  UserGroupIcon,
  ArrowTrendingUpIcon,
  MapIcon,
  CogIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  BriefcaseIcon,
  HeartIcon,
  StarIcon,
  SparklesIcon,
  CpuChipIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline'

export default function ChangeManagementPlan() {
  // Sidebar state
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({
    learningCapability: false,
    talentGrowth: false,
    talentInsight: false,
    futureStrategic: false,
    executionIntegration: true // Expanded by default since we're on change management
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

  // Mock data for change management
  const stakeholders = [
    { name: 'Ahmed Al-Rashid', role: 'Executive Sponsor', department: 'Leadership', email: 'ahmed.rashid@neom.com', commitment: 'High' },
    { name: 'Sarah Johnson', role: 'Change Champion', department: 'HR', email: 'sarah.johnson@neom.com', commitment: 'High' },
    { name: 'Omar Bin Khalid', role: 'Technical Lead', department: 'IT', email: 'omar.khalid@neom.com', commitment: 'Medium' },
    { name: 'Dr. Sarah Ahmed', role: 'Training Coordinator', department: 'L&D', email: 'sarah.ahmed@neom.com', commitment: 'High' },
    { name: 'Layla Hassan', role: 'Communications Lead', department: 'Marketing', email: 'layla.hassan@neom.com', commitment: 'Medium' },
    { name: 'Hassan Al-Najjar', role: 'Operations Rep', department: 'Operations', email: 'hassan.najjar@neom.com', commitment: 'Medium' }
  ]

  const communicationPlan = [
    { phase: 'Awareness', timeline: 'Week 1-2', activities: ['Leadership announcement', 'All-hands meeting', 'FAQ publication'], status: 'Completed' },
    { phase: 'Understanding', timeline: 'Week 3-4', activities: ['Department briefings', 'Training material rollout', 'Q&A sessions'], status: 'In Progress' },
    { phase: 'Adoption', timeline: 'Week 5-8', activities: ['Hands-on workshops', 'Pilot program launch', 'Feedback collection'], status: 'Planned' },
    { phase: 'Reinforcement', timeline: 'Week 9-12', activities: ['Progress reviews', 'Success story sharing', 'Additional support'], status: 'Planned' },
    { phase: 'Sustainment', timeline: 'Ongoing', activities: ['Regular check-ins', 'Continuous improvement', 'Best practice documentation'], status: 'Planned' }
  ]

  const getCommitmentColor = (commitment: string) => {
    switch (commitment) {
      case 'High': return 'text-green-600 bg-green-50'
      case 'Medium': return 'text-yellow-600 bg-yellow-50'
      case 'Low': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'text-green-600 bg-green-50'
      case 'In Progress': return 'text-blue-600 bg-blue-50'
      case 'Planned': return 'text-gray-600 bg-gray-50'
      default: return 'text-gray-600 bg-gray-50'
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
                          subItem.name === 'Change Management Plan'
                            ? 'text-[#23544e] bg-gray-50 font-medium'
                            : 'text-gray-600 hover:text-[#23544e] hover:bg-gray-50'
                        }`}
                      >
                        <div className={`mr-3 flex-shrink-0 w-2 h-2 rounded-full ${
                          subItem.name === 'Change Management Plan'
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
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">Change Management Plan</h1>
                    <p className="mt-2 text-gray-600">Comprehensive strategy for organizational transformation initiatives</p>
                  </div>
                  <button className="bg-[#23544e] text-white px-6 py-3 rounded-lg hover:bg-[#1a3d37] transition-colors flex items-center">
                    <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
                    Download Plan
                  </button>
                </div>
              </div>

              {/* Executive Summary */}
              <div className="bg-white rounded-lg shadow p-8 mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Executive Summary</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <div className="bg-[#23544e] text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                      <UsersIcon className="h-6 w-6" />
                    </div>
                    <h3 className="font-medium text-gray-900">Stakeholders</h3>
                    <p className="text-2xl font-bold text-[#23544e]">{stakeholders.length}</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-[#23544e] text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                      <ClockIcon className="h-6 w-6" />
                    </div>
                    <h3 className="font-medium text-gray-900">Timeline</h3>
                    <p className="text-2xl font-bold text-[#23544e]">12 Weeks</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-[#23544e] text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                      <CheckCircleIcon className="h-6 w-6" />
                    </div>
                    <h3 className="font-medium text-gray-900">Progress</h3>
                    <p className="text-2xl font-bold text-[#23544e]">25%</p>
                  </div>
                </div>
              </div>

              {/* Overview of Change */}
              <div className="bg-white rounded-lg shadow p-8 mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Overview of Change</h2>
                <div className="prose max-w-none">
                  <div className="bg-gray-50 border-l-4 border-[#23544e] p-6 mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Vision Statement</h3>
                    <p className="text-gray-700">
                      Transform NEOM&apos;s talent management capabilities through the implementation of a comprehensive, 
                      AI-powered platform that enhances employee development, succession planning, and organizational agility.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-3">Key Objectives</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start">
                          <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          Implement unified talent management platform
                        </li>
                        <li className="flex items-start">
                          <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          Enhance employee development and career pathing
                        </li>
                        <li className="flex items-start">
                          <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          Establish data-driven succession planning
                        </li>
                        <li className="flex items-start">
                          <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          Improve internal mobility and talent retention
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-3">Expected Outcomes</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start">
                          <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                          25% increase in internal promotion rates
                        </li>
                        <li className="flex items-start">
                          <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                          40% reduction in time-to-hire for critical roles
                        </li>
                        <li className="flex items-start">
                          <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                          90% employee satisfaction with career development
                        </li>
                        <li className="flex items-start">
                          <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                          100% leadership succession coverage
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stakeholders & Champions */}
              <div className="bg-white rounded-lg shadow p-8 mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Stakeholders & Champions</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Department
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Commitment Level
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {stakeholders.map((stakeholder) => (
                        <tr key={stakeholder.email}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {stakeholder.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {stakeholder.role}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {stakeholder.department}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {stakeholder.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCommitmentColor(stakeholder.commitment)}`}>
                              {stakeholder.commitment}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Communication Plan */}
              <div className="bg-white rounded-lg shadow p-8 mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Communication Plan</h2>
                <div className="space-y-6">
                  {communicationPlan.map((phase, index) => (
                    <div key={phase.phase} className="relative">
                      {index < communicationPlan.length - 1 && (
                        <div className="absolute top-8 left-6 w-0.5 h-16 bg-gray-200"></div>
                      )}
                      <div className="flex items-start">
                        <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                          phase.status === 'Completed' ? 'bg-green-100' :
                          phase.status === 'In Progress' ? 'bg-blue-100' : 'bg-gray-100'
                        }`}>
                          {phase.status === 'Completed' ? (
                            <CheckCircleIcon className="h-6 w-6 text-green-600" />
                          ) : (
                            <CalendarDaysIcon className={`h-6 w-6 ${
                              phase.status === 'In Progress' ? 'text-blue-600' : 'text-gray-600'
                            }`} />
                          )}
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-medium text-gray-900">{phase.phase}</h3>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(phase.status)}`}>
                              {phase.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{phase.timeline}</p>
                          <ul className="text-sm text-gray-700 space-y-1">
                            {phase.activities.map((activity, actIndex) => (
                              <li key={actIndex} className="flex items-center">
                                <span className="w-1.5 h-1.5 bg-[#23544e] rounded-full mr-2"></span>
                                {activity}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Adoption Metrics */}
              <div className="bg-white rounded-lg shadow p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Adoption Metrics</h2>
                <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <ChartBarIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">Real-time Analytics Dashboard</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Interactive charts and metrics will be displayed here to track adoption progress, user engagement, and change effectiveness.
                  </p>
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white p-4 rounded-lg border">
                      <h4 className="text-sm font-medium text-gray-900">User Adoption Rate</h4>
                      <p className="text-2xl font-bold text-[#23544e] mt-2">---%</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border">
                      <h4 className="text-sm font-medium text-gray-900">Training Completion</h4>
                      <p className="text-2xl font-bold text-[#23544e] mt-2">---%</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border">
                      <h4 className="text-sm font-medium text-gray-900">Support Tickets</h4>
                      <p className="text-2xl font-bold text-[#23544e] mt-2">---</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border">
                      <h4 className="text-sm font-medium text-gray-900">User Satisfaction</h4>
                      <p className="text-2xl font-bold text-[#23544e] mt-2">---/5</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}