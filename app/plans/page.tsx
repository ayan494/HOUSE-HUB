"use client"

import { useState, useEffect, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, ArrowLeft, ArrowRight, Zap, Shield, Star } from 'lucide-react'
import Link from 'next/link'
import { getCurrentUser, updateUserPlan } from '@/lib/store'
import type { User } from '@/lib/types'
import { useSearchParams } from 'next/navigation'

const plans = [
    // ... same plans array
    {
        name: 'Basic',
        price: 'PKR 1,500',
        description: 'Perfect for getting started',
        features: ['Standard listings', 'Basic reach', 'Email support', 'Verified badge'],
        icon: Star,
        color: 'text-gray-500',
        buttonVariant: 'outline' as const,
    },
    {
        name: 'Pro',
        price: 'PKR 5,000',
        description: 'Most popular for starters',
        features: ['Verified badge', 'Priority support', 'Basic analytics', '10 Featured listings'],
        icon: Shield,
        color: 'text-[#6699cc]',
        buttonVariant: 'default' as const,
        highlight: true,
    },
    {
        name: 'Premium',
        price: 'PKR 12,000',
        description: 'For power users',
        features: ['Premium gold badge', 'Top search placement', 'Unlimited featured listings', 'Advanced analytics', '24/7 Dedicated support'],
        icon: Zap,
        color: 'text-amber-500',
        buttonVariant: 'default' as const,
    },
]

function PlansContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const currentUser = getCurrentUser()
        if (!currentUser) {
            const redirectUrl = searchParams.get('redirect')
            const nextUrl = redirectUrl ? `/auth/login?redirect=${redirectUrl}` : '/auth/login'
            router.push(nextUrl)
            return
        }
        setUser(currentUser)
        setLoading(false)
    }, [router, searchParams])

    const handleSelectPlan = (planName: string) => {
        if (user) {
            updateUserPlan(user.email, planName.toLowerCase() as any)

            const redirectUrl = searchParams.get('redirect')
            const nextUrl = redirectUrl || (user.role === 'owner' ? '/dashboard/owner' : '/dashboard/user')

            alert(`You have selected the ${planName} plan! Redirecting you now...`)
            router.push(nextUrl)
        }
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
            <div className="max-w-5xl mx-auto">
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {plans.map((plan) => (
                        <Card
                            key={plan.name}
                            className={`flex flex-col relative transition-all duration-300 hover:shadow-xl ${plan.highlight ? 'border-[#6699cc] ring-2 ring-[#6699cc] ring-opacity-30 scale-105 z-10' : 'border-border'
                                }`}
                        >
                            {plan.name === 'Pro' && (
                                <div className="absolute top-0 right-0 left-0 -translate-y-1/2 flex justify-center">
                                    <Badge className="bg-[#6699cc] text-white px-4 py-1 border-none font-bold">Most Popular</Badge>
                                </div>
                            )}

                            <CardHeader>
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`p-2 rounded-lg bg-muted ${plan.color}`}>
                                        <plan.icon className="w-6 h-6" />
                                    </div>
                                    <Badge variant="secondary" className="font-bold">{plan.name}</Badge>
                                </div>
                                <CardTitle className="text-3xl font-bold">{plan.price}</CardTitle>
                                <CardDescription className="pt-2 font-medium">{plan.description}</CardDescription>
                            </CardHeader>

                            <CardContent className="flex-1">
                                <ul className="space-y-4 pt-4">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-start gap-3">
                                            <Check className="w-5 h-5 text-[#6699cc] flex-shrink-0" />
                                            <span className="text-sm text-foreground font-medium">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>

                            <CardFooter className="pt-8">
                                <Button
                                    className="w-full h-12 text-lg font-bold group"
                                    variant={plan.buttonVariant}
                                    style={plan.buttonVariant === 'default' ? { backgroundColor: '#6699cc' } : { borderColor: '#6699cc', color: '#6699cc' }}
                                    onClick={() => handleSelectPlan(plan.name)}
                                >
                                    Get Started
                                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                <div className="mt-16 text-center text-muted-foreground">
                    <p className="font-medium">All plans include basic HouseHub features. Prices are in PKR and billed monthly.</p>
                    <div className="mt-4 flex justify-center gap-8">
                        <span className="flex items-center gap-2 font-medium">
                            <Shield className="w-4 h-4 text-[#6699cc]" /> Secure Payment
                        </span>
                        <span className="flex items-center gap-2 font-medium">
                            <Star className="w-4 h-4 text-[#6699cc]" /> Cancel Anytime
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function PlansPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="animate-pulse text-muted-foreground">Loading plans...</div>
            </div>
        }>
            <PlansContent />
        </Suspense>
    )
}
