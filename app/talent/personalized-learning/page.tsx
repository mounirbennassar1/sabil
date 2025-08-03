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

  ClockIcon,
  StarIcon,
  CheckCircleIcon,
  BookmarkIcon,
  PlayIcon,
  UserIcon
} from '@heroicons/react/24/outline'
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts'

export default function PersonalizedLearning() {
  const [expandedSections, setExpandedSections] = useState({
    learningCapability: false,
    talentGrowth: false,
    talentInsight: false,
    futureStrategic: true,
    executionIntegration: false
  })

  const [selectedRole, setSelectedRole] = useState('current')

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

  // Mock user data
  const userProfile = {
    name: 'Sarah Johnson',
    currentRole: 'Senior Project Manager',
    department: 'Engineering',
    experience: '5 years',
    targetRole: 'Engineering Director'
  }

  // Skills radar chart data
  const skillsData = [
    { skill: 'Leadership', current: 75, target: 90, fullMark: 100 },
    { skill: 'Technical', current: 85, target: 95, fullMark: 100 },
    { skill: 'Communication', current: 80, target: 85, fullMark: 100 },
    { skill: 'Strategy', current: 60, target: 90, fullMark: 100 },
    { skill: 'Analytics', current: 70, target: 80, fullMark: 100 },
    { skill: 'Innovation', current: 65, target: 85, fullMark: 100 }
  ]

  // Learning recommendations
  const recommendedCourses = [
    {
      id: 1,
      title: 'Strategic Leadership Fundamentals',
      provider: 'NEOM Academy',
      duration: '6 weeks',
      difficulty: 'Intermediate',
      rating: 4.8,
      students: 1247,
      skills: ['Leadership', 'Strategy'],
      description: 'Master the fundamentals of strategic thinking and leadership execution.',
      image: '/placeholder-course.jpg',
      priority: 'High',
      matchScore: 95,
      completed: false,
      saved: false
    },
    {
      id: 2,
      title: 'Advanced Data Analytics for Managers',
      provider: 'Tech Institute',
      duration: '4 weeks',
      difficulty: 'Advanced',
      rating: 4.6,
      students: 892,
      skills: ['Analytics', 'Technical'],
      description: 'Deep dive into data-driven decision making and analytics tools.',
      image: '/placeholder-course.jpg',
      priority: 'Medium',
      matchScore: 88,
      completed: false,
      saved: true
    },
    {
      id: 3,
      title: 'Innovation Management Workshop',
      provider: 'Future Skills Hub',
      duration: '3 weeks',
      difficulty: 'Intermediate',
      rating: 4.7,
      students: 634,
      skills: ['Innovation', 'Leadership'],
      description: 'Learn to foster innovation culture and manage creative processes.',
      image: '/placeholder-course.jpg',
      priority: 'Medium',
      matchScore: 82,
      completed: false,
      saved: false
    },
    {
      id: 4,
      title: 'Executive Communication Skills',
      provider: 'Leadership Academy',
      duration: '2 weeks',
      difficulty: 'Advanced',
      rating: 4.9,
      students: 456,
      skills: ['Communication', 'Leadership'],
      description: 'Enhance your executive presence and communication effectiveness.',
      image: '/placeholder-course.jpg',
      priority: 'High',
      matchScore: 90,
      completed: true,
      saved: false
    },
    {
      id: 5,
      title: 'Project Portfolio Management',
      provider: 'PMI Institute',
      duration: '8 weeks',
      difficulty: 'Advanced',
      rating: 4.5,
      students: 1089,
      skills: ['Technical', 'Strategy'],
      description: 'Master portfolio management and strategic project alignment.',
      image: '/placeholder-course.jpg',
      priority: 'Low',
      matchScore: 75,
      completed: false,
      saved: false
    },
    {
      id: 6,
      title: 'Design Thinking for Leaders',
      provider: 'Innovation Lab',
      duration: '5 weeks',
      difficulty: 'Intermediate',
      rating: 4.4,
      students: 723,
      skills: ['Innovation', 'Strategy'],
      description: 'Apply design thinking methodologies to solve complex business challenges.',
      image: '/placeholder-course.jpg',
      priority: 'Medium',
      matchScore: 78,
      completed: false,
      saved: false
    }
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-50'
      case 'Medium': return 'text-yellow-600 bg-yellow-50'
      case 'Low': return 'text-green-600 bg-green-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-50'
      case 'Intermediate': return 'text-yellow-600 bg-yellow-50'
      case 'Advanced': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const toggleSaved = (courseId: number) => {
    // Mock function to toggle saved state
    console.log(`Toggling saved state for course ${courseId}`)
  }

  const markCompleted = (courseId: number) => {
    // Mock function to mark as completed
    console.log(`Marking course ${courseId} as completed`)
  }

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
                                item.name === 'Personalized Learning'
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
                <h1 className="text-3xl font-bold text-gray-900">Personalized Learning</h1>
                <p className="mt-2 text-gray-600">AI-powered learning recommendations tailored to your career goals</p>
              </div>

              {/* User Profile */}
              <div className="bg-white rounded-lg shadow p-6 mb-8">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <UserIcon className="h-16 w-16 text-[#23544e] bg-gray-100 rounded-full p-3" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-900">{userProfile.name}</h2>
                    <p className="text-gray-600">{userProfile.currentRole} • {userProfile.department}</p>
                    <p className="text-sm text-gray-500">{userProfile.experience} experience</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Target Role</p>
                    <p className="font-medium text-gray-900">{userProfile.targetRole}</p>
                  </div>
                </div>
              </div>

              {/* Skills Progress */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Skills Radar Chart */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Skills Mastery Progress</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={skillsData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="skill" />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} />
                      <Radar
                        name="Current Level"
                        dataKey="current"
                        stroke="#23544e"
                        fill="#23544e"
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                      <Radar
                        name="Target Level"
                        dataKey="target"
                        stroke="#419681"
                        fill="#419681"
                        fillOpacity={0.1}
                        strokeWidth={2}
                        strokeDasharray="5 5"
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                  <div className="mt-4 flex justify-center space-x-6">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-[#23544e] rounded-full mr-2"></div>
                      <span className="text-sm text-gray-600">Current Level</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 border-2 border-[#419681] rounded-full mr-2"></div>
                      <span className="text-sm text-gray-600">Target Level</span>
                    </div>
                  </div>
                </div>

                {/* Learning Stats */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Learning Overview</h3>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Courses Completed</span>
                      <span className="text-2xl font-bold text-[#23544e]">12</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Learning Hours</span>
                      <span className="text-2xl font-bold text-[#23544e]">84</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Certificates Earned</span>
                      <span className="text-2xl font-bold text-[#23544e]">7</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Skill Growth</span>
                      <span className="text-2xl font-bold text-green-600">+15%</span>
                    </div>
                    <div className="pt-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Learning Goal Progress</span>
                        <span>72%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-[#23544e] h-2 rounded-full" style={{ width: '72%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommended Courses */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium text-gray-900">Recommended Courses</h3>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#23544e]"
                  >
                    <option value="current">Current Role</option>
                    <option value="target">Target Role</option>
                    <option value="all">All Recommendations</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendedCourses.map((course) => (
                    <div key={course.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      {/* Course Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h4 className="text-lg font-medium text-gray-900 mb-2">{course.title}</h4>
                          <p className="text-sm text-gray-600 mb-2">{course.provider}</p>
                        </div>
                        <button
                          onClick={() => toggleSaved(course.id)}
                          className={`ml-2 p-2 rounded-full ${course.saved ? 'text-yellow-500' : 'text-gray-400'} hover:text-yellow-500`}
                        >
                          <BookmarkIcon className="h-5 w-5" />
                        </button>
                      </div>

                      {/* Course Meta */}
                      <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <ClockIcon className="h-4 w-4 mr-1" />
                          {course.duration}
                        </div>
                        <div className="flex items-center">
                          <StarIcon className="h-4 w-4 mr-1 text-yellow-400" />
                          {course.rating}
                        </div>
                        <div className="flex items-center">
                          <UserGroupIcon className="h-4 w-4 mr-1" />
                          {course.students}
                        </div>
                      </div>

                      {/* Priority and Difficulty */}
                      <div className="flex items-center space-x-2 mb-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(course.priority)}`}>
                          {course.priority} Priority
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(course.difficulty)}`}>
                          {course.difficulty}
                        </span>
                      </div>

                      {/* Match Score */}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Match Score</span>
                          <span>{course.matchScore}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-[#23544e] h-2 rounded-full" 
                            style={{ width: `${course.matchScore}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Skills */}
                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-2">Skills you&apos;ll develop:</p>
                        <div className="flex flex-wrap gap-1">
                          {course.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-gray-600 mb-4">{course.description}</p>

                      {/* Actions */}
                      <div className="flex space-x-2">
                        {course.completed ? (
                          <div className="flex-1 flex items-center justify-center px-4 py-2 bg-green-100 text-green-700 rounded-md">
                            <CheckCircleIcon className="h-4 w-4 mr-2" />
                            Completed
                          </div>
                        ) : (
                          <>
                            <button
                              onClick={() => markCompleted(course.id)}
                              className="flex-1 bg-[#23544e] text-white px-4 py-2 rounded-md hover:bg-[#1a3d37] transition-colors flex items-center justify-center"
                            >
                              <PlayIcon className="h-4 w-4 mr-2" />
                              Start Course
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}