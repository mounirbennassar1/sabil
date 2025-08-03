'use client'

import Image from 'next/image'

export default function TestCategoriesPage() {
  const categories = [
    {
      id: 'test-1',
      name: 'Leadership & Management',
      description: 'Develop leadership skills and management capabilities',
      icon: '👑',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      courseCount: 17,
      totalStudents: 8500,
      status: 'Active'
    },
    {
      id: 'test-2',
      name: 'Technical Skills',
      description: 'Enhance your technical expertise and knowledge',
      icon: '💻',
      image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      courseCount: 8,
      totalStudents: 2400,
      status: 'Active'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold mb-8">Course Categories Test</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            {/* Category Image */}
            <div className="relative h-48 rounded-t-lg overflow-hidden">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="text-2xl">{category.icon}</span>
              </div>
              <div className="absolute top-4 right-4">
                <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                  {category.status}
                </span>
              </div>
            </div>

            {/* Category Content */}
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h3>
              <p className="text-gray-600 mb-4">{category.description}</p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#23544e]">{category.courseCount}</p>
                  <p className="text-sm text-gray-600">Courses</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#23544e]">{category.totalStudents.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Students</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}