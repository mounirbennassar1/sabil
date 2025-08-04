"use client"

import React, { useState, useEffect } from 'react'
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
  UserGroupIcon,
  ArrowTrendingUpIcon,
  ChartBarIcon,
  MapIcon,
  CogIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  AcademicCapIcon as JourneyIcon,
  PlayIcon,
  PauseIcon,
  CheckCircleIcon,
  ClockIcon,
  TrophyIcon,
  FireIcon,
  ArrowRightIcon,
  EyeIcon,
  UserIcon,
  BookmarkIcon
} from '@heroicons/react/24/outline'

interface LearnerJourney {
  id: string
  learnerName: string
  avatar: string
  currentPath: string
  progress: number
  totalCourses: number
  completedCourses: number
  currentCourse: string
  timeSpent: number
  level: string
  badges: number
  status: 'active' | 'paused' | 'completed'
  enrollmentDate: string
  estimatedCompletion: string
}

interface LearningPath {
  id: string
  title: string
  description: string
  courses: number
  duration: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  enrolledLearners: number
  completionRate: number
  category: string
}

export default function LearnerJourneysPage(): React.JSX.Element {
  const { data: session } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [selectedView, setSelectedView] = useState('overview')
  const [selectedPath, setSelectedPath] = useState('All Paths')
  
  // Sidebar state
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({
    learningCapability: true,
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

  // Mock learner journeys data
  const learnerJourneys: LearnerJourney[] = [
    {
      id: '1',
      learnerName: 'Sarah Johnson',
      avatar: '/placeholder-avatar.svg',
      currentPath: 'Full-Stack Development',
      progress: 75,
      totalCourses: 8,
      completedCourses: 6,
      currentCourse: 'Advanced React Concepts',
      timeSpent: 42,
      level: 'Intermediate',
      badges: 12,
      status: 'active',
      enrollmentDate: '2024-01-15',
      estimatedCompletion: '2024-04-15'
    },
    {
      id: '2',
      learnerName: 'Michael Chen',
      avatar: '/placeholder-avatar.svg',
      currentPath: 'Data Science Fundamentals',
      progress: 90,
      totalCourses: 6,
      completedCourses: 5,
      currentCourse: 'Machine Learning Capstone',
      timeSpent: 68,
      level: 'Advanced',
      badges: 18,
      status: 'active',
      enrollmentDate: '2023-11-20',
      estimatedCompletion: '2024-03-20'
    },
    {
      id: '3',
      learnerName: 'Emily Rodriguez',
      avatar: '/placeholder-avatar.svg',
      currentPath: 'Digital Marketing',
      progress: 45,
      totalCourses: 5,
      completedCourses: 2,
      currentCourse: 'Social Media Strategy',
      timeSpent: 28,
      level: 'Beginner',
      badges: 7,
      status: 'paused',
      enrollmentDate: '2024-02-01',
      estimatedCompletion: '2024-05-01'
    },
    {
      id: '4',
      learnerName: 'David Thompson',
      avatar: '/placeholder-avatar.svg',
      currentPath: 'Project Management',
      progress: 100,
      totalCourses: 7,
      completedCourses: 7,
      currentCourse: 'Completed',
      timeSpent: 95,
      level: 'Expert',
      badges: 25,
      status: 'completed',
      enrollmentDate: '2023-09-15',
      estimatedCompletion: '2024-01-15'
    }
  ]

  const learningPaths: LearningPath[] = [
    {
      id: '1',
      title: 'Full-Stack Development',
      description: 'Complete web development from frontend to backend',
      courses: 8,
      duration: '3-4 months',
      difficulty: 'Intermediate',
      enrolledLearners: 45,
      completionRate: 78,
      category: 'Technology'
    },
    {
      id: '2',
      title: 'Data Science Fundamentals',
      description: 'Learn data analysis, visualization, and machine learning',
      courses: 6,
      duration: '4-5 months',
      difficulty: 'Advanced',
      enrolledLearners: 32,
      completionRate: 85,
      category: 'Data & Analytics'
    },
    {
      id: '3',
      title: 'Digital Marketing',
      description: 'Modern marketing strategies and digital tools',
      courses: 5,
      duration: '2-3 months',
      difficulty: 'Beginner',
      enrolledLearners: 67,
      completionRate: 72,
      category: 'Marketing'
    },
    {
      id: '4',
      title: 'Project Management',
      description: 'Essential project management skills and methodologies',
      courses: 7,
      duration: '3-4 months',
      difficulty: 'Intermediate',
      enrolledLearners: 58,
      completionRate: 91,
      category: 'Management'
    }
  ]

  const journeyStats = {
    activeLearners: 156,
    completedJourneys: 89,
    averageCompletion: 76,
    totalHours: 2847
  }

  useEffect(() => {
    if (!session) {
      router.push('/auth/signin')
      return
    }
    setLoading(false)
  }, [session, router])

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#23544e]"></div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#23544e]"></div>
      </div>
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <PlayIcon className="h-5 w-5 text-green-500" />
      case 'paused':
        return <PauseIcon className="h-5 w-5 text-yellow-500" />
      case 'completed':
        return <CheckCircleIcon className="h-5 w-5 text-blue-500" />
      default:
        return <ClockIcon className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'paused':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800'
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800'
      case 'Advanced':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'text-green-600'
      case 'Intermediate':
        return 'text-yellow-600'
      case 'Advanced':
        return 'text-orange-600'
      case 'Expert':
        return 'text-purple-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <>
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
                            subItem.href === '/talent/learner-journeys'
                              ? 'text-[#23544e] bg-[#23544e]/10 font-medium'
                              : 'text-gray-600 hover:text-[#23544e] hover:bg-gray-50'
                          }`}
                        >
                          <div className={`mr-3 flex-shrink-0 w-2 h-2 rounded-full ${
                            subItem.href === '/talent/learner-journeys'
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
            <div className="p-8">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="p-2 bg-[#23544e]/10 rounded-lg">
                        <JourneyIcon className="h-8 w-8 text-[#23544e]" />
                      </div>
                      <div>
                        <h1 className="text-3xl font-bold text-gray-900">Learner Journeys</h1>
                        <p className="text-gray-600">Track and visualize individual learning progress and pathways</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex bg-gray-100 rounded-lg p-1">
                      <button
                        onClick={() => setSelectedView('overview')}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                          selectedView === 'overview'
                            ? 'bg-white text-[#23544e] shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        Overview
                      </button>
                      <button
                        onClick={() => setSelectedView('paths')}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                          selectedView === 'paths'
                            ? 'bg-white text-[#23544e] shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        Learning Paths
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Learners</p>
                      <p className="text-3xl font-bold text-[#23544e] mt-1">{journeyStats.activeLearners}</p>
                    </div>
                    <div className="p-3 bg-[#23544e]/10 rounded-full">
                      <UserIcon className="h-6 w-6 text-[#23544e]" />
                    </div>
                  </div>
                  <p className="text-sm text-green-600 mt-2">↗ +8% from last month</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Completed Journeys</p>
                      <p className="text-3xl font-bold text-green-600 mt-1">{journeyStats.completedJourneys}</p>
                    </div>
                    <div className="p-3 bg-green-100 rounded-full">
                      <TrophyIcon className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                  <p className="text-sm text-green-600 mt-2">🎯 Goal: 120 this quarter</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Avg Completion Rate</p>
                      <p className="text-3xl font-bold text-blue-600 mt-1">{journeyStats.averageCompletion}%</p>
                    </div>
                    <div className="p-3 bg-blue-100 rounded-full">
                      <ChartBarIcon className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <p className="text-sm text-blue-600 mt-2">Above industry average</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Hours</p>
                      <p className="text-3xl font-bold text-purple-600 mt-1">{journeyStats.totalHours.toLocaleString()}</p>
                    </div>
                    <div className="p-3 bg-purple-100 rounded-full">
                      <FireIcon className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                  <p className="text-sm text-purple-600 mt-2">Learning engagement high</p>
                </div>
              </div>

              {selectedView === 'overview' ? (
                /* Individual Learner Journeys */
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Individual Journeys</h3>
                      <select 
                        value={selectedPath}
                        onChange={(e) => setSelectedPath(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#23544e] focus:border-transparent"
                      >
                        <option>All Paths</option>
                        <option>Full-Stack Development</option>
                        <option>Data Science Fundamentals</option>
                        <option>Digital Marketing</option>
                        <option>Project Management</option>
                      </select>
                    </div>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {learnerJourneys.map((journey) => (
                      <div key={journey.id} className="p-6 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <Image
                              src={journey.avatar}
                              alt={journey.learnerName}
                              width={48}
                              height={48}
                              className="rounded-full"
                            />
                            <div>
                              <h4 className="text-lg font-medium text-gray-900">{journey.learnerName}</h4>
                              <div className="flex items-center space-x-4 mt-1">
                                <span className="text-sm text-gray-600">{journey.currentPath}</span>
                                <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(journey.status)}`}>
                                  {journey.status.toUpperCase()}
                                </span>
                                <span className={`text-sm font-medium ${getLevelColor(journey.level)}`}>
                                  {journey.level}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-2 mb-1">
                              {getStatusIcon(journey.status)}
                              <span className="text-sm text-gray-500">
                                {journey.status === 'completed' ? 'Completed' : journey.currentCourse}
                              </span>
                            </div>
                            <div className="text-sm text-gray-500">
                              {journey.timeSpent}h spent • {journey.badges} badges
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-gray-600">Progress</span>
                              <span className="text-sm font-medium text-gray-900">{journey.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-[#23544e] h-2 rounded-full transition-all duration-300"
                                style={{ width: `${journey.progress}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          <div className="text-center">
                            <div className="text-sm text-gray-600">Courses</div>
                            <div className="text-lg font-semibold text-gray-900">
                              {journey.completedCourses}/{journey.totalCourses}
                            </div>
                          </div>
                          
                          <div className="text-center">
                            <div className="text-sm text-gray-600">Est. Completion</div>
                            <div className="text-sm font-medium text-gray-900">
                              {new Date(journey.estimatedCompletion).toLocaleDateString()}
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <BookmarkIcon className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-500">
                              Enrolled: {new Date(journey.enrollmentDate).toLocaleDateString()}
                            </span>
                          </div>
                          <button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-[#23544e] hover:bg-[#23544e]/10 rounded-lg transition-colors">
                            <EyeIcon className="h-4 w-4" />
                            <span>View Details</span>
                            <ArrowRightIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* Learning Paths Overview */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {learningPaths.map((path) => (
                    <div key={path.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{path.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{path.description}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded ${getDifficultyColor(path.difficulty)}`}>
                          {path.difficulty}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-gray-600">Duration</div>
                          <div className="text-lg font-semibold text-gray-900">{path.duration}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Courses</div>
                          <div className="text-lg font-semibold text-gray-900">{path.courses} courses</div>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-600">Completion Rate</span>
                          <span className="text-sm font-medium text-gray-900">{path.completionRate}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-[#23544e] h-2 rounded-full transition-all duration-300"
                            style={{ width: `${path.completionRate}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <UserGroupIcon className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{path.enrolledLearners} enrolled</span>
                        </div>
                        <button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-[#23544e] hover:bg-[#23544e]/10 rounded-lg transition-colors">
                          <span>View Path</span>
                          <ArrowRightIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}