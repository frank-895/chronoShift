// this is a simple wrapper. It ensure each page or section is flex and column-oriented.

import React from 'react'

interface LayoutProps {
  children: React.ReactNode
  className?: string
}

export default function Layout({ children, className = '' }: LayoutProps) {
  return ( // additional Tailwind styles can be passed with ${className}
    <div className={`flex-1 flex flex-col ${className}`}>
      {children}
    </div>
  )
} 