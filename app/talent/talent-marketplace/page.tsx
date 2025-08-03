'use client'

import { useState } from 'react'
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
  FunnelIcon,
  MapPinIcon,
  ClockIcon,
  CurrencyDollarIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  StarIcon,
  CheckCircleIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline'

export default function TalentMarketplace() {
  const [expandedSections, setExpandedSections] = useState({
    learningCapability: false,
    talentGrowth: false,
    talentInsight: false,
    futureStrategic: true,
    executionIntegration: false
  })

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedDuration, setSelectedDuration] = useState('all')

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  // Sidebar navigation data
  const sidebarItems = [
    { name: 'My Career Journey', href: '/career', icon: HomeIcon, current: false },
    { name: 'Learning Hub', href: '/learn', icon: BookOpenIcon, current: false },
    { name: 'Content Library', href: '/content', icon: BookOpenIcon, current: false },
    { name: 'AI Assistant', href: '/ai', icon: ArrowTrendingUpIcon, current: false },
  ]

  const talentManagementSections = [
    {
      id: 'learningCapability',
      name: 'Learning & Capability',
      icon: BookOpenIcon,
      items: [
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
      items: [
        { name: 'Succession Planning Matrix', href: '/talent/succession-planning' },
        { name: 'Career Pathing Map', href: '/talent/career-pathing' },
        { name: 'Competency Framework', href: '/talent/competency-framework' }
      ]
    },
    {
      id: 'talentInsight',
      name: 'Talent Insight',
      icon: ChartBarIcon,
      items: [
        { name: 'Performance Analytics', href: '/talent/performance-analytics' },
        { name: 'Talent KPIs', href: '/talent/kpis' },
        { name: 'Culture & Engagement', href: '/talent/culture-engagement' }
      ]
    },
    {
      id: 'futureStrategic',
      name: 'Future & Strategic',
      icon: MapIcon,
      items: [
        { name: 'Workforce Planning', href: '/talent/workforce-planning' },
        { name: 'Personalized Learning', href: '/talent/personalized-learning' },
        { name: 'Internal Talent Marketplace', href: '/talent/talent-marketplace' }
      ]
    },
    {
      id: 'executionIntegration',
      name: 'Execution & Integration',
      icon: CogIcon,
      items: [
        { name: 'Integration Placeholders', href: '/talent/integrations' },
        { name: 'Change Management Plan', href: '/talent/change-management' },
        { name: 'ROI Tracking', href: '/talent/roi-tracking' }
      ]
    }
  ]

  // Mock opportunities data
  const opportunities = [
    {
      id: 1,
      title: 'Senior Software Engineering Lead',
      department: 'Engineering',
      type: 'Full-time Role',
      location: 'NEOM, Saudi Arabia',
      duration: 'Permanent',
      salary: 'SAR 180,000 - 220,000',
      requiredSkills: ['Leadership', 'React', 'Node.js', 'System Design', 'Team Management'],
      preferredSkills: ['AWS', 'DevOps', 'Agile'],
      description: 'Lead a team of 8+ engineers building next-generation smart city applications. Drive technical strategy and mentor junior developers.',
      responsibilities: [
        'Lead technical architecture decisions',
        'Mentor and coach team members',
        'Collaborate with product teams',
        'Drive engineering best practices'
      ],
      requirements: [
        '7+ years software engineering experience',
        '3+ years in leadership roles',
        'Strong communication skills',
        'Experience with modern web technologies'
      ],
      matchScore: 92,
      postedDate: '2024-01-15',
      deadline: '2024-02-15',
      applicants: 12,
      manager: 'Ahmed Al-Rashid',
      urgent: false
    },
    {
      id: 2,
      title: 'Sustainability Data Analyst - Project Phoenix',
      department: 'Sustainability',
      type: 'Project Assignment',
      location: 'Remote',
      duration: '6 months',
      salary: 'Project-based',
      requiredSkills: ['Data Analysis', 'Python', 'SQL', 'Sustainability Metrics', 'Visualization'],
      preferredSkills: ['R', 'Tableau', 'Environmental Science'],
      description: 'Analyze environmental impact data for Project Phoenix. Create dashboards and reports for executive stakeholders.',
      responsibilities: [
        'Analyze sustainability metrics',
        'Create data visualization dashboards',
        'Prepare executive reports',
        'Collaborate with project teams'
      ],
      requirements: [
        '3+ years data analysis experience',
        'Knowledge of sustainability frameworks',
        'Strong analytical skills',
        'Experience with business intelligence tools'
      ],
      matchScore: 85,
      postedDate: '2024-01-18',
      deadline: '2024-02-28',
      applicants: 8,
      manager: 'Dr. Sarah Ahmed',
      urgent: true
    },
    {
      id: 3,
      title: 'Digital Marketing Specialist - Smart City Campaign',
      department: 'Marketing',
      type: 'Temporary Assignment',
      location: 'Riyadh',
      duration: '3 months',
      salary: 'SAR 12,000/month',
      requiredSkills: ['Digital Marketing', 'Social Media', 'Content Strategy', 'Analytics', 'SEO'],
      preferredSkills: ['Video Production', 'Graphic Design', 'Arabic Language'],
      description: 'Lead digital marketing efforts for the Smart City awareness campaign. Manage social media presence and content creation.',
      responsibilities: [
        'Develop digital marketing strategies',
        'Manage social media campaigns',
        'Create engaging content',
        'Track and analyze performance metrics'
      ],
      requirements: [
        '2+ years digital marketing experience',
        'Strong creative skills',
        'Experience with marketing automation tools',
        'Bilingual (Arabic/English) preferred'
      ],
      matchScore: 78,
      postedDate: '2024-01-20',
      deadline: '2024-02-10',
      applicants: 15,
      manager: 'Layla Hassan',
      urgent: false
    },
    {
      id: 4,
      title: 'Innovation Lab Mentor',
      department: 'Innovation',
      type: 'Mentorship',
      location: 'NEOM Innovation Hub',
      duration: '1 year',
      salary: 'Mentorship stipend',
      requiredSkills: ['Innovation Management', 'Startup Experience', 'Product Development', 'Coaching', 'Design Thinking'],
      preferredSkills: ['Venture Capital', 'Technology Transfer', 'IP Management'],
      description: 'Mentor early-stage startups in the NEOM Innovation Lab. Guide entrepreneurs through product development and go-to-market strategies.',
      responsibilities: [
        'Mentor startup teams',
        'Provide strategic guidance',
        'Connect with investor networks',
        'Review business plans and pitch decks'
      ],
      requirements: [
        '5+ years in innovation/startup ecosystem',
        'Proven track record in product development',
        'Strong coaching and mentoring skills',
        'Experience with emerging technologies'
      ],
      matchScore: 70,
      postedDate: '2024-01-22',
      deadline: '2024-03-01',
      applicants: 6,
      manager: 'Omar Bin Khalid',
      urgent: false
    },
    {
      id: 5,
      title: 'Construction Project Coordinator',
      department: 'Construction',
      type: 'Full-time Role',
      location: 'NEOM Construction Site',
      duration: 'Permanent',
      salary: 'SAR 95,000 - 120,000',
      requiredSkills: ['Project Management', 'Construction Planning', 'Safety Management', 'Quality Control', 'Team Coordination'],
      preferredSkills: ['BIM', 'Sustainability Practices', 'Arabic Language'],
      description: 'Coordinate construction activities for residential district development. Ensure projects meet quality, safety, and timeline requirements.',
      responsibilities: [
        'Coordinate construction teams',
        'Monitor project timelines',
        'Ensure safety compliance',
        'Manage quality control processes'
      ],
      requirements: [
        '4+ years construction experience',
        'PMP certification preferred',
        'Strong organizational skills',
        'Knowledge of construction safety regulations'
      ],
      matchScore: 65,
      postedDate: '2024-01-25',
      deadline: '2024-02-25',
      applicants: 9,
      manager: 'Hassan Al-Najjar',
      urgent: false
    },
    {
      id: 6,
      title: 'HR Business Partner - Transformation Team',
      department: 'Human Resources',
      type: 'Rotational Assignment',
      location: 'Multiple NEOM Locations',
      duration: '18 months',
      salary: 'Current salary + 15%',
      requiredSkills: ['HR Strategy', 'Change Management', 'Employee Relations', 'Talent Development', 'Analytics'],
      preferredSkills: ['Organizational Psychology', 'Coaching', 'HRIS Systems'],
      description: 'Partner with business units during organizational transformation. Lead change management initiatives and talent development programs.',
      responsibilities: [
        'Support organizational change initiatives',
        'Develop talent strategies',
        'Manage employee relations',
        'Implement HR policies and procedures'
      ],
      requirements: [
        '5+ years HR business partnering experience',
        'Change management certification',
        'Strong interpersonal skills',
        'Experience in fast-paced environments'
      ],
      matchScore: 88,
      postedDate: '2024-01-28',
      deadline: '2024-02-20',
      applicants: 7,
      manager: 'Fatima Al-Zahra',
      urgent: true
    }
  ]

  const getMatchScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600 bg-green-50'
    if (score >= 70) return 'text-yellow-600 bg-yellow-50'
    return 'text-red-600 bg-red-50'
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Full-time Role': return 'text-blue-600 bg-blue-50'
      case 'Project Assignment': return 'text-purple-600 bg-purple-50'
      case 'Temporary Assignment': return 'text-orange-600 bg-orange-50'
      case 'Mentorship': return 'text-green-600 bg-green-50'
      case 'Rotational Assignment': return 'text-indigo-600 bg-indigo-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const filteredOpportunities = opportunities.filter(opportunity => {
    const matchesSearch = opportunity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opportunity.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opportunity.requiredSkills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesLocation = selectedLocation === 'all' || 
                           opportunity.location.toLowerCase().includes(selectedLocation.toLowerCase())
    
    const matchesType = selectedType === 'all' || opportunity.type === selectedType
    
    const matchesDuration = selectedDuration === 'all' || 
                           (selectedDuration === 'short' && (opportunity.duration.includes('month') || opportunity.duration.includes('Temporary'))) ||
                           (selectedDuration === 'long' && (opportunity.duration.includes('Permanent') || opportunity.duration.includes('year')))
    
    return matchesSearch && matchesLocation && matchesType && matchesDuration
  })

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-[#23544e]">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <h1 className="text-xl font-bold text-white">Talent Hub</h1>
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {/* Home */}
              <Link
                href="/dashboard"
                className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              >
                <HomeIcon className="text-gray-400 mr-3 flex-shrink-0 h-6 w-6" />
                Home
              </Link>

              {/* Talent Management Strategy Header */}
              <div className="pt-4">
                <h3 className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Talent Management Strategy
                </h3>
                
                {/* Strategy Overview */}
                <Link
                  href="/dashboard/talent-strategy"
                  className="mt-2 text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                >
                  <MapIcon className="text-gray-400 mr-3 flex-shrink-0 h-6 w-6" />
                  Strategy Overview
                </Link>

                {/* Expandable Sections */}
                <div className="mt-2 space-y-1">
                  {talentManagementSections.map((section) => (
                    <div key={section.id}>
                      <button
                        onClick={() => toggleSection(section.id as keyof typeof expandedSections)}
                        className="w-full text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                      >
                        <section.icon className="text-gray-400 mr-3 flex-shrink-0 h-6 w-6" />
                        <span className="flex-1 text-left">{section.name}</span>
                        {expandedSections[section.id as keyof typeof expandedSections] ? (
                          <ChevronUpIcon className="ml-2 h-4 w-4 text-gray-400" />
                        ) : (
                          <ChevronDownIcon className="ml-2 h-4 w-4 text-gray-400" />
                        )}
                      </button>
                      
                      {expandedSections[section.id as keyof typeof expandedSections] && (
                        <div className="ml-6 mt-1 space-y-1">
                          {section.items.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                                item.name === 'Internal Talent Marketplace'
                                  ? 'bg-gray-800 text-white'
                                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                              }`}
                            >
                              <span className="truncate">{item.name}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Original sidebar items */}
              <div className="pt-4 mt-4 border-t border-gray-700">
                {sidebarItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      item.current ? 'bg-gray-900 text-white' : ''
                    }`}
                  >
                    <item.icon className="text-gray-400 mr-3 flex-shrink-0 h-6 w-6" />
                    {item.name}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-64 flex flex-col flex-1">
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Internal Talent Marketplace</h1>
                <p className="mt-2 text-gray-600">Discover internal opportunities, projects, and mentorship programs</p>
              </div>

              {/* Search and Filters */}
              <div className="bg-white rounded-lg shadow p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div className="md:col-span-2">
                    <div className="relative">
                      <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search opportunities, skills, departments..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23544e]"
                      />
                    </div>
                  </div>

                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#23544e]"
                  >
                    <option value="all">All Locations</option>
                    <option value="neom">NEOM</option>
                    <option value="riyadh">Riyadh</option>
                    <option value="jeddah">Jeddah</option>
                    <option value="remote">Remote</option>
                  </select>

                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#23544e]"
                  >
                    <option value="all">All Types</option>
                    <option value="Full-time Role">Full-time Role</option>
                    <option value="Project Assignment">Project Assignment</option>
                    <option value="Temporary Assignment">Temporary Assignment</option>
                    <option value="Mentorship">Mentorship</option>
                    <option value="Rotational Assignment">Rotational Assignment</option>
                  </select>

                  <select
                    value={selectedDuration}
                    onChange={(e) => setSelectedDuration(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#23544e]"
                  >
                    <option value="all">All Durations</option>
                    <option value="short">Short-term (≤6 months)</option>
                    <option value="long">Long-term (&gt;6 months)</option>
                  </select>
                </div>

                <div className="mt-4 text-sm text-gray-600">
                  Showing {filteredOpportunities.length} of {opportunities.length} opportunities
                </div>
              </div>

              {/* Opportunities Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredOpportunities.map((opportunity) => (
                  <div key={opportunity.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-medium text-gray-900">{opportunity.title}</h3>
                          {opportunity.urgent && (
                            <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                              Urgent
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <BriefcaseIcon className="h-4 w-4 mr-1" />
                            {opportunity.department}
                          </div>
                          <div className="flex items-center">
                            <MapPinIcon className="h-4 w-4 mr-1" />
                            {opportunity.location}
                          </div>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${getMatchScoreColor(opportunity.matchScore)}`}>
                        {opportunity.matchScore}% Match
                      </div>
                    </div>

                    {/* Type and Duration */}
                    <div className="flex items-center space-x-2 mb-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(opportunity.type)}`}>
                        {opportunity.type}
                      </span>
                      <div className="flex items-center text-sm text-gray-600">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        {opportunity.duration}
                      </div>
                      {opportunity.salary && (
                        <div className="flex items-center text-sm text-gray-600">
                          <CurrencyDollarIcon className="h-4 w-4 mr-1" />
                          {opportunity.salary}
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 mb-4">{opportunity.description}</p>

                    {/* Required Skills */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Required Skills</h4>
                      <div className="flex flex-wrap gap-1">
                        {opportunity.requiredSkills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 bg-[#23544e] text-white text-xs rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Preferred Skills */}
                    {opportunity.preferredSkills.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Preferred Skills</h4>
                        <div className="flex flex-wrap gap-1">
                          {opportunity.preferredSkills.map((skill) => (
                            <span
                              key={skill}
                              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Meta Information */}
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <div className="flex items-center space-x-4">
                        <span>Manager: {opportunity.manager}</span>
                        <span>{opportunity.applicants} applicants</span>
                      </div>
                      <span>Deadline: {new Date(opportunity.deadline).toLocaleDateString()}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3">
                      <button className="flex-1 bg-[#23544e] text-white px-4 py-2 rounded-md hover:bg-[#1a3d37] transition-colors">
                        Apply Now
                      </button>
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                        Save
                      </button>
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                        Learn More
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Empty State */}
              {filteredOpportunities.length === 0 && (
                <div className="text-center py-12">
                  <BriefcaseIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No opportunities found</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Try adjusting your search criteria or check back later for new opportunities.
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}