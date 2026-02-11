"use client"

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Star } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface ReviewDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function ReviewDialog({ open, onOpenChange }: ReviewDialogProps) {
    const [rating, setRating] = useState(0)
    const [hoveredRating, setHoveredRating] = useState(0)
    const [review, setReview] = useState('')
    const { toast } = useToast()

    const handleSubmit = () => {
        if (rating === 0) {
            toast({
                title: 'Rating required',
                description: 'Please select a rating before submitting.',
                variant: 'destructive',
            })
            return
        }

        // Save review (in real app, this would go to backend)
        toast({
            title: 'Thank you for your review!',
            description: 'Your feedback helps us improve HouseHub.',
        })

        // Reset and close
        setRating(0)
        setReview('')
        onOpenChange(false)
    }

    const handleSkip = () => {
        setRating(0)
        setReview('')
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl">How was your experience?</DialogTitle>
                    <DialogDescription>
                        We'd love to hear your feedback about using HouseHub
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* Star Rating */}
                    <div className="space-y-3">
                        <label className="text-sm font-medium">Rate your experience</label>
                        <div className="flex gap-2 justify-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHoveredRating(star)}
                                    onMouseLeave={() => setHoveredRating(0)}
                                    className="transition-transform hover:scale-110"
                                >
                                    <Star
                                        className={`w-10 h-10 transition-colors ${star <= (hoveredRating || rating)
                                                ? 'fill-amber-400 text-amber-400'
                                                : 'text-muted-foreground'
                                            }`}
                                    />
                                </button>
                            ))}
                        </div>
                        {rating > 0 && (
                            <p className="text-center text-sm text-muted-foreground">
                                {rating === 1 && 'Poor'}
                                {rating === 2 && 'Fair'}
                                {rating === 3 && 'Good'}
                                {rating === 4 && 'Very Good'}
                                {rating === 5 && 'Excellent'}
                            </p>
                        )}
                    </div>

                    {/* Review Text */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Tell us more (optional)</label>
                        <Textarea
                            placeholder="Share your thoughts about HouseHub..."
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            rows={4}
                            className="resize-none"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-2">
                        <Button
                            variant="outline"
                            onClick={handleSkip}
                            className="flex-1"
                        >
                            Skip
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            className="flex-1"
                        >
                            Submit Review
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
