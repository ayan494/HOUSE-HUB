"use client"

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Star, MapPin, Bed, Bath, Square, Heart, Crown, ShieldCheck } from 'lucide-react'
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
    <Card className="group overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full rounded-2xl p-0 shadow-sm hover:shadow-xl">
      {/* Image Container */}
      <div className="relative h-64 sm:h-72 w-full flex-shrink-0 overflow-hidden bg-muted m-0 p-0">
        <Image
          src={property.images[imageIndex] || "/placeholder.svg"}
          alt={property.name}
          fill
          className="w-full object-cover object-center transition-transform duration-1000 group-hover:scale-110 m-0"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Glossy Overlay for Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          <Badge className="bg-[#2ecc71] text-black border-none px-3 py-1.5 rounded-full text-[10px] font-black tracking-wider shadow-lg flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" />
            VERIFIED
          </Badge>
          {property.isPremium && (
            <Badge className="bg-primary/90 backdrop-blur-md text-primary-foreground border-none px-3 py-1.5 rounded-full text-[10px] font-black tracking-wider shadow-lg">
              <Crown className="w-3 h-3 mr-1" />
              PREMIUM
            </Badge>
          )}
        </div>

        {/* Glass Like Button */}
        <button
          onClick={(e) => {
            e.preventDefault()
            setIsLiked(!isLiked)
          }}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center transition-all hover:bg-white/20 active:scale-95 z-10"
        >
          <Heart className={`w-5 h-5 transition-colors ${isLiked ? 'fill-red-500 text-red-500' : 'text-white'}`} />
        </button>

        {/* Price Tag Floating */}
        <div className="absolute bottom-4 left-4 glass-card text-foreground px-4 py-2 rounded-xl border border-white/10 z-10">
          <span className="text-lg font-black">{formatPrice(property.price)}</span>
          <span className="text-[10px] opacity-70 ml-1 uppercase font-bold tracking-tighter">/ month</span>
        </div>
      </div>

      <CardContent className="p-6 flex-1 flex flex-col bg-card">
        {/* Title & Rating */}
        <div className="flex items-start justify-between mb-3 gap-4">
          <Link href={`/property/${property.id}`} className="flex-1">
            <h3 className="font-bold text-lg text-foreground hover:text-primary transition-colors line-clamp-1 leading-tight">
              {property.name}
            </h3>
          </Link>
          <div className="flex items-center gap-1.5 bg-muted px-2 py-1 rounded-lg shrink-0 border border-border">
            <Star className="w-4 h-4 fill-[#f1c40f] text-[#f1c40f]" />
            <span className="text-sm font-bold text-foreground">{property.rating}</span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-4">
          <MapPin className="w-4 h-4 shrink-0 text-primary" />
          <span className="truncate font-medium">{property.location}, {property.city}</span>
        </div>

        {/* Features Row */}
        <div className="grid grid-cols-3 gap-2 py-4 border-y border-border mb-4">
          <div className="flex flex-col items-center gap-1">
            <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center">
              <Bed className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
            <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">{property.bedrooms} Bed</span>
          </div>
          <div className="flex flex-col items-center gap-1 border-x border-border">
            <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center">
              <Bath className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
            <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">{property.bathrooms} Bath</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center">
              <Square className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
            <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">{property.area} Sqft</span>
          </div>
        </div>

        {/* CTA Button */}
        <Button
          onClick={(e) => {
            e.preventDefault()
            onBookClick?.(property)
          }}
          className="w-full rounded-xl py-6 font-bold text-base shadow-lg bg-primary hover:bg-primary/90 text-white transition-all hover:glow-blue active:scale-[0.98]"
        >
          View Details & Book
        </Button>
      </CardContent>
    </Card>
  )
}
