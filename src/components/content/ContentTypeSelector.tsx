"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FileText, Video, Headphones, BookOpen, CheckCircle, Sparkles, ArrowLeft } from "lucide-react"

interface ContentTypeSelectorProps {
  onTypeSelect: (type: string) => void
}

export default function ContentTypeSelector({ onTypeSelect }: ContentTypeSelectorProps) {
  const navigate = useNavigate()
  const [selectedType, setSelectedType] = useState<string | null>(null)

  const handleTypeSelect = (type: string) => {
    setSelectedType(type)
  }

  const handleContinue = () => {
    if (selectedType) {
      onTypeSelect(selectedType)
    }
  }

  const handleBack = () => {
    navigate("/dashboard/content")
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6 flex items-center">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Content</span>
        </button>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent ml-6">
          Create New Content
        </h1>
      </div>

      <div className="animate-fade-in">
        <h2 className="text-xl font-semibold mb-6 text-white">What type of content are you creating?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => handleTypeSelect("article")}
            className={`glassmorphism-card p-6 rounded-xl border ${
              selectedType === "article"
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
              {selectedType === "article" && <CheckCircle className="w-5 h-5 text-green-500 ml-2 flex-shrink-0" />}
            </div>
          </button>

          <button
            onClick={() => handleTypeSelect("video")}
            className={`glassmorphism-card p-6 rounded-xl border ${
              selectedType === "video"
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
              {selectedType === "video" && <CheckCircle className="w-5 h-5 text-blue-500 ml-2 flex-shrink-0" />}
            </div>
          </button>

          <button
            onClick={() => handleTypeSelect("podcast")}
            className={`glassmorphism-card p-6 rounded-xl border ${
              selectedType === "podcast"
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
              {selectedType === "podcast" && <CheckCircle className="w-5 h-5 text-purple-500 ml-2 flex-shrink-0" />}
            </div>
          </button>

          <button
            onClick={() => handleTypeSelect("guide")}
            className={`glassmorphism-card p-6 rounded-xl border ${
              selectedType === "guide"
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
              {selectedType === "guide" && <CheckCircle className="w-5 h-5 text-yellow-500 ml-2 flex-shrink-0" />}
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
                PayGate can help you create content faster with AI. Select a content type to get started, and you'll see
                AI assistance options in the next steps.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleContinue}
            disabled={!selectedType}
            className={`px-6 py-2 rounded-lg ${
              selectedType
                ? "bg-gradient-to-r from-[#FF3366] to-[#FF3366]/80 hover:from-[#FF3366]/90 hover:to-[#FF3366]/70 text-white shadow-glow-sm"
                : "bg-white/5 text-white/40 cursor-not-allowed"
            } transition-all`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}
