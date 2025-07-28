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
  ChevronRightIcon,
  SparklesIcon,
  CpuChipIcon,
  TrophyIcon,
  ChartBarIcon,
  UserGroupIcon,
  ClockIcon,
  CheckCircleIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline'

export default function CareerJourneyPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  const sidebarItems = [
    { name: 'Home', href: '/dashboard', icon: HomeIcon, current: false },
    { name: 'My Career Journey', href: '/career', icon: BriefcaseIcon, current: true, isSection: true },
    { name: 'Learn', href: '/learn', icon: BookOpenIcon, current: false, isSection: true },
    { name: 'My Library', href: '/library', icon: HeartIcon, current: false },
    { name: 'Content', href: '/content', icon: StarIcon, current: false },
    { name: 'Apply AI', href: '/ai', icon: SparklesIcon, current: false, isSection: true },
    { name: 'Coding Practice', href: '/coding', icon: CpuChipIcon, current: false },
    { name: 'Certifications', href: '/certificates', icon: AcademicCapIcon, current: false },
  ]

  const careerGoals = [
    {
      title: 'Complete Full-Stack Development',
      progress: 75,
      deadline: '2024-12-31',
      status: 'In Progress',
      description: 'Master React, Node.js, and database technologies'
    },
    {
      title: 'Earn Project Management Certification',
      progress: 45,
      deadline: '2024-10-15',
      status: 'In Progress',
      description: 'PMP certification for leadership advancement'
    },
    {
      title: 'Build Professional Portfolio',
      progress: 90,
      deadline: '2024-08-30',
      status: 'Nearly Complete',
      description: 'Showcase 5 major projects with case studies'
    }
  ]

  const skillAssessments = [
    { skill: 'JavaScript', level: 'Advanced', progress: 85, color: 'bg-green-500' },
    { skill: 'React', level: 'Intermediate', progress: 70, color: 'bg-blue-500' },
    { skill: 'Node.js', level: 'Intermediate', progress: 65, color: 'bg-blue-500' },
    { skill: 'Python', level: 'Beginner', progress: 40, color: 'bg-yellow-500' },
    { skill: 'UI/UX Design', level: 'Intermediate', progress: 60, color: 'bg-blue-500' },
    { skill: 'Project Management', level: 'Advanced', progress: 80, color: 'bg-green-500' }
  ]

  const careerMilestones = [
    {
      title: 'Junior Developer at Neon Green Hydrogen',
      date: '2024-01-15',
      description: 'Started my career in sustainable technology',
      completed: true
    },
    {
      title: 'Completed React Bootcamp',
      date: '2024-03-20',
      description: 'Mastered modern React development practices',
      completed: true
    },
    {
      title: 'Led First Team Project',
      date: '2024-06-10',
      description: 'Successfully delivered customer portal redesign',
      completed: true
    },
    {
      title: 'Senior Developer Promotion',
      date: '2024-12-01',
      description: 'Target promotion with expanded responsibilities',
      completed: false
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
                    <BriefcaseIcon className="h-6 w-6 text-[#23544e]" />
                    <h1 className="text-xl font-bold text-gray-900">My Career Journey</h1>
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
          <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
              {/* Welcome Section */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Your Career Journey</h2>
                <p className="text-lg text-gray-600">Track your progress, set goals, and advance your professional development</p>
              </div>

              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-[#23544e]/10 rounded-full">
                      <TrophyIcon className="h-6 w-6 text-[#23544e]" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Completed Goals</p>
                      <p className="text-2xl font-bold text-gray-900">3</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-[#0b867a]/10 rounded-full">
                      <ChartBarIcon className="h-6 w-6 text-[#0b867a]" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Skill Level</p>
                      <p className="text-2xl font-bold text-gray-900">Advanced</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-blue-100 rounded-full">
                      <UserGroupIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Network</p>
                      <p className="text-2xl font-bold text-gray-900">127</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-green-100 rounded-full">
                      <ArrowTrendingUpIcon className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Growth Rate</p>
                      <p className="text-2xl font-bold text-gray-900">+24%</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Career Goals */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Career Goals</h3>
                  <div className="space-y-6">
                    {careerGoals.map((goal, index) => (
                      <div key={index} className="border-l-4 border-[#23544e] pl-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">{goal.title}</h4>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            goal.status === 'Nearly Complete' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {goal.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{goal.description}</p>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-500">Progress</span>
                          <span className="text-sm font-medium text-gray-900">{goal.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-[#23544e] h-2 rounded-full transition-all duration-300"
                            style={{ width: `${goal.progress}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          <ClockIcon className="h-3 w-3 inline mr-1" />
                          Due: {new Date(goal.deadline).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skill Assessment */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Skill Assessment</h3>
                  <div className="space-y-4">
                    {skillAssessments.map((skill, index) => (
                      <div key={index}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">{skill.skill}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">{skill.level}</span>
                            <span className="text-sm font-medium text-gray-900">{skill.progress}%</span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`${skill.color} h-2 rounded-full transition-all duration-300`}
                            style={{ width: `${skill.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Career Timeline */}
              <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Career Milestones</h3>
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300"></div>
                  <div className="space-y-6">
                    {careerMilestones.map((milestone, index) => (
                      <div key={index} className="relative flex items-start">
                        <div className={`absolute left-2 w-4 h-4 rounded-full border-2 ${
                          milestone.completed 
                            ? 'bg-[#23544e] border-[#23544e]' 
                            : 'bg-white border-gray-300'
                        }`}>
                          {milestone.completed && (
                            <CheckCircleIcon className="h-3 w-3 text-white absolute top-0.5 left-0.5" />
                          )}
                        </div>
                        <div className="ml-8">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className={`font-semibold ${
                              milestone.completed ? 'text-gray-900' : 'text-gray-600'
                            }`}>
                              {milestone.title}
                            </h4>
                            <span className="text-sm text-gray-500">
                              {new Date(milestone.date).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">{milestone.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 