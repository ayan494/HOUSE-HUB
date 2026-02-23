"use client"

import React from "react"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { DashboardSidebar } from '@/components/dashboard-sidebar'
import { DashboardNavbar } from '@/components/dashboard-navbar'
import { getCurrentUser } from '@/lib/store'
import type { User } from '@/lib/types'

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    // Redirect to home on page refresh
    const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    if (nav?.type === 'reload') {
      router.push('/')
      return
    }

    const currentUser = getCurrentUser()
    if (!currentUser) {
      router.push('/auth/login?redirect=/dashboard/user')
      return
    }
    setUser(currentUser)
    setIsLoading(false)
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] dark:bg-[#020204] transition-colors duration-500 relative">
      {/* Ambient Mood Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 dark:bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 dark:bg-blue-500/20 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      <DashboardSidebar role="user" open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        <DashboardNavbar onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8 pt-24 sm:pt-24 md:pt-24 lg:pt-24 overflow-x-hidden">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
