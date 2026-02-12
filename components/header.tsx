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
      borderRadius: '20px',
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
        borderRadius: '20px',
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
    ? 'bg-background/95 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,0.05)] border-b border-border'
    : 'bg-background/80 backdrop-blur-md border-b border-border/50'

  const textColor = 'text-foreground'
  const navTextColor = 'text-muted-foreground'
  const logoColor = 'text-foreground'

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerBg}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo Container */}
          <div className="flex-1 flex items-center">
            <Link href="/" className="flex items-center gap-3 group shrink-0">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 active:scale-95" style={{ backgroundColor: '#6699cc', boxShadow: '0 10px 15px -3px rgba(102, 153, 204, 0.2)' }}>
                <Home className="w-5 h-5 text-white" />
              </div>
              <span className={`text-xl md:text-2xl font-black tracking-tight transform transition-colors duration-300 ${logoColor}`}>
                House<span style={{ color: '#6699cc' }}>Hub</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-bold uppercase tracking-widest transition-all duration-300 relative group ${navTextColor}`}
                style={{ '--hover-color': '#6699cc' } as React.CSSProperties}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#6699cc')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '')}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full" style={{ backgroundColor: '#6699cc' }} />
              </Link>
            ))}
          </nav>

          {/* Desktop Actions Container */}
          <div className="flex-1 hidden lg:flex items-center justify-end gap-4">
            <ThemeToggle />
            {user ? (
              <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className={`flex items-center gap-3 px-2 hover:bg-muted ${textColor}`}
                    onMouseEnter={() => setIsDropdownOpen(true)}
                  >
                    <Avatar className="w-9 h-9 border-2" style={{ borderColor: 'rgba(102, 153, 204, 0.2)' }}>
                      <AvatarFallback className="text-white font-bold" style={{ backgroundColor: '#6699cc' }}>
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-bold">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 p-2 rounded-2xl"
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  <DropdownMenuItem asChild className="rounded-xl cursor-pointer py-3">
                    <Link href={user.role === 'owner' ? '/dashboard/owner' : '/dashboard/user'}>
                      <User className="w-4 h-4 mr-3" />
                      User Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="my-2" />
                  <DropdownMenuItem onClick={handleLogout} className="rounded-xl cursor-pointer py-3 text-destructive">
                    <LogOut className="w-4 h-4 mr-3" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/auth/login">
                  <Button variant="ghost" className={`font-bold hover:bg-muted ${textColor}`}>
                    Login
                  </Button>
                </Link>
                <Link href="/auth/register?role=owner">
                  <Button className="rounded-full px-6 font-bold shadow-lg" style={{ backgroundColor: '#6699cc', boxShadow: '0 10px 15px -3px rgba(102, 153, 204, 0.2)' }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#5588bb')} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#6699cc')}>
                    List Property
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Right Section */}
          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-12 h-12 rounded-2xl active:scale-95 transition-all bg-muted hover:bg-muted/80 text-foreground"
                >
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-[400px] p-0 border-none bg-background">
                <div className="h-full flex flex-col p-8">
                  <div className="flex items-center justify-between mb-12">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                        <Home className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xl font-black">House<span className="text-primary">Hub</span></span>
                    </div>
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
                        <Link
                          href={user.role === 'owner' ? '/dashboard/owner' : '/dashboard/user'}
                          onClick={() => setIsOpen(false)}
                          className="w-full"
                        >
                          <Button className="w-full py-7 rounded-2xl font-bold text-lg gap-3">
                            <User className="w-5 h-5" />
                            Go to Dashboard
                          </Button>
                        </Link>
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
        </div>
      </div>
    </header>
  )
}
