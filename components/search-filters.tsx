"use client"

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { SlidersHorizontal, X, MapPin, Bed, Wallet, Check } from 'lucide-react'
import { cities, amenitiesList } from '@/lib/data'

export function SearchFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [city, setCity] = useState(searchParams.get('city') || '')
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '')
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '')
  const [bedrooms, setBedrooms] = useState(searchParams.get('bedrooms') || '')
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(
    searchParams.get('amenities')?.split(',').filter(Boolean) || []
  )
  const [isOpen, setIsOpen] = useState(false)

  const applyFilters = () => {
    const params = new URLSearchParams()
    if (city) params.set('city', city)
    if (minPrice) params.set('minPrice', minPrice)
    if (maxPrice) params.set('maxPrice', maxPrice)
    if (bedrooms) params.set('bedrooms', bedrooms)
    if (selectedAmenities.length > 0) params.set('amenities', selectedAmenities.join(','))

    router.push(`/properties?${params.toString()}`)
    setIsOpen(false)
  }

  const clearFilters = () => {
    setCity('')
    setMinPrice('')
    setMaxPrice('')
    setBedrooms('')
    setSelectedAmenities([])
    router.push('/properties')
    setIsOpen(false)
  }

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    )
  }

  const hasActiveFilters = city || minPrice || maxPrice || bedrooms || selectedAmenities.length > 0

  return (
    <div className="flex items-center gap-4 flex-wrap">
      {/* Quick Filters - Desktop */}
      <div className="hidden lg:flex items-center gap-3">
        <Select value={city} onValueChange={setCity}>
          <SelectTrigger className="w-[160px] bg-background">
            <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
            <SelectValue placeholder="City" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Cities</SelectItem>
            {cities.map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={bedrooms} onValueChange={setBedrooms}>
          <SelectTrigger className="w-[160px] bg-background">
            <Bed className="w-4 h-4 mr-2 text-muted-foreground" />
            <SelectValue placeholder="Bedrooms" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1+ Bedroom</SelectItem>
            <SelectItem value="2">2+ Bedrooms</SelectItem>
            <SelectItem value="3">3+ Bedrooms</SelectItem>
            <SelectItem value="4">4+ Bedrooms</SelectItem>
            <SelectItem value="5">5+ Bedrooms</SelectItem>
          </SelectContent>
        </Select>

        <Select value={maxPrice} onValueChange={setMaxPrice}>
          <SelectTrigger className="w-[180px] bg-background">
            <Wallet className="w-4 h-4 mr-2 text-muted-foreground" />
            <SelectValue placeholder="Max Budget" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="50000">Up to PKR 50,000</SelectItem>
            <SelectItem value="100000">Up to PKR 100,000</SelectItem>
            <SelectItem value="150000">Up to PKR 150,000</SelectItem>
            <SelectItem value="200000">Up to PKR 200,000</SelectItem>
            <SelectItem value="300000">Up to PKR 300,000</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={applyFilters} className="h-10">
          Apply Filters
        </Button>

        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="w-4 h-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      {/* Filter Sheet - Mobile & All Filters */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="lg:hidden bg-transparent">
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filters
            {hasActiveFilters && (
              <span className="ml-2 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                {[city, minPrice, maxPrice, bedrooms, selectedAmenities.length > 0].filter(Boolean).length}
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[90vw] sm:w-[400px] md:w-[450px] overflow-y-auto p-6">
          <SheetHeader>
            <SheetTitle>Filter Properties</SheetTitle>
          </SheetHeader>

          <div className="mt-6 space-y-6">
            {/* City */}
            <div className="space-y-2">
              <Label>City</Label>
              <Select value={city} onValueChange={setCity}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cities</SelectItem>
                  {cities.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Bedrooms */}
            <div className="space-y-2">
              <Label>Bedrooms</Label>
              <Select value={bedrooms} onValueChange={setBedrooms}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select bedrooms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1+ Bedroom</SelectItem>
                  <SelectItem value="2">2+ Bedrooms</SelectItem>
                  <SelectItem value="3">3+ Bedrooms</SelectItem>
                  <SelectItem value="4">4+ Bedrooms</SelectItem>
                  <SelectItem value="5">5+ Bedrooms</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Price Range */}
            <div className="space-y-4">
              <Label>Price Range (PKR)</Label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="bg-background"
                  />
                </div>
                <div>
                  <Input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="bg-background"
                  />
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="space-y-3">
              <Label>Amenities</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {amenitiesList.map((amenity) => (
                  <div
                    key={amenity}
                    onClick={() => toggleAmenity(amenity)}
                    className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer transition-all ${selectedAmenities.includes(amenity)
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                      }`}
                  >
                    <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 ${selectedAmenities.includes(amenity)
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                      }`}>
                      {selectedAmenities.includes(amenity) && (
                        <Check className="w-3 h-3" />
                      )}
                    </div>
                    <span className="text-sm">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-6 mt-6 border-t border-border sticky bottom-0 bg-background pb-2">
              <Button variant="outline" className="flex-1 h-11" onClick={clearFilters}>
                Clear All
              </Button>
              <Button className="flex-1 h-11" onClick={applyFilters}>
                Apply Filters
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* More Filters Button - Desktop */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="hidden lg:flex bg-transparent">
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            More Filters
          </Button>
        </SheetTrigger>
      </Sheet>
    </div>
  )
}
