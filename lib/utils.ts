import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { getCurrentUser } from "./store"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateNetProfit(grossValue: number) {
  if (typeof window === 'undefined') return grossValue

  const user = getCurrentUser()
  if (!user) return grossValue

  // Logic: If status is 'FreeTrial' or 'Active', or if it's the first month, return full value
  if (user.isFirstMonth || user.subscriptionStatus === 'FreeTrial' || user.subscriptionStatus === 'Active') {
    return grossValue
  }

  // If status is 'Basic', deduct 0.5% commission
  if (user.subscriptionStatus === 'Basic') {
    return grossValue * 0.995
  }

  return grossValue
}
