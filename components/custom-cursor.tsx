"use client"

import React, { useEffect, useState } from "react"
import { motion, useSpring, useMotionValue } from "framer-motion"

export default function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false)
    const [isVisible, setIsVisible] = useState(false)

    // Mouse position
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    // Smooth trailing effect for the outer ring
    const springConfig = { damping: 25, stiffness: 150 }
    const trailingX = useSpring(mouseX, springConfig)
    const trailingY = useSpring(mouseY, springConfig)

    useEffect(() => {
        const moveMouse = (e: MouseEvent) => {
            mouseX.set(e.clientX)
            mouseY.set(e.clientY)
            if (!isVisible) setIsVisible(true)
        }

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            const isInteractive =
                target.closest('button') ||
                target.closest('a') ||
                target.closest('[role="button"]') ||
                window.getComputedStyle(target).cursor === 'pointer'

            setIsHovering(!!isInteractive)
        }

        window.addEventListener("mousemove", moveMouse)
        window.addEventListener("mouseover", handleMouseOver)

        return () => {
            window.removeEventListener("mousemove", moveMouse)
            window.removeEventListener("mouseover", handleMouseOver)
        }
    }, [mouseX, mouseY, isVisible])

    if (typeof window === "undefined" || !isVisible) return null

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
            {/* Outer Ring */}
            <motion.div
                style={{
                    x: trailingX,
                    y: trailingY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    width: isHovering ? 64 : 32,
                    height: isHovering ? 64 : 32,
                    borderColor: isHovering ? "#2ecc71" : "#6699cc",
                    backgroundColor: isHovering ? "rgba(46, 204, 113, 0.1)" : "rgba(102, 153, 204, 0)",
                }}
                transition={{ type: "spring", damping: 20, stiffness: 300, mass: 0.5 }}
                className="fixed top-0 left-0 rounded-full border-2 mix-blend-difference"
            />

            {/* Main Pointer (Inner Dot) */}
            <motion.div
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                className="fixed top-0 left-0 w-2 h-2 bg-[#6699cc] rounded-full mix-blend-difference"
            />
        </div>
    )
}
