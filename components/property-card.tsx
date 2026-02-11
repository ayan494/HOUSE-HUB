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
    <Card className="group overflow-hidden bg-card border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative h-56 sm:h-64 md:h-72 w-full flex-shrink-0 p-0 m-0 overflow-hidden bg-gray-200">
        <Image
          src={property.images[imageIndex] || "/placeholder.svg"}
          alt={property.name}
          fill
          className="object-cover object-center block transition-transform duration-500 group-hover:scale-110 w-full h-full"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {property.isPremium && (
            <Badge className="bg-[var(--premium)] text-[var(--premium-foreground)] hover:bg-[var(--premium)]/90 text-xs sm:text-sm px-2 py-0.5">
              <Crown className="w-3 h-3 mr-1" />
              <span className="hidden sm:inline">Premium</span>
              <span className="sm:hidden">Prm</span>
            </Badge>
          )}
          {property.isFeatured && !property.isPremium && (
            <Badge variant="secondary" className="text-xs sm:text-sm px-2 py-0.5">Featured</Badge>
          )}
        </div>

        {/* Like Button */}
        <button
          onClick={(e) => {
            e.preventDefault()
            setIsLiked(!isLiked)
          }}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center transition-transform hover:scale-110"
        >
          <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
        </button>

        {/* Image dots */}
        {property.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {property.images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.preventDefault()
                  setImageIndex(idx)
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === imageIndex ? 'bg-white w-4' : 'bg-white/60'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <CardContent className="p-3 sm:p-4 flex-1 flex flex-col">
        {/* Location & Rating */}
        <div className="flex items-center justify-between mb-1.5 gap-2">
          <div className="flex items-center gap-1 text-muted-foreground text-xs sm:text-sm flex-1 min-w-0">
            <MapPin className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">{property.location}, {property.city}</span>
          </div>
          <div className="flex items-center gap-0.5 flex-shrink-0">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="text-xs sm:text-sm font-medium">{property.rating}</span>
            <span className="text-xs text-muted-foreground hidden sm:inline">({property.reviews})</span>
          </div>
        </div>

        {/* Title */}
        <Link href={`/property/${property.id}`}>
          <h3 className="font-semibold text-sm sm:text-base text-foreground mb-2 hover:text-primary transition-colors line-clamp-1">
            {property.name}
          </h3>
        </Link>

        {/* Features */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-2">
          <div className="flex items-center gap-1">
            <Bed className="w-3 h-3" />
            <span>{property.bedrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-3 h-3" />
            <span>{property.bathrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Square className="w-3 h-3" />
            <span>{property.area}</span>
          </div>
        </div>

        {/* Amenities preview */}
        <div className="flex flex-wrap gap-1 mb-2 hidden sm:flex">
          {property.amenities.slice(0, 2).map((amenity) => (
            <Badge key={amenity} variant="secondary" className="text-xs font-normal">
              {amenity}
            </Badge>
          ))}
          {property.amenities.length > 2 && (
            <Badge variant="outline" className="text-xs font-normal">
              +{property.amenities.length - 2}
            </Badge>
          )}
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-2 border-t border-border mt-auto gap-2">
          <div>
            <span className="text-base sm:text-lg font-bold text-primary">{formatPrice(property.price)}</span>
            <span className="text-xs text-muted-foreground">/mo</span>
          </div>
          <Button 
            size="sm" 
            className="text-xs sm:text-sm"
            onClick={(e) => {
              e.preventDefault()
              onBookClick?.(property)
            }}
          >
            Book
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
