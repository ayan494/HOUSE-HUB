"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, Bed, Bath, Square, Plus, Edit, Trash2, Crown, Home } from 'lucide-react'
import { getOwnerProperties, deleteProperty } from '@/lib/data'
import { getCurrentUser } from '@/lib/store'
import type { Property } from '@/lib/types'
import Swal from 'sweetalert2'

export default function OwnerPropertiesPage() {
    const router = useRouter()
    const [myProperties, setMyProperties] = useState<Property[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const user = getCurrentUser()
        if (user && user.role === 'owner') {
            const props = getOwnerProperties(user.email)
            setMyProperties(props)
        }
        setIsLoading(false)
    }, [])

    const handleDelete = async (id: string, name: string) => {
        const result = await Swal.fire({
            title: 'Delete Property?',
            text: `Are you sure you want to delete "${name}"? This action cannot be undone.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#64748b',
            confirmButtonText: 'Yes, Delete it!',
            background: '#ffffff',
            borderRadius: '20px',
        })

        if (result.isConfirmed) {
            deleteProperty(id)
            setMyProperties(prev => prev.filter(p => p.id !== id))
            Swal.fire({
                title: 'Deleted!',
                text: 'Your property has been removed.',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false,
                borderRadius: '20px',
            })
        }
    }

    if (isLoading) {
        return <div className="min-h-[400px] flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
    }

    return (
        <div className="max-w-7xl mx-auto space-y-10 pb-12 px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">My Properties</h1>
                    <p className="text-slate-500 mt-1 font-semibold text-lg flex items-center gap-2">
                        <Home className="w-5 h-5 text-primary" />
                        Manage your {myProperties.length} active listings
                    </p>
                </div>
                <Link href="/dashboard/owner/add">
                    <Button className="rounded-2xl px-8 py-6 font-bold text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all">
                        <Plus className="w-5 h-5 mr-2" />
                        Add New Property
                    </Button>
                </Link>
            </div>

            {myProperties.length === 0 ? (
                <Card className="border-4 border-dashed border-slate-100 p-20 text-center rounded-[3rem]">
                    <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Home className="w-12 h-12 text-slate-300" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">No properties yet</h3>
                    <p className="text-slate-500 mb-8 max-w-sm mx-auto">Start by adding your first property to find the perfect tenants.</p>
                    <Link href="/dashboard/owner/add">
                        <Button variant="outline" className="rounded-2xl px-8 py-6 border-2 font-bold transition-all">
                            Add Your First Listing
                        </Button>
                    </Link>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {myProperties.map((property) => (
                        <Card key={property.id} className="overflow-hidden group p-0 border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 rounded-[2.5rem]">
                            <div className="relative aspect-video bg-muted overflow-hidden">
                                <img
                                    src={property.images[0] || '/placeholder.svg'}
                                    alt={property.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute top-4 right-4 flex gap-2">
                                    <Badge className="bg-white/90 backdrop-blur-md text-slate-900 border-none px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">
                                        {property.propertyType.toUpperCase()}
                                    </Badge>
                                    {property.isPremium && (
                                        <Badge className="bg-primary/90 backdrop-blur-md text-white border-none px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">
                                            <Crown className="w-3.5 h-3.5 mr-1" />
                                            PREMIUM
                                        </Badge>
                                    )}
                                </div>
                            </div>

                            <CardHeader className="p-6 pb-2">
                                <div className="flex justify-between items-start gap-4">
                                    <CardTitle className="text-xl font-black text-slate-900 truncate tracking-tight">
                                        {property.name}
                                    </CardTitle>
                                </div>
                                <div className="flex items-center gap-1.5 text-slate-500 font-bold text-sm">
                                    <MapPin className="w-4 h-4 text-primary" />
                                    {property.location}, {property.city}
                                </div>
                            </CardHeader>

                            <CardContent className="p-6 pt-4">
                                <div className="flex items-center justify-between text-slate-600 font-bold text-xs uppercase tracking-widest mb-6 py-4 border-y border-slate-50">
                                    <div className="flex flex-col items-center gap-1">
                                        <span className="text-slate-900 text-sm">{property.bedrooms}</span>
                                        <span>Beds</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-1 border-x border-slate-100 flex-1">
                                        <span className="text-slate-900 text-sm">{property.bathrooms}</span>
                                        <span>Baths</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-1">
                                        <span className="text-slate-900 text-sm">{property.area}</span>
                                        <span>Sqft</span>
                                    </div>
                                </div>

                                <div className="text-2xl font-black text-primary flex items-baseline gap-1">
                                    RS. {property.price.toLocaleString()}
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">/ month</span>
                                </div>
                            </CardContent>

                            <CardFooter className="p-6 pt-0 gap-3">
                                <Button
                                    variant="outline"
                                    className="flex-1 rounded-2xl h-12 border-2 font-bold hover:bg-slate-50 transition-all"
                                    onClick={() => router.push(`/dashboard/owner/add?edit=${property.id}`)}
                                >
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit
                                </Button>
                                <Button
                                    variant="outline"
                                    className="flex-1 rounded-2xl h-12 border-2 border-rose-100 text-rose-500 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200 font-bold transition-all"
                                    onClick={() => handleDelete(property.id, property.name)}
                                >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
