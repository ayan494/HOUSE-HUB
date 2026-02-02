"use client"

import { useState, useEffect } from 'react'
import { ProfileForm } from '@/components/profile-form'
import { getCurrentUser, updateUser } from '@/lib/store'
import type { User } from '@/lib/types'
import { Loader2 } from 'lucide-react'

export default function OwnerProfilePage() {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const currentUser = getCurrentUser()
        setUser(currentUser)
        setIsLoading(false)
    }, [])

    const handleUpdate = async (data: Partial<User>) => {
        if (user) {
            updateUser(user.id, data)
            // Refresh user data
            setUser(getCurrentUser())
        }
    }

    if (isLoading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        )
    }

    if (!user) return null

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-foreground">Owner Profile</h1>
                <p className="text-muted-foreground mt-1">
                    Manage your owner account details and contact information.
                </p>
            </div>

            <ProfileForm user={user} onUpdate={handleUpdate} />
        </div>
    )
}
