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
  const [searchQuery, setSearchQuery] = useState('')
  const { toast } = useToast()

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault()

    if (!searchQuery.trim()) {
      toast({
        title: 'Enter a search query',
        description: 'Please type what you are looking for (e.g., "2 bedroom in Karachi").',
      })
      return
    }

    // Pass the natural language query to the properties page
    const params = new URLSearchParams()
    params.set('q', searchQuery)
    router.push(`/properties?${params.toString()}`)
  }

  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with deep premium overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=2000&q=90)',
        }}
      >
        {/* Dark Overlays for maximum readability */}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full container mx-auto px-4 text-center">
        <div className="max-w-5xl mx-auto">
          {/* Top Badge */}
          <div
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 text-white px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-[0.2em] mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700"
          >
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Pakistan&apos;s Premium Rental Network
          </div>

          {/* Headline */}
          <h1
            className="text-5xl sm:text-6xl md:text-8xl font-black text-white mb-8 leading-[1.05] tracking-tight text-balance animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100"
          >
            Find Your <span className="text-primary italic">Perfect</span>{' '}
            Experience
          </h1>

          {/* Subheadline */}
          <p
            className="text-lg md:text-2xl text-gray-200/90 mb-12 max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200"
          >
            Thousands of premium apartments and luxury houses are waiting for you.
            Tell us what you need in plain words.
          </p>

          {/* Large Natural Language Search Bar */}
          <div
            className="w-full max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300"
          >
            <form
              onSubmit={handleSearch}
              className="relative group"
            >
              <div className="absolute inset-0 bg-primary/20 blur-3xl group-hover:bg-primary/30 transition-all duration-700 -z-10" />
              <div className="relative flex flex-col md:flex-row items-stretch gap-3 bg-white/10 backdrop-blur-3xl p-3 rounded-[2rem] border border-white/20 shadow-2xl transition-all duration-500 hover:border-white/30 hover:bg-white/[0.15]">
                <div className="flex-1 relative">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-white/50 group-focus-within:text-primary transition-colors" />
                  <input
                    type="text"
                    placeholder="Try '2 bedroom apartment in Karachi under 50k'..."
                    className="w-full h-16 sm:h-20 bg-transparent border-none outline-none pl-16 pr-6 text-white text-lg sm:text-xl placeholder:text-white/30 font-medium"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button
                  type="submit"
                  className="h-16 sm:h-20 px-10 rounded-[1.5rem] bg-primary text-primary-foreground text-xl font-black hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary/20"
                >
                  Search Now
                </Button>
              </div>
            </form>

            <div className="mt-6 flex flex-wrap justify-center gap-4 text-white/50 text-sm font-medium">
              <span>Trending:</span>
              <button
                onClick={() => setSearchQuery("3 Bedroom in Lahore")}
                className="hover:text-primary transition-colors border-b border-white/10"
              >
                3 Bedroom in Lahore
              </button>
              <button
                onClick={() => setSearchQuery("Apartment in Islamabad")}
                className="hover:text-primary transition-colors border-b border-white/10"
              >
                Apartment in Islamabad
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
