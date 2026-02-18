"use client"

import { useState } from 'react'
import Link from 'next/link'
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
  Settings,
  Crown,
  Menu,
  ChevronLeft,
  LayoutDashboard,
  Clock,
  Pin,
  PinOff,
} from 'lucide-react'
import { logoutUser } from '@/lib/store'
import Swal from 'sweetalert2'

interface DashboardSidebarProps {
  role: 'user' | 'owner'
}

export function DashboardSidebar({ role }: DashboardSidebarProps) {
  const pathname = usePathname()
  const [isPinned, setIsPinned] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const isExpanded = isPinned || isHovered

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: 'Sign Out?',
      text: "Do you really want to leave?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#6699cc',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Logout',
      borderRadius: '20px',
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
        borderRadius: '20px',
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
    <div className={cn(
      "flex flex-col h-[100vh] bg-background/95 backdrop-blur-xl border-r border-border shadow-lg transition-all duration-300 ease-in-out",
      isExpanded ? "w-64" : "w-20"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/50 gap-4 overflow-hidden">
        <div className={cn(
          "flex items-center gap-3 transition-opacity duration-300",
          isExpanded ? "opacity-100" : "opacity-0 invisible sm:visible sm:opacity-100"
        )}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 shrink-0" style={{ backgroundColor: '#6699cc', boxShadow: '0 10px 15px -3px rgba(102, 153, 204, 0.2)' }}>
            <Home className="w-5 h-5 text-white" />
          </div>
          <span className={cn(
            "text-xl font-black text-slate-900 tracking-tight whitespace-nowrap transition-all duration-300",
            isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"
          )}>
            House<span style={{ color: '#6699cc' }}>Hub</span>
          </span>
        </div>
        <div className={cn(
          "transition-all duration-300",
          isExpanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 pointer-events-none"
        )}>
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex h-9 w-9 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-xl shrink-0"
            onClick={() => setIsPinned(!isPinned)}
            title={isPinned ? "Unpin Sidebar" : "Pin Sidebar"}
          >
            {isPinned ? (
              <PinOff className="w-4 h-4" />
            ) : (
              <Pin className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4 px-3">
        <nav className="space-y-1.5">
          {links.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 group",
                  isActive
                    ? "text-white font-bold"
                    : "text-slate-500 hover:text-[#6699cc] hover:bg-[#6699cc]/5 font-medium",
                  !isExpanded && "justify-center px-0"
                )}
                style={isActive ? { backgroundColor: '#6699cc', boxShadow: '0 10px 15px -3px rgba(102, 153, 204, 0.2)' } : {}}
              >
                <div className="flex items-center justify-center w-5 shrink-0">
                  <link.icon className={cn(
                    "w-5 h-5 transition-colors duration-300",
                    isActive ? "text-white" : "text-slate-400 group-hover:text-primary"
                  )} />
                </div>
                <span className={cn(
                  "text-sm transition-all duration-300 delay-150 whitespace-nowrap overflow-hidden",
                  isExpanded ? "opacity-100 w-auto ml-3" : "opacity-0 w-0"
                )}>
                  {link.label}
                </span>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-border/50">
        <button
          onClick={handleLogout}
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-xl w-full text-slate-500 hover:text-destructive hover:bg-destructive/5 transition-all font-bold group",
            !isExpanded && "justify-center px-0"
          )}
        >
          <div className="flex items-center justify-center w-5 shrink-0">
            <LogOut className="w-5 h-5 text-slate-400 group-hover:text-destructive transition-colors duration-300" />
          </div>
          <span className={cn(
            "text-sm font-bold transition-all duration-300 delay-150 whitespace-nowrap overflow-hidden",
            isExpanded ? "opacity-100 w-auto ml-3" : "opacity-0 w-0"
          )}>
            Logout
          </span>
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden md:block h-screen fixed top-0 left-0 z-30 transition-all duration-300 ease-in-out",
          isExpanded ? "w-64" : "w-20"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <SidebarContent />
      </aside>

      {/* Sidebar Spacer for desktop to maintain layout flow */}
      <div className={cn(
        "hidden md:block shrink-0 transition-all duration-300 ease-in-out",
        isExpanded ? "w-64" : "w-20"
      )} />

      {/* Mobile Sidebar Trigger */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-40 bg-white shadow-xl border border-slate-100 h-12 w-12 rounded-2xl text-primary active:scale-95 transition-all"
      >
        <Menu className="w-6 h-6" />
      </Button>

      {/* Mobile Sidebar Overlay */}
      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetContent side="left" className="p-0 border-none w-[280px]">
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
