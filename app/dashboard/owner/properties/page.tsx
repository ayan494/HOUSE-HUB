"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, Bed, Bath, Square, Plus, Edit, Trash2 } from 'lucide-react'

export default function OwnerPropertiesPage() {
    // Mock property data as requested
    const property = {
        id: '1',
        name: 'Modern Luxury Villa',
        location: 'DHA Phase 6',
        city: 'Lahore',
        price: 150000,
        bedrooms: 4,
        bathrooms: 5,
        area: 500, // sq yards or sq ft, usually sq ft in UI or marla
        type: 'House',
        status: 'Available',
        image: '/placeholder.svg?height=400&width=600',
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">My Properties</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage your listed properties.
                    </p>
                </div>
                <Link href="/dashboard/owner/add">
                    <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Property
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Mock Property Card */}
                <Card className="overflow-hidden group p-0 gap-0">
                    <div className="relative aspect-video bg-muted overflow-hidden">
                        <img
                            src={property.image}
                            alt={property.name}
                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute top-2 right-2">
                            <Badge className="bg-green-500 hover:bg-green-600">
                                {property.status}
                            </Badge>
                        </div>
                    </div>

                    <CardHeader className="p-4 pb-2">
                        <div className="flex justify-between items-start">
                            <CardTitle className="text-lg font-bold text-foreground truncate">
                                {property.name}
                            </CardTitle>
                            <Badge variant="outline">{property.type}</Badge>
                        </div>
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                            <MapPin className="w-3.5 h-3.5" />
                            {property.location}, {property.city}
                        </div>
                    </CardHeader>

                    <CardContent className="p-4 pt-2">
                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                            <div className="flex items-center gap-1.5">
                                <Bed className="w-4 h-4" />
                                <span>{property.bedrooms} Beds</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Bath className="w-4 h-4" />
                                <span>{property.bathrooms} Baths</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Square className="w-4 h-4" />
                                <span>{property.area} Sq Yd</span>
                            </div>
                        </div>

                        <div className="text-xl font-bold text-primary">
                            PKR {property.price.toLocaleString()}
                            <span className="text-sm font-normal text-muted-foreground">/mo</span>
                        </div>
                    </CardContent>

                    <CardFooter className="p-4 pt-0 gap-2">
                        <Button variant="outline" className="flex-1">
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                        </Button>
                        <Button variant="outline" className="flex-1 text-destructive hover:text-destructive hover:bg-destructive/10">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
