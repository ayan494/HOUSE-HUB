"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Search, MapPin, Wallet, Building } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { HeroVisual } from '@/components/hero-visual'

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
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0a0a0a] pt-0">
      {/* Background Magic Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#6699cc]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#2ecc71]/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 pt-24 pb-12 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Content */}
          <div className="text-center lg:text-left space-y-8 max-w-2xl mx-auto lg:mx-0">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-xs font-bold tracking-widest text-[#8b5cf6] animate-fade-in uppercase">
                <MapPin className="w-3 h-3" />
                Pakistan&apos;s Elite Rental Network
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-[1.1] animate-fade-in">
                Experience the Future of <span className="hero-text-gradient">Modern</span> Living
              </h1>
              <p className="text-lg md:text-xl text-gray-400 font-medium animate-fade-in max-w-xl mx-auto lg:mx-0">
                Discover elite properties with AI-powered search. Premium apartments, villas, and seamless renting at your fingertips.
              </p>
            </div>

            {/* Search Bar: Glassmorphism */}
            <form
              onSubmit={handleSearch}
              className="relative w-full glass-card p-2 rounded-3xl animate-fade-in shadow-2xl overflow-visible"
            >
              <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2 p-2">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
                    <input
                      type="text"
                      placeholder="Select Area"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full bg-white/5 border-none outline-none text-white placeholder:text-gray-500 pl-10 pr-4 py-3 rounded-xl focus:ring-2 ring-purple-500/50 transition-all text-sm"
                    />
                  </div>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
                    <input
                      type="text"
                      placeholder="Property Type"
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="w-full bg-white/5 border-none outline-none text-white placeholder:text-gray-500 pl-10 pr-4 py-3 rounded-xl focus:ring-2 ring-purple-500/50 transition-all text-sm"
                    />
                  </div>
                  <div className="relative">
                    <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
                    <input
                      type="text"
                      placeholder="Max Budget"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full bg-white/5 border-none outline-none text-white placeholder:text-gray-500 pl-10 pr-4 py-3 rounded-xl focus:ring-2 ring-purple-500/50 transition-all text-sm"
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  disabled={isSearchDisabled}
                  className="bg-[#8b5cf6] hover:bg-[#8b5cf6]/90 text-white font-black py-7 px-8 rounded-2xl hero-glow-purple transition-all active:scale-95 text-base"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Find Perfect Home
                </Button>
              </div>
            </form>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4 animate-fade-in">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0a0a0a] bg-gray-800 overflow-hidden ring-1 ring-white/10">
                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-400">
                <span className="text-white font-bold">1,200+</span> tenants found their homes this month
              </p>
            </div>
          </div>

          {/* Right Column: Visuals */}
          <div className="hidden lg:block relative h-[700px]">
            <HeroVisual />
          </div>

          {/* Mobile Visual */}
          <div className="lg:hidden w-full mt-12 px-4 h-[600px] relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="max-w-[320px] w-full items-center justify-center">
                <HeroVisual />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
