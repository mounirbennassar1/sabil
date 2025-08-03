"use client"

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {
  HomeIcon,
  BriefcaseIcon,
  BookOpenIcon,
  HeartIcon,
  StarIcon,
  AcademicCapIcon,
  SparklesIcon,
  CpuChipIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  UserGroupIcon,
  ArrowTrendingUpIcon,
  ChartBarIcon,
  MapIcon,
  CogIcon,
  LightBulbIcon,
  BuildingOfficeIcon,
  UserIcon,
  TrophyIcon,
  HandRaisedIcon,
  AdjustmentsHorizontalIcon,
  PresentationChartLineIcon,
  GiftIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline'

export default function TalentStrategyPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  
  // State for expandable menu sections
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({
    learningCapability: false,
    talentGrowth: false,
    talentInsight: false,
    futureStrategic: false,
    executionIntegration: false
  })

  const talentManagementSections = [
    {
      id: 'learningCapability',
      name: 'Learning & Capability',
      icon: BookOpenIcon,
      expanded: expandedSections.learningCapability,
      subItems: [
        { name: 'LMS Dashboard', href: '/talent/lms-dashboard' },
        { name: 'Capability Assessment Tool', href: '/talent/capability-assessment' },
        { name: 'Gap Analysis View', href: '/talent/gap-analysis' },
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
        { name: 'Integration Placeholders', href: '/talent/integration-placeholders' },
        { name: 'Change Management Plan', href: '/talent/change-management' },
        { name: 'ROI Tracking', href: '/talent/roi-tracking' }
      ]
    }
  ]

  const sidebarItems = [
    { name: 'Home', href: '/dashboard', icon: HomeIcon, current: false },
    { name: 'My Career Journey', href: '/career', icon: BriefcaseIcon, current: false, isSection: true },
    { name: 'Learn', href: '/learn', icon: BookOpenIcon, current: false, isSection: true },
    { name: 'My Library', href: '/library', icon: HeartIcon, current: false },
    { name: 'Content', href: '/content', icon: StarIcon, current: false },
    { name: 'Apply AI', href: '/ai', icon: SparklesIcon, current: false, isSection: true },
    { name: 'Coding Practice', href: '/coding', icon: CpuChipIcon, current: false },
    { name: 'Certifications', href: '/certificates', icon: AcademicCapIcon, current: false },
  ]

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  // HR Strategy Framework sections
  const strategyComponents = [
    {
      title: "Summary of the Corporate and Business Strategy",
      color: "bg-blue-50 border-blue-200 text-blue-800",
      icon: BuildingOfficeIcon
    },
    {
      title: "HR Analysis",
      color: "bg-purple-50 border-purple-200 text-purple-800",
      icon: ChartBarIcon
    },
    {
      title: "HR and Talent Management Capability Maturity Model",
      color: "bg-green-50 border-green-200 text-green-800",
      icon: AdjustmentsHorizontalIcon
    },
    {
      title: "Current State And Target State",
      color: "bg-orange-50 border-orange-200 text-orange-800",
      icon: MapIcon
    },
    {
      title: "HR and Talent Management Mission, Vision & Values",
      color: "bg-red-50 border-red-200 text-red-800",
      icon: LightBulbIcon
    },
    {
      title: "Strategic Objectives & KPIs to Reach Our Vision",
      color: "bg-teal-50 border-teal-200 text-teal-800",
      icon: TrophyIcon
    },
    {
      title: "HR Team & Budget",
      color: "bg-indigo-50 border-indigo-200 text-indigo-800",
      icon: UserGroupIcon
    },
    {
      title: "Guiding Principles",
      color: "bg-pink-50 border-pink-200 text-pink-800",
      icon: HandRaisedIcon
    }
  ]

  // 10 Pillars of HR Strategy
  const hrPillars = [
    {
      id: 'capability',
      title: 'Capability Management',
      icon: LightBulbIcon,
      color: 'from-blue-500 to-blue-700',
      items: [
        'The importance of capability management',
        'Desired capabilities',
        'Current state and target state of each desired capabilities',
        'Gap analysis and action plan'
      ]
    },
    {
      id: 'structure',
      title: 'Structure & Governance',
      icon: BuildingOfficeIcon,
      color: 'from-purple-500 to-purple-700',
      items: [
        'The importance of structure & governance',
        'Structure',
        'Roles and responsibilities',
        'Governance',
        'Workforce size',
        'Location model'
      ]
    },
    {
      id: 'culture',
      title: 'Culture',
      icon: UserIcon,
      color: 'from-green-500 to-green-700',
      items: [
        'The importance of organizational culture',
        'Current culture assessment',
        'Culture design principles',
        'Highest performing cultures',
        'Desired culture',
        'Action plan',
        'Progress monitoring'
      ]
    },
    {
      id: 'competency',
      title: 'Competency Management',
      icon: TrophyIcon,
      color: 'from-orange-500 to-orange-700',
      items: [
        'The importance of competency management',
        'Competency framework',
        'Competency map',
        'Competency development',
        'Career progression',
        'Competency management evaluation'
      ]
    },
    {
      id: 'recruitment',
      title: 'Recruitment',
      icon: HandRaisedIcon,
      color: 'from-red-500 to-red-700',
      items: [
        'Employer branding strategy',
        'Recruitment process & strategy',
        'AI and automation',
        'Inclusive hiring practices',
        'Hiring for culture fit',
        'Recruitment KPIs',
        'Recruitment outsourcing',
        'Candidate experience & onboarding'
      ]
    },
    {
      id: 'development',
      title: 'Talent Development',
      icon: ArrowTrendingUpIcon,
      color: 'from-teal-500 to-teal-700',
      items: [
        'Identifying high-potential talent',
        'Individual development plans',
        'Forming talent pools and leadership pipelines',
        'Blended learning for talent development',
        'Talent mobility and career pathing',
        'Employee retention strategies'
      ]
    },
    {
      id: 'mentoring',
      title: 'Mentoring',
      icon: UserGroupIcon,
      color: 'from-indigo-500 to-indigo-700',
      items: [
        'Setting up a mentoring program',
        'Mentor-mentee matching',
        'Mentoring culture',
        'Reverse mentoring',
        'Impact of mentoring programs',
        'Current trends and innovations in mentoring'
      ]
    },
    {
      id: 'performance',
      title: 'Performance Management',
      icon: PresentationChartLineIcon,
      color: 'from-pink-500 to-pink-700',
      items: [
        'Top 8 models and approaches',
        'Implementing OKR framework',
        'Feedback and performance conversations',
        'Leveraging technology in performance management',
        'Measuring the success of performance management plans'
      ]
    },
    {
      id: 'rewards',
      title: 'Reward and Recognition',
      icon: GiftIcon,
      color: 'from-yellow-500 to-yellow-700',
      items: [
        'Setting up a reward and recognition program',
        'Transparency and equity in reward systems',
        'Leveraging technology for reward management',
        'Evaluating the impact of reward and recognition programs'
      ]
    },
    {
      id: 'termination',
      title: 'Reassignment & Termination',
      icon: ArrowPathIcon,
      color: 'from-gray-500 to-gray-700',
      items: [
        'Strategies for employee reassignment',
        'Termination processes and protocols',
        'Managing downsizing and layoffs',
        'Legal and ethical considerations'
      ]
    }
  ]

  useEffect(() => {
    if (!session) {
      router.push('/auth/signin')
      return
    }
    setLoading(false)
  }, [session, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#23544e]"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex-1 flex flex-col min-h-0 bg-white shadow-lg">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4 mb-8">
                <Link href="/dashboard" className="flex items-center space-x-3">
                  <Image 
                    src="/logo.png" 
                    alt="Neon Green Hydrogen Logo" 
                    width={32}
                    height={32}
                    className="rounded-lg"
                  />
                  <span className="text-xl font-bold text-[#23544e]">Neon Green Hydrogen</span>
                </Link>
              </div>
              <nav className="mt-5 flex-1 px-2 space-y-1">
                {/* Home */}
                <Link
                  href="/dashboard"
                  className="group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors text-gray-600 hover:text-[#23544e] hover:bg-gray-50"
                >
                  <HomeIcon className="mr-3 flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
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
                            className="group flex items-center px-3 py-2 text-sm rounded-lg transition-colors text-gray-600 hover:text-[#23544e] hover:bg-gray-50"
                          >
                            <div className="mr-3 flex-shrink-0 w-2 h-2 bg-gray-300 rounded-full group-hover:bg-[#23544e]"></div>
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
                    className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      item.current
                        ? 'bg-[#23544e] text-white'
                        : item.isSection
                        ? 'text-gray-900 hover:text-[#23544e] hover:bg-gray-50 font-medium'
                        : 'text-gray-600 hover:text-[#23544e] hover:bg-gray-50'
                    }`}
                  >
                    <item.icon
                      className={`mr-3 flex-shrink-0 h-5 w-5 ${
                        item.current 
                          ? 'text-white' 
                          : item.isSection 
                          ? 'text-[#23544e]' 
                          : 'text-gray-400 group-hover:text-gray-500'
                      }`}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-hidden">
        <div className="flex flex-col h-screen">
          {/* Top header */}
          <div className="bg-white shadow-sm border-b border-gray-200">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center space-x-4">
                  <div className="flex lg:hidden">
                    <Link href="/dashboard" className="flex items-center space-x-2">
                      <Image 
                        src="/logo.png" 
                        alt="Neon Green Hydrogen Logo" 
                        width={32}
                        height={32}
                        className="rounded-lg"
                      />
                      <span className="text-xl font-bold text-[#23544e]">Neon Green Hydrogen</span>
                    </Link>
                  </div>
                  <div className="flex items-center space-x-2">
                    <UserGroupIcon className="h-6 w-6 text-[#23544e]" />
                    <h1 className="text-xl font-bold text-gray-900">HR and Talent Management Strategy</h1>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-3">
                    <Image
                      src={session?.user?.image || '/placeholder-avatar.svg'}
                      alt="Profile"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <div className="hidden md:block">
                      <p className="text-sm font-medium text-gray-900">{session?.user?.name}</p>
                      <p className="text-xs text-gray-500">{session?.user?.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Page content */}
          <div className="flex-1 overflow-y-auto bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {/* Hero Section */}
              <div className="bg-gradient-to-r from-[#23544e] to-[#0b867a] rounded-2xl p-8 mb-8 text-white">
                <div className="max-w-4xl">
                  <h1 className="text-4xl font-bold mb-4">HR and Talent Management Strategy</h1>
                  <p className="text-xl opacity-90 mb-6">
                    Comprehensive framework for building world-class talent capabilities and organizational excellence
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                      <span className="text-sm font-semibold">Strategic Framework</span>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                      <span className="text-sm font-semibold">10 Core Pillars</span>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                      <span className="text-sm font-semibold">Implementation Roadmap</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* I. HR and Talent Management Strategy Components */}
              <section className="mb-12">
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 mb-8">
                  <h2 className="text-3xl font-bold text-white mb-2">I. HR and Talent Management Strategy</h2>
                  <p className="text-blue-100">Foundational components that drive our strategic approach</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {strategyComponents.map((component, index) => (
                    <div key={index} className={`${component.color} border-2 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105`}>
                      <div className="flex items-start space-x-3">
                        <component.icon className="h-8 w-8 mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-bold text-lg leading-tight">{component.title}</h3>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* II. 10 Pillars */}
              <section className="mb-12">
                <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl p-6 mb-8">
                  <h2 className="text-3xl font-bold text-white mb-2">II. 10 Pillars to reach our HR and Talent Management Strategic Objectives</h2>
                  <p className="text-purple-100">Core pillars that form the foundation of our talent strategy</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {hrPillars.map((pillar, index) => (
                    <div key={pillar.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                      <div className={`bg-gradient-to-r ${pillar.color} p-6`}>
                        <div className="flex items-center space-x-3">
                          <pillar.icon className="h-8 w-8 text-white" />
                          <h3 className="text-xl font-bold text-white">{pillar.title}</h3>
                        </div>
                      </div>
                      <div className="p-6">
                        <ul className="space-y-3">
                          {pillar.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-[#23544e] rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-gray-700 leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Additional Sections */}
              <section className="space-y-8">
                {/* III. Potential Initiatives */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-lg p-4 mb-6">
                    <h2 className="text-2xl font-bold text-white">III. Potential Initiatives for each Pillar</h2>
                  </div>
                  <p className="text-gray-600 text-lg">
                    Detailed implementation initiatives and action plans will be developed for each pillar to ensure successful execution of our talent management strategy.
                  </p>
                </div>

                {/* IV. Business Cases */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <div className="bg-gradient-to-r from-orange-600 to-orange-800 rounded-lg p-4 mb-6">
                    <h2 className="text-2xl font-bold text-white">IV. Business cases and financial models to assess potential projects</h2>
                  </div>
                  <p className="text-gray-600 text-lg">
                    Comprehensive business cases with ROI analysis and financial modeling to prioritize and validate talent management investments.
                  </p>
                </div>

                {/* V. Project Prioritization */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <div className="bg-gradient-to-r from-teal-600 to-teal-800 rounded-lg p-4 mb-6">
                    <h2 className="text-2xl font-bold text-white">V. Project Prioritization, Business Roadmap and Implementation</h2>
                  </div>
                  <p className="text-gray-600 text-lg">
                    Strategic roadmap with clear timelines, milestones, and implementation phases to achieve our talent management objectives.
                  </p>
                </div>

                {/* VI. Change Management */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-lg p-4 mb-6">
                    <h2 className="text-2xl font-bold text-white">VI. Change Management, Internal Communication and Stakeholder Engagement</h2>
                  </div>
                  <p className="text-gray-600 text-lg">
                    Comprehensive change management strategy ensuring successful adoption and stakeholder buy-in across the organization.
                  </p>
                </div>
              </section>

              {/* Call to Action */}
              <div className="bg-gradient-to-r from-[#23544e] to-[#0b867a] rounded-2xl p-8 mt-12 text-center text-white">
                <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Talent Strategy?</h2>
                <p className="text-xl opacity-90 mb-6">
                  Explore our comprehensive talent management tools and resources
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link href="/talent/lms-dashboard" className="bg-white text-[#23544e] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    Access LMS Dashboard
                  </Link>
                  <Link href="/talent/capability-assessment" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#23544e] transition-colors">
                    Start Assessment
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}