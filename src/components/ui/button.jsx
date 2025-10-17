import React from 'react'

export function Button({ className = '', variant = 'default', size = 'md', children, ...props }) {
  const base = 'inline-flex items-center justify-center rounded-md font-medium transition-all duration-200'
  const sizes = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-10 px-4',
    lg: 'h-11 px-5 text-base',
    icon: 'h-10 w-10 p-0'
  }
  const variants = {
    default: 'bg-purple-600 text-white hover:bg-purple-700',
    outline: 'border border-gray-300 text-gray-700 bg-white hover:bg-gray-50',
    ghost: 'text-gray-700 hover:bg-gray-100'
  }
  return (
    <button className={`${base} ${sizes[size] || sizes.md} ${variants[variant] || variants.default} ${className}`} {...props}>
      {children}
    </button>
  )
}
