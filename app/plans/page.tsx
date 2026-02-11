"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, ArrowLeft, Zap, Shield, Star, Rocket } from 'lucide-react'
import Link from 'next/link'
import { getCurrentUser } from '@/lib/store'
import type { User } from '@/lib/types'

const plans = [
    {
        name: 'Simple',
        price: 'PKR 0',
        description: 'Perfect for getting started',
        features: ['Standard listings', 'Basic reach', 'Email support'],
        icon: Star,
        color: 'text-gray-500',
        buttonVariant: 'outline' as const,
    },
    {
        name: 'Standard',
        price: 'PKR 1,500',
        description: 'Most popular for starters',
        features: ['Verified badge', 'Priority support', 'Basic analytics', '3 Featured listings'],
        icon: Shield,
        color: 'text-blue-500',
        buttonVariant: 'outline' as const,
        highlight: true,
    },
    {
        name: 'Premium',
        price: 'PKR 5,000',
        description: 'For power users',
        features: ['Premium gold badge', 'Top search placement', '10 Featured listings', 'Advanced analytics', '24/7 Dedicated support'],
        icon: Zap,
        color: 'text-amber-500',
        buttonVariant: 'default' as const,
    },
    {
        name: 'Ultimate',
        price: 'PKR 12,000',
        description: 'Maximum exposure',
        features: ['All Premium features', 'Unlimited featured listings', 'Social media promotion', 'API access', 'Personal account manager'],
        icon: Rocket,
        color: 'text-purple-500',
        buttonVariant: 'default' as const,
    },
]

export default function PlansPage() {
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const currentUser = getCurrentUser()
        if (!currentUser) {
            router.push('/auth/login?redirect=/plans')
            return
        }
        setUser(currentUser)
        setLoading(false)
    }, [router])

    const handleSelectPlan = (planName: string) => {
        alert(`You have selected the ${planName} plan! In a real application, this would proceed to the payment gateway.`)
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="animate-pulse text-muted-foreground">Checking authentication...</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center mb-8">
                    <Link href={user?.role === 'owner' ? '/dashboard/owner' : '/dashboard/user'}>
                        <Button variant="ghost" size="sm" className="gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Dashboard
                        </Button>
                    </Link>
                </div>

                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-foreground sm:text-5xl">
                        Choose Your Plan
                    </h1>
                    <p className="mt-4 text-xl text-muted-foreground">
                        Scale your property listings with HouseHub and reach more tenants.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {plans.map((plan) => (
                        <Card
                            key={plan.name}
                            className={`flex flex-col relative transition-all duration-300 hover:shadow-xl ${plan.highlight ? 'border-primary ring-2 ring-primary ring-opacity-50 scale-105 z-10' : 'border-border'
                                }`}
                        >
                            {plan.name === 'Standard' && (
                                <div className="absolute top-0 right-0 left-0 -translate-y-1/2 flex justify-center">
                                    <Badge className="bg-primary text-primary-foreground px-4 py-1">Most Popular</Badge>
                                </div>
                            )}

                            <CardHeader>
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`p-2 rounded-lg bg-muted ${plan.color}`}>
                                        <plan.icon className="w-6 h-6" />
                                    </div>
                                    <Badge variant="secondary">{plan.name}</Badge>
                                </div>
                                <CardTitle className="text-3xl font-bold">{plan.price}</CardTitle>
                                <CardDescription className="pt-2">{plan.description}</CardDescription>
                            </CardHeader>

                            <CardContent className="flex-1">
                                <ul className="space-y-4 pt-4">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-start gap-3">
                                            <Check className="w-5 h-5 text-primary flex-shrink-0" />
                                            <span className="text-sm text-foreground">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>

                            <CardFooter className="pt-8">
                                <Button
                                    className="w-full h-12 text-lg font-semibold"
                                    variant={plan.buttonVariant}
                                    onClick={() => handleSelectPlan(plan.name)}
                                >
                                    Select Plan
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                <div className="mt-16 text-center text-muted-foreground">
                    <p>All plans include basic HouseHub features. Prices are in PKR and billed monthly.</p>
                    <div className="mt-4 flex justify-center gap-8">
                        <span className="flex items-center gap-2">
                            <Shield className="w-4 h-4" /> Secure Payment
                        </span>
                        <span className="flex items-center gap-2">
                            <Star className="w-4 h-4" /> Cancel Anytime
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
