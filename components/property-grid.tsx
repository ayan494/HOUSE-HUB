"use client"

import { useEffect, useRef, useState } from 'react'
import { PropertyCard } from './property-card'
import type { Property } from '@/lib/types'

interface PropertyGridProps {
  properties: Property[]
  title?: string
  subtitle?: string
  onBookClick?: (property: Property) => void
}

export function PropertyGrid({ properties, title, subtitle, onBookClick }: PropertyGridProps) {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = itemRefs.current.findIndex(ref => ref === entry.target)
            if (index !== -1) {
              setVisibleItems(prev => new Set([...prev, index]))
            }
          }
        })
      },
      { threshold: 0.1, rootMargin: '50px' }
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [properties])

  if (properties.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground text-lg">No properties found matching your criteria.</p>
      </div>
    )
  }

  return (
    <section className="py-12 md:py-16">
      {(title || subtitle) && (
        <div className="text-center mb-10">
          {title && (
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 text-balance">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
              {subtitle}
            </p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {properties.map((property, index) => (
          <div
            key={property.id}
            ref={(el) => { itemRefs.current[index] = el }}
            className={`transition-all duration-500 ${
              visibleItems.has(index)
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: `${(index % 4) * 100}ms` }}
          >
            <PropertyCard 
              property={property} 
              onBookClick={onBookClick}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
