import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { registerUser } from "@/lib/store"

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          // Auto-register user if they don't exist
          const existingUser = localStorage.getItem(`user_${user.email}`)

          if (!existingUser && user.email && user.name) {
            // Register as tenant by default (can be modified by user later)
            registerUser(user.name, user.email, "", "user")
          }

          return true
        } catch (error) {
          console.error("Error during Google sign in:", error)
          return false
        }
      }
      return true
    },
    async redirect({ url, baseUrl }) {
      // Redirect to dashboard or home after login
      if (url.startsWith("/")) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
    async jwt({ token, account, user }) {
      if (account) {
        token.provider = account.provider
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
