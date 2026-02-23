"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Building, Calendar, Plus, TrendingUp, Eye, Crown, DollarSign } from 'lucide-react'
import { getCurrentUser, getBookings, getOwnerProperties } from '@/lib/store'
import { properties as staticProperties } from '@/lib/data'
import type { User, Booking, Property } from '@/lib/types'
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button'
import { calculateNetProfit } from '@/lib/utils'

export default function OwnerDashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [allBookings, setAllBookings] = useState<Booking[]>([])
  const [myProperties, setMyProperties] = useState<Property[]>([])

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
      setAllBookings(getBookings())
      // Get properties from localStorage for this owner
      const owned = getOwnerProperties(currentUser.email)
      // If no properties in localStorage, show a slice from static data for demo
      // but in real case it should be from owned
      setMyProperties(owned.length > 0 ? owned : staticProperties.slice(0, 4))
    }
  }, [])

  const pendingBookings = allBookings.filter(b => b.status === 'pending')

  const totalViews = myProperties.reduce((acc, p) => acc + (p.reviews || 0) * 10, 0)
  const grossRevenue = myProperties.reduce((acc, p) => acc + p.price, 0)
  const netProfit = calculateNetProfit(grossRevenue)
  const commissionDeducted = grossRevenue > netProfit

  return (
    <div className="space-y-8 text-foreground relative z-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Owner Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Manage your properties and bookings.
          </p>
        </div>
        <Link href="/dashboard/owner/add">
          <InteractiveHoverButton className="h-11">
            Add Property
          </InteractiveHoverButton>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white/50 dark:bg-white/[0.02] backdrop-blur-xl border-white/20 dark:border-white/5 shadow-2xl transition-all duration-300 hover:shadow-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Building className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{myProperties.length}</p>
                <p className="text-sm text-muted-foreground">Properties</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/50 dark:bg-white/[0.02] backdrop-blur-xl border-white/20 dark:border-white/5 shadow-2xl transition-all duration-300 hover:shadow-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{pendingBookings.length}</p>
                <p className="text-sm text-muted-foreground">Pending Bookings</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/50 dark:bg-white/[0.02] backdrop-blur-xl border-white/20 dark:border-white/5 shadow-2xl transition-all duration-300 hover:shadow-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Eye className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{totalViews}</p>
                <p className="text-sm text-muted-foreground">Total Views</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/50 dark:bg-white/[0.02] backdrop-blur-xl border-white/20 dark:border-white/5 shadow-2xl transition-all duration-300 hover:shadow-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">PKR {(netProfit / 1000).toFixed(1)}K</p>
                <p className="text-sm text-muted-foreground">Net Profit</p>
                {commissionDeducted && (
                  <p className="text-[10px] text-amber-600 mt-1">0.5% platform fee applied</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Properties & Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* My Properties */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg text-foreground">My Properties</CardTitle>
            <Link href="/dashboard/owner/properties">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">View All</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myProperties.slice(0, 3).map((property) => (
                <div
                  key={property.id}
                  className="flex items-center gap-4 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                >
                  <div className="w-16 h-16 rounded-lg bg-muted overflow-hidden flex-shrink-0">
                    <img
                      src={property.images[0] || "/placeholder.svg"}
                      alt={property.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-foreground truncate">
                        {property.name}
                      </h4>
                      {property.isPremium && (
                        <Badge className="bg-[var(--premium)] text-[var(--premium-foreground)] text-xs sm:text-sm px-2 py-0.5">
                          <Crown className="w-3 h-3 mr-1" />
                          <span className="hidden sm:inline">Premium</span>
                          <span className="sm:hidden">Prm</span>
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {property.location}, {property.city}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-primary">
                      PKR {property.price.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">per month</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions & Premium */}
        <div className="space-y-6">
          <Card className="bg-white/50 dark:bg-white/[0.02] backdrop-blur-xl border-white/20 dark:border-white/5 shadow-2xl transition-all duration-300 hover:shadow-primary/5">
            <CardHeader>
              <CardTitle className="text-lg text-foreground">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 px-4 sm:px-6">
              <Link href="/dashboard/owner/add" className="block">
                <Button variant="outline" className="w-full justify-start border-border text-foreground hover:bg-muted hover:text-foreground">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Property
                </Button>
              </Link>
              <Link href="/dashboard/owner/bookings" className="block">
                <Button variant="outline" className="w-full justify-start border-border text-foreground hover:bg-muted hover:text-foreground">
                  <Calendar className="w-4 h-4 mr-2" />
                  View Bookings
                </Button>
              </Link>
              <Link href="/dashboard/owner/premium" className="block">
                <InteractiveHoverButton className="w-full text-sm py-4 h-auto">
                  Upgrade to Premium
                </InteractiveHoverButton>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[var(--premium)]/20 to-primary/10 border-[var(--premium)]/30">
            <CardContent className="p-4 sm:p-6 flex flex-col items-start">
              <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-[var(--premium)] mb-3" />
              <h3 className="font-semibold text-foreground text-lg sm:text-xl mb-2">Go Premium</h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-4">
                Get featured placement and reach more tenants.
              </p>
              <Link href="/dashboard/owner/premium" className="w-full mt-auto">
                <InteractiveHoverButton className="w-full py-5 text-sm h-auto bg-[var(--premium)]">
                  Upgrade Now
                </InteractiveHoverButton>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
