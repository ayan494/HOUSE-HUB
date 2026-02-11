"use client"

import React from "react"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CalendarIcon, CheckCircle, MapPin, User, Phone, Star } from 'lucide-react'
import { format } from 'date-fns'
import { getCurrentUser, addBooking } from '@/lib/store'
import type { Property, User as UserType } from '@/lib/types'
import { cn } from '@/lib/utils'
import { ReviewDialog } from '@/components/review-dialog'

interface BookingModalProps {
  property: Property | null
  isOpen: boolean
  onClose: () => void
}

export function BookingModal({ property, isOpen, onClose }: BookingModalProps) {
  const router = useRouter()
  const [user, setUser] = useState<UserType | null>(null)
  const [step, setStep] = useState<'form' | 'success'>('form')
  const [checkIn, setCheckIn] = useState<Date>()
  const [checkOut, setCheckOut] = useState<Date>()
  const [notes, setNotes] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showReviewDialog, setShowReviewDialog] = useState(false)

  useEffect(() => {
    if (isOpen) {
      const currentUser = getCurrentUser()
      setUser(currentUser)
      if (!currentUser) {
        onClose()
        router.push(`/auth/login?redirect=/property/${property?.id}`)
      }
    }
  }, [isOpen, property, router, onClose])

  useEffect(() => {
    if (!isOpen) {
      // Reset state when modal closes
      setStep('form')
      setCheckIn(undefined)
      setCheckOut(undefined)
      setNotes('')
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!property || !user || !checkIn || !checkOut) return

    setIsLoading(true)

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    addBooking({
      propertyId: property.id,
      userId: user.id,
      checkIn: checkIn.toISOString(),
      checkOut: checkOut.toISOString(),
      notes,
      status: 'pending',
    })

    setIsLoading(false)
    setStep('success')
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      maximumFractionDigits: 0,
    }).format(price)
  }

  if (!property) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
        {step === 'form' ? (
          <>
            {/* Property Preview */}
            <div className="relative h-40 bg-muted">
              <Image
                src={property.images[0] || "/placeholder.svg"}
                alt={property.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="font-semibold text-lg">{property.name}</h3>
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <MapPin className="w-4 h-4" />
                  {property.location}, {property.city}
                </div>
              </div>
            </div>

            <div className="p-6">
              <DialogHeader className="mb-4">
                <DialogTitle>Book This Property</DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* User Info (readonly) */}
                {user && (
                  <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                )}

                {/* Date Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Check-in Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !checkIn && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {checkIn ? format(checkIn, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={checkIn}
                          onSelect={setCheckIn}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>Check-out Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !checkOut && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {checkOut ? format(checkOut, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={checkOut}
                          onSelect={setCheckOut}
                          disabled={(date) => date < (checkIn || new Date())}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-2">
                  <Label>Additional Notes (Optional)</Label>
                  <Textarea
                    placeholder="Any special requirements or questions..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                  />
                </div>

                {/* Price Summary */}
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Monthly Rent</span>
                    <span className="font-semibold text-lg text-primary">
                      {formatPrice(property.price)}
                    </span>
                  </div>
                </div>

                {/* Owner Contact */}
                <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                    <User className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{property.owner.name}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Phone className="w-3 h-3" />
                      {property.owner.phone}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    {property.rating}
                  </div>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  className="w-full h-12"
                  disabled={!checkIn || !checkOut || isLoading}
                >
                  {isLoading ? 'Processing...' : 'Confirm Booking'}
                </Button>
              </form>
            </div>
          </>
        ) : (
          /* Success State */
          <div className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">Booking Submitted!</h3>
            <p className="text-muted-foreground mb-6">
              Your booking request has been sent to the property owner.
              They will contact you shortly to confirm.
            </p>
            <div className="space-y-3">
              <Button onClick={() => {
                setShowReviewDialog(true)
              }} className="w-full">
                Close
              </Button>
              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={() => router.push('/dashboard/user')}
              >
                View My Bookings
              </Button>
            </div>
          </div>
        )}
      </DialogContent>

      {/* Review Dialog */}
      <ReviewDialog
        open={showReviewDialog}
        onOpenChange={(open) => {
          setShowReviewDialog(open)
          if (!open) {
            onClose() // Close booking modal when review dialog closes
          }
        }}
      />
    </Dialog>
  )
}
