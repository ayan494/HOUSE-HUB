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
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        <Hero />
        
        <FeaturedCarousel 
          properties={premiumProperties}
          title="Premium Properties"
          subtitle="Hand-picked luxury homes for discerning tenants"
          onBookClick={handleBookClick}
        />
        
        <div className="container mx-auto px-4">
          <PropertyGrid 
            properties={featuredProperties}
            title="Featured Properties"
            subtitle="Explore our handpicked selection of quality homes across Pakistan"
            onBookClick={handleBookClick}
          />
        </div>
        
        <HowItWorks />
        
        <div className="container mx-auto px-4">
          <PropertyGrid 
            properties={allProperties}
            title="Browse All Properties"
            subtitle="Find your next home from our extensive collection"
            onBookClick={handleBookClick}
          />
        </div>
        
        <Testimonials />
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
