'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ChevronDownIcon,
  ChevronUpIcon,
  UserGroupIcon,
  ArrowTrendingUpIcon,
  ChartBarIcon,
  MapIcon,
  CogIcon,
  BookOpenIcon,
  HomeIcon,
  BriefcaseIcon,
  HeartIcon,
  StarIcon,
  SparklesIcon,
  CpuChipIcon,
  AcademicCapIcon,
  ClockIcon,
  CheckCircleIcon,
  BookmarkIcon,
  PlayIcon,
  UserIcon
} from '@heroicons/react/24/outline'
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts'

export default function PersonalizedLearning() {
  // Sidebar state - same as dashboard
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({
    learningCapability: false,
    talentGrowth: false,
    talentInsight: false,
    futureStrategic: true, // Expanded by default since we're on personalized learning
    executionIntegration: false
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
        { name: 'Talent KPIs', href: '/talent/talent-kpis' },
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

  const [selectedRole, setSelectedRole] = useState('current')

  // Mock data for personalized learning
  const roles = [
    { id: 'current', name: 'Current Role: Data Analyst' },
    { id: 'next', name: 'Target Role: Senior Data Scientist' },
    { id: 'alternative', name: 'Alternative: Product Manager' }
  ]

  const learningPaths = [
    {
      id: 1,
      title: 'Advanced Python for Data Science',
      provider: 'DataCamp',
      duration: '6 weeks',
      level: 'Intermediate',
      progress: 65,
      status: 'In Progress',
      skills: ['Python', 'Pandas', 'NumPy'],
      match: 92,
      description: 'Master advanced Python techniques for data manipulation and analysis'
    },
    {
      id: 2,
      title: 'Machine Learning Fundamentals',
      provider: 'Coursera',
      duration: '8 weeks',
      level: 'Beginner',
      progress: 0,
      status: 'Recommended',
      skills: ['ML', 'Statistics', 'Algorithms'],
      match: 88,
      description: 'Build foundational knowledge in machine learning concepts and applications'
    },
    {
      id: 3,
      title: 'Data Visualization with Tableau',
      provider: 'Udemy',
      duration: '4 weeks',
      level: 'Intermediate',
      progress: 100,
      status: 'Completed',
      skills: ['Tableau', 'Visualization', 'Dashboards'],
      match: 85,
      description: 'Create compelling data visualizations and interactive dashboards'
    },
    {
      id: 4,
      title: 'SQL for Advanced Analytics',
      provider: 'LinkedIn Learning',
      duration: '3 weeks',
      level: 'Advanced',
      progress: 30,
      status: 'In Progress',
      skills: ['SQL', 'Database', 'Analytics'],
      match: 90,
      description: 'Master complex SQL queries for advanced data analysis'
    }
  ]

  const skillMastery = [
    { skill: 'Python', current: 3.5, target: 4.5, fullMark: 5 },
    { skill: 'SQL', current: 4.0, target: 4.5, fullMark: 5 },
    { skill: 'Statistics', current: 3.0, target: 4.0, fullMark: 5 },
    { skill: 'Machine Learning', current: 2.5, target: 4.0, fullMark: 5 },
    { skill: 'Data Viz', current: 4.5, target: 4.5, fullMark: 5 },
    { skill: 'Communication', current: 3.5, target: 4.5, fullMark: 5 }
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
                      subItem.name === 'Personalized Learning'
                        ? 'text-[#23544e] bg-[#23544e]/10 font-medium'
                        : 'text-gray-600 hover:text-[#23544e] hover:bg-gray-50'
                    }`}
                  >
                    <div className={`mr-3 flex-shrink-0 w-2 h-2 rounded-full ${
                      subItem.name === 'Personalized Learning'
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
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {renderSidebar()}
        {/* Main content */}
        <div className="flex-1 overflow-auto bg-gray-50">
          <div className="p-8">
            {/* Header */}
            <div className="mb-8 bg-[#23544e] rounded-lg p-6 text-white">
              <h1 className="text-2xl font-bold mb-2">Personalized Learning</h1>
              <p className="text-green-100">AI-powered learning recommendations tailored to your career goals</p>
            </div>

            {/* Role Selection */}
            <div className="mb-8 bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Learning Path For:</h2>
              <div className="flex space-x-4">
                {roles.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRole(role.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedRole === role.id
                        ? 'bg-[#23544e] text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {role.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Skill Gap Analysis */}
            <div className="mb-8 bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Your Learning Progress</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={skillMastery}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="skill" tick={{ fill: '#4B5563', fontSize: 12 }} />
                    <PolarRadiusAxis domain={[0, 5]} tick={false} />
                    <Radar
                      name="Current Level"
                      dataKey="current"
                      stroke="#23544e"
                      fill="#23544e"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                    <Radar
                      name="Target Level"
                      dataKey="target"
                      stroke="#059669"
                      fill="transparent"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-center space-x-6 mt-4">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-[#23544e] rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Current Level</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-green-600 border-dashed rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Target Level</span>
                </div>
              </div>
            </div>

            {/* Learning Recommendations */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-6">Recommended Learning Paths</h2>
              <div className="space-y-6">
                {learningPaths.map((course) => (
                  <div key={course.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-medium text-gray-900">{course.title}</h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            course.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            course.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {course.status}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-3">{course.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <UserIcon className="w-4 h-4 mr-1" />
                            {course.provider}
                          </span>
                          <span className="flex items-center">
                            <ClockIcon className="w-4 h-4 mr-1" />
                            {course.duration}
                          </span>
                          <span className="flex items-center">
                            <StarIcon className="w-4 h-4 mr-1" />
                            {course.level}
                          </span>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-lg font-bold text-[#23544e] mb-1">{course.match}%</div>
                        <div className="text-sm text-gray-500">Match</div>
                      </div>
                    </div>

                    {/* Skills Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {course.skills.map((skill) => (
                        <span key={skill} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-[#23544e] h-2 rounded-full transition-all"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3">
                      {course.status === 'Completed' ? (
                        <button className="flex items-center px-4 py-2 bg-green-50 text-green-700 rounded-lg">
                          <CheckCircleIcon className="w-4 h-4 mr-2" />
                          Completed
                        </button>
                      ) : course.status === 'In Progress' ? (
                        <button className="flex items-center px-4 py-2 bg-[#23544e] text-white rounded-lg hover:bg-[#1a3f3a] transition-colors">
                          <PlayIcon className="w-4 h-4 mr-2" />
                          Continue Learning
                        </button>
                      ) : (
                        <button className="flex items-center px-4 py-2 bg-[#23544e] text-white rounded-lg hover:bg-[#1a3f3a] transition-colors">
                          <PlayIcon className="w-4 h-4 mr-2" />
                          Start Learning
                        </button>
                      )}
                      <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        <BookmarkIcon className="w-4 h-4 mr-2" />
                        Save for Later
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}