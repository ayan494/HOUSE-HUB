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
  const [budget, setBudget] = useState('')
  const [location, setLocation] = useState('')
  const [propertyType, setPropertyType] = useState('')
  const { toast } = useToast()

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault()

    if (!budget.trim() && !location.trim() && !propertyType.trim()) {
      toast({
        title: 'Enter search criteria',
        description: 'Please fill at least one field to search.',
      })
      return
    }

    const params = new URLSearchParams()
    if (budget.trim()) params.set('budget', budget)
    if (location.trim()) params.set('location', location)
    if (propertyType.trim()) params.set('type', propertyType)
    router.push(`/properties?${params.toString()}`)
  }

  const isSearchDisabled = !budget.trim() && !location.trim() && !propertyType.trim()

  return (
    <section className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Background with dark luxury overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=80)',
        }}
      >
        <div className="absolute inset-0 bg-black/60 md:bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 pt-24 pb-16 flex flex-col items-center">
        <div className="w-full max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white border border-white/20 px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold mb-6 animate-fade-in"
            style={{ animationDelay: '0.1s' }}
          >
            <MapPin className="w-3 h-3 md:w-4 md:h-4" style={{ color: '#6699cc' }} />
            PAKISTAN&apos;S PREMIER RENTAL PLATFORM
          </div>

          {/* Headline */}
          <h1
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-[1.1] animate-fade-in tracking-tight"
            style={{ animationDelay: '0.2s' }}
          >
            Find Your <span className="italic" style={{ color: '#6699cc' }}>Dream</span>{' '}
            Home
          </h1>

          {/* Subheadline */}
          <p
            className="text-base sm:text-lg md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto animate-fade-in font-medium px-2"
            style={{ animationDelay: '0.3s' }}
          >
            Type your requirements naturally. Discover premium apartments and houses across Pakistan with zero middlemen.
          </p>

          <form
            onSubmit={handleSearch}
            className="relative w-full max-w-3xl mx-auto group animate-fade-in px-2"
            style={{ animationDelay: '0.4s' }}
          >
            <div className="relative flex flex-col sm:flex-row items-center p-2 bg-white rounded-3xl sm:rounded-full shadow-2xl border-4 border-white/10 transition-all duration-300 focus-within:ring-4 gap-2 sm:gap-0" style={{ '--tw-ring-color': 'rgba(102, 153, 204, 0.4)' } as React.CSSProperties}>
              <div className="flex-1 flex flex-col sm:flex-row items-center w-full gap-2 sm:gap-3 px-4 py-2 sm:py-0 sm:pl-6">
                <input
                  type="text"
                  placeholder="Budget (e.g. 30000)"
                  className="w-full sm:flex-1 py-2 sm:py-4 text-base sm:text-lg bg-transparent border-none outline-none text-gray-900 placeholder:text-gray-400 font-medium"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                />
                <div className="hidden sm:block w-px h-8 bg-gray-300"></div>
                <input
                  type="text"
                  placeholder="Location (e.g. Karachi)"
                  className="w-full sm:flex-1 py-2 sm:py-4 text-base sm:text-lg bg-transparent border-none outline-none text-gray-900 placeholder:text-gray-400 font-medium"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                <div className="hidden sm:block w-px h-8 bg-gray-300"></div>
                <input
                  type="text"
                  placeholder="Type (e.g. Apartment)"
                  className="w-full sm:flex-1 py-2 sm:py-4 text-base sm:text-lg bg-transparent border-none outline-none text-gray-900 placeholder:text-gray-400 font-medium"
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                />
              </div>
              <Button
                type="submit"
                disabled={isSearchDisabled}
                className="w-full sm:w-auto rounded-xl sm:rounded-full px-8 py-3 sm:py-7 text-lg font-bold shadow-lg text-white transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: isSearchDisabled ? '#999' : '#6699cc' }}
                onMouseEnter={(e) => !isSearchDisabled && (e.currentTarget.style.backgroundColor = '#5588bb')}
                onMouseLeave={(e) => !isSearchDisabled && (e.currentTarget.style.backgroundColor = '#6699cc')}
              >
                Search Now
              </Button>
            </div>
          </form>

          {/* Owner CTA */}
          <div
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in"
            style={{ animationDelay: '0.5s' }}
          >
            <p className="text-gray-300 font-medium text-sm sm:text-base">Are you a home owner?</p>
            <Link href="/auth/register?role=owner">
              <Button variant="outline" className="rounded-full px-6 py-4 border-2 border-white/30 text-white hover:bg-white hover:text-black transition-all bg-white/5 backdrop-blur-sm text-sm sm:text-base">
                List Your Property
                <Calendar className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div
          className="mt-16 grid grid-cols-3 gap-2 sm:gap-4 md:gap-12 w-full max-w-4xl px-2 sm:px-4 py-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 animate-fade-in"
          style={{ animationDelay: '0.6s' }}
        >
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-5xl font-black" style={{ color: '#6699cc' }}>500+</div>
            <div className="text-[10px] sm:text-xs md:text-base text-gray-400 mt-1 font-bold tracking-widest uppercase">Properties</div>
          </div>
          <div className="text-center border-x border-white/10">
            <div className="text-2xl sm:text-3xl md:text-5xl font-black" style={{ color: '#6699cc' }}>7+</div>
            <div className="text-[10px] sm:text-xs md:text-base text-gray-400 mt-1 font-bold tracking-widest uppercase">Cities</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-5xl font-black" style={{ color: '#6699cc' }}>1k+</div>
            <div className="text-[10px] sm:text-xs md:text-base text-gray-400 mt-1 font-bold tracking-widest uppercase">Tenants</div>
          </div>
        </div>
      </div>
    </section>
  )
}
