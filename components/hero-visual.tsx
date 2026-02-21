import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, ShieldCheck, MapPin, Heart } from "lucide-react"

const mockProperties = [
    {
        id: 1,
        name: "Modern Villa",
        location: "DHA Phase 6, Karachi",
        price: "Rs. 85k",
        rating: "4.9",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&q=80"
    },
    {
        id: 2,
        name: "Luxury Apartment",
        location: "Gulberg III, Lahore",
        price: "Rs. 45k",
        rating: "4.8",
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&q=80"
    },
    {
        id: 3,
        name: "Zen Penthouse",
        location: "Bahria Town, Islamabad",
        price: "Rs. 120k",
        rating: "5.0",
        image: "https://images.unsplash.com/photo-1600607687940-47a04b69739e?w=500&q=80"
    }
]

export function HeroVisual() {
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % mockProperties.length)
        }, 4000)
        return () => clearInterval(timer)
    }, [])

    const property = mockProperties[currentIndex]

    return (
        <div className="relative w-full h-full flex items-center justify-center py-12 px-4 select-none md:pointer-events-auto">
            {/* Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-purple-500/10 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-cyan-500/5 rounded-full blur-[80px]" />

            {/* Main 3D Container */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
                animate={{ opacity: 1, scale: 1, rotateY: 10 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="relative perspective-[1000px] z-10"
            >
                <motion.div
                    animate={{
                        y: [0, -15, 0],
                        rotateZ: [-1, 1, -1],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="relative w-[280px] h-[580px] bg-[#111] rounded-[3rem] border-[8px] border-[#222] shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden"
                >
                    {/* Status Bar */}
                    <div className="h-6 w-full px-8 pt-4 flex justify-between items-center bg-black/50 backdrop-blur-sm">
                        <div className="text-[10px] text-white">9:41</div>
                        <div className="flex gap-1">
                            <div className="w-4 h-2 bg-white/30 rounded-full" />
                            <div className="w-2 h-2 bg-white/30 rounded-full" />
                        </div>
                    </div>

                    {/* Screen Content */}
                    <div className="p-4 space-y-4">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-4">
                            <div className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/30" />
                            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10" />
                        </div>

                        {/* Title */}
                        <div className="space-y-1">
                            <div className="h-4 w-24 bg-white/10 rounded-full" />
                            <div className="h-2 w-32 bg-white/5 rounded-full" />
                        </div>

                        {/* Main Property Card inside phone */}
                        <div className="relative h-[280px] w-full">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={property.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                    className="absolute inset-0 bg-[#1a1a1a] rounded-2xl overflow-hidden border border-white/5 shadow-2xl"
                                >
                                    <div className="relative h-40 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
                                        <img
                                            src={property.image}
                                            alt={property.name}
                                            className="w-full h-full object-cover opacity-60"
                                        />
                                        <div className="absolute top-2 left-2 bg-cyan-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-lg">
                                            <ShieldCheck className="w-2 h-2" /> Verified
                                        </div>
                                        <div className="absolute top-2 right-2 bg-white/10 backdrop-blur-md p-1.5 rounded-full">
                                            <Heart className="w-3 h-3 text-white" />
                                        </div>
                                    </div>
                                    <div className="p-3 space-y-2">
                                        <div className="flex justify-between items-start">
                                            <h4 className="text-xs font-bold text-white line-clamp-1">{property.name}</h4>
                                            <div className="flex items-center gap-0.5 text-[#f1c40f]">
                                                <Star className="w-2 h-2 flex-shrink-0 fill-[#f1c40f]" />
                                                <span className="text-[10px] text-white">{property.rating}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 text-gray-400">
                                            <MapPin className="w-2 h-2" />
                                            <span className="text-[9px] truncate">{property.location}</span>
                                        </div>
                                        <div className="flex justify-between items-center pt-1 border-t border-white/5 mt-1">
                                            <span className="text-xs text-purple-400 font-black">{property.price}</span>
                                            <div className="bg-purple-600 text-white text-[9px] px-3 py-1 rounded-full font-bold">Book Now</div>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Secondary Lists */}
                        <div className="grid grid-cols-2 gap-2 mt-4">
                            <div className="h-24 bg-white/5 rounded-xl border border-white/5" />
                            <div className="h-24 bg-white/5 rounded-xl border border-white/5" />
                        </div>
                    </div>
                </motion.div>

                {/* Floating Glass Cards */}
                <motion.div
                    animate={{ x: [0, 10, 0], y: [0, 5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute -top-6 -right-12 p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl z-20"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/40">
                            <ShieldCheck className="w-4 h-4 text-cyan-400" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-white leading-tight">Verified Owner</p>
                            <p className="text-[8px] text-gray-400">Identity Confirmed</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    animate={{ x: [0, -10, 0], y: [0, -5, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="absolute bottom-12 -left-16 p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl z-20"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/40">
                            <MapPin className="w-4 h-4 text-purple-400" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-white leading-tight">Elite Location</p>
                            <p className="text-[8px] text-gray-400">Prime Spot</p>
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Shadow */}
            <motion.div
                animate={{ scaleX: [0.8, 1, 0.8], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-4 w-40 h-8 bg-black/60 rounded-[50%] blur-xl"
            />
        </div>
    )
}
