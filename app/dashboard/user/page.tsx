"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, Home, Clock, CheckCircle, Search } from 'lucide-react'
import { getCurrentUser, getUserBookings } from '@/lib/store'
import { getPropertyById } from '@/lib/data'
import type { Booking, User } from '@/lib/types'
import { cn } from '@/lib/utils'

export default function UserDashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [bookings, setBookings] = useState<Booking[]>([])

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
      setBookings(getUserBookings(currentUser.id))
    }
  }, [])

  const pendingBookings = bookings.filter(b => b.status === 'pending')
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed')

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Welcome back, {user?.name?.split(' ')[0]}!
        </h1>
        <p className="text-slate-500 mt-1 font-medium">
          Manage your bookings and find your perfect home.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="bg-white border-slate-200 shadow-sm rounded-2xl">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Calendar className="w-7 h-7 text-primary" />
              </div>
              <div>
                <p className="text-3xl font-black text-slate-900">{bookings.length}</p>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Total Bookings</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200 shadow-sm rounded-2xl">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center">
                <Clock className="w-7 h-7 text-amber-500" />
              </div>
              <div>
                <p className="text-3xl font-black text-slate-900">{pendingBookings.length}</p>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200 shadow-sm rounded-2xl">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center">
                <CheckCircle className="w-7 h-7 text-green-500" />
              </div>
              <div>
                <p className="text-3xl font-black text-slate-900">{confirmedBookings.length}</p>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Confirmed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-white border-slate-200 shadow-sm rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-slate-900">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Link href="/properties">
            <Button className="rounded-xl px-6 py-6 font-bold shadow-lg shadow-primary/20">
              <Search className="w-5 h-5 mr-2" />
              Browse Properties
            </Button>
          </Link>
          <Link href="/dashboard/user/bookings">
            <Button variant="outline" className="rounded-xl px-6 py-6 border-slate-200 font-bold hover:bg-slate-50">
              <Calendar className="w-5 h-5 mr-2" />
              View My Bookings
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Recent Bookings */}
      <Card className="bg-white border-slate-200 shadow-sm rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-bold text-slate-900">Recent Bookings</CardTitle>
          <Link href="/dashboard/user/bookings">
            <Button variant="ghost" size="sm" className="font-bold text-primary hover:text-primary/80">View All</Button>
          </Link>
        </CardHeader>
        <CardContent>
          {bookings.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <Home className="w-10 h-10 text-slate-400" />
              </div>
              <p className="text-slate-500 font-medium text-lg">No bookings yet</p>
              <Link href="/properties">
                <Button variant="link" className="mt-2 text-primary font-bold">
                  Start browsing properties
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.slice(0, 3).map((booking) => {
                const property = getPropertyById(booking.propertyId)
                if (!property) return null

                return (
                  <div
                    key={booking.id}
                    className="flex items-center gap-5 p-5 rounded-2xl border border-slate-100 hover:border-primary/20 hover:bg-primary/5 transition-all group"
                  >
                    <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 shadow-md">
                      <img
                        src={property.images[0] || "/placeholder.svg"}
                        alt={property.name}
                        className="w-full h-full object-cover transition-transform group-hover:scale-110"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-900 text-lg line-clamp-1">
                        {property.name}
                      </h4>
                      <p className="text-slate-500 font-medium flex items-center gap-1.5 mt-1">
                        <Search className="w-4 h-4" />
                        {property.location}, {property.city}
                      </p>
                    </div>
                    <Badge
                      className={cn(
                        "rounded-full px-4 py-1.5 font-bold uppercase tracking-widest text-[10px]",
                        booking.status === 'confirmed'
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                      )}
                    >
                      {booking.status}
                    </Badge>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
