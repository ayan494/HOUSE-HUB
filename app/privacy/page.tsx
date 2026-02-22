"use client"

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="container mx-auto px-4 pt-32 pb-16">
                <div className="max-w-3xl mx-auto glass-card p-8 md:p-12 rounded-3xl shadow-2xl">
                    <h1 className="text-4xl font-black text-foreground mb-8">Privacy Policy</h1>
                    <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-muted-foreground">
                        <p className="text-lg">
                            At Rentora, we take your privacy seriously. This policy describes how we collect, use, and handle your information when you use our website and services.
                        </p>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-foreground">1. Information We Collect</h2>
                            <p>
                                We collect information you provide directly to us, such as when you create an account, list a property, or communicate with other users. This may include your name, email address, phone number, and property details.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-foreground">2. How We Use Information</h2>
                            <p>
                                We use the information we collect to provide, maintain, and improve our services, to facilitate connections between owners and tenants, and to communicate with you about updates or support.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-foreground">3. Information Sharing</h2>
                            <p>
                                We do not share your private contact information with third parties except as necessary to provide our service (e.g., displaying your contact info to interested tenants if you list a property) or as required by law.
                            </p>
                        </section>

                        <p className="pt-8 text-sm italic">
                            Last updated: February 23, 2026
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
