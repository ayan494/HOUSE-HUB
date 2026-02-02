"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, MapPin, Bed, Calendar, Wallet } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { cities } from '@/lib/data'
import Link from 'next/link'

export function Hero() {
  const router = useRouter()
  const [location, setLocation] = useState('')
  const [budget, setBudget] = useState('')
  const [bedrooms, setBedrooms] = useState('')
  const { toast } = useToast()

  const handleSearch = () => {
    // Require at least one selection before searching on home
    if (!location && !budget && !bedrooms) {
      toast({
        title: 'Select a filter',
        description: 'Please select at least one option before searching.',
      })
      return
    }

    const params = new URLSearchParams()
    if (location) params.set('city', location)
    if (budget) params.set('maxPrice', budget)
    if (bedrooms) params.set('bedrooms', bedrooms)
    router.push(`/properties?${params.toString()}`)
  }

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div 
            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in"
            style={{ animationDelay: '0.1s' }}
          >
            <MapPin className="w-4 h-4" />
            Pakistan&apos;s Premier Rental Platform
          </div>

          {/* Headline */}
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight text-balance animate-fade-in"
            style={{ animationDelay: '0.2s' }}
          >
            Find Your Perfect{' '}
            <span className="text-primary">Home</span>{' '}
            in Pakistan
          </h1>

          {/* Subheadline */}
          <p 
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-pretty animate-fade-in"
            style={{ animationDelay: '0.3s' }}
          >
            Search, discover, and connect directly with house owners near you. 
            No middlemen, no hidden fees.
          </p>

          {/* Search Form */}
          <div 
            className="bg-card rounded-2xl p-4 md:p-6 shadow-xl border border-border animate-fade-in"
            style={{ animationDelay: '0.4s' }}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Location */}
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger className="pl-10 h-12 bg-background">
                    <SelectValue placeholder="Select City" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Budget */}
              <div className="relative">
                <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Select value={budget} onValueChange={setBudget}>
                  <SelectTrigger className="pl-10 h-12 bg-background">
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
              </div>

              {/* Bedrooms */}
              <div className="relative">
                <Bed className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Select value={bedrooms} onValueChange={setBedrooms}>
                  <SelectTrigger className="pl-10 h-12 bg-background">
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
              </div>

              {/* Search Button */}
                  <div className="flex items-end">
                    <Button 
                      onClick={handleSearch} 
                      className="h-12 w-full md:w-auto text-base font-medium whitespace-nowrap gap-2"
                      disabled={!location && !budget && !bedrooms}
                    >
                      <Search className="w-5 h-5" />
                      <span>Search</span>
                    </Button>
                  </div>
            </div>
          </div>

          {/* Owner CTA */}
          <div 
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in"
            style={{ animationDelay: '0.5s' }}
          >
            <p className="text-muted-foreground">Are you a home owner?</p>
            <Link href="/auth/register?role=owner">
              <Button variant="outline" className="group bg-transparent">
                List Your Property
                <Calendar className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div 
            className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto animate-fade-in"
            style={{ animationDelay: '0.6s' }}
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground mt-1">Properties</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">7</div>
              <div className="text-sm text-muted-foreground mt-1">Cities</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">1000+</div>
              <div className="text-sm text-muted-foreground mt-1">Happy Tenants</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
