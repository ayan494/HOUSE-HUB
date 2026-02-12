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
    <section className="py-20 md:py-32">
      {(title || subtitle) && (
        <div className="text-center mb-16">
          {title && (
            <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6 tracking-tight text-balance">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-lg md:text-xl text-muted-foreground/80 max-w-3xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-12">
        {properties.map((property, index) => (
          <div
            key={property.id}
            ref={(el) => { itemRefs.current[index] = el }}
            className={`transition-all duration-500 ${visibleItems.has(index)
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
