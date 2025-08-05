import type { Metadata } from 'next'
import { Inter } from 'next/font/google' // Google font configuration
import './globals.css' // global styles

const inter = Inter({ subsets: ['latin'] })

// SEO and page metadata
export const metadata: Metadata = {
  title: 'ChronoShift',
  description: 'A Next.js 14 application with TypeScript and Tailwind CSS',
}

// renders the page content
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
} 