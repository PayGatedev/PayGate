"use client"

import { useState, useEffect, JSX } from "react"
import { useNavigate } from "react-router-dom"
import { useWallet } from "@solana/wallet-adapter-react"
import { DashboardLayout } from "@/components/dashboard/layout"
import {
  Plus,
  Search,
  Filter,
  FileText,
  Video,
  Headphones,
  BookOpen,
  SlidersHorizontal,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Clock3,
  Loader2,
} from "lucide-react"
import { ContentKind, AccessType } from "../../../types/content"
import { ContentCard } from "@/components/dashboard/content-card"

interface DisplayContentItem {
  id: string
  title: string
  type: ContentKind
  status: "published" | "draft" | "scheduled"
  accessType: AccessType
  date: string
  views: number
  likes: number
  comments: number
  thumbnailUrl?: string
  duration?: string
}

export default function ContentPage() {
  const navigate = useNavigate()
  const { publicKey, connected: isWalletConnected } = useWallet()

  const [contentItems, setContentItems] = useState<DisplayContentItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [fetchError, setFetchError] = useState<string | null>(null)

  const [activeFilter, setActiveFilter] = useState<string>("all")
  const [activeTab, setActiveTab] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const fetchCreatorContent = async () => {
      if (!isWalletConnected) {
        setContentItems([])
        setFetchError("Please connect your wallet to view your content.")
        setIsLoading(false)
        return
      }
      if (!publicKey) {
        setContentItems([])
        setFetchError("Wallet connected, but public key is not available to fetch content.")
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      setFetchError(null)
      setContentItems([])
      const walletAddress = publicKey.toBase58()

      try {
        const response = await fetch(`https://paygate-dyof.onrender.com/api/content/by-creator/${walletAddress}`)

        if (!response.ok) {
          let errorMsg = `Error ${response.status}: ${response.statusText}`
          try {
            const errorData = await response.json()
            errorMsg = errorData.message || errorMsg
          } catch (e) {
            // Response was not JSON, use statusText
          }
          throw new Error(errorMsg)
        }
        const dataFromApi: any[] = await response.json()

        const formattedData: DisplayContentItem[] = dataFromApi.map((item) => ({
          id: item._id,
          title: item.title,
          type: item.kind as ContentKind,
          status: item.status as "published" | "draft" | "scheduled",
          accessType: item.accessType as AccessType,
          date: new Date(item.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
          views: item.views,
          likes: item.likes,
          comments: item.comments,
          thumbnailUrl: item.thumbnailUrl,
          duration: item.duration || "N/A",
        }))
        setContentItems(formattedData)
      } catch (error: any) {
        console.error("Error fetching creator content:", error)
        setFetchError(error.message || "An unknown error occurred while fetching your content.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCreatorContent()
  }, [publicKey, isWalletConnected])

  const typeIcons: Record<ContentKind, JSX.Element> = {
    [ContentKind.ARTICLE]: <FileText className="w-full h-full" />,
    [ContentKind.VIDEO]: <Video className="w-full h-full" />,
    [ContentKind.PODCAST]: <Headphones className="w-full h-full" />,
    [ContentKind.GUIDE]: <BookOpen className="w-full h-full" />,
  }

  const typeColors: Record<ContentKind, string> = {
    [ContentKind.ARTICLE]: "from-green-500/30 to-green-500/10 text-green-400",
    [ContentKind.VIDEO]: "from-blue-500/30 to-blue-500/10 text-blue-400",
    [ContentKind.PODCAST]: "from-purple-500/30 to-purple-500/10 text-purple-400",
    [ContentKind.GUIDE]: "from-yellow-500/30 to-yellow-500/10 text-yellow-400",
  }

  const statusColors = {
    published: "bg-green-500/20 text-green-400",
    draft: "bg-gray-500/20 text-gray-400",
    scheduled: "bg-blue-500/20 text-blue-400",
  }

  const accessColors: Record<AccessType | "one-time" | "recurring" | "nft", string> = {
    [AccessType.FREE]: "bg-green-500/20 text-green-400",
    [AccessType.PAID]: "bg-yellow-500/20 text-yellow-400",
    "one-time": "bg-yellow-500/20 text-yellow-400",
    recurring: "bg-[#FF3366]/20 text-[#FF3366]",
    nft: "bg-purple-500/20 text-purple-400",
  }

  const statusIcons = {
    published: <CheckCircle className="w-4 h-4 mr-1" />,
    draft: <AlertCircle className="w-4 h-4 mr-1" />,
    scheduled: <Clock3 className="w-4 h-4 mr-1" />,
  }

  const handleTabChange = (tab: string) => setActiveTab(tab)
  const handleFilterChange = (filter: string) => setActiveFilter(filter)
  const handleNewContent = () => navigate("/dashboard/content/create")

  const filteredContent = contentItems.filter((item) => {
    if (activeTab !== "all" && item.status !== activeTab) return false
    const matchesFilter =
      activeFilter === "all" ||
      item.type === activeFilter ||
      item.status === activeFilter ||
      item.accessType === activeFilter
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const renderHeader = () => (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
          My Content
        </h1>
        <p className="text-white/60 mt-1">Manage and publish your content</p>
      </div>
      <button
        onClick={handleNewContent}
        className="flex items-center gap-2 bg-gradient-to-r from-[#FF3366] to-[#FF3366]/80 hover:from-[#FF3366]/90 hover:to-[#FF3366]/70 text-white px-4 py-2 rounded-lg transition-all shadow-glow-sm"
      >
        <Plus className="w-4 h-4" />
        <span>Upload New</span>
      </button>
    </div>
  )

  const renderPageContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-12 h-12 animate-spin text-[#FF3366]" />
          <p className="ml-4 text-white/80">Loading your content...</p>
        </div>
      )
    }

    if (fetchError) {
      return (
        <div className="glassmorphism-card rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-8 text-center">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2 text-white">Error Fetching Content</h3>
          <p className="text-white/60 mb-4">{fetchError}</p>
        </div>
      )
    }

    if (filteredContent.length > 0) {
      return (
        <>
          <div className="mb-6 flex overflow-x-auto hide-scrollbar">
            <button
              onClick={() => handleTabChange("all")}
              className={`px-4 py-2 rounded-full mr-2 transition-all ${activeTab === "all" ? "bg-gradient-to-r from-[#FF3366] to-[#FF3366]/80 text-white font-medium shadow-glow-sm" : "text-white/60 hover:text-white hover:bg-white/5"}`}
            >
              All Content
            </button>
            <button
              onClick={() => handleTabChange("published")}
              className={`px-4 py-2 rounded-full mr-2 transition-all ${activeTab === "published" ? "bg-gradient-to-r from-[#FF3366] to-[#FF3366]/80 text-white font-medium shadow-glow-sm" : "text-white/60 hover:text-white hover:bg-white/5"}`}
            >
              Published
            </button>
            <button
              onClick={() => handleTabChange("draft")}
              className={`px-4 py-2 rounded-full mr-2 transition-all ${activeTab === "draft" ? "bg-gradient-to-r from-[#FF3366] to-[#FF3366]/80 text-white font-medium shadow-glow-sm" : "text-white/60 hover:text-white hover:bg-white/5"}`}
            >
              Drafts
            </button>
            <button
              onClick={() => handleTabChange("scheduled")}
              className={`px-4 py-2 rounded-full transition-all ${activeTab === "scheduled" ? "bg-gradient-to-r from-[#FF3366] to-[#FF3366]/80 text-white font-medium shadow-glow-sm" : "text-white/60 hover:text-white hover:bg-white/5"}`}
            >
              Scheduled
            </button>
          </div>
          <div className="mb-6">
            <div className="glassmorphism-card rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search content..."
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF3366]/30 focus:bg-white/10 transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2 md:pb-0">
                  <button
                    onClick={() => handleFilterChange("all")}
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${activeFilter === "all" ? "bg-gradient-to-r from-[#FF3366]/20 to-[#FF3366]/5 text-[#FF3366] border border-[#FF3366]/20 shadow-glow-sm" : "bg-white/5 text-white/80 border border-white/10 hover:bg-white/10"}`}
                  >
                    <Filter className="w-4 h-4" /> All Types
                  </button>
                  <button
                    onClick={() => handleFilterChange(ContentKind.ARTICLE)}
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${activeFilter === ContentKind.ARTICLE ? "bg-gradient-to-r from-green-500/20 to-green-500/5 text-green-400 border border-green-500/20" : "bg-white/5 text-white/80 border border-white/10 hover:bg-white/10"}`}
                  >
                    <FileText className="w-4 h-4" /> Articles
                  </button>
                  <button
                    onClick={() => handleFilterChange(ContentKind.VIDEO)}
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${activeFilter === ContentKind.VIDEO ? "bg-gradient-to-r from-blue-500/20 to-blue-500/5 text-blue-400 border border-blue-500/20" : "bg-white/5 text-white/80 border border-white/10 hover:bg-white/10"}`}
                  >
                    <Video className="w-4 h-4" /> Videos
                  </button>
                  <button
                    onClick={() => handleFilterChange(ContentKind.PODCAST)}
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${activeFilter === ContentKind.PODCAST ? "bg-gradient-to-r from-purple-500/20 to-purple-500/5 text-purple-400 border border-purple-500/20" : "bg-white/5 text-white/80 border border-white/10 hover:bg-white/10"}`}
                  >
                    <Headphones className="w-4 h-4" /> Podcasts
                  </button>
                  <button
                    onClick={() => handleFilterChange(ContentKind.GUIDE)}
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${activeFilter === ContentKind.GUIDE ? "bg-gradient-to-r from-yellow-500/20 to-yellow-500/5 text-yellow-400 border border-yellow-500/20" : "bg-white/5 text-white/80 border border-white/10 hover:bg-white/10"}`}
                  >
                    <BookOpen className="w-4 h-4" /> Guides
                  </button>
                  <button className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm whitespace-nowrap bg-white/5 text-white/80 border border-white/10 hover:bg-white/10 transition-all">
                    <SlidersHorizontal className="w-4 h-4" /> More Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredContent.map((item) => (
              <ContentCard
                key={item.id}
                title={item.title}
                type={item.type as "video" | "article" | "podcast" | "guide"}
                status={item.status}
                accessType={item.accessType as "free" | "one-time" | "recurring" | "nft"}
                date={item.date}
                views={item.views}
                likes={item.likes}
                comments={item.comments}
                thumbnailUrl={item.thumbnailUrl || "/placeholder.svg?height=200&width=300"}
              />
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-white/10 transition-all">
                1
              </button>
              <button className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#FF3366]/20 to-[#FF3366]/5 border border-[#FF3366]/20 flex items-center justify-center text-[#FF3366]">
                2
              </button>
              <button className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-white/10 transition-all">
                3
              </button>
              <button className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-white/10 transition-all">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </>
      )
    } else {
      return (
        <div className="glassmorphism-card rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FF3366]/20 to-[#FF3366]/5 mx-auto flex items-center justify-center mb-4">
            <FileText className="w-8 h-8 text-[#FF3366]" />
          </div>
          <h3 className="text-lg font-medium mb-2 text-white">No content found</h3>
          <p className="text-white/60 mb-4">
            {searchQuery
              ? `No results found for "${searchQuery}"`
              : "You haven't created any content yet, or there was an issue connecting to your wallet."}
          </p>
          <button
            onClick={handleNewContent}
            className="flex items-center gap-2 bg-gradient-to-r from-[#FF3366] to-[#FF3366]/80 hover:from-[#FF3366]/90 hover:to-[#FF3366]/70 text-white px-4 py-2 rounded-lg transition-all shadow-glow-sm mx-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Content</span>
          </button>
        </div>
      )
    }
  }

  return (
    <DashboardLayout>
      {renderHeader()}
      {renderPageContent()}
    </DashboardLayout>
  )
}
