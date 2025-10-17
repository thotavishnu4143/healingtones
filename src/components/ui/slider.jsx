import React from 'react'

export function Slider({ value = [0], max = 100, onValueChange, disabled, className = '' }) {
  const current = value[0] || 0
  return (
    <input
      type="range"
      min={0}
      max={max}
      disabled={disabled}
      value={current}
      onChange={(e) => onValueChange && onValueChange([Number(e.target.value)])}
      className={`w-full accent-purple-600 ${className}`}
    />
  )
}
