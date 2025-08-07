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
  FireIcon,
  TrophyIcon,
  ClockIcon,
  XMarkIcon,
  DevicePhoneMobileIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline'

export default function LMSDashboardPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('learn')
  const [studyReminder, setStudyReminder] = useState('3')
  const [showAppBanner, setShowAppBanner] = useState(true)
  
  // State for expandable menu sections
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({
    learningCapability: true, // Expanded by default since we're on LMS Dashboard
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
        { name: 'Change Management Plan', href: '/dashboard/talent/change-management' },
        { name: 'ROI Tracking', href: '/dashboard/talent/roi-tracking' }
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

  // Dashboard tabs
  const dashboardTabs = [
    { id: 'learn', name: 'Learn & Get Certificates', active: activeTab === 'learn' },
    { id: 'career', name: 'Career Ready Plan', active: activeTab === 'career' },
    { id: 'hired', name: 'Get Hired', active: activeTab === 'hired' }
  ]

  // Learning stats
  const learningStats = [
    { icon: FireIcon, label: 'Learning Streak', value: '0', color: 'text-orange-500' },
    { icon: TrophyIcon, label: 'Certificates', value: '0', color: 'text-blue-500' },
    { icon: ClockIcon, label: 'Total Learning Hours', value: '0', color: 'text-purple-500' },
    { icon: StarIcon, label: 'XP', value: '5', color: 'text-yellow-500' }
  ]

  // Achievements data
  const achievements = [
    {
      id: 'finish-topic',
      title: 'Finish A Course Topic',
      description: 'Ace a course topic and watch your XP soar!',
      progress: 100,
      icon: '🎯',
      completed: false
    },
    {
      id: 'complete-module',
      title: 'Complete A Module',
      description: 'Finish a course module and climb the leaderboard!',
      progress: 0,
      icon: '🏆',
      completed: false
    }
  ]

  // Learning statistics
  const learningStatistics = {
    totalTime: '0 Mins',
    completionPercentage: '0%',
    coursesCompleted: 0,
    competitionMessage: 'Your biggest competition is yourself!'
  }

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
                    alt="Neom Green Hydrogen Logo" 
                    width={32}
                    height={32}
                    className="rounded-lg"
                  />
                  <span className="text-xl font-bold text-[#23544e]">Neom Green Hydrogen</span>
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
                              subItem.href === '/dashboard/talent/lms-dashboard'
                                ? 'bg-[#23544e] text-white'
                                : 'text-gray-600 hover:text-[#23544e] hover:bg-gray-50'
                            }`}
                          >
                            <div className={`mr-3 flex-shrink-0 w-2 h-2 rounded-full ${
                              subItem.href === '/dashboard/talent/lms-dashboard'
                                ? 'bg-white'
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
                        alt="Neom Green Hydrogen Logo" 
                        width={32}
                        height={32}
                        className="rounded-lg"
                      />
                      <span className="text-xl font-bold text-[#23544e]">Neom Green Hydrogen</span>
                    </Link>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BookOpenIcon className="h-6 w-6 text-[#23544e]" />
                    <h1 className="text-xl font-bold text-gray-900">LMS Dashboard</h1>
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
              
              {/* Welcome Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {session?.user?.name?.split(' ')[0]}&apos;s Dashboard – let&apos;s jump back in.
                </h1>
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-1 bg-gradient-to-r from-blue-500 to-green-500 rounded"></div>
                    <span>Continue your learning journey</span>
                  </div>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="mb-8">
                <nav className="flex space-x-8 border-b border-gray-200">
                  {dashboardTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                        tab.active
                          ? 'border-[#23544e] text-[#23544e]'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {tab.name}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              {activeTab === 'learn' && (
                <>
              {/* Learning Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {learningStats.map((stat, index) => (
                  <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center space-x-3">
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                      <div>
                        <p className="text-sm text-gray-600">{stat.label}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="md:col-span-4 flex justify-end">
                  <Link href="/achievements" className="text-sm text-[#23544e] hover:underline flex items-center">
                    View All Achievements
                    <ChevronRightIcon className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
                </>
              )}

              {activeTab === 'career' && (
                <>
                  {/* Career Ready Plan Content */}
                  <div className="space-y-8">
                    {/* Career Roadmap Overview */}
                    <div className="bg-gradient-to-r from-[#23544e] to-[#0b867a] rounded-2xl p-8 text-white">
                      <div className="max-w-4xl">
                        <h2 className="text-3xl font-bold mb-4">🚀 Your Career Ready Plan</h2>
                        <p className="text-xl opacity-90 mb-6">
                          Transform your career with our personalized roadmap. Build in-demand skills, earn certifications, and land your dream job.
                        </p>
                        <div className="flex flex-wrap gap-4">
                          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                            <span className="text-sm font-medium">📈 Career Growth</span>
                          </div>
                          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                            <span className="text-sm font-medium">🎯 Skill Development</span>
                          </div>
                          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                            <span className="text-sm font-medium">💼 Job Readiness</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Career Assessment */}
                    <div className="bg-white rounded-xl border border-gray-200 p-8">
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="bg-[#23544e]/10 p-3 rounded-full">
                          <ChartBarIcon className="h-8 w-8 text-[#23544e]" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900">Career Assessment</h3>
                          <p className="text-gray-600">Discover your strengths and areas for improvement</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gray-50 rounded-lg p-6 text-center">
                          <div className="text-3xl mb-3">🎯</div>
                          <h4 className="font-semibold text-gray-900 mb-2">Skills Assessment</h4>
                          <p className="text-sm text-gray-600 mb-4">Evaluate your current skill level</p>
                          <Link href="/talent/capability-assessment" className="bg-[#23544e] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1d453f] transition-colors">
                            Take Assessment
                          </Link>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-6 text-center">
                          <div className="text-3xl mb-3">💡</div>
                          <h4 className="font-semibold text-gray-900 mb-2">Interest Profiler</h4>
                          <p className="text-sm text-gray-600 mb-4">Find careers that match your interests</p>
                          <button className="bg-[#23544e] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1d453f] transition-colors">
                            Start Profiler
                          </button>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-6 text-center">
                          <div className="text-3xl mb-3">📊</div>
                          <h4 className="font-semibold text-gray-900 mb-2">Career Fit Score</h4>
                          <p className="text-sm text-gray-600 mb-4">See how well you match target roles</p>
                          <button className="bg-[#23544e] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1d453f] transition-colors">
                            View Score
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Learning Path */}
                    <div className="bg-white rounded-xl border border-gray-200 p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">📚 Recommended Learning Path</h3>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                          <div className="bg-green-100 p-2 rounded-full">
                            <span className="text-green-600 font-bold">1</span>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">Foundation Skills</h4>
                            <p className="text-sm text-gray-600">Build essential workplace competencies</p>
                          </div>
                          <div className="text-green-600 font-medium">Completed ✓</div>
                        </div>
                        <div className="flex items-center space-x-4 p-4 border border-[#23544e]/30 bg-[#23544e]/5 rounded-lg">
                          <div className="bg-[#23544e]/10 p-2 rounded-full">
                            <span className="text-[#23544e] font-bold">2</span>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">Technical Specialization</h4>
                            <p className="text-sm text-gray-600">Master job-specific technical skills</p>
                          </div>
                          <div className="text-[#23544e] font-medium">In Progress (60%)</div>
                        </div>
                        <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg opacity-75">
                          <div className="bg-gray-100 p-2 rounded-full">
                            <span className="text-gray-600 font-bold">3</span>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">Leadership & Management</h4>
                            <p className="text-sm text-gray-600">Develop leadership and soft skills</p>
                          </div>
                          <div className="text-gray-500 font-medium">Locked</div>
                        </div>
                      </div>
                    </div>

                    {/* Industry Insights */}
                    <div className="bg-white rounded-xl border border-gray-200 p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">📈 Industry Insights</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-6">
                          <h4 className="font-semibold text-gray-900 mb-4">🔥 Hot Skills in Demand</h4>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-700">Cloud Computing</span>
                              <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">+45%</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-700">Data Analytics</span>
                              <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">+38%</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-700">AI/Machine Learning</span>
                              <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">+52%</span>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6">
                          <h4 className="font-semibold text-gray-900 mb-4">💰 Salary Trends</h4>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-700">Software Engineer</span>
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">$95K avg</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-700">Data Scientist</span>
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">$118K avg</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-700">Product Manager</span>
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">$125K avg</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'hired' && (
                <>
                  {/* Get Hired Content */}
                  <div className="space-y-8">
                    {/* Job Search Hero */}
                    <div className="bg-gradient-to-r from-[#23544e] to-[#0b867a] rounded-2xl p-8 text-white">
                      <div className="max-w-4xl">
                        <h2 className="text-3xl font-bold mb-4">💼 Get Hired - Your Job Search Command Center</h2>
                        <p className="text-xl opacity-90 mb-6">
                          Land your dream job with our comprehensive job search tools, resume optimization, and interview preparation resources.
                        </p>
                        <div className="flex flex-wrap gap-4">
                          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                            <span className="text-sm font-medium">📝 Resume Builder</span>
                          </div>
                          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                            <span className="text-sm font-medium">🎯 Job Matching</span>
                          </div>
                          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                            <span className="text-sm font-medium">🗣️ Interview Prep</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Job Search Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
                        <div className="text-3xl mb-2">🎯</div>
                        <div className="text-2xl font-bold text-gray-900">127</div>
                        <div className="text-sm text-gray-600">Job Matches</div>
                      </div>
                      <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
                        <div className="text-3xl mb-2">📄</div>
                        <div className="text-2xl font-bold text-gray-900">3</div>
                        <div className="text-sm text-gray-600">Applications Sent</div>
                      </div>
                      <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
                        <div className="text-3xl mb-2">👀</div>
                        <div className="text-2xl font-bold text-gray-900">12</div>
                        <div className="text-sm text-gray-600">Profile Views</div>
                      </div>
                      <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
                        <div className="text-3xl mb-2">📞</div>
                        <div className="text-2xl font-bold text-gray-900">2</div>
                        <div className="text-sm text-gray-600">Interview Invites</div>
                      </div>
                    </div>

                    {/* Job Search Tools */}
                    <div className="bg-white rounded-xl border border-gray-200 p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">🛠️ Job Search Tools</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-[#23544e]/5 rounded-lg p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                          <div className="text-4xl mb-4">📝</div>
                          <h4 className="font-semibold text-gray-900 mb-2">AI Resume Builder</h4>
                          <p className="text-sm text-gray-600 mb-4">Create ATS-optimized resumes that get noticed</p>
                          <button className="bg-[#23544e] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#1d453f] transition-colors">
                            Build Resume
                          </button>
                        </div>
                        <div className="bg-[#23544e]/5 rounded-lg p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                          <div className="text-4xl mb-4">🔍</div>
                          <h4 className="font-semibold text-gray-900 mb-2">Smart Job Search</h4>
                          <p className="text-sm text-gray-600 mb-4">Find jobs that match your skills and preferences</p>
                          <button className="bg-[#23544e] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#1d453f] transition-colors">
                            Search Jobs
                          </button>
                        </div>
                        <div className="bg-[#23544e]/5 rounded-lg p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                          <div className="text-4xl mb-4">🎭</div>
                          <h4 className="font-semibold text-gray-900 mb-2">Interview Simulator</h4>
                          <p className="text-sm text-gray-600 mb-4">Practice with AI-powered mock interviews</p>
                          <button className="bg-[#23544e] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#1d453f] transition-colors">
                            Start Practice
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Recent Job Matches */}
                    <div className="bg-white rounded-xl border border-gray-200 p-8">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold text-gray-900">🎯 Top Job Matches</h3>
                        <Link href="/jobs" className="text-[#23544e] hover:underline font-medium">
                          View All Jobs →
                        </Link>
                      </div>
                      <div className="space-y-4">
                        <div className="border border-gray-200 rounded-lg p-6 hover:border-[#23544e] transition-colors">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="font-semibold text-gray-900">Senior Software Engineer</h4>
                              <p className="text-gray-600">TechCorp Inc. • San Francisco, CA</p>
                            </div>
                            <div className="text-right">
                              <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded mb-1">95% Match</div>
                              <div className="text-gray-500 text-sm">$120K - $160K</div>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 mb-4">
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">React</span>
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Node.js</span>
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">TypeScript</span>
                          </div>
                          <div className="flex space-x-3">
                            <button className="bg-[#23544e] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1d453f] transition-colors">
                              Apply Now
                            </button>
                            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                              Save for Later
                            </button>
                          </div>
                        </div>

                        <div className="border border-gray-200 rounded-lg p-6 hover:border-[#23544e] transition-colors">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="font-semibold text-gray-900">Product Manager</h4>
                              <p className="text-gray-600">InnovateLab • Remote</p>
                            </div>
                            <div className="text-right">
                              <div className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded mb-1">87% Match</div>
                              <div className="text-gray-500 text-sm">$110K - $140K</div>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 mb-4">
                            <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Product Strategy</span>
                            <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Agile</span>
                            <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Analytics</span>
                          </div>
                          <div className="flex space-x-3">
                            <button className="bg-[#23544e] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1d453f] transition-colors">
                              Apply Now
                            </button>
                            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                              Save for Later
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Interview Preparation */}
                    <div className="bg-white rounded-xl border border-gray-200 p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">🎯 Interview Preparation</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h4 className="font-semibold text-gray-900">📚 Preparation Resources</h4>
                          <div className="space-y-3">
                            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                              <div className="text-blue-600">📖</div>
                              <div>
                                <div className="font-medium text-gray-900">Common Interview Questions</div>
                                <div className="text-sm text-gray-600">50+ questions with sample answers</div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                              <div className="text-green-600">🎬</div>
                              <div>
                                <div className="font-medium text-gray-900">Video Interview Tips</div>
                                <div className="text-sm text-gray-600">Master virtual interviews</div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                              <div className="text-purple-600">🧠</div>
                              <div>
                                <div className="font-medium text-gray-900">Technical Interview Prep</div>
                                <div className="text-sm text-gray-600">Coding challenges and solutions</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h4 className="font-semibold text-gray-900">🚀 Quick Actions</h4>
                          <div className="space-y-3">
                            <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-[#23544e] hover:shadow-md transition-all">
                              <div className="font-medium text-gray-900">Schedule Mock Interview</div>
                              <div className="text-sm text-gray-600">Practice with industry experts</div>
                            </button>
                            <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-[#23544e] hover:shadow-md transition-all">
                              <div className="font-medium text-gray-900">Company Research Tool</div>
                              <div className="text-sm text-gray-600">Get insights on potential employers</div>
                            </button>
                            <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-[#23544e] hover:shadow-md transition-all">
                              <div className="font-medium text-gray-900">Salary Negotiation Guide</div>
                              <div className="text-sm text-gray-600">Maximize your earning potential</div>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'learn' && (
                <>
              {/* Personalized Recommendations */}
              <div className="bg-gradient-to-r from-[#23544e] to-[#0b867a] rounded-2xl p-8 mb-8 text-white overflow-hidden relative">
                <div className="relative z-10">
                  <div className="max-w-4xl">
                    <h2 className="text-3xl font-bold mb-4">Get Personalised Course & Career Recommendations!</h2>
                    <p className="text-xl opacity-90 mb-6">
                      Tell us what your learning goals and career objectives are, and we will recommend the best courses for you to enroll in.
                    </p>
                    <button className="bg-[#0b867a] hover:bg-[#0a7a6e] text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                      Get Recommendations
                    </button>
                  </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute right-8 top-1/2 transform -translate-y-1/2 opacity-20">
                  <div className="w-32 h-32 bg-white rounded-full"></div>
                </div>
              </div>

              {/* App Download Banner */}
              {showAppBanner && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <DevicePhoneMobileIcon className="h-8 w-8 text-green-600" />
                    <div>
                      <p className="font-medium text-gray-900">
                        No internet? No problem! Download any course on the Alison App and learn on the go. 📱
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button className="bg-[#23544e] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1d453f] transition-colors flex items-center space-x-2">
                      <DevicePhoneMobileIcon className="h-4 w-4" />
                      <span>Get App</span>
                    </button>
                    <button
                      onClick={() => setShowAppBanner(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Study Reminder Section */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Set A Weekly Study Reminder</h3>
                <p className="text-gray-600 mb-6">
                  Learners who set study reminders are 75% more likely to complete a course. You can change this any time.
                </p>
                <div className="flex items-center space-x-6">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="studyReminder"
                      value="2"
                      checked={studyReminder === '2'}
                      onChange={(e) => setStudyReminder(e.target.value)}
                      className="text-[#23544e] focus:ring-[#23544e]"
                    />
                    <span className="text-gray-700">Learn <strong>2 days</strong> a week</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="studyReminder"
                      value="3"
                      checked={studyReminder === '3'}
                      onChange={(e) => setStudyReminder(e.target.value)}
                      className="text-[#23544e] focus:ring-[#23544e]"
                    />
                    <span className="text-gray-700">
                      Learn <strong>3 days</strong> a week 
                      <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Recommended</span>
                    </span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="studyReminder"
                      value="5"
                      checked={studyReminder === '5'}
                      onChange={(e) => setStudyReminder(e.target.value)}
                      className="text-[#23544e] focus:ring-[#23544e]"
                    />
                    <span className="text-gray-700">Learn <strong>5 days</strong> a week</span>
                  </label>
                </div>
              </div>

              {/* Progress Section */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {session?.user?.name?.split(' ')[0]}, track and grow your <span className="text-[#23544e]">stats and achievements</span>.
                  </h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Achievements */}
                  <div className="lg:col-span-2 space-y-6">
                    {achievements.map((achievement) => (
                      <div key={achievement.id} className="bg-white rounded-xl border border-gray-200 p-6">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="text-3xl">{achievement.icon}</div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                            <p className="text-gray-600 text-sm">{achievement.description}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-[#23544e]">{achievement.progress}%</div>
                            <div className="w-16 h-2 bg-gray-200 rounded-full">
                              <div 
                                className="h-2 bg-[#23544e] rounded-full transition-all duration-300"
                                style={{ width: `${achievement.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        <button className="w-full bg-[#23544e] text-white py-3 rounded-lg font-medium hover:bg-[#1d453f] transition-colors">
                          Start Learning
                        </button>
                      </div>
                    ))}
                    <div className="text-center">
                      <Link href="/achievements" className="text-[#23544e] hover:underline font-medium">
                        View All Achievements →
                      </Link>
                    </div>
                  </div>

                  {/* Learning Statistics */}
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h4 className="font-semibold text-gray-900 mb-6">Learning Statistics</h4>
                    
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-600">Your Total Time Learning</span>
                          <span className="font-semibold text-gray-900">{learningStatistics.totalTime}</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full">
                          <div className="h-2 bg-red-500 rounded-full" style={{ width: '0%' }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-600">Course Completion Percentage</span>
                          <span className="font-semibold text-gray-900">{learningStatistics.completionPercentage}</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full">
                          <div className="h-2 bg-yellow-500 rounded-full" style={{ width: '0%' }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-gray-600">Courses Completed</span>
                          <span className="font-semibold text-gray-900">{learningStatistics.coursesCompleted}</span>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="text-center">
                          <div className="text-4xl mb-2">📊</div>
                          <p className="text-sm text-gray-600 font-medium">
                            {learningStatistics.competitionMessage}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl border border-gray-200 p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Link href="/talent/courses" className="group p-6 border border-gray-200 rounded-xl hover:border-[#23544e] hover:shadow-lg transition-all">
                    <BookOpenIcon className="h-8 w-8 text-[#23544e] mb-4" />
                    <h4 className="font-semibold text-gray-900 mb-2">Browse Courses</h4>
                    <p className="text-gray-600 text-sm">Explore our comprehensive course catalog</p>
                    <div className="mt-4 text-[#23544e] text-sm font-medium group-hover:underline">
                      Get started →
                    </div>
                  </Link>
                  
                  <Link href="/talent/capability-assessment" className="group p-6 border border-gray-200 rounded-xl hover:border-[#23544e] hover:shadow-lg transition-all">
                    <ChartBarIcon className="h-8 w-8 text-[#23544e] mb-4" />
                    <h4 className="font-semibold text-gray-900 mb-2">Skill Assessment</h4>
                    <p className="text-gray-600 text-sm">Evaluate your current capabilities</p>
                    <div className="mt-4 text-[#23544e] text-sm font-medium group-hover:underline">
                      Take assessment →
                    </div>
                  </Link>
                  
                  <Link href="/talent/career-pathing" className="group p-6 border border-gray-200 rounded-xl hover:border-[#23544e] hover:shadow-lg transition-all">
                    <MapIcon className="h-8 w-8 text-[#23544e] mb-4" />
                    <h4 className="font-semibold text-gray-900 mb-2">Career Path</h4>
                    <p className="text-gray-600 text-sm">Plan your professional development journey</p>
                    <div className="mt-4 text-[#23544e] text-sm font-medium group-hover:underline">
                      View path →
                    </div>
                  </Link>
                </div>
              </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}