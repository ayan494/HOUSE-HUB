
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
    { href: '/dashboard/owner/bookings', icon: Calendar, label: 'Property Bookings' },
    { href: '/dashboard/owner/my-bookings', icon: Calendar, label: 'My Bookings' },
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
      <div className="flex items-center justify-between p-2 sm:p-3 md:p-4 border-b border-sidebar-border gap-2">
        <Link href="/" className={cn("flex items-center gap-2", isCollapsed && "justify-center")}>
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Home className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          </div>
          {!isCollapsed && (
            <span className="text-base sm:text-lg font-semibold text-sidebar-foreground">HouseHub</span>
          )}
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="hidden md:flex h-8 w-8 sm:h-9 sm:w-9 text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <ChevronLeft className={cn(
            "w-4 h-4 transition-transform",
            isCollapsed && "rotate-180"
          )} />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 sm:p-3 space-y-1">
        {links.map((link) => {
          const isActive = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileOpen(false)}
              className={cn(
                "flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg transition-all text-xs sm:text-sm",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  : "text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent",
                isCollapsed && "justify-center px-2"
              )}
            >
              <link.icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              {!isCollapsed && <span className="hidden sm:inline">{link.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-2 sm:p-3 border-t border-sidebar-border">
        <button
          onClick={handleLogout}
          className={cn(
            "flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg w-full text-muted-foreground hover:text-destructive hover:bg-sidebar-accent transition-all text-xs sm:text-sm",
            isCollapsed && "justify-center px-2"
          )}
        >
          <LogOut className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
          {!isCollapsed && <span className="hidden sm:inline">Logout</span>}
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
            className="md:hidden fixed top-3 left-3 z-[60] bg-background/80 backdrop-blur-sm shadow-sm border h-8 w-8"
          >
            <Menu className="w-4 h-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-full max-w-full">
          <div className="flex flex-col h-full bg-sidebar border-r border-sidebar-border">
            {/* Header */}
            <div className="flex items-center justify-between p-2 sm:p-3 border-b border-sidebar-border gap-2">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Home className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <span className="text-base sm:text-lg font-semibold text-sidebar-foreground">HouseHub</span>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-2 sm:p-3 space-y-1">
              {links.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg transition-all text-xs sm:text-sm w-full",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                        : "text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent"
                    )}
                  >
                    <link.icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    <span>{link.label}</span>
                  </Link>
                )
              })}
            </nav>

            {/* Footer */}
            <div className="p-2 sm:p-3 border-t border-sidebar-border">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg w-full text-muted-foreground hover:text-destructive hover:bg-sidebar-accent transition-all text-xs sm:text-sm"
              >
                <LogOut className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
