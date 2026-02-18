"use client"

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, X, Send, User, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface Message {
    role: 'bot' | 'user'
    content: string
}

export default function AISupportAgent() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
        { role: 'bot', content: "Hello! I'm your HouseHub Guide. How can I help you today?" }
    ])
    const [input, setInput] = useState('')
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages])

    const handleSend = () => {
        if (!input.trim()) return

        const userMessage: Message = { role: 'user', content: input }
        setMessages(prev => [...prev, userMessage])
        setInput('')

        // Generate bot response
        setTimeout(() => {
            const botResponse = generateResponse(input)
            setMessages(prev => [...prev, { role: 'bot', content: botResponse }])
        }, 600)
    }

    const generateResponse = (query: string): string => {
        const q = query.toLowerCase()

        if (q.includes('search') || q.includes('find')) {
            return "To search for houses, use the search bar on the homepage. You can filter by budget, location (any city in Pakistan), and property type (Apartment, Villa, etc.)."
        }
        if (q.includes('register') || q.includes('login') || q.includes('sign up')) {
            return "You can register or login by clicking the 'Sign In' button in the top menu. We support both User and Owner accounts!"
        }
        if (q.includes('subscription') || q.includes('plan') || q.includes('buy') || q.includes('plus')) {
            return "To book a property, users need to buy a subscription plan. Go to the 'Plans' page from your dashboard or click 'Get Plus' to see our Standard, Premium, and Ultimate tiers."
        }
        if (q.includes('list') || q.includes('owner') || q.includes('property')) {
            return "Owners can list their properties by heading to the Owner Dashboard and clicking 'Add Property'. You can upload images, set prices, and add amenities."
        }
        if (q.includes('manage') || q.includes('booking')) {
            return "As an owner, you can manage all incoming bookings from the 'Bookings' tab in your dashboard. You can view user details and contact them directly."
        }
        if (q.includes('color') || q.includes('theme')) {
            return "HouseHub's signature brand color is #6699cc. We designed the platform to be clean, modern, and easy to use."
        }
        if (q.includes('pakistan') || q.includes('where')) {
            return "HouseHub is Pakistan's premier platform for easy house rentals, covering all major cities like Karachi, Lahore, Islamabad, and more."
        }

        return "I'm here to help! You can ask me about searching for houses, subscription plans, listing properties, or how to manage bookings."
    }

    return (
        <div className="fixed bottom-6 right-6 z-[100]">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="absolute bottom-20 right-0 w-[350px] sm:w-[400px] h-[500px] bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 bg-[#6699cc] text-white flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                    <Bot className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm">HouseHub Guide</h3>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                        <span className="text-[10px] opacity-90">Always Active</span>
                                    </div>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsOpen(false)}
                                className="text-white hover:bg-white/20 rounded-full"
                            >
                                <X className="w-5 h-5" />
                            </Button>
                        </div>

                        {/* Chat Area */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50"
                        >
                            {messages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={cn(
                                        "flex w-full mb-2",
                                        msg.role === 'user' ? "justify-end" : "justify-start"
                                    )}
                                >
                                    <div className={cn(
                                        "flex gap-3 max-w-[80%]",
                                        msg.role === 'user' ? "flex-row-reverse" : "flex-row"
                                    )}>
                                        <div className={cn(
                                            "w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm",
                                            msg.role === 'user' ? "bg-slate-200" : "bg-[#6699cc] text-white"
                                        )}>
                                            {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                                        </div>
                                        <div className={cn(
                                            "p-3 rounded-2xl text-sm leading-relaxed",
                                            msg.role === 'user'
                                                ? "bg-primary text-white rounded-tr-none"
                                                : "bg-white border border-slate-100 shadow-sm rounded-tl-none text-slate-700"
                                        )}>
                                            {msg.content}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white border-t border-slate-100">
                            <div className="relative flex items-center gap-2">
                                <Input
                                    placeholder="Ask me anything..."
                                    className="rounded-full pr-12 focus-visible:ring-[#6699cc] border-slate-200"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                />
                                <Button
                                    size="icon"
                                    onClick={handleSend}
                                    className="absolute right-1 w-8 h-8 rounded-full bg-[#6699cc] hover:bg-[#5588bb] text-white transition-all shadow-md active:scale-95"
                                >
                                    <Send className="w-4 h-4" />
                                </Button>
                            </div>
                            <p className="text-[10px] text-slate-400 text-center mt-2">
                                Your AI-Powered HouseHub Assistant
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 relative group",
                    isOpen ? "bg-slate-800 rotate-90" : "bg-[#6699cc]"
                )}
            >
                <div className="absolute inset-0 bg-[#6699cc] blur-xl opacity-40 group-hover:opacity-70 transition-opacity rounded-full -z-10" />
                {isOpen ? (
                    <X className="w-8 h-8 text-white" />
                ) : (
                    <Bot className="w-8 h-8 text-white animate-bounce-slow" />
                )}
            </motion.button>
        </div>
    )
}
