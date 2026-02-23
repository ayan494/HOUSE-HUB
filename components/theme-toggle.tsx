"use client"

import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/contexts/theme-context'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme()

    const handleToggle = (e: React.MouseEvent) => {
        // Fallback for browsers that don't support View Transitions API
        if (!document.startViewTransition) {
            toggleTheme()
            return
        }

        const x = e.clientX
        const y = e.clientY
        const endRadius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
        )

        const transition = document.startViewTransition(() => {
            toggleTheme()
        })

        transition.ready.then(() => {
            document.documentElement.animate(
                {
                    clipPath: [
                        `circle(0px at ${x}px ${y}px)`,
                        `circle(${endRadius}px at ${x}px ${y}px)`,
                    ],
                },
                {
                    duration: 500,
                    easing: 'ease-in-out',
                    pseudoElement: '::view-transition-new',
                }
            )
        })
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={handleToggle}
            className="relative w-10 h-10 rounded-xl transition-all duration-300 hover:bg-primary/10 overflow-hidden group shadow-sm bg-background border border-border/50"
            aria-label="Toggle theme"
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={theme}
                    initial={{ scale: 0.5, opacity: 0, rotate: -90 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    exit={{ scale: 0.5, opacity: 0, rotate: 90 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="flex items-center justify-center w-full h-full"
                >
                    {theme === 'light' ? (
                        <Sun className="h-[20px] w-[20px] text-amber-500 group-hover:scale-110 transition-transform" />
                    ) : (
                        <Moon className="h-[18px] w-[18px] text-primary group-hover:scale-110 transition-transform" />
                    )}
                </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        </Button>
    )
}
