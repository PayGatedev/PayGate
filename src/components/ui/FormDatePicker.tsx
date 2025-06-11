"use client"

import type React from "react"

interface FormDatePickerProps {
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  required?: boolean
  helperText?: string
  name: string
  id?: string
  min?: string
  max?: string
  disabled?: boolean
}

export default function FormDatePicker({
  label,
  value,
  onChange,
  error,
  required,
  helperText,
  name,
  id,
  min,
  max,
  disabled = false,
}: FormDatePickerProps) {
  const inputId = id || name

  return (
    <div className="mb-4">
      <label htmlFor={inputId} className="block text-white/80 mb-2 text-sm font-medium">
        {label} {required && <span className="text-[#FF3366]">*</span>}
      </label>
      <div className="relative">
        <input
          type="date"
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          disabled={disabled}
          className={`w-full bg-white/5 border ${
            error ? "border-red-500" : "border-white/10"
          } rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#FF3366]/30 focus:bg-white/10 transition-all ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          style={{ colorScheme: "dark" }}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-white/40"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      </div>
      {helperText && !error && <p className="text-white/40 text-xs mt-1">{helperText}</p>}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}
