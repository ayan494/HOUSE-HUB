"use client"

import { useRef, useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Star, Quote, MapPin } from 'lucide-react'

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
          className="flex gap-8 overflow-x-auto scrollbar-hide pb-12 -mx-4 px-4 snap-x snap-mandatory pt-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="flex-shrink-0 w-[320px] md:w-[400px] snap-start border-none bg-gradient-to-br from-white/80 to-white/40 dark:from-slate-900/80 dark:to-slate-900/40 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-3 rounded-[2.5rem] overflow-visible mb-4 group"
            >
              <CardContent className="p-8 relative">
                {/* Decorative Elements */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center -rotate-12 transition-transform group-hover:rotate-0 group-hover:scale-110 duration-500">
                  <Quote className="w-6 h-6 text-primary" />
                </div>

                {/* Rating */}
                <div className="flex gap-1.5 mb-8 justify-end">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 transition-transform duration-300 group-hover:scale-110`}
                      style={{ transitionDelay: `${i * 50}ms` }}
                      fill={i < testimonial.rating ? "#fbbf24" : "transparent"}
                      color={i < testimonial.rating ? "#fbbf24" : "#e2e8f0"}
                    />
                  ))}
                </div>

                {/* Text with elegant typography */}
                <div className="relative mb-10">
                  <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed font-medium italic">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                </div>

                {/* Author with premium feel */}
                <div className="flex items-center gap-4 pt-6 border-t border-slate-100 dark:border-slate-800">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-tr from-primary to-blue-400 rounded-full blur-[2px] opacity-20 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover relative border-2 border-white dark:border-slate-900 shadow-sm"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white text-lg tracking-tight">{testimonial.name}</p>
                    <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 font-semibold text-sm">
                      <MapPin className="w-3 h-3 text-primary" />
                      {testimonial.location}
                    </div>
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
