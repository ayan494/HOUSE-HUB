// layout.tsx (updated for dynamic theme)
import React from "react";
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { ThemeProvider as CustomThemeProvider } from "@/contexts/theme-context";
import './globals.css';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins"
});

export const metadata: Metadata = {
  title: 'HouseHub - Find Your Perfect Home in Pakistan',
  description: 'Search, discover, and connect directly with house owners near you. HouseHub is Pakistan\'s premier house and apartment rental platform.',
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className} font-sans antialiased`}>
        <CustomThemeProvider>
          {children}
          <Analytics />
        </CustomThemeProvider>
      </body>
    </html>
  )
}
