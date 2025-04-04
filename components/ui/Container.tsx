'use client'

import { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  className?: string
}

export default function Container({ children, className = '' }: ContainerProps) {
  return (
    <div className={`max-w-screen-lg mx-auto px-4 ${className}`}>
      {children}
    </div>
  )
} 