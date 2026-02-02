"use client"

import { useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { PropertySearch } from '@/components/property-search'
import { BookingModal } from '@/components/booking-modal'
import { properties } from '@/lib/data'
import type { Property } from '@/lib/types'

export default function SearchPage() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  const handleBookClick = (property: Property) => {
    setSelectedProperty(property)
    setIsBookingOpen(true)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1">
        <PropertySearch 
          properties={properties}
          onBookClick={handleBookClick}
        />
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
