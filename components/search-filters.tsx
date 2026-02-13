"use client"

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from '@/components/ui/sheet'
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
        <SheetContent side="right" className="w-full sm:w-[400px] md:w-[450px] p-0 border-none flex flex-col h-full">
          <SheetHeader className="p-6 border-b border-border/50">
            <SheetTitle className="text-2xl font-black text-slate-900">Filter Properties</SheetTitle>
            <SheetDescription className="text-slate-500 font-medium">
              Fine-tune your search to find the perfect match.
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {/* City Selection */}
            <div className="space-y-3">
              <Label className="text-base font-bold text-slate-700 ml-1 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#6699cc]" />
                Target City
              </Label>
              <Select value={city} onValueChange={setCity}>
                <SelectTrigger className="h-12 rounded-2xl border-2 bg-background focus:ring-[#6699cc]">
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-2">
                  <SelectItem value="all" className="font-medium">All Cities</SelectItem>
                  {cities.map((c) => (
                    <SelectItem key={c} value={c} className="font-medium">{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Bedrooms Selection */}
            <div className="space-y-3">
              <Label className="text-base font-bold text-slate-700 ml-1 flex items-center gap-2">
                <Bed className="w-4 h-4 text-[#6699cc]" />
                Bedrooms
              </Label>
              <div className="grid grid-cols-3 gap-2">
                {['1', '2', '3', '4', '5'].map((num) => (
                  <button
                    key={num}
                    onClick={() => setBedrooms(num === bedrooms ? '' : num)}
                    className={cn(
                      "h-12 rounded-2xl border-2 font-bold transition-all",
                      bedrooms === num
                        ? "border-[#6699cc] bg-[#6699cc]/5 text-[#6699cc]"
                        : "border-slate-100 bg-slate-50/50 text-slate-500 hover:border-slate-200"
                    )}
                  >
                    {num}{num === '5' ? '+' : ''}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-4">
              <Label className="text-base font-bold text-slate-700 ml-1 flex items-center gap-2">
                <Wallet className="w-4 h-4 text-[#6699cc]" />
                Price Range (PKR)
              </Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Minimum</span>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">PKR</span>
                    <Input
                      type="number"
                      placeholder="0"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="h-12 pl-12 rounded-2xl border-2 bg-background font-bold focus-visible:ring-[#6699cc]"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Maximum</span>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">PKR</span>
                    <Input
                      type="number"
                      placeholder="Any"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="h-12 pl-12 rounded-2xl border-2 bg-background font-bold focus-visible:ring-[#6699cc]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Amenities Section */}
            <div className="space-y-4">
              <Label className="text-base font-bold text-slate-700 ml-1 flex items-center gap-2">
                <Check className="w-4 h-4 text-[#6699cc]" />
                Must-Have Amenities
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {amenitiesList.map((amenity) => (
                  <div
                    key={amenity}
                    onClick={() => toggleAmenity(amenity)}
                    className={cn(
                      "flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all",
                      selectedAmenities.includes(amenity)
                        ? "border-[#6699cc] bg-[#6699cc]/5 shadow-sm"
                        : "border-slate-100 hover:border-slate-200 bg-slate-50/50"
                    )}
                  >
                    <div className={cn(
                      "w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors",
                      selectedAmenities.includes(amenity)
                        ? "bg-[#6699cc] text-white"
                        : "bg-white border-2 border-slate-200"
                    )}>
                      {selectedAmenities.includes(amenity) && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <span className={cn(
                      "text-sm font-bold",
                      selectedAmenities.includes(amenity) ? "text-[#6699cc]" : "text-slate-600"
                    )}>
                      {amenity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Fixed Footer Actions */}
          <div className="p-6 border-t border-border/50 bg-background/80 backdrop-blur-md grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="h-14 rounded-2xl font-bold border-2 hover:bg-slate-50 transition-all"
              onClick={clearFilters}
            >
              Clear All
            </Button>
            <Button
              className="h-14 rounded-2xl font-black text-lg shadow-xl shadow-[#6699cc]/20 transition-all hover:scale-[1.02]"
              style={{ backgroundColor: '#6699cc' }}
              onClick={applyFilters}
            >
              Apply Filters
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* More Filters Button - Desktop */}
      <Button
        variant="outline"
        size="sm"
        className="hidden lg:flex bg-transparent"
        onClick={() => setIsOpen(true)}
      >
        <SlidersHorizontal className="w-4 h-4 mr-2" />
        More Filters
      </Button>
    </div>
  )
}
