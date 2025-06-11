"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, Check, AlertCircle, Info } from "lucide-react"

interface SelectOption {
  value: string
  label: string
  description?: string
  icon?: React.ReactNode
}

interface FormSelectProps {
  options: SelectOption[]
  value: string
  onChange: (value: string) => void
  label: string
  error?: string
  required?: boolean
  placeholder?: string
  disabled?: boolean
  tooltip?: string
  helperText?: string
}

export default function FormSelect({
  options,
  value,
  onChange,
  label,
  error,
  required,
  placeholder = "Select an option",
  disabled = false,
  tooltip,
  helperText,
}: FormSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const selectedOption = options.find((option) => option.value === value)
  const selectId = label.toLowerCase().replace(/\s+/g, "-")

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return

    if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
      e.preventDefault()
      setIsOpen(true)
    } else if (e.key === "Escape") {
      setIsOpen(false)
    } else if (e.key === "Tab") {
      setIsOpen(false)
    } else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault()
      if (!isOpen) {
        setIsOpen(true)
        return
      }

      const currentIndex = options.findIndex((option) => option.value === value)
      let nextIndex = currentIndex

      if (e.key === "ArrowDown") {
        nextIndex = currentIndex < options.length - 1 ? currentIndex + 1 : 0
      } else {
        nextIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1
      }

      onChange(options[nextIndex].value)
    }
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <label id={`${selectId}-label`} className="block text-white/80 text-sm font-medium">
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
      <div ref={selectRef} className="relative">
        <button
          ref={buttonRef}
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          className={`w-full bg-white/5 border ${
            error ? "border-red-500" : isFocused ? "border-[#FF3366]/50" : "border-white/10"
          } rounded-lg py-2 px-4 text-left text-white focus:outline-none focus:ring-2 focus:ring-[#FF3366]/30 focus:bg-white/10 transition-all ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-labelledby={`${selectId}-label`}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined}
          disabled={disabled}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {selectedOption?.icon && <span className="text-white/60">{selectedOption.icon}</span>}
              <span className={!selectedOption ? "text-white/40" : ""}>
                {selectedOption ? selectedOption.label : placeholder}
              </span>
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
          </div>
        </button>

        {error && (
          <div className="absolute inset-y-0 right-8 flex items-center pointer-events-none">
            <AlertCircle className="w-4 h-4 text-red-500" />
          </div>
        )}

        {isOpen && (
          <div
            className="absolute z-10 mt-1 w-full bg-[#1A1D25] border border-white/10 rounded-lg shadow-lg max-h-60 overflow-auto"
            role="listbox"
            aria-labelledby={`${selectId}-label`}
            tabIndex={-1}
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value)
                  setIsOpen(false)
                  buttonRef.current?.focus()
                }}
                className={`w-full text-left px-4 py-2 hover:bg-white/10 transition-colors ${
                  option.value === value ? "bg-white/10 text-white" : "text-white/80"
                }`}
                role="option"
                aria-selected={option.value === value}
              >
                <div className="flex items-center gap-2">
                  {option.icon && <span>{option.icon}</span>}
                  <div className="flex-1">
                    <div className="font-medium">{option.label}</div>
                    {option.description && <div className="text-xs text-white/60">{option.description}</div>}
                  </div>
                  {option.value === value && <Check className="w-4 h-4 text-[#FF3366]" />}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
      {helperText && !error && (
        <p className="text-white/40 text-xs mt-1" id={`${selectId}-helper`}>
          {helperText}
        </p>
      )}
      {error && (
        <p className="text-red-500 text-xs mt-1" id={`${selectId}-error`}>
          {error}
        </p>
      )}
    </div>
  )
}
