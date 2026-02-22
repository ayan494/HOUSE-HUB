"use client"

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="container mx-auto px-4 pt-32 pb-16">
                <div className="max-w-3xl mx-auto glass-card p-8 md:p-12 rounded-3xl shadow-2xl">
                    <h1 className="text-4xl font-black text-foreground mb-8">Terms of Service</h1>
                    <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-muted-foreground">
                        <p className="text-lg font-medium text-foreground">
                            By using Rentora, you agree to comply with and be bound by the following terms and conditions of use.
                        </p>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-foreground">1. Acceptance of Terms</h2>
                            <p>
                                The services that Rentora provides to you are subject to the following Terms of Service. Rentora reserves the right to update the ToS at any time without notice to you.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-foreground">2. Description of Service</h2>
                            <p>
                                Rentora provides users with access to a collection of resources, including property search tools, listing services, and communication platforms between owners and tenants.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-foreground">3. User Conduct</h2>
                            <p>
                                As a condition of your use of the services, you will not use the services for any purpose that is unlawful or prohibited by these terms, conditions, and notices. You may not use the services in any manner that could damage, disable, overburden, or impair any Rentora server.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-foreground">4. Liability Disclaimer</h2>
                            <p>
                                Rentora acts solely as a platform to connect owners and tenants. We do not own, manage, or verify the legal status of the properties listed. Users are responsible for their own due diligence before entering into any rental agreement.
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
