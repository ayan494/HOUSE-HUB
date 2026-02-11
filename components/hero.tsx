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

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault()

    if (!location && !budget && !bedrooms) {
      return // Button should be disabled anyway, but safety check
    }

    const params = new URLSearchParams()
    if (location) params.set('city', location)
    if (budget) params.set('maxPrice', budget)
    if (bedrooms) params.set('bedrooms', bedrooms)

    router.push(`/properties?${params.toString()}`)
  }

  const isSearchDisabled = !location.trim() && !budget.trim() && !bedrooms.trim()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden p-0 m-0">
      {/* Background with dark luxury overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat m-0 p-0"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=80)',
        }}
      >
        {/* Dark gradient overlay for maximum readability (60-70% opacity) */}
        <div className="absolute inset-0 bg-black/60 md:bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 flex flex-col items-center">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white border border-white/20 px-6 py-2 rounded-full text-sm font-semibold mb-8 animate-fade-in"
            style={{ animationDelay: '0.1s' }}
          >
            <MapPin className="w-4 h-4 text-primary" />
            PAKISTAN&apos;S PREMIER RENTAL PLATFORM
          </div>

          {/* Headline */}
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-[1.1] animate-fade-in tracking-tight"
            style={{ animationDelay: '0.2s' }}
          >
            Find Your <span className="text-primary italic">Dream</span>{' '}
            Home
          </h1>

          {/* Subheadline */}
          <p
            className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto animate-fade-in font-medium"
            style={{ animationDelay: '0.3s' }}
          >
            Discover premium apartments and houses across Pakistan with zero middlemen. Enter your requirements below.
          </p>

          {/* Structured Modern Search Bar */}
          <div
            className="w-full max-w-5xl mx-auto animate-fade-in"
            style={{ animationDelay: '0.4s' }}
          >
            <form
              onSubmit={handleSearch}
              className="bg-white/95 backdrop-blur-xl p-3 md:p-4 rounded-[2rem] md:rounded-full shadow-2xl border-4 border-white/20 flex flex-col md:flex-row items-center gap-3"
            >
              {/* Location Input */}
              <div className="flex-1 w-full flex items-center px-4 py-2 border-b md:border-b-0 md:border-r border-gray-100 group">
                <MapPin className="w-5 h-5 text-primary mr-3 shrink-0 transition-transform group-focus-within:scale-110" />
                <div className="flex-1 text-left">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5 ml-0.5">Location</label>
                  <input
                    type="text"
                    placeholder="Which city?"
                    className="w-full bg-transparent border-none outline-none text-gray-900 placeholder:text-gray-400 font-bold text-lg"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>

              {/* Budget Input */}
              <div className="flex-1 w-full flex items-center px-4 py-2 border-b md:border-b-0 md:border-r border-gray-100 group">
                <Wallet className="w-5 h-5 text-primary mr-3 shrink-0 transition-transform group-focus-within:scale-110" />
                <div className="flex-1 text-left">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5 ml-0.5">Max Budget</label>
                  <input
                    type="number"
                    placeholder="PKR 50,000"
                    className="w-full bg-transparent border-none outline-none text-gray-900 placeholder:text-gray-400 font-bold text-lg"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                  />
                </div>
              </div>

              {/* Rooms Input */}
              <div className="flex-1 w-full flex items-center px-4 py-2 group">
                <Bed className="w-5 h-5 text-primary mr-3 shrink-0 transition-transform group-focus-within:scale-110" />
                <div className="flex-1 text-left">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5 ml-0.5">Rooms</label>
                  <input
                    type="number"
                    placeholder="Min 2"
                    className="w-full bg-transparent border-none outline-none text-gray-900 placeholder:text-gray-400 font-bold text-lg"
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value)}
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSearchDisabled}
                className={`w-full md:w-auto rounded-xl md:rounded-full px-10 py-8 text-xl font-black shadow-xl transition-all active:scale-95 ${isSearchDisabled
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed border-none'
                  : 'bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-primary/20 shadow-primary/10'
                  }`}
              >
                <Search className="w-6 h-6 mr-2" />
                Search Now
              </Button>
            </form>
          </div>

          {/* Owner CTA */}
          <div
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in"
            style={{ animationDelay: '0.5s' }}
          >
            <p className="text-gray-300 font-medium">Are you a home owner?</p>
            <Link href="/auth/register?role=owner">
              <Button variant="outline" className="rounded-full px-8 py-6 border-2 border-white/30 text-white hover:bg-white hover:text-black transition-all bg-white/5 backdrop-blur-sm">
                List Your Property
                <Calendar className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Section with Glassmorphism */}
        <div
          className="mt-20 grid grid-cols-3 gap-4 md:gap-12 w-full max-w-4xl px-4 py-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 animate-fade-in"
          style={{ animationDelay: '0.6s' }}
        >
          <div className="text-center">
            <div className="text-3xl md:text-5xl font-black text-primary">500+</div>
            <div className="text-xs md:text-base text-gray-400 mt-2 font-bold tracking-widest uppercase">Properties</div>
          </div>
          <div className="text-center border-x border-white/10">
            <div className="text-3xl md:text-5xl font-black text-primary">7+</div>
            <div className="text-xs md:text-base text-gray-400 mt-2 font-bold tracking-widest uppercase">Major Cities</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-5xl font-black text-primary">1000+</div>
            <div className="text-xs md:text-base text-gray-400 mt-2 font-bold tracking-widest uppercase">Happy Tenants</div>
          </div>
        </div>
      </div>
    </section>
  )
}
