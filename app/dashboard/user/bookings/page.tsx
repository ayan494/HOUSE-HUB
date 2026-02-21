"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin, Phone, User, ArrowRight } from 'lucide-react'
import { getCurrentUser, getUserBookings, getPropertiesById } from '@/lib/store'
import type { Booking, User as UserType } from '@/lib/types'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'

export default function UserBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (currentUser) {
      setBookings(getUserBookings(currentUser.id))
    }
  }, [])

  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed':
        return 'bg-primary/10 text-primary border-primary/20'
      case 'pending':
        return 'bg-amber-500/10 text-amber-600 border-amber-500/20'
      case 'cancelled':
        return 'bg-destructive/10 text-destructive border-destructive/20'
      default:
        return ''
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">My Bookings</h1>
        <p className="text-slate-500 mt-1 font-medium">
          Track and manage your property bookings.
        </p>
      </div>

      {bookings.length === 0 ? (
        <Card className="bg-white border-slate-200 shadow-sm rounded-[2rem] overflow-hidden">
          <CardContent className="py-20 text-center">
            <div className="w-24 h-24 mx-auto bg-slate-50 rounded-full flex items-center justify-center mb-6">
              <Calendar className="w-12 h-12 text-slate-300" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">No bookings yet</h3>
            <p className="text-slate-500 mb-8 max-w-sm mx-auto font-medium">
              Start browsing properties to find your perfect home.
            </p>
            <Link href="/properties">
              <Button className="rounded-2xl px-8 py-7 font-bold text-lg shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95">
                Browse Properties
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => {
            const property = getPropertiesById(booking.propertyId)
            if (!property) return null

            return (
              <Card key={booking.id} className="overflow-hidden bg-white border-slate-200 shadow-sm rounded-[2rem] hover:border-primary/20 transition-all group">
                <div className="flex flex-col md:flex-row">
                  {/* Property Image */}
                  <div className="md:w-64 h-56 md:h-auto bg-slate-100 overflow-hidden relative">
                    <img
                      src={property.images[0] || "/placeholder.svg"}
                      alt={property.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className={cn("px-4 py-1.5 rounded-full font-bold uppercase tracking-widest text-[10px] shadow-lg", getStatusColor(booking.status))}>
                        {booking.status}
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-8">
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                      <div className="space-y-2">
                        <Link href={`/property/${property.id}`}>
                          <h3 className="text-2xl font-black text-slate-900 group-hover:text-primary transition-colors leading-tight">
                            {property.name}
                          </h3>
                        </Link>
                        <div className="flex items-center gap-2 text-slate-500 font-medium">
                          <MapPin className="w-4 h-4 text-primary" />
                          {property.location}, {property.city}
                        </div>
                      </div>

                      <div className="lg:text-right bg-primary/5 px-6 py-4 rounded-3xl border border-primary/10">
                        <p className="text-3xl font-black text-primary">
                          PKR {property.price.toLocaleString()}
                        </p>
                        <p className="text-sm font-bold text-primary/60 uppercase tracking-widest">per month</p>
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-2 gap-8 mt-8 pt-8 border-t border-slate-50">
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Check-in</p>
                        <p className="font-bold text-slate-900 text-lg">
                          {format(new Date(booking.checkIn), 'PPP')}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Check-out</p>
                        <p className="font-bold text-slate-900 text-lg">
                          {format(new Date(booking.checkOut), 'PPP')}
                        </p>
                      </div>
                    </div>

                    {/* Owner Contact */}
                    <div className="flex flex-wrap items-center gap-4 mt-8 p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
                      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Owner</p>
                        <p className="font-bold text-slate-900">{property.owner.name}</p>
                      </div>
                      <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-100 shadow-sm text-primary font-bold">
                        <Phone className="w-4 h-4" />
                        {property.owner.phone}
                      </div>
                    </div>

                    {booking.notes && (
                      <div className="mt-6 p-4 bg-amber-50 rounded-2xl border border-amber-100/50">
                        <p className="text-[10px] font-black text-amber-600/60 uppercase tracking-widest mb-1">Your Notes</p>
                        <p className="text-sm text-amber-900 font-medium leading-relaxed italic">"{booking.notes}"</p>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
