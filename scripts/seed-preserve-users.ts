import { PrismaClient } from '../app/generated/prisma'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seeding (preserving existing users)...')

  // Check existing data (don't delete, just add new ones)
  console.log('Checking existing data...')
  const existingCategories = await prisma.category.findMany()
  const existingCourses = await prisma.course.findMany()
  console.log(`Found ${existingCategories.length} existing categories and ${existingCourses.length} existing courses`)

  // Create sample categories with images
  const categories = [
    {
      name: 'Leadership & Management',
      description: 'Develop leadership skills and management capabilities',
      color: '#23544e',
      icon: '👑',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      name: 'Technical Skills',
      description: 'Enhance your technical expertise and knowledge',
      color: '#0b867a',
      icon: '💻',
      image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      name: 'Communication',
      description: 'Improve communication and interpersonal skills',
      color: '#4a90e2',
      icon: '💬',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      name: 'Compliance & Safety',
      description: 'Stay updated with compliance requirements and safety protocols',
      color: '#f39c12',
      icon: '🛡️',
      image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      name: 'Professional Development',
      description: 'Advance your career with professional development courses',
      color: '#e74c3c',
      icon: '📈',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ]

  const createdCategories = []
  for (const categoryData of categories) {
    const category = await prisma.category.upsert({
      where: { name: categoryData.name },
      update: {
        description: categoryData.description,
        color: categoryData.color,
        icon: categoryData.icon,
        image: categoryData.image
      },
      create: categoryData
    })
    createdCategories.push(category)
  }

  console.log('Sample categories created')

  // Create sample courses
  const sampleCourses = [
    {
      title: 'Mastering Supervision: Skills and Strategies for Effective Leadership',
      description: 'Develop leadership, manage teams effectively, and enhance organisational performance with this comprehensive free online course.',
      content: 'Are you ready to elevate your leadership skills and take charge of your team\'s success? Embark on this transformative journey, where you\'ll acquire indispensable proficiency in core supervision, team building, performance management, and strategic planning, all while nurturing innovation and personal development.',
      thumbnail: 'https://i.ytimg.com/vi_webp/exDHuEr_low/mqdefault.webp',
      duration: 360,
      level: 'ADVANCED',
      status: 'PUBLISHED',
      categoryName: 'Leadership & Management'
    },
    {
      title: 'Leadership Skills & Remote Team Management',
      description: 'Amp up your ability to manage and lead remote teams by enrolling for this comprehensive free online skills course.',
      content: 'Do you want to improve your leadership skills and manage your business or team remotely? This free course will help you achieve those goals by guiding you through management and decision making, showing you how to take and give feedback, and demonstrating how to manage and defuse potential conflict situations.',
      thumbnail: 'https://cdn01.alison-static.net/courses/6694/alison_courseware_intro_6694.jpg',
      duration: 240,
      level: 'ADVANCED',
      status: 'PUBLISHED',
      categoryName: 'Leadership & Management'
    },
    {
      title: 'Transformational Leadership',
      description: 'Discover cutting-edge tools and strategies that will improve your ability to lead others with this free online course.',
      content: 'This free online Transformational Leadership course will teach you the most effective tips and techniques you can use to improve your relationship with your team, and help your team members become as effective as they can be. Learn from CEO & Celebrity Trainer Prof. Paul Cline.',
      thumbnail: 'https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/8847cbfd-260a-4bba-86fc-aa99911f9e09_wm',
      duration: 360,
      level: 'BEGINNER',
      status: 'PUBLISHED',
      categoryName: 'Leadership & Management'
    },
    {
      title: 'Diploma in Leadership and Management Styles',
      description: 'Study management and leadership principles and how to apply them in business management with this comprehensive diploma course.',
      content: 'Are you in management? Do you want to take your career in management to the next level? This leadership certificate will teach you how to be an effective manager and how to be a good leader. The content provides you with an opportunity to understand and manage yourself and grow as a professional.',
      thumbnail: 'https://i.ytimg.com/vi_webp/c62zJnD_Jr8/mqdefault.webp',
      duration: 720,
      level: 'ADVANCED',
      status: 'PUBLISHED',
      categoryName: 'Leadership & Management'
    },
    {
      title: 'Leadership Skills Training - Become a Successful Leader',
      description: 'Explore leadership, the value of training, and the essential skills that define great leaders in this free online course.',
      content: 'The debate on whether great leaders are born or made highlights the undeniable impact of leadership on personal and organizational growth. This course delves into the importance of training and why prioritizing employee development is essential for every leader.',
      thumbnail: 'https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/b9e1fc41-b347-4bdd-8942-193781c13da7_wm',
      duration: 300,
      level: 'BEGINNER',
      status: 'PUBLISHED',
      categoryName: 'Leadership & Management'
    },
    {
      title: 'Classical Leadership and Decision-Making',
      description: 'Learn the crucial fundamentals of great, effective leadership and decision-making techniques.',
      content: 'If you have always wanted to learn the crucial fundamentals of great, effective leadership, then this free online leadership course is the perfect start. Explore what good management and leadership entails, and how to apply practical methods to better your decision-making skills.',
      thumbnail: 'https://i.ytimg.com/vi_webp/otvPd_Djb5U/mqdefault.webp',
      duration: 240,
      level: 'INTERMEDIATE',
      status: 'PUBLISHED',
      categoryName: 'Leadership & Management'
    },
    {
      title: 'Becoming a Team Leader',
      description: 'Learn transformational leadership skills used to build high-performing teams in today\'s global economy.',
      content: 'In today\'s global economy, finding solutions to complex problems requires smart collaboration and teamwork. This management training course explains the concept of holistic transformational leadership to help you assemble high-performing teams.',
      thumbnail: 'https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/c3139e33-dd99-4732-803f-b92e24a88c63_wm',
      duration: 300,
      level: 'INTERMEDIATE',
      status: 'PUBLISHED',
      categoryName: 'Leadership & Management'
    },
    {
      title: 'Business Management Fundamentals',
      description: 'Master essential business management principles and practices for organizational success.',
      content: 'Comprehensive course covering strategic planning, operational management, financial oversight, and team leadership. Learn to make data-driven decisions and optimize business performance across all organizational levels.',
      thumbnail: 'https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/5e43d288-d371-4241-a12e-a8ea68884846_wm',
      duration: 420,
      level: 'INTERMEDIATE',
      status: 'PUBLISHED',
      categoryName: 'Leadership & Management'
    },
    {
      title: 'Strategic Business Planning',
      description: 'Develop comprehensive business strategies and learn advanced planning methodologies.',
      content: 'Learn to create winning business strategies through market analysis, competitive positioning, and strategic thinking. Master tools for long-term planning, risk assessment, and strategic execution.',
      thumbnail: 'https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/d963d041-335c-4788-b019-cc6933676db3_wm',
      duration: 480,
      level: 'ADVANCED',
      status: 'PUBLISHED',
      categoryName: 'Leadership & Management'
    },
    {
      title: 'Executive Leadership Excellence',
      description: 'Advanced leadership training for senior executives and C-level professionals.',
      content: 'Develop executive presence, strategic vision, and transformational leadership capabilities. Learn to navigate complex organizational challenges and drive sustainable growth.',
      thumbnail: 'https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/d1e330e3-618b-4582-a8ab-960a872f5777_wm',
      duration: 600,
      level: 'ADVANCED',
      status: 'PUBLISHED',
      categoryName: 'Leadership & Management'
    },
    {
      title: 'Digital Marketing Strategy',
      description: 'Master modern digital marketing techniques and build comprehensive marketing campaigns.',
      content: 'Learn SEO, social media marketing, content strategy, email marketing, and analytics. Develop skills to create integrated digital marketing campaigns that drive results and ROI.',
      thumbnail: 'https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/099f64ae-53e4-4627-ae3a-5dad8f18e394_wm',
      duration: 360,
      level: 'INTERMEDIATE',
      status: 'PUBLISHED',
      categoryName: 'Professional Development'
    },
    {
      title: 'Marketing Analytics & Performance',
      description: 'Learn to measure, analyze, and optimize marketing performance using data-driven approaches.',
      content: 'Master Google Analytics, marketing attribution, ROI measurement, and performance optimization. Develop skills to make data-driven marketing decisions and improve campaign effectiveness.',
      thumbnail: 'https://i.ytimg.com/vi_webp/dg5k6ITNlXk/mqdefault.webp',
      duration: 300,
      level: 'INTERMEDIATE',
      status: 'PUBLISHED',
      categoryName: 'Professional Development'
    },
    {
      title: 'Brand Management & Strategy',
      description: 'Develop comprehensive brand strategies and learn to manage brand identity effectively.',
      content: 'Learn brand positioning, brand architecture, and brand communication strategies. Master the art of building strong brands that resonate with target audiences and drive business growth.',
      thumbnail: 'https://cdn01.alison-static.net/courses/6160/alison_courseware_intro_6160.jpg',
      duration: 240,
      level: 'BEGINNER',
      status: 'PUBLISHED',
      categoryName: 'Professional Development'
    },
    {
      title: 'Content Marketing Mastery',
      description: 'Create compelling content strategies that engage audiences and drive conversions.',
      content: 'Learn content planning, creation, distribution, and optimization. Master storytelling techniques, content formats, and platform-specific strategies for maximum engagement.',
      thumbnail: 'https://i.ytimg.com/vi_webp/c85Ypp_d6Vc/mqdefault.webp',
      duration: 280,
      level: 'BEGINNER',
      status: 'PUBLISHED',
      categoryName: 'Professional Development'
    }
  ]

  let coursesAdded = 0
  for (const courseData of sampleCourses) {
    const category = createdCategories.find(cat => cat.name === courseData.categoryName)
    if (category) {
      // Check if course already exists
      const existingCourse = await prisma.course.findFirst({
        where: { title: courseData.title }
      })
      
      if (!existingCourse) {
        await prisma.course.create({
          data: {
            title: courseData.title,
            description: courseData.description,
            content: courseData.content,
            thumbnail: courseData.thumbnail,
            duration: courseData.duration,
            level: courseData.level as any,
            status: courseData.status as any,
            categoryId: category.id
          }
        })
        coursesAdded++
        console.log(`Added course: "${courseData.title}"`)
      } else {
        console.log(`Course "${courseData.title}" already exists, skipping...`)
      }
    }
  }

  // Get final counts
  const [finalCategoriesCount, finalCoursesCount] = await Promise.all([
    prisma.category.count(),
    prisma.course.count()
  ])

  console.log(`Seeding completed successfully!`)
  console.log(`- Existing courses: ${existingCourses.length}`)
  console.log(`- Added new courses: ${coursesAdded}`)
  console.log(`- Total courses now: ${finalCoursesCount}`)
  console.log(`- Total categories: ${finalCategoriesCount}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })