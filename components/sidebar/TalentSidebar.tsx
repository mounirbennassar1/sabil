'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ArrowTrendingUpIcon,
  ChartBarIcon,
  MapIcon,
  CogIcon,
  BookOpenIcon,
  HomeIcon,
  BriefcaseIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline'

interface SidebarProps {
  className?: string
}

interface SidebarItem {
  name: string
  href: string
  icon: React.ComponentType<React.ComponentProps<'svg'>>
  current?: boolean
}

interface TalentSection {
  id: string
  name: string
  icon: React.ComponentType<React.ComponentProps<'svg'>>
  items: Array<{ name: string; href: string }>
}

export default function TalentSidebar({ className = '' }: SidebarProps) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const [expandedSections, setExpandedSections] = useState({
    learningCapability: false,
    talentGrowth: false,
    talentInsight: false,
    futureStrategic: false,
    integrationPlaceholders: false
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  // Main navigation items
  const sidebarItems: SidebarItem[] = [
    { name: 'Home', href: '/dashboard', icon: HomeIcon },
    { name: 'My Career Journey', href: '/career', icon: BriefcaseIcon },
    { name: 'Learning Hub', href: '/learn', icon: BookOpenIcon },
    { name: 'Content Library', href: '/content', icon: BookOpenIcon },
    { name: 'AI Assistant', href: '/ai', icon: ArrowTrendingUpIcon },
  ]

  // Talent management sections
  const talentManagementSections: TalentSection[] = [
    {
      id: 'learningCapability',
      name: 'Learning & Capability',
      icon: BookOpenIcon,
      items: [
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
      id: 'integrationPlaceholders',
      name: 'Integration Placeholders',
      icon: CogIcon,
      items: [
        { name: 'Change Management Plan', href: '/talent/change-management' },
        { name: 'ROI Tracking', href: '/talent/roi-tracking' }
      ]
    }
  ]

  const isCurrentPath = (href: string) => {
    return pathname === href
  }

  const isCurrentSection = (items: Array<{ name: string; href: string }>) => {
    return items.some(item => pathname === item.href)
  }

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="flex items-center flex-shrink-0 px-4 py-4">
        <h1 className="text-xl font-bold text-white">Talent Hub</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 space-y-1 overflow-y-auto pb-4">
        {/* Main Navigation Items */}
        <div className="space-y-1">
          {sidebarItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                isCurrentPath(item.href)
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <item.icon className="text-gray-400 mr-3 flex-shrink-0 h-6 w-6" />
              {item.name}
            </Link>
          ))}
        </div>

        {/* Talent Management Strategy Section */}
        <div className="pt-6">
          <h3 className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Talent Management Strategy
          </h3>
          
          {/* Strategy Overview Link */}
          <Link
            href="/dashboard/talent-strategy"
            className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors mb-2 ${
              isCurrentPath('/dashboard/talent-strategy')
                ? 'bg-gray-800 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            <MapIcon className="text-gray-400 mr-3 flex-shrink-0 h-6 w-6" />
            Strategy Overview
          </Link>

          {/* Expandable Sections */}
          <div className="space-y-1">
            {talentManagementSections.map((section) => {
              const isExpanded = expandedSections[section.id as keyof typeof expandedSections]
              const isSectionCurrent = isCurrentSection(section.items)
              
              return (
                <div key={section.id}>
                  <button
                    onClick={() => toggleSection(section.id as keyof typeof expandedSections)}
                    className={`w-full group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                      isSectionCurrent && !isExpanded
                        ? 'bg-gray-800 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <section.icon className="text-gray-400 mr-3 flex-shrink-0 h-6 w-6" />
                    <span className="flex-1 text-left">{section.name}</span>
                    {isExpanded ? (
                      <ChevronUpIcon className="ml-2 h-4 w-4 text-gray-400" />
                    ) : (
                      <ChevronDownIcon className="ml-2 h-4 w-4 text-gray-400" />
                    )}
                  </button>
                  
                  {isExpanded && (
                    <div className="ml-6 mt-1 space-y-1">
                      {section.items.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                            isCurrentPath(item.href)
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
              )
            })}
          </div>
        </div>
      </nav>
    </>
  )

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          type="button"
          className="bg-[#23544e] p-2 rounded-md text-white hover:bg-[#1a3d37] transition-colors"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Bars3Icon className="h-6 w-6" />
        </button>
      </div>

      {/* Desktop sidebar */}
      <div className={`hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-40 ${className}`}>
        <div className="flex-1 flex flex-col min-h-0 bg-[#23544e] shadow-lg">
          <SidebarContent />
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-gray-600 bg-opacity-75"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Sidebar */}
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-[#23544e] shadow-xl">
            {/* Close button */}
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                type="button"
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                <XMarkIcon className="h-6 w-6 text-white" />
              </button>
            </div>
            
            {/* Sidebar content */}
            <div className="flex-1 flex flex-col overflow-y-auto">
              <SidebarContent />
            </div>
          </div>
        </div>
      )}
    </>
  )
}