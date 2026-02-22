"use client"

import type { User, Booking, Property } from './types'
import { getUserByEmail } from './email-validator'

const STORAGE_KEYS = {
  USER: 'househub_user',
  BOOKINGS: 'househub_bookings',
  RECENTLY_VIEWED: 'househub_recently_viewed',
  PROPERTIES: 'househub_properties',
  REVIEWS: 'househub_reviews',
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

export function loginUser(email: string, password: string): User {
  // Check if user is registered
  const registeredUser = getUserByEmail(email)

  if (!registeredUser) {
    throw new Error('No account found with this email. Please register first.')
  }

  const user: User = {
    id: registeredUser.email,
    name: registeredUser.name,
    username: registeredUser.username,
    email: registeredUser.email,
    phone: registeredUser.phone,
    role: registeredUser.role,
    activePlan: undefined,
  }

  // Check if we have an active plan stored for this user
  const stored = localStorage.getItem(`househub_plan_${email}`)
  if (stored) {
    user.activePlan = stored as any
  }

  setCurrentUser(user)
  return user
}

export function registerUser(name: string, email: string, username: string, phone: string, role: 'user' | 'owner'): User {
  const user: User = {
    id: email,
    name,
    username,
    email,
    phone,
    role,
  }
  // In a real app, registration doesn't login automatically if we want strict flow
  // but for this MVP we'll allow it if needed, or follow the USER's strict flow.
  // The user requested: Register -> Login
  return user
}

export function updateUserPlan(email: string, plan: User['activePlan']): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(`househub_plan_${email}`, plan || '')

  const currentUser = getCurrentUser()
  if (currentUser && currentUser.email === email) {
    currentUser.activePlan = plan
    setCurrentUser(currentUser)
  }
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

export function updateUser(userId: string, data: Partial<User>): User | null {
  const currentUser = getCurrentUser()
  if (!currentUser) return null

  if (currentUser.id === userId) {
    const updatedUser = { ...currentUser, ...data }
    setCurrentUser(updatedUser)
    return updatedUser
  }

  return null
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

// Recently Viewed management
export function getRecentlyViewed(): Property[] {
  if (typeof window === 'undefined') return []
  const stored = localStorage.getItem(STORAGE_KEYS.RECENTLY_VIEWED)
  return stored ? JSON.parse(stored) : []
}

export function addToRecentlyViewed(property: Property): void {
  if (typeof window === 'undefined') return
  const viewed = getRecentlyViewed()
  // Remove if already exists to move to top
  const filtered = viewed.filter(p => p.id !== property.id)
  // Add to beginning
  const updated = [property, ...filtered].slice(0, 12) // Keep last 12
  localStorage.setItem(STORAGE_KEYS.RECENTLY_VIEWED, JSON.stringify(updated))
}
// Property management
export function getProperties(): Property[] {
  if (typeof window === 'undefined') return []
  const stored = localStorage.getItem(STORAGE_KEYS.PROPERTIES)
  return stored ? JSON.parse(stored) : []
}

export function saveProperty(property: Property): void {
  if (typeof window === 'undefined') return
  const properties = getProperties()
  const index = properties.findIndex(p => p.id === property.id)

  if (index !== -1) {
    properties[index] = property
  } else {
    properties.push(property)
  }

  localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(properties))
}

export function deleteProperty(id: string): void {
  if (typeof window === 'undefined') return
  const properties = getProperties()
  const updated = properties.filter(p => p.id !== id)
  localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(updated))
}

import { properties as staticProperties } from './data'

export function getPropertiesById(id: string): Property | undefined {
  const properties = getProperties()
  const found = properties.find(p => p.id === id)
  if (found) return found
  return staticProperties.find(p => p.id === id)
}

export function getOwnerProperties(email: string): Property[] {
  const properties = getProperties()
  return properties.filter(p => p.owner.email === email)
}

// Review management
export function getReviews(): any[] {
  if (typeof window === 'undefined') return []
  const stored = localStorage.getItem(STORAGE_KEYS.REVIEWS)
  return stored ? JSON.parse(stored) : []
}

export function saveReview(review: any): void {
  if (typeof window === 'undefined') return
  const reviews = getReviews()
  const newReview = {
    ...review,
    _id: Math.random().toString(36).substr(2, 9),
    date: new Date().toISOString()
  }
  reviews.push(newReview)
  localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews))
}
