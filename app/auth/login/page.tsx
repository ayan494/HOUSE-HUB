"use client"

import React from "react"

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Home, Mail, Lock, ArrowRight, Chrome, Check, X } from 'lucide-react'
import { loginUser } from '@/lib/store'
import { validatePassword, isPasswordValid } from '@/lib/password-validator'
import Swal from 'sweetalert2'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }

    setIsLoading(true)

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))

    try {
      loginUser(email, password)

      await Swal.fire({
        title: 'Welcome Back!',
        text: 'You have successfully signed in.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
        timerProgressBar: true,
        borderRadius: '20px',
      })

      router.push(redirect)
    } catch (err) {
      setError('Invalid credentials')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <Home className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold text-foreground">HouseHub</span>
        </Link>

        <Card className="border-border">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-lg">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Password Requirements */}
                {password && (
                  <div className="mt-3 p-3 bg-muted rounded-lg space-y-2">
                    <p className="text-xs font-semibold text-foreground mb-2">Password Requirements:</p>
                    {(() => {
                      const reqs = validatePassword(password)
                      return (
                        <>
                          <div className="flex items-center gap-2 text-xs">
                            {reqs.minLength ? (
                              <Check className="w-4 h-4 text-green-500" />
                            ) : (
                              <X className="w-4 h-4 text-red-500" />
                            )}
                            <span className={reqs.minLength ? 'text-green-600' : 'text-muted-foreground'}>
                              At least 8 characters
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            {reqs.hasUppercase ? (
                              <Check className="w-4 h-4 text-green-500" />
                            ) : (
                              <X className="w-4 h-4 text-red-500" />
                            )}
                            <span className={reqs.hasUppercase ? 'text-green-600' : 'text-muted-foreground'}>
                              Uppercase Letters (A–Z)
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            {reqs.hasLowercase ? (
                              <Check className="w-4 h-4 text-green-500" />
                            ) : (
                              <X className="w-4 h-4 text-red-500" />
                            )}
                            <span className={reqs.hasLowercase ? 'text-green-600' : 'text-muted-foreground'}>
                              Lowercase Letters (a–z)
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            {reqs.hasNumber ? (
                              <Check className="w-4 h-4 text-green-500" />
                            ) : (
                              <X className="w-4 h-4 text-red-500" />
                            )}
                            <span className={reqs.hasNumber ? 'text-green-600' : 'text-muted-foreground'}>
                              Numbers (0–9)
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            {reqs.hasSpecialChar ? (
                              <Check className="w-4 h-4 text-green-500" />
                            ) : (
                              <X className="w-4 h-4 text-red-500" />
                            )}
                            <span className={reqs.hasSpecialChar ? 'text-green-600' : 'text-muted-foreground'}>
                              Special Characters (! @ # $ % ^ & *)
                            </span>
                          </div>
                        </>
                      )
                    })()}
                  </div>
                )}
              </div>

              <Button type="submit" className="w-full h-11" disabled={isLoading || (password && !isPasswordValid(password))}>
                {isLoading ? 'Signing in...' : 'Sign In'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>

            {/* Divider */}
            <div className="mt-6 flex items-center gap-3">
              <div className="flex-1 h-px bg-border"></div>
              <span className="text-xs text-muted-foreground">Or continue with</span>
              <div className="flex-1 h-px bg-border"></div>
            </div>

            {/* Google Sign In Button */}
            <Button
              type="button"
              variant="outline"
              className="w-full h-11 mt-4"
              onClick={() => signIn('google', { callbackUrl: redirect })}
            >
              <Chrome className="w-4 h-4 mr-2" />
              Sign in with Google
            </Button>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Don&apos;t have an account? </span>
              <Link href="/auth/register" className="text-primary hover:underline font-medium">
                Sign up
              </Link>
            </div>

            <div className="mt-4 text-center text-sm">
              <Link href="/auth/register?role=owner" className="text-primary hover:underline font-medium">
                List your property as an owner
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}
