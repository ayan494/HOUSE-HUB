"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, Crown, Star, TrendingUp, Eye, Zap, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function PremiumPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-4 pt-4 px-4">
        <Link href="/dashboard/owner">
          <Button variant="ghost" size="icon" className="hover:bg-slate-100">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Owner Subscription</h1>
          <p className="text-slate-600 mt-1">
            Choose a plan to list properties and manage your leads.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 pb-20">
        {/* Simple Plan */}
        <Card className="flex flex-col border-slate-200 shadow-sm hover:shadow-md transition-all h-full bg-white">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-900 text-center">Simple</CardTitle>
            <CardDescription className="text-center">Basic listing power</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 space-y-6">
            <div className="text-center space-y-1">
              <div className="text-4xl font-bold text-slate-900">Free</div>
              <div className="text-sm font-semibold text-primary uppercase">2 Credits Included</div>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <div className="bg-primary/10 rounded-full p-1"><Check className="w-3 h-3 text-primary" /></div>
                <span className="text-slate-600 text-sm">List up to 2 Properties</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-primary/10 rounded-full p-1"><Check className="w-3 h-3 text-primary" /></div>
                <span className="text-slate-600 text-sm">Basic Analytics</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400">
                <div className="bg-slate-100 rounded-full p-1"><Check className="w-3 h-3 text-slate-300" /></div>
                <span className="text-sm line-through">Featured Placement</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Link href="/dashboard/owner" className="w-full">
              <Button variant="outline" className="w-full font-bold border-slate-300 hover:bg-slate-50 text-slate-700">
                Continue Free
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Modern Plan */}
        <Card className="flex flex-col border-primary shadow-xl hover:shadow-2xl transition-all h-full bg-white relative scale-105 z-10 border-2">
          <div className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground text-center py-1 text-[10px] font-black uppercase tracking-[0.2em]">
            Best Value
          </div>
          <CardHeader className="pt-8">
            <CardTitle className="text-2xl font-black text-slate-900 text-center flex items-center justify-center gap-2">
              Modern
              <Zap className="w-5 h-5 text-primary fill-primary" />
            </CardTitle>
            <CardDescription className="text-center font-medium">Growth for your portfolio</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 space-y-6">
            <div className="text-center space-y-1">
              <div className="text-5xl font-black text-slate-900 tracking-tighter">PKR 5,000</div>
              <div className="text-xs text-slate-500 font-bold">per month</div>
              <div className="text-sm font-black text-primary uppercase pt-2">20 Credits Included</div>
            </div>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="bg-primary rounded-full p-1"><Check className="w-3 h-3 text-primary-foreground" /></div>
                <span className="text-slate-900 text-sm font-semibold">Featured Listing Badge</span>
              </li>
              <li className="flex items-center gap-3 text-slate-700 font-medium">
                <div className="bg-primary/20 rounded-full p-1"><Check className="w-3 h-3 text-primary" /></div>
                <span className="text-sm">Verified Owner Status</span>
              </li>
              <li className="flex items-center gap-3 text-slate-700">
                <div className="bg-primary/20 rounded-full p-1"><Check className="w-3 h-3 text-primary" /></div>
                <span className="text-sm">Auto-Refresh Listings</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Link href="/dashboard/owner" className="w-full">
              <Button className="w-full h-12 text-lg font-black shadow-primary/20 shadow-lg hover:shadow-primary/40 transition-shadow">
                Select Modern
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Premium Plan */}
        <Card className="flex flex-col border-slate-200 shadow-sm hover:shadow-md transition-all h-full bg-white">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-900 text-center flex items-center justify-center gap-2">
              Premium
              <Crown className="w-5 h-5 text-amber-500 fill-amber-500" />
            </CardTitle>
            <CardDescription className="text-center">Maximum exposure</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 space-y-6">
            <div className="text-center space-y-1">
              <div className="text-4xl font-bold text-slate-900">PKR 48,000</div>
              <div className="text-xs text-slate-500 font-medium">per year (save 20%)</div>
              <div className="text-sm font-semibold text-primary uppercase pt-2">100 Credits Included</div>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <div className="bg-primary/10 rounded-full p-1"><Check className="w-3 h-3 text-primary" /></div>
                <span className="text-slate-600 text-sm font-medium">Top Search Placement</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-primary/10 rounded-full p-1"><Check className="w-3 h-3 text-primary" /></div>
                <span className="text-slate-600 text-sm font-medium">Direct Lead Integration</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-primary/10 rounded-full p-1"><Check className="w-3 h-3 text-primary" /></div>
                <span className="text-slate-600 text-sm font-medium">Priority Support 24/7</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Link href="/dashboard/owner" className="w-full">
              <Button variant="outline" className="w-full font-bold border-slate-300 hover:bg-slate-50 text-slate-700">
                Get Premium
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
