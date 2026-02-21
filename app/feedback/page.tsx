import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ReviewForm } from '@/components/review-form'

export default function FeedbackPage() {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="pt-32 pb-16 px-4">
                <div className="container mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold mb-4">Feedback & Reviews</h1>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Your opinion matters to us. Help us make Rentora the best platform for
                            property rentals in Pakistan.
                        </p>
                    </div>
                    <ReviewForm />
                </div>
            </main>
            <Footer />
        </div>
    )
}
