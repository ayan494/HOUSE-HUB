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
import { Home, Mail, Lock, User, Phone, ArrowRight, Building, Users, Chrome, Check, X } from 'lucide-react'
import { registerUser } from '@/lib/store'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)
import { validatePassword, isPasswordValid } from '@/lib/password-validator'
import { emailExists, addRegisteredUser } from '@/lib/email-validator'

function RegisterForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const defaultRole = searchParams.get('role') as 'user' | 'owner' || 'user'

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'user' | 'owner'>(defaultRole)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [emailError, setEmailError] = useState('')

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value
    setEmail(newEmail)

    // Check email validity
    if (newEmail && emailExists(newEmail)) {
      setEmailError('This email is already registered')
    } else if (newEmail && !newEmail.includes('@')) {
      setEmailError('Please enter a valid email address')
    } else {
      setEmailError('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!name || !email || !phone || !password) {
      setError('Please fill in all fields')
      return
    }

    if (emailError) {
      setError('Please fix the email error before proceeding')
      return
    }

    if (!isPasswordValid(password)) {
      setError('Password does not meet all requirements')
      return
    }

    setIsLoading(true)

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))

    try {
      // Final check: ensure email is still available (prevent race/duplicates)
      if (emailExists(email)) {
        setError('This email is already registered')
        setEmailError('This email is already registered')
        return
      }

      // Add to registered users list first (will throw if duplicate)
      addRegisteredUser({
        email,
        name,
        phone,
        role,
        registeredAt: new Date().toISOString(),
      })

      // Then register and set current user
      registerUser(name, email, phone, role)

      await MySwal.fire({
        title: 'Welcome to HouseHub!',
        text: 'Your account has been created successfully.',
        icon: 'success',
        confirmButtonColor: '#E6D8C7',
        confirmButtonText: 'Login Now',
        customClass: {
          confirmButton: 'text-slate-900 font-bold px-8 py-3 rounded-xl'
        }
      })

      router.push(role === 'owner' ? '/dashboard/owner/premium' : '/dashboard/user/plan')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed')
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
            <CardTitle className="text-2xl">Create Account</CardTitle>
            <CardDescription>
              Join HouseHub to find your perfect home
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Role Selection */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                type="button"
                onClick={() => setRole('user')}
                className={`p-4 rounded-lg border-2 transition-all ${role === 'user'
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                  }`}
              >
                <Users className={`w-6 h-6 mx-auto mb-2 ${role === 'user' ? 'text-primary' : 'text-muted-foreground'}`} />
                <p className={`text-sm font-medium ${role === 'user' ? 'text-primary' : 'text-foreground'}`}>
                  I&apos;m a Tenant
                </p>
                <p className="text-xs text-muted-foreground mt-1">Looking for a home</p>
              </button>
              <button
                type="button"
                onClick={() => setRole('owner')}
                className={`p-4 rounded-lg border-2 transition-all ${role === 'owner'
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                  }`}
              >
                <Building className={`w-6 h-6 mx-auto mb-2 ${role === 'owner' ? 'text-primary' : 'text-muted-foreground'}`} />
                <p className={`text-sm font-medium ${role === 'owner' ? 'text-primary' : 'text-foreground'}`}>
                  I&apos;m an Owner
                </p>
                <p className="text-xs text-muted-foreground mt-1">List my property</p>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-lg">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={handleEmailChange}
                    className={`pl-10 ${emailError ? 'border-destructive' : ''}`}
                  />
                </div>
                {emailError && (
                  <div className="flex items-center gap-2 text-sm text-destructive">
                    <X className="w-4 h-4" />
                    <span>{emailError}</span>
                  </div>
                )}
                {email && !emailError && (
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <Check className="w-4 h-4" />
                    <span>Email is available</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+92 300 1234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
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
                    placeholder="Create a password"
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

              <Button type="submit" className="w-full h-11" disabled={isLoading || (password && !isPasswordValid(password)) || !!emailError}>
                {isLoading ? 'Creating account...' : 'Create Account'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>

            {/* Divider */}
            <div className="mt-6 flex items-center gap-3">
              <div className="flex-1 h-px bg-border"></div>
              <span className="text-xs text-muted-foreground">Or continue with</span>
              <div className="flex-1 h-px bg-border"></div>
            </div>

            {/* Google Sign Up Button */}
            <Button
              type="button"
              variant="outline"
              className="w-full h-11 mt-4"
              onClick={() => {
                const callbackUrl = role === 'owner' ? '/dashboard/owner' : '/'
                signIn('google', { callbackUrl })
              }}
            >
              <Chrome className="w-4 h-4 mr-2" />
              Sign up with Google
            </Button>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Already have an account? </span>
              <Link href="/auth/login" className="text-primary hover:underline font-medium">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    }>
      <RegisterForm />
    </Suspense>
  )
}
