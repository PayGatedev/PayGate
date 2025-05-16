"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { DashboardLayout } from "@/components/dashboard/layout"
import { ArrowLeft, FileText, Video, Headphones, BookOpen, Upload, Calendar, Users, Globe, Lock, Coins, CheckCircle, ChevronRight, ChevronDown, ChevronUp, Plus, X, Eye, Save, ImageIcon, LinkIcon, Code, AlignLeft, AlignCenter, AlignRight, Bold, Italic, Underline, List, ListOrdered, Info, AlertCircle, Sparkles } from 'lucide-react'

export default function CreateContentPage() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [contentType, setContentType] = useState<string | null>(null)
  const [accessType, setAccessType] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    thumbnailUrl: "",
    tags: [] as string[],
    price: "",
    publishDate: "",
    publishTime: "",
    isScheduled: false,
    isDraft: false,
    isPublic: true,
    allowComments: true,
    allowReactions: true,
    collaborators: [] as string[],
    seoTitle: "",
    seoDescription: "",
    seoKeywords: "",
  })
  const [currentTag, setCurrentTag] = useState("")
  const [currentCollaborator, setCurrentCollaborator] = useState("")
  const [showAdvancedSeo, setShowAdvancedSeo] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const steps = [
    { number: 1, title: "Content Type" },
    { number: 2, title: "Basic Info" },
    { number: 3, title: "Content" },
    { number: 4, title: "Access & Pricing" },
    { number: 5, title: "Publishing" },
  ]

  const handleStepChange = (step: number) => {
    if (
      step < currentStep ||
      (currentStep === 1 && contentType) ||
      (currentStep === 4 && accessType) ||
      currentStep < 5
    ) {
      setCurrentStep(step)
    }
  }

  const handleContentTypeSelect = (type: string) => {
    setContentType(type)
    setCurrentStep(2)
  }

  const handleAccessTypeSelect = (type: string) => {
    setAccessType(type)
    setCurrentStep(5)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleAddTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData((prev) => ({ ...prev, tags: [...prev.tags, currentTag.trim()] }))
      setCurrentTag("")
    }
  }

  const handleRemoveTag = (tag: string) => {
    setFormData((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== tag) }))
  }

  const handleAddCollaborator = () => {
    if (currentCollaborator.trim() && !formData.collaborators.includes(currentCollaborator.trim())) {
      setFormData((prev) => ({ ...prev, collaborators: [...prev.collaborators, currentCollaborator.trim()] }))
      setCurrentCollaborator("")
    }
  }

  const handleRemoveCollaborator = (collaborator: string) => {
    setFormData((prev) => ({ ...prev, collaborators: prev.collaborators.filter((c) => c !== collaborator) }))
  }

  const handleFileUpload = () => {
    fileInputRef.current?.click()
  }

  const handleSubmit = (isDraft = false) => {
    // Set draft status
    const finalData = { ...formData, isDraft }
    console.log("Submitting content:", finalData)

    // In a real app, you would send this data to your API
    // For now, we'll just redirect back to the content page
    navigate("/dashboard/content")
  }

  const handleCancel = () => {
    if (confirm("Are you sure you want to cancel? All your progress will be lost.")) {
      navigate("/dashboard/content")
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="animate-fade-in">
            <h2 className="text-xl font-semibold mb-6 text-white">What type of content are you creating?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => handleContentTypeSelect("article")}
                className={`glassmorphism-card p-6 rounded-xl border ${
                  contentType === "article"
                    ? "border-green-500/30 bg-gradient-to-br from-green-500/10 to-green-500/5 shadow-glow-sm"
                    : "border-white/10 hover:bg-white/5"
                } transition-all group text-left`}
              >
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500/30 to-green-500/10 flex items-center justify-center mr-4 group-hover:from-green-500/40 group-hover:to-green-500/20 transition-all">
                    <FileText className="w-6 h-6 text-green-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-white mb-1 group-hover:text-green-400 transition-colors">
                      Article
                    </h3>
                    <p className="text-white/60 text-sm">
                      Create a written article with rich text formatting, images, and embedded content.
                    </p>
                  </div>
                  {contentType === "article" && <CheckCircle className="w-5 h-5 text-green-500 ml-2 flex-shrink-0" />}
                </div>
              </button>

              <button
                onClick={() => handleContentTypeSelect("video")}
                className={`glassmorphism-card p-6 rounded-xl border ${
                  contentType === "video"
                    ? "border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-blue-500/5 shadow-glow-sm"
                    : "border-white/10 hover:bg-white/5"
                } transition-all group text-left`}
              >
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/30 to-blue-500/10 flex items-center justify-center mr-4 group-hover:from-blue-500/40 group-hover:to-blue-500/20 transition-all">
                    <Video className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-white mb-1 group-hover:text-blue-400 transition-colors">
                      Video
                    </h3>
                    <p className="text-white/60 text-sm">
                      Upload or link to video content with optional transcripts and chapters.
                    </p>
                  </div>
                  {contentType === "video" && <CheckCircle className="w-5 h-5 text-blue-500 ml-2 flex-shrink-0" />}
                </div>
              </button>

              <button
                onClick={() => handleContentTypeSelect("podcast")}
                className={`glassmorphism-card p-6 rounded-xl border ${
                  contentType === "podcast"
                    ? "border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-purple-500/5 shadow-glow-sm"
                    : "border-white/10 hover:bg-white/5"
                } transition-all group text-left`}
              >
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/30 to-purple-500/10 flex items-center justify-center mr-4 group-hover:from-purple-500/40 group-hover:to-purple-500/20 transition-all">
                    <Headphones className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-white mb-1 group-hover:text-purple-400 transition-colors">
                      Podcast
                    </h3>
                    <p className="text-white/60 text-sm">
                      Share audio content with show notes, episode details, and guest information.
                    </p>
                  </div>
                  {contentType === "podcast" && <CheckCircle className="w-5 h-5 text-purple-500 ml-2 flex-shrink-0" />}
                </div>
              </button>

              <button
                onClick={() => handleContentTypeSelect("guide")}
                className={`glassmorphism-card p-6 rounded-xl border ${
                  contentType === "guide"
                    ? "border-yellow-500/30 bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 shadow-glow-sm"
                    : "border-white/10 hover:bg-white/5"
                } transition-all group text-left`}
              >
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-500/30 to-yellow-500/10 flex items-center justify-center mr-4 group-hover:from-yellow-500/40 group-hover:to-yellow-500/20 transition-all">
                    <BookOpen className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-white mb-1 group-hover:text-yellow-400 transition-colors">
                      Guide
                    </h3>
                    <p className="text-white/60 text-sm">
                      Create a comprehensive guide with multiple sections, tutorials, and resources.
                    </p>
                  </div>
                  {contentType === "guide" && <CheckCircle className="w-5 h-5 text-yellow-500 ml-2 flex-shrink-0" />}
                </div>
              </button>
            </div>

            <div className="mt-8 glassmorphism-card p-4 rounded-xl border border-white/10 bg-gradient-to-r from-[#FF3366]/10 to-transparent">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-[#FF3366]/20 flex items-center justify-center mr-4">
                  <Sparkles className="w-5 h-5 text-[#FF3366]" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">AI-Assisted Content Creation</h4>
                  <p className="text-white/60 text-sm">
                    PayGate can help you create content faster with AI. Select a content type to get started, and you'll
                    see AI assistance options in the next steps.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="animate-fade-in">
            <h2 className="text-xl font-semibold mb-6 text-white">Basic Information</h2>

            <div className="glassmorphism-card p-6 rounded-xl border border-white/10 mb-6">
              <div className="mb-4">
                <label htmlFor="title" className="block text-white/80 mb-2 text-sm font-medium">
                  Title <span className="text-[#FF3366]">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter a compelling title"
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#FF3366]/30 focus:bg-white/10 transition-all"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="block text-white/80 mb-2 text-sm font-medium">
                  Description <span className="text-[#FF3366]">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Provide a brief description of your content"
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#FF3366]/30 focus:bg-white/10 transition-all min-h-[100px]"
                  required
                />
                <p className="text-white/40 text-xs mt-1">
                  {formData.description.length}/300 characters (recommended: 150-300)
                </p>
              </div>

              <div className="mb-4">
                <label className="block text-white/80 mb-2 text-sm font-medium">
                  Thumbnail <span className="text-white/40">(Recommended)</span>
                </label>
                <div className="flex items-center gap-4">
                  <div
                    className="w-32 h-32 rounded-lg border-2 border-dashed border-white/20 flex flex-col items-center justify-center cursor-pointer hover:border-[#FF3366]/40 hover:bg-white/5 transition-all"
                    onClick={handleFileUpload}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        // In a real app, you would handle file upload here
                        console.log("File selected:", e.target.files?.[0])
                      }}
                    />
                    <Upload className="w-6 h-6 text-white/40 mb-2" />
                    <span className="text-white/40 text-xs text-center">Click to upload</span>
                  </div>

                  {/* SVG Placeholder for thumbnail preview */}
                  <div className="w-32 h-32 rounded-lg bg-gradient-to-br from-[#161921] to-[#0F1116] flex items-center justify-center overflow-hidden">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FF3366]/20 to-[#FF3366]/5 flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-[#FF3366]/60" />
                    </div>
                  </div>
                </div>
                <p className="text-white/40 text-xs mt-2">Recommended size: 1280x720px (16:9 ratio). Max size: 5MB.</p>
              </div>

              <div className="mb-4">
                <label className="block text-white/80 mb-2 text-sm font-medium">Tags</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.tags.map((tag) => (
                    <div
                      key={tag}
                      className="flex items-center gap-1 bg-white/10 text-white/80 px-2 py-1 rounded-md text-xs"
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="text-white/60 hover:text-white/90"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex">
                  <input
                    type="text"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    placeholder="Add a tag"
                    className="flex-1 bg-white/5 border border-white/10 rounded-l-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#FF3366]/30 focus:bg-white/10 transition-all"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleAddTag()
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="bg-white/10 hover:bg-white/20 text-white px-4 rounded-r-lg transition-all"
                  >
                    Add
                  </button>
                </div>
                <p className="text-white/40 text-xs mt-1">Add up to 10 tags to help users discover your content</p>
              </div>
            </div>

            <div className="glassmorphism-card p-6 rounded-xl border border-white/10 mb-6">
              <h3 className="text-white font-medium mb-4 flex items-center">
                <Users className="w-4 h-4 mr-2" />
                Collaborators <span className="text-white/40 text-sm ml-2">(Optional)</span>
              </h3>

              <div className="mb-4">
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.collaborators.map((collaborator) => (
                    <div
                      key={collaborator}
                      className="flex items-center gap-1 bg-white/10 text-white/80 px-2 py-1 rounded-md text-xs"
                    >
                      <span>{collaborator}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveCollaborator(collaborator)}
                        className="text-white/60 hover:text-white/90"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex">
                  <input
                    type="text"
                    value={currentCollaborator}
                    onChange={(e) => setCurrentCollaborator(e.target.value)}
                    placeholder="Enter wallet address or username"
                    className="flex-1 bg-white/5 border border-white/10 rounded-l-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#FF3366]/30 focus:bg-white/10 transition-all"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleAddCollaborator()
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddCollaborator}
                    className="bg-white/10 hover:bg-white/20 text-white px-4 rounded-r-lg transition-all"
                  >
                    Add
                  </button>
                </div>
                <p className="text-white/40 text-xs mt-1">
                  Add collaborators who will receive a share of earnings from this content
                </p>
              </div>
            </div>

            <div className="glassmorphism-card p-6 rounded-xl border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-medium flex items-center">
                  <Globe className="w-4 h-4 mr-2" />
                  SEO Settings <span className="text-white/40 text-sm ml-2">(Recommended)</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setShowAdvancedSeo(!showAdvancedSeo)}
                  className="text-white/60 hover:text-white flex items-center text-sm"
                >
                  {showAdvancedSeo ? (
                    <>
                      <ChevronUp className="w-4 h-4 mr-1" /> Hide Advanced
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4 mr-1" /> Show Advanced
                    </>
                  )}
                </button>
              </div>

              <div className="mb-4">
                <label htmlFor="seoTitle" className="block text-white/80 mb-2 text-sm font-medium">
                  SEO Title
                </label>
                <input
                  type="text"
                  id="seoTitle"
                  name="seoTitle"
                  value={formData.seoTitle}
                  onChange={handleInputChange}
                  placeholder="Enter SEO title (defaults to content title if empty)"
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#FF3366]/30 focus:bg-white/10 transition-all"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="seoDescription" className="block text-white/80 mb-2 text-sm font-medium">
                  SEO Description
                </label>
                <textarea
                  id="seoDescription"
                  name="seoDescription"
                  value={formData.seoDescription}
                  onChange={handleInputChange}
                  placeholder="Enter SEO description (defaults to content description if empty)"
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#FF3366]/30 focus:bg-white/10 transition-all min-h-[80px]"
                />
              </div>

              {showAdvancedSeo && (
                <div className="mb-4">
                  <label htmlFor="seoKeywords" className="block text-white/80 mb-2 text-sm font-medium">
                    SEO Keywords
                  </label>
                  <input
                    type="text"
                    id="seoKeywords"
                    name="seoKeywords"
                    value={formData.seoKeywords}
                    onChange={handleInputChange}
                    placeholder="Enter comma-separated keywords"
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#FF3366]/30 focus:bg-white/10 transition-all"
                  />
                </div>
              )}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">Content Editor</h2>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPreviewMode(!previewMode)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm ${
                    previewMode
                      ? "bg-[#FF3366]/20 text-[#FF3366] border border-[#FF3366]/30"
                      : "bg-white/5 text-white/80 border border-white/10 hover:bg-white/10"
                  }`}
                >
                  <Eye className="w-4 h-4" />
                  {previewMode ? "Exit Preview" : "Preview"}
                </button>
                <button
                  type="button"
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm bg-white/5 text-white/80 border border-white/10 hover:bg-white/10"
                >
                  <Save className="w-4 h-4" />
                  Save Draft
                </button>
              </div>
            </div>

            {previewMode ? (
              <div className="glassmorphism-card p-6 rounded-xl border border-white/10 mb-6 min-h-[400px]">
                <div className="prose prose-invert max-w-none">
                  <h1>{formData.title || "Your Content Title"}</h1>
                  <p className="text-white/60">
                    {formData.description || "Your content description will appear here."}
                  </p>
                  <div className="my-4 border-t border-white/10"></div>
                  {formData.content ? (
                    <div dangerouslySetInnerHTML={{ __html: formData.content }} />
                  ) : (
                    <p className="text-white/40 italic">
                      Your content will be displayed here. Start writing to see a preview.
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <>
                <div className="glassmorphism-card p-4 rounded-xl border border-white/10 mb-4">
                  <div className="flex flex-wrap gap-2">
                    <button className="p-2 rounded hover:bg-white/10 text-white/80 transition-all">
                      <Bold className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded hover:bg-white/10 text-white/80 transition-all">
                      <Italic className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded hover:bg-white/10 text-white/80 transition-all">
                      <Underline className="w-4 h-4" />
                    </button>
                    <div className="w-px h-6 bg-white/10 mx-1"></div>
                    <button className="p-2 rounded hover:bg-white/10 text-white/80 transition-all">
                      <AlignLeft className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded hover:bg-white/10 text-white/80 transition-all">
                      <AlignCenter className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded hover:bg-white/10 text-white/80 transition-all">
                      <AlignRight className="w-4 h-4" />
                    </button>
                    <div className="w-px h-6 bg-white/10 mx-1"></div>
                    <button className="p-2 rounded hover:bg-white/10 text-white/80 transition-all">
                      <List className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded hover:bg-white/10 text-white/80 transition-all">
                      <ListOrdered className="w-4 h-4" />
                    </button>
                    <div className="w-px h-6 bg-white/10 mx-1"></div>
                    <button className="p-2 rounded hover:bg-white/10 text-white/80 transition-all">
                      <LinkIcon className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded hover:bg-white/10 text-white/80 transition-all">
                      <ImageIcon className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded hover:bg-white/10 text-white/80 transition-all">
                      <Code className="w-4 h-4" />
                    </button>
                    <div className="flex-1"></div>
                    <button className="flex items-center gap-1 px-3 py-1 rounded-lg bg-gradient-to-r from-[#FF3366]/20 to-[#FF3366]/5 text-[#FF3366] border border-[#FF3366]/20 text-sm">
                      <Sparkles className="w-4 h-4" />
                      AI Assist
                    </button>
                  </div>
                </div>

                <div className="glassmorphism-card p-6 rounded-xl border border-white/10 mb-6">
                  <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    placeholder={
                      contentType === "article"
                        ? "Start writing your article here..."
                        : contentType === "video"
                          ? "Add video description, transcript, or notes here..."
                          : contentType === "podcast"
                            ? "Add podcast show notes, transcript, or episode details here..."
                            : "Start writing your guide content here..."
                    }
                    className="w-full bg-transparent border-none outline-none text-white min-h-[400px] resize-y"
                  />
                </div>

                {(contentType === "video" || contentType === "podcast") && (
                  <div className="glassmorphism-card p-6 rounded-xl border border-white/10 mb-6">
                    <h3 className="text-white font-medium mb-4 flex items-center">
                      <Upload className="w-4 h-4 mr-2" />
                      {contentType === "video" ? "Video Upload" : "Audio Upload"}
                    </h3>

                    <div
                      className="border-2 border-dashed border-white/20 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-[#FF3366]/40 hover:bg-white/5 transition-all"
                      onClick={handleFileUpload}
                    >
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FF3366]/20 to-[#FF3366]/5 flex items-center justify-center mb-4">
                        <Upload className="w-8 h-8 text-[#FF3366]/60" />
                      </div>
                      <h4 className="text-white font-medium mb-2">
                        {contentType === "video" ? "Upload Video File" : "Upload Audio File"}
                      </h4>
                      <p className="text-white/60 text-sm text-center mb-4">
                        {contentType === "video"
                          ? "Drag and drop your video file here, or click to browse"
                          : "Drag and drop your audio file here, or click to browse"}
                      </p>
                      <p className="text-white/40 text-xs text-center">
                        {contentType === "video"
                          ? "Supported formats: MP4, WebM, MOV (Max size: 2GB)"
                          : "Supported formats: MP3, WAV, M4A (Max size: 500MB)"}
                      </p>
                    </div>

                    <div className="mt-4">
                      <label className="block text-white/80 mb-2 text-sm font-medium">Or add a link</label>
                      <div className="flex">
                        <input
                          type="text"
                          placeholder={
                            contentType === "video"
                              ? "Enter YouTube, Vimeo, or other video URL"
                              : "Enter SoundCloud, Spotify, or other audio URL"
                          }
                          className="flex-1 bg-white/5 border border-white/10 rounded-l-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#FF3366]/30 focus:bg-white/10 transition-all"
                        />
                        <button
                          type="button"
                          className="bg-white/10 hover:bg-white/20 text-white px-4 rounded-r-lg transition-all"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {contentType === "guide" && (
                  <div className="glassmorphism-card p-6 rounded-xl border border-white/10 mb-6">
                    <h3 className="text-white font-medium mb-4 flex items-center">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Guide Sections
                    </h3>

                    <div className="space-y-4">
                      <div className="p-4 border border-white/10 rounded-lg bg-white/5">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-white font-medium">Section 1: Introduction</h4>
                          <div className="flex items-center gap-2">
                            <button className="p-1 rounded hover:bg-white/10 text-white/60 transition-all">
                              <ChevronUp className="w-4 h-4" />
                            </button>
                            <button className="p-1 rounded hover:bg-white/10 text-white/60 transition-all">
                              <ChevronDown className="w-4 h-4" />
                            </button>
                            <button className="p-1 rounded hover:bg-white/10 text-white/60 transition-all">
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <p className="text-white/60 text-sm">Introduction to the guide topic</p>
                      </div>

                      <div className="p-4 border border-white/10 rounded-lg bg-white/5">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-white font-medium">Section 2: Getting Started</h4>
                          <div className="flex items-center gap-2">
                            <button className="p-1 rounded hover:bg-white/10 text-white/60 transition-all">
                              <ChevronUp className="w-4 h-4" />
                            </button>
                            <button className="p-1 rounded hover:bg-white/10 text-white/60 transition-all">
                              <ChevronDown className="w-4 h-4" />
                            </button>
                            <button className="p-1 rounded hover:bg-white/10 text-white/60 transition-all">
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <p className="text-white/60 text-sm">Basic setup and prerequisites</p>
                      </div>

                      <button
                        type="button"
                        className="flex items-center justify-center gap-2 w-full p-3 border border-dashed border-white/20 rounded-lg text-white/60 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add New Section</span>
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}

            <div className="glassmorphism-card p-6 rounded-xl border border-white/10 bg-gradient-to-r from-[#FF3366]/10 to-transparent">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-[#FF3366]/20 flex items-center justify-center mr-4">
                  <Info className="w-5 h-5 text-[#FF3366]" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Content Tips</h4>
                  <p className="text-white/60 text-sm mb-2">
                    {contentType === "article"
                      ? "Articles with images and clear headings tend to get more engagement."
                      : contentType === "video"
                        ? "Add timestamps in your description to help viewers navigate your video."
                        : contentType === "podcast"
                          ? "Include show notes with links and resources mentioned in your podcast."
                          : "Break your guide into clear sections with actionable steps."}
                  </p>
                  <a href="#" className="text-[#FF3366] text-sm hover:underline flex items-center">
                    Learn more about creating great content
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="animate-fade-in">
            <h2 className="text-xl font-semibold mb-6 text-white">Access & Pricing</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => handleAccessTypeSelect("free")}
                className={`glassmorphism-card p-6 rounded-xl border ${
                  accessType === "free"
                    ? "border-green-500/30 bg-gradient-to-br from-green-500/10 to-green-500/5 shadow-glow-sm"
                    : "border-white/10 hover:bg-white/5"
                } transition-all group text-left`}
              >
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500/30 to-green-500/10 flex items-center justify-center mr-4 group-hover:from-green-500/40 group-hover:to-green-500/20 transition-all">
                    <Globe className="w-6 h-6 text-green-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-white mb-1 group-hover:text-green-400 transition-colors">
                      Free Access
                    </h3>
                    <p className="text-white/60 text-sm">Make your content available to everyone for free.</p>
                  </div>
                  {accessType === "free" && <CheckCircle className="w-5 h-5 text-green-500 ml-2 flex-shrink-0" />}
                </div>
              </button>

              <button
                onClick={() => handleAccessTypeSelect("one-time")}
                className={`glassmorphism-card p-6 rounded-xl border ${
                  accessType === "one-time"
                    ? "border-yellow-500/30 bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 shadow-glow-sm"
                    : "border-white/10 hover:bg-white/5"
                } transition-all group text-left`}
              >
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-500/30 to-yellow-500/10 flex items-center justify-center mr-4 group-hover:from-yellow-500/40 group-hover:to-yellow-500/20 transition-all">
                    <Coins className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-white mb-1 group-hover:text-yellow-400 transition-colors">
                      One-Time Purchase
                    </h3>
                    <p className="text-white/60 text-sm">Charge a one-time fee for access to this content.</p>
                  </div>
                  {accessType === "one-time" && <CheckCircle className="w-5 h-5 text-yellow-500 ml-2 flex-shrink-0" />}
                </div>
              </button>

              <button
                onClick={() => handleAccessTypeSelect("recurring")}
                className={`glassmorphism-card p-6 rounded-xl border ${
                  accessType === "recurring"
                    ? "border-[#FF3366]/30 bg-gradient-to-br from-[#FF3366]/10 to-[#FF3366]/5 shadow-glow-sm"
                    : "border-white/10 hover:bg-white/5"
                } transition-all group text-left`}
              >
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#FF3366]/30 to-[#FF3366]/10 flex items-center justify-center mr-4 group-hover:from-[#FF3366]/40 group-hover:to-[#FF3366]/20 transition-all">
                    <Calendar className="w-6 h-6 text-[#FF3366]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-white mb-1 group-hover:text-[#FF3366] transition-colors">
                      Subscription Only
                    </h3>
                    <p className="text-white/60 text-sm">Make this content available only to your subscribers.</p>
                  </div>
                  {accessType === "recurring" && <CheckCircle className="w-5 h-5 text-[#FF3366] ml-2 flex-shrink-0" />}
                </div>
              </button>

              <button
                onClick={() => handleAccessTypeSelect("nft")}
                className={`glassmorphism-card p-6 rounded-xl border ${
                  accessType === "nft"
                    ? "border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-purple-500/5 shadow-glow-sm"
                    : "border-white/10 hover:bg-white/5"
                } transition-all group text-left`}
              >
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/30 to-purple-500/10 flex items-center justify-center mr-4 group-hover:from-purple-500/40 group-hover:to-purple-500/20 transition-all">
                    <Lock className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-white mb-1 group-hover:text-purple-400 transition-colors">
                      NFT Access Pass
                    </h3>
                    <p className="text-white/60 text-sm">Require users to hold your NFT to access this content.</p>
                  </div>
                  {accessType === "nft" && <CheckCircle className="w-5 h-5 text-purple-500 ml-2 flex-shrink-0" />}
                </div>
              </button>
            </div>

            {accessType === "one-time" && (
              <div className="glassmorphism-card p-6 rounded-xl border border-white/10 mb-6">
                <h3 className="text-white font-medium mb-4">One-Time Purchase Settings</h3>

                <div className="mb-4">
                  <label htmlFor="price" className="block text-white/80 mb-2 text-sm font-medium">
                    Price (SOL) <span className="text-[#FF3366]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-[#FF3366]/30 focus:bg-white/10 transition-all"
                      required
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-white/60">◎</span>
                    </div>
                  </div>
                  <p className="text-white/40 text-xs mt-1">Minimum price: 0.01 SOL</p>
                </div>

                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    id="allowComments"
                    name="allowComments"
                    checked={formData.allowComments}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 bg-white/5 border border-white/10 rounded focus:ring-[#FF3366]/30 text-[#FF3366]"
                  />
                  <label htmlFor="allowComments" className="ml-2 text-white/80 text-sm">
                    Allow comments on this content
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="allowReactions"
                    name="allowReactions"
                    checked={formData.allowReactions}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 bg-white/5 border border-white/10 rounded focus:ring-[#FF3366]/30 text-[#FF3366]"
                  />
                  <label htmlFor="allowReactions" className="ml-2 text-white/80 text-sm">
                    Allow reactions (likes) on this content
                  </label>
                </div>
              </div>
            )}

            {accessType === "recurring" && (
              <div className="glassmorphism-card p-6 rounded-xl border border-white/10 mb-6">
                <h3 className="text-white font-medium mb-4">Subscription Settings</h3>

                <div className="p-4 border border-white/10 rounded-lg bg-white/5 mb-4">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-[#FF3366]/20 flex items-center justify-center mr-4">
                      <Info className="w-5 h-5 text-[#FF3366]" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Subscription Tiers</h4>
                      <p className="text-white/60 text-sm">
                        This content will be available to subscribers of the following tiers:
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border border-white/10 rounded-lg bg-white/5">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="tier1"
                        checked={true}
                        className="w-4 h-4 bg-white/5 border border-white/10 rounded focus:ring-[#FF3366]/30 text-[#FF3366]"
                      />
                      <label htmlFor="tier1" className="ml-2 text-white/80 text-sm">
                        Basic Tier (◎ 0.1/month)
                      </label>
                    </div>
                    <span className="text-white/40 text-xs">10 subscribers</span>
                  </div>

                  <div className="flex items-center justify-between p-3 border border-white/10 rounded-lg bg-white/5">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="tier2"
                        checked={true}
                        className="w-4 h-4 bg-white/5 border border-white/10 rounded focus:ring-[#FF3366]/30 text-[#FF3366]"
                      />
                      <label htmlFor="tier2" className="ml-2 text-white/80 text-sm">
                        Premium Tier (◎ 0.5/month)
                      </label>
                    </div>
                    <span className="text-white/40 text-xs">5 subscribers</span>
                  </div>

                  <div className="flex items-center justify-between p-3 border border-white/10 rounded-lg bg-white/5">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="tier3"
                        checked={true}
                        className="w-4 h-4 bg-white/5 border border-white/10 rounded focus:ring-[#FF3366]/30 text-[#FF3366]"
                      />
                      <label htmlFor="tier3" className="ml-2 text-white/80 text-sm">
                        VIP Tier (◎ 1.0/month)
                      </label>
                    </div>
                    <span className="text-white/40 text-xs">2 subscribers</span>
                  </div>
                </div>

                <div className="mt-4">
                  <a href="#" className="text-[#FF3366] text-sm hover:underline flex items-center">
                    Manage subscription tiers
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </div>
            )}

            {accessType === "nft" && (
              <div className="glassmorphism-card p-6 rounded-xl border border-white/10 mb-6">
                <h3 className="text-white font-medium mb-4">NFT Access Settings</h3>

                <div className="mb-4">
                  <label className="block text-white/80 mb-2 text-sm font-medium">Required NFT Collection</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#FF3366]/30 focus:bg-white/10 transition-all">
                    <option value="collection1">PayGate Creator Pass (Default)</option>
                    <option value="collection2">Early Supporter Collection</option>
                    <option value="collection3">VIP Member Collection</option>
                  </select>
                  <p className="text-white/40 text-xs mt-1">
                    Users must hold at least one NFT from this collection to access the content
                  </p>
                </div>

                <div className="p-4 border border-white/10 rounded-lg bg-white/5 mb-4">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mr-4">
                      <Info className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">NFT Gating</h4>
                      <p className="text-white/60 text-sm">
                        Users will need to connect their wallet and verify NFT ownership to access this content.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="allowSnapshot"
                    checked={true}
                    className="w-4 h-4 bg-white/5 border border-white/10 rounded focus:ring-[#FF3366]/30 text-[#FF3366]"
                  />
                  <label htmlFor="allowSnapshot" className="ml-2 text-white/80 text-sm">
                    Use snapshot verification (faster but less secure)
                  </label>
                </div>
              </div>
            )}

            <div className="glassmorphism-card p-6 rounded-xl border border-white/10">
              <h3 className="text-white font-medium mb-4">Privacy Settings</h3>

              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="public"
                    name="isPublic"
                    checked={formData.isPublic}
                    onChange={() => setFormData((prev) => ({ ...prev, isPublic: true }))}
                    className="w-4 h-4 bg-white/5 border border-white/10 rounded-full focus:ring-[#FF3366]/30 text-[#FF3366]"
                  />
                  <label htmlFor="public" className="ml-2 text-white/80 text-sm">
                    Public - Discoverable in search and recommendations
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="radio"
                    id="private"
                    name="isPublic"
                    checked={!formData.isPublic}
                    onChange={() => setFormData((prev) => ({ ...prev, isPublic: false }))}
                    className="w-4 h-4 bg-white/5 border border-white/10 rounded-full focus:ring-[#FF3366]/30 text-[#FF3366]"
                  />
                  <label htmlFor="private" className="ml-2 text-white/80 text-sm">
                    Private - Only accessible via direct link
                  </label>
                </div>
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="animate-fade-in">
            <h2 className="text-xl font-semibold mb-6 text-white">Publishing Options</h2>

            <div className="glassmorphism-card p-6 rounded-xl border border-white/10 mb-6">
              <div className="flex items-center mb-4">
                <input
                  type="radio"
                  id="publishNow"
                  name="isScheduled"
                  checked={!formData.isScheduled}
                  onChange={() => setFormData((prev) => ({ ...prev, isScheduled: false }))}
                  className="w-4 h-4 bg-white/5 border border-white/10 rounded-full focus:ring-[#FF3366]/30 text-[#FF3366]"
                />
                <label htmlFor="publishNow" className="ml-2 text-white/80 text-sm font-medium">
                  Publish immediately
                </label>
              </div>

              <div className="flex items-center mb-4">
                <input
                  type="radio"
                  id="schedulePublish"
                  name="isScheduled"
                  checked={formData.isScheduled}
                  onChange={() => setFormData((prev) => ({ ...prev, isScheduled: true }))}
                  className="w-4 h-4 bg-white/5 border border-white/10 rounded-full focus:ring-[#FF3366]/30 text-[#FF3366]"
                />
                <label htmlFor="schedulePublish" className="ml-2 text-white/80 text-sm font-medium">
                  Schedule for later
                </label>
              </div>

              {formData.isScheduled && (
                <div className="ml-6 mt-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="publishDate" className="block text-white/80 mb-2 text-sm">
                        Publication Date
                      </label>
                      <input
                        type="date"
                        id="publishDate"
                        name="publishDate"
                        value={formData.publishDate}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#FF3366]/30 focus:bg-white/10 transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="publishTime" className="block text-white/80 mb-2 text-sm">
                        Publication Time
                      </label>
                      <input
                        type="time"
                        id="publishTime"
                        name="publishTime"
                        value={formData.publishTime}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#FF3366]/30 focus:bg-white/10 transition-all"
                      />
                    </div>
                  </div>
                  <p className="text-white/40 text-xs">
                    Your content will be automatically published at the specified date and time.
                  </p>
                </div>
              )}
            </div>

            <div className="glassmorphism-card p-6 rounded-xl border border-white/10 mb-6">
              <h3 className="text-white font-medium mb-4">Content Summary</h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-white/10">
                  <span className="text-white/60">Content Type</span>
                  <span className="text-white font-medium capitalize">{contentType}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-white/10">
                  <span className="text-white/60">Title</span>
                  <span className="text-white font-medium">{formData.title || "Not set"}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-white/10">
                  <span className="text-white/60">Access Type</span>
                  <span className="text-white font-medium capitalize">{accessType}</span>
                </div>
                {accessType === "one-time" && (
                  <div className="flex justify-between items-center pb-2 border-b border-white/10">
                    <span className="text-white/60">Price</span>
                    <span className="text-white font-medium">◎ {formData.price || "0.00"}</span>
                  </div>
                )}
                <div className="flex justify-between items-center pb-2 border-b border-white/10">
                  <span className="text-white/60">Visibility</span>
                  <span className="text-white font-medium">{formData.isPublic ? "Public" : "Private"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/60">Publication</span>
                  <span className="text-white font-medium">
                    {formData.isScheduled
                      ? `Scheduled for ${formData.publishDate} at ${formData.publishTime}`
                      : "Immediate"}
                  </span>
                </div>
              </div>
            </div>

            <div className="glassmorphism-card p-6 rounded-xl border border-white/10 bg-gradient-to-r from-[#FF3366]/10 to-transparent mb-6">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-[#FF3366]/20 flex items-center justify-center mr-4">
                  <AlertCircle className="w-5 h-5 text-[#FF3366]" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Before You Publish</h4>
                  <p className="text-white/60 text-sm mb-2">
                    Please review your content carefully before publishing. Once published, your content will be visible
                    to users based on your access settings.
                  </p>
                  <ul className="text-white/60 text-sm list-disc list-inside space-y-1">
                    <li>Ensure your content follows our community guidelines</li>
                    <li>Check for any spelling or grammatical errors</li>
                    <li>Verify that all links and embedded media work correctly</li>
                    <li>Confirm your pricing and access settings are correct</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 justify-end">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 rounded-lg border border-white/10 text-white/80 hover:bg-white/5 transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleSubmit(true)}
                className="px-6 py-2 rounded-lg border border-white/10 text-white/80 hover:bg-white/5 transition-all"
              >
                Save as Draft
              </button>
              <button
                type="button"
                onClick={() => handleSubmit(false)}
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#FF3366] to-[#FF3366]/80 hover:from-[#FF3366]/90 hover:to-[#FF3366]/70 text-white transition-all shadow-glow-sm"
              >
                {formData.isScheduled ? "Schedule Publication" : "Publish Now"}
              </button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <DashboardLayout>
      <div className="mb-6 flex items-center">
        <button
          onClick={() => navigate("/dashboard/content")}
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Content</span>
        </button>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent ml-6">
          Create New Content
        </h1>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step) => (
            <div
              key={step.number}
              className={`flex flex-col items-center ${
                step.number < currentStep ? "cursor-pointer" : step.number === currentStep ? "" : "opacity-50"
              }`}
              onClick={() => handleStepChange(step.number)}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  step.number < currentStep
                    ? "bg-gradient-to-r from-green-500/20 to-green-500/10 text-green-400 border border-green-500/30"
                    : step.number === currentStep
                      ? "bg-gradient-to-r from-[#FF3366]/20 to-[#FF3366]/10 text-[#FF3366] border border-[#FF3366]/30"
                      : "bg-white/5 text-white/40 border border-white/10"
                }`}
              >
                {step.number < currentStep ? <CheckCircle className="w-5 h-5" /> : <span>{step.number}</span>}
              </div>
              <span className={`text-sm ${step.number === currentStep ? "text-white font-medium" : "text-white/60"}`}>
                {step.title}
              </span>
            </div>
          ))}
        </div>
        <div className="relative mt-4">
          <div className="absolute top-0 left-0 h-1 bg-white/10 w-full rounded-full"></div>
          <div
            className="absolute top-0 left-0 h-1 bg-gradient-to-r from-[#FF3366] to-[#FF3366]/50 rounded-full transition-all"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Step Content */}
      {renderStepContent()}
    </DashboardLayout>
  )
}
