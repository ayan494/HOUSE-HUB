"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, Crown, Star, TrendingUp, Eye, Zap, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function PremiumPage() {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly')

  const plans = {
    monthly: {
      price: 5000,
      period: 'month',
      savings: null,
    },
    yearly: {
      price: 48000,
      period: 'year',
      savings: '20%',
    },
  }

  const features = [
    { icon: Crown, title: 'Premium Badge', description: 'Stand out with a gold premium badge on your listings' },
    { icon: TrendingUp, title: 'Featured Placement', description: 'Your properties appear at the top of search results' },
    { icon: Eye, title: '10x More Views', description: 'Get significantly more visibility and inquiries' },
    { icon: Star, title: 'Priority Support', description: '24/7 dedicated support for premium members' },
    { icon: Zap, title: 'Instant Verification', description: 'Fast-track property verification process' },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/owner">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Upgrade to Premium</h1>
          <p className="text-muted-foreground mt-1">
            Get more visibility and attract more tenants.
          </p>
        </div>
      </div>

      {/* Hero */}
      <Card className="bg-gradient-to-br from-[var(--premium)]/10 via-primary/5 to-background border-[var(--premium)]/20 overflow-hidden">
        <CardContent className="pt-8 pb-8 text-center relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--premium)]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <Crown className="w-16 h-16 mx-auto text-[var(--premium)] mb-4" />
          <h2 className="text-3xl font-bold text-foreground mb-2">HouseHub Premium</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Unlock the full potential of your listings with premium features designed to help you find tenants faster.
          </p>
        </CardContent>
      </Card>

      {/* Pricing Toggle */}
      <div className="flex justify-center">
        <div className="inline-flex items-center p-1 bg-muted rounded-lg">
          <button
            onClick={() => setSelectedPlan('monthly')}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
              selectedPlan === 'monthly'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setSelectedPlan('yearly')}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
              selectedPlan === 'yearly'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Yearly
            <Badge className="bg-primary/10 text-primary text-xs">Save 20%</Badge>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pricing Card */}
        <Card className="border-[var(--premium)]/30">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Premium Plan</CardTitle>
              <Badge className="bg-[var(--premium)] text-[var(--premium-foreground)]">
                Most Popular
              </Badge>
            </div>
            <CardDescription>
              Everything you need to maximize your property visibility.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-foreground">
                  PKR {plans[selectedPlan].price.toLocaleString()}
                </span>
                <span className="text-muted-foreground">/{plans[selectedPlan].period}</span>
              </div>
              {plans[selectedPlan].savings && (
                <p className="text-sm text-primary mt-1">
                  Save {plans[selectedPlan].savings} compared to monthly
                </p>
              )}
            </div>

            <Button className="w-full h-12 bg-[var(--premium)] hover:bg-[var(--premium)]/90 text-[var(--premium-foreground)]">
              <Crown className="w-5 h-5 mr-2" />
              Upgrade Now
            </Button>

            <div className="space-y-3">
              {[
                'Unlimited premium listings',
                'Featured in search results',
                'Premium badge on all properties',
                'Priority customer support',
                'Detailed analytics dashboard',
                'Instant property verification',
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-sm text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Features List */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Premium Benefits</h3>
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[var(--premium)]/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-[var(--premium)]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-medium text-foreground">Can I cancel anytime?</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Yes, you can cancel your subscription at any time. Your premium features will remain active until the end of your billing period.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-foreground">How quickly will I see results?</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Most premium members see increased inquiries within the first week. Your properties get featured immediately after upgrade.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-foreground">Is there a refund policy?</h4>
            <p className="text-sm text-muted-foreground mt-1">
              We offer a 7-day money-back guarantee if you&apos;re not satisfied with the premium features.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
