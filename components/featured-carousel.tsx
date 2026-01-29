"use client"

import { useRef, useState, useEffect } from 'react'
import { PropertyCard } from './property-card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Crown } from 'lucide-react'
import type { Property } from '@/lib/types'

interface FeaturedCarouselProps {
  properties: Property[]
  title?: string
  subtitle?: string
  onBookClick?: (property: Property) => void
}

export function FeaturedCarousel({ 
  properties, 
  title = "Premium Properties", 
  subtitle = "Hand-picked luxury homes for discerning tenants",
  onBookClick 
}: FeaturedCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    checkScroll()
    const ref = scrollRef.current
    if (ref) {
      ref.addEventListener('scroll', checkScroll)
      return () => ref.removeEventListener('scroll', checkScroll)
    }
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  if (properties.length === 0) return null

  return (
    <section className="py-12 md:py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Crown className="w-6 h-6 text-[var(--premium)]" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                {title}
              </h2>
            </div>
            <p className="text-muted-foreground text-lg">
              {subtitle}
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="rounded-full"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Carousel */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {properties.map((property) => (
            <div 
              key={property.id}
              className="flex-shrink-0 w-[85%] sm:w-[45%] lg:w-[30%] xl:w-[23%] snap-start"
            >
              <PropertyCard 
                property={property} 
                onBookClick={onBookClick}
              />
            </div>
          ))}
        </div>

        {/* Mobile scroll indicators */}
        <div className="flex md:hidden items-center justify-center gap-2 mt-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-sm text-muted-foreground">Scroll to see more</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
