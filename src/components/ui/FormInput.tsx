"use client"

import type React from "react"

import { useState, type ReactNode } from "react"
import { Eye, EyeOff, AlertCircle, Info } from "lucide-react"

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  required?: boolean
  helperText?: string
  icon?: ReactNode
  tooltip?: string
}

export default function FormInput({
  label,
  error,
  required,
  helperText,
  className = "",
  id,
  type = "text",
  icon,
  tooltip,
  ...props
}: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const inputId = id || label.toLowerCase().replace(/\s+/g, "-")
  const inputType = type === "password" && showPassword ? "text" : type

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <label htmlFor={inputId} className="block text-white/80 text-sm font-medium">
          {label} {required && <span className="text-[#FF3366]">*</span>}
        </label>
        {tooltip && (
          <div className="group relative">
            <button
              type="button"
              className="text-white/40 hover:text-white/60 transition-colors"
              aria-label="Show information"
            >
              <Info className="w-4 h-4" />
            </button>
            <div className="absolute right-0 z-10 w-64 p-3 mt-2 text-sm text-white bg-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-1 group-hover:translate-y-0">
              {tooltip}
            </div>
          </div>
        )}
      </div>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <span className="text-white/40">{icon}</span>
          </div>
        )}
        <input
          id={inputId}
          type={inputType}
          className={`w-full bg-white/5 border ${
            error ? "border-red-500" : isFocused ? "border-[#FF3366]/50" : "border-white/10"
          } rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#FF3366]/30 focus:bg-white/10 transition-all ${
            icon ? "pl-10" : ""
          } ${type === "password" ? "pr-10" : ""} ${className}`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          {...props}
        />
        {type === "password" && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-white/40 hover:text-white/60 transition-colors"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
        {error && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <AlertCircle className="w-4 h-4 text-red-500" />
          </div>
        )}
      </div>
      {helperText && !error && (
        <p className="text-white/40 text-xs mt-1" id={`${inputId}-helper`}>
          {helperText}
        </p>
      )}
      {error && (
        <p className="text-red-500 text-xs mt-1 flex items-center" id={`${inputId}-error`}>
          {error}
        </p>
      )}
    </div>
  )
}
