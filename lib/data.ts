import type { Property, Owner } from './types'

const owners: Owner[] = [
  {
    id: '1',
    name: 'Ahmed Khan',
    phone: '+92 300 1234567',
    email: 'ahmed@example.com',
    verified: true,
  },
  {
    id: '2',
    name: 'Sara Ali',
    phone: '+92 321 7654321',
    email: 'sara@example.com',
    verified: true,
  },
  {
    id: '3',
    name: 'Usman Malik',
    phone: '+92 333 9876543',
    email: 'usman@example.com',
    verified: false,
  },
  {
    id: '4',
    name: 'Fatima Zahra',
    phone: '+92 345 1122334',
    email: 'fatima@example.com',
    verified: true,
  },
]

export const properties: Property[] = [
  {
    id: '1',
    name: 'Luxury Villa in DHA',
    location: 'DHA Phase 6',
    city: 'Lahore',
    price: 150000,
    bedrooms: 5,
    bathrooms: 4,
    area: 1200,
    propertyType: 'villa',
    amenities: ['Parking', 'Garden', 'Security', 'AC', 'Furnished'],
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
    ],
    owner: owners[0],
    rating: 4.8,
    reviews: 24,
    isPremium: true,
    isFeatured: true,
    availableFrom: '2026-02-01',
    description: 'Beautiful luxury villa with modern amenities, spacious rooms, and a stunning garden. Perfect for families looking for comfort and style.',
  },
  {
    id: '2',
    name: 'Modern Apartment in Gulberg',
    location: 'Gulberg III',
    city: 'Lahore',
    price: 75000,
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    propertyType: 'apartment',
    amenities: ['Parking', 'Lift', 'Security', 'AC'],
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
    ],
    owner: owners[1],
    rating: 4.5,
    reviews: 18,
    isPremium: false,
    isFeatured: true,
    availableFrom: '2026-02-15',
    description: 'Contemporary apartment in the heart of Gulberg with easy access to shopping centers and restaurants.',
  },
  {
    id: '3',
    name: 'Cozy House in F-7',
    location: 'F-7/2',
    city: 'Islamabad',
    price: 120000,
    bedrooms: 4,
    bathrooms: 3,
    area: 2500,
    propertyType: 'house',
    amenities: ['Parking', 'Garden', 'Security', 'AC', 'Servant Quarter'],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
    ],
    owner: owners[2],
    rating: 4.6,
    reviews: 12,
    isPremium: true,
    isFeatured: false,
    availableFrom: '2026-01-25',
    description: 'Charming house in the prestigious F-7 sector with beautiful garden and excellent security.',
  },
  {
    id: '4',
    name: 'Budget Flat in North Nazimabad',
    location: 'Block H, North Nazimabad',
    city: 'Karachi',
    price: 35000,
    bedrooms: 2,
    bathrooms: 1,
    area: 900,
    propertyType: 'flat',
    amenities: ['Parking', 'Security'],
    images: [
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
    ],
    owner: owners[3],
    rating: 4.2,
    reviews: 8,
    isPremium: false,
    isFeatured: false,
    availableFrom: '2026-02-01',
    description: 'Affordable flat perfect for small families or bachelor individuals. Close to public transport.',
  },
  {
    id: '5',
    name: 'Penthouse in Clifton',
    location: 'Block 4, Clifton',
    city: 'Karachi',
    price: 250000,
    bedrooms: 4,
    bathrooms: 4,
    area: 3500,
    propertyType: 'apartment',
    amenities: ['Parking', 'Rooftop', 'Security', 'AC', 'Furnished', 'Sea View'],
    images: [
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800',
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800',
    ],
    owner: owners[0],
    rating: 4.9,
    reviews: 32,
    isPremium: true,
    isFeatured: true,
    availableFrom: '2026-03-01',
    description: 'Stunning penthouse with breathtaking sea views. Premium finishes throughout with private rooftop terrace.',
  },
  {
    id: '6',
    name: 'Family Home in Bahria Town',
    location: 'Safari Villas, Bahria Town',
    city: 'Rawalpindi',
    price: 95000,
    bedrooms: 5,
    bathrooms: 3,
    area: 2800,
    propertyType: 'house',
    amenities: ['Parking', 'Garden', 'Security', 'AC', 'Community Pool'],
    images: [
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
    ],
    owner: owners[1],
    rating: 4.7,
    reviews: 21,
    isPremium: false,
    isFeatured: true,
    availableFrom: '2026-02-10',
    description: 'Spacious family home in gated community with access to parks, mosque, and community amenities.',
  },
  {
    id: '7',
    name: 'Studio Apartment in E-11',
    location: 'E-11/4',
    city: 'Islamabad',
    price: 45000,
    bedrooms: 1,
    bathrooms: 1,
    area: 600,
    propertyType: 'studio',
    amenities: ['Parking', 'Lift', 'Security', 'AC'],
    images: [
      'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800',
      'https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800',
    ],
    owner: owners[2],
    rating: 4.3,
    reviews: 15,
    isPremium: false,
    isFeatured: false,
    availableFrom: '2026-01-20',
    description: 'Modern studio apartment ideal for professionals. Walking distance to restaurants and shops.',
  },
  {
    id: '8',
    name: 'Executive House in Model Town',
    location: 'Model Town Extension',
    city: 'Lahore',
    price: 180000,
    bedrooms: 6,
    bathrooms: 5,
    area: 4000,
    propertyType: 'house',
    amenities: ['Parking', 'Garden', 'Security', 'AC', 'Furnished', 'Home Office'],
    images: [
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800',
    ],
    owner: owners[3],
    rating: 4.8,
    reviews: 28,
    isPremium: true,
    isFeatured: true,
    availableFrom: '2026-02-20',
    description: 'Executive level house perfect for diplomats or corporate executives. Fully furnished with dedicated home office.',
  },
]

