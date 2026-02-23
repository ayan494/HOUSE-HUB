"use client"

import { useState, useEffect } from 'react'
import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { FeaturedCarousel } from '@/components/featured-carousel'
import { PropertyGrid } from '@/components/property-grid'
import { HowItWorks } from '@/components/how-it-works'
import { Footer } from '@/components/footer'
import { BookingModal } from '@/components/booking-modal'
import { CategoryCards } from '@/components/category-cards'
import { TrustedPartners } from '@/components/trusted-partners'
import { TestimonialMarquee } from '@/components/testimonial-marquee'
import { getProperties } from '@/lib/store'
import { properties as staticProperties } from '@/lib/data'
import type { Property } from '@/lib/types'
import { FadeIn } from '@/components/animations/fade-in'
import { NightSky } from '@/components/animations/night-sky'

export default function HomePage() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [allProperties, setAllProperties] = useState<Property[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadProperties = () => {
      try {
        const storedProperties = getProperties()

        // Merge stored properties with static properties, avoiding duplicates by ID
        const combined = [...storedProperties]
        staticProperties.forEach(p => {
          if (!combined.some(cp => cp.id === p.id)) {
            combined.push(p)
          }
        })

        setAllProperties(combined)
      } catch (error) {
        console.error('Error loading properties:', error)
        setAllProperties(staticProperties)
      } finally {
        setIsLoading(false)
      }
    }

    loadProperties()
  }, [])

  const premiumProperties = allProperties.filter(p => p.isPremium)
  const featuredProperties = allProperties.filter(p => p.isFeatured)
  const homeProperties = allProperties.slice(0, 8)

  const handleBookClick = (property: Property) => {
    setSelectedProperty(property)
    setIsBookingOpen(true)
  }

  // ✅ Yahan pe return block paste karna hai
  return (
    <div className="min-h-screen bg-background transition-colors duration-500">
      {/* <NightSky /> - Disabled to match light mode appearance in dark mode as requested */}
      <Header />

      <main className="m-0 p-0">
        <FadeIn direction="none" fullWidth className="m-0 p-0">
          <Hero />
        </FadeIn>

        <FadeIn delay={0.1} direction="up" fullWidth>
          <CategoryCards />
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
              properties={homeProperties}
              title="Browse All Properties"
              subtitle="Find your next home from our extensive collection"
              onBookClick={handleBookClick}
            />
          </FadeIn>
        </div>

        <FadeIn delay={0.2} direction="up" fullWidth>
          <TrustedPartners />
        </FadeIn>

        <FadeIn delay={0.1} direction="up" fullWidth>
          <TestimonialMarquee />
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
