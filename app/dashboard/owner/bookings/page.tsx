"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, CheckCircle, XCircle, Clock } from 'lucide-react'
import { getCurrentUser, getBookings, updateBookingStatus, getPropertiesById } from '@/lib/store'
import type { Booking, User } from '@/lib/types'
import { format } from 'date-fns'
import Link from 'next/link'
import { toast } from 'sonner'

export default function OwnerBookingsPage() {
    const [bookings, setBookings] = useState<Booking[]>([])
    const [currentUser, setCurrentUser] = useState<User | null>(null)

    useEffect(() => {
        const user = getCurrentUser()
        setCurrentUser(user)
        if (user) {
            // Fetch all bookings and filter for those belonging to this owner's properties
            const allBookings = getBookings()
            const ownerBookings = allBookings.filter(booking => {
                const property = getPropertiesById(booking.propertyId)
                return property && property.owner.id === user.id
            })
            setBookings(ownerBookings)
        }
    }, [])

    const handleStatusUpdate = (bookingId: string, status: Booking['status']) => {
        updateBookingStatus(bookingId, status)
        // Refresh bookings
        const allBookings = getBookings()
        const ownerBookings = allBookings.filter(booking => {
            const property = getPropertiesById(booking.propertyId)
            return property && currentUser && property.owner.id === currentUser.id
        })
        setBookings(ownerBookings)
        toast.success(`Booking ${status}`)
    }

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

    if (bookings.length === 0) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Property Bookings</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage incoming bookings for your properties.
                    </p>
                </div>
                <Card>
                    <CardContent className="py-16 text-center">
                        <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium text-foreground mb-2">No bookings yet</h3>
                        <p className="text-muted-foreground">
                            When tenants book your properties, they will appear here.
                        </p>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-foreground">Property Bookings</h1>
                <p className="text-muted-foreground mt-1">
                    Manage incoming bookings for your properties.
                </p>
            </div>

            <div className="space-y-4">
                {bookings.map((booking) => {
                    const property = getPropertiesById(booking.propertyId)
                    if (!property) return null

                    return (
                        <Card key={booking.id} className="overflow-hidden">
                            <div className="flex flex-col md:flex-row">
                                <div className="md:w-48 h-48 md:h-auto bg-muted overflow-hidden">
                                    <img
                                        src={property.images[0] || "/placeholder.svg"}
                                        alt={property.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1 p-6">
                                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                                        <div>
                                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                                                <Badge className={getStatusColor(booking.status)}>
                                                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                                </Badge>
                                                <span className="text-sm text-muted-foreground whitespace-nowrap">
                                                    Ordered by {booking.userId}
                                                </span>
                                            </div>
                                            <Link href={`/property/${property.id}`}>
                                                <h3 className="text-xl font-semibold text-foreground hover:text-primary transition-colors line-clamp-1">
                                                    {property.name}
                                                </h3>
                                            </Link>
                                            <div className="flex flex-col gap-1 mt-2">
                                                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                                    <Calendar className="w-4 h-4 flex-shrink-0" />
                                                    <span className="whitespace-nowrap">
                                                        Check-in: {format(new Date(booking.checkIn), 'MMM d, yyyy')}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                                    <Calendar className="w-4 h-4 flex-shrink-0" />
                                                    <span className="whitespace-nowrap">
                                                        Check-out: {format(new Date(booking.checkOut), 'MMM d, yyyy')}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-left sm:text-right">
                                            <p className="text-2xl font-bold text-primary">
                                                PKR {booking.totalPrice?.toLocaleString() || property.price.toLocaleString()}
                                            </p>
                                        </div>
                                    </div>

                                    {booking.status === 'pending' && (
                                        <div className="flex items-center gap-3 mt-6 pt-4 border-t border-border justify-end">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/20"
                                                onClick={() => handleStatusUpdate(booking.id, 'cancelled')}
                                            >
                                                <XCircle className="w-4 h-4 mr-2" />
                                                Reject
                                            </Button>
                                            <Button
                                                size="sm"
                                                className="bg-primary hover:bg-primary/90"
                                                onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
                                            >
                                                <CheckCircle className="w-4 h-4 mr-2" />
                                                Approve
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}
