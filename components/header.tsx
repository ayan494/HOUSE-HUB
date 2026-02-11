"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, Home, User, LogOut, ChevronRight } from 'lucide-react'
import { getCurrentUser, logoutUser } from '@/lib/store'
import type { User as UserType } from '@/lib/types'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 sm:h-20 md:grid md:grid-cols-3">
          {/* Logo - Left Col */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-primary flex items-center justify-center transition-transform group-hover:scale-105">
                <Home className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
              </div>
              <span className={`text-lg sm:text-xl font-semibold transition-colors ${scrolled ? 'text-foreground' : 'text-white'}`}>HouseHub</span>
            </Link>
          </div>

          {/* Desktop Navigation - Center Col */}
          <nav className="hidden md:flex justify-center items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors whitespace-nowrap ${scrolled ? 'text-muted-foreground hover:text-foreground' : 'text-gray-200 hover:text-white'}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions - Right Col */}
          <div className="hidden md:flex items-center justify-end gap-3">
            <div className={`${scrolled ? '' : 'brightness-200'}`}>
              <ThemeToggle />
            </div>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className={`flex items-center gap-2 ${scrolled ? '' : 'text-white hover:bg-white/10'}`}>
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user.image || user.avatar || ''} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{user.name}</span>
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
                <Link href="/auth/register">
                  <Button variant="ghost" size="sm" className={`text-sm ${scrolled ? '' : 'text-white hover:bg-white/10'}`}>
                    Log in
                  </Button>
                </Link>
                <Link href="/auth/register?role=owner">
                  <Button size="sm" className="text-sm shadow-lg shadow-primary/20">
                    List Your Property
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button aria-label="Open menu" variant="ghost" size="icon" className={`h-9 w-9 sm:h-10 sm:w-10 ${scrolled ? '' : 'text-white hover:bg-white/10'}`}>
                  <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] border-l border-white/10 bg-white/80 dark:bg-black/80 backdrop-blur-2xl p-0">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-white/10">
                    <span className="text-xl font-bold tracking-tight">Menu</span>
                    <ThemeToggle />
                  </div>
                  <div className="flex-1 overflow-y-auto p-6">
                    <nav className="flex flex-col gap-2">
                      {navLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className="group flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
                        >
                          <span className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">{link.label}</span>
                          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      ))}
                    </nav>
                  </div>
                  <div className="p-6 border-t border-gray-100 dark:border-white/10 bg-gray-50/50 dark:bg-white/5">
                    {user ? (
                      <div className="flex flex-col gap-3">
                        <Link
                          href={user.role === 'owner' ? '/dashboard/owner' : '/dashboard/user'}
                          onClick={() => setIsOpen(false)}
                          className="w-full"
                        >
                          <Button className="w-full rounded-2xl h-12 font-bold">
                            <User className="w-5 h-5 mr-2" />
                            Dashboard
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          className="w-full rounded-2xl h-12 text-destructive font-bold hover:bg-destructive/10"
                          onClick={handleLogout}
                        >
                          <LogOut className="w-5 h-5 mr-2" />
                          Logout
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-3">
                        <Link href="/auth/register" onClick={() => setIsOpen(false)}>
                          <Button variant="outline" className="w-full rounded-2xl h-12 font-bold bg-white dark:bg-transparent">
                            Log in
                          </Button>
                        </Link>
                        <Link href="/auth/register?role=owner" onClick={() => setIsOpen(false)}>
                          <Button className="w-full rounded-2xl h-12 font-bold shadow-lg shadow-primary/20">
                            List Your Property
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
