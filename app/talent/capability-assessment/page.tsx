'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  CheckCircleIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  UserIcon,
  BriefcaseIcon,
  StarIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  TrophyIcon,
  ChartBarIcon,
  SparklesIcon,
  HomeIcon,
  BookOpenIcon,
  HeartIcon,
  CpuChipIcon,
  UserGroupIcon,
  ArrowTrendingUpIcon,
  MapIcon,
  CogIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@heroicons/react/24/outline'
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

export default function CapabilityAssessment() {
  // Assessment state - now with 5 steps
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedRole, setSelectedRole] = useState('')
  const [coreSkills, setCoreSkills] = useState<{[key: string]: number}>({})
  const [behavioralCompetencies, setBehavioralCompetencies] = useState<{[key: string]: number}>({})
  const [roleSpecificSkills, setRoleSpecificSkills] = useState<{[key: string]: number}>({})
  const [reflectionAnswers, setReflectionAnswers] = useState<{[key: string]: string}>({})
  const [trainingPreferences, setTrainingPreferences] = useState<{[key: string]: boolean | string}>({})
  const [showResults, setShowResults] = useState(false)

  // Sidebar state - same as dashboard
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({
    learningCapability: true, // Expanded by default since we're on capability assessment
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
      name: 'Integration Placeholders',
      icon: CogIcon,
      expanded: expandedSections.executionIntegration,
      subItems: [
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
    { id: 'project_manager', name: 'Project Manager', icon: BriefcaseIcon, color: '#23544e' },
    { id: 'operations_specialist', name: 'Operations Specialist', icon: ChartBarIcon, color: '#23544e' },
    { id: 'learning_dev_officer', name: 'Learning & Development Officer', icon: AcademicCapIcon, color: '#23544e' },
    { id: 'engineer', name: 'Engineer (Process / Mechanical / Electrical)', icon: SparklesIcon, color: '#23544e' },
    { id: 'sustainability_officer', name: 'Sustainability Officer', icon: TrophyIcon, color: '#23544e' },
    { id: 'hr_business_partner', name: 'HR Business Partner', icon: UserIcon, color: '#23544e' }
  ]

  const coreSkillsData = [
    { id: 'projectPlanning', name: 'Project Planning & Execution', description: 'Ability to plan, organize, and execute projects effectively from inception to completion' },
    { id: 'technicalExpertise', name: 'Technical Expertise', description: 'Deep technical knowledge and skills specific to your professional domain' },
    { id: 'dataAnalysis', name: 'Data Analysis & Reporting', description: 'Capability to analyze complex data sets and create meaningful, actionable reports' },
    { id: 'processImprovement', name: 'Process Improvement & Innovation', description: 'Skills in identifying inefficiencies and implementing innovative process improvements' },
    { id: 'digitalTools', name: 'Digital Tools & Systems Proficiency', description: 'Advanced competency with digital tools, software, and technology systems' },
    { id: 'qualityManagement', name: 'Quality Management & Standards', description: 'Understanding and application of quality standards and continuous improvement methodologies' },
    { id: 'riskManagement', name: 'Risk Assessment & Management', description: 'Ability to identify, assess, and mitigate various types of organizational risks' }
  ]

  const behavioralCompetenciesData = [
    { id: 'collaboration', name: 'Collaboration & Teamwork', description: 'Ability to work effectively in diverse teams and build strong collaborative relationships' },
    { id: 'problemSolving', name: 'Problem Solving & Critical Thinking', description: 'Advanced skills in analyzing complex problems and developing innovative solutions' },
    { id: 'communication', name: 'Communication Skills', description: 'Exceptional verbal, written, and presentation communication abilities across all levels' },
    { id: 'adaptability', name: 'Adaptability & Change Management', description: 'Flexibility and resilience in managing organizational change and uncertainty' },
    { id: 'leadership', name: 'Leadership & Initiative', description: 'Leadership qualities, ability to inspire others, and proactive approach to challenges' },
    { id: 'emotionalIntelligence', name: 'Emotional Intelligence', description: 'Self-awareness and ability to understand and manage emotions in professional settings' },
    { id: 'culturalAwareness', name: 'Cultural Awareness & Inclusion', description: 'Understanding of diverse cultures and commitment to inclusive practices' },
    { id: 'timeManagement', name: 'Time Management & Prioritization', description: 'Excellent organizational skills and ability to prioritize tasks effectively' }
  ]

  // Role-specific competencies
  const roleSpecificCompetencies: {[key: string]: Array<{id: string, name: string, description: string}>} = {
    project_manager: [
      { id: 'stakeholderManagement', name: 'Stakeholder Management', description: 'Effectively managing relationships with project stakeholders at all levels' },
      { id: 'budgetControl', name: 'Budget Control & Financial Management', description: 'Managing project budgets and financial resources efficiently' },
      { id: 'scopeManagement', name: 'Scope Management', description: 'Defining, controlling, and managing project scope throughout the lifecycle' },
      { id: 'teamLeadership', name: 'Team Leadership & Motivation', description: 'Leading and motivating cross-functional project teams' }
    ],
    operations_specialist: [
      { id: 'operationalEfficiency', name: 'Operational Efficiency', description: 'Optimizing operational processes and workflows for maximum efficiency' },
      { id: 'supplyChainManagement', name: 'Supply Chain Management', description: 'Understanding and managing supply chain operations and logistics' },
      { id: 'performanceMetrics', name: 'Performance Metrics & KPIs', description: 'Developing and monitoring key performance indicators and metrics' },
      { id: 'complianceManagement', name: 'Compliance & Regulatory Management', description: 'Ensuring operations comply with relevant regulations and standards' }
    ],
    learning_dev_officer: [
      { id: 'curriculumDesign', name: 'Curriculum Design & Development', description: 'Creating effective learning curricula and educational programs' },
      { id: 'learningTechnologies', name: 'Learning Technologies & Platforms', description: 'Proficiency with e-learning platforms and educational technologies' },
      { id: 'trainingDelivery', name: 'Training Delivery & Facilitation', description: 'Excellent presentation and facilitation skills for training delivery' },
      { id: 'learningAssessment', name: 'Learning Assessment & Evaluation', description: 'Designing and implementing effective learning assessment methods' }
    ],
    engineer: [
      { id: 'technicalDesign', name: 'Technical Design & Development', description: 'Advanced technical design and development capabilities in your engineering field' },
      { id: 'safetyStandards', name: 'Safety Standards & Protocols', description: 'Deep understanding of safety standards and engineering protocols' },
      { id: 'systemsThinking', name: 'Systems Thinking & Integration', description: 'Ability to think holistically about complex engineering systems' },
      { id: 'innovationDevelopment', name: 'Innovation & Product Development', description: 'Skills in developing innovative engineering solutions and products' }
    ],
    sustainability_officer: [
      { id: 'environmentalAssessment', name: 'Environmental Impact Assessment', description: 'Conducting comprehensive environmental impact assessments' },
      { id: 'sustainabilityReporting', name: 'Sustainability Reporting & Metrics', description: 'Creating detailed sustainability reports and tracking key metrics' },
      { id: 'greenTechnologies', name: 'Green Technologies & Solutions', description: 'Knowledge of sustainable technologies and green business solutions' },
      { id: 'stakeholderEngagement', name: 'Sustainability Stakeholder Engagement', description: 'Engaging stakeholders in sustainability initiatives and programs' }
    ],
    hr_business_partner: [
      { id: 'talentManagement', name: 'Talent Management & Development', description: 'Strategic talent management and employee development planning' },
      { id: 'organizationalDevelopment', name: 'Organizational Development', description: 'Understanding organizational dynamics and development strategies' },
      { id: 'employeeRelations', name: 'Employee Relations & Engagement', description: 'Managing employee relations and driving engagement initiatives' },
      { id: 'hrAnalytics', name: 'HR Analytics & People Data', description: 'Using data analytics to drive HR decisions and strategies' }
    ]
  }

  // Reflection questions
  const reflectionQuestions = [
    { id: 'strengths', question: 'What do you consider to be your strongest skill or area of expertise? Please explain why.', placeholder: 'Describe your strongest skill and provide examples...' },
    { id: 'development', question: 'Which area would you most like to develop further, and what steps would you take?', placeholder: 'Identify development areas and your action plan...' },
    { id: 'challenges', question: 'What has been your biggest professional challenge in the past year, and how did you address it?', placeholder: 'Describe a significant challenge and your approach...' },
    { id: 'goals', question: 'What are your key professional goals for the next 12-18 months?', placeholder: 'Outline your professional objectives and timeline...' }
  ]

  // Training preferences
  const trainingOptions = [
    { id: 'workshops', name: 'In-person workshops and seminars', icon: UserIcon },
    { id: 'online', name: 'Online courses and e-learning modules', icon: AcademicCapIcon },
    { id: 'mentoring', name: 'One-on-one mentoring and coaching', icon: StarIcon },
    { id: 'shadowing', name: 'Job shadowing and on-the-job training', icon: BriefcaseIcon },
    { id: 'certifications', name: 'Professional certifications and qualifications', icon: TrophyIcon },
    { id: 'conferences', name: 'Industry conferences and networking events', icon: DocumentTextIcon }
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

  const handleRoleSpecificRating = (skillId: string, rating: number) => {
    setRoleSpecificSkills(prev => ({ ...prev, [skillId]: rating }))
  }

  const handleReflectionAnswer = (questionId: string, answer: string) => {
    setReflectionAnswers(prev => ({ ...prev, [questionId]: answer }))
  }

  const handleTrainingPreference = (optionId: string, value: boolean | string) => {
    setTrainingPreferences(prev => ({ ...prev, [optionId]: value }))
  }

  // Navigation functions
  const nextStep = () => {
    if (currentStep < 5) {
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
    const roleSpecificAvg = Object.values(roleSpecificSkills).reduce((a, b) => a + b, 0) / Object.values(roleSpecificSkills).length || 0
    const overallAvg = (coreSkillsAvg + behavioralAvg + roleSpecificAvg) / 3

    // Create radar chart data
    const radarData = [
      { subject: 'Core Skills', A: coreSkillsAvg, fullMark: 5 },
      { subject: 'Behavioral', A: behavioralAvg, fullMark: 5 },
      { subject: 'Role Specific', A: roleSpecificAvg, fullMark: 5 }
    ]

    // Create skill comparison data
    const skillComparisonData = [
      ...coreSkillsData.map(skill => ({ name: skill.name.split(' &')[0], score: coreSkills[skill.id] || 0, category: 'Core' })),
      ...behavioralCompetenciesData.slice(0, 5).map(skill => ({ name: skill.name.split(' &')[0], score: behavioralCompetencies[skill.id] || 0, category: 'Behavioral' }))
    ]

    return {
      coreSkillsAvg: Math.round(coreSkillsAvg * 10) / 10,
      behavioralAvg: Math.round(behavioralAvg * 10) / 10,
      roleSpecificAvg: Math.round(roleSpecificAvg * 10) / 10,
      overallAvg: Math.round(overallAvg * 10) / 10,
      radarData,
      skillComparisonData
    }
  }

  const canProceed = () => {
    if (currentStep === 1) return selectedRole !== ''
    if (currentStep === 2) return Object.keys(coreSkills).length === coreSkillsData.length
    if (currentStep === 3) return Object.keys(behavioralCompetencies).length === behavioralCompetenciesData.length
    if (currentStep === 4) {
      const selectedRoleObj = roles.find(r => r.id === selectedRole)
      if (!selectedRoleObj) return false
      const requiredSkills = roleSpecificCompetencies[selectedRoleObj.id] || []
      return Object.keys(roleSpecificSkills).length === requiredSkills.length
    }
    if (currentStep === 5) return reflectionQuestions.every(q => reflectionAnswers[q.id]?.trim().length > 10)
    return false
  }

  const resetAssessment = () => {
    setCurrentStep(1)
    setSelectedRole('')
    setCoreSkills({})
    setBehavioralCompetencies({})
    setRoleSpecificSkills({})
    setReflectionAnswers({})
    setTrainingPreferences({})
    setShowResults(false)
  }

  const getSelectedRoleData = () => {
    return roles.find(r => r.id === selectedRole)
  }

  const renderSidebar = () => (
    <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="flex h-16 items-center justify-center border-b border-gray-200">
        <Image className="h-8 w-auto" src="/logo.png" alt="Sabil" width={32} height={32} />
        <span className="ml-2 text-lg font-bold text-[#23544e]">Sabil</span>
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
                      subItem.name === 'Capability Assessment Tool'
                        ? 'text-[#23544e] bg-[#23544e]/10 font-medium'
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
  )

  if (showResults) {
    const results = calculateResults()
    const selectedRoleData = getSelectedRoleData()
    
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex h-screen">
          {renderSidebar()}
          {/* Main content */}
          <div className="flex-1 overflow-auto bg-gray-50">
            <div className="p-8">
              {/* Header - simple, no gradients */}
              <div className="mb-8 bg-[#23544e] rounded-lg p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <TrophyIcon className="h-6 w-6 text-yellow-300" />
                      <h1 className="text-2xl font-bold">Assessment Complete!</h1>
                    </div>
                    <p className="text-green-100">Comprehensive Capability Assessment Report</p>
                    {selectedRoleData && (
                      <div className="flex items-center mt-3 space-x-2">
                        <selectedRoleData.icon className="h-4 w-4 text-yellow-300" />
                        <span className="text-sm font-medium">{selectedRoleData.name}</span>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={resetAssessment}
                    className="bg-white text-[#23544e] px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                  >
                    Retake Assessment
                  </button>
                </div>
              </div>

              {/* Results Summary Cards - using brand color only */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Core Skills</p>
                      <p className="text-2xl font-bold text-[#23544e]">{results.coreSkillsAvg}</p>
                      <p className="text-xs text-gray-500">out of 5.0</p>
                    </div>
                    <div className="w-10 h-10 bg-[#23544e] rounded-lg flex items-center justify-center">
                      <BriefcaseIcon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Behavioral</p>
                      <p className="text-2xl font-bold text-[#23544e]">{results.behavioralAvg}</p>
                      <p className="text-xs text-gray-500">out of 5.0</p>
                    </div>
                    <div className="w-10 h-10 bg-[#23544e] rounded-lg flex items-center justify-center">
                      <UserIcon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Role Specific</p>
                      <p className="text-2xl font-bold text-[#23544e]">{results.roleSpecificAvg}</p>
                      <p className="text-xs text-gray-500">out of 5.0</p>
                    </div>
                    <div className="w-10 h-10 bg-[#23544e] rounded-lg flex items-center justify-center">
                      <StarIcon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border-2 border-[#23544e] p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Overall Score</p>
                      <p className="text-2xl font-bold text-[#23544e]">{results.overallAvg}</p>
                      <p className="text-xs text-gray-500">out of 5.0</p>
                    </div>
                    <div className="w-10 h-10 bg-[#23544e] rounded-lg flex items-center justify-center">
                      <TrophyIcon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Competency Overview</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={results.radarData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#4B5563', fontSize: 12 }} />
                        <PolarRadiusAxis domain={[0, 5]} tick={false} />
                        <Radar
                          name="Assessment Score"
                          dataKey="A"
                          stroke="#23544e"
                          fill="#23544e"
                          fillOpacity={0.2}
                          strokeWidth={2}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills Breakdown</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={results.skillComparisonData.slice(0, 8)}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis 
                          dataKey="name" 
                          tick={{ fill: '#6B7280', fontSize: 10 }}
                          angle={-45}
                          textAnchor="end"
                          height={60}
                        />
                        <YAxis domain={[0, 5]} tick={{ fill: '#6B7280', fontSize: 12 }} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            border: '1px solid #E5E7EB',
                            borderRadius: '4px'
                          }}
                        />
                        <Bar dataKey="score" fill="#23544e" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Development Recommendations */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <SparklesIcon className="h-5 w-5 text-[#23544e] mr-2" />
                  Development Recommendations
                </h3>
                <div className="space-y-4">
                  {/* Show areas for improvement */}
                  {[...coreSkillsData, ...behavioralCompetenciesData]
                    .filter(item => {
                      const rating = coreSkills[item.id] || behavioralCompetencies[item.id] || 0
                      return rating < 3
                    })
                    .slice(0, 3)
                    .map(item => (
                      <div key={item.id} className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <StarIcon className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 mb-1">{item.name}</p>
                          <p className="text-sm text-gray-600">
                            Recommended: Additional training or mentoring to strengthen this competency
                          </p>
                        </div>
                      </div>
                    ))
                  }
                  
                  {/* Show strengths */}
                  {[...coreSkillsData, ...behavioralCompetenciesData]
                    .filter(item => {
                      const rating = coreSkills[item.id] || behavioralCompetencies[item.id] || 0
                      return rating >= 4
                    })
                    .slice(0, 2)
                    .map(item => (
                      <div key={item.id} className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <CheckCircleIcon className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 mb-1">{item.name} - Strong Area</p>
                          <p className="text-sm text-gray-600">
                            Consider mentoring others or taking on leadership roles in this area
                          </p>
                        </div>
                      </div>
                    ))
                  }
                  
                  {/* If no areas need improvement */}
                  {[...coreSkillsData, ...behavioralCompetenciesData].every(item => {
                    const rating = coreSkills[item.id] || behavioralCompetencies[item.id] || 0
                    return rating >= 3
                  }) && (
                    <div className="flex items-start space-x-3 p-4 bg-[#23544e]/5 rounded-lg border border-[#23544e]/20">
                      <div className="w-8 h-8 bg-[#23544e] rounded-full flex items-center justify-center flex-shrink-0">
                        <TrophyIcon className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 mb-1">Excellent Overall Performance!</p>
                        <p className="text-sm text-gray-600">
                          Your scores indicate strong competency across all assessed areas. Consider advanced training or leadership development.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {renderSidebar()}
        {/* Main content */}
        <div className="flex-1 overflow-auto bg-gray-50">
          <div className="p-8">
            {/* Header - simple, no gradients */}
            <div className="mb-8 bg-[#23544e] rounded-lg p-6 text-white">
              <div className="flex items-center space-x-3 mb-2">
                <AcademicCapIcon className="h-6 w-6 text-yellow-300" />
                <h1 className="text-2xl font-bold">Capability Assessment</h1>
              </div>
              <p className="text-green-100">
                Comprehensive evaluation of your professional competencies and skills
              </p>
            </div>

            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-between relative">
                <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200">
                  <div 
                    className="h-full bg-[#23544e] transition-all duration-300"
                    style={{ width: `${((currentStep - 1) / 4) * 100}%` }}
                  ></div>
                </div>
                
                {[1, 2, 3, 4, 5].map((step) => (
                  <div key={step} className="flex flex-col items-center relative z-10">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                      currentStep >= step
                        ? 'bg-[#23544e] border-[#23544e] text-white'
                        : 'bg-white border-gray-300 text-gray-500'
                    }`}>
                      {currentStep > step ? (
                        <CheckCircleIcon className="w-5 h-5" />
                      ) : (
                        <span className="text-sm font-medium">{step}</span>
                      )}
                    </div>
                    <div className="mt-2 text-center">
                      <p className={`text-xs font-medium ${
                        currentStep >= step ? 'text-[#23544e]' : 'text-gray-500'
                      }`}>
                        {step === 1 && 'Role Selection'}
                        {step === 2 && 'Core Skills'}
                        {step === 3 && 'Behavioral Skills'}
                        {step === 4 && 'Role-Specific'}
                        {step === 5 && 'Reflection & Preferences'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Assessment Form */}
            <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
              {/* Step 1: Role Selection */}
              {currentStep === 1 && (
                <div>
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Choose Your Professional Role</h2>
                    <p className="text-gray-600">
                      Select the role that best represents your current position
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {roles.map((role) => (
                      <div
                        key={role.id}
                        onClick={() => setSelectedRole(role.id)}
                        className={`group p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          selectedRole === role.id
                            ? 'border-[#23544e] bg-[#23544e]/5'
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                            selectedRole === role.id
                              ? 'bg-[#23544e] text-white'
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            <role.icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900">{role.name}</h3>
                            <div className={`w-4 h-4 rounded-full border-2 mt-1 ${
                              selectedRole === role.id
                                ? 'border-[#23544e] bg-[#23544e]'
                                : 'border-gray-300'
                            }`}>
                              {selectedRole === role.id && (
                                <CheckCircleIcon className="w-full h-full text-white" />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Core Skills */}
              {currentStep === 2 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Core Skills Assessment</h2>
                  <p className="text-gray-600 mb-6">Rate your proficiency in each core skill area (1-5 scale):</p>
                  
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
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Behavioral Competencies Assessment</h2>
                  <p className="text-gray-600 mb-6">Rate your behavioral competencies (1-5 scale):</p>
                  
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

              {/* Step 4: Role-Specific Competencies */}
              {currentStep === 4 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Role-Specific Competencies</h2>
                  <p className="text-gray-600 mb-6">
                    Assess your competencies specific to your selected role: <strong>{getSelectedRoleData()?.name}</strong>
                  </p>
                  
                  <div className="space-y-6">
                    {getSelectedRoleData() && roleSpecificCompetencies[getSelectedRoleData()!.id]?.map((competency) => (
                      <div key={competency.id} className="border border-gray-200 rounded-lg p-6">
                        <h3 className="font-medium text-gray-900 mb-2">{competency.name}</h3>
                        <p className="text-gray-600 mb-4">{competency.description}</p>
                        
                        <div className="flex space-x-4">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <button
                              key={rating}
                              onClick={() => handleRoleSpecificRating(competency.id, rating)}
                              className={`w-12 h-12 rounded-full border-2 font-medium transition-all ${
                                roleSpecificSkills[competency.id] === rating
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

              {/* Step 5: Reflection & Training Preferences */}
              {currentStep === 5 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Self-Reflection & Development Preferences</h2>
                  
                  {/* Reflection Questions */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Reflection</h3>
                    <div className="space-y-6">
                      {reflectionQuestions.map((question) => (
                        <div key={question.id} className="border border-gray-200 rounded-lg p-6">
                          <label className="block text-sm font-medium text-gray-900 mb-3">
                            {question.question}
                          </label>
                          <textarea
                            value={reflectionAnswers[question.id] || ''}
                            onChange={(e) => handleReflectionAnswer(question.id, e.target.value)}
                            placeholder={question.placeholder}
                            rows={3}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#23544e] focus:border-[#23544e] resize-none"
                          />
                          <div className="mt-2 text-sm text-gray-500">
                            {(reflectionAnswers[question.id] || '').length} characters (minimum 10 required)
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Training Preferences */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Training & Development Preferences</h3>
                    <p className="text-gray-600 mb-4">Select your preferred learning methods (choose all that apply):</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      {trainingOptions.map((option) => (
                        <label
                          key={option.id}
                          className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            trainingPreferences[option.id]
                              ? 'border-[#23544e] bg-[#23544e]/5'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={!!trainingPreferences[option.id]}
                            onChange={(e) => handleTrainingPreference(option.id, e.target.checked)}
                            className="sr-only"
                          />
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${
                            trainingPreferences[option.id]
                              ? 'bg-[#23544e] text-white'
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            <option.icon className="w-4 h-4" />
                          </div>
                          <span className="font-medium text-gray-900">{option.name}</span>
                          {trainingPreferences[option.id] && (
                            <CheckCircleIcon className="w-5 h-5 text-[#23544e] ml-auto" />
                          )}
                        </label>
                      ))}
                    </div>

                    {/* Learning Schedule */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <label className="block text-sm font-medium text-gray-900 mb-3">
                        Preferred Learning Schedule
                      </label>
                      <select
                        value={typeof trainingPreferences.schedule === 'string' ? trainingPreferences.schedule : ''}
                        onChange={(e) => handleTrainingPreference('schedule', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#23544e] focus:border-[#23544e]"
                      >
                        <option value="">Select your preference...</option>
                        <option value="weekdays">Weekdays (Mon-Fri)</option>
                        <option value="weekends">Weekends</option>
                        <option value="evenings">Evenings</option>
                        <option value="flexible">Flexible schedule</option>
                      </select>
                    </div>
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
                  Step {currentStep} of 5
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
                  {currentStep === 5 ? (
                    <>
                      <TrophyIcon className="w-5 h-5 mr-2" />
                      Complete Assessment
                    </>
                  ) : (
                    <>
                      Next Step
                      <ArrowRightIcon className="w-5 h-5 ml-2" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}