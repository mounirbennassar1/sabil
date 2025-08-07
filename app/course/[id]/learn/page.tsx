"use client"

import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {
  HomeIcon,
  BriefcaseIcon,
  BookOpenIcon,
  HeartIcon,
  StarIcon,
  PlayIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  CheckIcon,
  ClockIcon,
  UsersIcon,
  LockClosedIcon as LockClosedIconSolid
} from '@heroicons/react/24/outline'
import coursesData from '@/scripts/couses_seed.json'

interface CourseLesson {
  id: string
  title: string
  duration: string
  type: 'video' | 'quiz' | 'document'
  isCompleted: boolean
  isLocked: boolean
  videoUrl?: string
  isPreview?: boolean
}

interface CourseChapter {
  id: string
  title: string
  lessons: CourseLesson[]
  isExpanded: boolean
}

interface CourseData {
  id: number
  title: string
  description: string
  long_description: string
  thumbnail: string
  duration: string
  level: string
  category: string
  price: number
  rating: number
  total_reviews: number
  total_students: number
  instructor: {
    name: string
    bio: string
    profile_picture: string
  }
  sections: Array<{
    title: string
    lectures: Array<{
      title: string
      duration: string
      video_url?: string
      is_preview?: boolean
    }>
  }>
  requirements?: string[]
  what_you_will_learn?: string[]
}

