"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, Home, User, LogOut } from 'lucide-react'
import { getCurrentUser, logoutUser } from '@/lib/store'
import type { User as UserType } from '@/lib/types'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ThemeToggle } from '@/components/theme-toggle'

export function Header() {
  const [user, setUser] = useState<UserType | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    setUser(getCurrentUser())

    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    logoutUser()
    setUser(null)
    window.location.href = '/'
  }

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/properties', label: 'Browse Properties' },
    { href: '/how-it-works', label: 'How It Works' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? 'bg-background/95 backdrop-blur-md shadow-sm border-b border-border'
        : 'bg-transparent'
        }`}
    >
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-primary flex items-center justify-center transition-transform group-hover:scale-105">
              <Home className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
            </div>
            <span className="text-lg sm:text-xl font-semibold text-foreground">HouseHub</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:flex-1 md:justify-center items-center gap-4 md:gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex md:flex-shrink-0 md:justify-end items-center gap-2 sm:gap-3">
            <ThemeToggle />
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs sm:text-sm font-medium">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href={user.role === 'owner' ? '/dashboard/owner' : '/dashboard/user'}>
                      <User className="w-4 h-4 mr-2" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm" className="text-xs sm:text-sm">
                    Log in
                  </Button>
                </Link>
                <Link href="/auth/register?role=owner">
                  <Button size="sm" className="text-xs sm:text-sm">
                    List Your Property
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button aria-label="Open menu" variant="ghost" size="icon" className="h-9 w-9 sm:h-10 sm:w-10 md:hidden">
                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px]">
              <div className="flex items-center justify-between mb-6">
                <span className="text-lg font-semibold">Menu</span>
                <ThemeToggle />
              </div>
              <div className="flex flex-col gap-6">
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-base sm:text-lg font-medium text-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="border-t border-border pt-6 flex flex-col gap-3">
                  {user ? (
                    <>
                      <Link
                        href={user.role === 'owner' ? '/dashboard/owner' : '/dashboard/user'}
                        onClick={() => setIsOpen(false)}
                      >
                        <Button variant="outline" className="w-full justify-start bg-transparent text-sm sm:text-base">
                          <User className="w-4 h-4 mr-2" />
                          Dashboard
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-destructive text-sm sm:text-base"
                        onClick={handleLogout}
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                        <Button variant="outline" className="w-full bg-transparent text-sm sm:text-base">
                          Log in
                        </Button>
                      </Link>
                      <Link href="/auth/register?role=owner" onClick={() => setIsOpen(false)}>
                        <Button className="w-full text-sm sm:text-base">
                          List Your Property
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
