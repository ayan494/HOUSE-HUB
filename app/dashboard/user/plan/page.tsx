"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Check, Shield, Star, Zap } from 'lucide-react'
import Link from 'next/link'

export default function TenantPlanPage() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-foreground">Upgrade Your Experience</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Get verified, access premium listings first, and stand out to landlords.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Free Plan */}
                <Card className="flex flex-col border-border/50 shadow-sm relative overflow-hidden">
                    <CardHeader>
                        <CardTitle className="text-2xl">Standard</CardTitle>
                        <CardDescription>Basic access to find your home</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 space-y-4">
                        <div className="text-3xl font-bold">Free</div>
                        <ul className="space-y-3 pt-4">
                            <li className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-primary" />
                                <span>Browse all listings</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-primary" />
                                <span>Contact potetial landlords</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-primary" />
                                <span>Basic profile</span>
                            </li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Link href="/dashboard/user" className="w-full">
                            <Button variant="outline" className="w-full">
                                Continue with Free
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>

                {/* Premium Plan */}
                <Card className="flex flex-col border-primary shadow-lg relative overflow-hidden bg-primary/5">
                    <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-bl-lg">
                        Recommended
                    </div>
                    <CardHeader>
                        <CardTitle className="text-2xl flex items-center gap-2">
                            Verified Tenant
                            <Shield className="w-5 h-5 text-primary fill-primary/20" />
                        </CardTitle>
                        <CardDescription>Stand out and get approved faster</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 space-y-4">
                        <div className="flex items-end gap-2">
                            <div className="text-4xl font-bold">PKR 1,500</div>
                            <span className="text-muted-foreground mb-1">/year</span>
                        </div>
                        <ul className="space-y-3 pt-4">
                            <li className="flex items-center gap-2 font-medium">
                                <Check className="w-5 h-5 text-primary" />
                                <span>Verified Tenant Badge</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="w-5 h-5 text-primary" />
                                <span>Priority Booking Requests</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="w-5 h-5 text-primary" />
                                <span>Access Premium Listings 24h Early</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="w-5 h-5 text-primary" />
                                <span>Dedicated Support</span>
                            </li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full h-12 text-lg font-semibold shadow-primary/25 shadow-md hover:shadow-xl transition-all">
                            Upgrade Now
                            <Zap className="w-4 h-4 ml-2 fill-current" />
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
