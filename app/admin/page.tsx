"use client"

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Image from "next/image"
import { 
  UserGroupIcon,
  BookOpenIcon,
  AcademicCapIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ArrowUpIcon,
  UsersIcon,
  StarIcon,
  XMarkIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  CurrencyDollarIcon
} from "@heroicons/react/24/outline"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell,
  AreaChart,
  Area
} from "recharts"
interface DashboardStats {
  totalUsers: number
  totalCourses: number
  totalEnrollments: number
  totalCertificates: number
  activeUsers: number
  completionRate: number
  revenue: number
  averageRating: number
}

interface NewCourse {
  title: string
  description: string
  category: string
  level: string
  price: number
  duration: string
}

interface SystemSettings {
  platformName: string
  allowRegistration: boolean
  emailNotifications: boolean
  autoEnrollment: boolean
  certificateEnabled: boolean
  maintenanceMode: boolean
}

// Mock data for charts
const enrollmentData = [
  { month: 'Jan', enrollments: 65, completions: 45 },
  { month: 'Feb', enrollments: 78, completions: 52 },
  { month: 'Mar', enrollments: 90, completions: 68 },
  { month: 'Apr', enrollments: 81, completions: 61 },
  { month: 'May', enrollments: 95, completions: 73 },
  { month: 'Jun', enrollments: 112, completions: 89 },
]

const categoryData = [
  { name: 'Programming', value: 35, color: '#23544e' },
  { name: 'Data Science', value: 28, color: '#0b867a' },
  { name: 'Design', value: 20, color: '#4a90e2' },
  { name: 'Business', value: 17, color: '#f39c12' }
]

const revenueData = [
  { month: 'Jan', revenue: 12500 },
  { month: 'Feb', revenue: 15600 },
  { month: 'Mar', revenue: 18900 },
  { month: 'Apr', revenue: 16800 },
  { month: 'May', revenue: 21400 },
  { month: 'Jun', revenue: 24700 },
]

const userActivityData = [
  { day: 'Mon', active: 1240 },
  { day: 'Tue', active: 1180 },
  { day: 'Wed', active: 1350 },
  { day: 'Thu', active: 1290 },
  { day: 'Fri', active: 1450 },
  { day: 'Sat', active: 980 },
  { day: 'Sun', active: 1100 },
]

const topCourses = [
  { name: 'Complete Web Development Bootcamp', enrollments: 1245, rating: 4.8 },
  { name: 'JavaScript Mastery', enrollments: 892, rating: 4.9 },
  { name: 'Python for Data Science', enrollments: 1567, rating: 4.7 },
  { name: 'UI/UX Design Fundamentals', enrollments: 2134, rating: 4.9 },
  { name: 'Digital Marketing Masterclass', enrollments: 1876, rating: 4.8 }
]

