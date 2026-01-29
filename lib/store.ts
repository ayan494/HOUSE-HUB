"use client"

import type { User, Booking } from './types'

const STORAGE_KEYS = {
  USER: 'househub_user',
  BOOKINGS: 'househub_bookings',
}

// User management
export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null
  const stored = localStorage.getItem(STORAGE_KEYS.USER)
  return stored ? JSON.parse(stored) : null
}

export function setCurrentUser(user: User | null): void {
  if (typeof window === 'undefined') return
  if (user) {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user))
  } else {
    localStorage.removeItem(STORAGE_KEYS.USER)
  }
}

export function loginUser(email: string, password: string, role: 'user' | 'owner' = 'user'): User {
  // MVP: Simple mock login
  const user: User = {
    id: crypto.randomUUID(),
    name: email.split('@')[0],
    email,
    phone: '+92 300 0000000',
    role,
  }
  setCurrentUser(user)
  return user
}

export function registerUser(name: string, email: string, phone: string, role: 'user' | 'owner'): User {
  const user: User = {
    id: crypto.randomUUID(),
    name,
    email,
    phone,
    role,
  }
  setCurrentUser(user)
  return user
}

export function logoutUser(): void {
  setCurrentUser(null)
}

// Bookings management
export function getBookings(): Booking[] {
  if (typeof window === 'undefined') return []
  const stored = localStorage.getItem(STORAGE_KEYS.BOOKINGS)
  return stored ? JSON.parse(stored) : []
}

export function addBooking(booking: Omit<Booking, 'id' | 'createdAt'>): Booking {
  const newBooking: Booking = {
    ...booking,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  }
  const bookings = getBookings()
  bookings.push(newBooking)
  localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings))
  return newBooking
}

export function updateBookingStatus(bookingId: string, status: Booking['status']): void {
  const bookings = getBookings()
  const index = bookings.findIndex(b => b.id === bookingId)
  if (index !== -1) {
    bookings[index].status = status
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings))
  }
}

export function getUserBookings(userId: string): Booking[] {
  return getBookings().filter(b => b.userId === userId)
}

export function getPropertyBookings(propertyId: string): Booking[] {
  return getBookings().filter(b => b.propertyId === propertyId)
}
