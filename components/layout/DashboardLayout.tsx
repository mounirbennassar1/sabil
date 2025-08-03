'use client'

import DashboardSidebar from '../sidebar/DashboardSidebar'

interface DashboardLayoutProps {
  children: React.ReactNode
  activeItem?: string
}

export default function DashboardLayout({ children, activeItem }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        <DashboardSidebar activeItem={activeItem} />
        <div className="flex-1 overflow-auto bg-gray-50">
          {children}
        </div>
      </div>
    </div>
  )
}