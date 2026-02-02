"use client"

import React, { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { MapPin, DollarSign, Bed, Search, X } from 'lucide-react'
import type { Property } from '@/lib/types'

interface PropertySearchProps {
  properties: Property[]
  onPropertyClick?: (property: Property) => void
  onBookClick?: (property: Property) => void
}

export function PropertySearch({ 
  properties, 
  onPropertyClick,
  onBookClick 
}: PropertySearchProps) {
  const [location, setLocation] = useState('')
  const [maxBudget, setMaxBudget] = useState('')
  const [bedrooms, setBedrooms] = useState('')
  const [propertyType, setPropertyType] = useState('')
  const [hasSearched, setHasSearched] = useState(false)

  // Filter properties based on search criteria
  const filteredProperties = useMemo(() => {
    if (!hasSearched) return []

    return properties.filter((property) => {
      // Location filter (case-insensitive)
      const locationMatch =
        !location ||
        property.location.toLowerCase().includes(location.toLowerCase()) ||
        property.city.toLowerCase().includes(location.toLowerCase())

      // Budget filter
      const budgetMatch = !maxBudget || property.price <= parseInt(maxBudget)

      // Bedrooms filter
      const bedroomsMatch = !bedrooms || property.bedrooms === parseInt(bedrooms)

      // Property Type filter
      const propertyTypeMatch = !propertyType || property.propertyType === propertyType

      return locationMatch && budgetMatch && bedroomsMatch && propertyTypeMatch
    })
  }, [properties, location, maxBudget, bedrooms, propertyType, hasSearched])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setHasSearched(true)
  }

  const handleReset = () => {
    setLocation('')
    setMaxBudget('')
    setBedrooms('')
    setPropertyType('')
    setHasSearched(false)
  }

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      {/* Search Bar Section */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Find Your Perfect Home</h1>
          
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Location Input */}
              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-medium">
                  Location
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="location"
                    type="text"
                    placeholder="e.g., DHA, Karachi"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Budget Input */}
              <div className="space-y-2">
                <Label htmlFor="budget" className="text-sm font-medium">
                  Max Budget (PKR)
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="budget"
                    type="number"
                    placeholder="e.g., 23500"
                    value={maxBudget}
                    onChange={(e) => setMaxBudget(e.target.value)}
                    className="pl-10"
                    min="0"
                  />
                </div>
              </div>

              {/* Bedrooms Input */}
              <div className="space-y-2">
                <Label htmlFor="bedrooms" className="text-sm font-medium">
                  Bedrooms
                </Label>
                <div className="relative">
                  <Bed className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="bedrooms"
                    type="number"
                    placeholder="e.g., 2"
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value)}
                    className="pl-10"
                    min="0"
                    max="10"
                  />
                </div>
              </div>

              {/* Property Type Dropdown */}
              <div className="space-y-2">
                <Label htmlFor="propertyType" className="text-sm font-medium">
                  Property Type
                </Label>
                <select
                  id="propertyType"
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Sab Types</option>
                  <option value="flat">🏢 Flat</option>
                  <option value="house">🏠 House</option>
                  <option value="apartment">🏗️ Apartment</option>
                  <option value="villa">✨ Villa</option>
                  <option value="studio">🎯 Studio</option>
                </select>
              </div>

              {/* Search Button */}
              <div className="flex items-end gap-2">
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleReset}
                  className="px-3"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Results Section */}
      <div className="container mx-auto px-4 py-12">
        {!hasSearched ? (
          <div className="text-center py-16">
            <p className="text-lg text-gray-500">
              Enter your search criteria above to find properties
            </p>
          </div>
        ) : filteredProperties.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg text-gray-500 mb-2">
              No properties found matching your criteria
            </p>
            <p className="text-sm text-gray-400">
              Try adjusting your search filters
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Results: {filteredProperties.length} properties found
              </h2>
            </div>

            {/* Properties Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <Card
                  key={property.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer flex flex-col h-full rounded-lg"
                  onClick={() => onPropertyClick?.(property)}
                >
                  {/* Property Image */}
                  <div className="relative h-48 bg-gray-200 overflow-hidden p-0 m-0">
                    {property.images?.[0] ? (
                      <img
                        src={property.images[0]}
                        alt={property.name}
                        className="w-full h-full object-cover object-center block rounded-t-lg hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-300">
                        <span className="text-gray-500">No image</span>
                      </div>
                    )}
                  {property.isPremium && (
                      <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded-full text-xs sm:text-sm font-semibold">
                        Premium
                      </div>
                    )}
                    {property.propertyType && (
                      <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-0.5 rounded-full text-xs sm:text-sm font-semibold capitalize">
                        {property.propertyType}
                      </div>
                    )}
                  </div>

                  <CardContent className="p-4 flex-1 flex flex-col">
                    {/* Title and Location */}
                    <h3 className="font-semibold text-gray-900 text-lg mb-1">
                      {property.name}
                    </h3>
                    <p className="text-sm text-gray-600 flex items-center gap-1 mb-3">
                      <MapPin className="w-4 h-4" />
                      {property.location}, {property.city}
                    </p>

                    {/* Price */}
                    <div className="bg-blue-50 rounded-lg p-3 mb-4">
                      <p className="text-2xl font-bold text-blue-600">
                        PKR {property.price.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-600">per month</p>
                    </div>

                    {/* Property Details */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="bg-gray-100 rounded-lg p-2 text-center">
                        <p className="text-lg font-semibold text-gray-900">
                          {property.bedrooms}
                        </p>
                        <p className="text-xs text-gray-600">Bedrooms</p>
                      </div>
                      <div className="bg-gray-100 rounded-lg p-2 text-center">
                        <p className="text-lg font-semibold text-gray-900">
                          {property.bathrooms}
                        </p>
                        <p className="text-xs text-gray-600">Bathrooms</p>
                      </div>
                      <div className="bg-gray-100 rounded-lg p-2 text-center">
                        <p className="text-lg font-semibold text-gray-900">
                          {property.area}
                        </p>
                        <p className="text-xs text-gray-600">Sq.ft</p>
                      </div>
                    </div>

                    {/* Amenities */}
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-gray-700 mb-2">Amenities:</p>
                      <div className="flex flex-wrap gap-1">
                        {property.amenities.slice(0, 3).map((amenity, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-gray-200 text-gray-800 px-2 py-1 rounded"
                          >
                            {amenity}
                          </span>
                        ))}
                        {property.amenities.length > 3 && (
                          <span className="text-xs text-gray-600 px-2 py-1">
                            +{property.amenities.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-semibold text-gray-900">
                          {property.rating}
                        </span>
                        <span className="text-yellow-400">⭐</span>
                        <span className="text-xs text-gray-600">
                          ({property.reviews} reviews)
                        </span>
                      </div>
                    </div>

                    {/* Book Button */}
                    <Button
                      onClick={(e) => {
                        e.stopPropagation()
                        onBookClick?.(property)
                      }}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-auto"
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
