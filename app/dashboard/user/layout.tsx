"use client"

import React from "react"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import { DashboardSidebar } from '@/components/dashboard-sidebar'
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

  const { setTheme } = useTheme()

  useEffect(() => {
    // Force light mode for dashboard
    setTheme('light')

    const currentUser = getCurrentUser()
    if (!currentUser) {
      router.push('/auth/login?redirect=/dashboard/user')
      return
    }
    setUser(currentUser)
    setIsLoading(false)
  }, [router, setTheme])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="flex min-h-screen bg-white">
      <DashboardSidebar role="user" />
      <main className="flex-1 p-3 pt-14 sm:p-4 md:p-6 lg:p-8 overflow-x-hidden bg-white">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
