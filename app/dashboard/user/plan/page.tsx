"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Check, Shield, Star, Zap } from 'lucide-react'
import Link from 'next/link'

export default function TenantPlanPage() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 bg-white min-h-screen">
            <div className="text-center space-y-4 pt-10">
                <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Select Your Plan</h1>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                    Choose the best way to find your perfect home with credit-based access.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 pb-20">
                {/* Simple Plan */}
                <Card className="flex flex-col border-slate-200 shadow-sm hover:shadow-md transition-all h-full bg-white">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-slate-900 text-center">Simple</CardTitle>
                        <CardDescription className="text-center">Basic browsing credits</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 space-y-6">
                        <div className="text-center space-y-1">
                            <div className="text-4xl font-bold text-slate-900">Free</div>
                            <div className="text-sm font-semibold text-primary uppercase">5 Credits Included</div>
                        </div>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3">
                                <div className="bg-primary/10 rounded-full p-1"><Check className="w-3 h-3 text-primary" /></div>
                                <span className="text-slate-600 text-sm">Browse all listings</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="bg-primary/10 rounded-full p-1"><Check className="w-3 h-3 text-primary" /></div>
                                <span className="text-slate-600 text-sm">Contact 5 Landlords</span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-400">
                                <div className="bg-slate-100 rounded-full p-1"><Check className="w-3 h-3 text-slate-300" /></div>
                                <span className="text-sm line-through">Verified Tenant Badge</span>
                            </li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Link href="/dashboard/user" className="w-full">
                            <Button variant="outline" className="w-full font-bold border-slate-300 hover:bg-slate-50">
                                Get Started Free
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>

                {/* Modern Plan */}
                <Card className="flex flex-col border-primary shadow-xl hover:shadow-2xl transition-all h-full bg-white relative scale-105 z-10 border-2">
                    <div className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground text-center py-1 text-[10px] font-black uppercase tracking-[0.2em]">
                        Most Popular
                    </div>
                    <CardHeader className="pt-8">
                        <CardTitle className="text-2xl font-black text-slate-900 text-center flex items-center justify-center gap-2">
                            Modern
                            <Zap className="w-5 h-5 text-primary fill-primary" />
                        </CardTitle>
                        <CardDescription className="text-center font-medium">Enhanced search power</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 space-y-6">
                        <div className="text-center space-y-1">
                            <div className="text-5xl font-black text-slate-900 tracking-tighter">PKR 1,500</div>
                            <div className="text-xs text-slate-500 font-bold">per year</div>
                            <div className="text-sm font-black text-primary uppercase pt-2">50 Credits Included</div>
                        </div>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3">
                                <div className="bg-primary rounded-full p-1"><Check className="w-3 h-3 text-primary-foreground" /></div>
                                <span className="text-slate-900 text-sm font-semibold">Verified Tenant Badge</span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-700 font-medium">
                                <div className="bg-primary/20 rounded-full p-1"><Check className="w-3 h-3 text-primary" /></div>
                                <span className="text-sm">Priority Booking</span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-700">
                                <div className="bg-primary/20 rounded-full p-1"><Check className="w-3 h-3 text-primary" /></div>
                                <span className="text-sm">Early Listing Alerts</span>
                            </li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Link href="/dashboard/user" className="w-full">
                            <Button className="w-full h-12 text-lg font-black shadow-primary/20 shadow-lg hover:shadow-primary/40 transition-shadow">
                                Upgrade to Modern
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>

                {/* Premium Plan */}
                <Card className="flex flex-col border-slate-200 shadow-sm hover:shadow-md transition-all h-full bg-white">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-slate-900 text-center flex items-center justify-center gap-2">
                            Premium
                            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                        </CardTitle>
                        <CardDescription className="text-center">Ultimate rental tools</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 space-y-6">
                        <div className="text-center space-y-1">
                            <div className="text-4xl font-bold text-slate-900">PKR 4,000</div>
                            <div className="text-xs text-slate-500">per year</div>
                            <div className="text-sm font-semibold text-primary uppercase pt-2">200 Credits Included</div>
                        </div>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3">
                                <div className="bg-primary/10 rounded-full p-1"><Check className="w-3 h-3 text-primary" /></div>
                                <span className="text-slate-600 text-sm font-medium italic">Virtual Property Tours</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="bg-primary/10 rounded-full p-1"><Check className="w-3 h-3 text-primary" /></div>
                                <span className="text-slate-600 text-sm font-medium">Direct Chat Support</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="bg-primary/10 rounded-full p-1"><Check className="w-3 h-3 text-primary" /></div>
                                <span className="text-slate-600 text-sm font-medium">Legal Agreement Aid</span>
                            </li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Link href="/dashboard/user" className="w-full">
                            <Button variant="outline" className="w-full font-bold border-slate-300 hover:bg-slate-50">
                                Get Premium
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
