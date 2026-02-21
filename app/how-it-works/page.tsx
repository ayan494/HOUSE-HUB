"use client"

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { HowItWorks as HowItWorksSection } from '@/components/how-it-works'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Search, Home, Users, Shield, MessageSquare, Clock, Star, Zap } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function HowItWorksPage() {
  const benefits = [
    {
      icon: Users,
      title: 'Direct Connection',
      description: 'Connect directly with property owners without any middlemen or agent fees.',
    },
    {
      icon: Shield,
      title: 'Verified Listings',
      description: 'All properties are verified to ensure you get what you see.',
    },
    {
      icon: Clock,
      title: 'Quick Process',
      description: 'Find and book your dream home in just a few simple steps.',
    },
    {
      icon: Star,
      title: 'Quality Assured',
      description: 'Read genuine reviews from previous tenants before making a decision.',
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24">
        {/* Hero */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center mb-8">
              <div className="flex items-center gap-4 group">
                <div className="flex items-center justify-center w-16 h-16 rounded-[2rem] bg-[#6699cc] text-white shadow-2xl shadow-[#6699cc]/20 transition-transform group-hover:scale-110">
                  <Home className="w-10 h-10 fill-current" />
                </div>
                <span className="text-4xl font-black tracking-tighter text-foreground">
                  Rentora
                </span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              How Rentora Works
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Finding your perfect home in Pakistan has never been easier.
              Follow our simple process to get started.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/properties">
                <Button size="lg">
                  <Search className="w-4 h-4 mr-2" />
                  Browse Properties
                </Button>
              </Link>
              <Link href="/auth/register?role=owner">
                <Button variant="outline" size="lg">
                  <Home className="w-4 h-4 mr-2" />
                  List Your Property
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <HowItWorksSection />

        {/* Benefits */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Why Choose Rentora?
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                We&apos;re committed to making your rental experience seamless and transparent.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit) => (
                <Card key={benefit.title} className="text-center">
                  <CardContent className="pt-8 pb-8">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                      <benefit.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* For Owners */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Property Owners
                </h2>
                <p className="text-muted-foreground text-lg mb-6">
                  List your property on Rentora and connect with thousands of potential tenants.
                  Our platform makes it easy to manage listings and receive booking requests.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    'Free listing for your properties',
                    'Direct communication with tenants',
                    'Premium options for more visibility',
                    'Easy booking management dashboard',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Zap className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/auth/register?role=owner">
                  <Button size="lg">
                    Start Listing Today
                  </Button>
                </Link>
              </div>
              <div className="bg-muted rounded-2xl p-8 lg:p-12">
                <div className="text-center">
                  <div className="text-5xl md:text-6xl font-bold text-primary mb-2">500+</div>
                  <p className="text-muted-foreground">Properties Listed</p>
                </div>
                <div className="grid grid-cols-2 gap-8 mt-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-foreground mb-1">1000+</div>
                    <p className="text-sm text-muted-foreground">Happy Tenants</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-foreground mb-1">7</div>
                    <p className="text-sm text-muted-foreground">Cities Covered</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Find Your Home?
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
              Join thousands of satisfied tenants who found their perfect home through Rentora.
            </p>
            <Link href="/properties">
              <Button size="lg" className="h-14 px-8 text-lg">
                Get Started Now
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
