"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Clock, ArrowRight, Eye } from 'lucide-react'
import { getRecentlyViewed } from '@/lib/store'
import type { Property } from '@/lib/types'
import Link from 'next/link'
import { PropertyCard } from '@/components/property-card'

export default function HistoryPage() {
    const [recentlyViewed, setRecentlyViewed] = useState<Property[]>([])

    useEffect(() => {
        setRecentlyViewed(getRecentlyViewed())
    }, [])

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Booking History</h1>
                <p className="text-slate-500 mt-1 font-medium">
                    Manage your booking history and recently viewed properties.
                </p>
            </div>

            <section className="space-y-6">
                <div className="flex items-center gap-2">
                    <Clock className="w-6 h-6 text-primary" />
                    <h2 className="text-xl font-bold text-slate-900">Recently Viewed</h2>
                </div>

                {recentlyViewed.length === 0 ? (
                    <Card className="bg-white border-slate-200 shadow-sm rounded-[2rem] overflow-hidden">
                        <CardContent className="py-20 text-center">
                            <div className="w-24 h-24 mx-auto bg-slate-50 rounded-full flex items-center justify-center mb-6">
                                <Eye className="w-12 h-12 text-slate-300" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">No properties viewed yet</h3>
                            <p className="text-slate-500 mb-8 max-w-sm mx-auto font-medium">
                                Start browsing properties to find your perfect home.
                            </p>
                            <Link href="/properties">
                                <Button className="rounded-2xl px-8 py-7 font-bold text-lg shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95">
                                    Browse Properties
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {recentlyViewed.map((property) => (
                            <PropertyCard key={property.id} property={property} />
                        ))}
                    </div>
                )}
            </section>
        </div>
    )
}
