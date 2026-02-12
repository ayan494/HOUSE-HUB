"use client"

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Star, MapPin, Bed, Bath, Square, Heart, Crown } from 'lucide-react'
import type { Property } from '@/lib/types'

interface PropertyCardProps {
  property: Property
  onBookClick?: (property: Property) => void
}

export function PropertyCard({ property, onBookClick }: PropertyCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [imageIndex, setImageIndex] = useState(0)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <Card className="group overflow-hidden bg-card border border-border/50 hover:border-primary/30 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col h-full rounded-[2rem]">
      {/* Image Container */}
      <div className="relative h-64 sm:h-72 w-full flex-shrink-0 overflow-hidden bg-muted">
        <Image
          src={property.images[imageIndex] || "/placeholder.svg"}
          alt={property.name}
          fill
          className="object-cover object-center transition-transform duration-1000 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Premium Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

        {/* Badges - Glassmorphism style */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {property.isPremium && (
            <Badge className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              <Crown className="w-3 h-3 mr-1 text-primary" />
              Premium
            </Badge>
          )}
          {property.isFeatured && !property.isPremium && (
            <Badge className="bg-primary/20 backdrop-blur-md border border-primary/20 text-primary hover:bg-primary/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Featured
            </Badge>
          )}
        </div>

        {/* Like Button */}
        <button
          onClick={(e) => {
            e.preventDefault()
            setIsLiked(!isLiked)
          }}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all hover:bg-white hover:text-black hover:scale-110"
        >
          <Heart className={`w-5 h-5 transition-colors ${isLiked ? 'fill-red-500 text-red-500 border-none' : 'text-white'}`} />
        </button>

        {/* Image Pagination Dots */}
        {property.images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 p-1.5 bg-black/20 backdrop-blur-sm rounded-full">
            {property.images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.preventDefault()
                  setImageIndex(idx)
                }}
                className={`w-1.5 h-1.5 rounded-full transition-all ${idx === imageIndex ? 'bg-primary w-4' : 'bg-white/50'
                  }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content Section */}
      <CardContent className="p-6 flex-1 flex flex-col">
        {/* Price & Rating Row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <span className="text-2xl font-black text-primary leading-none">{formatPrice(property.price)}</span>
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-widest mt-1">per month</span>
          </div>
          <div className="flex items-center gap-1 px-3 py-1 bg-primary/5 rounded-full">
            <Star className="w-4 h-4 fill-primary text-primary" />
            <span className="text-sm font-black text-primary">{property.rating}</span>
          </div>
        </div>

        {/* Title */}
        <Link href={`/property/${property.id}`}>
          <h3 className="text-xl font-bold text-foreground mb-3 hover:text-primary transition-colors line-clamp-1 h-7">
            {property.name}
          </h3>
        </Link>

        {/* Location */}
        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-6">
          <MapPin className="w-4 h-4 text-primary/60" />
          <span className="truncate">{property.location}, {property.city}</span>
        </div>

        {/* Specs Table-like design */}
        <div className="grid grid-cols-3 gap-4 py-4 border-y border-border/50 mb-6">
          <div className="flex flex-col items-center gap-1">
            <Bed className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs font-bold">{property.bedrooms} Beds</span>
          </div>
          <div className="border-x border-border/50 flex flex-col items-center gap-1">
            <Bath className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs font-bold">{property.bathrooms} Baths</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Square className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs font-bold">{property.area} sqft</span>
          </div>
        </div>

        {/* CTA Button */}
        <Button
          className="w-full h-12 rounded-2xl text-base font-bold transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/10 mt-auto"
          onClick={(e) => {
            e.preventDefault()
            onBookClick?.(property)
          }}
        >
          Schedule a Tour
        </Button>
      </CardContent>
    </Card>
  )
}
