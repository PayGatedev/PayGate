"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { useWalletModal } from "@solana/wallet-adapter-react-ui"
import {
  Bell,
  Search,
  Zap,
  Menu,
  X,
  Plus,
  Video,
  FileText,
  Headphones,
  BookOpen,
  MoreVertical,
  Users,
  Flame,
  TrendingUp,
  PlaySquare,
} from "lucide-react"
import { WalletButton } from "../components/wallet-button"
import { Link, useNavigate } from "react-router-dom"
import LeftSidebar from "../components/navigation/LeftSidebar"

// Mock data for the feed with all content types
const mockFeed = [
  {
    id: 1,
    type: "video",
    title: "The Future of Decentralized Content",
    creator: "CryptoVisionary",
    views: "24K",
    timeAgo: "2 days ago",
    duration: "12:45",
    trending: true,
    tier: "Basic",
    description: "Exploring how blockchain technology is revolutionizing content creation and distribution...",
  },
  {
    id: 2,
    type: "article",
    title: "Complete Guide to NFT Collections",
    creator: "NFT_Master",
    views: "18K",
    timeAgo: "5 days ago",
    readTime: "8 min read",
    exclusive: true,
    tier: "Premium",
    description: "Learn the step-by-step process to create and launch your first NFT collection on Solana...",
  },
  {
    id: 3,
    type: "podcast",
    title: "Web3 Gaming Revolution - Episode 12",
    creator: "GameChanger",
    views: "12K",
    timeAgo: "1 week ago",
    duration: "45:18",
    trending: true,
    tier: "Basic",
    description: "Discussing the latest developments in blockchain gaming and the future of play-to-earn...",
  },
  {
    id: 4,
    type: "guide",
    title: "Tokenomics Explained: A Beginner's Guide",
    creator: "CryptoEducator",
    views: "31K",
    timeAgo: "2 weeks ago",
    chapters: "5 chapters",
    tier: "Free",
    description: "Understanding the economic models behind successful crypto projects...",
  },
  {
    id: 5,
    type: "video",
    title: "Advanced Smart Contract Development",
    creator: "BlockchainDev",
    views: "20K",
    timeAgo: "3 weeks ago",
    duration: "32:43",
    exclusive: true,
    tier: "Premium",
    description: "Deep dive into advanced smart contract patterns and security best practices...",
  },
  {
    id: 6,
    type: "article",
    title: "The Complete Guide to DeFi Staking",
    creator: "DeFi_Guru",
    views: "15K",
    timeAgo: "1 month ago",
    readTime: "12 min read",
    tier: "Basic",
    description: "Everything you need to know about staking your assets in DeFi protocols...",
  },
  {
    id: 7,
    type: "podcast",
    title: "Blockchain Security Best Practices",
    creator: "SecurityExpert",
    views: "28K",
    timeAgo: "1 month ago",
    duration: "52:24",
    trending: true,
    tier: "Premium",
    description: "Essential security practices every blockchain developer and user should know...",
  },
  {
    id: 8,
    type: "guide",
    title: "How to Create a DAO from Scratch",
    creator: "DAObuilder",
    views: "22K",
    timeAgo: "2 months ago",
    chapters: "8 chapters",
    tier: "Basic",
    description:
      "Step-by-step instructions for building and launching your own decentralized autonomous organization...",
  },
  {
    id: 9,
    type: "video",
    title: "NFT Marketplace Development Tutorial",
    creator: "Web3Wizard",
    views: "19K",
    timeAgo: "2 months ago",
    duration: "28:15",
    tier: "Premium",
    description: "Learn how to build your own NFT marketplace from scratch using Solana...",
  },
  {
    id: 10,
    type: "article",
    title: "Revenue Splitting with Smart Contracts",
    creator: "CryptoLawyer",
    views: "14K",
    timeAgo: "3 months ago",
    readTime: "10 min read",
    tier: "Basic",
    description: "How to implement automatic revenue splitting for creator collaborations using smart contracts...",
  },
]

