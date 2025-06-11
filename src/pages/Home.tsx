"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { useWalletModal } from "@solana/wallet-adapter-react-ui"
import { Link, useNavigate } from "react-router-dom"
import {
  Bell,
  Search,
  TrendingUp,
  Users,
  Video,
  Zap,
  HomeIcon,
  History,
  ThumbsUp,
  PlaySquare,
  Menu,
  X,
  ChevronDown,
  MoreVertical,
  FileText,
  Headphones,
  BookOpen,
  Flame,
  Plus,
  Compass,
  Bookmark,
  Award,
  PlusCircle,
  Clock,
  Loader2,
  AlertCircle,
} from "lucide-react"
import { WalletButton } from "../components/wallet-button"

// Types for the content data
interface HomePageFeedItem {
  id: string
  type: string
  title: string
  description: string
  thumbnailUrl?: string
  creatorName: string
  creatorWalletAddress: string
  views: number
  likes: number
  comments: number
  createdAt: string
  duration?: string
  readTime?: string
  chapters?: string
  accessType: string
  price?: number
  isPublic: boolean
  isDraft: boolean
}

// Mock data for trending creators (keeping this as it's not part of the content API)
const trendingCreators = [
  {
    name: "CryptoArtist",
    subscribers: "12.5K",
    category: "Digital Art",
  },
  {
    name: "BlockchainGuru",
    subscribers: "8.7K",
    category: "Education",
  },
  {
    name: "NFT_Collector",
    subscribers: "5.3K",
    category: "Collectibles",
  },
  {
    name: "Web3Developer",
    subscribers: "15.2K",
    category: "Development",
  },
  {
    name: "MetaverseExplorer",
    subscribers: "7.8K",
    category: "Metaverse",
  },
]

