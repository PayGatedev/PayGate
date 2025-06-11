"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useWallet } from "@solana/wallet-adapter-react"
import { useWalletModal } from "@solana/wallet-adapter-react-ui"
import {
  ThumbsUp,
  ThumbsDown,
  Share2,
  Bookmark,
  MoreVertical,
  Users,
  Lock,
  FileText,
  Wallet,
  Zap,
  Bell,
  Maximize,
  Menu,
  Search,
  ChevronDown,
  Eye,
  Calendar,
  Flag,
  X,
  Loader2,
  AlertCircle,
} from "lucide-react"
import { WalletButton } from "../components/wallet-button"
import ArticleViewer from "../components/content/ArticleViewer"
import VideoPlayer from "../components/content/VideoPlayer"
import PodcastPlayer from "../components/content/PodcastPlayer"
import GuideViewer from "../components/content/GuideViewer"
import RelatedContentSidebar from "../components/content/RelatedContentSidebar"
import LeftSidebar from "../components/navigation/LeftSidebar"
import { ContentKind, type AccessType } from "@/types/content"

interface FetchedContentData {
  _id: string
  kind: ContentKind
  title: string
  description: string
  thumbnailUrl?: string
  tags?: string[]
  isPublic: boolean
  accessType: AccessType
  price?: number
  isDraft: boolean
  createdAt: string
  publishAt?: string
  views: number
  likes: number
  commentsCount: number
  creator: {
    _id: string
    username: string
    walletAddress: string
  }
  videoUrl?: string
  videoDuration?: string
  chapters?: { title: string; timestamp: string }[]
  articleContent?: string
  guideSections?: { title: string; content: string }[]
  audioUrl?: string
  podcastDuration?: string
  episodeNumber?: number
  seasonNumber?: number
  showNotes?: string
  podcastTranscript?: string
  guests?: { name: string; role?: string }[]
  premium?: boolean
}

// Color theme configuration based on content type
const getContentTheme = (contentKind: ContentKind) => {
  switch (contentKind) {
    case ContentKind.ARTICLE:
      return {
        primary: "green-500",
        primaryLight: "green-400",
        primaryDark: "green-600",
        gradient: "from-green-500 to-green-600",
        gradientLight: "from-green-400 to-green-500",
        gradientSubtle: "from-green-500/20 to-green-600/10",
        gradientHover: "from-green-400 to-green-600",
        bg: "green-500/10",
        bgLight: "green-500/5",
        border: "green-500/30",
        icon: "text-green-400",
        text: "text-green-400",
        hover: "hover:text-green-400",
        ring: "ring-green-500/30",
      }
    case ContentKind.VIDEO:
      return {
        primary: "blue-500",
        primaryLight: "blue-400",
        primaryDark: "blue-600",
        gradient: "from-blue-500 to-blue-600",
        gradientLight: "from-blue-400 to-blue-500",
        gradientSubtle: "from-blue-500/20 to-blue-600/10",
        gradientHover: "from-blue-400 to-blue-600",
        bg: "blue-500/10",
        bgLight: "blue-500/5",
        border: "blue-500/30",
        icon: "text-blue-400",
        text: "text-blue-400",
        hover: "hover:text-blue-400",
        ring: "ring-blue-500/30",
      }
    case ContentKind.PODCAST:
      return {
        primary: "purple-500",
        primaryLight: "purple-400",
        primaryDark: "purple-600",
        gradient: "from-purple-500 to-purple-600",
        gradientLight: "from-purple-400 to-purple-500",
        gradientSubtle: "from-purple-500/20 to-purple-600/10",
        gradientHover: "from-purple-400 to-purple-600",
        bg: "purple-500/10",
        bgLight: "purple-500/5",
        border: "purple-500/30",
        icon: "text-purple-400",
        text: "text-purple-400",
        hover: "hover:text-purple-400",
        ring: "ring-purple-500/30",
      }
    case ContentKind.GUIDE:
      return {
        primary: "yellow-500",
        primaryLight: "yellow-400",
        primaryDark: "yellow-600",
        gradient: "from-yellow-500 to-yellow-600",
        gradientLight: "from-yellow-400 to-yellow-500",
        gradientSubtle: "from-yellow-500/20 to-yellow-600/10",
        gradientHover: "from-yellow-400 to-yellow-600",
        bg: "yellow-500/10",
        bgLight: "yellow-500/5",
        border: "yellow-500/30",
        icon: "text-yellow-400",
        text: "text-yellow-400",
        hover: "hover:text-yellow-400",
        ring: "ring-yellow-500/30",
      }
    default:
      return {
        primary: "[#FF3366]",
        primaryLight: "[#FF6699]",
        primaryDark: "[#FF1155]",
        gradient: "from-[#FF3366] to-[#FF6699]",
        gradientLight: "from-[#FF6699] to-[#FF3366]",
        gradientSubtle: "from-[#FF3366]/20 to-[#FF6699]/10",
        gradientHover: "from-[#FF6699] to-[#FF3366]",
        bg: "[#FF3366]/10",
        bgLight: "[#FF3366]/5",
        border: "[#FF3366]/30",
        icon: "text-[#FF3366]",
        text: "text-[#FF3366]",
        hover: "hover:text-[#FF3366]",
        ring: "ring-[#FF3366]/30",
      }
  }
}

