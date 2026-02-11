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
      <div className="text-center py-20 bg-gray-50 dark:bg-white/5 rounded-[3rem]">
        <p className="text-muted-foreground text-xl font-medium">No properties found matching your criteria.</p>
      </div>
    )
  }

  return (
    <section className="py-24">
      {(title || subtitle) && (
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-0.5 bg-primary" />
            <span className="text-primary font-bold uppercase tracking-widest text-sm">Our Collection</span>
          </div>
          {title && (
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-foreground mb-3 tracking-tight">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-muted-foreground text-sm md:text-base font-medium max-w-xl">
              {subtitle}
            </p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
        {properties.map((property, index) => (
          <div
            key={property.id}
            ref={(el) => { itemRefs.current[index] = el }}
            className={`transition-all duration-700 ease-out ${visibleItems.has(index)
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-12'
              }`}
            style={{ transitionDelay: `${(index % 4) * 150}ms` }}
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
