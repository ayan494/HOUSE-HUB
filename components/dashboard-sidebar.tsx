"use client"

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet'
import {
  Home,
  Calendar,
  User,
  LogOut,
  Building,
  Plus,
  Crown,
  Menu,
  LayoutDashboard,
  Clock,
} from 'lucide-react'
import { logoutUser } from '@/lib/store'
import Swal from 'sweetalert2'

interface DashboardSidebarProps {
  role: 'user' | 'owner'
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function DashboardSidebar({ role, open, onOpenChange }: DashboardSidebarProps) {
  const pathname = usePathname()
  const [internalOpen, setInternalOpen] = useState(false)

  const isMobileOpen = open !== undefined ? open : internalOpen
  const setIsMobileOpen = onOpenChange !== undefined ? onOpenChange : setInternalOpen

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: 'Sign Out?',
      text: "Do you really want to leave?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#6699cc',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Logout',
      customClass: {
        popup: 'rounded-3xl',
      },
    })

    if (result.isConfirmed) {
      logoutUser()

      await Swal.fire({
        title: 'Goodbye!',
        text: 'Successfully logged out.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
        timerProgressBar: true,
        customClass: {
          popup: 'rounded-3xl',
        },
      })

      window.location.href = '/'
    }
  }

  const userLinks = [
    { href: '/dashboard/user', icon: LayoutDashboard, label: 'Overview' },
    { href: '/dashboard/user/bookings', icon: Calendar, label: 'My Bookings' },
    { href: '/dashboard/history', icon: Clock, label: 'History' },
    { href: '/dashboard/user/premium', icon: Crown, label: 'Get Plus' },
    { href: '/dashboard/user/profile', icon: User, label: 'Profile' },
  ]

  const ownerLinks = [
    { href: '/dashboard/owner', icon: LayoutDashboard, label: 'Overview' },
    { href: '/dashboard/owner/properties', icon: Building, label: 'My Properties' },
    { href: '/dashboard/owner/add', icon: Plus, label: 'Add Property' },
    { href: '/dashboard/owner/bookings', icon: Calendar, label: 'Bookings' },
    { href: '/dashboard/owner/premium', icon: Crown, label: 'Premium' },
    { href: '/dashboard/owner/profile', icon: User, label: 'Profile' },
  ]

  const links = role === 'owner' ? ownerLinks : userLinks

  const SidebarContent = () => (
    <div className="flex flex-col h-[100vh] bg-background border-r border-border shadow-sm w-64">
      {/* Header — centered icon only */}
      <div className="flex items-center justify-center py-8 border-b border-border/50">
        <Link href={role === 'owner' ? '/dashboard/owner' : '/dashboard/user'} className="active:scale-95 transition-transform">
          <Image
            src="/rentora-logo.png"
            alt="Rentora"
            width={160}
            height={55}
            className="h-10 w-auto object-contain"
          />
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-6 px-4">
        <nav className="space-y-1.5">
          {links.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all group",
                  isActive
                    ? "text-white font-bold"
                    : "text-slate-500 hover:text-[#6699cc] hover:bg-[#6699cc]/5 font-medium"
                )}
                style={isActive ? { backgroundColor: '#6699cc', boxShadow: '0 10px 15px -3px rgba(102, 153, 204, 0.2)' } : {}}
              >
                <link.icon className={cn(
                  "w-5 h-5 transition-colors duration-300",
                  isActive ? "text-white" : "text-slate-400 group-hover:text-primary"
                )} />
                <span className="text-sm">
                  {link.label}
                </span>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border/50">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl w-full text-slate-500 hover:text-destructive hover:bg-destructive/5 transition-all font-bold group"
        >
          <LogOut className="w-5 h-5 text-slate-400 group-hover:text-destructive transition-colors duration-300" />
          <span className="text-sm font-bold">
            Logout
          </span>
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block h-screen fixed top-0 left-0 z-30 w-64 shadow-xl">
        <SidebarContent />
      </aside>

      {/* Sidebar Spacer */}
      <div className="hidden md:block shrink-0 w-64" />

      {/* Mobile Sidebar Overlay */}
      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetContent side="left" className="p-0 border-none w-64">
          <SheetHeader className="sr-only">
            <SheetTitle>Dashboard Navigation</SheetTitle>
            <SheetDescription>Mobile navigation sidebar for the dashboard</SheetDescription>
          </SheetHeader>
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  )
}
