/**
 * Email Validation Utility
 * Checks if an email is already registered
 */

// Store key for all registered users
const REGISTERED_USERS_KEY = 'househub_registered_users'

export interface RegisteredUser {
  email: string
  name: string
  username: string
  phone: string
  role: 'user' | 'owner'
  registeredAt: string
}

/**
 * Get all registered users
 */
export function getRegisteredUsers(): RegisteredUser[] {
  if (typeof window === 'undefined') return []
  const stored = localStorage.getItem(REGISTERED_USERS_KEY)
  return stored ? JSON.parse(stored) : []
}

/**
 * Check if email already exists
 */
export function emailExists(email: string): boolean {
  if (typeof window === 'undefined') return false
  const users = getRegisteredUsers()
  return users.some(user => user.email.toLowerCase() === email.toLowerCase())
}

/**
 * Register a new user (add to registered users list)
 */
export function addRegisteredUser(user: RegisteredUser): void {
  if (typeof window === 'undefined') return
  if (emailExists(user.email)) {
    throw new Error('Email already registered')
  }
  const users = getRegisteredUsers()
  users.push(user)
  localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users))
}

/**
 * Get user by email
 */
export function getUserByEmail(email: string): RegisteredUser | null {
  if (typeof window === 'undefined') return null
  const users = getRegisteredUsers()
  return users.find(user => user.email.toLowerCase() === email.toLowerCase()) || null
}