// Mock users data
const mockUsers = [
  { id: '1', name: 'Ahmad Hassan', email: 'ahmad@neomgreenhydrogen.com', role: 'STUDENT', department: 'Engineering', createdAt: '2024-01-15' },
  { id: '2', name: 'Admin User', email: 'admin@neomgreenhydrogen.com', role: 'ADMIN', department: 'Administration', createdAt: '2024-01-10' },
  { id: '3', name: 'Sarah Ahmed', email: 'sarah@neomgreenhydrogen.com', role: 'STUDENT', department: 'Design', createdAt: '2024-02-20' },
  { id: '4', name: 'Mohammed Ali', email: 'mohammed@neomgreenhydrogen.com', role: 'INSTRUCTOR', department: 'Programming', createdAt: '2024-03-05' },
  { id: '5', name: 'Fatima Khan', email: 'fatima@neomgreenhydrogen.com', role: 'STUDENT', department: 'Data Science', createdAt: '2024-03-12' },
]

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [users, setUsers] = useState(mockUsers)
  const [searchTerm, setSearchTerm] = useState('')
  const [stats] = useState<DashboardStats>({
    totalUsers: 15689,
    totalCourses: 30,
    totalEnrollments: 45287,
    totalCertificates: 28945,
    activeUsers: 12450,
    completionRate: 78.5,
    revenue: 287450,
    averageRating: 4.8
  })

  // New course form state
  const [newCourse, setNewCourse] = useState<NewCourse>({
    title: '',
    description: '',
    category: 'Programming',
    level: 'Beginner',
    price: 0,
    duration: ''
  })

  // Settings state
  const [settings, setSettings] = useState<SystemSettings>({
    platformName: 'Neom Green Hydrogen Learning Platform',
    allowRegistration: true,
    emailNotifications: true,
    autoEnrollment: false,
    certificateEnabled: true,
    maintenanceMode: false
  })

  useEffect(() => {
    if (status === "loading") return

    if (!session) {
      router.push("/auth/signin")
      return
    }

    if (session.user.role !== "ADMIN") {
      router.push("/dashboard")
      return
    }

    fetchDashboardData()
  }, [session, status, router])

  const fetchDashboardData = async () => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      setLoading(false)
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
      setLoading(false)
    }
  }

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Simulate API call
      console.log('Creating course:', newCourse)
      alert('Course created successfully!')
      setNewCourse({
        title: '',
        description: '',
        category: 'Programming',
        level: 'Beginner',
        price: 0,
        duration: ''
      })
      setActiveModal(null)
    } catch (error) {
      console.error('Error creating course:', error)
      alert('Error creating course')
    }
  }

  const handleDeleteUser = (userId: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId))
      alert('User deleted successfully!')
    }
  }

  const handleSaveSettings = () => {
    console.log('Saving settings:', settings)
    alert('Settings saved successfully!')
    setActiveModal(null)
  }

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#23544e] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(value)
  }

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Image 
                src="/logo.png" 
                alt="Neom Green Hydrogen Logo" 
                width={32}
                height={32}
                className="rounded-lg"
              />
              <div>
                <h1 className="text-xl font-bold text-[#23544e]">Neom Green Hydrogen Admin</h1>
                <p className="text-sm text-gray-500">Dashboard Overview</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-3">
                <Image
                  src={session?.user?.image || '/placeholder-avatar.svg'}
                  alt="Profile"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{session?.user?.name}</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md transition-colors text-sm font-medium"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {session?.user?.name?.split(' ')[0]}!</h2>
          <p className="text-gray-600">Here&apos;s what&apos;s happening with your learning platform today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-3xl font-bold text-gray-900">{formatNumber(stats.totalUsers)}</p>
                <div className="flex items-center mt-2">
                  <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600 font-medium">+12.5%</span>
                  <span className="text-sm text-gray-500 ml-1">from last month</span>
                </div>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <UsersIcon className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Courses</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalCourses}</p>
                <div className="flex items-center mt-2">
                  <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600 font-medium">+8.2%</span>
                  <span className="text-sm text-gray-500 ml-1">from last month</span>
                </div>
              </div>
              <div className="p-3 bg-[#23544e]/10 rounded-full">
                <BookOpenIcon className="h-6 w-6 text-[#23544e]" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Enrollments</p>
                <p className="text-3xl font-bold text-gray-900">{formatNumber(stats.totalEnrollments)}</p>
                <div className="flex items-center mt-2">
                  <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600 font-medium">+15.3%</span>
                  <span className="text-sm text-gray-500 ml-1">from last month</span>
                </div>
              </div>
              <div className="p-3 bg-[#0b867a]/10 rounded-full">
                <AcademicCapIcon className="h-6 w-6 text-[#0b867a]" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Revenue</p>
                <p className="text-3xl font-bold text-gray-900">{formatCurrency(stats.revenue)}</p>
                <div className="flex items-center mt-2">
                  <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600 font-medium">+23.1%</span>
                  <span className="text-sm text-gray-500 ml-1">from last month</span>
                </div>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CurrencyDollarIcon className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Enrollment Trends */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Enrollment Trends</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-[#23544e] rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Enrollments</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-[#0b867a] rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Completions</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={enrollmentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="enrollments" 
                  stackId="1"
                  stroke="#23544e" 
                  fill="#23544e"
                  fillOpacity={0.6}
                />
                <Area 
                  type="monotone" 
                  dataKey="completions" 
                  stackId="2"
                  stroke="#0b867a" 
                  fill="#0b867a"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Course Categories */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Course Categories</h3>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {categoryData.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm text-gray-600">{item.name}</span>
                  <span className="text-sm font-medium text-gray-900 ml-auto">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Revenue and User Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Monthly Revenue</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                  formatter={(value) => [formatCurrency(value as number), 'Revenue']}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#0b867a" 
                  strokeWidth={3}
                  dot={{ fill: '#0b867a', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* User Activity */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Daily Active Users</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={userActivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="active" fill="#23544e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Courses and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Performing Courses */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Performing Courses</h3>
            <div className="space-y-4">
              {topCourses.map((course, index) => (
                <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 text-sm">{course.name}</h4>
                    <div className="flex items-center mt-1">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`h-3 w-3 ${
                              i < Math.floor(course.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 ml-1">{course.rating}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{formatNumber(course.enrollments)}</p>
                    <p className="text-xs text-gray-500">enrollments</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
            <div className="grid grid-cols-1 gap-4">
              <button 
                onClick={() => setActiveModal('createCourse')}
                className="flex items-center p-4 bg-[#23544e] text-white rounded-lg hover:bg-[#1d453f] transition-colors"
              >
                <BookOpenIcon className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <p className="font-medium">Create New Course</p>
                  <p className="text-sm text-white/80">Add a new course to the platform</p>
                </div>
              </button>
              
              <button 
                onClick={() => setActiveModal('manageUsers')}
                className="flex items-center p-4 bg-[#0b867a] text-white rounded-lg hover:bg-[#0a766b] transition-colors"
              >
                <UserGroupIcon className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <p className="font-medium">Manage Users</p>
                  <p className="text-sm text-white/80">View and manage user accounts</p>
                </div>
              </button>
              
              <button 
                onClick={() => setActiveModal('detailedReports')}
                className="flex items-center p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <ChartBarIcon className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <p className="font-medium">View Detailed Reports</p>
                  <p className="text-sm text-white/80">Access comprehensive analytics</p>
                </div>
              </button>
              
              <button 
                onClick={() => setActiveModal('platformSettings')}
                className="flex items-center p-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Cog6ToothIcon className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <p className="font-medium">Platform Settings</p>
                  <p className="text-sm text-white/80">Configure system preferences</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      {activeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            
            {/* Create Course Modal */}
            {activeModal === 'createCourse' && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-[#23544e] flex items-center">
                    <PlusIcon className="h-6 w-6 mr-2" />
                    Create New Course
                  </h2>
                  <button 
                    onClick={() => setActiveModal(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                
                <form onSubmit={handleCreateCourse} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Course Title</label>
                      <input
                        type="text"
                        required
                        value={newCourse.title}
                        onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#23544e]"
                        placeholder="Enter course title"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                      <select
                        value={newCourse.category}
                        onChange={(e) => setNewCourse({...newCourse, category: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#23544e]"
                      >
                        <option value="Programming">Programming</option>
                        <option value="Data Science">Data Science</option>
                        <option value="Design">Design</option>
                        <option value="Business">Business</option>
                        <option value="Marketing">Marketing</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                      <select
                        value={newCourse.level}
                        onChange={(e) => setNewCourse({...newCourse, level: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#23544e]"
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={newCourse.price}
                        onChange={(e) => setNewCourse({...newCourse, price: parseFloat(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#23544e]"
                        placeholder="0.00"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                      <input
                        type="text"
                        required
                        value={newCourse.duration}
                        onChange={(e) => setNewCourse({...newCourse, duration: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#23544e]"
                        placeholder="e.g., 4 hours, 10 weeks"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      required
                      rows={4}
                      value={newCourse.description}
                      onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#23544e]"
                      placeholder="Enter course description"
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => setActiveModal(null)}
                      className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-[#23544e] text-white rounded-lg hover:bg-[#1d453f]"
                    >
                      Create Course
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Manage Users Modal */}
            {activeModal === 'manageUsers' && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-[#23544e] flex items-center">
                    <UserGroupIcon className="h-6 w-6 mr-2" />
                    Manage Users
                  </h2>
                  <button 
                    onClick={() => setActiveModal(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="mb-4">
                  <div className="relative">
                    <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#23544e]"
                    />
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full table-auto">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Name</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Email</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Role</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Department</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Joined</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900">{user.name}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{user.email}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                              user.role === 'ADMIN' ? 'bg-red-100 text-red-800' :
                              user.role === 'INSTRUCTOR' ? 'bg-blue-100 text-blue-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">{user.department}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{user.createdAt}</td>
                          <td className="px-4 py-3">
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-800">
                                <PencilIcon className="h-4 w-4" />
                              </button>
                              <button 
                                onClick={() => handleDeleteUser(user.id)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <TrashIcon className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Detailed Reports Modal */}
            {activeModal === 'detailedReports' && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-[#23544e] flex items-center">
                    <ChartBarIcon className="h-6 w-6 mr-2" />
                    Detailed Analytics Reports
                  </h2>
                  <button 
                    onClick={() => setActiveModal(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl">
                    <h3 className="text-lg font-semibold mb-2">User Engagement</h3>
                    <p className="text-3xl font-bold">87.2%</p>
                    <p className="text-sm opacity-90">Average completion rate</p>
                  </div>
                  <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl">
                    <h3 className="text-lg font-semibold mb-2">Revenue Growth</h3>
                    <p className="text-3xl font-bold">+23.4%</p>
                    <p className="text-sm opacity-90">Month over month</p>
                  </div>
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl">
                    <h3 className="text-lg font-semibold mb-2">New Signups</h3>
                    <p className="text-3xl font-bold">1,247</p>
                    <p className="text-sm opacity-90">This month</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Performance</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900">Top Performing Category</h4>
                        <p className="text-2xl font-bold text-[#23544e]">Programming</p>
                        <p className="text-sm text-gray-600">2,145 total enrollments</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900">Average Course Rating</h4>
                        <p className="text-2xl font-bold text-[#0b867a]">4.8/5</p>
                        <p className="text-sm text-gray-600">Based on 15,678 reviews</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">User Demographics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900">65%</p>
                        <p className="text-sm text-gray-600">Students</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900">30%</p>
                        <p className="text-sm text-gray-600">Professionals</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900">5%</p>
                        <p className="text-sm text-gray-600">Instructors</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Platform Settings Modal */}
            {activeModal === 'platformSettings' && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-[#23544e] flex items-center">
                    <Cog6ToothIcon className="h-6 w-6 mr-2" />
                    Platform Settings
                  </h2>
                  <button 
                    onClick={() => setActiveModal(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">General Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Platform Name</label>
                        <input
                          type="text"
                          value={settings.platformName}
                          onChange={(e) => setSettings({...settings, platformName: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#23544e]"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">User Management</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">Allow User Registration</h4>
                          <p className="text-sm text-gray-600">Allow new users to register accounts</p>
                        </div>
                        <button
                          onClick={() => setSettings({...settings, allowRegistration: !settings.allowRegistration})}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            settings.allowRegistration ? 'bg-[#23544e]' : 'bg-gray-200'
                          }`}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            settings.allowRegistration ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">Email Notifications</h4>
                          <p className="text-sm text-gray-600">Send email notifications to users</p>
                        </div>
                        <button
                          onClick={() => setSettings({...settings, emailNotifications: !settings.emailNotifications})}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            settings.emailNotifications ? 'bg-[#23544e]' : 'bg-gray-200'
                          }`}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">Auto Enrollment</h4>
                          <p className="text-sm text-gray-600">Automatically enroll users in recommended courses</p>
                        </div>
                        <button
                          onClick={() => setSettings({...settings, autoEnrollment: !settings.autoEnrollment})}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            settings.autoEnrollment ? 'bg-[#23544e]' : 'bg-gray-200'
                          }`}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            settings.autoEnrollment ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">Certificates Enabled</h4>
                          <p className="text-sm text-gray-600">Allow users to earn completion certificates</p>
                        </div>
                        <button
                          onClick={() => setSettings({...settings, certificateEnabled: !settings.certificateEnabled})}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            settings.certificateEnabled ? 'bg-[#23544e]' : 'bg-gray-200'
                          }`}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            settings.certificateEnabled ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">System</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">Maintenance Mode</h4>
                          <p className="text-sm text-gray-600">Put the platform in maintenance mode</p>
                        </div>
                        <button
                          onClick={() => setSettings({...settings, maintenanceMode: !settings.maintenanceMode})}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            settings.maintenanceMode ? 'bg-red-500' : 'bg-gray-200'
                          }`}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            settings.maintenanceMode ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-4 pt-6 border-t">
                    <button
                      onClick={() => setActiveModal(null)}
                      className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveSettings}
                      className="px-6 py-2 bg-[#23544e] text-white rounded-lg hover:bg-[#1d453f]"
                    >
                      Save Settings
                    </button>
                  </div>
                </div>
              </div>
            )}
            
          </div>
        </div>
      )}
    </div>
  )
} 