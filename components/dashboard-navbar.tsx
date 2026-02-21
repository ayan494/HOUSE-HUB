"use client"

import React, { useState, useEffect, useRef } from 'react'
import { Menu, Bell, Calendar, CheckCircle, Clock, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { getCurrentUser, getBookings } from '@/lib/store'
import type { Booking, User } from '@/lib/types'

interface DashboardNavbarProps {
    onMenuClick?: () => void
}

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

export function DashboardNavbar({ onMenuClick }: DashboardNavbarProps) {
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)
    const [notifications, setNotifications] = useState<Booking[]>([])
    const [showNotif, setShowNotif] = useState(false)
    const notifRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const currentUser = getCurrentUser()
        setUser(currentUser)
        if (currentUser) {
            const allBookings = getBookings()
            const userBookings = allBookings
                .filter(b => b.userId === currentUser.id)
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .slice(0, 5)
            setNotifications(userBookings)
        }
    }, [])

    // Close on outside click
    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
                setShowNotif(false)
            }
        }
        document.addEventListener('mousedown', handleClick)
        return () => document.removeEventListener('mousedown', handleClick)
    }, [])

    const profileHref = user?.role === 'owner' ? '/dashboard/owner/profile' : '/dashboard/user/profile'

    return (
        <>
            <header className="fixed top-0 right-0 left-0 md:left-64 z-30 bg-white/90 backdrop-blur-md border-b border-slate-100 px-4 md:px-8 h-16 flex items-center justify-between shadow-sm">
                {/* Left: Hamburger */}
                <div className="flex items-center">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onMenuClick}
                        className="md:hidden text-slate-500 hover:text-primary transition-colors h-10 w-10 rounded-xl"
                    >
                        <Menu className="w-6 h-6" />
                    </Button>
                </div>

                {/* Right: Icons */}
                <div className="flex items-center gap-3">

                    {/* Notification Bell */}
                    <div className="relative" ref={notifRef}>
                        <button
                            onClick={() => setShowNotif(v => !v)}
                            className="relative w-10 h-10 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center hover:bg-slate-100 transition-colors"
                        >
                            <Bell className="w-5 h-5" />
                            {notifications.length > 0 && (
                                <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-[#2ecc71] rounded-full border-2 border-white" />
                            )}
                        </button>

                        {/* Dropdown */}
                        {showNotif && (
                            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50">
                                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                                    <p className="text-sm font-bold text-slate-800">Notifications</p>
                                    {notifications.length > 0 && (
                                        <span className="text-xs font-semibold bg-[#2ecc71]/10 text-[#2ecc71] px-2 py-0.5 rounded-full">
                                            {notifications.length} updates
                                        </span>
                                    )}
                                </div>

                                {notifications.length === 0 ? (
                                    <div className="px-4 py-8 text-center text-sm text-slate-400">
                                        <Bell className="w-8 h-8 mx-auto mb-2 text-slate-200" />
                                        No recent activity
                                    </div>
                                ) : (
                                    <ul className="divide-y divide-slate-50 max-h-72 overflow-y-auto">
                                        {notifications.map((b) => (
                                            <li key={b.id} className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition-colors">
                                                <div className="mt-0.5">{statusIcon[b.status]}</div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs font-semibold text-slate-700 truncate">
                                                        Booking #{b.id.slice(-6).toUpperCase()}
                                                    </p>
                                                    <p className={`text-[11px] font-bold capitalize ${statusColor[b.status]}`}>
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
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                <div className="px-4 py-2 border-t border-slate-100">
                                    <button
                                        onClick={() => { router.push(user?.role === 'owner' ? '/dashboard/owner/bookings' : '/dashboard/user/bookings'); setShowNotif(false) }}
                                        className="w-full text-xs font-semibold text-[#6699cc] hover:text-[#5588bb] py-1 transition-colors text-center"
                                    >
                                        View all bookings →
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* User Profile Avatar */}
                    <button
                        onClick={() => router.push(profileHref)}
                        className="relative ml-1 flex-shrink-0 transition-transform hover:scale-105 active:scale-95"
                        title="Go to profile"
                    >
                        <div className="w-10 h-10 rounded-full border-2 border-slate-100 overflow-hidden bg-slate-200">
                            {user?.avatar || user?.image ? (
                                <img src={user.avatar ?? user.image} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <img src="https://i.pravatar.cc/100?img=12" alt="Profile" className="w-full h-full object-cover" />
                            )}
                        </div>
                        <span className="absolute top-0 right-0 w-3 h-3 bg-[#2ecc71] rounded-full border-2 border-white shadow-sm" />
                    </button>
                </div>
            </header>

            {/* Spacer */}
            <div className="h-16 shrink-0" />
        </>
    )
}
