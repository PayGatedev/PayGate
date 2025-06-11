"use client"

import { useState, useRef, useEffect, type KeyboardEvent } from "react"
import { X, Plus, Info } from "lucide-react"

interface FormTagInputProps {
  label: string
  tags: string[]
  onChange: (tags: string[]) => void
  error?: string
  required?: boolean
  helperText?: string
  maxTags?: number
  placeholder?: string
  tooltip?: string
  validateTag?: (tag: string) => string | null
}

export default function FormTagInput({
  label,
  tags,
  onChange,
  error,
  required,
  helperText,
  maxTags = 10,
  placeholder = "Add a tag",
  tooltip,
  validateTag,
}: FormTagInputProps) {
  const [inputValue, setInputValue] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const [tagError, setTagError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const tagInputId = label.toLowerCase().replace(/\s+/g, "-")

  const validateAndAddTag = () => {
    if (!inputValue.trim()) return

    // Check if tag already exists
    if (tags.includes(inputValue.trim())) {
      setTagError("This tag already exists")
      return
    }

    // Check if max tags reached
    if (tags.length >= maxTags) {
      setTagError(`Maximum ${maxTags} tags allowed`)
      return
    }

    // Custom validation if provided
    if (validateTag) {
      const validationError = validateTag(inputValue.trim())
      if (validationError) {
        setTagError(validationError)
        return
      }
    }

    // Add tag
    onChange([...tags, inputValue.trim()])
    setInputValue("")
    setTagError(null)
  }

  const handleAddTag = () => {
    validateAndAddTag()
  }

  const handleRemoveTag = (tagToRemove: string) => {
    onChange(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      validateAndAddTag()
    } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      // Remove the last tag when backspace is pressed on empty input
      handleRemoveTag(tags[tags.length - 1])
    }
  }

  // Focus the input when clicking on the container
  const handleContainerClick = () => {
    inputRef.current?.focus()
  }

  // Clear error when input changes
  useEffect(() => {
    if (tagError) {
      setTagError(null)
    }
  }, [inputValue])

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <label htmlFor={tagInputId} className="block text-white/80 text-sm font-medium">
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

      <div
        className={`flex flex-wrap gap-2 p-2 bg-white/5 border ${
          error || tagError ? "border-red-500" : isFocused ? "border-[#FF3366]/50" : "border-white/10"
        } rounded-lg transition-all min-h-[42px]`}
        onClick={handleContainerClick}
      >
        {tags.map((tag) => (
          <div key={tag} className="flex items-center gap-1 bg-white/10 text-white/80 px-2 py-1 rounded-md text-xs">
            <span>{tag}</span>
            <button
              type="button"
              onClick={() => handleRemoveTag(tag)}
              className="text-white/60 hover:text-white/90"
              aria-label={`Remove tag ${tag}`}
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
        <div className="flex-1 min-w-[120px]">
          <div className="flex">
            <input
              ref={inputRef}
              type="text"
              id={tagInputId}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={tags.length === 0 ? placeholder : ""}
              className="flex-1 bg-transparent border-none p-0 text-white focus:outline-none text-sm"
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              disabled={tags.length >= maxTags}
              aria-invalid={error || tagError ? "true" : "false"}
              aria-describedby={
                error || tagError ? `${tagInputId}-error` : helperText ? `${tagInputId}-helper` : undefined
              }
            />
            {inputValue && (
              <button
                type="button"
                onClick={handleAddTag}
                disabled={tags.length >= maxTags}
                className={`ml-2 text-white/60 hover:text-white/90 transition-colors ${
                  tags.length >= maxTags ? "opacity-50 cursor-not-allowed" : ""
                }`}
                aria-label="Add tag"
              >
                <Plus className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-1">
        {(helperText || tagError || error) && (
          <p
            className={`text-xs ${tagError || error ? "text-red-500" : "text-white/40"}`}
            id={tagError || error ? `${tagInputId}-error` : `${tagInputId}-helper`}
          >
            {tagError || error || helperText}
          </p>
        )}
        <p className="text-white/40 text-xs ml-auto">
          {tags.length}/{maxTags}
        </p>
      </div>
    </div>
  )
}
