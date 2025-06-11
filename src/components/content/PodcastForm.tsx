"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  ArrowLeft,
  Headphones,
  Upload,
  Eye,
  Save,
  CheckCircle,
  LinkIcon,
  User,
  AlertCircle,
  Globe,
  Calendar,
  Coins,
  Lock,
  Plus,
  X,
  Music,
} from "lucide-react"

// Import form components
import FormInput from "../ui/FormInput"
import FormTextarea from "../ui/FormTextarea"
import FormRadio from "../ui/FormRadio"
import FormDatePicker from "../ui/FormDatePicker"
import FormCheckbox from "../ui/FormCheckbox"
import FormFileUpload from "../ui/FormFileUpload"
import FormTagInput from "../ui/FormTagInput"
import FormSection from "../ui/FormSection"
import RichTextEditor from "../ui/RichTextEditor"

interface PodcastFormProps {
  onBack: () => void
}

export default function PodcastForm({ onBack }: PodcastFormProps) {
  const navigate = useNavigate()
  const [previewMode, setPreviewMode] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [audioSource, setAudioSource] = useState<"upload" | "external">("upload")
  const [currentGuest, setCurrentGuest] = useState({ name: "", role: "" })

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    audioUrl: "",
    thumbnailUrl: "",
    duration: "",
    episodeNumber: "",
    seasonNumber: "",
    tags: [] as string[],
    collaborators: [] as string[],
    showNotes: "",
    transcript: "",
    guests: [] as { name: string; role: string }[],
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
  })

  // Update form data
  const updateFormData = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }))

    // Clear error when field is updated
    if (errors[key]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[key]
        return newErrors
      })
    }
  }

  // Add guest to the list
  const handleAddGuest = () => {
    if (currentGuest.name) {
      setFormData((prev) => ({
        ...prev,
        guests: [...prev.guests, { ...currentGuest }],
      }))
      setCurrentGuest({ name: "", role: "" })
    }
  }

  // Remove guest from the list
  const handleRemoveGuest = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      guests: prev.guests.filter((_, i) => i !== index),
    }))
  }

  // Validate form before proceeding to next step
  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      if (!formData.title.trim()) {
        newErrors.title = "Title is required"
      }
      if (!formData.description.trim()) {
        newErrors.description = "Description is required"
      }
      if (audioSource === "upload" && !formData.audioUrl) {
        newErrors.audioUrl = "Audio file is required"
      }
      if (audioSource === "external" && !formData.audioUrl) {
        newErrors.audioUrl = "Audio URL is required"
      }
    } else if (step === 3) {
      if (formData.accessType === "one-time" && !formData.price) {
        newErrors.price = "Price is required for paid content"
      }
      if (formData.isScheduled) {
        if (!formData.publishDate) {
          newErrors.publishDate = "Publication date is required"
        }
        if (!formData.publishTime) {
          newErrors.publishTime = "Publication time is required"
        }
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    } else {
      onBack()
    }
  }

  const handleSubmit = (isDraft = false) => {
    if (isDraft || validateStep(3)) {
      const finalData = { ...formData, isDraft }
      console.log("Submitting podcast:", finalData)

      // In a real app, you would send this data to your API
      navigate("/dashboard/content")
    }
  }

  const handleCancel = () => {
    if (confirm("Are you sure you want to cancel? All your progress will be lost.")) {
      navigate("/dashboard/content")
    }
  }

  // Render the appropriate step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="animate-fade-in">
            <h2 className="text-xl font-semibold mb-6 text-white">Basic Information</h2>

            <FormSection>
              <FormInput
                label="Episode Title"
                required
                value={formData.title}
                onChange={(e) => updateFormData("title", e.target.value)}
                placeholder="Enter a compelling title for your podcast episode"
                error={errors.title}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="Season Number"
                  value={formData.seasonNumber}
                  onChange={(e) => updateFormData("seasonNumber", e.target.value)}
                  placeholder="1"
                  type="number"
                  min="1"
                />

                <FormInput
                  label="Episode Number"
                  value={formData.episodeNumber}
                  onChange={(e) => updateFormData("episodeNumber", e.target.value)}
                  placeholder="1"
                  type="number"
                  min="1"
                />
              </div>

              <FormTextarea
                label="Description"
                required
                value={formData.description}
                onChange={(e) => updateFormData("description", e.target.value)}
                placeholder="Provide a brief overview of your podcast episode"
                error={errors.description}
                characterCount
                maxLength={300}
              />

              <div className="mb-6">
                <label className="block text-white/80 mb-2 text-sm font-medium">Audio Source</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setAudioSource("upload")}
                    className={`glassmorphism-card p-4 rounded-xl border ${
                      audioSource === "upload"
                        ? "border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-purple-500/5 shadow-glow-sm"
                        : "border-white/10 hover:bg-white/5"
                    } transition-all group text-left`}
                  >
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/30 to-purple-500/10 flex items-center justify-center mr-4">
                        <Upload className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="text-base font-medium text-white group-hover:text-purple-400 transition-colors">
                          Upload Audio
                        </h3>
                        <p className="text-white/60 text-xs">Upload an audio file from your device.</p>
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAudioSource("external")}
                    className={`glassmorphism-card p-4 rounded-xl border ${
                      audioSource === "external"
                        ? "border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-purple-500/5 shadow-glow-sm"
                        : "border-white/10 hover:bg-white/5"
                    } transition-all group text-left`}
                  >
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/30 to-purple-500/10 flex items-center justify-center mr-4">
                        <LinkIcon className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="text-base font-medium text-white group-hover:text-purple-400 transition-colors">
                          External URL
                        </h3>
                        <p className="text-white/60 text-xs">Link to audio hosted elsewhere (Spotify, Apple, etc.).</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {audioSource === "upload" ? (
                <FormFileUpload
                  label="Upload Audio"
                  required
                  onChange={(file) => {
                    console.log("Audio file selected:", file)
                    updateFormData("audioUrl", file ? URL.createObjectURL(file) : "")
                  }}
                  accept="audio/*"
                  maxSize={200} // 200MB
                  error={errors.audioUrl}
                  helperText="Maximum file size: 200MB. Supported formats: MP3, WAV, etc."
                  preview={false}
                  placeholder={
                    <div className="w-32 h-32 rounded-lg bg-gradient-to-br from-[#161921] to-[#0F1116] flex items-center justify-center overflow-hidden">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/20 to-purple-500/5 flex items-center justify-center">
                        <Headphones className="w-8 h-8 text-purple-400/60" />
                      </div>
                    </div>
                  }
                />
              ) : (
                <FormInput
                  label="Audio URL"
                  required
                  value={formData.audioUrl}
                  onChange={(e) => updateFormData("audioUrl", e.target.value)}
                  placeholder="https://open.spotify.com/episode/..."
                  error={errors.audioUrl}
                  helperText="Enter a Spotify, Apple Podcasts, or other audio platform URL"
                />
              )}

              <FormInput
                label="Episode Duration"
                value={formData.duration}
                onChange={(e) => updateFormData("duration", e.target.value)}
                placeholder="HH:MM:SS"
                helperText="Enter the duration of your episode (e.g., 00:45:30 for 45 minutes and 30 seconds)"
              />

              <FormFileUpload
                label="Cover Image"
                onChange={(file) => console.log("Cover image selected:", file)}
                helperText="Recommended size: 1400x1400px (square ratio). Max size: 5MB."
                placeholder={
                  <div className="w-32 h-32 rounded-lg bg-gradient-to-br from-[#161921] to-[#0F1116] flex items-center justify-center overflow-hidden">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/20 to-purple-500/5 flex items-center justify-center">
                      <Headphones className="w-8 h-8 text-purple-400/60" />
                    </div>
                  </div>
                }
              />

              <FormTagInput
                label="Tags"
                tags={formData.tags}
                onChange={(tags) => updateFormData("tags", tags)}
                helperText="Add up to 10 tags to help users discover your podcast"
                maxTags={10}
              />
            </FormSection>

            <FormSection
              title="Collaborators"
              description="Add collaborators who will receive a share of earnings from this content (Optional)"
            >
              <FormTagInput
                label="Collaborators"
                tags={formData.collaborators}
                onChange={(collaborators) => updateFormData("collaborators", collaborators)}
                placeholder="Enter wallet address or username"
              />
            </FormSection>

            <FormSection title="SEO Settings">
              <div className="flex justify-between items-center mb-4">
                <p className="text-white/60 text-sm">Optimize your podcast for search engines (Recommended)</p>
              </div>

              <FormInput
                label="SEO Title"
                value={formData.seoTitle}
                onChange={(e) => updateFormData("seoTitle", e.target.value)}
                placeholder="Enter SEO title (defaults to episode title if empty)"
              />

              <FormTextarea
                label="SEO Description"
                value={formData.seoDescription}
                onChange={(e) => updateFormData("seoDescription", e.target.value)}
                placeholder="Enter SEO description (defaults to episode description if empty)"
              />

              <FormInput
                label="SEO Keywords"
                value={formData.seoKeywords}
                onChange={(e) => updateFormData("seoKeywords", e.target.value)}
                placeholder="Enter comma-separated keywords"
                helperText="Separate keywords with commas (e.g., podcast, interview, tech)"
              />
            </FormSection>
          </div>
        )

      case 2:
        return (
          <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">Episode Details</h2>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPreviewMode(!previewMode)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm ${
                    previewMode
                      ? "bg-purple-500/20 text-purple-500 border border-purple-500/30"
                      : "bg-white/5 text-white/80 border border-white/10 hover:bg-white/10"
                  }`}
                >
                  <Eye className="w-4 h-4" />
                  {previewMode ? "Exit Preview" : "Preview"}
                </button>
                <button
                  type="button"
                  onClick={() => handleSubmit(true)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm bg-white/5 text-white/80 border border-white/10 hover:bg-white/10"
                >
                  <Save className="w-4 h-4" />
                  Save Draft
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className={previewMode ? "hidden lg:block" : ""}>
                <FormSection title="Show Notes">
                  <RichTextEditor
                    label="Episode Show Notes"
                    value={formData.showNotes}
                    onChange={(value) => updateFormData("showNotes", value)}
                    placeholder="Add detailed show notes, links mentioned in the episode, etc..."
                    minHeight="200px"
                  />
                  <p className="text-white/40 text-xs mt-2">
                    Show notes help listeners find resources mentioned in your podcast.
                  </p>
                </FormSection>

                <FormSection title="Transcript (Optional)">
                  <RichTextEditor
                    label="Episode Transcript"
                    value={formData.transcript}
                    onChange={(value) => updateFormData("transcript", value)}
                    placeholder="Add a transcript of your podcast content..."
                    minHeight="200px"
                  />
                  <p className="text-white/40 text-xs mt-2">
                    Adding a transcript improves accessibility and helps with SEO.
                  </p>
                </FormSection>

                <FormSection title="Guests">
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {formData.guests.map((guest, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 bg-white/10 text-white/80 px-3 py-2 rounded-md text-sm w-full"
                        >
                          <User className="w-4 h-4 text-purple-400" />
                          <span className="font-medium">{guest.name}</span>
                          {guest.role && (
                            <>
                              <span className="mx-2 text-white/40">-</span>
                              <span className="text-white/60">{guest.role}</span>
                            </>
                          )}
                          <button
                            type="button"
                            onClick={() => handleRemoveGuest(index)}
                            className="text-white/60 hover:text-white/90 ml-auto"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2 mb-2">
                      <div className="col-span-2">
                        <input
                          type="text"
                          value={currentGuest.name}
                          onChange={(e) => setCurrentGuest((prev) => ({ ...prev, name: e.target.value }))}
                          placeholder="Guest name"
                          className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:bg-white/10 transition-all"
                        />
                      </div>
                      <div className="col-span-1">
                        <div className="flex">
                          <input
                            type="text"
                            value={currentGuest.role}
                            onChange={(e) => setCurrentGuest((prev) => ({ ...prev, role: e.target.value }))}
                            placeholder="Role (optional)"
                            className="flex-1 bg-white/5 border-y border-l border-white/10 rounded-l-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:bg-white/10 transition-all"
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && currentGuest.name) {
                                e.preventDefault()
                                handleAddGuest()
                              }
                            }}
                          />
                          <button
                            type="button"
                            onClick={handleAddGuest}
                            disabled={!currentGuest.name}
                            className={`px-4 rounded-r-lg border-y border-l border-white/10 transition-all ${
                              currentGuest.name
                                ? "bg-white/10 hover:bg-white/20 text-white"
                                : "bg-white/5 text-white/40 cursor-not-allowed"
                            }`}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <p className="text-white/40 text-xs">Add guests who appeared on this episode</p>
                  </div>
                </FormSection>
              </div>

              {previewMode && (
                <div className="lg:col-span-1">
                  <FormSection className="min-h-[500px]">
                    <div className="prose prose-invert max-w-none">
                      <h1>{formData.title || "Your Podcast Episode Title"}</h1>

                      {(formData.seasonNumber || formData.episodeNumber) && (
                        <p className="text-purple-400">
                          {formData.seasonNumber && `Season ${formData.seasonNumber}`}
                          {formData.seasonNumber && formData.episodeNumber && " • "}
                          {formData.episodeNumber && `Episode ${formData.episodeNumber}`}
                        </p>
                      )}

                      <p className="text-white/60">
                        {formData.description || "Your episode description will appear here."}
                      </p>

                      {formData.audioUrl && (
                        <div className="my-4 bg-white/5 rounded-lg p-4 flex items-center">
                          <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mr-4">
                            <Music className="w-6 h-6 text-purple-400" />
                          </div>
                          <div className="flex-1">
                            <p className="text-white/80 text-sm">Audio: {formData.duration || "00:00:00"}</p>
                            <div className="w-full h-16 mt-2 bg-purple-500/10 border border-purple-500/20 rounded-lg flex items-center justify-center">
                              <p className="text-purple-400 text-sm">Your podcast audio will play here</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {formData.guests.length > 0 && (
                        <div className="my-4">
                          <h2 className="text-lg font-semibold text-white mb-2">Guests</h2>
                          <div className="space-y-2">
                            {formData.guests.map((guest, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                                  <User className="w-4 h-4 text-purple-400" />
                                </div>
                                <div>
                                  <p className="font-medium">{guest.name}</p>
                                  {guest.role && <p className="text-white/60 text-sm">{guest.role}</p>}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {formData.showNotes && (
                        <div className="my-4">
                          <h2 className="text-lg font-semibold text-white mb-2">Show Notes</h2>
                          <div dangerouslySetInnerHTML={{ __html: formData.showNotes }} />
                        </div>
                      )}

                      {formData.transcript && (
                        <div className="my-4">
                          <h2 className="text-lg font-semibold text-white mb-2">Transcript</h2>
                          <div dangerouslySetInnerHTML={{ __html: formData.transcript }} />
                        </div>
                      )}
                    </div>
                  </FormSection>
                </div>
              )}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="animate-fade-in">
            <h2 className="text-xl font-semibold mb-6 text-white">Access & Publishing</h2>

            <FormSection title="Access Settings">
              <FormRadio
                label="Access Type"
                name="accessType"
                value={formData.accessType}
                onChange={(value) => updateFormData("accessType", value)}
                layout="cards"
                options={[
                  {
                    value: "free",
                    label: "Free Access",
                    description: "Make your content available to everyone for free.",
                    icon: <Globe className="w-5 h-5 text-green-400" />,
                    color: "green",
                  },
                  {
                    value: "one-time",
                    label: "One-Time Purchase",
                    description: "Charge a one-time fee for access to this content.",
                    icon: <Coins className="w-5 h-5 text-yellow-400" />,
                    color: "yellow",
                  },
                  {
                    value: "recurring",
                    label: "Subscription Only",
                    description: "Make this content available only to your subscribers.",
                    icon: <Calendar className="w-5 h-5 text-[#FF3366]" />,
                    color: "pink",
                  },
                  {
                    value: "nft",
                    label: "NFT Access Pass",
                    description: "Require users to hold your NFT to access this content.",
                    icon: <Lock className="w-5 h-5 text-purple-400" />,
                    color: "purple",
                  },
                ]}
              />

              {formData.accessType === "one-time" && (
                <div className="mt-4">
                  <FormInput
                    label="Price (SOL)"
                    required
                    value={formData.price}
                    onChange={(e) => updateFormData("price", e.target.value)}
                    placeholder="0.00"
                    type="number"
                    step="0.01"
                    min="0"
                    error={errors.price}
                    helperText="Minimum price: 0.01 SOL"
                    className="pl-10"
                  />
                </div>
              )}

              <div className="mt-4 space-y-3">
                <FormCheckbox
                  label="Allow comments on this content"
                  checked={formData.allowComments}
                  onChange={(checked) => updateFormData("allowComments", checked)}
                />

                <FormCheckbox
                  label="Allow reactions (likes) on this content"
                  checked={formData.allowReactions}
                  onChange={(checked) => updateFormData("allowReactions", checked)}
                />

                <FormRadio
                  name="visibility"
                  value={formData.isPublic ? "public" : "private"}
                  onChange={(value) => updateFormData("isPublic", value === "public")}
                  options={[
                    {
                      value: "public",
                      label: "Public",
                      description: "Discoverable in search and recommendations",
                    },
                    {
                      value: "private",
                      label: "Private",
                      description: "Only accessible via direct link",
                    },
                  ]}
                />
              </div>
            </FormSection>

            <FormSection title="Publishing Options">
              <FormRadio
                name="publishingOption"
                value={formData.isScheduled ? "scheduled" : "immediate"}
                onChange={(value) => updateFormData("isScheduled", value === "scheduled")}
                options={[
                  {
                    value: "immediate",
                    label: "Publish immediately",
                  },
                  {
                    value: "scheduled",
                    label: "Schedule for later",
                  },
                ]}
              />

              {formData.isScheduled && (
                <div className="ml-6 mt-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormDatePicker
                      label="Publication Date"
                      name="publishDate"
                      value={formData.publishDate}
                      onChange={(e) => updateFormData("publishDate", e.target.value)}
                      error={errors.publishDate}
                      required={formData.isScheduled}
                      min={new Date().toISOString().split("T")[0]}
                    />

                    <FormInput
                      label="Publication Time"
                      type="time"
                      value={formData.publishTime}
                      onChange={(e) => updateFormData("publishTime", e.target.value)}
                      error={errors.publishTime}
                      required={formData.isScheduled}
                    />
                  </div>
                  <p className="text-white/40 text-xs">
                    Your content will be automatically published at the specified date and time.
                  </p>
                </div>
              )}
            </FormSection>

            <FormSection className="bg-gradient-to-r from-purple-500/10 to-transparent">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mr-4">
                  <AlertCircle className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Before You Publish</h4>
                  <p className="text-white/60 text-sm mb-2">
                    Please review your podcast episode carefully before publishing. Once published, your content will be
                    visible to users based on your access settings.
                  </p>
                  <ul className="text-white/60 text-sm list-disc list-inside space-y-1">
                    <li>Ensure your audio plays correctly</li>
                    <li>Check that all guest information is accurate</li>
                    <li>Verify that your show notes and transcript (if provided) are complete</li>
                    <li>Confirm your pricing and access settings are correct</li>
                  </ul>
                </div>
              </div>
            </FormSection>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <div className="mb-6 flex items-center">
        <button
          onClick={handlePrevStep}
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{currentStep > 1 ? "Back" : "Back to Content Type"}</span>
        </button>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent ml-6">
          Create New Podcast
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
                    ? "bg-gradient-to-r from-purple-500/20 to-purple-500/10 text-purple-400 border border-purple-500/30"
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
                    ? "bg-gradient-to-r from-purple-500/20 to-purple-500/10 text-purple-400 border border-purple-500/30"
                    : "bg-white/5 text-white/40 border border-white/10"
              }`}
            >
              {currentStep > 2 ? <CheckCircle className="w-5 h-5" /> : <span>2</span>}
            </div>
            <span className={`text-sm ${currentStep === 2 ? "text-white font-medium" : "text-white/60"}`}>Details</span>
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
                    ? "bg-gradient-to-r from-purple-500/20 to-purple-500/10 text-purple-400 border border-purple-500/30"
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
            className="absolute top-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-purple-500/50 rounded-full transition-all"
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
              onClick={handleNextStep}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-purple-500/80 hover:from-purple-500/90 hover:to-purple-500/70 text-white transition-all shadow-glow-sm"
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
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-purple-500/80 hover:from-purple-500/90 hover:to-purple-500/70 text-white transition-all shadow-glow-sm"
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
