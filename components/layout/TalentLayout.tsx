'use client'

import TalentSidebar from '../sidebar/TalentSidebar'

interface TalentLayoutProps {
  children: React.ReactNode
  className?: string
}

export default function TalentLayout({ children, className = '' }: TalentLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <TalentSidebar />
      
      {/* Main content */}
      <div className={`md:pl-64 flex flex-col flex-1 ${className}`}>
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}