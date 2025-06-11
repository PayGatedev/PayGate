"use client"

import type React from "react"

import { useState } from "react"
import { AlertCircle, Info } from "lucide-react"

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
  required?: boolean
  helperText?: string
  characterCount?: boolean
  maxLength?: number
  tooltip?: string
  minRows?: number
  maxRows?: number
}

export default function FormTextarea({
  label,
  error,
  required,
  helperText,
  characterCount,
  maxLength,
  className = "",
  id,
  value = "",
  tooltip,
  minRows = 3,
  maxRows = 10,
  ...props
}: FormTextareaProps) {
  const [isFocused, setIsFocused] = useState(false)
  const textareaId = id || label.toLowerCase().replace(/\s+/g, "-")
  const valueLength = String(value).length

  // Calculate rows based on content, with min and max limits
  const calculateRows = () => {
    if (!value) return minRows
    const lineCount = String(value).split("\n").length
    return Math.min(Math.max(lineCount, minRows), maxRows)
  }

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <label htmlFor={textareaId} className="block text-white/80 text-sm font-medium">
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
        <textarea
          id={textareaId}
          className={`w-full bg-white/5 border ${
            error ? "border-red-500" : isFocused ? "border-[#FF3366]/50" : "border-white/10"
          } rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#FF3366]/30 focus:bg-white/10 transition-all min-h-[100px] resize-y ${className}`}
          value={value}
          maxLength={maxLength}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          rows={calculateRows()}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={
            error
              ? `${textareaId}-error`
              : characterCount && maxLength
                ? `${textareaId}-count`
                : helperText
                  ? `${textareaId}-helper`
                  : undefined
          }
          {...props}
        />
        {error && (
          <div className="absolute top-2 right-2 pointer-events-none">
            <AlertCircle className="w-4 h-4 text-red-500" />
          </div>
        )}
      </div>
      {characterCount && maxLength && (
        <div
          className={`flex justify-end text-xs mt-1 ${
            valueLength > maxLength * 0.9 ? "text-[#FF3366]" : "text-white/40"
          }`}
          id={`${textareaId}-count`}
        >
          <span>
            {valueLength}/{maxLength} characters
            {maxLength && valueLength < maxLength / 2 && " (recommended: at least " + maxLength / 2 + ")"}
          </span>
        </div>
      )}
      {helperText && !error && (
        <p className="text-white/40 text-xs mt-1" id={`${textareaId}-helper`}>
          {helperText}
        </p>
      )}
      {error && (
        <p className="text-red-500 text-xs mt-1 flex items-center" id={`${textareaId}-error`}>
          {error}
        </p>
      )}
    </div>
  )
}
