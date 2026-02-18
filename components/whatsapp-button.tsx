"use client"

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

export function WhatsAppButton() {
    const whatsappNumber = "+923217654321" // Default support number
    const message = "Hello HouseHub! I'm interested in booking a property."
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent(message)}`

    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="fixed bottom-6 right-6 z-[100]"
        >
            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative group flex items-center justify-center"
            >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-[#25D366] blur-xl opacity-40 group-hover:opacity-60 transition-opacity rounded-full" />

                {/* Tooltip */}
                <div className="absolute right-full mr-4 px-3 py-1.5 bg-black/80 backdrop-blur-md text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    Chat with us on WhatsApp
                </div>

                {/* Button */}
                <div className="relative w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 ring-4 ring-white/20">
                    <MessageCircle className="w-8 h-8 fill-current" />
                </div>
            </a>
        </motion.div>
    )
}