const relatedContentMock = [
  {
    id: "rel1",
    type: ContentKind.VIDEO,
    title: "Related Video 1",
    creator: "Creator A",
    views: "10K",
    timeAgo: "1 day ago",
    duration: "10:00",
    thumbnail: "/placeholder.svg",
  },
  {
    id: "rel2",
    type: ContentKind.ARTICLE,
    title: "Related Article",
    creator: "Creator B",
    views: "5K",
    timeAgo: "2 days ago",
    readTime: "5 min read",
    thumbnail: "/placeholder.svg",
  },
]

const sampleCommentsMock = [
  {
    id: "com1",
    author: "User1",
    avatar: null,
    timeAgo: "1 hr ago",
    content: "Great video!",
    likes: 10,
    isLiked: false,
    replies: [],
  },
  {
    id: "com2",
    author: "User2",
    avatar: null,
    timeAgo: "2 hr ago",
    content: "Very informative.",
    likes: 5,
    isLiked: false,
    replies: [],
  },
]

const formatViews = (count: number): string => {
  if (count >= 1000000) return (count / 1000000).toFixed(1).replace(/\.0$/, "") + "M"
  if (count >= 1000) return (count / 1000).toFixed(1).replace(/\.0$/, "") + "K"
  return count.toString()
}

const formatDate = (isoDateString?: string): string => {
  if (!isoDateString) return "N/A"
  return new Date(isoDateString).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
}

