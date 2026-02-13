"use client"

import React from 'react'
import { motion } from 'framer-motion'

const partners = [
    { id: 1, name: 'Zillow', logo: 'https://logo.clearbit.com/zillow.com' },
    { id: 2, name: 'Realtor.com', logo: 'https://logo.clearbit.com/realtor.com' },
    { id: 3, name: 'Trulia', logo: 'https://logo.clearbit.com/trulia.com' },
    { id: 4, name: 'Redfin', logo: 'https://logo.clearbit.com/redfin.com' },
    { id: 5, name: 'Century 21', logo: 'https://logo.clearbit.com/century21.com' },
]

// Duplicate for infinite scroll feel
const scrollingPartners = [...partners, ...partners, ...partners]

export function TrustedPartners() {
    return (
        <section className="py-28 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden">
            <div className="container mx-auto px-4 mb-20 text-center">
                <h3 className="text-base font-black uppercase tracking-[0.5em] text-slate-400 dark:text-slate-500 mb-2">
                    Our Premium Partners
                </h3>
            </div>

            <div className="relative flex whitespace-nowrap overflow-hidden py-8">
                <motion.div
                    className="flex gap-32 items-center min-w-full shrink-0"
                    animate={{
                        x: ["0%", "-33.33%"],
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 35,
                            ease: "linear",
                        },
                    }}
                >
                    {scrollingPartners.map((partner, index) => (
                        <div
                            key={`${partner.id}-${index}`}
                            className="flex items-center justify-center transition-all duration-500 cursor-pointer flex-shrink-0"
                        >
                            <span className="text-3xl md:text-5xl font-black text-slate-800 dark:text-slate-200 tracking-tighter opacity-70 hover:opacity-100 hover:text-[#6699cc] transition-all duration-500">
                                {partner.name}
                            </span>
                        </div>
                    ))}
                </motion.div>

                {/* Gradient overlays for smooth fade */}
                <div className="absolute inset-y-0 left-0 w-64 bg-gradient-to-r from-white dark:from-slate-950 to-transparent z-10" />
                <div className="absolute inset-y-0 right-0 w-64 bg-gradient-to-l from-white dark:from-slate-950 to-transparent z-10" />
            </div>
        </section>
    )
}
