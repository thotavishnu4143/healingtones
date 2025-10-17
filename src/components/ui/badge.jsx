import React from 'react'

export function Badge({ className = '', variant = 'secondary', children, ...props }) {
  const base = 'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium border'
  const variants = {
    secondary: 'bg-gray-100 text-gray-800 border-gray-200',
    outline: 'bg-transparent text-gray-700 border-gray-300'
  }
  return (
    <span className={`${base} ${variants[variant] || variants.secondary} ${className}`} {...props}>
      {children}
    </span>
  )
}
