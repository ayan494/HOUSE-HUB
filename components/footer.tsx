"use client"

import Link from 'next/link'
import { Home, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                <Home className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold">HouseHub</span>
            </Link>
            <p className="text-gray-300 text-sm mb-6">
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
                <Link href="/properties" className="text-gray-300 hover:text-primary transition-colors">
                  Browse Properties
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-gray-300 hover:text-primary transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/auth/register?role=owner" className="text-gray-300 hover:text-primary transition-colors">
                  List Your Property
                </Link>
              </li>
              <li>
                <Link href="/auth/login" className="text-gray-300 hover:text-primary transition-colors">
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
                <Link href="/properties?city=Lahore" className="text-gray-300 hover:text-primary transition-colors">
                  Lahore
                </Link>
              </li>
              <li>
                <Link href="/properties?city=Karachi" className="text-gray-300 hover:text-primary transition-colors">
                  Karachi
                </Link>
              </li>
              <li>
                <Link href="/properties?city=Islamabad" className="text-gray-300 hover:text-primary transition-colors">
                  Islamabad
                </Link>
              </li>
              <li>
                <Link href="/properties?city=Rawalpindi" className="text-gray-300 hover:text-primary transition-colors">
                  Rawalpindi
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-300">
                <Mail className="w-4 h-4" />
                <span>ayansaeed09177@gmail.com</span>
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <Phone className="w-4 h-4" />
                <span>+92 3142412744</span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <MapPin className="w-4 h-4 mt-1" />
                <span>shahrah-e-quideen khudadad colony karachi, Pakistan</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} HouseHub. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-gray-400 hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