const ContentPage = () => {
  const { contentType: routeContentTypeFromParams, id: contentIdFromParams } = useParams<{
    contentType?: string
    id: string
  }>()
  const wallet = useWallet()
  const { setVisible } = useWalletModal()

  const [currentContent, setCurrentContent] = useState<FetchedContentData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [isLiked, setIsLiked] = useState(false)
  const [isDisliked, setIsDisliked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showPaywall, setShowPaywall] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [isTheaterMode, setIsTheaterMode] = useState(false)

  const [commentsData, setCommentsData] = useState(sampleCommentsMock)
  const [commentText, setCommentText] = useState("")
  const [sortOrder, setSortOrder] = useState("newest")
  const [showSortOptions, setShowSortOptions] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)

  // Get theme based on current content
  const theme = currentContent ? getContentTheme(currentContent.kind) : getContentTheme(ContentKind.ARTICLE)

  useEffect(() => {
    const fetchContent = async () => {
      if (!contentIdFromParams) {
        setError("Content ID is missing from URL.")
        setIsLoading(false)
        setCurrentContent(null)
        return
      }
      setIsLoading(true)
      setError(null)
      setCurrentContent(null)

      try {
        const response = await fetch(`https://paygate-dyof.onrender.com/api/content/${contentIdFromParams}`)
        if (!response.ok) {
          let errorMsg = `Error ${response.status}: ${response.statusText}`
          try {
            const errorData = await response.json()
            errorMsg = errorData.message || errorMsg
          } catch (e) {
            /* Response not JSON */
          }
          throw new Error(errorMsg)
        }
        const data: FetchedContentData = await response.json()
        setCurrentContent(data)

        if (data.premium && !wallet.connected) {
          setShowPaywall(true)
        } else {
          setShowPaywall(false)
        }
      } catch (err: any) {
        console.error("Failed to fetch content:", err)
        setError(err.message || "Failed to load content. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchContent()
  }, [contentIdFromParams, wallet.connected])

  const handleConnectWallet = () => {
    if (!wallet.connected) setVisible(true)
  }
  const handleSubscribe = () => {
    if (!wallet.connected) {
      setVisible(true)
      return
    }
    setIsSubscribed(!isSubscribed)
  }
  const handleLike = () => {
    if (isDisliked) setIsDisliked(false)
    setIsLiked(!isLiked)
  }
  const handleDislike = () => {
    if (isLiked) setIsLiked(false)
    setIsDisliked(!isDisliked)
  }

  const handleAddComment = () => {
    if (!commentText.trim()) return
    const newComment = {
      id: Date.now().toString(),
      author: wallet.publicKey?.toBase58() || "User",
      avatar: null,
      timeAgo: "Just now",
      content: commentText,
      likes: 0,
      isLiked: false,
      replies: [],
    }
    setCommentsData([newComment, ...commentsData])
    setCommentText("")
  }

  const handleLikeComment = (commentId: string) => {
    setCommentsData(
      commentsData.map((c) =>
        c.id === commentId ? { ...c, likes: c.isLiked ? c.likes - 1 : c.likes + 1, isLiked: !c.isLiked } : c,
      ),
    )
  }

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-96 aspect-video bg-slate-800 rounded-lg">
          <Loader2 className={`w-12 h-12 animate-spin ${theme.text}`} />
        </div>
      )
    }
    if (error) {
      return (
        <div className="bg-[#161921] border border-red-700/50 rounded-lg p-8 text-center aspect-video flex flex-col justify-center items-center">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2 text-red-300">Error Loading Content</h2>
          <p className="text-gray-400">{error}</p>
        </div>
      )
    }
    if (!currentContent) {
      return (
        <div className="bg-[#161921] border border-gray-800 rounded-lg p-8 text-center aspect-video flex flex-col justify-center items-center">
          <FileText className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Content Not Found</h2>
          <p className="text-gray-400">The requested content could not be found or is unavailable.</p>
        </div>
      )
    }

    if (showPaywall) {
      return (
        <div className="bg-[#161921] border border-gray-800 rounded-lg p-8 text-center aspect-video flex flex-col justify-center items-center">
          <div
            className={`w-16 h-16 mx-auto bg-gradient-to-br ${theme.gradientSubtle} rounded-full flex items-center justify-center mb-4 border border-${theme.border}`}
          >
            <Lock className={`w-8 h-8 ${theme.icon}`} />
          </div>
          <h2 className="text-xl font-bold mb-2">Premium Content</h2>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            This content is available exclusively. Please connect your wallet to verify access or subscribe.
          </p>
          <button
            onClick={handleConnectWallet}
            className={`bg-gradient-to-r ${theme.gradient} hover:bg-gradient-to-r hover:${theme.gradientHover} text-white font-medium rounded-md px-6 py-3 flex items-center gap-2 mx-auto transition-all duration-200`}
          >
            <Wallet className="w-5 h-5" /> Connect Wallet
          </button>
        </div>
      )
    }

    const videoPlayerData = {
      videoUrl: currentContent.videoUrl || "",
      title: currentContent.title,
      premium: currentContent.premium,
      duration: currentContent.videoDuration,
      theme: theme,
    }

    switch (currentContent.kind) {
      case ContentKind.ARTICLE:
        return (
          <ArticleViewer content={{ ...currentContent, content: currentContent.articleContent || "" }} />
        )
      case ContentKind.VIDEO:
        if (!videoPlayerData.videoUrl) {
          return (
            <div className="aspect-video bg-slate-800 rounded-lg flex items-center justify-center text-slate-400">
              Video URL is missing.
            </div>
          )
        }
        return <VideoPlayer content={videoPlayerData} isTheaterMode={isTheaterMode} />
      case ContentKind.PODCAST:
        return (
          <PodcastPlayer
            content={{ ...currentContent, audioUrl: currentContent.audioUrl, duration: currentContent.podcastDuration }}
          />
        )
      case ContentKind.GUIDE:
        return (
          <GuideViewer
            content={{
              ...currentContent,
              chapterList: currentContent.guideSections?.map((s) => ({ title: s.title, content: s.content })) || [],
            }}
          />
        )
      default:
        return (
          <div className="bg-[#161921] border border-gray-800 rounded-lg p-8 text-center aspect-video flex flex-col justify-center items-center">
            <h2 className="text-xl font-bold mb-2">Unsupported Content</h2>
            <p className="text-gray-400">This content type cannot be displayed.</p>
          </div>
        )
    }
  }

  const contentTypeForDisplay = currentContent?.kind || routeContentTypeFromParams || "content"

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-[#0F1116] to-[#0A0A0B] text-white">
      <header className="bg-[#0A0A0B]/90 backdrop-blur-md border-b border-gray-800 h-14 flex items-center z-50 sticky top-0">
        <div className="flex items-center justify-between w-full px-4">
          <div className="flex items-center">
            <button
              className="p-2 mr-2 rounded-md hover:bg-[#161921] transition-colors lg:hidden"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <Link to="/" className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-[#FF3366] to-[#FF6699] rounded-md flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-[#FF3366] font-bold text-xl ml-2">PayGate</span>
            </Link>
          </div>
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
          <div className="flex items-center space-x-4">
            <button className="md:hidden p-2 rounded-md hover:bg-[#161921] transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="relative p-2 rounded-md hover:bg-[#161921] transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-4 h-4 bg-gradient-to-r from-[#FF3366] to-[#FF6699] rounded-full text-xs flex items-center justify-center">
                3
              </span>
            </button>
            <WalletButton />
          </div>
        </div>
      </header>
      <div className="flex h-[calc(100vh-3.5rem)]">
        <LeftSidebar
          activeTab="home"
          onCreateClick={() => setShowCreateModal(true)}
          isMobileOpen={showMobileMenu}
          onMobileClose={() => setShowMobileMenu(false)}
        />
        <div className="flex-1 flex overflow-hidden relative">
          <div
            className={`absolute top-40 left-1/4 w-96 h-96 bg-gradient-to-r ${theme.gradientSubtle} rounded-full filter blur-[120px] opacity-30 animate-pulse`}
          ></div>
          <div
            className="absolute bottom-40 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-purple-600/5 rounded-full filter blur-[120px] opacity-30 animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
          <div className="w-full lg:w-[70%] xl:w-[75%] overflow-y-auto hide-scrollbar">
            <div className="p-4">
              <div className={`mb-4 ${currentContent?.kind === ContentKind.VIDEO ? "relative" : ""}`}>
                {renderContent()}
              </div>
              {!isLoading && !error && currentContent && (
                <>
                  <div className="mb-4">
                    <h1 className="text-xl md:text-2xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      {currentContent.title}
                    </h1>
                    <div className="flex flex-wrap items-center justify-between gap-2 py-2">
                      <div className="flex items-center gap-2 text-gray-300 text-sm">
                        <div className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5 text-gray-400" />
                          <span>{formatViews(currentContent.views)} views</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-gray-400" />
                          <span>{formatDate(currentContent.createdAt)}</span>
                        </div>
                        {currentContent.premium && (
                          <>
                            <span>•</span>
                            <span className={`${theme.text} flex items-center gap-1`}>
                              <Zap className="w-3.5 h-3.5" /> Premium
                            </span>
                          </>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="flex items-center bg-[#161921] rounded-full overflow-hidden border border-gray-800">
                          <button
                            className={`flex items-center gap-1 px-3 py-1.5 ${isLiked ? theme.text : "text-gray-300"} hover:bg-[#1e212b] transition-colors border-r border-gray-800`}
                            onClick={handleLike}
                          >
                            <ThumbsUp className="w-4 h-4" />
                            <span>
                              {currentContent.likes +
                                (isLiked ? 1 : 0) -
                                (isDisliked && currentContent.likes > 0 ? 1 : 0)}
                            </span>
                          </button>
                          <button
                            className={`flex items-center gap-1 px-3 py-1.5 ${isDisliked ? theme.text : "text-gray-300"} hover:bg-[#1e212b] transition-colors`}
                            onClick={handleDislike}
                          >
                            <ThumbsDown className="w-4 h-4" />
                          </button>
                        </div>
                        <button className="flex items-center gap-1 px-3 py-1.5 bg-[#161921] rounded-full text-gray-300 hover:bg-[#1e212b] transition-colors border border-gray-800">
                          <Share2 className="w-4 h-4" />
                          <span>Share</span>
                        </button>
                        <button
                          className={`flex items-center gap-1 px-3 py-1.5 rounded-full transition-colors ${isBookmarked ? `bg-gradient-to-r ${theme.gradientSubtle} ${theme.text} border border-${theme.border}` : "bg-[#161921] text-gray-300 hover:bg-[#1e212b] border border-gray-800"}`}
                          onClick={() => setIsBookmarked(!isBookmarked)}
                        >
                          <Bookmark className="w-4 h-4" />
                          <span>Save</span>
                        </button>
                        <button className="p-1.5 bg-[#161921] rounded-full text-gray-300 hover:bg-[#1e212b] transition-colors border border-gray-800">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`flex items-center justify-between bg-[#161921] border border-gray-800 rounded-lg p-3 mb-4 hover:border-${theme.border} transition-all duration-300`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full bg-gradient-to-br ${theme.gradientSubtle} flex items-center justify-center border border-${theme.border}`}
                      >
                        <Users className={`w-5 h-5 ${theme.icon}`} />
                      </div>
                      <div>
                        <h3 className="font-medium">{currentContent.creator.username}</h3>
                        <p className="text-xs text-gray-400">Subscribers {/* Count needed */}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleSubscribe}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${isSubscribed ? "bg-[#0F1116] text-gray-300 border border-gray-700" : `bg-gradient-to-r ${theme.gradient} hover:bg-gradient-to-r hover:${theme.gradientHover} text-white`}`}
                    >
                      {isSubscribed ? "Subscribed" : "Subscribe"}
                    </button>
                  </div>
                  <div
                    className={`bg-[#161921] border border-gray-800 rounded-lg p-4 mb-6 hover:border-${theme.border} transition-all duration-300`}
                  >
                    <div className={`${!showFullDescription && "line-clamp-2"}`}>
                      <p className="text-gray-300">{currentContent.description}</p>
                    </div>
                    {currentContent.description && currentContent.description.length > 150 && (
                      <button
                        className={`${theme.text} text-sm mt-2 ${theme.hover} transition-colors`}
                        onClick={() => setShowFullDescription(!showFullDescription)}
                      >
                        {showFullDescription ? "Show less" : "Show more"}
                      </button>
                    )}
                    {showFullDescription && currentContent.tags && currentContent.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {currentContent.tags.map((tag, index) => (
                          <span
                            key={index}
                            className={`bg-[#0F1116] text-gray-300 px-2 py-1 rounded-full text-xs hover:bg-gradient-to-r hover:${theme.gradientSubtle} ${theme.hover} hover:border-${theme.border} cursor-pointer transition-all duration-200 border border-gray-800`}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="font-bold text-lg bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        {currentContent.commentsCount} Comments
                      </h2>
                      <div className="relative">
                        <button
                          className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors"
                          onClick={() => setShowSortOptions(!showSortOptions)}
                        >
                          <svg
                            className="w-4 h-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                          </svg>
                          <span className="text-sm">Sort by</span>
                          <ChevronDown className="w-4 h-4" />
                        </button>
                        {showSortOptions && (
                          <div className="absolute right-0 top-8 bg-[#161921] border border-gray-800 rounded-md shadow-lg z-10">
                            <button
                              className={`block w-full text-left px-4 py-2 text-sm ${sortOrder === "newest" ? theme.text : "text-gray-300"} hover:bg-[#1e212b] transition-colors`}
                              onClick={() => {
                                setSortOrder("newest")
                                setShowSortOptions(false)
                              }}
                            >
                              Newest first
                            </button>
                            <button
                              className={`block w-full text-left px-4 py-2 text-sm ${sortOrder === "top" ? theme.text : "text-gray-300"} hover:bg-[#1e212b] transition-colors`}
                              onClick={() => {
                                setSortOrder("top")
                                setShowSortOptions(false)
                              }}
                            >
                              Top comments
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-3 mb-6">
                      <div
                        className={`w-10 h-10 rounded-full bg-gradient-to-br ${theme.gradientSubtle} flex-shrink-0 flex items-center justify-center border border-${theme.border}`}
                      >
                        <Users className={`w-5 h-5 ${theme.icon}`} />
                      </div>
                      <div className="flex-1">
                        <textarea
                          placeholder="Add a comment..."
                          className={`w-full bg-transparent border-b border-gray-800 px-0 py-2 text-white focus:outline-none focus:border-${theme.primary} transition-all resize-none`}
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                        ></textarea>
                        {commentText.trim() && (
                          <div className="flex justify-end mt-2 gap-2">
                            <button
                              className="px-3 py-1.5 rounded-full text-sm text-gray-300 hover:bg-[#161921] transition-colors"
                              onClick={() => setCommentText("")}
                            >
                              Cancel
                            </button>
                            <button
                              className={`px-3 py-1.5 rounded-full text-sm transition-all ${commentText.trim() ? `bg-gradient-to-r ${theme.gradient} hover:bg-gradient-to-r hover:${theme.gradientHover} text-white` : "bg-[#161921] text-gray-500 cursor-not-allowed"}`}
                              onClick={handleAddComment}
                              disabled={!commentText.trim()}
                            >
                              Comment
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="space-y-6">
                      {commentsData.map((comment) => (
                        <div key={comment.id} className="flex gap-3 group">
                          <div
                            className={`w-10 h-10 rounded-full bg-gradient-to-br ${theme.gradientSubtle} flex-shrink-0 flex items-center justify-center border border-${theme.border}`}
                          >
                            <Users className={`w-5 h-5 ${theme.icon}`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{comment.author}</span>
                              <span className="text-gray-400 text-xs">{comment.timeAgo}</span>
                            </div>
                            <p className="mt-1 text-gray-300">{comment.content}</p>
                            <div className="flex items-center gap-4 mt-2">
                              <button
                                className={`flex items-center gap-1 ${comment.isLiked ? theme.text : "text-gray-400 hover:text-white"} transition-colors`}
                                onClick={() => handleLikeComment(comment.id)}
                              >
                                <ThumbsUp className="w-4 h-4" />
                                <span>{comment.likes}</span>
                              </button>
                              <button className="text-gray-400 hover:text-white transition-colors">
                                <ThumbsDown className="w-4 h-4" />
                              </button>
                              <button className="text-gray-400 hover:text-white transition-colors">Reply</button>
                              <button className="text-gray-400 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                                <Flag className="w-4 h-4" />
                              </button>
                            </div>
                            {comment.replies && comment.replies.length > 0 && (
                              <div className="mt-3">
                                <button className={`${theme.text} text-sm mb-3 flex items-center gap-1`}>
                                  <svg
                                    className="w-4 h-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <polyline points="18 15 12 9 6 15"></polyline>
                                  </svg>
                                  {comment.replies.length} replies
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="hidden lg:block lg:w-[30%] xl:w-[25%] sticky top-14 h-[calc(100vh-3.5rem)]">
            <RelatedContentSidebar relatedContent={relatedContentMock} />
          </div>
        </div>
      </div>
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-[#161921] to-[#0F1116] rounded-md max-w-md w-full p-6 relative border border-gray-800">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              onClick={() => setShowCreateModal(false)}
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#FF3366]/20 to-[#FF3366]/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#FF3366]/30">
                <svg
                  className="w-8 h-8 text-[#FF3366]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="8" r="7"></circle>
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                </svg>
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
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#FF3366]/20 to-[#FF3366]/5 flex items-center justify-center flex-shrink-0 mt-0.5 border border-[#FF3366]/30">
                  <span className="text-[#FF3366] text-sm">✓</span>
                </div>
                <p className="text-gray-300 text-sm">Keep up to 92% of your subscription revenue</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#FF3366]/20 to-[#FF3366]/5 flex items-center justify-center flex-shrink-0 mt-0.5 border border-[#FF3366]/30">
                  <span className="text-[#FF3366] text-sm">✓</span>
                </div>
                <p className="text-gray-300 text-sm">Full ownership of your content and subscriber relationships</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#FF3366]/20 to-[#FF3366]/5 flex items-center justify-center flex-shrink-0 mt-0.5 border border-[#FF3366]/30">
                  <span className="text-[#FF3366] text-sm">✓</span>
                </div>
                <p className="text-gray-300 text-sm">Automatic payments through secure smart contracts</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#FF3366]/20 to-[#FF3366]/5 flex items-center justify-center flex-shrink-0 mt-0.5 border border-[#FF3366]/30">
                  <span className="text-[#FF3366] text-sm">✓</span>
                </div>
                <p className="text-gray-300 text-sm">Create exclusive NFTs for your most dedicated fans</p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Link
                to="/apply"
                className="bg-gradient-to-r from-[#FF3366] to-[#FF6699] hover:bg-gradient-to-r hover:from-[#FF6699] hover:to-[#FF3366] text-white font-medium rounded-md py-3 text-center transition-all"
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

export default ContentPage
