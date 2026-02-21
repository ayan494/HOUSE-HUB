"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const partners = [
    { id: 1, name: 'Zillow', color: '#006AFF' },
    { id: 2, name: 'Realtor.com', color: '#D92228' },
    { id: 3, name: 'Trulia', color: '#00AD68' },
    { id: 4, name: 'Redfin', color: '#A02021' },
    { id: 5, name: 'Century 21', color: '#C09D5D' },
    { id: 6, name: 'Coldwell', color: '#003366' },
]

// Duplicate multiple times for a truly seamless loop
const scrollingPartners = [...partners, ...partners, ...partners, ...partners]

export function TrustedPartners() {
    return (
        <section className="py-24 md:py-32 border-y border-border bg-secondary/30 overflow-hidden relative">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 mb-20 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                    <h3 className="text-[10px] md:text-xs font-black uppercase tracking-[0.8em] text-muted-foreground mb-3 ml-4">
                        Trusted By Global Leaders
                    </h3>
                    <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto rounded-full" />
                </motion.div>
            </div>

            <div className="relative flex whitespace-nowrap overflow-hidden group/marquee">
                <motion.div
                    className="flex gap-20 md:gap-40 items-center min-w-full shrink-0 py-10"
                    animate={{
                        x: [0, -1000] // Dynamic value would be better but static for now for safety
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 35,
                            ease: "linear",
                        },
                    }}
                    // Note: We'll use a CSS-based approach for even smoother looping below
                    style={{
                        animation: 'marquee 40s linear infinite',
                        display: 'flex',
                        gap: '8rem'
                    }}
                >
                    {scrollingPartners.map((partner, index) => (
                        <div
                            key={`${partner.id}-${index}`}
                            className="flex items-center gap-20 md:gap-40 group/partner"
                        >
                            <motion.div
                                className="relative flex items-center justify-center transition-all duration-700 cursor-pointer flex-shrink-0"
                                whileHover={{ scale: 1.08, y: -8, opacity: 1 }}
                                initial={{ opacity: 0.3 }}
                                whileInView={{ opacity: 0.4 }}
                            >
                                <span
                                    className="text-4xl md:text-7xl font-black tracking-tighter transition-all duration-500 select-none"
                                    style={{
                                        // @ts-ignore
                                        '--partner-color': partner.color
                                    } as React.CSSProperties}
                                >
                                    {/* Glass reflection text */}
                                    <span className="relative z-10 text-foreground/40 group-hover/partner:text-[var(--partner-color)] transition-colors duration-700">
                                        {partner.name}
                                    </span>

                                    {/* Invisible duplicate for layout consistency */}
                                    <span className="absolute inset-0 opacity-0 bg-clip-text text-transparent bg-gradient-to-br from-white to-white/50">
                                        {partner.name}
                                    </span>

                                    {/* Interactive Glow Effect */}
                                    <div
                                        className="absolute -inset-4 blur-3xl opacity-0 group-hover/partner:opacity-25 transition-opacity duration-700 pointer-events-none rounded-full"
                                        style={{ backgroundColor: partner.color }}
                                    />
                                </span>
                            </motion.div>

                            {/* Geometric Separator */}
                            <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-border flex-shrink-0 opacity-50" />
                        </div>
                    ))}
                </motion.div>

                {/* Edge Faders - Ultra Soft */}
                <div className="absolute inset-y-0 left-0 w-32 md:w-96 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-32 md:w-96 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />
            </div>

            <style jsx>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>
        </section>
    )
}
