'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  HomeIcon,
  BookOpenIcon,
  UserGroupIcon,
  ArrowTrendingUpIcon,
  ChartBarIcon,
  MapIcon,
  CogIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  DocumentChartBarIcon,
  UserIcon,
  BriefcaseIcon
} from '@heroicons/react/24/outline'

export default function CapabilityAssessment() {

  // Sidebar state
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({
    learningCapability: true, // Expanded by default since we're on capability assessment
    talentGrowth: false,
    talentInsight: false,
    futureStrategic: false,
    executionIntegration: false
  })

  // Assessment state
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedRole, setSelectedRole] = useState('')
  const [coreSkills, setCoreSkills] = useState<{[key: string]: number}>({})
  const [behavioralCompetencies, setBehavioralCompetencies] = useState<{[key: string]: number}>({})
  const [showResults, setShowResults] = useState(false)

  // Sidebar configuration
  const sidebarItems = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, current: false },
    { name: 'My Career Journey', href: '/career', icon: BriefcaseIcon, current: false },
    { name: 'Learning Hub', href: '/learn', icon: BookOpenIcon, current: false },
    { name: 'Content Library', href: '/library', icon: DocumentChartBarIcon, current: false },
    { name: 'AI Assistant', href: '/ai', icon: CogIcon, current: false },
  ]

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
      name: 'Future & Strategic Layer',
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
      name: 'Execution & Integration Layer',
      icon: CogIcon,
      expanded: expandedSections.executionIntegration,
      subItems: [
        { name: 'Integration Placeholders', href: '/talent/integration' },
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

  // Assessment data
  const roles = [
    'Project Manager',
    'Operations Specialist',
    'Learning & Development Officer',
    'Engineer (Process / Mechanical / Electrical)',
    'Sustainability Officer',
    'HR Business Partner'
  ]

  const coreSkillsData = [
    { id: 'projectPlanning', name: 'Project Planning & Execution', description: 'Ability to plan, organize, and execute projects effectively' },
    { id: 'technicalExpertise', name: 'Technical Expertise (role-specific)', description: 'Deep knowledge and skills specific to your role' },
    { id: 'dataAnalysis', name: 'Data Analysis & Reporting', description: 'Capability to analyze data and create meaningful reports' },
    { id: 'processImprovement', name: 'Process Improvement & Innovation', description: 'Skills in identifying and implementing process improvements' },
    { id: 'digitalTools', name: 'Digital Tools & Systems Proficiency', description: 'Competency with digital tools and technology systems' }
  ]

  const behavioralCompetenciesData = [
    { id: 'collaboration', name: 'Collaboration & Teamwork', description: 'Ability to work effectively in teams and collaborate with others' },
    { id: 'problemSolving', name: 'Problem Solving & Critical Thinking', description: 'Skills in analyzing problems and developing solutions' },
    { id: 'communication', name: 'Communication Skills', description: 'Effective verbal and written communication abilities' },
    { id: 'adaptability', name: 'Adaptability & Change Management', description: 'Flexibility and ability to manage change effectively' },
    { id: 'leadership', name: 'Leadership & Initiative', description: 'Leadership qualities and ability to take initiative' }
  ]

  const ratingScale = [
    { value: 1, label: 'Beginner', description: 'No experience or understanding', color: 'bg-red-500' },
    { value: 2, label: 'Basic', description: 'Basic knowledge, needs support', color: 'bg-orange-500' },
    { value: 3, label: 'Competent', description: 'Competent, works independently', color: 'bg-yellow-500' },
    { value: 4, label: 'Advanced', description: 'Advanced, mentors others', color: 'bg-blue-500' },
    { value: 5, label: 'Expert', description: 'Expert, strategic leader', color: 'bg-green-500' }
  ]

  // Handle rating changes
  const handleCoreSkillRating = (skillId: string, rating: number) => {
    setCoreSkills(prev => ({ ...prev, [skillId]: rating }))
  }

  const handleBehavioralRating = (skillId: string, rating: number) => {
    setBehavioralCompetencies(prev => ({ ...prev, [skillId]: rating }))
  }

  // Navigation functions
  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    } else {
      setShowResults(true)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Calculate results
  const calculateResults = () => {
    const coreSkillsAvg = Object.values(coreSkills).reduce((a, b) => a + b, 0) / Object.values(coreSkills).length || 0
    const behavioralAvg = Object.values(behavioralCompetencies).reduce((a, b) => a + b, 0) / Object.values(behavioralCompetencies).length || 0
    const overallAvg = (coreSkillsAvg + behavioralAvg) / 2

    return {
      coreSkillsAvg: Math.round(coreSkillsAvg * 10) / 10,
      behavioralAvg: Math.round(behavioralAvg * 10) / 10,
      overallAvg: Math.round(overallAvg * 10) / 10
    }
  }

  const canProceed = () => {
    if (currentStep === 1) return selectedRole !== ''
    if (currentStep === 2) return Object.keys(coreSkills).length === coreSkillsData.length
    if (currentStep === 3) return Object.keys(behavioralCompetencies).length === behavioralCompetenciesData.length
    return false
  }

  const resetAssessment = () => {
    setCurrentStep(1)
    setSelectedRole('')
    setCoreSkills({})
    setBehavioralCompetencies({})
    setShowResults(false)
  }

  if (showResults) {
    const results = calculateResults()
    
    return (
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg">
          <div className="flex h-full flex-col">
            {/* Logo */}
            <div className="flex h-16 items-center justify-center border-b border-gray-200">
              <Image className="h-8 w-auto" src="/logo.png" alt="Sabil" width={32} height={32} />
            </div>

            {/* Navigation */}
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {/* Home */}
              <Link href="/dashboard" className="group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors text-gray-600 hover:text-[#23544e] hover:bg-gray-50">
                <HomeIcon className="mr-3 flex-shrink-0 h-5 w-5 text-[#23544e]" />
                Home
              </Link>

              {/* Talent Management Strategy Header */}
              <div className="pt-4 pb-2">
                <div className="flex items-center px-3">
                  <UserGroupIcon className="mr-2 h-5 w-5 text-[#23544e]" />
                  <h3 className="text-sm font-semibold text-[#23544e] uppercase tracking-wider">Talent Management Strategy</h3>
                </div>
              </div>

              {/* Strategy Overview Link */}
              <Link href="/dashboard/talent-strategy" className="group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors text-gray-600 hover:text-[#23544e] hover:bg-gray-50">
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
                      <ChevronUpIcon className="ml-2 h-4 w-4" />
                    ) : (
                      <ChevronDownIcon className="ml-2 h-4 w-4" />
                    )}
                  </button>
                  {section.expanded && (
                    <div className="ml-6 space-y-1">
                      {section.subItems.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className={`group flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                            subItem.name === 'Capability Assessment Tool'
                              ? 'text-[#23544e] bg-gray-50 font-medium'
                              : 'text-gray-600 hover:text-[#23544e] hover:bg-gray-50'
                          }`}
                        >
                          <div className={`mr-3 flex-shrink-0 w-2 h-2 rounded-full ${
                            subItem.name === 'Capability Assessment Tool'
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

              {/* Rest of sidebar items */}
              {sidebarItems.slice(1).map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors text-gray-600 hover:text-[#23544e] hover:bg-gray-50"
                >
                  <item.icon className="mr-3 flex-shrink-0 h-5 w-5 text-[#23544e]" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Main content */}
        <div className="ml-64 flex-1 overflow-auto">
          <div className="p-8">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Assessment Results</h1>
                  <p className="mt-2 text-gray-600">Your capability assessment report</p>
                </div>
                <button
                  onClick={resetAssessment}
                  className="bg-[#23544e] text-white px-6 py-3 rounded-lg hover:bg-[#1a3f3a] transition-colors"
                >
                  Take New Assessment
                </button>
              </div>
            </div>

            {/* Results Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <BriefcaseIcon className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Core Skills Average</p>
                    <p className="text-2xl font-bold text-gray-900">{results.coreSkillsAvg}/5.0</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <UserIcon className="w-5 h-5 text-green-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Behavioral Average</p>
                    <p className="text-2xl font-bold text-gray-900">{results.behavioralAvg}/5.0</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <ChartBarIcon className="w-5 h-5 text-purple-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Overall Score</p>
                    <p className="text-2xl font-bold text-gray-900">{results.overallAvg}/5.0</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Role Information */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Assessment Details</h3>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[#23544e] rounded-lg flex items-center justify-center">
                  <UserIcon className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Selected Role</p>
                  <p className="text-lg font-medium text-gray-900">{selectedRole}</p>
                </div>
              </div>
            </div>

            {/* Core Skills Chart */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Core Skills Assessment</h3>
              <div className="space-y-4">
                {coreSkillsData.map((skill) => {
                  const rating = coreSkills[skill.id] || 0
                  const percentage = (rating / 5) * 100
                  return (
                    <div key={skill.id}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                        <span className="text-sm text-gray-600">{rating}/5</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-[#23544e] h-2 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Behavioral Competencies Chart */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Behavioral Competencies Assessment</h3>
              <div className="space-y-4">
                {behavioralCompetenciesData.map((competency) => {
                  const rating = behavioralCompetencies[competency.id] || 0
                  const percentage = (rating / 5) * 100
                  return (
                    <div key={competency.id}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">{competency.name}</span>
                        <span className="text-sm text-gray-600">{rating}/5</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Development Recommendations</h3>
              <div className="space-y-4">
                {/* Identify areas for improvement */}
                {[...coreSkillsData, ...behavioralCompetenciesData]
                  .filter(item => {
                    const rating = coreSkills[item.id] || behavioralCompetencies[item.id] || 0
                    return rating < 3
                  })
                  .map(item => (
                    <div key={item.id} className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          Consider additional training or mentoring to improve this competency.
                        </p>
                      </div>
                    </div>
                  ))
                }
                
                {/* If all scores are good */}
                {[...coreSkillsData, ...behavioralCompetenciesData].every(item => {
                  const rating = coreSkills[item.id] || behavioralCompetencies[item.id] || 0
                  return rating >= 3
                }) && (
                  <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                    <CheckCircleIcon className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Excellent Performance</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Your scores indicate strong competency across all areas. Consider advanced training or leadership development opportunities.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-center border-b border-gray-200">
            <Image className="h-8 w-auto" src="/logo.png" alt="Sabil" width={32} height={32} />
          </div>

          {/* Navigation */}
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {/* Home */}
            <Link href="/dashboard" className="group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors text-gray-600 hover:text-[#23544e] hover:bg-gray-50">
              <HomeIcon className="mr-3 flex-shrink-0 h-5 w-5 text-[#23544e]" />
              Home
            </Link>

            {/* Talent Management Strategy Header */}
            <div className="pt-4 pb-2">
              <div className="flex items-center px-3">
                <UserGroupIcon className="mr-2 h-5 w-5 text-[#23544e]" />
                <h3 className="text-sm font-semibold text-[#23544e] uppercase tracking-wider">Talent Management Strategy</h3>
              </div>
            </div>

            {/* Strategy Overview Link */}
            <Link href="/dashboard/talent-strategy" className="group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors text-gray-600 hover:text-[#23544e] hover:bg-gray-50">
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
                    <ChevronUpIcon className="ml-2 h-4 w-4" />
                  ) : (
                    <ChevronDownIcon className="ml-2 h-4 w-4" />
                  )}
                </button>
                {section.expanded && (
                  <div className="ml-6 space-y-1">
                    {section.subItems.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className={`group flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                          subItem.name === 'Capability Assessment Tool'
                            ? 'text-[#23544e] bg-gray-50 font-medium'
                            : 'text-gray-600 hover:text-[#23544e] hover:bg-gray-50'
                        }`}
                      >
                        <div className={`mr-3 flex-shrink-0 w-2 h-2 rounded-full ${
                          subItem.name === 'Capability Assessment Tool'
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

            {/* Rest of sidebar items */}
            {sidebarItems.slice(1).map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors text-gray-600 hover:text-[#23544e] hover:bg-gray-50"
              >
                <item.icon className="mr-3 flex-shrink-0 h-5 w-5 text-[#23544e]" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="ml-64 flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Capability Assessment Tool</h1>
            <p className="mt-2 text-gray-600">Assess your skills and competencies across core technical and behavioral areas</p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step
                      ? 'bg-[#23544e] border-[#23544e] text-white'
                      : 'bg-white border-gray-300 text-gray-500'
                  }`}>
                    {currentStep > step ? (
                      <CheckCircleIcon className="w-6 h-6" />
                    ) : (
                      <span className="text-sm font-medium">{step}</span>
                    )}
                  </div>
                  <div className="ml-4">
                    <p className={`text-sm font-medium ${
                      currentStep >= step ? 'text-[#23544e]' : 'text-gray-500'
                    }`}>
                      {step === 1 && 'Role Selection'}
                      {step === 2 && 'Core Skills'}
                      {step === 3 && 'Behavioral Competencies'}
                    </p>
                  </div>
                  {step < 3 && (
                    <div className={`w-16 h-0.5 ml-4 ${
                      currentStep > step ? 'bg-[#23544e]' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Assessment Form */}
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            {/* Step 1: Role Selection */}
            {currentStep === 1 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Your Role</h2>
                <p className="text-gray-600 mb-8">Choose the role that best describes your current position:</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {roles.map((role) => (
                    <div
                      key={role}
                      onClick={() => setSelectedRole(role)}
                      className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedRole === role
                          ? 'border-[#23544e] bg-[#23544e]/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-4 h-4 rounded-full border-2 mr-4 ${
                          selectedRole === role
                            ? 'border-[#23544e] bg-[#23544e]'
                            : 'border-gray-300'
                        }`}>
                          {selectedRole === role && (
                            <div className="w-full h-full rounded-full bg-white scale-[0.4]"></div>
                          )}
                        </div>
                        <span className="font-medium text-gray-900">{role}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Core Skills */}
            {currentStep === 2 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Core Skills Assessment</h2>
                <p className="text-gray-600 mb-8">Rate your proficiency in each core skill area (1-5 scale):</p>
                
                {/* Rating Scale Legend */}
                <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-3">Rating Scale:</h3>
                  <div className="flex flex-wrap gap-4">
                    {ratingScale.map((scale) => (
                      <div key={scale.value} className="flex items-center">
                        <div className={`w-4 h-4 rounded-full ${scale.color} mr-2`}></div>
                        <span className="text-sm">
                          <strong>{scale.value}</strong> - {scale.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  {coreSkillsData.map((skill) => (
                    <div key={skill.id} className="border border-gray-200 rounded-lg p-6">
                      <h3 className="font-medium text-gray-900 mb-2">{skill.name}</h3>
                      <p className="text-gray-600 mb-4">{skill.description}</p>
                      
                      <div className="flex space-x-4">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <button
                            key={rating}
                            onClick={() => handleCoreSkillRating(skill.id, rating)}
                            className={`w-12 h-12 rounded-full border-2 font-medium transition-all ${
                              coreSkills[skill.id] === rating
                                ? 'border-[#23544e] bg-[#23544e] text-white'
                                : 'border-gray-300 text-gray-600 hover:border-[#23544e]'
                            }`}
                          >
                            {rating}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Behavioral Competencies */}
            {currentStep === 3 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Behavioral Competencies Assessment</h2>
                <p className="text-gray-600 mb-8">Rate your behavioral competencies (1-5 scale):</p>
                
                {/* Rating Scale Legend */}
                <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-3">Rating Scale:</h3>
                  <div className="flex flex-wrap gap-4">
                    {ratingScale.map((scale) => (
                      <div key={scale.value} className="flex items-center">
                        <div className={`w-4 h-4 rounded-full ${scale.color} mr-2`}></div>
                        <span className="text-sm">
                          <strong>{scale.value}</strong> - {scale.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  {behavioralCompetenciesData.map((competency) => (
                    <div key={competency.id} className="border border-gray-200 rounded-lg p-6">
                      <h3 className="font-medium text-gray-900 mb-2">{competency.name}</h3>
                      <p className="text-gray-600 mb-4">{competency.description}</p>
                      
                      <div className="flex space-x-4">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <button
                            key={rating}
                            onClick={() => handleBehavioralRating(competency.id, rating)}
                            className={`w-12 h-12 rounded-full border-2 font-medium transition-all ${
                              behavioralCompetencies[competency.id] === rating
                                ? 'border-[#23544e] bg-[#23544e] text-white'
                                : 'border-gray-300 text-gray-600 hover:border-[#23544e]'
                            }`}
                          >
                            {rating}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                  currentStep === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                Previous
              </button>

              <div className="text-sm text-gray-500">
                Step {currentStep} of 3
              </div>

              <button
                onClick={nextStep}
                disabled={!canProceed()}
                className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                  canProceed()
                    ? 'bg-[#23544e] text-white hover:bg-[#1a3f3a]'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                {currentStep === 3 ? 'Complete Assessment' : 'Next'}
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}