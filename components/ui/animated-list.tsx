"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import React from "react"

export interface AnimatedListProps {
    className?: string
    children: React.ReactNode
    delay?: number // ms between each item
}

export function AnimatedList({ className, children, delay = 100 }: AnimatedListProps) {
    const items = React.Children.toArray(children)

    return (
        <div className={cn("flex flex-col gap-2", className)}>
            {items.map((item, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                        delay: i * (delay / 1000),
                        duration: 0.3,
                        ease: [0.21, 1.11, 0.81, 0.99],
                    }}
                >
                    {item}
                </motion.div>
            ))}
        </div>
    )
}
