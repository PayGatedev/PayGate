"use client"

import type React from "react"

import { useState, useRef } from "react"
import {
  ArrowLeft,
  BookOpen,
  Upload,
  Eye,
  Save,
  Calendar,
  Globe,
  Lock,
  AlertCircle,
  Users,
  X,
  CheckCircle,
  Coins,
  Plus,
  ChevronUp,
  ChevronDown,
  FileText,
  LinkIcon,
  ImageIcon,
  Sparkles,
} from "lucide-react"
import RichTextEditor from "../ui/RichTextEditor"

interface GuideFormProps {
  onBack: () => void
}

export default function GuideForm({ onBack }: GuideFormProps) {
  const [previewMode, setPreviewMode] = useState(true)
  const [currentStep, setCurrentStep] = useState(1)
  const [currentTag, setCurrentTag] = useState("")
  const [currentCollaborator, setCurrentCollaborator] = useState("")
  const [showAdvancedSeo, setShowAdvancedSeo] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    thumbnailUrl: "",
    tags: [] as string[],
    collaborators: [] as string[],
    seoTitle: "",
    seoDescription: "",
    seoKeywords: "",
    isPublic: true,
    allowComments: true,
    allowReactions: true,
    accessType: "free",
    price: "",
    isScheduled: false,
    publishDate: "",
    publishTime: "",
    isDraft: false,
    sections: [
      { title: "Introduction", content: "" },
      { title: "Getting Started", content: "" },
    ],
  })

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

  const handleThumbnailUpload = () => {
    fileInputRef.current?.click()
  }

  const handleAccessTypeChange = (type: string) => {
    setFormData((prev) => ({ ...prev, accessType: type }))
  }

  const handleAddSection = () => {
    setFormData((prev) => ({
      ...prev,
      sections: [...prev.sections, { title: "New Section", content: "" }],
    }))
  }

  const handleUpdateSectionTitle = (index: number, value: string) => {
    const updatedSections = [...formData.sections]
    updatedSections[index].title = value
    setFormData((prev) => ({ ...prev, sections: updatedSections }))
  }

  const handleUpdateSectionContent = (index: number, value: string) => {
    const updatedSections = [...formData.sections]
    updatedSections[index].content = value
    setFormData((prev) => ({ ...prev, sections: updatedSections }))
  }

  const handleRemoveSection = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index),
    }))
  }

  const handleMoveSectionUp = (index: number) => {
    if (index === 0) return
    const updatedSections = [...formData.sections]
    const temp = updatedSections[index]
    updatedSections[index] = updatedSections[index - 1]
    updatedSections[index - 1] = temp
    setFormData((prev) => ({ ...prev, sections: updatedSections }))
  }

  const handleMoveSectionDown = (index: number) => {
    if (index === formData.sections.length - 1) return
    const updatedSections = [...formData.sections]
    const temp = updatedSections[index]
    updatedSections[index] = updatedSections[index + 1]
    updatedSections[index + 1] = temp
    setFormData((prev) => ({ ...prev, sections: updatedSections }))
  }

  const handleSubmit = (isDraft = false) => {
    // Set draft status
    const finalData = { ...formData, isDraft }
    console.log("Submitting guide:", finalData)

    // In a real app, you would send this data to your API
    // For now, we'll just redirect back to the content page
    window.location.href = "/dashboard/content"
  }

  const handleCancel = () => {
    if (confirm("Are you sure you want to cancel? All your progress will be lost.")) {
      window.location.href = "/dashboard/content"
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="animate-fade-in">
            <h2 className="text-xl font-semibold mb-6 text-white">Basic Information</h2>

            <div className="glassmorphism-card p-6 rounded-xl border border-white/10 mb-6">
              <div className="mb-4">
                <label htmlFor="title" className="block text-white/80 mb-2 text-sm font-medium">
                  Guide Title <span className="text-[#FF3366]">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter a descriptive title for your guide"
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
                  placeholder="Provide a brief overview of what this guide covers"
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#FF3366]/30 focus:bg-white/10 transition-all min-h-[100px]"
                  required
                />
                <p className="text-white/40 text-xs mt-1">
                  {formData.description.length}/300 characters (recommended: 150-300)
                </p>
              </div>

              <div className="mb-4">
                <label className="block text-white/80 mb-2 text-sm font-medium">
                  Cover Image <span className="text-white/40">(Recommended)</span>
                </label>
                <div className="flex items-center gap-4">
                  <div
                    className="w-32 h-32 rounded-lg border-2 border-dashed border-white/20 flex flex-col items-center justify-center cursor-pointer hover:border-[#FF3366]/40 hover:bg-white/5 transition-all"
                    onClick={handleThumbnailUpload}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        // In a real app, you would handle file upload here
                        console.log("Thumbnail selected:", e.target.files?.[0])
                      }}
                    />
                    <Upload className="w-6 h-6 text-white/40 mb-2" />
                    <span className="text-white/40 text-xs text-center">Click to upload</span>
                  </div>

                  {/* SVG Placeholder for thumbnail preview */}
                  <div className="w-32 h-32 rounded-lg bg-gradient-to-br from-[#161921] to-[#0F1116] flex items-center justify-center overflow-hidden">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 flex items-center justify-center">
                      <BookOpen className="w-8 h-8 text-yellow-400/60" />
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
                <p className="text-white/40 text-xs mt-1">Add up to 10 tags to help users discover your guide</p>
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
                  {showAdvancedSeo ? "Hide Advanced" : "Show Advanced"}
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
                  placeholder="Enter SEO title (defaults to guide title if empty)"
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
                  placeholder="Enter SEO description (defaults to guide description if empty)"
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

      case 2:
        return (
          <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">Guide Content</h2>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPreviewMode(!previewMode)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm ${
                    previewMode
                      ? "bg-yellow-500/20 text-yellow-500 border border-yellow-500/30"
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
              <div className="glassmorphism-card p-6 rounded-xl border border-white/10 mb-6">
                <div className="prose prose-invert max-w-none">
                  <h1>{formData.title || "Your Guide Title"}</h1>
                  <p className="text-white/60">{formData.description || "Your guide description will appear here."}</p>
                  <div className="my-4 border-t border-white/10"></div>

                  {formData.sections.length > 0 ? (
                    <div className="space-y-6">
                      {formData.sections.map((section, index) => (
                        <div key={index}>
                          <h2 className="text-xl font-bold text-yellow-400">{section.title}</h2>
                          <div className="mt-2">
                            {section.content ? (
                              <div dangerouslySetInnerHTML={{ __html: section.content }} />
                            ) : (
                              <p className="text-white/40 italic">No content for this section yet.</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-white/40 italic">
                      Your guide content will be displayed here. Add sections to see a preview.
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <>
                <div className="glassmorphism-card p-6 rounded-xl border border-white/10 mb-6">
                  <h3 className="text-white font-medium mb-4 flex items-center">
                    <BookOpen className="w-4 h-4 mr-2 text-yellow-400" />
                    Guide Sections
                  </h3>

                  <div className="space-y-4">
                    {formData.sections.map((section, index) => (
                      <div key={index} className="p-4 border border-white/10 rounded-lg bg-white/5">
                        <div className="flex items-center justify-between mb-2">
                          <input
                            type="text"
                            value={section.title}
                            onChange={(e) => handleUpdateSectionTitle(index, e.target.value)}
                            placeholder="Section Title"
                            className="bg-transparent border-none text-white font-medium focus:outline-none focus:ring-1 focus:ring-yellow-400/30 rounded px-2 py-1 w-full max-w-md"
                          />
                          <div className="flex items-center gap-2">
                            <button
                              className="p-1 rounded hover:bg-white/10 text-white/60 transition-all"
                              onClick={() => handleMoveSectionUp(index)}
                              disabled={index === 0}
                            >
                              <ChevronUp className="w-4 h-4" />
                            </button>
                            <button
                              className="p-1 rounded hover:bg-white/10 text-white/60 transition-all"
                              onClick={() => handleMoveSectionDown(index)}
                              disabled={index === formData.sections.length - 1}
                            >
                              <ChevronDown className="w-4 h-4" />
                            </button>
                            <button
                              className="p-1 rounded hover:bg-white/10 text-white/60 transition-all"
                              onClick={() => handleRemoveSection(index)}
                              disabled={formData.sections.length <= 1}
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <RichTextEditor
                          value={section.content}
                          onChange={(value) => handleUpdateSectionContent(index, value)}
                          placeholder="Write the content for this section..."
                          className="mt-2"
                          minHeight="120px"
                        />
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={handleAddSection}
                      className="flex items-center justify-center gap-2 w-full p-3 border border-dashed border-white/20 rounded-lg text-white/60 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Section</span>
                    </button>
                  </div>
                </div>

                <div className="glassmorphism-card p-6 rounded-xl border border-white/10 mb-6">
                  <h3 className="text-white font-medium mb-4 flex items-center">
                    <FileText className="w-4 h-4 mr-2 text-yellow-400" />
                    Additional Resources <span className="text-white/40 text-sm ml-2">(Optional)</span>
                  </h3>

                  <div className="p-4 border border-white/10 rounded-lg bg-white/5 mb-4">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center mr-4">
                        <LinkIcon className="w-5 h-5 text-yellow-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-medium mb-1">External Links</h4>
                        <div className="flex mb-2">
                          <input
                            type="text"
                            placeholder="Resource name"
                            className="flex-1 bg-white/5 border border-white/10 rounded-l-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/30 focus:bg-white/10 transition-all"
                          />
                          <input
                            type="text"
                            placeholder="URL"
                            className="flex-1 bg-white/5 border-y border-r border-white/10 rounded-r-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/30 focus:bg-white/10 transition-all"
                          />
                        </div>
                        <button
                          type="button"
                          className="flex items-center gap-1 text-yellow-400 hover:text-yellow-300 text-sm"
                        >
                          <Plus className="w-4 h-4" /> Add Resource Link
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border border-white/10 rounded-lg bg-white/5">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center mr-4">
                        <ImageIcon className="w-5 h-5 text-yellow-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-medium mb-1">Attachments</h4>
                        <button
                          type="button"
                          className="flex items-center justify-center gap-2 w-full p-3 border border-dashed border-white/20 rounded-lg text-white/60 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all"
                        >
                          <Upload className="w-4 h-4" />
                          <span>Upload File</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="glassmorphism-card p-6 rounded-xl border border-white/10 bg-gradient-to-r from-yellow-500/10 to-transparent">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center mr-4">
                      <Sparkles className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Guide Writing Tips</h4>
                      <p className="text-white/60 text-sm mb-2">
                        Effective guides are well-structured and provide clear, actionable information.
                      </p>
                      <ul className="text-white/60 text-sm list-disc list-inside space-y-1">
                        <li>Break complex topics into digestible sections</li>
                        <li>Use clear headings and subheadings</li>
                        <li>Include examples and illustrations where helpful</li>
                        <li>Provide step-by-step instructions for processes</li>
                        <li>Link to additional resources for further learning</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )

      case 3:
        return (
          <div className="animate-fade-in">
            <h2 className="text-xl font-semibold mb-6 text-white">Access & Publishing</h2>

            <div className="glassmorphism-card p-6 rounded-xl border border-white/10 mb-6">
              <h3 className="text-white font-medium mb-4">Access Settings</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <button
                  onClick={() => handleAccessTypeChange("free")}
                  className={`glassmorphism-card p-4 rounded-xl border ${
                    formData.accessType === "free"
                      ? "border-green-500/30 bg-gradient-to-br from-green-500/10 to-green-500/5 shadow-glow-sm"
                      : "border-white/10 hover:bg-white/5"
                  } transition-all group text-left`}
                >
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500/30 to-green-500/10 flex items-center justify-center mr-4 group-hover:from-green-500/40 group-hover:to-green-500/20 transition-all">
                      <Globe className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-base font-medium text-white group-hover:text-green-400 transition-colors">
                        Free Access
                      </h3>
                      <p className="text-white/60 text-xs">Make your content available to everyone for free.</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleAccessTypeChange("one-time")}
                  className={`glassmorphism-card p-4 rounded-xl border ${
                    formData.accessType === "one-time"
                      ? "border-yellow-500/30 bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 shadow-glow-sm"
                      : "border-white/10 hover:bg-white/5"
                  } transition-all group text-left`}
                >
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500/30 to-yellow-500/10 flex items-center justify-center mr-4 group-hover:from-yellow-500/40 group-hover:to-yellow-500/20 transition-all">
                      <Coins className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div>
                      <h3 className="text-base font-medium text-white group-hover:text-yellow-400 transition-colors">
                        One-Time Purchase
                      </h3>
                      <p className="text-white/60 text-xs">Charge a one-time fee for access to this content.</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleAccessTypeChange("recurring")}
                  className={`glassmorphism-card p-4 rounded-xl border ${
                    formData.accessType === "recurring"
                      ? "border-[#FF3366]/30 bg-gradient-to-br from-[#FF3366]/10 to-[#FF3366]/5 shadow-glow-sm"
                      : "border-white/10 hover:bg-white/5"
                  } transition-all group text-left`}
                >
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF3366]/30 to-[#FF3366]/10 flex items-center justify-center mr-4 group-hover:from-[#FF3366]/40 group-hover:to-[#FF3366]/20 transition-all">
                      <Calendar className="w-5 h-5 text-[#FF3366]" />
                    </div>
                    <div>
                      <h3 className="text-base font-medium text-white group-hover:text-[#FF3366] transition-colors">
                        Subscription Only
                      </h3>
                      <p className="text-white/60 text-xs">Make this content available only to your subscribers.</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleAccessTypeChange("nft")}
                  className={`glassmorphism-card p-4 rounded-xl border ${
                    formData.accessType === "nft"
                      ? "border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-purple-500/5 shadow-glow-sm"
                      : "border-white/10 hover:bg-white/5"
                  } transition-all group text-left`}
                >
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/30 to-purple-500/10 flex items-center justify-center mr-4 group-hover:from-purple-500/40 group-hover:to-purple-500/20 transition-all">
                      <Lock className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-base font-medium text-white group-hover:text-purple-400 transition-colors">
                        NFT Access Pass
                      </h3>
                      <p className="text-white/60 text-xs">Require users to hold your NFT to access this content.</p>
                    </div>
                  </div>
                </button>
              </div>

              {formData.accessType === "one-time" && (
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
              )}

              <div className="space-y-3">
                <div className="flex items-center">
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

            <div className="glassmorphism-card p-6 rounded-xl border border-white/10 mb-6">
              <h3 className="text-white font-medium mb-4">Publishing Options</h3>

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

            <div className="glassmorphism-card p-6 rounded-xl border border-white/10 bg-gradient-to-r from-yellow-500/10 to-transparent mb-6">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center mr-4">
                  <AlertCircle className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Before You Publish</h4>
                  <p className="text-white/60 text-sm mb-2">
                    Please review your guide carefully before publishing. Once published, your content will be visible
                    to users based on your access settings.
                  </p>
                  <ul className="text-white/60 text-sm list-disc list-inside space-y-1">
                    <li>Ensure all sections are complete and well-organized</li>
                    <li>Check for any spelling or grammatical errors</li>
                    <li>Verify that all links and resources work correctly</li>
                    <li>Confirm your pricing and access settings are correct</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6 flex items-center">
        <button onClick={onBack} className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>{currentStep > 1 ? "Back" : "Back to Content Type"}</span>
        </button>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent ml-6">
          Create New Guide
        </h1>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className={`flex flex-col items-center cursor-pointer`} onClick={() => setCurrentStep(1)}>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                currentStep > 1
                  ? "bg-gradient-to-r from-green-500/20 to-green-500/10 text-green-400 border border-green-500/30"
                  : currentStep === 1
                    ? "bg-gradient-to-r from-yellow-500/20 to-yellow-500/10 text-yellow-400 border border-yellow-500/30"
                    : "bg-white/5 text-white/40 border border-white/10"
              }`}
            >
              {currentStep > 1 ? <CheckCircle className="w-5 h-5" /> : <span>1</span>}
            </div>
            <span className={`text-sm ${currentStep === 1 ? "text-white font-medium" : "text-white/60"}`}>
              Basic Info
            </span>
          </div>

          <div
            className={`flex flex-col items-center ${currentStep >= 2 ? "cursor-pointer" : "opacity-50"}`}
            onClick={() => currentStep >= 2 && setCurrentStep(2)}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                currentStep > 2
                  ? "bg-gradient-to-r from-green-500/20 to-green-500/10 text-green-400 border border-green-500/30"
                  : currentStep === 2
                    ? "bg-gradient-to-r from-yellow-500/20 to-yellow-500/10 text-yellow-400 border border-yellow-500/30"
                    : "bg-white/5 text-white/40 border border-white/10"
              }`}
            >
              {currentStep > 2 ? <CheckCircle className="w-5 h-5" /> : <span>2</span>}
            </div>
            <span className={`text-sm ${currentStep === 2 ? "text-white font-medium" : "text-white/60"}`}>Content</span>
          </div>

          <div
            className={`flex flex-col items-center ${currentStep >= 3 ? "cursor-pointer" : "opacity-50"}`}
            onClick={() => currentStep >= 3 && setCurrentStep(3)}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                currentStep > 3
                  ? "bg-gradient-to-r from-green-500/20 to-green-500/10 text-green-400 border border-green-500/30"
                  : currentStep === 3
                    ? "bg-gradient-to-r from-yellow-500/20 to-yellow-500/10 text-yellow-400 border border-yellow-500/30"
                    : "bg-white/5 text-white/40 border border-white/10"
              }`}
            >
              <span>3</span>
            </div>
            <span className={`text-sm ${currentStep === 3 ? "text-white font-medium" : "text-white/60"}`}>
              Publishing
            </span>
          </div>
        </div>
        <div className="relative mt-4">
          <div className="absolute top-0 left-0 h-1 bg-white/10 w-full rounded-full"></div>
          <div
            className="absolute top-0 left-0 h-1 bg-gradient-to-r from-yellow-500 to-yellow-500/50 rounded-full transition-all"
            style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Step Content */}
      {renderStepContent()}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <button
          onClick={handleCancel}
          className="px-6 py-2 rounded-lg border border-white/10 text-white/80 hover:bg-white/5 transition-all"
        >
          Cancel
        </button>

        <div className="flex gap-3">
          {currentStep < 3 ? (
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-500/80 hover:from-yellow-500/90 hover:to-yellow-500/70 text-white transition-all shadow-glow-sm"
            >
              Continue
            </button>
          ) : (
            <>
              <button
                onClick={() => handleSubmit(true)}
                className="px-6 py-2 rounded-lg border border-white/10 text-white/80 hover:bg-white/5 transition-all"
              >
                Save as Draft
              </button>
              <button
                onClick={() => handleSubmit(false)}
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-500/80 hover:from-yellow-500/90 hover:to-yellow-500/70 text-white transition-all shadow-glow-sm"
              >
                {formData.isScheduled ? "Schedule Publication" : "Publish Now"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
