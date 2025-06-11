"use client"

import type React from "react"
import { Check } from "lucide-react"

interface FormCheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label: string | React.ReactNode
  checked: boolean
  onChange: (checked: boolean) => void
  error?: string
  description?: string
}

export default function FormCheckbox({
  label,
  checked,
  onChange,
  error,
  description,
  id,
  name,
  ...props
}: FormCheckboxProps) {
  const checkboxId = id || (typeof label === "string" ? label.toLowerCase().replace(/\s+/g, "-") : name)

  return (
    <div className="mb-3">
      <div className="flex items-center">
        <div className="relative flex items-center">
          <input
            type="checkbox"
            id={checkboxId}
            name={name}
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            className="opacity-0 absolute h-5 w-5 cursor-pointer"
            {...props}
          />
          <div
            className={`w-4 h-4 rounded border ${
              checked ? "border-[#FF3366] bg-[#FF3366]/20" : "border-white/30 bg-white/5"
            } mr-2 flex items-center justify-center transition-all`}
            onClick={() => onChange(!checked)}
          >
            {checked && <Check className="w-3 h-3 text-[#FF3366] stroke-[3]" />}
          </div>
        </div>
        <label htmlFor={checkboxId} className="text-white/80 text-sm cursor-pointer">
          {label}
        </label>
      </div>
      {description && <p className="text-white/40 text-xs mt-1 ml-6">{description}</p>}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}
