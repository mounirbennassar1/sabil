'use client'

import { useState } from 'react'
import TalentLayout from '../../../components/layout/TalentLayout'
import {
  CheckCircleIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  UserIcon,
  BriefcaseIcon,
  StarIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  ClockIcon,
  TrophyIcon,
  ChartBarIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from 'recharts'

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

  // Colors for charts
  const brandColors = ['#23544e', '#2563eb', '#059669', '#dc2626', '#7c3aed', '#ea580c']

  // Assessment data
  const roles = [
    { id: 'project_manager', name: 'Project Manager', icon: BriefcaseIcon, color: '#23544e' },
    { id: 'operations_specialist', name: 'Operations Specialist', icon: ChartBarIcon, color: '#2563eb' },
    { id: 'learning_dev_officer', name: 'Learning & Development Officer', icon: AcademicCapIcon, color: '#059669' },
    { id: 'engineer', name: 'Engineer (Process / Mechanical / Electrical)', icon: SparklesIcon, color: '#dc2626' },
    { id: 'sustainability_officer', name: 'Sustainability Officer', icon: TrophyIcon, color: '#7c3aed' },
    { id: 'hr_business_partner', name: 'HR Business Partner', icon: UserIcon, color: '#ea580c' }
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

  if (showResults) {
    const results = calculateResults()
    const selectedRoleData = getSelectedRoleData()
    
    return (
      <TalentLayout>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header with gradient background */}
            <div className="relative mb-12 bg-gradient-to-r from-[#23544e] to-[#2563eb] rounded-2xl p-8 text-white overflow-hidden">
              <div className="absolute inset-0 bg-black opacity-10"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-3 mb-3">
                      <TrophyIcon className="h-8 w-8 text-yellow-300" />
                      <h1 className="text-4xl font-bold">Assessment Complete!</h1>
                    </div>
                    <p className="text-xl text-blue-100">Comprehensive Capability Assessment Report</p>
                    {selectedRoleData && (
                      <div className="flex items-center mt-4 space-x-2">
                        <selectedRoleData.icon className="h-5 w-5 text-yellow-300" />
                        <span className="text-lg font-medium">{selectedRoleData.name}</span>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={resetAssessment}
                    className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl hover:bg-white/30 transition-all duration-200 border border-white/30"
                  >
                    Retake Assessment
                  </button>
                </div>
              </div>
            </div>

            {/* Results Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Core Skills</p>
                    <p className="text-3xl font-bold text-[#23544e]">{results.coreSkillsAvg}</p>
                    <p className="text-xs text-gray-500">out of 5.0</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-[#23544e] to-[#2563eb] rounded-xl flex items-center justify-center">
                    <BriefcaseIcon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Behavioral</p>
                    <p className="text-3xl font-bold text-green-600">{results.behavioralAvg}</p>
                    <p className="text-xs text-gray-500">out of 5.0</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <UserIcon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Role Specific</p>
                    <p className="text-3xl font-bold text-purple-600">{results.roleSpecificAvg}</p>
                    <p className="text-xs text-gray-500">out of 5.0</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center">
                    <StarIcon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200 ring-2 ring-[#23544e]/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Overall Score</p>
                    <p className="text-3xl font-bold text-[#23544e]">{results.overallAvg}</p>
                    <p className="text-xs text-gray-500">out of 5.0</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                    <TrophyIcon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Radar Chart */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Competency Overview</h3>
                <div className="h-80">
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
                        strokeWidth={3}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Skills Comparison Chart */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Skills Breakdown</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={results.skillComparisonData.slice(0, 8)}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis 
                        dataKey="name" 
                        tick={{ fill: '#6B7280', fontSize: 11 }}
                        angle={-45}
                        textAnchor="end"
                        height={60}
                      />
                      <YAxis domain={[0, 5]} tick={{ fill: '#6B7280', fontSize: 12 }} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #E5E7EB',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Bar dataKey="score" fill="#23544e" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Development Recommendations */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <SparklesIcon className="h-6 w-6 text-[#23544e] mr-2" />
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
                    <div key={item.id} className="flex items-start space-x-4 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
                      <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <StarIcon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 mb-1">{item.name}</p>
                        <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                        <p className="text-sm font-medium text-orange-700">
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
                    <div key={item.id} className="flex items-start space-x-4 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircleIcon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 mb-1">{item.name} - Strong Area</p>
                        <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                        <p className="text-sm font-medium text-green-700">
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
                  <div className="flex items-start space-x-4 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <TrophyIcon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 mb-1">Excellent Overall Performance!</p>
                      <p className="text-sm text-gray-600 mb-2">
                        Your scores indicate strong competency across all assessed areas.
                      </p>
                      <p className="text-sm font-medium text-green-700">
                        Consider advanced training, leadership development, or becoming a mentor to others.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </TalentLayout>
    )
  }

  return (
    <TalentLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header with modern design */}
          <div className="relative mb-12 bg-gradient-to-r from-[#23544e] to-[#2563eb] rounded-2xl p-8 text-white overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-3">
                <AcademicCapIcon className="h-8 w-8 text-yellow-300" />
                <h1 className="text-4xl font-bold">Capability Assessment</h1>
              </div>
              <p className="text-xl text-blue-100">
                Comprehensive evaluation of your professional competencies and skills
              </p>
            </div>
          </div>

          {/* Enhanced Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-between relative">
              {/* Progress Line */}
              <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200">
                <div 
                  className="h-full bg-gradient-to-r from-[#23544e] to-[#2563eb] transition-all duration-500 ease-in-out"
                  style={{ width: `${((currentStep - 1) / 4) * 100}%` }}
                ></div>
              </div>
              
              {[1, 2, 3, 4, 5].map((step) => (
                <div key={step} className="flex flex-col items-center relative z-10">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full border-3 transition-all duration-300 ${
                    currentStep >= step
                      ? 'bg-gradient-to-br from-[#23544e] to-[#2563eb] border-[#23544e] text-white shadow-lg scale-110'
                      : 'bg-white border-gray-300 text-gray-500 hover:border-gray-400'
                  }`}>
                    {currentStep > step ? (
                      <CheckCircleIcon className="w-7 h-7" />
                    ) : (
                      <span className="text-sm font-bold">{step}</span>
                    )}
                  </div>
                  <div className="mt-3 text-center">
                    <p className={`text-sm font-medium transition-colors ${
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
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            {/* Step 1: Enhanced Role Selection */}
            {currentStep === 1 && (
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-3">Choose Your Professional Role</h2>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Select the role that best represents your current position to receive personalized competency assessments
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {roles.map((role) => (
                    <div
                      key={role.id}
                      onClick={() => setSelectedRole(role.id)}
                      className={`group relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                        selectedRole === role.id
                          ? 'border-[#23544e] bg-gradient-to-br from-[#23544e]/5 to-[#2563eb]/5 shadow-md'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                          selectedRole === role.id
                            ? 'bg-gradient-to-br from-[#23544e] to-[#2563eb] text-white shadow-lg'
                            : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                        }`}>
                          <role.icon className="w-7 h-7" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 text-lg mb-1">{role.name}</h3>
                          <div className={`w-5 h-5 rounded-full border-2 mt-2 ${
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
                      
                      {/* Selection indicator */}
                      {selectedRole === role.id && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                          <CheckCircleIcon className="w-4 h-4 text-white" />
                        </div>
                      )}
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

            {/* Step 4: Role-Specific Competencies */}
            {currentStep === 4 && (
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-3">Role-Specific Competencies</h2>
                  <p className="text-lg text-gray-600">
                    Assess your competencies specific to your selected role: <strong>{getSelectedRoleData()?.name}</strong>
                  </p>
                </div>
                
                {/* Rating Scale Legend */}
                <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
                  <h3 className="font-semibold text-gray-900 mb-4">Rating Scale Guide:</h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {ratingScale.map((scale) => (
                      <div key={scale.value} className="flex flex-col items-center text-center">
                        <div className={`w-10 h-10 rounded-full ${scale.color} flex items-center justify-center text-white font-bold mb-2`}>
                          {scale.value}
                        </div>
                        <span className="text-sm font-medium text-gray-900">{scale.label}</span>
                        <span className="text-xs text-gray-600 mt-1">{scale.description}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  {getSelectedRoleData() && roleSpecificCompetencies[getSelectedRoleData()!.id]?.map((competency) => (
                    <div key={competency.id} className="bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-2xl p-8 hover:shadow-md transition-shadow">
                      <div className="flex items-start space-x-4 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#23544e] to-[#2563eb] rounded-xl flex items-center justify-center flex-shrink-0">
                          <StarIcon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">{competency.name}</h3>
                          <p className="text-gray-600">{competency.description}</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-center space-x-3">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <button
                            key={rating}
                            onClick={() => handleRoleSpecificRating(competency.id, rating)}
                            className={`w-14 h-14 rounded-2xl border-2 font-bold text-lg transition-all duration-200 ${
                              roleSpecificSkills[competency.id] === rating
                                ? 'border-[#23544e] bg-gradient-to-br from-[#23544e] to-[#2563eb] text-white shadow-lg scale-110'
                                : 'border-gray-300 text-gray-600 hover:border-[#23544e] hover:scale-105'
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

            {/* Step 5: Reflection Questions & Training Preferences */}
            {currentStep === 5 && (
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-3">Self-Reflection & Development Preferences</h2>
                  <p className="text-lg text-gray-600">
                    Help us understand your professional journey and learning preferences
                  </p>
                </div>

                {/* Reflection Questions */}
                <div className="mb-12">
                  <div className="flex items-center mb-6">
                    <DocumentTextIcon className="h-6 w-6 text-[#23544e] mr-2" />
                    <h3 className="text-2xl font-bold text-gray-900">Professional Reflection</h3>
                  </div>
                  <div className="space-y-6">
                    {reflectionQuestions.map((question) => (
                      <div key={question.id} className="bg-white border border-gray-200 rounded-2xl p-6">
                        <label className="block text-lg font-medium text-gray-900 mb-3">
                          {question.question}
                        </label>
                        <textarea
                          value={reflectionAnswers[question.id] || ''}
                          onChange={(e) => handleReflectionAnswer(question.id, e.target.value)}
                          placeholder={question.placeholder}
                          rows={4}
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#23544e] focus:border-[#23544e] resize-none transition-colors"
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
                  <div className="flex items-center mb-6">
                    <AcademicCapIcon className="h-6 w-6 text-[#23544e] mr-2" />
                    <h3 className="text-2xl font-bold text-gray-900">Training & Development Preferences</h3>
                  </div>
                  <p className="text-gray-600 mb-6">Select your preferred learning methods (choose all that apply):</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {trainingOptions.map((option) => (
                      <label
                        key={option.id}
                        className={`flex items-center p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                          trainingPreferences[option.id]
                            ? 'border-[#23544e] bg-gradient-to-r from-[#23544e]/5 to-[#2563eb]/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={!!trainingPreferences[option.id]}
                          onChange={(e) => handleTrainingPreference(option.id, e.target.checked)}
                          className="sr-only"
                        />
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center mr-4 ${
                          trainingPreferences[option.id]
                            ? 'bg-gradient-to-br from-[#23544e] to-[#2563eb] text-white'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          <option.icon className="w-5 h-5" />
                        </div>
                        <span className="font-medium text-gray-900">{option.name}</span>
                        {trainingPreferences[option.id] && (
                          <CheckCircleIcon className="w-5 h-5 text-[#23544e] ml-auto" />
                        )}
                      </label>
                    ))}
                  </div>

                  {/* Learning Schedule Preference */}
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <label className="block text-lg font-medium text-gray-900 mb-3">
                      Preferred Learning Schedule
                    </label>
                    <select
                      value={typeof trainingPreferences.schedule === 'string' ? trainingPreferences.schedule : ''}
                      onChange={(e) => handleTrainingPreference('schedule', e.target.value)}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#23544e] focus:border-[#23544e] transition-colors"
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

            {/* Enhanced Navigation Buttons */}
            <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`flex items-center px-8 py-4 rounded-2xl font-semibold transition-all duration-200 ${
                  currentStep === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:shadow-md'
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
                className={`flex items-center px-8 py-4 rounded-2xl font-semibold transition-all duration-200 ${
                  canProceed()
                    ? 'bg-gradient-to-r from-[#23544e] to-[#2563eb] text-white hover:shadow-lg hover:scale-105'
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
    </TalentLayout>
  )
}