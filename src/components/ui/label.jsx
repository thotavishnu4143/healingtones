import React from 'react'

export function Label({ className = '', children, ...props }) {
  return (
    <label className={`block font-medium ${className}`} {...props}>
      {children}
    </label>
  )
}
