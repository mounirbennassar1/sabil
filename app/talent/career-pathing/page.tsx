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
  ArrowRightIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UsersIcon
} from '@heroicons/react/24/outline'

export default function CareerPathingPage() {
  // Sidebar state
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({
    learningCapability: false,
    talentGrowth: true, // Expanded by default since we're on career pathing
    talentInsight: false,
    futureStrategic: false,
    executionIntegration: false
  })

  // Filter state
  const [selectedDepartment, setSelectedDepartment] = useState('All')
  const [selectedPath, setSelectedPath] = useState('All')

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

  // Career paths data
  const careerPaths = [
    {
      id: 1,
      department: 'Engineering',
      pathName: 'Technical Leadership Track',
      color: 'blue',
      roles: [
        {
          title: 'Junior Developer',
          level: 1,
          avgTenure: '1-2 years',
          avgSalary: '$65,000',
          keySkills: ['Programming Basics', 'Version Control', 'Testing'],
          requirements: 'Computer Science degree or equivalent experience'
        },
        {
          title: 'Software Developer',
          level: 2,
          avgTenure: '2-3 years',
          avgSalary: '$85,000',
          keySkills: ['Full-stack Development', 'Code Review', 'Architecture'],
          requirements: '2+ years experience, strong coding skills'
        },
        {
          title: 'Senior Developer',
          level: 3,
          avgTenure: '3-4 years',
          avgSalary: '$110,000',
          keySkills: ['System Design', 'Mentoring', 'Technical Leadership'],
          requirements: '5+ years experience, proven technical leadership'
        },
        {
          title: 'Tech Lead',
          level: 4,
          avgTenure: '3-5 years',
          avgSalary: '$130,000',
          keySkills: ['Team Leadership', 'Project Management', 'Architecture'],
          requirements: '7+ years experience, management skills'
        },
        {
          title: 'Engineering Manager',
          level: 5,
          avgTenure: '4+ years',
          avgSalary: '$150,000',
          keySkills: ['People Management', 'Strategic Planning', 'Budget Management'],
          requirements: '10+ years experience, proven leadership'
        }
      ]
    },
    {
      id: 2,
      department: 'Marketing',
      pathName: 'Marketing Leadership Track',
      color: 'purple',
      roles: [
        {
          title: 'Marketing Coordinator',
          level: 1,
          avgTenure: '1-2 years',
          avgSalary: '$45,000',
          keySkills: ['Content Creation', 'Social Media', 'Analytics'],
          requirements: 'Marketing degree or equivalent experience'
        },
        {
          title: 'Marketing Specialist',
          level: 2,
          avgTenure: '2-3 years',
          avgSalary: '$60,000',
          keySkills: ['Campaign Management', 'SEO/SEM', 'Lead Generation'],
          requirements: '2+ years marketing experience'
        },
        {
          title: 'Senior Marketing Specialist',
          level: 3,
          avgTenure: '2-4 years',
          avgSalary: '$75,000',
          keySkills: ['Strategy Development', 'Team Collaboration', 'Analytics'],
          requirements: '4+ years experience, specialization expertise'
        },
        {
          title: 'Marketing Manager',
          level: 4,
          avgTenure: '3-5 years',
          avgSalary: '$90,000',
          keySkills: ['Team Management', 'Budget Planning', 'Strategy'],
          requirements: '6+ years experience, management skills'
        },
        {
          title: 'Marketing Director',
          level: 5,
          avgTenure: '4+ years',
          avgSalary: '$120,000',
          keySkills: ['Strategic Leadership', 'P&L Management', 'Cross-functional'],
          requirements: '10+ years experience, proven leadership'
        }
      ]
    },
    {
      id: 3,
      department: 'Sales',
      pathName: 'Sales Leadership Track',
      color: 'green',
      roles: [
        {
          title: 'Sales Representative',
          level: 1,
          avgTenure: '1-2 years',
          avgSalary: '$50,000',
          keySkills: ['Prospecting', 'Closing', 'CRM Management'],
          requirements: 'Sales aptitude, communication skills'
        },
        {
          title: 'Senior Sales Rep',
          level: 2,
          avgTenure: '2-3 years',
          avgSalary: '$70,000',
          keySkills: ['Account Management', 'Relationship Building', 'Negotiation'],
          requirements: '2+ years sales experience, quota achievement'
        },
        {
          title: 'Account Manager',
          level: 3,
          avgTenure: '2-4 years',
          avgSalary: '$85,000',
          keySkills: ['Strategic Selling', 'Customer Success', 'Upselling'],
          requirements: '4+ years experience, account management skills'
        },
        {
          title: 'Sales Manager',
          level: 4,
          avgTenure: '3-5 years',
          avgSalary: '$105,000',
          keySkills: ['Team Leadership', 'Coaching', 'Territory Management'],
          requirements: '6+ years experience, leadership skills'
        },
        {
          title: 'Sales Director',
          level: 5,
          avgTenure: '4+ years',
          avgSalary: '$130,000',
          keySkills: ['Strategic Planning', 'Revenue Management', 'Executive Presence'],
          requirements: '10+ years experience, proven leadership'
        }
      ]
    },
    {
      id: 4,
      department: 'Product',
      pathName: 'Product Management Track',
      color: 'orange',
      roles: [
        {
          title: 'Product Analyst',
          level: 1,
          avgTenure: '1-2 years',
          avgSalary: '$70,000',
          keySkills: ['Data Analysis', 'User Research', 'Requirements'],
          requirements: 'Analytical skills, product interest'
        },
        {
          title: 'Associate Product Manager',
          level: 2,
          avgTenure: '2-3 years',
          avgSalary: '$90,000',
          keySkills: ['Feature Planning', 'Stakeholder Management', 'Agile'],
          requirements: '2+ years product experience'
        },
        {
          title: 'Product Manager',
          level: 3,
          avgTenure: '3-4 years',
          avgSalary: '$115,000',
          keySkills: ['Product Strategy', 'Roadmap Planning', 'Cross-functional'],
          requirements: '4+ years experience, product ownership'
        },
        {
          title: 'Senior Product Manager',
          level: 4,
          avgTenure: '3-5 years',
          avgSalary: '$135,000',
          keySkills: ['Strategic Planning', 'Team Leadership', 'Market Analysis'],
          requirements: '7+ years experience, proven results'
        },
        {
          title: 'Director of Product',
          level: 5,
          avgTenure: '4+ years',
          avgSalary: '$160,000',
          keySkills: ['Product Vision', 'Org Leadership', 'Business Strategy'],
          requirements: '10+ years experience, leadership proven'
        }
      ]
    }
  ]

  // Get color classes for different departments
  const getColorClasses = (color: string) => {
    const colorMap: {[key: string]: {bg: string, border: string, text: string}} = {
      blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700' },
      purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700' },
      green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700' },
      orange: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700' }
    }
    return colorMap[color] || colorMap.blue
  }

  // Filter data
  const departments = ['All', ...Array.from(new Set(careerPaths.map(path => path.department)))]
  const pathNames = ['All', ...careerPaths.map(path => path.pathName)]

  const filteredPaths = careerPaths.filter(path => {
    const matchesDepartment = selectedDepartment === 'All' || path.department === selectedDepartment
    const matchesPath = selectedPath === 'All' || path.pathName === selectedPath
    return matchesDepartment && matchesPath
  })

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
                          subItem.name === 'Career Pathing Map'
                            ? 'text-[#23544e] bg-gray-50 font-medium'
                            : 'text-gray-600 hover:text-[#23544e] hover:bg-gray-50'
                        }`}
                      >
                        <div className={`mr-3 flex-shrink-0 w-2 h-2 rounded-full ${
                          subItem.name === 'Career Pathing Map'
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
                <h1 className="text-3xl font-bold text-gray-900">Career Pathing Map</h1>
                <p className="mt-2 text-gray-600">Visualize career progression paths and development opportunities</p>
              </div>
              <div className="flex space-x-3">
                <button className="bg-white text-gray-700 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                  Export Paths
                </button>
                <button className="bg-[#23544e] text-white px-6 py-2 rounded-lg hover:bg-[#1a3f3a] transition-colors">
                  Create Path
                </button>
              </div>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <MapIcon className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Career Paths</p>
                  <p className="text-2xl font-bold text-gray-900">{careerPaths.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <BriefcaseIcon className="w-5 h-5 text-green-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Roles</p>
                  <p className="text-2xl font-bold text-gray-900">{careerPaths.reduce((sum, path) => sum + path.roles.length, 0)}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <UsersIcon className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Departments</p>
                  <p className="text-2xl font-bold text-gray-900">{departments.length - 1}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <ArrowTrendingUpIcon className="w-5 h-5 text-orange-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Avg Levels</p>
                  <p className="text-2xl font-bold text-gray-900">{Math.round(careerPaths.reduce((sum, path) => sum + path.roles.length, 0) / careerPaths.length)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Department Filter */}
              <div className="relative">
                <BriefcaseIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#23544e] focus:border-transparent appearance-none"
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept} {dept !== 'All' ? 'Department' : 'Departments'}</option>
                  ))}
                </select>
              </div>

              {/* Path Filter */}
              <div className="relative">
                <MapIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={selectedPath}
                  onChange={(e) => setSelectedPath(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#23544e] focus:border-transparent appearance-none"
                >
                  {pathNames.map(path => (
                    <option key={path} value={path}>{path}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Career Paths */}
          <div className="space-y-8">
            {filteredPaths.map((path) => {
              const colorClasses = getColorClasses(path.color)
              
              return (
                <div key={path.id} className="bg-white rounded-xl border border-gray-200 p-6">
                  {/* Path Header */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{path.pathName}</h3>
                        <p className="text-gray-600">{path.department} Department</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${colorClasses.bg} ${colorClasses.text}`}>
                        {path.roles.length} Levels
                      </div>
                    </div>
                  </div>

                  {/* Career Path Flow */}
                  <div className="relative">
                    {/* Desktop View */}
                    <div className="hidden lg:block">
                      <div className="flex items-center space-x-4 overflow-x-auto pb-4">
                        {path.roles.map((role, index) => (
                          <div key={index} className="flex items-center flex-shrink-0">
                            {/* Role Card */}
                            <div className={`relative bg-white border-2 ${colorClasses.border} rounded-lg p-4 w-72 hover:shadow-lg transition-all duration-300`}>
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <h4 className="font-semibold text-gray-900">{role.title}</h4>
                                  <p className="text-sm text-gray-600">Level {role.level}</p>
                                </div>
                                <div className={`w-8 h-8 ${colorClasses.bg} rounded-full flex items-center justify-center`}>
                                  <span className={`text-sm font-bold ${colorClasses.text}`}>{role.level}</span>
                                </div>
                              </div>

                              <div className="space-y-2 mb-4">
                                <div className="flex items-center text-sm text-gray-600">
                                  <ClockIcon className="w-4 h-4 mr-2" />
                                  {role.avgTenure}
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                  <CurrencyDollarIcon className="w-4 h-4 mr-2" />
                                  {role.avgSalary}
                                </div>
                              </div>

                              <div className="mb-3">
                                <h5 className="text-xs font-medium text-gray-700 mb-2">KEY SKILLS</h5>
                                <div className="flex flex-wrap gap-1">
                                  {role.keySkills.map((skill, skillIndex) => (
                                    <span key={skillIndex} className="px-2 py-1 bg-gray-100 text-xs text-gray-700 rounded">
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <h5 className="text-xs font-medium text-gray-700 mb-1">REQUIREMENTS</h5>
                                <p className="text-xs text-gray-600">{role.requirements}</p>
                              </div>
                            </div>

                            {/* Arrow */}
                            {index < path.roles.length - 1 && (
                              <div className="flex-shrink-0 mx-4">
                                <ArrowRightIcon className={`w-6 h-6 ${colorClasses.text}`} />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Mobile View */}
                    <div className="lg:hidden space-y-4">
                      {path.roles.map((role, index) => (
                        <div key={index} className="relative">
                          <div className={`bg-white border-2 ${colorClasses.border} rounded-lg p-4`}>
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h4 className="font-semibold text-gray-900">{role.title}</h4>
                                <p className="text-sm text-gray-600">Level {role.level}</p>
                              </div>
                              <div className={`w-8 h-8 ${colorClasses.bg} rounded-full flex items-center justify-center`}>
                                <span className={`text-sm font-bold ${colorClasses.text}`}>{role.level}</span>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                              <div className="flex items-center text-sm text-gray-600">
                                <ClockIcon className="w-4 h-4 mr-2" />
                                {role.avgTenure}
                              </div>
                              <div className="flex items-center text-sm text-gray-600">
                                <CurrencyDollarIcon className="w-4 h-4 mr-2" />
                                {role.avgSalary}
                              </div>
                            </div>

                            <div className="mb-3">
                              <h5 className="text-xs font-medium text-gray-700 mb-2">KEY SKILLS</h5>
                              <div className="flex flex-wrap gap-1">
                                {role.keySkills.map((skill, skillIndex) => (
                                  <span key={skillIndex} className="px-2 py-1 bg-gray-100 text-xs text-gray-700 rounded">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h5 className="text-xs font-medium text-gray-700 mb-1">REQUIREMENTS</h5>
                              <p className="text-xs text-gray-600">{role.requirements}</p>
                            </div>
                          </div>

                          {/* Mobile Arrow */}
                          {index < path.roles.length - 1 && (
                            <div className="flex justify-center my-2">
                              <div className={`w-6 h-6 ${colorClasses.text} transform rotate-90`}>
                                <ArrowRightIcon className="w-6 h-6" />
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Empty State */}
          {filteredPaths.length === 0 && (
            <div className="text-center py-12">
              <MapIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No career paths found</h3>
              <p className="mt-1 text-sm text-gray-500">Try adjusting your filters or create a new career path.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}