"use client"

import type React from "react"

interface RadioOption {
  value: string
  label: string
  description?: string
  icon?: React.ReactNode
  color?: string
}

interface FormRadioProps {
  options: RadioOption[]
  value: string
  onChange: (value: string) => void
  label?: string
  layout?: "vertical" | "horizontal" | "cards"
  error?: string
  required?: boolean
  name: string
}

export default function FormRadio({
  options,
  value,
  onChange,
  label,
  layout = "vertical",
  error,
  required,
  name,
}: FormRadioProps) {
  if (layout === "cards") {
    return (
      <div className="mb-4">
        {label && (
          <label className="block text-white/80 mb-2 text-sm font-medium">
            {label} {required && <span className="text-[#FF3366]">*</span>}
          </label>
        )}
        <div className={`grid grid-cols-1 ${options.length > 1 ? "md:grid-cols-2" : ""} gap-4 mb-2`}>
          {options.map((option) => {
            const colorClasses = getColorClasses(option.color || "default")

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => onChange(option.value)}
                className={`glassmorphism-card p-4 rounded-xl border ${
                  value === option.value
                    ? `${colorClasses.border} bg-gradient-to-br ${colorClasses.gradient} shadow-glow-sm`
                    : "border-white/10 hover:bg-white/5"
                } transition-all group text-left`}
              >
                <div className="flex items-start">
                  {option.icon && (
                    <div
                      className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colorClasses.iconBg} flex items-center justify-center mr-4 group-hover:${colorClasses.iconHoverBg} transition-all`}
                    >
                      {option.icon}
                    </div>
                  )}
                  <div className="flex-1">
                    <h3
                      className={`text-base font-medium text-white group-hover:${colorClasses.textHover} transition-colors`}
                    >
                      {option.label}
                    </h3>
                    {option.description && <p className="text-white/60 text-xs">{option.description}</p>}
                  </div>
                  <input
                    type="radio"
                    name={name}
                    value={option.value}
                    checked={value === option.value}
                    onChange={() => onChange(option.value)}
                    className="sr-only"
                    aria-label={option.label}
                  />
                </div>
              </button>
            )
          })}
        </div>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    )
  }

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-white/80 mb-2 text-sm font-medium">
          {label} {required && <span className="text-[#FF3366]">*</span>}
        </label>
      )}
      <div className={`space-y-2 ${layout === "horizontal" ? "sm:space-y-0 sm:flex sm:space-x-4" : ""}`}>
        {options.map((option) => (
          <div key={option.value} className="flex items-center">
            <input
              type="radio"
              id={`${name}-${option.value}`}
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="opacity-0 absolute h-5 w-5 cursor-pointer"
            />
            <div
              className={`w-4 h-4 rounded-full border ${
                value === option.value ? "border-[#FF3366] bg-[#FF3366]/20" : "border-white/30 bg-white/5"
              } mr-2 flex items-center justify-center transition-all`}
            >
              {value === option.value && <div className="w-2 h-2 rounded-full bg-[#FF3366]"></div>}
            </div>
            <label htmlFor={`${name}-${option.value}`} className="text-white/80 text-sm cursor-pointer">
              {option.label}
              {option.description && <span className="block text-white/40 text-xs">{option.description}</span>}
            </label>
          </div>
        ))}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}

function getColorClasses(color: string) {
  switch (color) {
    case "green":
      return {
        border: "border-green-500/30",
        gradient: "from-green-500/10 to-green-500/5",
        iconBg: "from-green-500/30 to-green-500/10",
        iconHoverBg: "from-green-500/40 to-green-500/20",
        textHover: "text-green-400",
      }
    case "blue":
      return {
        border: "border-blue-500/30",
        gradient: "from-blue-500/10 to-blue-500/5",
        iconBg: "from-blue-500/30 to-blue-500/10",
        iconHoverBg: "from-blue-500/40 to-blue-500/20",
        textHover: "text-blue-400",
      }
    case "purple":
      return {
        border: "border-purple-500/30",
        gradient: "from-purple-500/10 to-purple-500/5",
        iconBg: "from-purple-500/30 to-purple-500/10",
        iconHoverBg: "from-purple-500/40 to-purple-500/20",
        textHover: "text-purple-400",
      }
    case "yellow":
      return {
        border: "border-yellow-500/30",
        gradient: "from-yellow-500/10 to-yellow-500/5",
        iconBg: "from-yellow-500/30 to-yellow-500/10",
        iconHoverBg: "from-yellow-500/40 to-yellow-500/20",
        textHover: "text-yellow-400",
      }
    case "pink":
      return {
        border: "border-[#FF3366]/30",
        gradient: "from-[#FF3366]/10 to-[#FF3366]/5",
        iconBg: "from-[#FF3366]/30 to-[#FF3366]/10",
        iconHoverBg: "from-[#FF3366]/40 to-[#FF3366]/20",
        textHover: "text-[#FF3366]",
      }
    default:
      return {
        border: "border-white/30",
        gradient: "from-white/10 to-white/5",
        iconBg: "from-white/20 to-white/10",
        iconHoverBg: "from-white/30 to-white/20",
        textHover: "text-white",
      }
  }
}
