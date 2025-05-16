"use client"

import type React from "react"
import { useState, useRef } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { useWalletModal } from "@solana/wallet-adapter-react-ui"
import {
  Bell,
  LayoutDashboard,
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
  Vote,
  Coins,
  Split,
  Shield,
  Clock,
} from "lucide-react"
import { Link } from "react-router-dom"
import { WalletButton } from "@/components/wallet-button"

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

// Mock data for trending creators
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

// Mock data for active proposals
const activeProposals = [
  {
    id: 1,
    title: "Create a series on DeFi fundamentals",
    votes: 234,
    daysLeft: 3,
  },
  {
    id: 2,
    title: "Launch an NFT collection for subscribers",
    votes: 187,
    daysLeft: 5,
  },
  {
    id: 3,
    title: "Start a weekly podcast on crypto news",
    votes: 156,
    daysLeft: 2,
  },
]

const UserFeed: React.FC = () => {
  const wallet = useWallet()
  const { setVisible } = useWalletModal()
  const [activeTab, setActiveTab] = useState("home")
  const [activeCategory, setActiveCategory] = useState("all")
  const [notifications, setNotifications] = useState(3)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const mainContentRef = useRef<HTMLDivElement>(null)

  const handleConnectWallet = () => {
    if (!wallet.connected) {
      setVisible(true)
    }
  }

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

  // Filter content based on active category
  const filteredContent = activeCategory === "all" ? mockFeed : mockFeed.filter((item) => item.type === activeCategory)

  return (
    <div className="h-screen flex flex-col bg-[#0F1116] text-white font-sans overflow-hidden">
      {/* Header - YouTube-like */}
      <header className="bg-[#0A0A0B] border-b border-gray-800 z-50 flex-shrink-0">
        <div className="flex items-center justify-between px-4 py-2">
          {/* Left section with logo and menu */}
          <div className="flex items-center">
            <button
              className="p-2 mr-2 rounded-full hover:bg-[#161921] lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-[#FF3366] rounded-md flex items-center justify-center">
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
                className="w-full bg-[#161921] border border-gray-800 rounded-l-full py-2 pl-4 pr-4 text-sm focus:outline-none"
              />
              <button className="bg-[#161921] border border-l-0 border-gray-800 rounded-r-full px-4 hover:bg-[#1e212b]">
                <Search className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Right section with actions */}
          <div className="flex items-center space-x-4">
            <button className="md:hidden p-2 rounded-full hover:bg-[#161921]">
              <Search className="w-5 h-5" />
            </button>

            {/* Dashboard button */}
            <Link
              to="/dashboard"
              className="hidden md:flex items-center gap-2 bg-[#FF3366] text-white px-3 py-1.5 rounded-md hover:bg-[#FF3366]/90 transition-colors"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>

            {/* Notification bell */}
            <button className="relative p-2 rounded-full hover:bg-[#161921]">
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-[#FF3366] rounded-full text-xs flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>

            {/* Wallet button */}
            <WalletButton />
          </div>
        </div>
      </header>

      {/* Main content with YouTube-like layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - YouTube-like */}
        <aside
          className={`fixed top-[53px] bottom-0 left-0 w-64 bg-[#0A0A0B] border-r border-gray-800 z-40 transition-transform duration-300 lg:translate-x-0 overflow-y-auto ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:static lg:h-full`}
        >
          <div className="py-4 px-3">
            {/* Main navigation */}
            <div className="mb-6">
              <button
                className={`w-full flex items-center gap-3 p-2.5 rounded-md text-left ${
                  activeTab === "home" ? "bg-[#161921] font-medium" : "text-gray-300 hover:bg-[#161921]/50"
                }`}
                onClick={() => setActiveTab("home")}
              >
                <HomeIcon className="w-5 h-5" />
                <span>Home</span>
              </button>

              <button
                className={`w-full flex items-center gap-3 p-2.5 rounded-md text-left ${
                  activeTab === "trending" ? "bg-[#161921] font-medium" : "text-gray-300 hover:bg-[#161921]/50"
                }`}
                onClick={() => setActiveTab("trending")}
              >
                <TrendingUp className="w-5 h-5" />
                <span>Trending</span>
              </button>

              <button
                className={`w-full flex items-center gap-3 p-2.5 rounded-md text-left ${
                  activeTab === "subscriptions" ? "bg-[#161921] font-medium" : "text-gray-300 hover:bg-[#161921]/50"
                }`}
                onClick={() => setActiveTab("subscriptions")}
              >
                <Users className="w-5 h-5" />
                <span>Subscriptions</span>
              </button>
            </div>

            <div className="border-t border-gray-800 pt-4 mb-6">
              <button
                className={`w-full flex items-center gap-3 p-2.5 rounded-md text-left ${
                  activeTab === "library" ? "bg-[#161921] font-medium" : "text-gray-300 hover:bg-[#161921]/50"
                }`}
                onClick={() => setActiveTab("library")}
              >
                <PlaySquare className="w-5 h-5" />
                <span>Library</span>
              </button>

              <button
                className={`w-full flex items-center gap-3 p-2.5 rounded-md text-left ${
                  activeTab === "history" ? "bg-[#161921] font-medium" : "text-gray-300 hover:bg-[#161921]/50"
                }`}
                onClick={() => setActiveTab("history")}
              >
                <History className="w-5 h-5" />
                <span>History</span>
              </button>

              <button
                className={`w-full flex items-center gap-3 p-2.5 rounded-md text-left ${
                  activeTab === "liked" ? "bg-[#161921] font-medium" : "text-gray-300 hover:bg-[#161921]/50"
                }`}
                onClick={() => setActiveTab("liked")}
              >
                <ThumbsUp className="w-5 h-5" />
                <span>Liked Content</span>
              </button>
            </div>

            {/* Platform features */}
            <div className="border-t border-gray-800 pt-4 mb-6">
              <h3 className="text-sm font-medium text-gray-400 mb-2 px-3">PLATFORM FEATURES</h3>

              <button
                className={`w-full flex items-center gap-3 p-2.5 rounded-md text-left text-gray-300 hover:bg-[#161921]/50`}
              >
                <Vote className="w-5 h-5" />
                <span>DAO Proposals</span>
              </button>

              <button
                className={`w-full flex items-center gap-3 p-2.5 rounded-md text-left text-gray-300 hover:bg-[#161921]/50`}
              >
                <Coins className="w-5 h-5" />
                <span>Subscription Plans</span>
              </button>

              <button
                className={`w-full flex items-center gap-3 p-2.5 rounded-md text-left text-gray-300 hover:bg-[#161921]/50`}
              >
                <Split className="w-5 h-5" />
                <span>Revenue Splitting</span>
              </button>

              <button
                className={`w-full flex items-center gap-3 p-2.5 rounded-md text-left text-gray-300 hover:bg-[#161921]/50`}
              >
                <Shield className="w-5 h-5" />
                <span>Smart Contracts</span>
              </button>
            </div>

            {/* Subscriptions */}
            <div className="border-t border-gray-800 pt-4">
              <h3 className="text-sm font-medium text-gray-400 mb-2 px-3">SUBSCRIPTIONS</h3>
              {trendingCreators.map((creator, index) => (
                <button
                  key={index}
                  className="w-full flex items-center gap-3 p-2.5 rounded-md text-left text-gray-300 hover:bg-[#161921]/50"
                >
                  <div className="w-6 h-6 rounded-full bg-[#FF3366]/10 flex items-center justify-center">
                    <Users className="w-3 h-3 text-[#FF3366]" />
                  </div>
                  <span className="truncate">{creator.name}</span>
                </button>
              ))}

              <button className="w-full flex items-center gap-3 p-2.5 rounded-md text-left text-gray-300 hover:bg-[#161921]/50">
                <ChevronDown className="w-5 h-5" />
                <span>Show more</span>
              </button>
            </div>

            {/* Dashboard link */}
            <div className="border-t border-gray-800 mt-4 pt-4">
              <Link
                to="/dashboard"
                className="w-full flex items-center gap-3 p-2.5 rounded-md text-left text-[#FF3366] hover:bg-[#161921]/50"
              >
                <LayoutDashboard className="w-5 h-5" />
                <span>Go to Dashboard</span>
              </Link>
            </div>
          </div>
        </aside>

        {/* Main content - Scrollable */}
        <main ref={mainContentRef} className="flex-1 overflow-y-auto">
          <div className="py-6 px-4">
            {/* Category chips - YouTube-like */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-6 hide-scrollbar sticky top-0 bg-[#0F1116] z-10 py-2">
              <button
                className={`${activeCategory === "all" ? "bg-[#FF3366] text-white" : "bg-[#161921] hover:bg-[#1e212b]"} px-3 py-1 rounded-full text-sm whitespace-nowrap`}
                onClick={() => setActiveCategory("all")}
              >
                All
              </button>
              <button
                className={`${activeCategory === "video" ? "bg-[#FF3366] text-white" : "bg-[#161921] hover:bg-[#1e212b]"} px-3 py-1 rounded-full text-sm whitespace-nowrap flex items-center gap-1`}
                onClick={() => setActiveCategory("video")}
              >
                <Video className="w-3 h-3" /> Videos
              </button>
              <button
                className={`${activeCategory === "article" ? "bg-[#FF3366] text-white" : "bg-[#161921] hover:bg-[#1e212b]"} px-3 py-1 rounded-full text-sm whitespace-nowrap flex items-center gap-1`}
                onClick={() => setActiveCategory("article")}
              >
                <FileText className="w-3 h-3" /> Articles
              </button>
              <button
                className={`${activeCategory === "podcast" ? "bg-[#FF3366] text-white" : "bg-[#161921] hover:bg-[#1e212b]"} px-3 py-1 rounded-full text-sm whitespace-nowrap flex items-center gap-1`}
                onClick={() => setActiveCategory("podcast")}
              >
                <Headphones className="w-3 h-3" /> Podcasts
              </button>
              <button
                className={`${activeCategory === "guide" ? "bg-[#FF3366] text-white" : "bg-[#161921] hover:bg-[#1e212b]"} px-3 py-1 rounded-full text-sm whitespace-nowrap flex items-center gap-1`}
                onClick={() => setActiveCategory("guide")}
              >
                <BookOpen className="w-3 h-3" /> Guides
              </button>
              <button className="bg-[#161921] hover:bg-[#1e212b] px-3 py-1 rounded-full text-sm whitespace-nowrap">
                NFTs
              </button>
              <button className="bg-[#161921] hover:bg-[#1e212b] px-3 py-1 rounded-full text-sm whitespace-nowrap">
                DeFi
              </button>
              <button className="bg-[#161921] hover:bg-[#1e212b] px-3 py-1 rounded-full text-sm whitespace-nowrap">
                Gaming
              </button>
              <button className="bg-[#161921] hover:bg-[#1e212b] px-3 py-1 rounded-full text-sm whitespace-nowrap">
                DAOs
              </button>
            </div>

            {/* Active DAO Proposals */}
            {activeTab === "home" && (
              <div className="mb-8 bg-[#161921] rounded-md p-4 border border-gray-800">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium flex items-center gap-2">
                    <Vote className="w-4 h-4 text-[#FF3366]" />
                    Active DAO Proposals
                  </h3>
                  <Link to="/dashboard/proposals" className="text-[#FF3366] text-sm hover:underline">
                    View All
                  </Link>
                </div>
                <div className="space-y-3">
                  {activeProposals.map((proposal) => (
                    <div key={proposal.id} className="bg-[#0F1116] rounded-md p-3 flex items-center justify-between">
                      <div>
                        <div className="font-medium text-sm">{proposal.title}</div>
                        <div className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                          <Clock className="w-3 h-3" /> {proposal.daysLeft} days left
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-xs text-gray-400">{proposal.votes} votes</div>
                        <button className="bg-[#FF3366] text-white text-xs px-2 py-1 rounded">Vote</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Content grid - All types */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredContent.map((item) => (
                <div key={item.id} className="flex flex-col">
                  {/* Thumbnail with appropriate indicators for each content type */}
                  <div className="relative aspect-video bg-[#161921] rounded-md overflow-hidden mb-2">
                    <div className="absolute inset-0 flex items-center justify-center">
                      {getContentTypeIcon(item.type)}
                    </div>

                    {/* Content type specific indicators */}
                    {item.type === "video" && (
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1 py-0.5 rounded">
                        {item.duration}
                      </div>
                    )}

                    {item.type === "article" && (
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1 py-0.5 rounded">
                        {item.readTime}
                      </div>
                    )}

                    {item.type === "podcast" && (
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1 py-0.5 rounded">
                        {item.duration}
                      </div>
                    )}

                    {item.type === "guide" && (
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1 py-0.5 rounded">
                        {item.chapters}
                      </div>
                    )}

                    {/* Content tier badge */}
                    {item.tier === "Premium" && (
                      <div className="absolute top-2 left-2 bg-[#FF3366] text-white text-xs px-1.5 py-0.5 rounded">
                        PREMIUM
                      </div>
                    )}

                    {/* Content type badge */}
                    <div className="absolute top-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded flex items-center gap-1">
                      {item.type === "video" && <Video className="w-3 h-3" />}
                      {item.type === "article" && <FileText className="w-3 h-3" />}
                      {item.type === "podcast" && <Headphones className="w-3 h-3" />}
                      {item.type === "guide" && <BookOpen className="w-3 h-3" />}
                      <span className="capitalize">{item.type}</span>
                    </div>
                  </div>

                  {/* Content info */}
                  <div className="flex">
                    {/* Creator avatar */}
                    <div className="w-9 h-9 rounded-full bg-[#FF3366]/10 flex-shrink-0 flex items-center justify-center mr-3">
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
                    <button className="p-1 text-gray-400 hover:text-white">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Mobile bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0A0A0B] border-t border-gray-800 lg:hidden z-50">
        <div className="grid grid-cols-5 gap-1 p-2">
          <button
            className={`flex flex-col items-center justify-center p-2 rounded-md ${
              activeTab === "home" ? "text-white" : "text-gray-400"
            }`}
            onClick={() => setActiveTab("home")}
          >
            <HomeIcon className="w-5 h-5" />
            <span className="text-xs mt-1">Home</span>
          </button>

          <button
            className={`flex flex-col items-center justify-center p-2 rounded-md ${
              activeTab === "trending" ? "text-white" : "text-gray-400"
            }`}
            onClick={() => setActiveTab("trending")}
          >
            <TrendingUp className="w-5 h-5" />
            <span className="text-xs mt-1">Trending</span>
          </button>

          <Link to="/dashboard" className="flex flex-col items-center justify-center p-2 rounded-md text-[#FF3366]">
            <div className="w-10 h-10 bg-[#FF3366] rounded-full flex items-center justify-center -mt-5 border-4 border-[#0A0A0B]">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs mt-1">Dashboard</span>
          </Link>

          <button
            className={`flex flex-col items-center justify-center p-2 rounded-md ${
              activeTab === "subscriptions" ? "text-white" : "text-gray-400"
            }`}
            onClick={() => setActiveTab("subscriptions")}
          >
            <Users className="w-5 h-5" />
            <span className="text-xs mt-1">Subs</span>
          </button>

          <button
            className={`flex flex-col items-center justify-center p-2 rounded-md ${
              activeTab === "library" ? "text-white" : "text-gray-400"
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
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)}></div>
      )}
    </div>
  )
}

export default UserFeed
