"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, ArrowLeft } from 'lucide-react'
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button'
import { cn } from '@/lib/utils'

export default function NotFound() {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            {/* Background Decorative Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[5%] w-[30rem] h-[30rem] bg-primary/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[10%] right-[5%] w-[25rem] h-[25rem] bg-[#2ecc71]/5 rounded-full blur-[100px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 w-full max-w-lg"
            >
                <div className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl rounded-[2.5rem] p-8 md:p-12 text-center">
                    {/* Animated 404 Number */}
                    <motion.h1
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                            delay: 0.2
                        }}
                        className="text-[8rem] md:text-[10rem] font-black leading-none tracking-tighter text-primary/20 select-none"
                    >
                        404
                    </motion.h1>

                    <div className="-mt-12 md:-mt-16 relative z-20">
                        <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-4">
                            Oops! Page Not Found
                        </h2>
                        <p className="text-slate-500 text-lg mb-10 max-w-xs mx-auto">
                            The page you are looking for might have been moved or doesn't exist anymore.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/">
                                <InteractiveHoverButton className="px-10 h-14 text-lg">
                                    Go Back Home
                                </InteractiveHoverButton>
                            </Link>
                        </div>

                        <div className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-center gap-2 text-slate-400">
                            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary">
                                <Home className="w-4 h-4 fill-current" />
                            </div>
                            <span className="text-xs font-bold uppercase tracking-widest italic">Rentora Real Estate</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
