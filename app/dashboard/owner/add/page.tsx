"use client"

import React from "react"

import { useState, useEffect, useRef, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowLeft, Upload, Check, X, Building2 } from 'lucide-react'
import Link from 'next/link'
import { cities, amenitiesList } from '@/lib/data'
import { getCurrentUser, saveProperty, getProperties } from '@/lib/store'
import type { Property, PropertyType } from '@/lib/types'

function AddPropertyContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const editId = searchParams.get('edit')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // ... rest of the component state and logic
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [city, setCity] = useState('')
  const [location, setLocation] = useState('')
  const [price, setPrice] = useState('')
  const [bedrooms, setBedrooms] = useState('')
  const [bathrooms, setBathrooms] = useState('')
  const [area, setArea] = useState('')
  const [propertyType, setPropertyType] = useState<any>('apartment')
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [mainImage, setMainImage] = useState<string | null>(null)

  useEffect(() => {
    if (editId) {
      const allProps = getProperties()
      const toEdit = allProps.find(p => p.id === editId)
      if (toEdit) {
        setName(toEdit.name)
        setDescription(toEdit.description)
        setCity(toEdit.city)
        setLocation(toEdit.location)
        setPrice(toEdit.price.toString())
        setBedrooms(toEdit.bedrooms.toString())
        setBathrooms(toEdit.bathrooms.toString())
        setArea(toEdit.area.toString())
        setPropertyType(toEdit.propertyType)
        setSelectedAmenities(toEdit.amenities)
        setMainImage(toEdit.images[0] || null)
      }
    }
  }, [editId])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setMainImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const user = getCurrentUser()
    if (!user) {
      router.push('/auth/login?redirect=/dashboard/owner/add')
      return
    }

    if (!name || !description || !city || !price || !bedrooms || !bathrooms || !area) {
      alert('Please fill in all required fields')
      return
    }

    setIsLoading(true)

    // Simulate delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800))

    const ownerData = {
      id: user.id || user.email,
      name: user.name,
      email: user.email,
      phone: user.phone,
      verified: true,
    }

    const payload: any = {
      id: editId || Math.random().toString(36).substr(2, 9),
      name,
      description,
      city,
      location,
      price: parseInt(price),
      bedrooms: parseInt(bedrooms),
      bathrooms: parseInt(bathrooms),
      area: parseInt(area),
      propertyType: propertyType as any,
      amenities: selectedAmenities,
      images: mainImage ? [mainImage] : [],
      owner: ownerData,
      isPremium: false,
      isFeatured: false,
      availableFrom: new Date().toISOString().split('T')[0],
      rating: 0,
      reviews: 0,
    }

    try {
      saveProperty(payload)
      setIsSuccess(true)
      setTimeout(() => {
        router.push('/dashboard/owner/properties')
      }, 2000)
    } catch (error) {
      console.error('Error saving property:', error)
      alert('Failed to save property. please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto py-12">
        <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden">
          <CardContent className="py-16 text-center">
            <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-8 animate-bounce">
              <Check className="w-10 h-10 text-emerald-600" />
            </div>
            <h3 className="text-3xl font-black text-slate-900 mb-4">{editId ? 'Property Updated!' : 'Property Added!'}</h3>
            <p className="text-slate-500 mb-10 max-w-sm mx-auto font-medium text-lg">
              {editId
                ? 'Your changes have been saved successfully.'
                : 'Your property has been listed. It will be live instantly for our users.'}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/dashboard/owner/properties" className="w-full sm:w-auto">
                <Button className="w-full rounded-2xl px-10 py-7 font-bold text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all">
                  View My Properties
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={() => {
                  setIsSuccess(false)
                  if (!editId) {
                    setName('')
                    setDescription('')
                    setPrice('')
                    setMainImage(null)
                  }
                }}
                className="w-full sm:w-auto rounded-2xl px-10 py-7 font-bold text-lg border-2"
              >
                {editId ? 'Edit Again' : 'Add Another'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <Link href="/dashboard/owner">
            <Button variant="outline" size="icon" className="w-14 h-14 rounded-2xl shadow-sm hover:bg-slate-50 transition-colors border-2">
              <ArrowLeft className="w-6 h-6 text-slate-600" />
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">{editId ? 'Edit Property' : 'List Your Property'}</h1>
            <p className="text-slate-500 mt-1 font-semibold text-lg flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#6699cc]" />
              {editId ? 'Update your property details.' : 'Reach thousands of verified tenants.'}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Basic Info */}
          <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] overflow-hidden p-2">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-black text-slate-900">Essential Details</CardTitle>
              <CardDescription className="text-slate-500 font-medium text-base">Key info about your living space.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-700 font-bold ml-1">Property Title</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Ultra Modern Penthouse with View"
                  className="rounded-2xl h-14 font-medium border-2 focus-visible:ring-[#6699cc] focus-visible:border-[#6699cc]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-slate-700 font-bold ml-1">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell us about the vibes, the views, and the soul of the place..."
                  className="rounded-2xl border-2 font-medium min-h-[160px] p-4 focus-visible:ring-[#6699cc] focus-visible:border-[#6699cc]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-slate-700 font-bold ml-1">City</Label>
                  <Select value={city} onValueChange={setCity} required>
                    <SelectTrigger className="rounded-2xl h-14 border-2 font-medium">
                      <SelectValue placeholder="Select City" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-2">
                      {cities.map(c => (
                        <SelectItem key={c} value={c} className="font-medium">{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="text-slate-700 font-bold ml-1">Area / Sector</Label>
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g., DHA Phase 8"
                    className="rounded-2xl h-14 font-medium border-2 focus-visible:ring-[#6699cc]"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price" className="text-slate-700 font-bold ml-1">Monthly Rent (PKR)</Label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-slate-400">RS.</span>
                  <Input
                    id="price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="e.g., 95,000"
                    className="rounded-2xl h-14 pl-12 font-black text-xl border-2 border-[#6699cc]/20 focus-visible:border-[#6699cc] focus-visible:ring-[#6699cc]"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Details */}
          <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] overflow-hidden p-2">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-black text-slate-900">Specs & Type</CardTitle>
              <CardDescription className="text-slate-500 font-medium text-base">Let's talk numbers and structure.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: 'Type', options: ['apartment', 'flat', 'house', 'villa', 'studio'], value: propertyType, setter: setPropertyType },
                  { label: 'Beds', options: ['1', '2', '3', '4', '5', '6'], value: bedrooms, setter: setBedrooms },
                  { label: 'Baths', options: ['1', '2', '3', '4', '5'], value: bathrooms, setter: setBathrooms }
                ].map((item) => (
                  <div key={item.label} className="space-y-2 lg:col-span-1 col-span-2">
                    <Label className="text-slate-700 font-bold ml-1">{item.label}</Label>
                    <Select value={item.value} onValueChange={item.setter} required>
                      <SelectTrigger className="rounded-2xl h-12 border-2 font-bold capitalize">
                        <SelectValue placeholder="-" />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl border-2">
                        {item.options.map(opt => (
                          <SelectItem key={opt} value={opt} className="font-bold capitalize">{opt}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ))}

                <div className="space-y-2 col-span-2 sm:col-span-1">
                  <Label htmlFor="area" className="text-slate-700 font-bold ml-1">Area (sqft)</Label>
                  <Input
                    id="area"
                    type="number"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder="1200"
                    className="rounded-2xl h-12 font-bold border-2 focus-visible:ring-[#6699cc]"
                    required
                  />
                </div>
              </div>

              {/* Amenities */}
              <div className="space-y-4">
                <Label className="text-slate-700 font-bold text-lg ml-1">Must-Have Amenities</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {amenitiesList.map(amenity => (
                    <div
                      key={amenity}
                      onClick={() => toggleAmenity(amenity)}
                      className={`flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all ${selectedAmenities.includes(amenity)
                        ? 'border-[#6699cc] bg-[#6699cc]/5 shadow-sm'
                        : 'border-slate-100 hover:border-slate-200 bg-slate-50/50'
                        }`}
                    >
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${selectedAmenities.includes(amenity)
                        ? 'bg-[#6699cc] text-white'
                        : 'bg-white border-2 border-slate-200'
                        }`}>
                        {selectedAmenities.includes(amenity) && (
                          <Check className="w-4 h-4" />
                        )}
                      </div>
                      <span className={`text-[13px] font-bold ${selectedAmenities.includes(amenity) ? 'text-[#6699cc]' : 'text-slate-600'}`}>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Photo Card */}
          <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] overflow-hidden p-2">
            <CardHeader>
              <CardTitle className="text-2xl font-black text-slate-900">Cover Photo</CardTitle>
              <CardDescription className="text-slate-500 font-medium font-base">First impressions matter.</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`group relative border-4 border-dashed rounded-[2rem] h-64 flex flex-col items-center justify-center transition-all cursor-pointer overflow-hidden ${mainImage ? 'border-none' : 'border-slate-100 hover:border-[#6699cc]/30 hover:bg-slate-50'
                  }`}
              >
                {mainImage ? (
                  <>
                    <img src={mainImage} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button type="button" variant="secondary" className="rounded-full px-6 font-bold shadow-xl">Change Photo</Button>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        setMainImage(null)
                      }}
                      className="absolute top-4 right-4 bg-white/90 hover:bg-white text-rose-500 rounded-full p-2 shadow-lg"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </>
                ) : (
                  <div className="text-center p-6">
                    <div className="w-20 h-20 rounded-3xl bg-slate-50 flex items-center justify-center mx-auto mb-4 border border-slate-100 group-hover:bg-white group-hover:scale-110 transition-transform">
                      <Upload className="w-8 h-8 text-slate-400 group-hover:text-[#6699cc]" />
                    </div>
                    <p className="text-slate-900 font-black text-lg">Click to Upload</p>
                    <p className="text-slate-500 font-bold text-sm mt-1">Main property picture</p>
                  </div>
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleImageChange}
                accept="image/*"
              />
              <p className="mt-4 text-xs text-slate-400 text-center font-bold">Recommended: 1200x800px or larger</p>
            </CardContent>
          </Card>

          {/* Submit Card */}
          <Card className="border-none shadow-2xl bg-[#6699cc] text-white rounded-[2.5rem] overflow-hidden p-2 sticky top-8">
            <CardHeader className="text-center">
              <Building2 className="w-12 h-12 text-white/50 mx-auto mb-2" />
              <CardTitle className="text-3xl font-black">{editId ? 'Update Listing' : 'Go Live Now'}</CardTitle>
              <CardDescription className="text-white/70 font-bold text-base">
                {editId ? 'Apply your changes immediately.' : 'Make your property discoverable today.'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                type="submit"
                className="w-full h-16 rounded-2xl bg-white text-[#6699cc] hover:bg-slate-50 font-black text-xl shadow-2xl hover:scale-[1.02] transition-all disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : (editId ? 'Save Changes' : 'Confirm Listing')}
              </Button>
              <p className="text-[10px] text-center font-bold text-white/50 uppercase tracking-widest px-4">
                By listing, you agree to our verified owner terms and housing policies.
              </p>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  )
}

export default function AddPropertyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Loading form...</div>
      </div>
    }>
      <AddPropertyContent />
    </Suspense>
  )
}
