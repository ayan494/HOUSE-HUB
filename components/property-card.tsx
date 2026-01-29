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
    <Card className="group overflow-hidden bg-card border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={property.images[imageIndex] || "/placeholder.svg"}
          alt={property.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {property.isPremium && (
            <Badge className="bg-[var(--premium)] text-[var(--premium-foreground)] hover:bg-[var(--premium)]/90">
              <Crown className="w-3 h-3 mr-1" />
              Premium
            </Badge>
          )}
          {property.isFeatured && !property.isPremium && (
            <Badge variant="secondary">Featured</Badge>
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

      <CardContent className="p-4">
        {/* Location & Rating */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
            <MapPin className="w-4 h-4" />
            <span>{property.location}, {property.city}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-medium">{property.rating}</span>
            <span className="text-sm text-muted-foreground">({property.reviews})</span>
          </div>
        </div>

        {/* Title */}
        <Link href={`/property/${property.id}`}>
          <h3 className="font-semibold text-lg text-foreground mb-3 hover:text-primary transition-colors line-clamp-1">
            {property.name}
          </h3>
        </Link>

        {/* Features */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1.5">
            <Bed className="w-4 h-4" />
            <span>{property.bedrooms} Beds</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="w-4 h-4" />
            <span>{property.bathrooms} Baths</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Square className="w-4 h-4" />
            <span>{property.area} sqft</span>
          </div>
        </div>

        {/* Amenities preview */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {property.amenities.slice(0, 3).map((amenity) => (
            <Badge key={amenity} variant="secondary" className="text-xs font-normal">
              {amenity}
            </Badge>
          ))}
          {property.amenities.length > 3 && (
            <Badge variant="outline" className="text-xs font-normal">
              +{property.amenities.length - 3} more
            </Badge>
          )}
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div>
            <span className="text-xl font-bold text-primary">{formatPrice(property.price)}</span>
            <span className="text-sm text-muted-foreground">/month</span>
          </div>
          <Button 
            size="sm" 
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
