"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Crown, Sparkles } from 'lucide-react'

export default function UserPremiumPage() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
                    <Crown className="w-8 h-8 text-yellow-500" />
                    Get Plus
                </h1>
                <p className="text-slate-500 mt-1 font-medium">
                    Upgrade your experience with premium features and exclusive benefits.
                </p>
            </div>

            {/* Premium Plans */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Basic Plan */}
                <Card className="bg-white border-slate-200 hover:border-blue-400 transition-all hover:shadow-xl rounded-2xl">
                    <CardHeader className="text-center pb-4">
                        <CardTitle className="text-2xl font-black text-slate-900">Basic</CardTitle>
                        <div className="mt-4">
                            <span className="text-4xl font-black text-blue-600">Rs 999</span>
                            <span className="text-slate-500 text-sm block mt-1">/month</span>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3 mb-8">
                            <li className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                                <span className="text-sm font-medium">5 Property Bookings</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                                <span className="text-sm font-medium">Priority Support</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                                <span className="text-sm font-medium">Email Notifications</span>
                            </li>
                        </ul>
                        <Button className="w-full rounded-xl font-bold bg-blue-600 hover:bg-blue-700 py-6">
                            Choose Basic
                        </Button>
                    </CardContent>
                </Card>

                {/* Pro Plan - Featured */}
                <Card className="bg-gradient-to-br from-blue-600 to-indigo-600 border-blue-600 shadow-2xl transform scale-105 rounded-2xl relative">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                        <Badge className="bg-yellow-400 text-yellow-900 font-black px-4 py-1.5 text-sm shadow-lg">
                            ⭐ POPULAR
                        </Badge>
                    </div>
                    <CardHeader className="text-center pb-4 pt-8">
                        <CardTitle className="text-2xl font-black text-white">Pro</CardTitle>
                        <div className="mt-4">
                            <span className="text-4xl font-black text-white">Rs 1,999</span>
                            <span className="text-blue-100 text-sm block mt-1">/month</span>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3 mb-8">
                            <li className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-300 shrink-0" />
                                <span className="text-sm font-medium text-white">15 Property Bookings</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-300 shrink-0" />
                                <span className="text-sm font-medium text-white">24/7 Priority Support</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-300 shrink-0" />
                                <span className="text-sm font-medium text-white">SMS & Email Alerts</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-300 shrink-0" />
                                <span className="text-sm font-medium text-white">Exclusive Deals</span>
                            </li>
                        </ul>
                        <Button className="w-full rounded-xl font-bold bg-white text-blue-600 hover:bg-blue-50 py-6">
                            Choose Pro
                        </Button>
                    </CardContent>
                </Card>

                {/* Premium Plan */}
                <Card className="bg-white border-slate-200 hover:border-indigo-400 transition-all hover:shadow-xl rounded-2xl">
                    <CardHeader className="text-center pb-4">
                        <CardTitle className="text-2xl font-black text-slate-900">Premium</CardTitle>
                        <div className="mt-4">
                            <span className="text-4xl font-black text-indigo-600">Rs 3,999</span>
                            <span className="text-slate-500 text-sm block mt-1">/month</span>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3 mb-8">
                            <li className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                                <span className="text-sm font-medium">Unlimited Bookings</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                                <span className="text-sm font-medium">VIP Support</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                                <span className="text-sm font-medium">All Notifications</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                                <span className="text-sm font-medium">Premium Deals</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                                <span className="text-sm font-medium">Personal Manager</span>
                            </li>
                        </ul>
                        <Button className="w-full rounded-xl font-bold bg-indigo-600 hover:bg-indigo-700 py-6">
                            Choose Premium
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Benefits Section */}
            <Card className="bg-gradient-to-br from-slate-50 to-blue-50 border-slate-200 rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        <Sparkles className="w-6 h-6 text-blue-600" />
                        Why Upgrade?
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                                <CheckCircle className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900">Priority Bookings</h4>
                                <p className="text-sm text-slate-600 mt-1">Get first access to new properties</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0">
                                <CheckCircle className="w-5 h-5 text-indigo-600" />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900">Dedicated Support</h4>
                                <p className="text-sm text-slate-600 mt-1">24/7 assistance from our team</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900">Exclusive Deals</h4>
                                <p className="text-sm text-slate-600 mt-1">Special discounts on properties</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center shrink-0">
                                <CheckCircle className="w-5 h-5 text-yellow-600" />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900">No Booking Limits</h4>
                                <p className="text-sm text-slate-600 mt-1">Book as many properties as you want</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
