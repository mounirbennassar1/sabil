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
  UserIcon,
  CpuChipIcon,
  DocumentIcon,
  CalendarIcon,
  CheckBadgeIcon,
  ClockIcon
} from '@heroicons/react/24/outline'

interface Certificate {
  id: string
  courseName: string
  completedDate: string
  certificateNumber: string
  instructorName: string
  courseDuration: string
  thumbnail: string
}

export default function CertificatesPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)

  const sidebarItems = [
    { name: 'Home', href: '/dashboard', icon: HomeIcon, current: false },
    { name: 'My Career Journey', href: '/career', icon: BriefcaseIcon, current: false },
    { name: 'Learn', href: '/learn', icon: BookOpenIcon, current: false, isSection: true },
    { name: 'My Library', href: '/library', icon: HeartIcon, current: false },
    { name: 'Content', href: '/content', icon: StarIcon, current: false },
    { name: 'Apply AI', href: '/ai', icon: SparklesIcon, current: false, isSection: true },
    { name: 'Coding Practice', href: '/coding', icon: CpuChipIcon, current: false },
    { name: 'Certifications', href: '/certificates', icon: AcademicCapIcon, current: true },
  ]

  useEffect(() => {
    if (!session) {
      router.push('/auth/signin')
      return
    }

    // Mock certificates data
    const mockCertificates: Certificate[] = [
      {
        id: '1',
        courseName: 'Complete Web Development Bootcamp',
        completedDate: '2024-01-15',
        certificateNumber: 'SABIL-2024-WEB001',
        instructorName: 'John Smith',
        courseDuration: '32 hours',
        thumbnail: '/logo.png'
      },
      {
        id: '2',
        courseName: 'Advanced JavaScript Programming',
        completedDate: '2024-02-20',
        certificateNumber: 'SABIL-2024-JS002',
        instructorName: 'Sarah Johnson',
        courseDuration: '24 hours',
        thumbnail: '/logo.png'
      }
    ]

    setCertificates(mockCertificates)
    setLoading(false)
  }, [session, router])

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#23544e]"></div>
      </div>
    )
  }

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
                    <AcademicCapIcon className="h-6 w-6 text-[#23544e]" />
                    <h1 className="text-xl font-bold text-gray-900">My Certificates</h1>
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

          {/* Certificates content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-6xl mx-auto">
              {/* Header stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <CheckBadgeIcon className="h-12 w-12 text-green-500" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">Completed Courses</p>
                      <p className="text-2xl font-bold text-gray-900">{certificates.length}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <ClockIcon className="h-12 w-12 text-blue-500" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">Total Hours</p>
                      <p className="text-2xl font-bold text-gray-900">56</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <DocumentIcon className="h-12 w-12 text-[#23544e]" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">Certificates</p>
                      <p className="text-2xl font-bold text-gray-900">{certificates.length}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Certificates grid */}
              {certificates.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-12 text-center">
                  <AcademicCapIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No certificates yet</h3>
                  <p className="text-gray-500 mb-6">Complete courses to earn your first certificate!</p>
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#23544e] hover:bg-[#1d453f]"
                  >
                    Browse Courses
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {certificates.map((certificate) => (
                    <div key={certificate.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
                      <div className="p-6">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="flex-shrink-0">
                            <Image
                              src={certificate.thumbnail}
                              alt={certificate.courseName}
                              width={60}
                              height={60}
                              className="rounded-lg"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-medium text-gray-900 truncate">
                              {certificate.courseName}
                            </h3>
                            <p className="text-sm text-gray-500">by {certificate.instructorName}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm text-gray-500">
                            <CalendarIcon className="h-4 w-4 mr-2" />
                            Completed: {new Date(certificate.completedDate).toLocaleDateString()}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <ClockIcon className="h-4 w-4 mr-2" />
                            Duration: {certificate.courseDuration}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <DocumentIcon className="h-4 w-4 mr-2" />
                            #{certificate.certificateNumber}
                          </div>
                        </div>
                        
                        <div className="flex space-x-3">
                          <button className="flex-1 bg-[#23544e] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#1d453f] transition-colors">
                            Download PDF
                          </button>
                          <button className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors">
                            Share
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 