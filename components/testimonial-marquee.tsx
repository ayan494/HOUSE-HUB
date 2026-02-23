"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import Marquee from "@/components/ui/marquee"
import { Star, CheckCircle2 } from "lucide-react"

interface Testimonial {
    id: string
    name: string
    role: "Owner" | "Tenant"
    isVerified: boolean
    rating: number
    text: string
    avatar: string
}

const defaultTestimonials: Testimonial[] = [
    {
        id: "1",
        name: "Ahmed Khan",
        role: "Tenant",
        isVerified: true,
        rating: 5,
        text: "Found my dream home in DHA through Rentora with 0% commission! Highly recommended.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed",
    },
    {
        id: "2",
        name: "Sarah Malik",
        role: "Owner",
        isVerified: true,
        rating: 5,
        text: "Listing my property was seamless. The verification process is thorough and professional.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    {
        id: "3",
        name: "Zain Ali",
        role: "Tenant",
        isVerified: false,
        rating: 5,
        text: "Best platform for renting in Pakistan. Transparent pricing and verified listings.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zain",
    },
    {
        id: "4",
        name: "Fatima Noor",
        role: "Owner",
        isVerified: true,
        rating: 4,
        text: "The owner dashboard gives me all the insights I need. Great platform for managing rentals.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima",
    },
    {
        id: "5",
        name: "Usman Qureshi",
        role: "Tenant",
        isVerified: true,
        rating: 5,
        text: "Rentora's support is top-notch. They helped me throughout the booking process.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Usman",
    },
    {
        id: "6",
        name: "Ayesha Bibi",
        role: "Tenant",
        isVerified: true,
        rating: 5,
        text: "DHA search was very fast. 0% commission is a game changer for students like me.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ayesha",
    },
    {
        id: "7",
        name: "Bilal Siddiqui",
        role: "Owner",
        isVerified: true,
        rating: 5,
        text: "Finally a platform that understands the Pakistani real estate market needs.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bilal",
    },
    {
        id: "8",
        name: "Hina Sheikh",
        role: "Tenant",
        isVerified: false,
        rating: 4,
        text: "Very user friendly app. I found a nice apartment in Bahria Town within a week.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hina",
    },
]

const TestimonialCard = ({ testimonial, index }: { testimonial: Testimonial; index: number }) => {
    return (
        <motion.figure
            animate={{
                y: [0, -8, 0],
            }}
            transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: (index % 4) * 0.5 // Predictable delay based on index to avoid hydration error
            }}
            className={cn(
                "relative w-64 md:w-80 cursor-pointer overflow-hidden rounded-2xl border p-6 transition-all duration-300",
                "border-primary/20 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:scale-[1.02] hover:shadow-xl hover:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/40",
                "shadow-[0_0_15px_rgba(102,153,204,0.1)] hover:shadow-[0_0_20px_rgba(102,153,204,0.2)]"
            )}
        >
            <div className="flex flex-row items-center gap-3">
                <img className="rounded-full border border-primary/20 p-0.5" width="40" height="40" alt={testimonial.name} src={testimonial.avatar} />
                <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                        <figcaption className="text-sm font-bold text-foreground">
                            {testimonial.name}
                        </figcaption>
                        {testimonial.isVerified && (
                            <CheckCircle2 className="w-3 h-3 text-primary fill-primary/20" />
                        )}
                    </div>
                    <p className="text-xs font-medium text-muted-foreground">{testimonial.role}</p>
                </div>
            </div>
            <div className="flex items-center gap-0.5 mt-3 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                        key={i}
                        className={cn("w-3 h-3 transition-colors", i < testimonial.rating ? "text-amber-500 fill-amber-500" : "text-muted")}
                    />
                ))}
            </div>
            <blockquote className="text-sm text-foreground/80 leading-relaxed italic">
                &ldquo;{testimonial.text}&rdquo;
            </blockquote>
        </motion.figure>
    )
}

export function TestimonialMarquee() {
    const [data, setData] = useState<Testimonial[]>([])

    useEffect(() => {
        const stored = localStorage.getItem("househub_testimonials")
        if (stored) {
            setData(JSON.parse(stored))
        } else {
            localStorage.setItem("househub_testimonials", JSON.stringify(defaultTestimonials))
            setData(defaultTestimonials)
        }
    }, [])

    const firstRow = data.slice(0, Math.ceil(data.length / 2))
    const secondRow = data.slice(Math.ceil(data.length / 2))

    return (
        <section className="relative flex min-h-[600px] w-full flex-col items-center justify-center overflow-hidden bg-[#050505] py-24 px-4">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 mb-20 text-center relative z-10">
                <div className="inline-block group mb-6">
                    <span className="hero-text-gradient uppercase tracking-[0.2em] text-xs font-black px-4 py-1.5 border border-primary/20 rounded-full bg-primary/5 backdrop-blur-sm">
                        Our Community
                    </span>
                </div>

                <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter">
                    Testimonials
                </h2>
                <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
                    Trusted by thousands of tenants and owners across Pakistan for seamless renting experience.
                </p>
            </div>

            <Marquee className="[--duration:40s] py-6">
                {firstRow.map((review, idx) => (
                    <TestimonialCard key={review.id} testimonial={review} index={idx} />
                ))}
            </Marquee>
            <Marquee reverse className="[--duration:40s] py-6">
                {secondRow.map((review, idx) => (
                    <TestimonialCard key={review.id} testimonial={review} index={idx} />
                ))}
            </Marquee>

            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#050505]"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#050505]"></div>
        </section>
    )
}
