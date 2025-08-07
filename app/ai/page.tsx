"use client"

import { useState, useRef, useEffect } from 'react'
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
  PaperAirplaneIcon,
  SparklesIcon,
  UserIcon,
  CpuChipIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  UserGroupIcon,
  ArrowTrendingUpIcon,
  ChartBarIcon,
  MapIcon,
  CogIcon
} from '@heroicons/react/24/outline'

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function AIChatPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your AI learning assistant. I can help you with career guidance, learning recommendations, skill development, and answer questions about courses. How can I assist you today?',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
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
        { name: 'Change Management Plan', href: '/talent/change-management' },
        { name: 'ROI Tracking', href: '/talent/roi-tracking' }
      ]
    }
  ]

  const sidebarItems = [
    { name: 'Home', href: '/dashboard', icon: HomeIcon, current: false },
    { name: 'My Career Journey', href: '/career', icon: BriefcaseIcon, current: false },
    { name: 'Learn', href: '/learn', icon: BookOpenIcon, current: false, isSection: true },
    { name: 'My Library', href: '/library', icon: HeartIcon, current: false },
    { name: 'Content', href: '/content', icon: StarIcon, current: false },
    { name: 'Apply AI', href: '/ai', icon: SparklesIcon, current: true, isSection: true },
    { name: 'Coding Practice', href: '/coding', icon: CpuChipIcon, current: false },
    { name: 'Certifications', href: '/certificates', icon: AcademicCapIcon, current: false },
    { name: 'Help & Support', href: '/help', icon: ChevronRightIcon, current: false },
  ]

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  useEffect(() => {
    if (!session) {
      router.push('/auth/signin')
      return
    }
  }, [session, router])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()
    
    if (lowerMessage.includes('career') || lowerMessage.includes('job')) {
      return "Great question about career development! Based on current industry trends, I'd recommend focusing on these key areas:\n\n• **Technical Skills**: Stay updated with emerging technologies in your field\n• **Soft Skills**: Communication, leadership, and problem-solving are crucial\n• **Continuous Learning**: Set aside time for regular skill updates\n• **Networking**: Build professional relationships in your industry\n\nWhat specific career area would you like to explore further?"
    }
    
    if (lowerMessage.includes('course') || lowerMessage.includes('learn')) {
      return "I'd be happy to help you find the right learning path! Here are some popular course categories on our platform:\n\n🎯 **Programming**: Web Development, Python, JavaScript\n📊 **Data Science**: Analytics, Machine Learning, AI\n🎨 **Design**: UI/UX, Graphic Design, Product Design\n💼 **Business**: Leadership, Project Management, Marketing\n\nWhat subject interests you most? I can provide personalized recommendations based on your goals and current skill level."
    }
    
    if (lowerMessage.includes('skill') || lowerMessage.includes('improve')) {
      return "Excellent mindset! Skill development is key to professional growth. Here's a strategic approach:\n\n**Assessment Phase:**\n• Identify your current skill gaps\n• Research industry requirements\n• Set specific, measurable goals\n\n**Learning Phase:**\n• Choose quality courses and resources\n• Practice with real projects\n• Seek feedback from mentors\n\n**Application Phase:**\n• Build a portfolio\n• Apply skills in work projects\n• Share your progress\n\nWhat specific skills are you looking to develop?"
    }
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return `Hello ${session?.user?.name || 'there'}! 👋 I'm excited to help you on your learning journey. Whether you're looking to advance your career, learn new skills, or get course recommendations, I'm here to assist. What would you like to explore today?`
    }
    
    // Default responses for other queries
    const responses = [
      "That's an interesting question! Let me help you think through this. Could you provide a bit more context about what you're trying to achieve?",
      "I understand what you're asking about. Based on industry best practices, I'd suggest considering multiple approaches. What's your primary goal here?",
      "Great question! This touches on several important concepts. Let me break this down into actionable steps you can take.",
      "I can definitely help with that! To give you the most relevant advice, could you tell me more about your background and what you're hoping to accomplish?"
    ]
    
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateAIResponse(userMessage.content),
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiResponse])
      setIsLoading(false)
    }, 1000 + Math.random() * 2000) // Random delay between 1-3 seconds
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!session) {
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
                
                {/* AI Assistant Badge */}
                <div className="mt-8 px-3">
                  <div className="bg-gradient-to-r from-[#23544e] to-[#0b867a] rounded-lg p-4 text-white">
                    <div className="flex items-center space-x-2 mb-2">
                      <SparklesIcon className="h-5 w-5" />
                      <span className="font-medium text-sm">AI Assistant</span>
                    </div>
                    <p className="text-xs opacity-90">
                      Get personalized learning recommendations and career guidance
                    </p>
                  </div>
                </div>
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
                    <SparklesIcon className="h-6 w-6 text-[#23544e]" />
                    <h1 className="text-xl font-bold text-gray-900">AI Learning Assistant</h1>
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

          {/* Chat area */}
          <div className="flex-1 overflow-hidden bg-gray-50">
            <div className="h-full flex flex-col max-w-4xl mx-auto">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start space-x-4 ${
                      message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}
                  >
                    <div className="flex-shrink-0">
                      {message.role === 'user' ? (
                        <div className="w-8 h-8 bg-[#23544e] rounded-full flex items-center justify-center">
                          <UserIcon className="h-5 w-5 text-white" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 bg-gradient-to-r from-[#23544e] to-[#0b867a] rounded-full flex items-center justify-center">
                          <SparklesIcon className="h-5 w-5 text-white" />
                        </div>
                      )}
                    </div>
                    <div
                      className={`flex-1 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl ${
                        message.role === 'user' ? 'text-right' : 'text-left'
                      }`}
                    >
                      <div
                        className={`inline-block px-4 py-3 rounded-2xl ${
                          message.role === 'user'
                            ? 'bg-[#23544e] text-white rounded-br-md'
                            : 'bg-white text-gray-900 rounded-bl-md shadow-sm border border-gray-200'
                        }`}
                      >
                        <div className="whitespace-pre-wrap text-sm leading-relaxed">
                          {message.content}
                        </div>
                      </div>
                      <div className={`mt-1 text-xs text-gray-500 ${
                        message.role === 'user' ? 'text-right' : 'text-left'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Loading indicator */}
                {isLoading && (
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-gradient-to-r from-[#23544e] to-[#0b867a] rounded-full flex items-center justify-center">
                        <SparklesIcon className="h-5 w-5 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="inline-block px-4 py-3 rounded-2xl rounded-bl-md bg-white shadow-sm border border-gray-200">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input area */}
              <div className="bg-white border-t border-gray-200 px-4 py-4">
                <div className="flex items-end space-x-4">
                  <div className="flex-1">
                    <div className="relative">
                      <textarea
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask me anything about your learning journey, career development, or courses..."
                        rows={2}
                        className="w-full px-4 py-4 pr-12 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#23544e] focus:border-transparent resize-none text-gray-900 placeholder-gray-500"
                        style={{ minHeight: '64px', maxHeight: '140px' }}
                        disabled={isLoading}
                      />
                                             <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                         <button
                           onClick={handleSendMessage}
                           disabled={!inputMessage.trim() || isLoading}
                           className="p-2 bg-[#23544e] text-white rounded-full hover:bg-[#1d453f] focus:outline-none focus:ring-2 focus:ring-[#23544e] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                         >
                           <PaperAirplaneIcon className="h-4 w-4" />
                         </button>
                       </div>
                    </div>
                  </div>
                </div>
                
                {/* Quick suggestions */}
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    onClick={() => setInputMessage('What career skills should I focus on?')}
                    className="px-3 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                    disabled={isLoading}
                  >
                    Career guidance
                  </button>
                  <button
                    onClick={() => setInputMessage('Recommend courses for web development')}
                    className="px-3 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                    disabled={isLoading}
                  >
                    Course recommendations
                  </button>
                  <button
                    onClick={() => setInputMessage('How can I improve my programming skills?')}
                    className="px-3 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                    disabled={isLoading}
                  >
                    Skill development
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 