"use client"

import type React from "react"

import { useState } from "react"
import { ChevronDown, ChevronUp, Info } from "lucide-react"

interface FormSectionProps {
  title?: string
  description?: string
  children: React.ReactNode
  className?: string
  collapsible?: boolean
  defaultCollapsed?: boolean
  tooltip?: string
  id?: string
}

export default function FormSection({
  title,
  description,
  children,
  className = "",
  collapsible = false,
  defaultCollapsed = false,
  tooltip,
  id,
}: FormSectionProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed)
  const sectionId = id || (title ? title.toLowerCase().replace(/\s+/g, "-") : undefined)

  return (
    <div className={`glassmorphism-card rounded-xl border border-white/10 mb-6 overflow-hidden ${className}`}>
      {(title || description) && (
        <div
          className={`p-4 border-b border-white/10 ${collapsible ? "cursor-pointer" : ""}`}
          onClick={collapsible ? () => setIsCollapsed(!isCollapsed) : undefined}
        >
          <div className="flex items-center justify-between">
            <div>
              {title && (
                <h3 className="text-white font-medium flex items-center" id={sectionId}>
                  {title}
                </h3>
              )}
              {description && <p className="text-white/60 text-sm mt-1">{description}</p>}
            </div>
            <div className="flex items-center gap-2">
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
              {collapsible && (
                <button
                  type="button"
                  className="text-white/40 hover:text-white/60 transition-colors"
                  aria-expanded={!isCollapsed}
                  aria-controls={`${sectionId}-content`}
                >
                  {isCollapsed ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      <div
        className={`p-6 ${isCollapsed ? "hidden" : "block"}`}
        id={sectionId ? `${sectionId}-content` : undefined}
        role={collapsible ? "region" : undefined}
        aria-labelledby={sectionId}
      >
        {children}
      </div>
    </div>
  )
}
