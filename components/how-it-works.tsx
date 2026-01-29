"use client"

import { useEffect, useRef, useState } from 'react'
import { Search, Home, MessageSquare, Key } from 'lucide-react'

const steps = [
  {
    icon: Search,
    title: 'Search',
    description: 'Browse through hundreds of verified properties across Pakistan.',
  },
  {
    icon: Home,
    title: 'Choose',
    description: 'Find the perfect home that matches your budget and preferences.',
  },
  {
    icon: MessageSquare,
    title: 'Connect',
    description: 'Contact property owners directly through our platform.',
  },
  {
    icon: Key,
    title: 'Move In',
    description: 'Finalize the deal and move into your new home hassle-free.',
  },
]

export function HowItWorks() {
  const [visibleSteps, setVisibleSteps] = useState<Set<number>>(new Set())
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = stepRefs.current.findIndex(ref => ref === entry.target)
            if (index !== -1) {
              setTimeout(() => {
                setVisibleSteps(prev => new Set([...prev, index]))
              }, index * 150)
            }
          }
        })
      },
      { threshold: 0.2 }
    )

    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Finding your perfect home is easy with HouseHub. Follow these simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.title}
              ref={(el) => { stepRefs.current[index] = el }}
              className={`relative text-center transition-all duration-500 ${
                visibleSteps.has(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-border" />
              )}

              {/* Step number */}
              <div className="relative z-10 w-24 h-24 mx-auto mb-6 rounded-full bg-card border-2 border-border flex items-center justify-center shadow-sm">
                <step.icon className="w-10 h-10 text-primary" />
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                  {index + 1}
                </div>
              </div>

              <h3 className="text-xl font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
