"use client"

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Menu, Bell, Calendar, CheckCircle, Clock, XCircle, Home, Star, UserCheck, Search, DollarSign, User, CreditCard, LogOut, ChevronDown, LayoutDashboard } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getCurrentUser, getBookings, logoutUser } from '@/lib/store'
import type { Booking, User as UserType } from '@/lib/types'
import { AnimatedList } from '@/components/ui/animated-list'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/theme-toggle'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Swal from 'sweetalert2'

interface DashboardNavbarProps {
    onMenuClick?: () => void
}

// ─── Static rich notification items ────────────────────────────────────────
const STATIC_NOTIFICATIONS = [
    {
        id: 'n1',
        icon: Home,
        color: '#6699cc',
        bg: '#6699cc15',
        title: 'New Property Listed',
        desc: 'A new property was added in your area.',
        time: 'Just now',
        isNew: true,
    },
    {
        id: 'n2',
        icon: Star,
        color: '#f59e0b',
        bg: '#f59e0b15',
        title: 'Review Received',
        desc: 'Someone left a 5★ review on your profile.',
        time: '2 min ago',
        isNew: true,
    },
    {
        id: 'n3',
        icon: UserCheck,
        color: '#2ecc71',
        bg: '#2ecc7115',
        title: 'Profile Updated',
        desc: 'Your profile information was saved.',
        time: '10 min ago',
        isNew: false,
    },
]

// ─── Status helpers for booking notifications ───────────────────────────────
const statusIcon = {
    confirmed: <CheckCircle className="w-4 h-4 text-[#2ecc71]" />,
    pending: <Clock className="w-4 h-4 text-yellow-400" />,
    cancelled: <XCircle className="w-4 h-4 text-red-400" />,
}

const statusColor = {
    confirmed: 'text-[#2ecc71]',
    pending: 'text-yellow-500',
    cancelled: 'text-red-400',
}

// ─── Single notification card (used inside AnimatedList) ────────────────────
function NotifCard({
    id,
    icon: Icon,
    color,
    bg,
    title,
    desc,
    time,
    isNew,
}: (typeof STATIC_NOTIFICATIONS)[0]) {
    return (
        <div
            className={cn(
                "flex items-start gap-3 px-4 py-3 rounded-2xl border border-white/40 shadow-sm",
                "bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-colors"
            )}
        >
            {/* Icon bubble */}
            <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: bg }}
            >
                <Icon className="w-4 h-4" style={{ color }} />
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                    <p className="text-[13px] font-bold text-slate-800 truncate">{title}</p>
                    {isNew && (
                        <span className="w-2 h-2 rounded-full bg-[#2ecc71] shrink-0" />
                    )}
                </div>
                <p className="text-[11px] text-slate-500 truncate mt-0.5">{desc}</p>
            </div>

            {/* Time */}
            <span className="text-[10px] text-slate-300 whitespace-nowrap mt-0.5">{time}</span>
        </div>
    )
}

