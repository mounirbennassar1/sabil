'use client'

import { useState } from 'react'
import TalentLayout from '../../../components/layout/TalentLayout'
import {
  CurrencyDollarIcon,
  ClockIcon,
  ArrowTrendingUpIcon as TrendingUpIcon,
  FunnelIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'

export default function ROITracking() {
  const [selectedProgram, setSelectedProgram] = useState('all')
  const [selectedYear, setSelectedYear] = useState('2024')
  const [selectedDepartment, setSelectedDepartment] = useState('all')



  // Mock ROI KPI data
  const roiKPIs = [
    {
      id: 1,
      title: 'Cost per Learner',
      value: 'SAR 2,450',
      change: '-12%',
      trend: 'down',
      description: 'Average investment per employee in learning and development programs',
      target: 'SAR 2,200',
      status: 'on-track'
    },
    {
      id: 2,
      title: 'Program Effectiveness Score',
      value: '87%',
      change: '+15%',
      trend: 'up',
      description: 'Overall effectiveness rating based on completion rates and performance improvement',
      target: '90%',
      status: 'on-track'
    },
    {
      id: 3,
      title: 'Time-to-Productivity',
      value: '45 days',
      change: '-8 days',
      trend: 'down',
      description: 'Average time for new hires to reach full productivity after joining',
      target: '40 days',
      status: 'needs-attention'
    },
    {
      id: 4,
      title: 'Internal Mobility Uplift',
      value: '34%',
      change: '+18%',
      trend: 'up',
      description: 'Percentage increase in internal promotions and lateral moves',
      target: '40%',
      status: 'exceeding'
    }
  ]

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? (
      <TrendingUpIcon className="w-4 h-4 text-green-600" />
    ) : (
      <TrendingUpIcon className="w-4 h-4 text-red-600 transform rotate-180" />
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'exceeding': return 'text-green-600 bg-green-50'
      case 'on-track': return 'text-blue-600 bg-blue-50'
      case 'needs-attention': return 'text-yellow-600 bg-yellow-50'
      case 'at-risk': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'exceeding': return 'Exceeding Target'
      case 'on-track': return 'On Track'
      case 'needs-attention': return 'Needs Attention'
      case 'at-risk': return 'At Risk'
      default: return 'Unknown'
    }
  }

  return (
    <TalentLayout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">ROI Tracking</h1>
                <p className="mt-2 text-gray-600">Return on investment analysis for learning and talent development programs</p>
              </div>

              {/* Filters */}
              <div className="bg-white rounded-lg shadow p-6 mb-8">
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2">
                    <FunnelIcon className="h-5 w-5 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">Filters:</span>
                  </div>
                  
                  <select
                    value={selectedProgram}
                    onChange={(e) => setSelectedProgram(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#23544e]"
                  >
                    <option value="all">All Programs</option>
                    <option value="leadership">Leadership Development</option>
                    <option value="technical">Technical Training</option>
                    <option value="soft-skills">Soft Skills</option>
                    <option value="certifications">Certifications</option>
                    <option value="mentoring">Mentoring Programs</option>
                  </select>

                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#23544e]"
                  >
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="all-time">All Time</option>
                  </select>

                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#23544e]"
                  >
                    <option value="all">All Departments</option>
                    <option value="engineering">Engineering</option>
                    <option value="sales">Sales</option>
                    <option value="marketing">Marketing</option>
                    <option value="operations">Operations</option>
                    <option value="hr">Human Resources</option>
                  </select>
                </div>
              </div>

              {/* ROI KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {roiKPIs.map((kpi) => (
                  <div key={kpi.id} className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          {kpi.id === 1 && <CurrencyDollarIcon className="h-8 w-8 text-[#23544e]" />}
                          {kpi.id === 2 && <ChartBarIcon className="h-8 w-8 text-[#23544e]" />}
                          {kpi.id === 3 && <ClockIcon className="h-8 w-8 text-[#23544e]" />}
                          {kpi.id === 4 && <TrendingUpIcon className="h-8 w-8 text-[#23544e]" />}
                        </div>
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(kpi.status)}`}>
                        {getStatusText(kpi.status)}
                      </span>
                    </div>
                    
                    <div className="mb-2">
                      <h3 className="text-sm font-medium text-gray-600">{kpi.title}</h3>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                        <div className="flex items-center">
                          {getTrendIcon(kpi.trend)}
                          <span className={`ml-1 text-sm font-medium ${
                            kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {kpi.change}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-500 mb-3">{kpi.description}</p>
                    
                    <div className="border-t border-gray-200 pt-3">
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>Target: {kpi.target}</span>
                        <span>Current Period</span>
                      </div>
                      <div className="mt-2 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            kpi.status === 'exceeding' ? 'bg-green-500' :
                            kpi.status === 'on-track' ? 'bg-blue-500' :
                            kpi.status === 'needs-attention' ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ 
                            width: kpi.status === 'exceeding' ? '100%' :
                                   kpi.status === 'on-track' ? '80%' :
                                   kpi.status === 'needs-attention' ? '60%' : '40%'
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Investment Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Investment Breakdown</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Annual Investment</span>
                      <span className="text-lg font-bold text-[#23544e]">SAR 1.2M</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Leadership Development</span>
                        <span>SAR 400K (33%)</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-[#23544e] h-2 rounded-full" style={{ width: '33%' }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Technical Training</span>
                        <span>SAR 360K (30%)</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-[#2d6a5f] h-2 rounded-full" style={{ width: '30%' }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Certifications</span>
                        <span>SAR 240K (20%)</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-[#378070] h-2 rounded-full" style={{ width: '20%' }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Soft Skills & Other</span>
                        <span>SAR 200K (17%)</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-[#419681] h-2 rounded-full" style={{ width: '17%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">ROI Summary</h3>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-[#23544e]">3.2x</div>
                      <div className="text-sm text-gray-600">Overall ROI Multiplier</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-xl font-bold text-gray-900">SAR 3.8M</div>
                        <div className="text-xs text-gray-600">Total Value Generated</div>
                      </div>
                      <div>
                        <div className="text-xl font-bold text-gray-900">SAR 2.6M</div>
                        <div className="text-xs text-gray-600">Net Benefit</div>
                      </div>
                    </div>
                    <div className="border-t border-gray-200 pt-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Key Value Drivers</h4>
                      <ul className="text-xs text-gray-600 space-y-1">
                        <li>• Reduced external hiring costs</li>
                        <li>• Improved employee retention</li>
                        <li>• Increased productivity and efficiency</li>
                        <li>• Enhanced innovation and problem-solving</li>
                        <li>• Faster time-to-market for projects</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Visualization Placeholder */}
              <div className="bg-white rounded-lg shadow p-8">
                <h3 className="text-lg font-medium text-gray-900 mb-6">ROI Trends & Analytics</h3>
                <div className="text-center py-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <ChartBarIcon className="mx-auto h-16 w-16 text-gray-400" />
                  <h4 className="mt-4 text-lg font-medium text-gray-900">Advanced Analytics Dashboard</h4>
                  <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
                    Interactive charts, trend analysis, and predictive models will be displayed here to provide 
                    deep insights into learning ROI, cost optimization opportunities, and investment recommendations.
                  </p>
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    <div className="bg-white p-6 rounded-lg border">
                      <h5 className="font-medium text-gray-900 mb-2">ROI Trend Analysis</h5>
                      <p className="text-xs text-gray-600">Monthly and quarterly ROI trends with forecasting</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg border">
                      <h5 className="font-medium text-gray-900 mb-2">Cost-Benefit Breakdown</h5>
                      <p className="text-xs text-gray-600">Detailed analysis of costs vs. quantified benefits</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg border">
                      <h5 className="font-medium text-gray-900 mb-2">Predictive Modeling</h5>
                      <p className="text-xs text-gray-600">AI-powered predictions for future ROI scenarios</p>
                    </div>
                  </div>
                </div>
              </div>
        </div>
      </div>
    </TalentLayout>
  )
}