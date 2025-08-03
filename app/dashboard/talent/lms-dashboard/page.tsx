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
        { name: 'Performance Analytics', href: '/dashboard/talent/performance-analytics' },
        { name: 'Talent KPIs', href: '/dashboard/talent/talent-kpis' },
        { name: 'Culture & Engagement', href: '/dashboard/talent/culture-engagement' }
      ]
    },
    {
      id: 'futureStrategic',
      name: 'Future & Strategic',
      icon: MapIcon,
      expanded: expandedSections.futureStrategic,
      subItems: [
        { name: 'Workforce Planning', href: '/dashboard/talent/workforce-planning' },
        { name: 'Personalized Learning', href: '/dashboard/talent/personalized-learning' },
        { name: 'Internal Talent Marketplace', href: '/dashboard/talent/talent-marketplace' }
      ]
    },
    {
      id: 'executionIntegration',
      name: 'Execution & Integration',
      icon: CogIcon,
      expanded: expandedSections.executionIntegration,
      subItems: [
        { name: 'Integration Placeholders', href: '/dashboard/talent/integration-placeholders' },
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
                        alt="Neon Green Hydrogen Logo" 
                        width={32}
                        height={32}
                        className="rounded-lg"
                      />
                      <span className="text-xl font-bold text-[#23544e]">Neon Green Hydrogen</span>
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
                          ? 'border-green-500 text-green-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {tab.name}
                    </button>
                  ))}
                </nav>
              </div>

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

              {/* Personalized Recommendations */}
              <div className="bg-gradient-to-r from-[#23544e] to-[#0b867a] rounded-2xl p-8 mb-8 text-white overflow-hidden relative">
                <div className="relative z-10">
                  <div className="max-w-4xl">
                    <h2 className="text-3xl font-bold mb-4">Get Personalised Course & Career Recommendations!</h2>
                    <p className="text-xl opacity-90 mb-6">
                      Tell us what your learning goals and career objectives are, and we will recommend the best courses for you to enroll in.
                    </p>
                    <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
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
                  <Link href="/dashboard/talent/courses" className="group p-6 border border-gray-200 rounded-xl hover:border-[#23544e] hover:shadow-lg transition-all">
                    <BookOpenIcon className="h-8 w-8 text-[#23544e] mb-4" />
                    <h4 className="font-semibold text-gray-900 mb-2">Browse Courses</h4>
                    <p className="text-gray-600 text-sm">Explore our comprehensive course catalog</p>
                    <div className="mt-4 text-[#23544e] text-sm font-medium group-hover:underline">
                      Get started →
                    </div>
                  </Link>
                  
                  <Link href="/dashboard/talent/capability-assessment" className="group p-6 border border-gray-200 rounded-xl hover:border-[#23544e] hover:shadow-lg transition-all">
                    <ChartBarIcon className="h-8 w-8 text-[#23544e] mb-4" />
                    <h4 className="font-semibold text-gray-900 mb-2">Skill Assessment</h4>
                    <p className="text-gray-600 text-sm">Evaluate your current capabilities</p>
                    <div className="mt-4 text-[#23544e] text-sm font-medium group-hover:underline">
                      Take assessment →
                    </div>
                  </Link>
                  
                  <Link href="/dashboard/talent/career-pathing" className="group p-6 border border-gray-200 rounded-xl hover:border-[#23544e] hover:shadow-lg transition-all">
                    <MapIcon className="h-8 w-8 text-[#23544e] mb-4" />
                    <h4 className="font-semibold text-gray-900 mb-2">Career Path</h4>
                    <p className="text-gray-600 text-sm">Plan your professional development journey</p>
                    <div className="mt-4 text-[#23544e] text-sm font-medium group-hover:underline">
                      View path →
                    </div>
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