export const cities = ['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Peshawar']

export const amenitiesList = [
  'Parking',
  'Garden',
  'Security',
  'AC',
  'Furnished',
  'Lift',
  'Servant Quarter',
  'Rooftop',
  'Sea View',
  'Community Pool',
  'Home Office',
]

export function getPropertyById(id: string): Property | undefined {
  return properties.find(p => p.id === id)
}

export function getFeaturedProperties(): Property[] {
  return properties.filter(p => p.isFeatured)
}

export function getPremiumProperties(): Property[] {
  return properties.filter(p => p.isPremium)
}

export function filterProperties(filters: {
  city?: string
  minPrice?: number
  maxPrice?: number
  bedrooms?: number
  amenities?: string[]
}): Property[] {
  return properties.filter(property => {
    if (filters.city && property.city !== filters.city) return false
    if (filters.minPrice && property.price < filters.minPrice) return false
    if (filters.maxPrice && property.price > filters.maxPrice) return false
    if (filters.bedrooms && property.bedrooms < filters.bedrooms) return false
    if (filters.amenities && filters.amenities.length > 0) {
      const hasAllAmenities = filters.amenities.every(a => property.amenities.includes(a))
      if (!hasAllAmenities) return false
    }
    return true
  })
}

// --- LocalStorage helpers to persist properties on the client ---
const PROPERTIES_STORAGE_KEY = 'househub_properties'

export function getSavedProperties(): Property[] {
  if (typeof window === 'undefined') return properties
  const raw = localStorage.getItem(PROPERTIES_STORAGE_KEY)
  if (!raw) return properties
  try {
    const parsed = JSON.parse(raw) as Property[]
    return parsed
  } catch {
    return properties
  }
}

export function saveProperties(list: Property[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(PROPERTIES_STORAGE_KEY, JSON.stringify(list))
}

// Seed storage on client first load
if (typeof window !== 'undefined') {
  if (!localStorage.getItem(PROPERTIES_STORAGE_KEY)) {
    try {
      localStorage.setItem(PROPERTIES_STORAGE_KEY, JSON.stringify(properties))
    } catch (e) {
      // ignore storage errors
    }
  }
}