// Helper function to convert YouTube watch URL to embed URL
const convertToEmbedUrl = (url: string): string => {
  if (!url) return ''
  
  // Extract video ID from various YouTube URL formats
  let videoId = ''
  
  if (url.includes('youtube.com/watch?v=')) {
    videoId = url.split('v=')[1]?.split('&')[0]
  } else if (url.includes('youtu.be/')) {
    videoId = url.split('youtu.be/')[1]?.split('?')[0]
  } else if (url.includes('youtube.com/embed/')) {
    return url // Already an embed URL
  }
  
  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}`
  }
  
  return url // Return original URL if conversion fails
}

// Transform course data to chapters format
const transformCourseToChapters = (courseData: CourseData): CourseChapter[] => {
  return courseData.sections?.map((section: { title: string; lectures: Array<{ title: string; duration: string; video_url?: string; is_preview?: boolean }> }, sectionIndex: number) => ({
    id: `chapter-${sectionIndex}`,
    title: section.title,
    isExpanded: sectionIndex === 0, // First chapter expanded by default
    lessons: section.lectures?.map((lecture: { title: string; duration: string; video_url?: string; is_preview?: boolean }, lectureIndex: number) => ({
      id: `${sectionIndex}-${lectureIndex}`,
      title: lecture.title,
      duration: lecture.duration,
      type: 'video' as const,
      isCompleted: sectionIndex === 0 && lectureIndex === 0, // First lesson completed
      isLocked: !(sectionIndex === 0 && lectureIndex <= 1), // First two lessons unlocked
      videoUrl: convertToEmbedUrl(lecture.video_url || ''),
      isPreview: lecture.is_preview
    })) || []
  })) || []
}

export default function LearnPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const params = useParams()
  const videoRef = useRef<HTMLIFrameElement>(null)
  
  const [chapters, setChapters] = useState<CourseChapter[]>([])
  const [currentLesson, setCurrentLesson] = useState<CourseLesson | null>(null)
  const [courseData, setCourseData] = useState<CourseData | null>(null)

  useEffect(() => {
    if (!session) {
      router.push('/auth/signin')
      return
    }

    // Load course data from JSON
    const course = coursesData.courses.find(c => c.id.toString() === params.id)
    if (course) {
      setCourseData(course)
      const transformedChapters = transformCourseToChapters(course)
      setChapters(transformedChapters)
      
      // Set first lesson as current
      if (transformedChapters.length > 0 && transformedChapters[0].lessons.length > 0) {
        setCurrentLesson(transformedChapters[0].lessons[0])
      }
    }
  }, [session, router, params.id])

  const toggleChapter = (chapterId: string) => {
    setChapters(prev => prev.map(chapter =>
      chapter.id === chapterId
        ? { ...chapter, isExpanded: !chapter.isExpanded }
        : chapter
    ))
  }

  const selectLesson = (lesson: CourseLesson) => {
    if (lesson.isLocked) {
      alert('This lesson is locked. Complete previous lessons to unlock.')
      return
    }
    setCurrentLesson(lesson)
  }

  const markLessonComplete = (lessonId: string) => {
    setChapters(prev => prev.map(chapter => ({
      ...chapter,
      lessons: chapter.lessons.map(lesson => {
        if (lesson.id === lessonId) {
          const updatedLesson = { ...lesson, isCompleted: true }
          
                     // Unlock next lesson
           const [, lessonIndex] = lessonId.split('-').map(Number)
           const nextLessonIndex = lessonIndex + 1
          
          // Find next lesson in current chapter or next chapter
          chapter.lessons.forEach((nextLesson, idx) => {
            if (idx === nextLessonIndex) {
              nextLesson.isLocked = false
            }
          })
          
          return updatedLesson
        }
        return lesson
      })
    })))
  }

  const sidebarItems = [
    { name: 'Home', href: '/dashboard', icon: HomeIcon, current: false },
    { name: 'My Career Journey', href: '/dashboard?tab=career', icon: BriefcaseIcon, current: false },
    { name: 'Learn', href: '/dashboard?tab=learn', icon: BookOpenIcon, current: true },
    { name: 'My Library', href: '/dashboard?tab=library', icon: HeartIcon, current: false },
    { name: 'Content', href: '/dashboard?tab=content', icon: StarIcon, current: false },
  ]

  if (!courseData) {
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
                <div className="hidden lg:block text-sm text-gray-500">
                  Learning Platform
                </div>
              </div>
              <nav className="mt-5 flex-1 px-2 space-y-1">
                {sidebarItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                      item.current
                        ? 'bg-[#23544e] text-white'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <item.icon
                      className={`mr-3 flex-shrink-0 h-5 w-5 ${
                        item.current ? 'text-white' : 'text-gray-400 group-hover:text-gray-500'
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
                  <div className="hidden lg:block text-sm text-gray-500">
                    Learning Platform
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

          {/* Course content */}
          <div className="flex-1 flex overflow-hidden">
            {/* Video/Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="bg-black">
                {currentLesson?.videoUrl ? (
                  <iframe
                    ref={videoRef}
                    src={currentLesson.videoUrl}
                    className="w-full h-[50vh] md:h-[60vh]"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={currentLesson.title}
                  ></iframe>
                ) : (
                  <div className="w-full h-[50vh] md:h-[60vh] flex items-center justify-center text-white">
                    <div className="text-center">
                      <PlayIcon className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">No video available</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Course info and controls */}
              <div className="bg-white p-6 border-b">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{currentLesson?.title}</h1>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        {currentLesson?.duration}
                      </span>
                                             <span className="flex items-center">
                         <UsersIcon className="h-4 w-4 mr-1" />
                         {courseData.total_students.toLocaleString()} students
                       </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    {currentLesson && !currentLesson.isCompleted && (
                      <button
                        onClick={() => markLessonComplete(currentLesson.id)}
                        className="bg-[#23544e] text-white px-4 py-2 rounded-lg hover:bg-[#1d453f] transition-colors"
                      >
                        Mark Complete
                      </button>
                    )}
                    {currentLesson?.isCompleted && (
                      <span className="flex items-center text-green-600">
                        <CheckIcon className="h-5 w-5 mr-1" />
                        Completed
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Course info below video */}
              <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
                {/* Instructor Information */}
                <div className="bg-white rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Instructor Information</h3>
                  <div className="flex items-start space-x-4">
                    <Image
                      src={courseData.instructor.profile_picture}
                      alt={courseData.instructor.name}
                      width={80}
                      height={80}
                      className="rounded-full"
                    />
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-gray-900">{courseData.instructor.name}</h4>
                      <p className="text-gray-600 mt-2">{courseData.instructor.bio}</p>
                      <div className="flex items-center space-x-4 mt-3">
                                                 <div className="flex items-center">
                           <StarIcon className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                           <span className="text-sm font-medium">{courseData.rating}</span>
                         </div>
                         <div className="flex items-center">
                           <UsersIcon className="h-4 w-4 text-gray-400 mr-1" />
                           <span className="text-sm text-gray-600">{courseData.total_students.toLocaleString()} students</span>
                         </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* About this Course */}
                <div className="bg-white rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">About this Course</h3>
                  <p className="text-gray-700 mb-4">{courseData.description}</p>
                  <p className="text-gray-600">{courseData.long_description}</p>
                </div>

                {/* Student Reviews */}
                <div className="bg-white rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Reviews</h3>
                  
                  {/* Overall Rating */}
                  <div className="flex items-center space-x-4 mb-6 pb-6 border-b">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-gray-900">{courseData.rating}</div>
                      <div className="flex items-center justify-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`h-5 w-5 ${
                              i < Math.floor(courseData.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">Course Rating</div>
                    </div>
                    <div className="flex-1">
                                             <p className="text-gray-600">Based on {courseData.total_students.toLocaleString()} student reviews</p>
                    </div>
                  </div>

                  {/* Sample Reviews */}
                  <div className="space-y-6">
                    <div className="flex items-start space-x-3">
                      <Image
                        src="/placeholder-avatar.svg"
                        alt="Student"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-medium text-gray-900">Sarah Johnson</h4>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <StarIcon key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700">Excellent course! The instructor explains complex concepts in a very clear and easy-to-understand manner. I&apos;ve learned so much and feel confident applying these skills in my work.</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Image
                        src="/placeholder-avatar.svg"
                        alt="Student"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-medium text-gray-900">Michael Chen</h4>
                          <div className="flex items-center">
                            {[...Array(4)].map((_, i) => (
                              <StarIcon key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                            ))}
                            <StarIcon className="h-4 w-4 text-gray-300" />
                          </div>
                        </div>
                        <p className="text-gray-700">Great course with practical examples. The hands-on approach really helped me understand the concepts better. Would definitely recommend to anyone looking to improve their skills.</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Image
                        src="/placeholder-avatar.svg"
                        alt="Student"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-medium text-gray-900">Emily Davis</h4>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <StarIcon key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700">Outstanding content and presentation. The course is well-structured and the instructor is very knowledgeable. I&apos;ve already started implementing what I learned in my current projects.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Curriculum Sidebar */}
            <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Course Content</h2>
                <p className="text-sm text-gray-500 mt-1">
                  {chapters.reduce((total, chapter) => total + chapter.lessons.length, 0)} lessons
                </p>
              </div>

              <div className="p-4 space-y-4">
                {chapters.map((chapter) => (
                  <div key={chapter.id} className="border border-gray-200 rounded-lg">
                    <button
                      onClick={() => toggleChapter(chapter.id)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
                    >
                      <span className="font-medium text-gray-900">{chapter.title}</span>
                      {chapter.isExpanded ? (
                        <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                      )}
                    </button>

                    {chapter.isExpanded && (
                      <div className="border-t border-gray-200">
                        {chapter.lessons.map((lesson) => (
                          <button
                            key={lesson.id}
                            onClick={() => selectLesson(lesson)}
                            className={`w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 ${
                              currentLesson?.id === lesson.id ? 'bg-blue-50 border-l-4 border-l-[#23544e]' : ''
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <div className="flex-shrink-0">
                                {lesson.isCompleted ? (
                                  <CheckIcon className="h-5 w-5 text-green-500" />
                                ) : lesson.isLocked ? (
                                  <LockClosedIconSolid className="h-5 w-5 text-gray-400" />
                                ) : (
                                  <PlayIcon className="h-5 w-5 text-[#23544e]" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className={`text-sm font-medium ${
                                  lesson.isLocked ? 'text-gray-400' : 'text-gray-900'
                                }`}>
                                  {lesson.title}
                                </p>
                                <p className="text-xs text-gray-500">{lesson.duration}</p>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 