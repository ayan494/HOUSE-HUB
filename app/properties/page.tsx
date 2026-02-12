"use client"

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { PropertyCard } from '@/components/property-card'
import { SearchFilters } from '@/components/search-filters'
import { BookingModal } from '@/components/booking-modal'
import { filterProperties, properties as allProperties } from '@/lib/data'
import type { Property } from '@/lib/types'

function PropertiesContent() {
  const searchParams = useSearchParams()
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(allProperties)

  useEffect(() => {
    const query = searchParams.get('q') || undefined
    const city = searchParams.get('city') || undefined
    const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined
    const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined
    const bedrooms = searchParams.get('bedrooms') ? Number(searchParams.get('bedrooms')) : undefined
    const amenities = searchParams.get('amenities')?.split(',').filter(Boolean) || undefined

    const filtered = filterProperties({
      city: city === 'all' ? undefined : city,
      minPrice,
      maxPrice,
      bedrooms,
      amenities,
      query,
    })

    // Sort: featured first, then premium, then by rating
    filtered.sort((a, b) => {
      if (a.isFeatured && !b.isFeatured) return -1
      if (!a.isFeatured && b.isFeatured) return 1
      if (a.isPremium && !b.isPremium) return -1
      if (!a.isPremium && b.isPremium) return 1
      return b.rating - a.rating
    })

    setFilteredProperties(filtered)
  }, [searchParams])

  const handleBookClick = (property: Property) => {
    setSelectedProperty(property)
    setIsBookingOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Browse Properties
            </h1>
            <p className="text-muted-foreground">
              {filteredProperties.length} properties found
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8">
            <SearchFilters />
          </div>

          {/* Properties Grid */}
          {filteredProperties.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg mb-4">
                No properties found matching your criteria.
              </p>
              <p className="text-sm text-muted-foreground">
                Try adjusting your filters or search for a different location.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onBookClick={handleBookClick}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* Booking Modal */}
      <BookingModal
        property={selectedProperty}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  )
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading properties...</div>
      </div>
    }>
      <PropertiesContent />
    </Suspense>
  )
}
