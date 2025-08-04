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
  MagnifyingGlassIcon,
  FunnelIcon,
  StarIcon,
  AcademicCapIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'

export default function CompetencyFrameworkPage() {
  // Sidebar state
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({
    learningCapability: false,
    talentGrowth: true, // Expanded by default since we're on competency framework
    talentInsight: false,
    futureStrategic: false,
    executionIntegration: false
  })

  // Filter state
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRole, setSelectedRole] = useState('All')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedProficiency, setSelectedProficiency] = useState('All')

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

  // Competency framework data
  const competencyData = [
    // Software Developer
    {
      id: 1,
      role: 'Software Developer',
      skill: 'Programming Languages',
      category: 'Technical',
      proficiency: 4,
      description: 'Proficiency in multiple programming languages and frameworks',
      importance: 'Critical',
      assessmentMethod: 'Code Review & Technical Interview'
    },
    {
      id: 2,
      role: 'Software Developer',
      skill: 'Problem Solving',
      category: 'Behavioral',
      proficiency: 4,
      description: 'Ability to analyze complex problems and develop effective solutions',
      importance: 'High',
      assessmentMethod: 'Technical Challenges & Peer Review'
    },
    {
      id: 3,
      role: 'Software Developer',
      skill: 'Version Control',
      category: 'Technical',
      proficiency: 3,
      description: 'Git workflow management and collaborative development',
      importance: 'High',
      assessmentMethod: 'Practical Assessment'
    },
    {
      id: 4,
      role: 'Software Developer',
      skill: 'Communication',
      category: 'Behavioral',
      proficiency: 3,
      description: 'Clear technical communication with team members and stakeholders',
      importance: 'Medium',
      assessmentMethod: 'Self & Peer Assessment'
    },
    // Marketing Manager
    {
      id: 5,
      role: 'Marketing Manager',
      skill: 'Strategic Planning',
      category: 'Leadership',
      proficiency: 5,
      description: 'Develop and execute comprehensive marketing strategies',
      importance: 'Critical',
      assessmentMethod: 'Portfolio Review & Results Analysis'
    },
    {
      id: 6,
      role: 'Marketing Manager',
      skill: 'Digital Marketing',
      category: 'Technical',
      proficiency: 4,
      description: 'Expertise in digital channels, analytics, and campaign management',
      importance: 'Critical',
      assessmentMethod: 'Certification & Performance Metrics'
    },
    {
      id: 7,
      role: 'Marketing Manager',
      skill: 'Team Leadership',
      category: 'Leadership',
      proficiency: 4,
      description: 'Lead and motivate marketing teams to achieve objectives',
      importance: 'High',
      assessmentMethod: '360 Feedback & Team Performance'
    },
    {
      id: 8,
      role: 'Marketing Manager',
      skill: 'Budget Management',
      category: 'Functional',
      proficiency: 3,
      description: 'Plan, allocate, and monitor marketing budgets effectively',
      importance: 'High',
      assessmentMethod: 'Financial Performance Review'
    },
    // Sales Representative
    {
      id: 9,
      role: 'Sales Representative',
      skill: 'Customer Relationship Management',
      category: 'Behavioral',
      proficiency: 4,
      description: 'Build and maintain strong customer relationships',
      importance: 'Critical',
      assessmentMethod: 'Customer Feedback & Sales Performance'
    },
    {
      id: 10,
      role: 'Sales Representative',
      skill: 'Negotiation',
      category: 'Behavioral',
      proficiency: 4,
      description: 'Effective negotiation skills to close deals and resolve conflicts',
      importance: 'Critical',
      assessmentMethod: 'Role Playing & Deal Analysis'
    },
    {
      id: 11,
      role: 'Sales Representative',
      skill: 'Product Knowledge',
      category: 'Functional',
      proficiency: 5,
      description: 'Deep understanding of products/services and competitive landscape',
      importance: 'Critical',
      assessmentMethod: 'Product Certification & Testing'
    },
    {
      id: 12,
      role: 'Sales Representative',
      skill: 'CRM Software',
      category: 'Technical',
      proficiency: 3,
      description: 'Proficiency in CRM systems and sales tracking tools',
      importance: 'Medium',
      assessmentMethod: 'System Usage & Data Quality'
    },
    // Project Manager
    {
      id: 13,
      role: 'Project Manager',
      skill: 'Project Planning',
      category: 'Functional',
      proficiency: 5,
      description: 'Comprehensive project planning and resource allocation',
      importance: 'Critical',
      assessmentMethod: 'Project Success Rate & Methodology'
    },
    {
      id: 14,
      role: 'Project Manager',
      skill: 'Risk Management',
      category: 'Functional',
      proficiency: 4,
      description: 'Identify, assess, and mitigate project risks',
      importance: 'High',
      assessmentMethod: 'Risk Assessment & Mitigation Plans'
    },
    {
      id: 15,
      role: 'Project Manager',
      skill: 'Stakeholder Management',
      category: 'Leadership',
      proficiency: 4,
      description: 'Effectively manage stakeholder expectations and communication',
      importance: 'High',
      assessmentMethod: 'Stakeholder Feedback & Communication'
    },
    {
      id: 16,
      role: 'Project Manager',
      skill: 'Agile Methodologies',
      category: 'Technical',
      proficiency: 3,
      description: 'Understanding and implementation of Agile/Scrum practices',
      importance: 'Medium',
      assessmentMethod: 'Certification & Practice Assessment'
    },
    // HR Specialist
    {
      id: 17,
      role: 'HR Specialist',
      skill: 'Employment Law',
      category: 'Functional',
      proficiency: 4,
      description: 'Knowledge of employment laws and regulations',
      importance: 'Critical',
      assessmentMethod: 'Legal Knowledge Test & Compliance Review'
    },
    {
      id: 18,
      role: 'HR Specialist',
      skill: 'Talent Acquisition',
      category: 'Functional',
      proficiency: 4,
      description: 'Effective recruitment and selection processes',
      importance: 'High',
      assessmentMethod: 'Hiring Success Rate & Quality of Hire'
    },
    {
      id: 19,
      role: 'HR Specialist',
      skill: 'Employee Relations',
      category: 'Behavioral',
      proficiency: 5,
      description: 'Handle employee relations and conflict resolution',
      importance: 'Critical',
      assessmentMethod: 'Employee Feedback & Case Resolution'
    },
    {
      id: 20,
      role: 'HR Specialist',
      skill: 'HRIS Systems',
      category: 'Technical',
      proficiency: 3,
      description: 'Proficiency in HR information systems and data analysis',
      importance: 'Medium',
      assessmentMethod: 'System Proficiency & Data Accuracy'
    }
  ]

  // Star rating component
  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <div key={star}>
            {star <= rating ? (
              <StarIconSolid className="w-4 h-4 text-yellow-400" />
            ) : (
              <StarIcon className="w-4 h-4 text-gray-300" />
            )}
          </div>
        ))}
        <span className="ml-2 text-sm text-gray-600">{rating}/5</span>
      </div>
    )
  }

  // Get importance badge styling
  const getImportanceBadge = (importance: string) => {
    switch (importance) {
      case 'Critical':
        return 'bg-red-100 text-red-800'
      case 'High':
        return 'bg-orange-100 text-orange-800'
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'Low':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  // Get category badge styling
  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'Technical':
        return 'bg-blue-100 text-blue-800'
      case 'Behavioral':
        return 'bg-purple-100 text-purple-800'
      case 'Leadership':
        return 'bg-green-100 text-green-800'
      case 'Functional':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  // Filter data
  const roles = ['All', ...Array.from(new Set(competencyData.map(item => item.role)))]
  const categories = ['All', 'Technical', 'Behavioral', 'Leadership', 'Functional']
  const proficiencyLevels = ['All', '1', '2', '3', '4', '5']

  const filteredData = competencyData.filter(item => {
    const matchesSearch = item.skill.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = selectedRole === 'All' || item.role === selectedRole
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
    const matchesProficiency = selectedProficiency === 'All' || item.proficiency.toString() === selectedProficiency
    
    return matchesSearch && matchesRole && matchesCategory && matchesProficiency
  })

  // Calculate summary stats
  const totalCompetencies = competencyData.length
  const averageProficiency = (competencyData.reduce((sum, item) => sum + item.proficiency, 0) / totalCompetencies).toFixed(1)
  const criticalSkills = competencyData.filter(item => item.importance === 'Critical').length
  const uniqueRoles = roles.length - 1

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
                          subItem.name === 'Competency Framework'
                            ? 'text-[#23544e] bg-gray-50 font-medium'
                            : 'text-gray-600 hover:text-[#23544e] hover:bg-gray-50'
                        }`}
                      >
                        <div className={`mr-3 flex-shrink-0 w-2 h-2 rounded-full ${
                          subItem.name === 'Competency Framework'
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
                <h1 className="text-3xl font-bold text-gray-900">Competency Framework</h1>
                <p className="mt-2 text-gray-600">Define and track required skills and proficiency levels for each role</p>
              </div>
              <div className="flex space-x-3">
                <button className="bg-white text-gray-700 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                  Export Framework
                </button>
                <button className="bg-[#23544e] text-white px-6 py-2 rounded-lg hover:bg-[#1a3f3a] transition-colors">
                  Add Competency
                </button>
              </div>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <AcademicCapIcon className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Competencies</p>
                  <p className="text-2xl font-bold text-gray-900">{totalCompetencies}</p>
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
                  <p className="text-sm font-medium text-gray-600">Roles Covered</p>
                  <p className="text-2xl font-bold text-gray-900">{uniqueRoles}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <StarIconSolid className="w-5 h-5 text-yellow-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Avg Proficiency</p>
                  <p className="text-2xl font-bold text-gray-900">{averageProficiency}/5</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                    <ExclamationTriangleIcon className="w-5 h-5 text-red-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Critical Skills</p>
                  <p className="text-2xl font-bold text-gray-900">{criticalSkills}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search skills or roles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#23544e] focus:border-transparent"
                />
              </div>

              {/* Role Filter */}
              <div className="relative">
                <BriefcaseIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#23544e] focus:border-transparent appearance-none"
                >
                  {roles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>

              {/* Category Filter */}
              <div className="relative">
                <FunnelIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#23544e] focus:border-transparent appearance-none"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Proficiency Filter */}
              <div className="relative">
                <StarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={selectedProficiency}
                  onChange={(e) => setSelectedProficiency(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#23544e] focus:border-transparent appearance-none"
                >
                  {proficiencyLevels.map(level => (
                    <option key={level} value={level}>{level === 'All' ? 'All Levels' : `Level ${level}`}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Competency Framework Table */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-4 px-6 font-medium text-gray-700">Role</th>
                    <th className="text-left py-4 px-4 font-medium text-gray-700">Skill</th>
                    <th className="text-left py-4 px-4 font-medium text-gray-700">Category</th>
                    <th className="text-left py-4 px-4 font-medium text-gray-700">Proficiency</th>
                    <th className="text-left py-4 px-4 font-medium text-gray-700">Importance</th>
                    <th className="text-left py-4 px-4 font-medium text-gray-700">Assessment Method</th>
                    <th className="text-left py-4 px-4 font-medium text-gray-700">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item, index) => (
                    <tr key={item.id} className={`border-b border-gray-100 hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                      <td className="py-4 px-6">
                        <div className="font-medium text-gray-900">{item.role}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-medium text-gray-900">{item.skill}</div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryBadge(item.category)}`}>
                          {item.category}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <StarRating rating={item.proficiency} />
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getImportanceBadge(item.importance)}`}>
                          {item.importance}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm text-gray-600">{item.assessmentMethod}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm text-gray-600 max-w-xs">{item.description}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Empty State */}
          {filteredData.length === 0 && (
            <div className="text-center py-12">
              <AcademicCapIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No competencies found</h3>
              <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}