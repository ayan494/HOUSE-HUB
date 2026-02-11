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
      style: 'decimal',
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <Card className="group overflow-hidden bg-white dark:bg-card border-none shadow-lg hover:shadow-2xl transition-all duration-500 rounded-[2.5rem] flex flex-col h-full ring-1 ring-black/5 dark:ring-white/5 !p-0 !gap-0">
      {/* Image Container */}
      <div className="relative h-64 sm:h-72 w-full flex-shrink-0 overflow-hidden">
        <Image
          src={property.images[imageIndex] || "/placeholder.svg"}
          alt={property.name}
          fill
          className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          {property.isPremium && (
            <div className="bg-primary/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center shadow-lg border border-white/20">
              <Crown className="w-3 h-3 mr-1.5 fill-white" />
              Premium
            </div>
          )}
          {property.isFeatured && !property.isPremium && (
            <div className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/30">
              Featured
            </div>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.preventDefault()
            setIsLiked(!isLiked)
          }}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center transition-all hover:bg-white hover:border-white group/heart z-10"
        >
          <Heart className={`w-5 h-5 transition-colors ${isLiked ? 'fill-red-500 text-red-500' : 'text-white group-hover/heart:text-red-500'}`} />
        </button>

        {/* Price Tag Overlay (Bottom Left) */}
        <div className="absolute bottom-4 left-4 z-10">
          <div className="text-white">
            <span className="text-2xl font-black">Rs {formatPrice(property.price)}</span>
            <span className="text-xs text-white/70 ml-1 font-medium italic">/mo</span>
          </div>
        </div>

        {/* Image dots */}
        {property.images.length > 1 && (
          <div className="absolute bottom-4 right-4 flex gap-1.5 z-10">
            {property.images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.preventDefault()
                  setImageIndex(idx)
                }}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === imageIndex ? 'bg-primary w-4' : 'bg-white/40 hover:bg-white/60'
                  }`}
              />
            ))}
          </div>
        )}
      </div>

      <CardContent className="p-6 flex-1 flex flex-col pt-5">
        {/* Rating & Location Row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5 px-2 py-1 bg-amber-50 dark:bg-amber-950/30 rounded-lg">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-sm font-bold text-amber-700 dark:text-amber-400">{property.rating}</span>
            <span className="text-[10px] text-amber-600/60 dark:text-amber-400/50">({property.reviews})</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground text-sm font-medium">
            <MapPin className="w-3.5 h-3.5" />
            <span className="truncate">{property.city}</span>
          </div>
        </div>

        {/* Title */}
        <Link href={`/property/${property.id}`}>
          <h3 className="font-bold text-xl text-foreground mb-4 hover:text-primary transition-colors line-clamp-1 leading-tight tracking-tight">
            {property.name}
          </h3>
        </Link>

        {/* Features Grid */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          <div className="flex flex-col items-center p-2 bg-gray-50 dark:bg-white/5 rounded-2xl">
            <Bed className="w-4 h-4 text-primary mb-1" />
            <span className="text-xs font-bold">{property.bedrooms}</span>
            <span className="text-[9px] text-muted-foreground uppercase tracking-wider">Beds</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-gray-50 dark:bg-white/5 rounded-2xl">
            <Bath className="w-4 h-4 text-primary mb-1" />
            <span className="text-xs font-bold">{property.bathrooms}</span>
            <span className="text-[9px] text-muted-foreground uppercase tracking-wider">Baths</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-gray-50 dark:bg-white/5 rounded-2xl">
            <Square className="w-4 h-4 text-primary mb-1" />
            <span className="text-xs font-bold">{property.area}</span>
            <span className="text-[9px] text-muted-foreground uppercase tracking-wider">Sqft</span>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex items-center gap-3 mt-auto pt-2">
          <Link href={`/property/${property.id}`} className="flex-1">
            <Button
              variant="outline"
              className="w-full rounded-2xl border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 font-bold h-12"
            >
              Details
            </Button>
          </Link>
          <Button
            className="flex-1 rounded-2xl font-bold h-12 shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            onClick={(e) => {
              e.preventDefault()
              onBookClick?.(property)
            }}
          >
            Book Now
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
