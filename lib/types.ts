export type PropertyType = 'flat' | 'house' | 'apartment' | 'villa' | 'studio'

export interface Property {
  id: string
  name: string
  location: string
  city: string
  price: number
  bedrooms: number
  bathrooms: number
  area: number
  propertyType: 'flat' | 'house' | 'apartment' | 'villa' | 'studio'
  amenities: string[]
  images: string[]
  owner: Owner
  rating: number
  reviews: number
  isPremium: boolean
  isFeatured: boolean
  availableFrom: string
  description: string
}

export interface Owner {
  id: string
  name: string
  avatar?: string
  image?: string
  phone: string
  email: string
  verified: boolean
}

export interface User {
  id: string
  name: string
  username: string
  email: string
  phone: string
  avatar?: string
  image?: string
  location?: string
  role: 'user' | 'owner'
  activePlan?: 'simple' | 'standard' | 'premium' | 'ultimate'
}

export interface Booking {
  id: string
  propertyId: string
  userId: string
  checkIn: string
  checkOut: string
  phone: string
  isWhatsApp: boolean
  notes: string
  status: 'pending' | 'confirmed' | 'cancelled'
  totalPrice?: number
  createdAt: string
}

export interface SearchFilters {
  location: string
  minBudget: number
  maxBudget: number
  bedrooms: number
  amenities: string[]
}
