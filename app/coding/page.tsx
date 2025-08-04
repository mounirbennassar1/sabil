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
  CodeBracketIcon,
  PlayIcon,
  ClockIcon,
  FireIcon,
  UserGroupIcon,
  ArrowTrendingUpIcon,
  ChartBarIcon,
  MapIcon,
  CogIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@heroicons/react/24/outline'

interface CodingChallenge {
  id: string
  title: string
  description: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  category: string
  timeLimit: string
  completed: boolean
  language: string[]
}

export default function CodingPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [challenges, setChallenges] = useState<CodingChallenge[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All')
  
  // Sidebar state
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

  const categories = ['All', 'Arrays', 'Strings', 'Algorithms', 'Data Structures', 'Dynamic Programming']

  useEffect(() => {
    if (!session) {
      router.push('/auth/signin')
      return
    }

    // Mock coding challenges data
    const mockChallenges: CodingChallenge[] = [
      {
        id: '1',
        title: 'Two Sum',
        description: 'Given an array of integers, return indices of the two numbers such that they add up to a specific target.',
        difficulty: 'Easy',
        category: 'Arrays',
        timeLimit: '30 min',
        completed: true,
        language: ['JavaScript', 'Python', 'Java']
      },
      {
        id: '2',
        title: 'Valid Parentheses',
        description: 'Given a string containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid.',
        difficulty: 'Easy',
        category: 'Strings',
        timeLimit: '25 min',
        completed: false,
        language: ['JavaScript', 'Python', 'C++']
      },
      {
        id: '3',
        title: 'Binary Tree Inorder Traversal',
        description: 'Given the root of a binary tree, return the inorder traversal of its nodes\' values.',
        difficulty: 'Medium',
        category: 'Data Structures',
        timeLimit: '45 min',
        completed: false,
        language: ['JavaScript', 'Python', 'Java']
      },
      {
        id: '4',
        title: 'Longest Palindromic Substring',
        description: 'Given a string s, return the longest palindromic substring in s.',
        difficulty: 'Medium',
        category: 'Dynamic Programming',
        timeLimit: '50 min',
        completed: false,
        language: ['JavaScript', 'Python', 'C++']
      },
      {
        id: '5',
        title: 'Merge k Sorted Lists',
        description: 'You are given an array of k linked-lists, each linked-list is sorted in ascending order.',
        difficulty: 'Hard',
        category: 'Algorithms',
        timeLimit: '60 min',
        completed: false,
        language: ['JavaScript', 'Python', 'Java']
      }
    ]

    setChallenges(mockChallenges)
    setLoading(false)
  }, [session, router])

  const filteredChallenges = selectedCategory === 'All' 
    ? challenges 
    : challenges.filter(challenge => challenge.category === selectedCategory)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100'
      case 'Medium': return 'text-yellow-600 bg-yellow-100'
      case 'Hard': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

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
                {sidebarItems.map((item) => (
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
                    <CpuChipIcon className="h-6 w-6 text-[#23544e]" />
                    <h1 className="text-xl font-bold text-gray-900">Coding Practice</h1>
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

          {/* Coding content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-6xl mx-auto">
              {/* Header stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <CodeBracketIcon className="h-12 w-12 text-[#23544e]" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">Total Challenges</p>
                      <p className="text-2xl font-bold text-gray-900">{challenges.length}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <FireIcon className="h-12 w-12 text-green-500" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">Completed</p>
                      <p className="text-2xl font-bold text-gray-900">{challenges.filter(c => c.completed).length}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <ClockIcon className="h-12 w-12 text-blue-500" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">In Progress</p>
                      <p className="text-2xl font-bold text-gray-900">{challenges.filter(c => !c.completed).length}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <StarIcon className="h-12 w-12 text-yellow-500" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">Streak</p>
                      <p className="text-2xl font-bold text-gray-900">7 days</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Category filter */}
              <div className="bg-white rounded-lg shadow p-6 mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Filter by Category</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedCategory === category
                          ? 'bg-[#23544e] text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Challenges grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredChallenges.map((challenge) => (
                  <div key={challenge.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-gray-900 mb-2">
                            {challenge.title}
                          </h3>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                            {challenge.difficulty}
                          </span>
                        </div>
                        {challenge.completed && (
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                              ✓
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {challenge.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span className="flex items-center">
                          <ClockIcon className="h-4 w-4 mr-1" />
                          {challenge.timeLimit}
                        </span>
                        <span className="bg-gray-100 px-2 py-1 rounded">
                          {challenge.category}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-1">
                          {challenge.language.map((lang) => (
                            <span key={lang} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                              {lang}
                            </span>
                          ))}
                        </div>
                        <button className="flex items-center space-x-2 bg-[#23544e] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#1d453f] transition-colors">
                          <PlayIcon className="h-4 w-4" />
                          <span>{challenge.completed ? 'Review' : 'Start'}</span>
                        </button>
                      </div>
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