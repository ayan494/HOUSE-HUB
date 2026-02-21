"use client"

import { useRef, useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Star, Quote, MapPin, Loader2 } from 'lucide-react'

interface Review {
  _id: string;
  userName: string;
  rating: number;
  text: string;
  location?: string;
  avatar?: string;
  date: string;
}

import { getReviews } from '@/lib/store'

export function Testimonials() {
  const [reviews, setReviews] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const staticReviews = [
    {
      _id: 's1',
      userName: 'Ali Raza',
      rating: 5,
      text: "Rentora made my house hunting in Lahore so much easier. Found a great place in DHA in just 3 days!",
      location: 'Lahore',
      date: '2026-01-15'
    },
    {
      _id: 's2',
      userName: 'Zainab Bibi',
      rating: 4,
      text: "The search filters are very helpful. I could find exactly what I needed within my budget in Karachi.",
      location: 'Karachi',
      date: '2026-01-20'
    },
    {
      _id: 's3',
      userName: 'Hamza Malik',
      rating: 5,
      text: "Excellent platform! The owner verification gives peace of mind. Highly recommended for rentals in Islamabad.",
      location: 'Islamabad',
      date: '2026-02-05'
    }
  ]

  useEffect(() => {
    const loadReviews = () => {
      try {
        const storedReviews = getReviews()
        setReviews([...storedReviews, ...staticReviews])
      } catch (error) {
        console.error('Error loading reviews:', error)
        setReviews(staticReviews)
      } finally {
        setIsLoading(false)
      }
    }

    loadReviews()
  }, [])

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
  }, [reviews])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  if (isLoading) {
    return (
      <div className="py-16 flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
        <p className="text-muted-foreground">Loading reviews...</p>
      </div>
    )
  }

  if (reviews.length === 0) {
    return null; // Or show a default message
  }

  return (
    <section className="py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              What Our Users Say
            </h2>
            <p className="text-muted-foreground text-lg">
              Real feedback from our trusted community.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="rounded-full hover:bg-primary/10 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="rounded-full hover:bg-primary/10 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-12 -mx-4 px-4 snap-x snap-mandatory pt-4 touch-pan-x"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {reviews.map((review) => (
            <Card
              key={review._id}
              className="flex-shrink-0 w-[300px] md:w-[400px] snap-start border border-border bg-card shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 rounded-[2rem] overflow-hidden mb-4 group"
            >
              <CardContent className="p-8 relative">
                {/* Decorative Quote */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#6699cc]/10 rounded-2xl flex items-center justify-center -rotate-12 transition-transform group-hover:rotate-0 duration-500">
                  <Quote className="w-6 h-6 text-[#6699cc]" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-6 justify-end">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 transition-transform duration-300 group-hover:scale-110`}
                      fill={i < review.rating ? "#6699cc" : "transparent"}
                      color={i < review.rating ? "#6699cc" : "#e2e8f0"}
                    />
                  ))}
                </div>

                {/* Review Text */}
                <div className="mb-8">
                  <p className="text-foreground text-lg leading-relaxed italic font-medium">
                    &ldquo;{review.text}&rdquo;
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-4 pt-6 border-t border-border">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#6699cc]/20 bg-muted flex items-center justify-center text-[#6699cc] font-bold text-lg">
                    {review.avatar ? (
                      <img src={review.avatar} alt={review.userName} className="w-full h-full object-cover" />
                    ) : (
                      review.userName.charAt(0).toUpperCase()
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-foreground">{review.userName}</p>
                    {review.location && (
                      <div className="flex items-center gap-1 text-muted-foreground text-xs">
                        <MapPin className="w-3 h-3 text-[#6699cc]" />
                        {review.location}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mobile Swipe Indicator */}
        <div className="flex md:hidden items-center justify-center gap-2 mt-4">
          <div className="flex gap-1">
            {reviews.map((_, i) => (
              <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === 0 ? 'w-4 bg-[#6699cc]' : 'bg-muted'}`} />
            ))}
          </div>
          <span className="text-xs text-muted-foreground ml-2 font-medium">Swipe for more</span>
        </div>
      </div>
    </section>
  )
}
