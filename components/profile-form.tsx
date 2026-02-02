"use client"

import { useState, useRef, ChangeEvent } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Loader2, Upload, User, Lock, MapPin, Mail, Phone as PhoneIcon, CheckCircle } from 'lucide-react'
import { toast } from 'sonner'
import type { User as UserType } from '@/lib/types'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

const profileSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
    location: z.string().optional(),
    currentPassword: z.string().optional(),
    newPassword: z.string().min(6, 'Password must be at least 6 characters').optional().or(z.literal('')),
}).refine((data) => {
    if (data.newPassword && !data.currentPassword) {
        return false
    }
    return true
}, {
    message: "Current password is required to set new password",
    path: ["currentPassword"],
})

type ProfileFormValues = z.infer<typeof profileSchema>

interface ProfileFormProps {
    user: UserType
    onUpdate: (data: Partial<UserType>) => Promise<void>
}

export function ProfileForm({ user, onUpdate }: ProfileFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [showSuccessDialog, setShowSuccessDialog] = useState(false)
    const [previewImage, setPreviewImage] = useState(user.image || user.avatar || '')
    const fileInputRef = useRef<HTMLInputElement>(null)

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: user.name,
            email: user.email,
            phone: user.phone || '',
            location: user.location || '',
            currentPassword: '',
            newPassword: '',
        },
    })

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreviewImage(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    async function onSubmit(data: ProfileFormValues) {
        setIsLoading(true)
        try {
            // Include image in update if changed
            await onUpdate({
                name: data.name,
                email: data.email,
                phone: data.phone,
                location: data.location,
                image: previewImage,
                avatar: previewImage // Sync both fields
            })
            // toast.success('Profile updated successfully') // Replaced by Dialog
            setShowSuccessDialog(true)

            // Reset password fields
            form.setValue('currentPassword', '')
            form.setValue('newPassword', '')
        } catch (error) {
            toast.error('Failed to update profile')
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="grid gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                        Update your profile details and public information.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        {/* Profile Picture Section */}
                        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-border">
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageUpload}
                            />
                            <Avatar className="w-24 h-24 sm:w-32 sm:h-32">
                                <AvatarImage src={previewImage} />
                                <AvatarFallback className="text-4xl">
                                    {user.name.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col items-center sm:items-start gap-2">
                                <Button
                                    variant="outline"
                                    type="button"
                                    className="gap-2"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <Upload className="w-4 h-4" />
                                    Upload New Picture
                                </Button>
                                <p className="text-sm text-muted-foreground">
                                    JPG, GIF or PNG. Max size of 800K
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                    <Input
                                        id="name"
                                        placeholder="John Doe"
                                        className="pl-10"
                                        {...form.register('name')}
                                    />
                                </div>
                                {form.formState.errors.name && (
                                    <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="john@example.com"
                                        className="pl-10"
                                        {...form.register('email')}
                                    />
                                </div>
                                {form.formState.errors.email && (
                                    <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <div className="relative">
                                    <PhoneIcon className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                    <Input
                                        id="phone"
                                        placeholder="+92 300 1234567"
                                        className="pl-10"
                                        {...form.register('phone')}
                                    />
                                </div>
                                {form.formState.errors.phone && (
                                    <p className="text-sm text-destructive">{form.formState.errors.phone.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="location">Location</Label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                    <Input
                                        id="location"
                                        placeholder="Lahore, Pakistan"
                                        className="pl-10"
                                        {...form.register('location')}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-border">
                            <h3 className="text-lg font-medium">Change Password</h3>
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="currentPassword">Current Password</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                        <Input
                                            id="currentPassword"
                                            type="password"
                                            className="pl-10"
                                            {...form.register('currentPassword')}
                                        />
                                    </div>
                                    {form.formState.errors.currentPassword && (
                                        <p className="text-sm text-destructive">{form.formState.errors.currentPassword.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="newPassword">New Password</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                        <Input
                                            id="newPassword"
                                            type="password"
                                            className="pl-10"
                                            {...form.register('newPassword')}
                                        />
                                    </div>
                                    {form.formState.errors.newPassword && (
                                        <p className="text-sm text-destructive">{form.formState.errors.newPassword.message}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button type="submit" disabled={isLoading}>
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            Success
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Your profile changes have been saved successfully.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction>OK</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
