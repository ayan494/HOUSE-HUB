"use client"

import { useState } from 'react'
import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { FeaturedCarousel } from '@/components/featured-carousel'
import { PropertyGrid } from '@/components/property-grid'
import { HowItWorks } from '@/components/how-it-works'
import { Testimonials } from '@/components/testimonials'
import { Footer } from '@/components/footer'
import { BookingModal } from '@/components/booking-modal'
import { properties, getPremiumProperties, getFeaturedProperties } from '@/lib/data'
import type { Property } from '@/lib/types'
import { FadeIn } from '@/components/animations/fade-in'
import { NightSky } from '@/components/animations/night-sky'

export default function HomePage() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  const premiumProperties = getPremiumProperties()
  const featuredProperties = getFeaturedProperties()
  const allProperties = properties.slice(0, 8)

  const handleBookClick = (property: Property) => {
    setSelectedProperty(property)
    setIsBookingOpen(true)
  }

  // ✅ Yahan pe return block paste karna hai
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f172a] transition-colors duration-500">
      <NightSky />
      <Header />

      <main>
        <FadeIn direction="none" fullWidth>
          <Hero />
        </FadeIn>

        <FadeIn delay={0.2} direction="up" fullWidth>
          <FeaturedCarousel
            properties={premiumProperties}
            title="Premium Properties"
            subtitle="Hand-picked luxury homes for discerning tenants"
            onBookClick={handleBookClick}
          />
        </FadeIn>

        <div className="container mx-auto px-4">
          <FadeIn delay={0.3} direction="up" fullWidth>
            <PropertyGrid
              properties={featuredProperties}
              title="Featured Properties"
              subtitle="Explore our handpicked selection of quality homes across Pakistan"
              onBookClick={handleBookClick}
            />
          </FadeIn>
        </div>

        <FadeIn delay={0.2} direction="right" fullWidth>
          <HowItWorks />
        </FadeIn>

        <div className="container mx-auto px-4">
          <FadeIn delay={0.3} direction="up" fullWidth>
            <PropertyGrid
              properties={allProperties}
              title="Browse All Properties"
              subtitle="Find your next home from our extensive collection"
              onBookClick={handleBookClick}
            />
          </FadeIn>
        </div>

        <FadeIn delay={0.2} direction="left" fullWidth>
          <Testimonials />
        </FadeIn>
      </main>

      <Footer />

      <BookingModal
        property={selectedProperty}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  )
}
