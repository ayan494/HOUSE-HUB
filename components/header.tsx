"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet'
import { Menu, User, LogOut, Home, ArrowRight, LayoutDashboard } from 'lucide-react'
import { getCurrentUser, logoutUser } from '@/lib/store'
import type { User as UserType } from '@/lib/types'
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ThemeToggle } from '@/components/theme-toggle'
import Swal from 'sweetalert2'

export function Header() {
  const [user, setUser] = useState<UserType | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  useEffect(() => {
    setUser(getCurrentUser())

    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
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
        text: 'You have been successfully signed out.',
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


  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/properties', label: 'Browse Properties' },
    { href: '/how-it-works', label: 'How It Works' },
  ]

  // Dynamic classes based on scroll - always show background for visibility
  const headerBg = scrolled
    ? 'bg-white/80 backdrop-blur-md shadow-2xl border border-white/40'
    : 'bg-white/60 backdrop-blur-sm border border-white/20 shadow-xl'

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 md:px-0">
      <header className={cn(
        "w-full max-w-7xl h-16 md:h-20 rounded-full transition-all duration-500 flex items-center px-6 md:px-10 gap-4",
        headerBg
      )}>
        {/* Logo Section (Left for all) */}
        <div className="flex items-center gap-2 flex-1">
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <Image
              src="/rentora-logo.png"
              alt="Rentora"
              width={140}
              height={48}
              className="h-10 md:h-12 w-auto object-contain"
              priority
            />
          </Link>
        </div>

        {/* Desktop Navigation - Centered */}
        <nav className="hidden lg:flex items-center gap-10 mx-auto">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-bold uppercase tracking-widest transition-all duration-300 relative group text-slate-500"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>




        {/* Right Section: Mobile Menu+Mood / Desktop Actions+Mood */}
        <div className="flex flex-1 items-center justify-end gap-3 md:gap-4">
          <div className="hidden lg:flex items-center gap-4">


            {user ? (
              <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                <DropdownMenuTrigger asChild>
                  <button
                    className="relative flex items-center gap-3 px-2 py-1 rounded-xl hover:bg-muted transition-colors outline-none text-slate-800"
                    onMouseEnter={() => setIsDropdownOpen(true)}
                  >
                    <Avatar className="w-10 h-10 border-2 border-primary/20">
                      {user.avatar && (
                        <AvatarImage src={user.avatar} alt={user.name} className="object-cover rounded-full" />
                      )}
                      <AvatarFallback className="text-white font-bold bg-primary">
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-bold">{user.username}</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  sideOffset={12}
                  className="w-52 p-2 rounded-2xl shadow-2xl border border-border bg-popover"
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  <DropdownMenuItem asChild className="rounded-xl cursor-pointer py-3 focus:bg-primary/5">
                    <Link href={user.role === 'owner' ? '/dashboard/owner' : '/dashboard/user'}>
                      <LayoutDashboard className="w-4 h-4 mr-3 text-primary" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="my-1" />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="rounded-xl cursor-pointer py-3 text-destructive focus:bg-destructive/5"
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-6">
                <Link href="/auth/login">
                  <span className="text-sm font-bold text-slate-600 hover:text-primary transition-colors cursor-pointer">
                    Owner Login
                  </span>
                </Link>
                <Link href="/auth/login">
                  <InteractiveHoverButton className="h-11 md:h-12 px-8">
                    Find a Home
                  </InteractiveHoverButton>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu (Right) */}
          <div className="flex lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-10 h-10 rounded-xl active:scale-95 transition-all bg-slate-50 hover:bg-slate-100 text-slate-500"
                >
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85vw] sm:w-[400px] p-0 border-none bg-background">
                <SheetHeader className="sr-only">
                  <SheetTitle>Navigation Menu</SheetTitle>
                  <SheetDescription>Main navigation for mobile devices</SheetDescription>
                </SheetHeader>
                <div className="h-full flex flex-col p-8">
                  <div className="flex items-center justify-between mb-12">
                    <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2 group">
                      <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary text-white shadow-lg shadow-primary/20">
                        <Home className="w-5 h-5 fill-current" />
                      </div>
                      <span className="text-xl font-black tracking-tighter text-foreground">
                        Rentora
                      </span>
                    </Link>
                    {user && (
                      <Link
                        href={user.role === 'owner' ? '/dashboard/owner' : '/dashboard/user'}
                        onClick={() => setIsOpen(false)}
                        className="flex flex-col items-end hover:opacity-80 transition-opacity"
                      >
                        <span className="text-xs font-bold text-primary leading-none">{user.username}</span>
                        <span className="text-[10px] text-muted-foreground leading-none mt-1">Nickname</span>
                      </Link>
                    )}
                    <ThemeToggle />
                  </div>

                  <nav className="flex flex-col gap-4 mb-auto">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-between p-5 rounded-2xl bg-muted/50 hover:bg-primary/10 hover:text-primary transition-all group"
                      >
                        <span className="text-lg font-bold">{link.label}</span>
                        <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                          <User className="w-4 h-4 opacity-40 group-hover:opacity-100" />
                        </div>
                      </Link>
                    ))}
                  </nav>

                  <div className="mt-8 pt-8 border-t border-border flex flex-col gap-4">
                    {user ? (
                      <>

                        <Button
                          variant="outline"
                          className="w-full py-7 rounded-2xl font-bold text-lg text-destructive hover:bg-destructive/5"
                          onClick={handleLogout}
                        >
                          <LogOut className="w-5 h-5 mr-3" />
                          Sign Out
                        </Button>
                      </>
                    ) : (
                      <div className="grid grid-cols-2 gap-4">
                        <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                          <Button variant="outline" className="w-full py-7 rounded-2xl font-bold">
                            Login
                          </Button>
                        </Link>
                        <Link href="/auth/register?role=owner" onClick={() => setIsOpen(false)}>
                          <Button className="w-full py-7 rounded-2xl font-bold shadow-lg shadow-primary/20">
                            Register
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="flex items-center pl-2 md:pl-4 md:border-l border-slate-200">
            <ThemeToggle />
          </div>
        </div>
      </header>
    </div>
  )
}
