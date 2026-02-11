"use client"

import { useRef, useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Aisha Rahman',
    location: 'Lahore',
    avatar: 'A',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    rating: 5,
    text: 'HouseHub made finding my dream apartment so easy! The direct connection with owners saved me from dealing with agents and their fees.',
  },
  {
    id: 2,
    name: 'Bilal Ahmed',
    location: 'Karachi',
    avatar: 'B',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    rating: 5,
    text: 'As a property owner, listing on HouseHub has been fantastic. I found reliable tenants within a week and the premium features really helped.',
  },
  {
    id: 3,
    name: 'Fatima Hassan',
    location: 'Islamabad',
    avatar: 'F',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    rating: 5,
    text: 'The filtering options are excellent. I could easily find properties within my budget and preferred locations. Highly recommended!',
  },
  {
    id: 4,
    name: 'Omar Khan',
    location: 'Rawalpindi',
    avatar: 'O',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    rating: 4,
    text: 'Great platform for both tenants and owners. The booking system is smooth and the customer support team is very responsive.',
  },
  {
    id: 5,
    name: 'Sara Malik',
    location: 'Lahore',
    avatar: 'S',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
    rating: 5,
    text: 'I was skeptical at first, but HouseHub exceeded my expectations. Found a beautiful house in DHA within days of searching.',
  },
]

export function Testimonials() {
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
      const scrollAmount = 320
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              What Our Users Say
            </h2>
            <p className="text-muted-foreground text-lg">
              Join thousands of satisfied tenants and property owners.
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
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="flex-shrink-0 w-[300px] snap-start border-border"
            >
              <CardContent className="pt-6">
                {/* Quote icon */}
                <Quote className="w-8 h-8 text-primary/20 mb-4" />

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < testimonial.rating
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-muted'
                        }`}
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="text-foreground mb-6 leading-relaxed">
                  &ldquo;{testimonial.text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mobile scroll hint */}
        <div className="flex md:hidden items-center justify-center gap-2 mt-4">
          <span className="text-sm text-muted-foreground">Swipe to see more</span>
        </div>
      </div>
    </section>
  )
}
