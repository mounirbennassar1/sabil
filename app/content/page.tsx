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
  PlusIcon,
  DocumentTextIcon,
  VideoCameraIcon,
  PhotoIcon,
  MicrophoneIcon,
  PresentationChartBarIcon,
  ClipboardDocumentListIcon,
  CogIcon,
  EyeIcon,
  PencilIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  UserGroupIcon,
  ArrowTrendingUpIcon,
  ChartBarIcon,
  MapIcon
} from '@heroicons/react/24/outline'

export default function ContentPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('create')
  
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
    { name: 'Content', href: '/content', icon: StarIcon, current: true },
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

  const contentTypes = [
    {
      title: 'Create Video Course',
      description: 'Record and edit professional video lessons',
      icon: VideoCameraIcon,
      color: 'bg-red-500',
      features: ['HD Recording', 'Auto Captions', 'Screen Share', 'Multi-camera']
    },
    {
      title: 'Interactive Presentation',
      description: 'Build engaging slide-based content',
      icon: PresentationChartBarIcon,
      color: 'bg-blue-500',
      features: ['Templates', 'Animations', 'Quizzes', 'Branching']
    },
    {
      title: 'Document & Text',
      description: 'Create written materials and guides',
      icon: DocumentTextIcon,
      color: 'bg-green-500',
      features: ['Rich Editor', 'Formatting', 'Images', 'Downloads']
    },
    {
      title: 'Audio Content',
      description: 'Record podcasts and voice lessons',
      icon: MicrophoneIcon,
      color: 'bg-purple-500',
      features: ['Studio Quality', 'Noise Reduction', 'Chapters', 'Transcription']
    },
    {
      title: 'Image Gallery',
      description: 'Curate visual learning materials',
      icon: PhotoIcon,
      color: 'bg-orange-500',
      features: ['High Resolution', 'Annotations', 'Zoom', 'Slideshow']
    },
    {
      title: 'Assessment Quiz',
      description: 'Build tests and knowledge checks',
      icon: ClipboardDocumentListIcon,
      color: 'bg-teal-500',
      features: ['Multiple Choice', 'True/False', 'Essay', 'Auto Grade']
    }
  ]

  const recentContent = [
    {
      id: 1,
      title: 'Introduction to React Hooks',
      type: 'Video Course',
      status: 'Published',
      views: 1247,
      lastEdited: '2 days ago',
      thumbnail: '/logo.png'
    },
    {
      id: 2,
      title: 'JavaScript Fundamentals Quiz',
      type: 'Assessment',
      status: 'Draft',
      views: 0,
      lastEdited: '1 week ago',
      thumbnail: null
    },
    {
      id: 3,
      title: 'CSS Grid Layout Guide',
      type: 'Document',
      status: 'Published',
      views: 856,
      lastEdited: '3 days ago',
      thumbnail: null
    },
    {
      id: 4,
      title: 'Web Development Podcast #5',
      type: 'Audio',
      status: 'Published',
      views: 432,
      lastEdited: '1 week ago',
      thumbnail: null
    }
  ]

  const contentTemplates = [
    {
      title: 'Course Introduction',
      description: 'Welcome video template with course overview',
      category: 'Video',
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    },
    {
      title: 'Knowledge Check',
      description: 'Mid-lesson quiz template',
      category: 'Quiz',
      thumbnail: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    },
    {
      title: 'Step-by-Step Tutorial',
      description: 'Structured lesson plan template',
      category: 'Document',
      thumbnail: 'https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    },
    {
      title: 'Code Walkthrough',
      description: 'Programming demonstration template',
      category: 'Video',
      thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    }
  ]

  const tabs = [
    { id: 'create', label: 'Create Content', icon: PlusIcon },
    { id: 'manage', label: 'Manage Content', icon: CogIcon },
    { id: 'templates', label: 'Templates', icon: DocumentTextIcon },
    { id: 'analytics', label: 'Analytics', icon: PresentationChartBarIcon }
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published':
        return 'bg-green-100 text-green-800'
      case 'Draft':
        return 'bg-yellow-100 text-yellow-800'
      case 'Review':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
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
                    <StarIcon className="h-6 w-6 text-[#23544e]" />
                    <h1 className="text-xl font-bold text-gray-900">Content</h1>
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
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Content Creation Hub</h2>
                <p className="text-lg text-gray-600">Create, manage, and publish educational content</p>
              </div>

              {/* Tabs */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
                <div className="border-b border-gray-200">
                  <nav className="flex space-x-8 px-6" aria-label="Tabs">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap flex items-center space-x-2 ${
                          activeTab === tab.id
                            ? 'border-[#23544e] text-[#23544e]'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <tab.icon className="h-5 w-5" />
                        <span>{tab.label}</span>
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  {/* Create Content */}
                  {activeTab === 'create' && (
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-6">Choose Content Type</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {contentTypes.map((type, index) => (
                          <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer">
                            <div className="flex items-center mb-4">
                              <div className={`${type.color} p-3 rounded-lg`}>
                                <type.icon className="h-6 w-6 text-white" />
                              </div>
                              <div className="ml-4">
                                <h4 className="font-semibold text-gray-900">{type.title}</h4>
                                <p className="text-sm text-gray-600">{type.description}</p>
                              </div>
                            </div>
                            <div className="space-y-2">
                              {type.features.map((feature, idx) => (
                                <div key={idx} className="flex items-center text-sm text-gray-600">
                                  <div className="w-1.5 h-1.5 bg-[#23544e] rounded-full mr-2"></div>
                                  {feature}
                                </div>
                              ))}
                            </div>
                            <button className="w-full mt-4 bg-[#23544e] text-white py-2 rounded-lg hover:bg-[#1d453f] transition-colors">
                              Get Started
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Manage Content */}
                  {activeTab === 'manage' && (
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-900">Your Content</h3>
                        <button className="bg-[#23544e] text-white px-4 py-2 rounded-lg hover:bg-[#1d453f] transition-colors flex items-center space-x-2">
                          <PlusIcon className="h-4 w-4" />
                          <span>New Content</span>
                        </button>
                      </div>
                      <div className="space-y-4">
                        {recentContent.map((content) => (
                          <div key={content.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-center space-x-4">
                              <div className="w-16 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                                {content.thumbnail ? (
                                  <Image
                                    src={content.thumbnail}
                                    alt={content.title}
                                    width={64}
                                    height={48}
                                    className="rounded-lg object-cover"
                                  />
                                ) : (
                                  <DocumentTextIcon className="h-6 w-6 text-gray-400" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-gray-900">{content.title}</h4>
                                <div className="flex items-center space-x-4 mt-1">
                                  <span className="text-sm text-gray-600">{content.type}</span>
                                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(content.status)}`}>
                                    {content.status}
                                  </span>
                                  <span className="text-sm text-gray-500">
                                    <EyeIcon className="h-4 w-4 inline mr-1" />
                                    {content.views} views
                                  </span>
                                  <span className="text-sm text-gray-500">Updated {content.lastEdited}</span>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                                  <PencilIcon className="h-4 w-4" />
                                </button>
                                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                                  <EyeIcon className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Templates */}
                  {activeTab === 'templates' && (
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-6">Content Templates</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {contentTemplates.map((template, index) => (
                          <div key={index} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                            <div className="h-40 bg-gray-200">
                              <Image
                                src={template.thumbnail}
                                alt={template.title}
                                width={300}
                                height={160}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="p-4">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold text-gray-900">{template.title}</h4>
                                <span className="px-2 py-1 bg-[#23544e]/10 text-[#23544e] text-xs font-medium rounded">
                                  {template.category}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                              <button className="w-full bg-[#23544e] text-white py-2 rounded-lg hover:bg-[#1d453f] transition-colors">
                                Use Template
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Analytics */}
                  {activeTab === 'analytics' && (
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-6">Content Analytics</h3>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                          <div className="text-2xl font-bold text-gray-900">24</div>
                          <div className="text-sm text-gray-600">Total Content</div>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                          <div className="text-2xl font-bold text-[#23544e]">18</div>
                          <div className="text-sm text-gray-600">Published</div>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                          <div className="text-2xl font-bold text-[#0b867a]">12,547</div>
                          <div className="text-sm text-gray-600">Total Views</div>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                          <div className="text-2xl font-bold text-green-600">4.8</div>
                          <div className="text-sm text-gray-600">Avg Rating</div>
                        </div>
                      </div>
                      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h4 className="font-semibold text-gray-900 mb-4">Performance Overview</h4>
                        <div className="text-center py-12 text-gray-500">
                          <PresentationChartBarIcon className="h-12 w-12 mx-auto mb-4" />
                          <p>Detailed analytics coming soon...</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 