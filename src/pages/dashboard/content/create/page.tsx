"use client"

import ArticleForm from "@/components/content/ArticleForm"
import ContentTypeSelector from "@/components/content/ContentTypeSelector"
import GuideForm from "@/components/content/GuideForm"
import PodcastForm from "@/components/content/PodcastForm"
import VideoForm from "@/components/content/VideoForm"
import { DashboardLayout } from "@/components/dashboard/layout"
import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"

export default function CreateContentPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [selectedType, setSelectedType] = useState<string | null>(null)

  // Get content type from URL query parameter
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const type = searchParams.get("type")
    if (type) {
      setSelectedType(type)
    }
  }, [location.search])

  // Render the appropriate form based on the selected content type
  const renderForm = () => {
    switch (selectedType) {
      case "article":
        return <ArticleForm onBack={() => setSelectedType(null)} />
      case "video":
        return <VideoForm onBack={() => setSelectedType(null)} />
      case "podcast":
        return <PodcastForm onBack={() => setSelectedType(null)} />
      case "guide":
        return <GuideForm onBack={() => setSelectedType(null)} />
      default:
        return (
          <ContentTypeSelector
            onTypeSelect={(type) => {
              setSelectedType(type)
              // Update URL with the selected type
              navigate(`/dashboard/content/create?type=${type}`, { replace: true })
            }}
          />
        )
    }
  }

  return <DashboardLayout>{renderForm()}</DashboardLayout>
}
