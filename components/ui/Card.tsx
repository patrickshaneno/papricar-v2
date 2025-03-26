'use client'

import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered'
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = {
      default: 'bg-white rounded-2xl shadow-soft p-6 space-y-4',
      bordered: 'bg-white rounded-2xl shadow-soft p-6 space-y-4 border border-gray-200',
    }
    
    return (
      <div
        className={cn(variants[variant], className)}
        ref={ref}
        {...props}
      />
    )
  }
)

Card.displayName = 'Card'

export { Card } 