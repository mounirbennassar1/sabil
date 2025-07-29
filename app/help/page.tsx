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
  QuestionMarkCircleIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  PhoneIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline'

interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  isExpanded: boolean
}

export default function HelpPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const sidebarItems = [
    { name: 'Home', href: '/dashboard', icon: HomeIcon, current: false },
    { name: 'My Career Journey', href: '/career', icon: BriefcaseIcon, current: false },
    { name: 'Learn', href: '/learn', icon: BookOpenIcon, current: false, isSection: true },
    { name: 'My Library', href: '/library', icon: HeartIcon, current: false },
    { name: 'Content', href: '/content', icon: StarIcon, current: false },
    { name: 'Apply AI', href: '/ai', icon: SparklesIcon, current: false, isSection: true },
    { name: 'Coding Practice', href: '/coding', icon: CpuChipIcon, current: false },
    { name: 'Certifications', href: '/certificates', icon: AcademicCapIcon, current: false },
    { name: 'Help & Support', href: '/help', icon: QuestionMarkCircleIcon, current: true },
  ]

  const categories = ['All', 'Getting Started', 'Courses', 'Technical Issues', 'Billing', 'Certificates']

  useEffect(() => {
    if (!session) {
      router.push('/auth/signin')
      return
    }

    // Mock FAQ data
    const mockFAQs: FAQ[] = [
      {
        id: '1',
        question: 'How do I enroll in a course?',
        answer: 'To enroll in a course, navigate to the course page and click the "Start Learning" button. You will be automatically enrolled and can begin learning immediately.',
        category: 'Getting Started',
        isExpanded: false
      },
      {
        id: '2',
        question: 'Why are YouTube videos not loading?',
        answer: 'If YouTube videos are not loading, this could be due to network issues or browser restrictions. Try refreshing the page, checking your internet connection, or disabling ad blockers.',
        category: 'Technical Issues',
        isExpanded: false
      },
      {
        id: '3',
        question: 'How do I download my certificates?',
        answer: 'Once you complete a course, you can download your certificate from the Certificates page. Click on the certificate you want to download and select "Download PDF".',
        category: 'Certificates',
        isExpanded: false
      },
      {
        id: '4',
        question: 'Can I access courses offline?',
        answer: 'Currently, our courses require an internet connection to access video content and interactive features. We are working on offline functionality for future updates.',
        category: 'Courses',
        isExpanded: false
      },
      {
        id: '5',
        question: 'How do I reset my password?',
        answer: 'To reset your password, go to the sign-in page and click "Forgot Password". Enter your email address and follow the instructions sent to your email.',
        category: 'Getting Started',
        isExpanded: false
      },
      {
        id: '6',
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for course purchases.',
        category: 'Billing',
        isExpanded: false
      }
    ]

    setFaqs(mockFAQs)
    setLoading(false)
  }, [session, router])

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const toggleFAQ = (faqId: string) => {
    setFaqs(prev => prev.map(faq =>
      faq.id === faqId ? { ...faq, isExpanded: !faq.isExpanded } : faq
    ))
  }

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
                    <QuestionMarkCircleIcon className="h-6 w-6 text-[#23544e]" />
                    <h1 className="text-xl font-bold text-gray-900">Help & Support</h1>
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

          {/* Help content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-4xl mx-auto">
              {/* Welcome section */}
              <div className="bg-gradient-to-r from-[#23544e] to-[#0b867a] rounded-lg text-white p-8 mb-8">
                <h2 className="text-2xl font-bold mb-4">How can we help you?</h2>
                <p className="text-lg opacity-90 mb-6">
                  Find answers to common questions or get in touch with our support team.
                </p>
                
                {/* Search bar */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for help articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                </div>
              </div>

              {/* Quick actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow p-6 text-center">
                  <ChatBubbleLeftRightIcon className="h-12 w-12 text-[#23544e] mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Live Chat</h3>
                  <p className="text-gray-600 text-sm mb-4">Chat with our support team in real-time</p>
                  <button className="bg-[#23544e] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#1d453f] transition-colors">
                    Start Chat
                  </button>
                </div>
                
                <div className="bg-white rounded-lg shadow p-6 text-center">
                  <EnvelopeIcon className="h-12 w-12 text-[#23544e] mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Email Support</h3>
                                     <p className="text-gray-600 text-sm mb-4">Send us an email and we&apos;ll respond within 24 hours</p>
                  <button className="bg-[#23544e] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#1d453f] transition-colors">
                    Send Email
                  </button>
                </div>
                
                <div className="bg-white rounded-lg shadow p-6 text-center">
                  <DocumentTextIcon className="h-12 w-12 text-[#23544e] mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Documentation</h3>
                  <p className="text-gray-600 text-sm mb-4">Browse our comprehensive documentation</p>
                  <button className="bg-[#23544e] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#1d453f] transition-colors">
                    View Docs
                  </button>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Frequently Asked Questions</h3>
                  
                  {/* Category filter */}
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                          selectedCategory === category
                            ? 'bg-[#23544e] text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="p-6">
                  {filteredFAQs.length === 0 ? (
                    <div className="text-center py-8">
                      <QuestionMarkCircleIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">No FAQs found matching your search.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredFAQs.map((faq) => (
                        <div key={faq.id} className="border border-gray-200 rounded-lg">
                          <button
                            onClick={() => toggleFAQ(faq.id)}
                            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
                          >
                            <span className="font-medium text-gray-900">{faq.question}</span>
                            <ChevronDownIcon 
                              className={`h-5 w-5 text-gray-400 transition-transform ${
                                faq.isExpanded ? 'transform rotate-180' : ''
                              }`} 
                            />
                          </button>
                          
                          {faq.isExpanded && (
                            <div className="px-4 pb-4 border-t border-gray-200">
                              <p className="text-gray-600 mt-2">{faq.answer}</p>
                              <span className="inline-block mt-2 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                                {faq.category}
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Contact info */}
              <div className="mt-8 bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Still need help?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-3">
                    <EnvelopeIcon className="h-6 w-6 text-[#23544e]" />
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <p className="text-gray-600">support@neongh.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <PhoneIcon className="h-6 w-6 text-[#23544e]" />
                    <div>
                      <p className="font-medium text-gray-900">Phone</p>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 