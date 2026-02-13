"use client"

import React from "react"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { DashboardSidebar } from '@/components/dashboard-sidebar'
import { getCurrentUser } from '@/lib/store'
import type { User } from '@/lib/types'

export default function HistoryLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const currentUser = getCurrentUser()
        if (!currentUser) {
            router.push('/auth/login?redirect=/dashboard/history')
            return
        }
        // Only tenants (user role) should see history
        if (currentUser.role !== 'user') {
            router.push('/dashboard/owner')
            return
        }
        setIsLoading(false)
    }, [router])

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse text-muted-foreground">Loading...</div>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen bg-[#F8FAFC]">
            <DashboardSidebar role="user" />
            <main className="flex-1 p-3 pt-20 sm:p-4 md:p-6 md:pt-6 lg:p-8 overflow-x-hidden">
                <div className="max-w-6xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    )
}
