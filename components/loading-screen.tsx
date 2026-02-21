'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function LoadingScreen() {
    const [visible, setVisible] = useState(true)
    const [fadeOut, setFadeOut] = useState(false)

    useEffect(() => {
        // Start fade-out after 1.8s, then unmount after 2.3s
        const fadeTimer = setTimeout(() => setFadeOut(true), 1800)
        const hideTimer = setTimeout(() => setVisible(false), 2300)
        return () => {
            clearTimeout(fadeTimer)
            clearTimeout(hideTimer)
        }
    }, [])

    if (!visible) return null

    return (
        <div
            className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white transition-opacity duration-500 ${fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
        >
            {/* Animated rings */}
            <div className="relative flex items-center justify-center mb-6">
                <span
                    className="absolute w-36 h-36 rounded-full border-2 animate-ping"
                    style={{ borderColor: '#6699cc', animationDuration: '1.4s', opacity: 0.3 }}
                />
                <span
                    className="absolute w-28 h-28 rounded-full border-2 animate-ping"
                    style={{ borderColor: '#6699cc', animationDuration: '1.0s', opacity: 0.2 }}
                />
                {/* Logo */}
                <div
                    className="w-24 h-24 rounded-2xl flex items-center justify-center shadow-2xl animate-bounce"
                    style={{ backgroundColor: 'white', animationDuration: '1.2s' }}
                >
                    <Image
                        src="/rentora-logo.png"
                        alt="Rentora"
                        width={88}
                        height={88}
                        className="w-20 h-20 object-contain"
                        priority
                    />
                </div>
            </div>

            {/* Brand name */}
            <h1
                className="text-3xl font-black tracking-tight animate-pulse"
                style={{ color: '#6699cc', animationDuration: '1s' }}
            >
                Rentora
            </h1>
            <p className="text-sm text-gray-400 mt-1 tracking-widest uppercase">
                Find Your Perfect Home
            </p>

            {/* Progress bar */}
            <div className="mt-8 w-48 h-1 bg-gray-100 rounded-full overflow-hidden">
                <div
                    className="h-full rounded-full"
                    style={{
                        backgroundColor: '#6699cc',
                        animation: 'loadbar 1.8s ease-in-out forwards',
                    }}
                />
            </div>

            <style jsx>{`
        @keyframes loadbar {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
        </div>
    )
}
