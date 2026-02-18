// layout.tsx (updated for dynamic theme)
import React from "react";
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { ThemeProvider as CustomThemeProvider } from "@/contexts/theme-context";
import AISupportAgent from "@/components/ai-support-agent";
import './globals.css';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins"
});

export const metadata: Metadata = {
  title: 'HouseHub - Find Your Perfect Home in Pakistan',
  description: 'Search, discover, and connect directly with house owners near you. HouseHub is Pakistan\'s premier house and apartment rental platform.',
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className} font-sans antialiased overflow-x-hidden`}>
        <CustomThemeProvider>
          {children}
          <AISupportAgent />
          <Analytics />
        </CustomThemeProvider>
      </body>
    </html>
  )
}
