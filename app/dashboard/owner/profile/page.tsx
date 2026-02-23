"use client"

import { useState, useEffect } from 'react'
import { ProfileForm } from '@/components/profile-form'
import { getCurrentUser, updateUser } from '@/lib/store'
import type { User } from '@/lib/types'
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

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

    const toggleFirstMonth = () => {
        if (user) {
            const newValue = !user.isFirstMonth
            updateUser(user.id, { isFirstMonth: newValue })
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

            <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        {user.isFirstMonth ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : (
                            <AlertCircle className="h-5 w-5 text-amber-500" />
                        )}
                        First Month Promotion
                    </CardTitle>
                    <CardDescription>
                        Test the 0% commission logic by enabling the first month free trial.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                    <div className="space-y-1">
                        <p className="text-sm font-medium">Status: {user.isFirstMonth ? 'Enabled' : 'Disabled'}</p>
                        <p className="text-xs text-muted-foreground">
                            {user.isFirstMonth
                                ? 'You are currently enjoying 0% platform fees on all properties.'
                                : 'Enable this to waive the 0.5% platform fee for your first month.'}
                        </p>
                    </div>
                    <Button
                        variant={user.isFirstMonth ? "outline" : "default"}
                        onClick={toggleFirstMonth}
                    >
                        {user.isFirstMonth ? "Disable Free Trial" : "Enable Free Trial"}
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