const Home: React.FC = () => {
  const wallet = useWallet()
  const { setVisible } = useWalletModal()
  const [activeTab, setActiveTab] = useState("home")
  const [activeCategory, setActiveCategory] = useState("all")
  const [notifications, setNotifications] = useState(3)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const mainContentRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  // State for content data
  const [contentFeed, setContentFeed] = useState<HomePageFeedItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch content from API
  useEffect(() => {
    const fetchContent = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const response = await fetch("https://paygate-dyof.onrender.com/api/content")
        if (!response.ok) {
          throw new Error(`Failed to fetch content: ${response.status} ${response.statusText}`)
        }

        const data: HomePageFeedItem[] = await response.json()

        // Filter out drafts and non-public content for the public feed
        const publicContent = data.filter((item) => item.isPublic && !item.isDraft)

        setContentFeed(publicContent)
      } catch (err) {
        console.error("Error fetching content:", err)
        setError(err instanceof Error ? err.message : "Failed to load content")
      } finally {
        setIsLoading(false)
      }
    }

    fetchContent()
  }, [])

  const handleConnectWallet = () => {
    if (!wallet.connected) {
      setVisible(true)
    }
  }

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarOpen && mainContentRef.current && !mainContentRef.current.contains(event.target as Node)) {
        setSidebarOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [sidebarOpen])

  // Function to get content type icon
  const getContentTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "video":
        return <Video className="w-8 h-8 text-gray-600" />
      case "article":
        return <FileText className="w-8 h-8 text-gray-600" />
      case "podcast":
        return <Headphones className="w-8 h-8 text-gray-600" />
      case "guide":
        return <BookOpen className="w-8 h-8 text-gray-600" />
      default:
        return <Video className="w-8 h-8 text-gray-600" />
    }
  }

  // Function to get small content type icon
  const getSmallContentTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "video":
        return <Video className="w-3 h-3" />
      case "article":
        return <FileText className="w-3 h-3" />
      case "podcast":
        return <Headphones className="w-3 h-3" />
      case "guide":
        return <BookOpen className="w-3 h-3" />
      default:
        return <Video className="w-3 h-3" />
    }
  }

  // Function to format time ago
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMs = now.getTime() - date.getTime()
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

    if (diffInDays === 0) return "Today"
    if (diffInDays === 1) return "1 day ago"
    if (diffInDays < 7) return `${diffInDays} days ago`
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`
    return `${Math.floor(diffInDays / 365)} years ago`
  }

  // Function to format numbers
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  // Filter content based on active category
  const filteredContent =
    activeCategory === "all"
      ? contentFeed
      : contentFeed.filter((item) => item.type.toLowerCase() === activeCategory.toLowerCase())

  // Get trending content (most viewed in last 7 days)
  const trendingContent = contentFeed
    .filter((item) => {
      const daysSinceCreated = (new Date().getTime() - new Date(item.createdAt).getTime()) / (1000 * 60 * 60 * 24)
      return daysSinceCreated <= 7
    })
    .sort((a, b) => b.views - a.views)
    .slice(0, 3)

  const handleContentClick = (content: HomePageFeedItem) => {
    navigate(`/${content.type.toLowerCase()}/${content.id}`)
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="h-screen flex flex-col bg-gradient-to-br from-[#0F1116] to-[#0A0A0B] text-white">
        <header className="bg-[#0A0A0B]/90 backdrop-blur-md border-b border-gray-800 z-50 flex-shrink-0 shadow-md">
          <div className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-[#FF3366] to-[#FF6699] rounded-md flex items-center justify-center shadow-glow-sm">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-[#FF3366] font-bold text-xl ml-2">PayGate</span>
            </div>
            <WalletButton />
          </div>
        </header>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-[#FF3366] mx-auto mb-4" />
            <p className="text-white/80">Loading content...</p>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="h-screen flex flex-col bg-gradient-to-br from-[#0F1116] to-[#0A0A0B] text-white">
        <header className="bg-[#0A0A0B]/90 backdrop-blur-md border-b border-gray-800 z-50 flex-shrink-0 shadow-md">
          <div className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-[#FF3366] to-[#FF6699] rounded-md flex items-center justify-center shadow-glow-sm">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-[#FF3366] font-bold text-xl ml-2">PayGate</span>
            </div>
            <WalletButton />
          </div>
        </header>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-6">
            <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Failed to Load Content</h3>
            <p className="text-white/60 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-[#FF3366] to-[#FF6699] text-white px-6 py-2 rounded-lg hover:from-[#FF6699] hover:to-[#FF3366] transition-all shadow-glow-sm"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-[#0F1116] to-[#0A0A0B] text-white font-sans overflow-hidden">
      {/* Header - YouTube-like with dashboard styling */}
      <header className="bg-[#0A0A0B]/90 backdrop-blur-md border-b border-gray-800 z-50 flex-shrink-0 shadow-md">
        <div className="flex items-center justify-between px-4 py-2">
          {/* Left section with logo and menu */}
          <div className="flex items-center">
            <button
              className="p-2 mr-2 rounded-md hover:bg-[#161921] transition-colors"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-[#FF3366] to-[#FF6699] rounded-md flex items-center justify-center shadow-glow-sm">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-[#FF3366] font-bold text-xl ml-2">PayGate</span>
            </div>
          </div>

          {/* Center section with search */}
          <div className="hidden md:flex items-center flex-1 max-w-xl mx-4">
            <div className="relative w-full flex">
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-[#161921] border border-gray-800 rounded-l-full py-2 pl-4 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF3366]/30 transition-all"
              />
              <button className="bg-[#161921] border border-l-0 border-gray-800 rounded-r-full px-4 hover:bg-[#1e212b] transition-colors">
                <Search className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Right section with actions */}
          <div className="flex items-center space-x-4">
            <button className="md:hidden p-2 rounded-md hover:bg-[#161921] transition-colors">
              <Search className="w-5 h-5" />
            </button>

            {/* Notification bell */}
            <button className="relative p-2 rounded-md hover:bg-[#161921] transition-colors">
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-[#FF3366] rounded-full text-xs flex items-center justify-center shadow-glow-sm">
                  {notifications}
                </span>
              )}
            </button>

            {/* Wallet button */}
            <WalletButton />
          </div>
        </div>
      </header>

      {/* Main content with YouTube-like layout and dashboard styling */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - YouTube-like with dashboard styling */}
        <aside
          className={`fixed top-[53px] bottom-0 left-0 w-64 bg-[#0A0A0B]/90 backdrop-blur-md border-r border-gray-800 z-40 transition-transform duration-300 lg:translate-x-0 overflow-y-auto ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:static lg:h-full`}
        >
          <div className="py-4 px-3">
            {/* Main navigation - User focused */}
            <div className="mb-6">
              <button
                className={`w-full flex items-center gap-3 p-2.5 rounded-md text-left transition-colors ${
                  activeTab === "home"
                    ? "bg-gradient-to-r from-[#FF3366]/20 to-[#FF3366]/5 text-[#FF3366] border border-[#FF3366]/20 shadow-glow-sm"
                    : "text-gray-300 hover:bg-[#161921]/50"
                }`}
                onClick={() => setActiveTab("home")}
              >
                <HomeIcon className={`w-5 h-5 ${activeTab === "home" ? "text-[#FF3366]" : "text-gray-400"}`} />
                <span>Home</span>
              </button>

              <button
                className={`w-full flex items-center gap-3 p-2.5 rounded-md text-left transition-colors ${
                  activeTab === "trending"
                    ? "bg-gradient-to-r from-[#FF3366]/20 to-[#FF3366]/5 text-[#FF3366] border border-[#FF3366]/20 shadow-glow-sm"
                    : "text-gray-300 hover:bg-[#161921]/50"
                }`}
                onClick={() => setActiveTab("trending")}
              >
                <TrendingUp className={`w-5 h-5 ${activeTab === "trending" ? "text-[#FF3366]" : "text-gray-400"}`} />
                <span>Trending</span>
              </button>

              <button
                className={`w-full flex items-center gap-3 p-2.5 rounded-md text-left transition-colors ${
                  activeTab === "subscriptions"
                    ? "bg-gradient-to-r from-[#FF3366]/20 to-[#FF3366]/5 text-[#FF3366] border border-[#FF3366]/20 shadow-glow-sm"
                    : "text-gray-300 hover:bg-[#161921]/50"
                }`}
                onClick={() => setActiveTab("subscriptions")}
              >
                <Users className={`w-5 h-5 ${activeTab === "subscriptions" ? "text-[#FF3366]" : "text-gray-400"}`} />
                <span>Subscriptions</span>
              </button>

              <button
                className={`w-full flex items-center gap-3 p-2.5 rounded-md text-left transition-colors ${
                  activeTab === "explore"
                    ? "bg-gradient-to-r from-[#FF3366]/20 to-[#FF3366]/5 text-[#FF3366] border border-[#FF3366]/20 shadow-glow-sm"
                    : "text-gray-300 hover:bg-[#161921]/50"
                }`}
                onClick={() => setActiveTab("explore")}
              >
                <Compass className={`w-5 h-5 ${activeTab === "explore" ? "text-[#FF3366]" : "text-gray-400"}`} />
                <span>Explore</span>
              </button>
            </div>

            <div className="border-t border-gray-800 pt-4 mb-6">
              <button
                className={`w-full flex items-center gap-3 p-2.5 rounded-md text-left transition-colors ${
                  activeTab === "library"
                    ? "bg-gradient-to-r from-[#FF3366]/20 to-[#FF3366]/5 text-[#FF3366] border border-[#FF3366]/20 shadow-glow-sm"
                    : "text-gray-300 hover:bg-[#161921]/50"
                }`}
                onClick={() => setActiveTab("library")}
              >
                <PlaySquare className={`w-5 h-5 ${activeTab === "library" ? "text-[#FF3366]" : "text-gray-400"}`} />
                <span>Library</span>
              </button>

              <button
                className={`w-full flex items-center gap-3 p-2.5 rounded-md text-left transition-colors ${
                  activeTab === "history"
                    ? "bg-gradient-to-r from-[#FF3366]/20 to-[#FF3366]/5 text-[#FF3366] border border-[#FF3366]/20 shadow-glow-sm"
                    : "text-gray-300 hover:bg-[#161921]/50"
                }`}
                onClick={() => setActiveTab("history")}
              >
                <History className={`w-5 h-5 ${activeTab === "history" ? "text-[#FF3366]" : "text-gray-400"}`} />
                <span>History</span>
              </button>

              <button
                className={`w-full flex items-center gap-3 p-2.5 rounded-md text-left transition-colors ${
                  activeTab === "liked"
                    ? "bg-gradient-to-r from-[#FF3366]/20 to-[#FF3366]/5 text-[#FF3366] border border-[#FF3366]/20 shadow-glow-sm"
                    : "text-gray-300 hover:bg-[#161921]/50"
                }`}
                onClick={() => setActiveTab("liked")}
              >
                <ThumbsUp className={`w-5 h-5 ${activeTab === "liked" ? "text-[#FF3366]" : "text-gray-400"}`} />
                <span>Liked Content</span>
              </button>

              <button
                className={`w-full flex items-center gap-3 p-2.5 rounded-md text-left transition-colors ${
                  activeTab === "bookmarks"
                    ? "bg-gradient-to-r from-[#FF3366]/20 to-[#FF3366]/5 text-[#FF3366] border border-[#FF3366]/20 shadow-glow-sm"
                    : "text-gray-300 hover:bg-[#161921]/50"
                }`}
                onClick={() => setActiveTab("bookmarks")}
              >
                <Bookmark className={`w-5 h-5 ${activeTab === "bookmarks" ? "text-[#FF3366]" : "text-gray-400"}`} />
                <span>Bookmarks</span>
              </button>
            </div>

            {/* Subscriptions */}
            <div className="border-t border-gray-800 pt-4">
              <h3 className="text-sm font-medium text-gray-400 mb-2 px-3">SUBSCRIPTIONS</h3>
              {trendingCreators.map((creator, index) => (
                <button
                  key={index}
                  className="w-full flex items-center gap-3 p-2.5 rounded-md text-left text-gray-300 hover:bg-[#161921]/50 transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#FF3366]/20 to-[#FF3366]/5 flex items-center justify-center shadow-glow-sm">
                    <Users className="w-3 h-3 text-[#FF3366]" />
                  </div>
                  <span className="truncate">{creator.name}</span>
                </button>
              ))}

              <button className="w-full flex items-center gap-3 p-2.5 rounded-md text-left text-gray-300 hover:bg-[#161921]/50 transition-colors">
                <ChevronDown className="w-5 h-5" />
                <span>Show more</span>
              </button>
            </div>

            {/* Explore content types */}
            <div className="border-t border-gray-800 mt-4 pt-4">
              <h3 className="text-sm font-medium text-gray-400 mb-2 px-3">EXPLORE</h3>

              <button className="w-full flex items-center gap-3 p-2.5 rounded-md text-left text-gray-300 hover:bg-[#161921]/50 transition-colors">
                <Video className="w-5 h-5 text-gray-400" />
                <span>Videos</span>
              </button>

              <button className="w-full flex items-center gap-3 p-2.5 rounded-md text-left text-gray-300 hover:bg-[#161921]/50 transition-colors">
                <FileText className="w-5 h-5 text-gray-400" />
                <span>Articles</span>
              </button>

              <button className="w-full flex items-center gap-3 p-2.5 rounded-md text-left text-gray-300 hover:bg-[#161921]/50 transition-colors">
                <Headphones className="w-5 h-5 text-gray-400" />
                <span>Podcasts</span>
              </button>

              <button className="w-full flex items-center gap-3 p-2.5 rounded-md text-left text-gray-300 hover:bg-[#161921]/50 transition-colors">
                <BookOpen className="w-5 h-5 text-gray-400" />
                <span>Guides</span>
              </button>
            </div>

            {/* Become a creator button */}
            <div className="border-t border-gray-800 mt-4 pt-4">
              <Link
                to="/apply"
                className="w-full flex items-center gap-3 p-2.5 rounded-md text-left text-[#FF3366] hover:bg-[#161921]/50 transition-colors"
              >
                <PlusCircle className="w-5 h-5" />
                <span>Become a Creator</span>
              </Link>
            </div>
          </div>
        </aside>

        {/* Main content - Scrollable with dashboard styling */}
        <main ref={mainContentRef} className="flex-1 overflow-y-auto">
          <div className="py-6 px-4">
            {/* Category chips - YouTube-like with dashboard styling */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-6 hide-scrollbar sticky top-0 bg-gradient-to-r from-[#0F1116] to-[#0A0A0B] z-10 py-2">
              <button
                className={`${
                  activeCategory === "all"
                    ? "bg-gradient-to-r from-[#FF3366] to-[#FF6699] text-white shadow-glow-sm"
                    : "bg-[#161921] hover:bg-[#1e212b] border border-gray-800"
                } px-3 py-1 rounded-md text-sm whitespace-nowrap transition-all`}
                onClick={() => setActiveCategory("all")}
              >
                All
              </button>
              <button
                className={`${
                  activeCategory === "video"
                    ? "bg-gradient-to-r from-[#FF3366] to-[#FF6699] text-white shadow-glow-sm"
                    : "bg-[#161921] hover:bg-[#1e212b] border border-gray-800"
                } px-3 py-1 rounded-md text-sm whitespace-nowrap flex items-center gap-1 transition-all`}
                onClick={() => setActiveCategory("video")}
              >
                <Video className="w-3 h-3" /> Videos
              </button>
              <button
                className={`${
                  activeCategory === "article"
                    ? "bg-gradient-to-r from-[#FF3366] to-[#FF6699] text-white shadow-glow-sm"
                    : "bg-[#161921] hover:bg-[#1e212b] border border-gray-800"
                } px-3 py-1 rounded-md text-sm whitespace-nowrap flex items-center gap-1 transition-all`}
                onClick={() => setActiveCategory("article")}
              >
                <FileText className="w-3 h-3" /> Articles
              </button>
              <button
                className={`${
                  activeCategory === "podcast"
                    ? "bg-gradient-to-r from-[#FF3366] to-[#FF6699] text-white shadow-glow-sm"
                    : "bg-[#161921] hover:bg-[#1e212b] border border-gray-800"
                } px-3 py-1 rounded-md text-sm whitespace-nowrap flex items-center gap-1 transition-all`}
                onClick={() => setActiveCategory("podcast")}
              >
                <Headphones className="w-3 h-3" /> Podcasts
              </button>
              <button
                className={`${
                  activeCategory === "guide"
                    ? "bg-gradient-to-r from-[#FF3366] to-[#FF6699] text-white shadow-glow-sm"
                    : "bg-[#161921] hover:bg-[#1e212b] border border-gray-800"
                } px-3 py-1 rounded-md text-sm whitespace-nowrap flex items-center gap-1 transition-all`}
                onClick={() => setActiveCategory("guide")}
              >
                <BookOpen className="w-3 h-3" /> Guides
              </button>
              <button className="bg-[#161921] hover:bg-[#1e212b] border border-gray-800 px-3 py-1 rounded-md text-sm whitespace-nowrap transition-all">
                NFTs
              </button>
              <button className="bg-[#161921] hover:bg-[#1e212b] border border-gray-800 px-3 py-1 rounded-md text-sm whitespace-nowrap transition-all">
                DeFi
              </button>
              <button className="bg-[#161921] hover:bg-[#1e212b] border border-gray-800 px-3 py-1 rounded-md text-sm whitespace-nowrap transition-all">
                Gaming
              </button>
              <button className="bg-[#161921] hover:bg-[#1e212b] border border-gray-800 px-3 py-1 rounded-md text-sm whitespace-nowrap transition-all">
                DAOs
              </button>
            </div>

            {/* Trending section with dashboard styling */}
            {activeTab === "home" && trendingContent.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium flex items-center gap-2">
                    <Flame className="w-4 h-4 text-[#FF3366]" />
                    <span className="bg-gradient-to-r from-[#FF3366] to-[#FF6699] text-transparent bg-clip-text">
                      Trending Now
                    </span>
                  </h3>
                  <button className="text-[#FF3366] text-sm hover:text-[#FF6699] transition-colors">See all</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {trendingContent.map((item) => (
                    <div
                      key={item.id}
                      className="bg-[#161921] rounded-md overflow-hidden border border-gray-800 hover:border-gray-700 transition-all hover:shadow-glow-sm cursor-pointer"
                      onClick={() => handleContentClick(item)}
                    >
                      <div className="relative h-48 bg-gradient-to-br from-[#0F1116] to-[#161921] flex items-center justify-center">
                        {item.thumbnailUrl ? (
                          <img
                            src={item.thumbnailUrl || "/placeholder.svg"}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          getContentTypeIcon(item.type)
                        )}
                        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded-md flex items-center gap-1">
                          {item.duration || item.readTime || item.chapters}
                        </div>
                        <div className="absolute top-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded-md flex items-center gap-1">
                          {getSmallContentTypeIcon(item.type)}
                          <span className="capitalize">{item.type}</span>
                        </div>
                      </div>
                      <div className="p-3">
                        <h4 className="font-medium text-sm mb-1 line-clamp-2">{item.title}</h4>
                        <div className="flex justify-between items-center">
                          <p className="text-gray-400 text-xs">{item.creatorName}</p>
                          <div className="flex items-center text-gray-400 text-xs">
                            <span>{formatNumber(item.views)} views</span>
                            <span className="mx-1">•</span>
                            <span>{formatTimeAgo(item.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Content grid - All types with dashboard styling */}
            {filteredContent.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredContent.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col bg-[#161921] rounded-md border border-gray-800 overflow-hidden hover:border-gray-700 transition-all hover:shadow-glow-sm cursor-pointer"
                    onClick={() => handleContentClick(item)}
                  >
                    {/* Thumbnail with appropriate indicators for each content type */}
                    <div className="relative h-40 bg-gradient-to-br from-[#0F1116] to-[#161921] flex items-center justify-center">
                      {item.thumbnailUrl ? (
                        <img
                          src={item.thumbnailUrl || "/placeholder.svg"}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        getContentTypeIcon(item.type)
                      )}

                      {/* Content type specific indicators */}
                      {(item.duration || item.readTime || item.chapters) && (
                        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded-md flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {item.duration || item.readTime || item.chapters}
                        </div>
                      )}

                      {/* Content tier badge */}
                      {item.accessType === "PAID" && (
                        <div className="absolute top-2 left-2 bg-gradient-to-r from-[#FF3366] to-[#FF6699] text-white text-xs px-1.5 py-0.5 rounded-md shadow-glow-sm">
                          PREMIUM
                        </div>
                      )}

                      {/* Content type badge */}
                      <div className="absolute top-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded-md flex items-center gap-1">
                        {getSmallContentTypeIcon(item.type)}
                        <span className="capitalize">{item.type}</span>
                      </div>
                    </div>

                    {/* Content info */}
                    <div className="flex p-3">
                      {/* Creator avatar */}
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#FF3366]/20 to-[#FF3366]/5 flex-shrink-0 flex items-center justify-center mr-3 shadow-glow-sm">
                        <Users className="w-4 h-4 text-[#FF3366]" />
                      </div>

                      {/* Content details */}
                      <div className="flex-1">
                        <h3 className="font-medium text-sm mb-1 line-clamp-2">{item.title}</h3>
                        <p className="text-gray-400 text-xs mb-1">{item.creatorName}</p>
                        <div className="flex items-center text-gray-400 text-xs">
                          <span>{formatNumber(item.views)} views</span>
                          <span className="mx-1">•</span>
                          <span>{formatTimeAgo(item.createdAt)}</span>
                        </div>
                      </div>

                      {/* Options button */}
                      <button className="p-1 text-gray-400 hover:text-white transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FF3366]/20 to-[#FF3366]/5 mx-auto flex items-center justify-center mb-4">
                  <FileText className="w-8 h-8 text-[#FF3366]" />
                </div>
                <h3 className="text-lg font-medium mb-2">No content found</h3>
                <p className="text-gray-400 mb-4">
                  {activeCategory === "all"
                    ? "No content available at the moment."
                    : `No ${activeCategory} content found.`}
                </p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Mobile bottom navigation with dashboard styling */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0A0A0B]/90 backdrop-blur-md border-t border-gray-800 lg:hidden z-50 shadow-lg">
        <div className="grid grid-cols-5 gap-1 p-2">
          <button
            className={`flex flex-col items-center justify-center p-2 rounded-md transition-colors ${
              activeTab === "home" ? "text-[#FF3366]" : "text-gray-400 hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("home")}
          >
            <HomeIcon className="w-5 h-5" />
            <span className="text-xs mt-1">Home</span>
          </button>

          <button
            className={`flex flex-col items-center justify-center p-2 rounded-md transition-colors ${
              activeTab === "trending" ? "text-[#FF3366]" : "text-gray-400 hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("trending")}
          >
            <TrendingUp className="w-5 h-5" />
            <span className="text-xs mt-1">Trending</span>
          </button>

          <Link to="/apply" className="flex flex-col items-center justify-center p-2 rounded-md text-[#FF3366]">
            <div className="w-10 h-10 bg-gradient-to-r from-[#FF3366] to-[#FF6699] rounded-full flex items-center justify-center -mt-5 border-4 border-[#0A0A0B] shadow-glow-sm">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs mt-1">Create</span>
          </Link>

          <button
            className={`flex flex-col items-center justify-center p-2 rounded-md transition-colors ${
              activeTab === "subscriptions" ? "text-[#FF3366]" : "text-gray-400 hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("subscriptions")}
          >
            <Users className="w-5 h-5" />
            <span className="text-xs mt-1">Subs</span>
          </button>

          <button
            className={`flex flex-col items-center justify-center p-2 rounded-md transition-colors ${
              activeTab === "library" ? "text-[#FF3366]" : "text-gray-400 hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("library")}
          >
            <PlaySquare className="w-5 h-5" />
            <span className="text-xs mt-1">Library</span>
          </button>
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Creator application modal with dashboard styling */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-[#161921] to-[#0F1116] rounded-md max-w-md w-full p-6 relative border border-gray-800 shadow-glow-md">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              onClick={() => setShowCreateModal(false)}
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#FF3366]/20 to-[#FF3366]/5 rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow-sm">
                <Award className="w-8 h-8 text-[#FF3366]" />
              </div>
              <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-[#FF3366] to-[#FF6699] text-transparent bg-clip-text">
                Become a Creator
              </h3>
              <p className="text-gray-400 text-sm">
                Join our platform and start monetizing your content with crypto payments. No middlemen, just you and
                your audience.
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#FF3366]/20 to-[#FF3366]/5 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-glow-sm">
                  <span className="text-[#FF3366] text-sm">✓</span>
                </div>
                <p className="text-gray-300 text-sm">Keep up to 92% of your subscription revenue</p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#FF3366]/20 to-[#FF3366]/5 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-glow-sm">
                  <span className="text-[#FF3366] text-sm">✓</span>
                </div>
                <p className="text-gray-300 text-sm">Full ownership of your content and subscriber relationships</p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#FF3366]/20 to-[#FF3366]/5 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-glow-sm">
                  <span className="text-[#FF3366] text-sm">✓</span>
                </div>
                <p className="text-gray-300 text-sm">Automatic payments through secure smart contracts</p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#FF3366]/20 to-[#FF3366]/5 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-glow-sm">
                  <span className="text-[#FF3366] text-sm">✓</span>
                </div>
                <p className="text-gray-300 text-sm">Create exclusive NFTs for your most dedicated fans</p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Link
                to="/apply"
                className="bg-gradient-to-r from-[#FF3366] to-[#FF6699] text-white font-medium rounded-md py-3 text-center hover:from-[#FF6699] hover:to-[#FF3366] transition-all shadow-glow-sm"
                onClick={() => setShowCreateModal(false)}
              >
                Apply as Creator
              </Link>

              <button
                className="bg-transparent border border-gray-700 text-white font-medium rounded-md py-3 hover:bg-white/5 transition-colors"
                onClick={() => setShowCreateModal(false)}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
