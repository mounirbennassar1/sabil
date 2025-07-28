import { PrismaClient } from '../app/generated/prisma'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seeding...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('Admin@123123', 12)
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@neongreenhydrogen.com' },
    update: {},
    create: {
      email: 'admin@neongreenhydrogen.com',
      name: 'Neon Green Hydrogen Admin',
      password: hashedPassword,
      role: 'ADMIN',
      department: 'IT',
      position: 'System Administrator'
    }
  })

  console.log('Admin user created:', admin.email)

  // Create student user
  const studentPassword = await bcrypt.hash('Ahmad@123123', 12)
  
  const student = await prisma.user.upsert({
    where: { email: 'ahmad@neongreenhydrogen.com' },
    update: {},
    create: {
      email: 'ahmad@neongreenhydrogen.com',
      name: 'Ahmad Abdullah',
      password: studentPassword,
      role: 'STUDENT',
      department: 'Engineering',
      position: 'Software Developer'
    }
  })

  console.log('Student user created:', student.email)

  // Create sample categories
  const categories = [
    {
      name: 'Leadership & Management',
      description: 'Develop leadership skills and management capabilities',
      color: '#23544e',
      icon: '👑'
    },
    {
      name: 'Technical Skills',
      description: 'Enhance your technical expertise and knowledge',
      color: '#0b867a',
      icon: '💻'
    },
    {
      name: 'Communication',
      description: 'Improve communication and interpersonal skills',
      color: '#4a90e2',
      icon: '💬'
    },
    {
      name: 'Compliance & Safety',
      description: 'Stay updated with compliance requirements and safety protocols',
      color: '#f39c12',
      icon: '🛡️'
    },
    {
      name: 'Professional Development',
      description: 'Advance your career with professional development courses',
      color: '#e74c3c',
      icon: '📈'
    }
  ]

  const createdCategories = []
  for (const categoryData of categories) {
    const category = await prisma.category.upsert({
      where: { name: categoryData.name },
      update: {},
      create: categoryData
    })
    createdCategories.push(category)
  }

  console.log('Sample categories created')

  // Create sample courses
  const sampleCourses = [
    {
      title: 'Leadership Fundamentals',
      description: 'Master the essential skills needed to lead teams effectively in today\'s dynamic workplace.',
      content: 'This comprehensive course covers leadership principles, team motivation, conflict resolution, and strategic thinking.',
      thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      duration: 240, // 4 hours
      level: 'BEGINNER',
      status: 'PUBLISHED',
      categoryName: 'Leadership & Management'
    },
    {
      title: 'Advanced Project Management',
      description: 'Learn advanced project management methodologies including Agile, Scrum, and traditional waterfall approaches.',
      content: 'Dive deep into project planning, risk management, stakeholder communication, and delivery optimization.',
      thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      duration: 360, // 6 hours
      level: 'ADVANCED',
      status: 'PUBLISHED',
      categoryName: 'Leadership & Management'
    },
    {
      title: 'JavaScript ES6+ Mastery',
      description: 'Master modern JavaScript features and build robust web applications with ES6+ syntax.',
      content: 'Learn arrow functions, destructuring, modules, async/await, and other modern JavaScript features.',
      thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      duration: 480, // 8 hours
      level: 'INTERMEDIATE',
      status: 'PUBLISHED',
      categoryName: 'Technical Skills'
    },
    {
      title: 'React Development Bootcamp',
      description: 'Build dynamic user interfaces with React, including hooks, context, and modern development patterns.',
      content: 'Complete React course covering components, state management, routing, and integration with APIs.',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      duration: 600, // 10 hours
      level: 'INTERMEDIATE',
      status: 'PUBLISHED',
      categoryName: 'Technical Skills'
    },
    {
      title: 'Effective Communication Skills',
      description: 'Enhance your verbal and written communication skills for professional success.',
      content: 'Develop clear communication strategies, active listening skills, and presentation techniques.',
      thumbnail: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      duration: 180, // 3 hours
      level: 'BEGINNER',
      status: 'PUBLISHED',
      categoryName: 'Communication'
    },
    {
      title: 'Public Speaking Mastery',
      description: 'Overcome fear and deliver compelling presentations with confidence and impact.',
      content: 'Learn presentation structure, audience engagement, vocal techniques, and handling Q&A sessions.',
      thumbnail: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      duration: 300, // 5 hours
      level: 'INTERMEDIATE',
      status: 'PUBLISHED',
      categoryName: 'Communication'
    },
    {
      title: 'Workplace Safety Protocols',
      description: 'Essential safety training for maintaining a secure and compliant workplace environment.',
      content: 'Comprehensive safety guidelines, emergency procedures, and regulatory compliance requirements.',
      thumbnail: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      duration: 120, // 2 hours
      level: 'BEGINNER',
      status: 'PUBLISHED',
      categoryName: 'Compliance & Safety'
    },
    {
      title: 'Career Development Planning',
      description: 'Create a strategic plan for your professional growth and career advancement.',
      content: 'Goal setting, skill assessment, networking strategies, and personal branding techniques.',
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      duration: 240, // 4 hours
      level: 'BEGINNER',
      status: 'PUBLISHED',
      categoryName: 'Professional Development'
    },
    {
      title: 'Time Management Excellence',
      description: 'Maximize productivity with proven time management techniques and tools.',
      content: 'Priority setting, delegation strategies, productivity tools, and work-life balance optimization.',
      thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      duration: 180, // 3 hours
      level: 'BEGINNER',
      status: 'PUBLISHED',
      categoryName: 'Professional Development'
    }
  ]

  for (const courseData of sampleCourses) {
    const category = createdCategories.find(cat => cat.name === courseData.categoryName)
    if (category) {
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
    }
  }

  console.log('Sample courses created')
  console.log('Seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 