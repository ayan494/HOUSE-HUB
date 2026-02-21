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
import { CalendarIcon, CheckCircle, MapPin, User, Phone, Star, X, ShieldAlert, CreditCard, MessageSquare } from 'lucide-react'
import { format } from 'date-fns'
import { Checkbox } from '@/components/ui/checkbox'
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
  const [step, setStep] = useState<'form' | 'success' | 'plan-required'>('form')
  const [checkIn, setCheckIn] = useState<Date>()
  const [checkOut, setCheckOut] = useState<Date>()
  const [phone, setPhone] = useState('')
  const [isWhatsApp, setIsWhatsApp] = useState(false)
  const [notes, setNotes] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showReviewDialog, setShowReviewDialog] = useState(false)

  useEffect(() => {
    if (isOpen) {
      const currentUser = getCurrentUser()
      setUser(currentUser)
      if (!currentUser) {
        onClose()
        router.push(`/auth/register?role=user&redirect=/property/${property?.id}`)
      } else if (!currentUser.activePlan) {
        setStep('plan-required')
      }
    }
  }, [isOpen, property, router, onClose])

  useEffect(() => {
    if (!isOpen) {
      // Reset state when modal closes
      setStep('form')
      setCheckIn(undefined)
      setCheckOut(undefined)
      setPhone('')
      setIsWhatsApp(false)
      setNotes('')
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!property || !user || !checkIn || !checkOut || !phone) return

    if (!user.activePlan) {
      setStep('plan-required')
      return
    }

    setIsLoading(true)

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    addBooking({
      propertyId: property.id,
      userId: user.id,
      checkIn: checkIn.toISOString(),
      checkOut: checkOut.toISOString(),
      phone,
      isWhatsApp,
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
      <DialogContent className="w-[95%] sm:max-w-[500px] max-h-[90vh] overflow-y-auto p-0 mx-auto rounded-2xl md:rounded-3xl border-none shadow-2xl animate-in fade-in zoom-in duration-300">
        {step === 'form' ? (
          <>
            {/* Property Preview */}
            <div className="relative h-32 sm:h-40 bg-muted flex-shrink-0">
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

            <div className="p-4 sm:p-6 pb-28">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Check-in Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal border-primary/20",
                            !checkIn && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
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
                            "w-full justify-start text-left font-normal border-primary/20",
                            !checkOut && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
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

                {/* Phone & WhatsApp */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number (Required)</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+92 3XX XXXXXXX"
                        className="pl-10 h-12 rounded-xl border-primary/20 focus-visible:ring-primary"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 p-4 bg-primary/5 rounded-xl border border-primary/10">
                    <Checkbox
                      id="whatsapp"
                      checked={isWhatsApp}
                      onCheckedChange={(checked) => setIsWhatsApp(checked as boolean)}
                    />
                    <label
                      htmlFor="whatsapp"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2 cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4 text-[#25D366]" />
                      Allow contact via WhatsApp?
                    </label>
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-2">
                  <Label htmlFor="notes" className="flex items-center gap-2">
                    Additional Notes <span className="text-xs text-muted-foreground font-normal">(Explain your requirements)</span>
                  </Label>
                  <Textarea
                    id="notes"
                    placeholder="Tell us more about your stay or special requests..."
                    className="rounded-xl border-primary/20 focus-visible:ring-primary min-h-[80px]"
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
                <div className="flex items-center gap-3 p-3 border border-primary/20 bg-primary/5 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{property.owner.name}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Phone className="w-3 h-3 text-primary" />
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
                  className="w-full h-14 rounded-2xl text-lg font-bold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all hover:-translate-y-1 active:translate-y-0"
                  disabled={!checkIn || !checkOut || !phone || isLoading}
                >
                  {isLoading ? 'Processing...' : 'Confirm Booking'}
                </Button>
              </form>
            </div>
          </>
        ) : step === 'success' ? (
          /* Success State */
          <div className="p-8 text-center relative">
            <button
              onClick={onClose}
              className="absolute top-0 right-0 p-2 rounded-full text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
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
        ) : (
          /* Plan Required State */
          <div className="p-8 text-center relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-6">
              <ShieldAlert className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">Subscription Required</h3>
            <p className="text-muted-foreground mb-8">
              You need an active subscription plan to book properties. Join our premium community today!
            </p>
            <div className="space-y-4">
              <Button
                onClick={() => {
                  onClose()
                  router.push(`/plans?redirect=/property/${property.id}`)
                }}
                className="w-full h-12 bg-primary hover:bg-primary/90 flex items-center justify-center gap-2 font-bold"
              >
                <CreditCard className="w-5 h-5" />
                View Subscription Plans
              </Button>
              <Button
                variant="ghost"
                className="w-full"
                onClick={onClose}
              >
                Maybe Later
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
