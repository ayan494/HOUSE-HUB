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
        <h1 className="text-3xl font-bold">
          Welcome back, {user?.name?.split(' ')[0]}!
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage your bookings and find your perfect home.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{bookings.length}</p>
                <p className="text-sm text-muted-foreground">Total Bookings</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{pendingBookings.length}</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{confirmedBookings.length}</p>
                <p className="text-sm text-muted-foreground">Confirmed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Credits Card */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
              C
            </div>
            <div>
              <p className="text-sm font-medium text-primary uppercase tracking-wider">Available Credits</p>
              <p className="text-3xl font-bold text-foreground">{user?.credits || 0}</p>
            </div>
          </div>
          <Link href="/dashboard/user/plan">
            <Button size="sm">Get More Credits</Button>
          </Link>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Link href="/properties">
            <Button>
              <Search className="w-4 h-4 mr-2" />
              Browse Properties
            </Button>
          </Link>
          <Link href="/dashboard/user/bookings">
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              View My Bookings
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Recent Bookings */}
      <Card className="border-border/50">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Recent Bookings</CardTitle>
          <Link href="/dashboard/user/bookings">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">View All</Button>
          </Link>
        </CardHeader>
        <CardContent>
          {bookings.length === 0 ? (
            <div className="text-center py-8">
              <Home className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No bookings yet</p>
              <Link href="/properties">
                <Button variant="link" className="mt-2 text-primary hover:text-primary/90">
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
                    className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                  >
                    <div className="w-16 h-16 rounded-lg bg-muted overflow-hidden">
                      <img
                        src={property.images[0] || "/placeholder.svg"}
                        alt={property.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">
                        {property.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {property.location}, {property.city}
                      </p>
                    </div>
                    <Badge
                      variant={booking.status === 'confirmed' ? 'default' : 'secondary'}
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
