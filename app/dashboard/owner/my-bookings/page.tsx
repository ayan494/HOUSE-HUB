"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin, Phone, User, ArrowRight } from 'lucide-react'
import { getCurrentUser, getUserBookings } from '@/lib/store'
import { getPropertyById } from '@/lib/data'
import type { Booking, User as UserType } from '@/lib/types'
import { format } from 'date-fns'

export default function OwnerPersonalBookingsPage() {
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
                return 'bg-green-500/10 text-green-600 border-green-500/20'
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
                <h1 className="text-3xl font-bold text-foreground">My Personal Bookings</h1>
                <p className="text-muted-foreground mt-1">
                    Track properties you have booked for yourself.
                </p>
            </div>

            {bookings.length === 0 ? (
                <Card>
                    <CardContent className="py-16 text-center">
                        <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium text-foreground mb-2">No bookings yet</h3>
                        <p className="text-muted-foreground mb-6">
                            Start browsing properties to find your perfect home.
                        </p>
                        <Link href="/properties">
                            <Button>
                                Browse Properties
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-4">
                    {bookings.map((booking) => {
                        const property = getPropertyById(booking.propertyId)
                        if (!property) return null

                        return (
                            <Card key={booking.id} className="overflow-hidden">
                                <div className="flex flex-col md:flex-row">
                                    {/* Property Image */}
                                    <div className="md:w-48 h-48 md:h-auto bg-muted overflow-hidden">
                                        <img
                                            src={property.images[0] || "/placeholder.svg"}
                                            alt={property.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 p-6">
                                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Badge className={getStatusColor(booking.status)}>
                                                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                                    </Badge>
                                                </div>
                                                <Link href={`/property/${property.id}`}>
                                                    <h3 className="text-xl font-semibold text-foreground hover:text-primary transition-colors">
                                                        {property.name}
                                                    </h3>
                                                </Link>
                                                <div className="flex items-center gap-1.5 text-muted-foreground mt-1">
                                                    <MapPin className="w-4 h-4" />
                                                    {property.location}, {property.city}
                                                </div>
                                            </div>

                                            <div className="text-right">
                                                <p className="text-2xl font-bold text-primary">
                                                    PKR {property.price.toLocaleString()}
                                                </p>
                                                <p className="text-sm text-muted-foreground">per month</p>
                                            </div>
                                        </div>

                                        {/* Dates */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 pt-4 border-t border-border">
                                            <div>
                                                <p className="text-xs text-muted-foreground uppercase tracking-wide">Check-in</p>
                                                <p className="font-medium text-foreground">
                                                    {format(new Date(booking.checkIn), 'PPP')}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-muted-foreground uppercase tracking-wide">Check-out</p>
                                                <p className="font-medium text-foreground">
                                                    {format(new Date(booking.checkOut), 'PPP')}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Owner Contact */}
                                        <div className="flex items-center gap-3 mt-4 p-3 bg-muted rounded-lg">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                <User className="w-5 h-5 text-primary" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium text-sm text-foreground">{property.owner.name}</p>
                                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                                    <Phone className="w-3 h-3" />
                                                    {property.owner.phone}
                                                </div>
                                            </div>
                                        </div>
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
