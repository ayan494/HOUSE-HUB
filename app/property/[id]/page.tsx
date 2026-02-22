"use client"

import { useState, useEffect, use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { BookingModal } from '@/components/booking-modal'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ArrowLeft,
  MapPin,
  Bed,
  Bath,
  Square,
  Star,
  Crown,
  Phone,
  Mail,
  Calendar,
  Check,
  Share2,
  Heart,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { getPropertiesById } from '@/lib/store'
import { properties } from '@/lib/data'
import type { Property } from '@/lib/types'

import { addToRecentlyViewed } from '@/lib/store'

export default function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const property = getPropertiesById(resolvedParams.id)

  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)
  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    if (property) {
      addToRecentlyViewed(property)
    }
  }, [property])

  if (!property) {
    notFound()
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      maximumFractionDigits: 0,
    }).format(price)
  }

  const similarProperties = properties
    .filter(p => p.id !== property.id && p.city === property.city)
    .slice(0, 3)

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % property.images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + property.images.length) % property.images.length)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20">
        {/* Back button */}
        <div className="container mx-auto px-4 py-4">
          <Link href="/properties">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Properties
            </Button>
          </Link>
        </div>

        {/* Image Gallery */}
        <div className="relative h-[50vh] md:h-[60vh] bg-muted">
          <Image
            src={property.images[currentImage] || "/placeholder.svg"}
            alt={property.name}
            fill
            className="object-cover"
            priority
          />

          {/* Navigation arrows */}
          {property.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:bg-white transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:bg-white transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Image indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {property.images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImage(idx)}
                className={`w-2 h-2 rounded-full transition-all ${idx === currentImage ? 'bg-white w-6' : 'bg-white/60'
                  }`}
              />
            ))}
          </div>

          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            {property.isPremium && (
              <Badge className="bg-[var(--premium)] text-[var(--premium-foreground)]">
                <Crown className="w-3 h-3 mr-1" />
                Premium
              </Badge>
            )}
            {property.isFeatured && (
              <Badge variant="secondary">Featured</Badge>
            )}
          </div>

          {/* Actions */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:bg-white transition-colors"
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
            </button>
            <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:bg-white transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Title & Location */}
              <div>
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>{property.location}, {property.city}</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {property.name}
                </h1>
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                    <span className="font-medium">{property.rating}</span>
                    <span className="text-muted-foreground">({property.reviews} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6 text-center">
                    <Bed className="w-8 h-8 mx-auto text-primary mb-2" />
                    <p className="text-2xl font-bold text-foreground">{property.bedrooms}</p>
                    <p className="text-sm text-muted-foreground">Bedrooms</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 text-center">
                    <Bath className="w-8 h-8 mx-auto text-primary mb-2" />
                    <p className="text-2xl font-bold text-foreground">{property.bathrooms}</p>
                    <p className="text-sm text-muted-foreground">Bathrooms</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 text-center">
                    <Square className="w-8 h-8 mx-auto text-primary mb-2" />
                    <p className="text-2xl font-bold text-foreground">{property.area}</p>
                    <p className="text-sm text-muted-foreground">Sq. Ft.</p>
                  </CardContent>
                </Card>
              </div>

              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle>About This Property</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {property.description}
                  </p>
                </CardContent>
              </Card>

              {/* Amenities */}
              <Card>
                <CardHeader>
                  <CardTitle>Amenities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {property.amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                          <Check className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-foreground">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Price Card */}
              <Card className="sticky top-24">
                <CardContent className="pt-6">
                  <div className="text-center mb-6">
                    <p className="text-3xl font-bold text-primary">
                      {formatPrice(property.price)}
                    </p>
                    <p className="text-muted-foreground">per month</p>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                    <Calendar className="w-4 h-4" />
                    <span>Available from {new Date(property.availableFrom).toLocaleDateString()}</span>
                  </div>

                  <Button
                    className="w-full h-12 text-base mb-4"
                    onClick={() => setIsBookingOpen(true)}
                  >
                    Book Now
                  </Button>

                  {/* Owner Info */}
                  <div className="border-t border-border pt-6">
                    <h4 className="font-medium text-foreground mb-4">Property Owner</h4>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-lg">
                        {property.owner.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{property.owner.name}</p>
                        {property.owner.verified && (
                          <Badge variant="secondary" className="text-xs">Verified</Badge>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="w-4 h-4" />
                        <span>{property.owner.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="w-4 h-4" />
                        <span>{property.owner.email}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Similar Properties */}
          {similarProperties.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-foreground mb-6">Similar Properties</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {similarProperties.map((p) => (
                  <Link key={p.id} href={`/property/${p.id}`}>
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative h-48">
                        <Image
                          src={p.images[0] || "/placeholder.svg"}
                          alt={p.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="pt-4">
                        <h3 className="font-medium text-foreground line-clamp-1">{p.name}</h3>
                        <p className="text-sm text-muted-foreground">{p.location}</p>
                        <p className="text-primary font-semibold mt-2">{formatPrice(p.price)}/month</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* Booking Modal */}
      <BookingModal
        property={property}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  )
}
