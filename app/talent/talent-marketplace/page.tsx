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
  MapPinIcon,
  ClockIcon,
  MagnifyingGlassIcon,
  UserIcon
} from '@heroicons/react/24/outline'

export default function TalentMarketplace() {
  // Sidebar state - same as dashboard
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({
    learningCapability: false,
    talentGrowth: false,
    talentInsight: false,
    futureStrategic: true, // Expanded by default since we're on talent marketplace
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

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedDuration, setSelectedDuration] = useState('all')

  // Mock opportunities data
  const opportunities = [
    {
      id: 1,
      title: 'Senior Data Scientist',
      department: 'Analytics & AI',
      location: 'Riyadh',
      type: 'Full-time',
      duration: 'Permanent',
      description: 'Lead data science initiatives and mentor junior team members in machine learning projects.',
      requiredSkills: ['Python', 'Machine Learning', 'SQL', 'Statistics'],
      preferredSkills: ['Deep Learning', 'MLOps', 'Cloud Platforms'],
      experience: '5+ years',
      match: 92,
      postedDate: '2 days ago',
      manager: 'Sarah Al-Rashid',
      applications: 12
    },
    {
      id: 2,
      title: 'Product Manager - Digital Innovation',
      department: 'Product & Strategy',
      location: 'Jeddah',
      type: 'Full-time',
      duration: 'Permanent',
      description: 'Drive product strategy and innovation for our digital transformation initiatives.',
      requiredSkills: ['Product Strategy', 'User Research', 'Agile', 'Analytics'],
      preferredSkills: ['Design Thinking', 'Market Research', 'Leadership'],
      experience: '3-5 years',
      match: 78,
      postedDate: '1 week ago',
      manager: 'Ahmed Hassan',
      applications: 8
    },
    {
      id: 3,
      title: 'UX Research Lead',
      department: 'Design & User Experience',
      location: 'Remote',
      type: 'Contract',
      duration: '6 months',
      description: 'Lead user research initiatives and establish UX research best practices across teams.',
      requiredSkills: ['User Research', 'Prototyping', 'Data Analysis', 'Communication'],
      preferredSkills: ['Behavioral Psychology', 'Survey Design', 'Usability Testing'],
      experience: '4+ years',
      match: 85,
      postedDate: '3 days ago',
      manager: 'Fatima Al-Zahra',
      applications: 6
    },
    {
      id: 4,
      title: 'DevOps Engineer',
      department: 'Technology & Infrastructure',
      location: 'Dammam',
      type: 'Full-time',
      duration: 'Permanent',
      description: 'Build and maintain CI/CD pipelines, automate infrastructure, and improve deployment processes.',
      requiredSkills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
      preferredSkills: ['Terraform', 'Monitoring', 'Security'],
      experience: '3+ years',
      match: 88,
      postedDate: '5 days ago',
      manager: 'Omar Al-Sayed',
      applications: 15
    }
  ]

  const filteredOpportunities = opportunities.filter(opp => {
    const matchesSearch = opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opp.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLocation = selectedLocation === 'all' || opp.location === selectedLocation
    const matchesType = selectedType === 'all' || opp.type === selectedType
    const matchesDuration = selectedDuration === 'all' || opp.duration === selectedDuration
    
    return matchesSearch && matchesLocation && matchesType && matchesDuration
  })

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
                      subItem.name === 'Internal Talent Marketplace'
                        ? 'text-[#23544e] bg-[#23544e]/10 font-medium'
                        : 'text-gray-600 hover:text-[#23544e] hover:bg-gray-50'
                    }`}
                  >
                    <div className={`mr-3 flex-shrink-0 w-2 h-2 rounded-full ${
                      subItem.name === 'Internal Talent Marketplace'
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
              <h1 className="text-2xl font-bold mb-2">Internal Talent Marketplace</h1>
              <p className="text-green-100">Discover internal opportunities, projects, and career advancement paths</p>
            </div>

            {/* Search and Filters */}
            <div className="mb-8 bg-white rounded-lg shadow p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Search */}
                <div className="lg:col-span-2">
                  <div className="relative">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search opportunities..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#23544e] focus:border-[#23544e]"
                    />
                  </div>
                </div>

                {/* Location Filter */}
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#23544e] focus:border-[#23544e]"
                >
                  <option value="all">All Locations</option>
                  <option value="Riyadh">Riyadh</option>
                  <option value="Jeddah">Jeddah</option>
                  <option value="Dammam">Dammam</option>
                  <option value="Remote">Remote</option>
                </select>

                {/* Type Filter */}
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#23544e] focus:border-[#23544e]"
                >
                  <option value="all">All Types</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Project">Project</option>
                </select>

                {/* Duration Filter */}
                <select
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#23544e] focus:border-[#23544e]"
                >
                  <option value="all">All Durations</option>
                  <option value="Permanent">Permanent</option>
                  <option value="3 months">3 months</option>
                  <option value="6 months">6 months</option>
                  <option value="12 months">12 months</option>
                </select>
              </div>
            </div>

            {/* Opportunities Grid */}
            <div className="space-y-6">
              {filteredOpportunities.map((opportunity) => (
                <div key={opportunity.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{opportunity.title}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          opportunity.match >= 90 ? 'bg-green-100 text-green-800' :
                          opportunity.match >= 80 ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {opportunity.match}% Match
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <span className="flex items-center">
                          <BriefcaseIcon className="w-4 h-4 mr-1" />
                          {opportunity.department}
                        </span>
                        <span className="flex items-center">
                          <MapPinIcon className="w-4 h-4 mr-1" />
                          {opportunity.location}
                        </span>
                        <span className="flex items-center">
                          <ClockIcon className="w-4 h-4 mr-1" />
                          {opportunity.type} • {opportunity.duration}
                        </span>
                        <span className="flex items-center">
                          <UserIcon className="w-4 h-4 mr-1" />
                          {opportunity.experience}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-4">{opportunity.description}</p>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mb-4">
                    <div className="mb-2">
                      <span className="text-sm font-medium text-gray-900">Required Skills:</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {opportunity.requiredSkills.map((skill) => (
                        <span key={skill} className="px-2 py-1 bg-[#23544e] text-white text-xs rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="mb-2">
                      <span className="text-sm font-medium text-gray-900">Preferred Skills:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {opportunity.preferredSkills.map((skill) => (
                        <span key={skill} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>Manager: {opportunity.manager}</span>
                      <span>Posted: {opportunity.postedDate}</span>
                      <span>{opportunity.applications} applications</span>
                    </div>
                    <div className="flex space-x-3">
                      <button className="px-4 py-2 bg-[#23544e] text-white rounded-lg hover:bg-[#1a3f3a] transition-colors">
                        Apply Now
                      </button>
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {filteredOpportunities.length === 0 && (
                <div className="text-center py-12">
                  <BriefcaseIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No opportunities found</h3>
                  <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}