// ─── Booking notification card ───────────────────────────────────────────────
function BookingCard({ b }: { b: Booking }) {
    return (
        <div
            className={cn(
                "flex items-start gap-3 px-4 py-3 rounded-2xl border border-white/40 shadow-sm",
                "bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-colors"
            )}
        >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 bg-[#6699cc15]">
                {statusIcon[b.status]}
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-[13px] font-bold text-slate-800 truncate">
                    Booking #{b.id.slice(-6).toUpperCase()}
                </p>
                <p className={`text-[11px] font-bold capitalize mt-0.5 ${statusColor[b.status]}`}>
                    {b.status}
                </p>
                <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                    <Calendar className="w-3 h-3" />
                    {b.checkIn} → {b.checkOut}
                </p>
            </div>
            <span className="text-[10px] text-slate-300 whitespace-nowrap">
                {new Date(b.createdAt).toLocaleDateString('en-PK', { day: '2-digit', month: 'short' })}
            </span>
        </div>
    )
}

// ─── Main Navbar ─────────────────────────────────────────────────────────────
export function DashboardNavbar({ onMenuClick }: DashboardNavbarProps) {
    const router = useRouter()
    const [user, setUser] = useState<UserType | null>(null)
    const [bookings, setBookings] = useState<Booking[]>([])
    const [showNotif, setShowNotif] = useState(false)
    const [listKey, setListKey] = useState(0)
    const notifRef = useRef<HTMLDivElement>(null)
    const searchRef = useRef<HTMLInputElement>(null)
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault()
                searchRef.current?.focus()
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    const handleLogout = async () => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You will be signed out of your account.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#6699cc',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, sign out!',
            customClass: {
                popup: 'rounded-3xl',
            },
        })

        if (result.isConfirmed) {
            logoutUser()
            setUser(null)
            await Swal.fire({
                title: 'Signed Out',
                text: 'See you soon!',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false,
                customClass: {
                    popup: 'rounded-3xl',
                },
            })
            window.location.href = '/'
        }
    }

    useEffect(() => {
        const currentUser = getCurrentUser()
        setUser(currentUser)
        if (currentUser) {
            const allBookings = getBookings()
            const userBookings = allBookings
                .filter(b => b.userId === currentUser.id)
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .slice(0, 3)
            setBookings(userBookings)
        }
    }, [])

    // Close dropdown on outside click
    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
                setShowNotif(false)
            }
        }
        document.addEventListener('mousedown', handleClick)
        return () => document.removeEventListener('mousedown', handleClick)
    }, [])

    const handleBellClick = () => {
        setShowNotif(v => {
            if (!v) setListKey(k => k + 1) // re-trigger animation each open
            return !v
        })
    }

    const profileHref = user?.role === 'owner' ? '/dashboard/owner/profile' : '/dashboard/user/profile'
    const hasNew = STATIC_NOTIFICATIONS.some(n => n.isNew) || bookings.length > 0

    return (
        <>
            <header className="fixed top-4 left-4 right-4 md:left-[272px] md:right-6 z-40 bg-white/80 backdrop-blur-md border border-white/40 h-16 flex items-center justify-between shadow-xl rounded-2xl px-4 transition-all duration-300 overflow-visible">

                {/* Left: Hamburger (mobile) + Wallet (desktop) */}
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onMenuClick}
                        className="md:hidden text-slate-500 hover:text-primary transition-colors h-10 w-10 rounded-xl"
                    >
                        <Menu className="w-6 h-6" />
                    </Button>

                    <div className="flex flex-col items-start">
                        <h1 className="text-sm md:text-base font-black text-slate-800 tracking-tight">
                            {user?.role === 'owner' ? 'Owner Dashboard' : 'User Dashboard'}
                        </h1>
                    </div>

                    {/* Wallet Strip - Hidden on small mobile */}
                    <div className="hidden sm:flex items-center gap-2 bg-[#2ecc71]/10 px-4 py-2 rounded-xl border border-[#2ecc71]/20 group hover:bg-[#2ecc71]/20 transition-all cursor-default">
                        <div className="w-8 h-8 rounded-lg bg-[#2ecc71] flex items-center justify-center text-white shadow-lg shadow-[#2ecc71]/20">
                            <DollarSign className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-[#27ae60] uppercase tracking-wider leading-none">Earnings</span>
                            <span className="text-sm font-black text-slate-800 leading-tight">PKR 380K</span>
                        </div>
                    </div>
                </div>

                {/* Center: Search Bar (Hidden on mobile) */}
                <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
                    <div className="relative w-full group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#6699cc] transition-colors" />
                        <input
                            ref={searchRef}
                            type="text"
                            placeholder="Search properties, bookings..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-slate-50/50 hover:bg-white border border-slate-200 focus:border-[#6699cc] focus:ring-4 focus:ring-[#6699cc]/10 outline-none pl-11 pr-16 py-2.5 rounded-2xl text-sm transition-all"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-[10px] font-bold text-slate-400">
                            ⌘ K
                        </div>
                    </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 sm:gap-3">
                    <div className="hidden sm:block">
                        <ThemeToggle />
                    </div>

                    {/* Notification Bell */}
                    <div className="relative" ref={notifRef}>
                        <button
                            onClick={handleBellClick}
                            className="relative w-10 h-10 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center hover:bg-slate-100 transition-colors"
                        >
                            <Bell className="w-5 h-5" />
                            {hasNew && (
                                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#2ecc71] rounded-full border-2 border-white" />
                            )}
                        </button>

                        {/* Animated Dropdown */}
                        <AnimatePresence>
                            {showNotif && (
                                <motion.div
                                    key={listKey}
                                    initial={{ opacity: 0, scale: 0.95, y: -8 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: -8 }}
                                    transition={{ duration: 0.18, ease: 'easeOut' }}
                                    className="
                                        fixed inset-x-4 top-24 mx-auto
                                        sm:absolute sm:inset-auto sm:right-0 sm:top-full sm:mt-3
                                        w-[92vw] sm:w-80
                                        max-h-[70vh] overflow-y-auto
                                        bg-white/95 backdrop-blur-xl
                                        rounded-3xl shadow-2xl
                                        border border-slate-100
                                        z-50 p-3
                                    "
                                >
                                    {/* Header */}
                                    <div className="flex items-center justify-between px-2 pb-2 mb-1">
                                        <p className="text-sm font-black text-slate-800">Notifications</p>
                                        {hasNew && (
                                            <span className="text-xs font-bold bg-[#6699cc]/10 text-[#6699cc] px-2.5 py-0.5 rounded-full">
                                                {STATIC_NOTIFICATIONS.filter(n => n.isNew).length + bookings.length} new
                                            </span>
                                        )}
                                    </div>

                                    {/* Animated List */}
                                    <AnimatedList delay={80}>
                                        {STATIC_NOTIFICATIONS.map((n) => (
                                            <NotifCard key={n.id} {...n} />
                                        ))}
                                        {bookings.map((b) => (
                                            <BookingCard key={b.id} b={b} />
                                        ))}
                                    </AnimatedList>

                                    {/* Footer */}
                                    <div className="mt-2 pt-2 border-t border-slate-200/60">
                                        <button
                                            onClick={() => {
                                                router.push(user?.role === 'owner' ? '/dashboard/owner/bookings' : '/dashboard/user/bookings')
                                                setShowNotif(false)
                                            }}
                                            className="w-full text-xs font-bold text-[#6699cc] hover:text-[#5588bb] py-1.5 transition-colors text-center"
                                        >
                                            View all bookings →
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Enhanced Profile Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="relative ml-1 flex items-center gap-2 group p-1 pr-2 rounded-2xl hover:bg-slate-50 transition-all active:scale-95 outline-none">
                                <div className="relative">
                                    <Avatar className="w-10 h-10 border-2 border-white shadow-sm ring-2 ring-slate-100">
                                        {user?.avatar && (
                                            <AvatarImage src={user.avatar} className="object-cover" />
                                        )}
                                        <AvatarFallback className="bg-[#6699cc]/10 text-[#6699cc] font-bold">
                                            {user?.name?.charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-[#2ecc71] rounded-full border-2 border-white shadow-sm animate-pulse" />
                                </div>
                                <div className="hidden sm:flex flex-col items-start min-w-[60px]">
                                    <span className="text-[12px] font-bold text-slate-800 leading-none">{user?.username}</span>
                                    <span className="text-[10px] font-bold text-slate-400 capitalize">{user?.role}</span>
                                </div>
                                <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl shadow-2xl border border-slate-100 mt-2">
                            <div className="px-2 py-3 mb-1 bg-slate-50 rounded-xl">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Active Account</p>
                                <div className="flex flex-col px-1">
                                    <p className="text-sm font-black text-slate-800 leading-none">{user?.username}</p>
                                    <p className="text-[10px] font-bold text-slate-400 mt-1 truncate">{user?.email}</p>
                                </div>
                            </div>
                            <DropdownMenuItem asChild className="rounded-xl py-3 cursor-pointer focus:bg-[#6699cc]/5 focus:text-[#6699cc]">
                                <Link href={user?.role === 'owner' ? '/dashboard/owner' : '/dashboard/user'} className="flex items-center">
                                    <LayoutDashboard className="w-4 h-4 mr-3" />
                                    Dashboard
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild className="rounded-xl py-3 cursor-pointer focus:bg-[#6699cc]/5 focus:text-[#6699cc]">
                                <Link href={profileHref} className="flex items-center">
                                    <User className="w-4 h-4 mr-3" />
                                    View Public Profile
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild className="rounded-xl py-3 cursor-pointer focus:bg-[#6699cc]/5 focus:text-[#6699cc]">
                                <Link href={user?.role === 'owner' ? '/dashboard/owner/premium' : '/dashboard/user/premium'} className="flex items-center">
                                    <CreditCard className="w-4 h-4 mr-3" />
                                    Subscription Status
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="my-1 mx-2" />
                            <DropdownMenuItem
                                onClick={handleLogout}
                                className="rounded-xl py-3 cursor-pointer text-red-500 focus:bg-red-50 focus:text-red-600"
                            >
                                <LogOut className="w-4 h-4 mr-3" />
                                Log Out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>

            {/* Spacer */}
            <div className="h-16 shrink-0" />
        </>
    )
}
