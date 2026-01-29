"use client"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
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
} from 'lucide-react'
import { logoutUser } from '@/lib/store'

interface DashboardSidebarProps {
  role: 'user' | 'owner'
}

export function DashboardSidebar({ role }: DashboardSidebarProps) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const handleLogout = () => {
    logoutUser()
    window.location.href = '/'
  }

  const userLinks = [
    { href: '/dashboard/user', icon: LayoutDashboard, label: 'Overview' },
    { href: '/dashboard/user/bookings', icon: Calendar, label: 'My Bookings' },
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
      "flex flex-col h-full bg-sidebar border-r border-sidebar-border transition-all duration-300",
      isCollapsed ? "w-[70px]" : "w-[260px]"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        <Link href="/" className={cn("flex items-center gap-2", isCollapsed && "justify-center")}>
          <div className="w-9 h-9 rounded-lg bg-sidebar-primary flex items-center justify-center flex-shrink-0">
            <Home className="w-5 h-5 text-sidebar-primary-foreground" />
          </div>
          {!isCollapsed && (
            <span className="text-lg font-semibold text-sidebar-foreground">HouseHub</span>
          )}
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="hidden md:flex"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <ChevronLeft className={cn(
            "w-4 h-4 transition-transform",
            isCollapsed && "rotate-180"
          )} />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {links.map((link) => {
          const isActive = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
                isCollapsed && "justify-center px-2"
              )}
            >
              <link.icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span>{link.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-sidebar-border">
        <button
          onClick={handleLogout}
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg w-full text-sidebar-foreground/70 hover:bg-destructive/10 hover:text-destructive transition-all",
            isCollapsed && "justify-center px-2"
          )}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block h-screen sticky top-0">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden fixed top-4 left-4 z-50 bg-background shadow-sm border"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-[260px]">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  )
}
