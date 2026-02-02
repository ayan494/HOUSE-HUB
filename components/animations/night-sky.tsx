"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export function NightSky() {
    const [mounted, setMounted] = useState(false)
    const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number; duration: number }[]>([])

    const { scrollY } = useScroll()
    const moonY = useTransform(scrollY, [0, 500], [0, 100])

    useEffect(() => {
        setMounted(true)
        const newStars = Array.from({ length: 50 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 2 + 1,
            duration: Math.random() * 3 + 2,
        }))
        setStars(newStars)
    }, [])

    if (!mounted) return null

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden hidden dark:block">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-[#1e1b4b] to-[#0f172a]" />

            {/* Moon */}
            <motion.div
                style={{ y: moonY }}
                className="absolute top-10 right-10 w-24 h-24 rounded-full bg-yellow-100 shadow-[0_0_60px_20px_rgba(255,255,200,0.3)] opacity-90"
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
                {/* Craters */}
                <div className="absolute top-6 left-5 w-4 h-4 bg-yellow-200/50 rounded-full" />
                <div className="absolute bottom-6 right-8 w-6 h-6 bg-yellow-200/50 rounded-full" />
                <div className="absolute top-10 right-5 w-3 h-3 bg-yellow-200/50 rounded-full" />
            </motion.div>

            {/* Stars */}
            {stars.map((star) => (
                <motion.div
                    key={star.id}
                    className="absolute rounded-full bg-white"
                    style={{
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                        width: star.size,
                        height: star.size,
                    }}
                    animate={{
                        opacity: [0.2, 1, 0.2],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: star.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    )
}
