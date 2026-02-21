"use client"

import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Home } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-card border-t border-border text-foreground transition-colors duration-500">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#6699cc] text-white shadow-lg shadow-[#6699cc]/20 transition-transform group-hover:scale-110">
                <Home className="w-6 h-6 fill-current" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-foreground">
                Rentora
              </span>
            </Link>
            <p className="text-muted-foreground text-sm mb-6">
              Pakistan&apos;s premier platform for house and apartment rentals.
              Connect directly with property owners, no middlemen.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/properties" className="text-muted-foreground hover:text-primary transition-colors">
                  Browse Properties
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-muted-foreground hover:text-primary transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/auth/register?role=owner" className="text-muted-foreground hover:text-primary transition-colors">
                  List Your Property
                </Link>
              </li>
              <li>
                <Link href="/auth/login" className="text-muted-foreground hover:text-primary transition-colors">
                  Sign In
                </Link>
              </li>
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Popular Cities</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/properties?city=Lahore" className="text-muted-foreground hover:text-primary transition-colors">
                  Lahore
                </Link>
              </li>
              <li>
                <Link href="/properties?city=Karachi" className="text-muted-foreground hover:text-primary transition-colors">
                  Karachi
                </Link>
              </li>
              <li>
                <Link href="/properties?city=Islamabad" className="text-muted-foreground hover:text-primary transition-colors">
                  Islamabad
                </Link>
              </li>
              <li>
                <Link href="/properties?city=Rawalpindi" className="text-muted-foreground hover:text-primary transition-colors">
                  Rawalpindi
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>ayansaeed09177@gmail.com</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>+92 3142412744</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="w-4 h-4 mt-1" />
                <span>shahrah-e-quideen khudadad colony karachi, Pakistan</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Rentora. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