// Mock data for trending content
const trendingContent = [
  {
    id: 1,
    type: "video",
    title: "Top 10 NFT Projects of 2023",
    creator: "NFT_Master",
    views: "45K",
    timeAgo: "3 days ago",
    duration: "18:24",
  },
  {
    id: 2,
    type: "article",
    title: "How to Earn Passive Income with DeFi",
    creator: "DeFi_Guru",
    views: "32K",
    timeAgo: "1 week ago",
    readTime: "15 min read",
  },
  {
    id: 3,
    type: "podcast",
    title: "The Future of Web3 Gaming",
    creator: "GameChanger",
    views: "28K",
    timeAgo: "5 days ago",
    duration: "42:15",
  },
]

const UserFeed: React.FC = () => {
  const wallet = useWallet()
  const { setVisible } = useWalletModal()
  const [activeTab, setActiveTab] = useState("home")
  const [activeCategory, setActiveCategory] = useState("all")
  const [notifications, setNotifications] = useState(3)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const mainContentRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

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
    switch (type) {
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
    switch (type) {
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

  // Filter content based on active category
  const filteredContent = activeCategory === "all" ? mockFeed : mockFeed.filter((item) => item.type === activeCategory)

  const handleContentClick = (item: any) => {
    navigate(`/${item.type}/${item.id}`)
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
        {/* Left Sidebar Component */}
        <LeftSidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onCreateClick={() => setShowCreateModal(true)}
          isMobileOpen={sidebarOpen}
          onMobileClose={() => setSidebarOpen(false)}
        />

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
            {activeTab === "home" && (
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
                      <div className="relative aspect-video bg-gradient-to-br from-[#0F1116] to-[#161921] flex items-center justify-center">
                        {getContentTypeIcon(item.type)}
                        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded-md flex items-center gap-1">
                          {item.type === "video" && item.duration}
                          {item.type === "article" && item.readTime}
                          {item.type === "podcast" && item.duration}
                        </div>
                        <div className="absolute top-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded-md flex items-center gap-1">
                          {getSmallContentTypeIcon(item.type)}
                          <span className="capitalize">{item.type}</span>
                        </div>
                      </div>
                      <div className="p-3">
                        <h4 className="font-medium text-sm mb-1">{item.title}</h4>
                        <div className="flex justify-between items-center">
                          <p className="text-gray-400 text-xs">{item.creator}</p>
                          <div className="flex items-center text-gray-400 text-xs">
                            <span>{item.views} views</span>
                            <span className="mx-1">•</span>
                            <span>{item.timeAgo}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Content grid - All types with dashboard styling */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredContent.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col bg-[#161921] rounded-md border border-gray-800 overflow-hidden hover:border-gray-700 transition-all hover:shadow-glow-sm cursor-pointer"
                  onClick={() => handleContentClick(item)}
                >
                  {/* Thumbnail with appropriate indicators for each content type */}
                  <div className="relative aspect-video bg-gradient-to-br from-[#0F1116] to-[#161921] flex items-center justify-center">
                    {getContentTypeIcon(item.type)}

                    {/* Content type specific indicators */}
                    {item.type === "video" && (
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded-md flex items-center gap-1">
                        <svg
                          className="w-3 h-3"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        {item.duration}
                      </div>
                    )}

                    {item.type === "article" && (
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded-md flex items-center gap-1">
                        <svg
                          className="w-3 h-3"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        {item.readTime}
                      </div>
                    )}

                    {item.type === "podcast" && (
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded-md flex items-center gap-1">
                        <svg
                          className="w-3 h-3"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        {item.duration}
                      </div>
                    )}

                    {item.type === "guide" && (
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded-md flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        {item.chapters}
                      </div>
                    )}

                    {/* Content tier badge */}
                    {item.tier === "Premium" && (
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
                      <p className="text-gray-400 text-xs mb-1">{item.creator}</p>
                      <div className="flex items-center text-gray-400 text-xs">
                        <span>{item.views} views</span>
                        <span className="mx-1">•</span>
                        <span>{item.timeAgo}</span>
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
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
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

          <button
            onClick={() => setShowCreateModal(true)}
            className="flex flex-col items-center justify-center p-2 rounded-md text-[#FF3366]"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-[#FF3366] to-[#FF6699] rounded-full flex items-center justify-center -mt-5 border-4 border-[#0A0A0B] shadow-glow-sm">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs mt-1">Create</span>
          </button>

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

export default UserFeed
