'use client'

import TalentLayout from '../../../components/layout/TalentLayout'
import {
  UserGroupIcon,
  ChartBarIcon,
  TrophyIcon
} from '@heroicons/react/24/outline'

export default function DemoPage() {
  return (
    <TalentLayout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Demo: Unified Sidebar</h1>
            <p className="mt-2 text-gray-600">
              This page demonstrates the new unified, scrollable sidebar implementation
            </p>
          </div>

          {/* Benefits Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <UserGroupIcon className="h-8 w-8 text-[#23544e]" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Unified Navigation</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Single source of truth for all sidebar navigation across the platform
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <ChartBarIcon className="h-8 w-8 text-[#23544e]" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Optimized Scrolling</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Proper overflow handling ensures the sidebar scrolls smoothly
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <TrophyIcon className="h-8 w-8 text-[#23544e]" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Mobile Responsive</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Touch-friendly mobile menu with overlay and backdrop
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Implementation Guide */}
          <div className="bg-white rounded-lg shadow p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">How to Use the Unified Sidebar</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Step 1: Import the Layout</h3>
                <div className="bg-gray-100 rounded-lg p-4">
                  <code className="text-sm text-gray-800">
                    {`import TalentLayout from '../../../components/layout/TalentLayout'`}
                  </code>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Step 2: Wrap Your Content</h3>
                <div className="bg-gray-100 rounded-lg p-4">
                  <pre className="text-sm text-gray-800">
{`export default function YourPage() {
  return (
    <TalentLayout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Your page content here */}
        </div>
      </div>
    </TalentLayout>
  )
}`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">✅ Benefits</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-[#23544e] rounded-full mr-3 mt-2"></span>
                    <span><strong>Eliminates code duplication</strong> - No more copying sidebar code across pages</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-[#23544e] rounded-full mr-3 mt-2"></span>
                    <span><strong>Automatic active states</strong> - Navigation highlights current page automatically</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-[#23544e] rounded-full mr-3 mt-2"></span>
                    <span><strong>Optimized scrolling</strong> - Sidebar scrolls properly on long navigation lists</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-[#23544e] rounded-full mr-3 mt-2"></span>
                    <span><strong>Mobile responsive</strong> - Touch-friendly hamburger menu with overlay</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-[#23544e] rounded-full mr-3 mt-2"></span>
                    <span><strong>Easy maintenance</strong> - Update navigation in one place, applies everywhere</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Test the Sidebar */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-medium text-blue-900 mb-2">🧪 Test the Sidebar</h3>
            <p className="text-blue-800 mb-4">
              Try the following to see the unified sidebar in action:
            </p>
            <ul className="space-y-2 text-blue-800">
              <li>• Scroll up and down in the sidebar to see smooth scrolling</li>
              <li>• Click on different sections to see automatic active state highlighting</li>
              <li>• On mobile, tap the hamburger menu to see the responsive overlay</li>
              <li>• Navigate to other pages to see consistent navigation structure</li>
            </ul>
          </div>
        </div>
      </div>
    </TalentLayout>
  )
}