"use client"

import React, { useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useEmblaCarousel from 'embla-carousel-react'
import { Card, CardContent } from '@/components/ui/card'
import { Building2, Home, Landmark, Briefcase, ChevronRight } from 'lucide-react'

const categories = [
    {
        id: 'luxury-villas',
        name: 'Luxury Villas',
        description: 'Elite homes with high-end amenities',
        icon: Landmark,
        query: 'villa',
        image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80',
    },
    {
        id: 'modern-apartments',
        name: 'Modern Apartments',
        description: 'Contemporary living in city centers',
        icon: Building2,
        query: 'apartment',
        image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80',
    },
    {
        id: 'student-housing',
        name: 'Student Housing',
        description: 'Affordable and close to campus',
        icon: Home,
        query: 'flat',
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80',
    },
    {
        id: 'office-spaces',
        name: 'Office Spaces',
        description: 'Professional hubs for your business',
        icon: Briefcase,
        query: 'office',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
    },
]

export function CategoryCards() {
    const router = useRouter()
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        dragFree: true,
        align: 'start',
    })

    useEffect(() => {
        if (!emblaApi) return
        const interval = setInterval(() => {
            emblaApi.scrollNext()
        }, 4000)
        return () => clearInterval(interval)
    }, [emblaApi])

    const handleCategoryClick = (query: string) => {
        router.push(`/properties?type=${query}`)
    }

    return (
        <section className="py-24 bg-slate-50/50 dark:bg-slate-900/10 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                        Explore by <span className="text-[#6699cc]">Category</span>
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 text-xl font-medium max-w-2xl mx-auto">
                        Find exactly what you&apos;re looking for with our curated property categories.
                    </p>
                </div>

                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex gap-8">
                        {categories.map((category) => (
                            <div key={category.id} className="flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_23%] min-w-0 first:ml-0">
                                <button
                                    onClick={() => handleCategoryClick(category.query)}
                                    className="group relative h-[450px] w-full rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-200 dark:shadow-none hover:shadow-primary/30 transition-all duration-700 hover:-translate-y-4"
                                >
                                    {/* Background Image */}
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                                        style={{ backgroundImage: `url(${category.image})` }}
                                    />

                                    {/* Overlays */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent opacity-90 group-hover:opacity-70 transition-opacity" />
                                    <div className="absolute inset-0 border-[6px] border-transparent group-hover:border-[#6699cc]/40 transition-all duration-700 rounded-[3rem]" />

                                    {/* Content */}
                                    <div className="absolute inset-0 p-10 flex flex-col justify-end text-left">
                                        <div className="w-16 h-16 bg-[#6699cc] rounded-[1.25rem] flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-2xl shadow-[#6699cc]/50">
                                            <category.icon className="w-8 h-8 text-white" />
                                        </div>

                                        <h3 className="text-3xl font-bold text-white mb-3 tracking-tight group-hover:text-[#6699cc] transition-colors">
                                            {category.name}
                                        </h3>
                                        <p className="text-slate-200 text-lg font-medium mb-8 line-clamp-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-6 group-hover:translate-y-0">
                                            {category.description}
                                        </p>

                                        <div className="flex items-center gap-2 text-white font-black text-sm uppercase tracking-[0.2em] group-hover:gap-6 transition-all">
                                            <span>Explore Now</span>
                                            <ChevronRight className="w-5 h-5 text-[#6699cc]" />
                                        </div>
                                    </div>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
