"use client"

import { useState } from 'react'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import Swal from 'sweetalert2'

import { saveReview } from '@/lib/store'

export function ReviewForm() {
    const [userName, setUserName] = useState('')
    const [rating, setRating] = useState(5)
    const [text, setText] = useState('')
    const [location, setLocation] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!userName || !text) {
            Swal.fire({
                title: 'Error!',
                text: 'Please fill in all required fields.',
                icon: 'error',
                confirmButtonColor: '#6699cc',
            })
            return
        }

        setIsSubmitting(true)

        try {
            // Simulate brief delay
            await new Promise(resolve => setTimeout(resolve, 800))

            saveReview({
                userName,
                rating,
                text,
                location,
            })

            Swal.fire({
                title: 'Success!',
                text: 'Thank you for your feedback!',
                icon: 'success',
                confirmButtonColor: '#6699cc',
            })

            // Reset form
            setUserName('')
            setRating(5)
            setText('')
            setLocation('')

        } catch (error: any) {
            console.error('Error submitting review:', error)
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong. Please try again later.',
                icon: 'error',
                confirmButtonColor: '#6699cc',
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Card className="max-w-2xl mx-auto shadow-xl border-none bg-background/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Share Your Experience</CardTitle>
                <CardDescription>
                    Your feedback helps us improve and helps others find their perfect home.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Your Name</label>
                        <Input
                            placeholder="Enter your name"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Location (City)</label>
                        <Input
                            placeholder="e.g. Lahore, Karachi"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Rating</label>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    className="focus:outline-none transition-transform hover:scale-110"
                                >
                                    <Star
                                        className={`w-8 h-8 ${star <= rating ? 'fill-[#6699cc] text-[#6699cc]' : 'text-muted-foreground'
                                            }`}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Your Review</label>
                        <Textarea
                            placeholder="Tell us what you think about Rentora..."
                            rows={4}
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            required
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full text-white font-bold h-12 rounded-xl"
                        style={{ backgroundColor: '#6699cc' }}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Review'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
