"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Building, Calendar, Plus, TrendingUp, Eye, Crown, DollarSign } from 'lucide-react'
import { getCurrentUser, getBookings } from '@/lib/store'
import { properties } from '@/lib/data'
import type { User, Booking } from '@/lib/types'

export default function OwnerDashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [allBookings, setAllBookings] = useState<Booking[]>([])

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
      setAllBookings(getBookings())
    }
  }, [])

  // For MVP, show all properties as owner's properties
  const myProperties = properties.slice(0, 4)
  const pendingBookings = allBookings.filter(b => b.status === 'pending')

  const totalViews = myProperties.reduce((acc, p) => acc + p.reviews * 10, 0)
  const totalRevenue = myProperties.reduce((acc, p) => acc + p.price, 0)

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Owner Dashboard</h1>
          <p className="text-slate-600 mt-1 font-medium">
            Manage your properties and bookings.
          </p>
        </div>
        <Link href="/dashboard/owner/add">
          <Button className="font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-shadow">
            <Plus className="w-4 h-4 mr-2" />
            Add Property
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-slate-200/60 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Building className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{myProperties.length}</p>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Properties</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200/60 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{pendingBookings.length}</p>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200/60 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Eye className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{totalViews}</p>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Views</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200/60 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">PKR {(totalRevenue / 1000).toFixed(0)}K</p>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Credits Card */}
      <Card className="border-primary/20 bg-primary/5 shadow-sm">
        <CardContent className="py-6 flex items-center justify-between">
          <div className="flex items-center gap-4 text-left">
            <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground font-black text-2xl shadow-inner">
              C
            </div>
            <div>
              <p className="text-xs font-black text-primary uppercase tracking-widest mb-1">Available Credits</p>
              <p className="text-4xl font-black text-slate-900 leading-none">{user?.credits || 0}</p>
            </div>
          </div>
          <Link href="/dashboard/owner/premium">
            <Button size="lg" className="font-black h-12 px-8 rounded-xl shadow-lg shadow-primary/25">
              Refill Credits
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Properties & Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* My Properties */}
        <Card className="lg:col-span-2 border-slate-200/60 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between px-6 pb-2">
            <CardTitle className="text-lg font-bold text-slate-900">My Properties</CardTitle>
            <Link href="/dashboard/owner/properties">
              <Button variant="ghost" size="sm" className="text-slate-500 font-bold hover:text-primary">View All</Button>
            </Link>
          </CardHeader>
          <CardContent className="px-6">
            <div className="space-y-4 pb-4">
              {myProperties.slice(0, 3).map((property) => (
                <div
                  key={property.id}
                  className="flex items-center gap-4 p-3 rounded-xl border border-slate-100 hover:border-primary/20 hover:bg-slate-50/50 transition-all group"
                >
                  <div className="w-16 h-16 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-100">
                    <img
                      src={property.images[0] || "/placeholder.svg"}
                      alt={property.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 truncate">
                        {property.name}
                      </h4>
                      {property.isPremium && (
                        <Badge className="bg-amber-500 text-white text-[10px] sm:text-xs font-black px-2 py-0">
                          <Crown className="w-3 h-3 mr-1" />
                          <span className="hidden sm:inline uppercase">Premium</span>
                          <span className="sm:hidden">Prm</span>
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 font-medium truncate">
                      {property.location}, {property.city}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-primary">
                      PKR {property.price.toLocaleString()}
                    </p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">per month</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions & Premium */}
        <div className="space-y-6">
          <Card className="border-slate-200/60 shadow-sm overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 px-6 py-4">
              <CardTitle className="text-lg font-bold text-slate-900">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-3 px-6">
              <Link href="/dashboard/owner/add" className="block">
                <Button variant="outline" className="w-full justify-start border-slate-200 font-bold text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors h-11">
                  <Plus className="w-4 h-4 mr-3" />
                  Add New Property
                </Button>
              </Link>
              <Link href="/dashboard/owner/bookings" className="block">
                <Button variant="outline" className="w-full justify-start border-slate-200 font-bold text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors h-11">
                  <Calendar className="w-4 h-4 mr-3" />
                  View Bookings
                </Button>
              </Link>
              <Link href="/dashboard/owner/premium" className="block">
                <Button variant="outline" className="w-full justify-start border-slate-200 font-bold text-slate-700 hover:bg-slate-50 hover:text-amber-600 transition-colors h-11">
                  <Crown className="w-4 h-4 mr-3" />
                  Upgrade Plan
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 text-white border-0 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-colors" />
            <CardContent className="p-6 flex flex-col items-start relative z-10">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                <Crown className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-black text-xl mb-2 tracking-tight">Boost Visibility</h3>
              <p className="text-sm text-slate-400 mb-6 font-medium leading-relaxed">
                Featured placement reaches 10x more potential tenants instantly.
              </p>
              <Link href="/dashboard/owner/premium" className="w-full mt-auto">
                <Button className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-black text-lg rounded-xl transition-all active:scale-95 shadow-lg shadow-primary/25">
                  Upgrade Now
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
