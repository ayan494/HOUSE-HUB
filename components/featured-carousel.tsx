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
      setCanScrollLeft(scrollLeft > 20)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20)
    }
  }

  useEffect(() => {
    checkScroll()
    const ref = scrollRef.current
    if (ref) {
      ref.addEventListener('scroll', checkScroll)
      window.addEventListener('resize', checkScroll)
      return () => {
        ref.removeEventListener('scroll', checkScroll)
        window.removeEventListener('resize', checkScroll)
      }
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
    <section className="py-24 md:py-32 bg-white dark:bg-transparent overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-1 bg-primary rounded-full" />
              <span className="text-primary font-black uppercase tracking-[0.3em] text-xs sm:text-sm">Exclusive Selection</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6 tracking-tighter">
              {title}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground/80 font-medium leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Progress or manual controls could go here, but we'll use floating ones */}
        </div>

        {/* Carousel Wrapper with Floating Controls */}
        <div className="relative group">
          {/* Gradient Masks */}
          <div className={`absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white dark:from-background to-transparent z-10 pointer-events-none transition-opacity duration-300 ${canScrollLeft ? 'opacity-100' : 'opacity-0'}`} />
          <div className={`absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white dark:from-background to-transparent z-10 pointer-events-none transition-opacity duration-300 ${canScrollRight ? 'opacity-100' : 'opacity-0'}`} />

          {/* Floating Navigation Buttons */}
          <div className="hidden md:block">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-white dark:bg-card shadow-2xl border border-border flex items-center justify-center z-20 transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-white disabled:opacity-0 disabled:pointer-events-none ${canScrollLeft ? 'opacity-100' : 'opacity-0'}`}
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-14 h-14 rounded-full bg-white dark:bg-card shadow-2xl border border-border flex items-center justify-center z-20 transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-white disabled:opacity-0 disabled:pointer-events-none ${canScrollRight ? 'opacity-100' : 'opacity-0'}`}
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Carousel */}
          <div
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto scrollbar-hide pb-8 -mx-4 px-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {properties.map((property) => (
              <div
                key={property.id}
                className="flex-shrink-0 w-[90%] sm:w-[45%] lg:w-[32%] xl:w-[24%] snap-start"
              >
                <PropertyCard
                  property={property}
                  onBookClick={onBookClick}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Swipe Indicator */}
        <div className="flex justify-center md:hidden mt-4">
          <div className="flex gap-1">
            <div className={`h-1 rounded-full transition-all duration-500 ${canScrollLeft ? 'bg-primary w-8' : 'bg-gray-200 w-4'}`} />
            <div className={`h-1 rounded-full transition-all duration-500 ${canScrollRight ? 'bg-primary w-8' : 'bg-gray-200 w-4'}`} />
          </div>
        </div>
      </div>
    </section>
  )
}
