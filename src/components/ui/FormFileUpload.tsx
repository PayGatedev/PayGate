"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { Upload, X, File, ImageIcon, Info } from "lucide-react"

interface FormFileUploadProps {
  label: string
  onChange: (file: File | null) => void
  accept?: string
  maxSize?: number // in MB
  error?: string
  required?: boolean
  helperText?: string
  preview?: boolean
  previewUrl?: string
  onRemove?: () => void
  placeholder?: React.ReactNode
  tooltip?: string
  multiple?: boolean
}

export default function FormFileUpload({
  label,
  onChange,
  accept = "image/*",
  maxSize = 5, // 5MB default
  error,
  required,
  helperText,
  preview = true,
  previewUrl,
  onRemove,
  placeholder,
  tooltip,
  multiple = false,
}: FormFileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [fileError, setFileError] = useState<string | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(previewUrl || null)
  const [isDragging, setIsDragging] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)
  const [fileType, setFileType] = useState<string | null>(null)
  const dropZoneRef = useRef<HTMLDivElement>(null)
  const uploadId = label.toLowerCase().replace(/\s+/g, "-")

  useEffect(() => {
    if (previewUrl) {
      setPreviewImage(previewUrl)
    }
  }, [previewUrl])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    processFile(file)
  }

  const processFile = (file: File | null) => {
    if (file) {
      // Check file size
      if (file.size > maxSize * 1024 * 1024) {
        setFileError(`File size exceeds ${maxSize}MB limit`)
        return
      }

      setFileError(null)
      setFileName(file.name)
      setFileType(file.type)
      onChange(file)

      // Generate preview
      if (preview && file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (e) => {
          setPreviewImage(e.target?.result as string)
        }
        reader.readAsDataURL(file)
      }
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0])
    }
  }

  const handleRemove = () => {
    setPreviewImage(null)
    setFileName(null)
    setFileType(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    onChange(null)
    onRemove?.()
  }

  const getFileIcon = () => {
    if (!fileType) return <File className="w-6 h-6 text-white/40" />

    if (fileType.startsWith("image/")) {
      return <ImageIcon className="w-6 h-6 text-white/40" />
    }

    return <File className="w-6 h-6 text-white/40" />
  }

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <label htmlFor={uploadId} className="block text-white/80 text-sm font-medium">
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

      <div className="flex items-center gap-4">
        <div
          ref={dropZoneRef}
          className={`w-full h-32 rounded-lg border-2 border-dashed ${
            isDragging
              ? "border-[#FF3366]/40 bg-[#FF3366]/5"
              : isFocused
                ? "border-[#FF3366]/30 bg-white/5"
                : error || fileError
                  ? "border-red-500/30 bg-red-500/5"
                  : "border-white/20 hover:border-[#FF3366]/40 hover:bg-white/5"
          } flex flex-col items-center justify-center cursor-pointer transition-all`}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          tabIndex={0}
          role="button"
          aria-label={`Upload ${label}`}
          aria-describedby={error || fileError ? `${uploadId}-error` : helperText ? `${uploadId}-helper` : undefined}
        >
          <input
            type="file"
            id={uploadId}
            ref={fileInputRef}
            className="hidden"
            accept={accept}
            onChange={handleFileChange}
            multiple={multiple}
            aria-invalid={error || fileError ? "true" : "false"}
          />

          {fileName ? (
            <div className="flex flex-col items-center">
              {getFileIcon()}
              <span className="text-white/80 text-sm mt-2 max-w-[90%] truncate">{fileName}</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  handleRemove()
                }}
                className="mt-2 text-white/60 hover:text-white/90 transition-colors text-xs flex items-center"
              >
                <X className="w-3 h-3 mr-1" /> Remove
              </button>
            </div>
          ) : (
            <>
              <Upload className="w-6 h-6 text-white/40 mb-2" />
              <span className="text-white/60 text-sm text-center">Drag and drop or click to upload</span>
              <span className="text-white/40 text-xs mt-1">{accept.replace("*", "").replace(",", ", ")}</span>
            </>
          )}
        </div>

        {preview && previewImage && (
          <div className="relative w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
            <img src={previewImage || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-1 right-1 bg-black/50 rounded-full p-1 hover:bg-black/70 transition-colors"
              aria-label="Remove image"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        )}

        {preview && !previewImage && placeholder && <div className="flex-shrink-0">{placeholder}</div>}
      </div>

      {(helperText || fileError || error) && (
        <p
          className={`text-xs mt-2 ${fileError || error ? "text-red-500" : "text-white/40"}`}
          id={fileError || error ? `${uploadId}-error` : `${uploadId}-helper`}
        >
          {fileError || error || helperText}
        </p>
      )}
    </div>
  )
}
