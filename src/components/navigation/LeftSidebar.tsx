"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  HomeIcon,
  TrendingUp,
  Users,
  Compass,
  PlaySquare,
  History,
  ThumbsUp,
  Bookmark,
  ChevronDown,
  Video,
  FileText,
  Headphones,
  BookOpen,
  PlusCircle,
} from "lucide-react"

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

interface LeftSidebarProps {
  activeTab?: string
  onTabChange?: (tab: string) => void
  onCreateClick?: () => void
  className?: string
  isMobileOpen?: boolean
  onMobileClose?: () => void
}

const LeftSidebar = ({
  activeTab = "home",
  onTabChange,
  onCreateClick,
  className = "",
  isMobileOpen = false,
  onMobileClose,
}: LeftSidebarProps) => {
  const location = useLocation()
  const [showMoreSubscriptions, setShowMoreSubscriptions] = useState(false)

  const handleTabClick = (tab: string) => {
    if (onTabChange) {
      onTabChange(tab)
    }
    if (onMobileClose && isMobileOpen) {
      onMobileClose()
    }
  }

  const navItems = [
    {
      id: "home",
      name: "Home",
      icon: <HomeIcon className="w-5 h-5" />,
      path: "/",
    },
    {
      id: "trending",
      name: "Trending",
      icon: <TrendingUp className="w-5 h-5" />,
      path: "/trending",
    },
    {
      id: "subscriptions",
      name: "Subscriptions",
      icon: <Users className="w-5 h-5" />,
      path: "/subscriptions",
    },
    {
      id: "explore",
      name: "Explore",
      icon: <Compass className="w-5 h-5" />,
      path: "/explore",
    },
  ]

  const libraryItems = [
    {
      id: "library",
      name: "Library",
      icon: <PlaySquare className="w-5 h-5" />,
      path: "/library",
    },
    {
      id: "history",
      name: "History",
      icon: <History className="w-5 h-5" />,
      path: "/history",
    },
    {
      id: "liked",
      name: "Liked Content",
      icon: <ThumbsUp className="w-5 h-5" />,
      path: "/liked",
    },
    {
      id: "bookmarks",
      name: "Bookmarks",
      icon: <Bookmark className="w-5 h-5" />,
      path: "/bookmarks",
    },
  ]

  const exploreItems = [
    {
      id: "videos",
      name: "Videos",
      icon: <Video className="w-5 h-5" />,
      path: "/videos",
    },
    {
      id: "articles",
      name: "Articles",
      icon: <FileText className="w-5 h-5" />,
      path: "/articles",
    },
    {
      id: "podcasts",
      name: "Podcasts",
      icon: <Headphones className="w-5 h-5" />,
      path: "/podcasts",
    },
    {
      id: "guides",
      name: "Guides",
      icon: <BookOpen className="w-5 h-5" />,
      path: "/guides",
    },
  ]

  // Determine if a nav item is active based on location or activeTab
  const isActive = (item: { id: string; path: string }) => {
    if (location.pathname === item.path) return true
    if (activeTab === item.id) return true
    return false
  }

  return (
    <>
      {/* Mobile sidebar */}
      <aside
        className={`fixed top-14 bottom-0 left-0 w-64 bg-gradient-to-b from-[#0A0A0B] to-[#0F1116] border-r border-gray-800 z-40 transition-transform duration-300 lg:translate-x-0 overflow-y-auto hide-scrollbar ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden`}
      >
        <div className="py-4 px-3">
          {/* Main navigation - User focused */}
          <div className="mb-6">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`w-full flex items-center gap-3 p-2.5 rounded-md text-left transition-colors ${
                  isActive(item)
                    ? "bg-gradient-to-r from-[#FF3366]/20 to-[#FF3366]/5 text-[#FF3366] border border-[#FF3366]/20 shadow-glow-sm"
                    : "text-gray-300 hover:bg-[#161921]/50"
                }`}
                onClick={() => handleTabClick(item.id)}
              >
                <div className={`${isActive(item) ? "text-[#FF3366]" : "text-gray-400"}`}>{item.icon}</div>
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          <div className="border-t border-gray-800 pt-4 mb-6">
            {libraryItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`w-full flex items-center gap-3 p-2.5 rounded-md text-left transition-colors ${
                  isActive(item)
                    ? "bg-gradient-to-r from-[#FF3366]/20 to-[#FF3366]/5 text-[#FF3366] border border-[#FF3366]/20 shadow-glow-sm"
                    : "text-gray-300 hover:bg-[#161921]/50"
                }`}
                onClick={() => handleTabClick(item.id)}
              >
                <div className={`${isActive(item) ? "text-[#FF3366]" : "text-gray-400"}`}>{item.icon}</div>
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Subscriptions */}
          <div className="border-t border-gray-800 pt-4">
            <h3 className="text-sm font-medium text-gray-400 mb-2 px-3">SUBSCRIPTIONS</h3>
            {trendingCreators.slice(0, showMoreSubscriptions ? trendingCreators.length : 3).map((creator, index) => (
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

            <button
              className="w-full flex items-center gap-3 p-2.5 rounded-md text-left text-gray-300 hover:bg-[#161921]/50 transition-colors"
              onClick={() => setShowMoreSubscriptions(!showMoreSubscriptions)}
            >
              <ChevronDown className="w-5 h-5" />
              <span>{showMoreSubscriptions ? "Show less" : "Show more"}</span>
            </button>
          </div>

          {/* Explore content types */}
          <div className="border-t border-gray-800 mt-4 pt-4">
            <h3 className="text-sm font-medium text-gray-400 mb-2 px-3">EXPLORE</h3>

            {exploreItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`w-full flex items-center gap-3 p-2.5 rounded-md text-left transition-colors ${
                  isActive(item)
                    ? "bg-gradient-to-r from-[#FF3366]/20 to-[#FF3366]/5 text-[#FF3366] border border-[#FF3366]/20 shadow-glow-sm"
                    : "text-gray-300 hover:bg-[#161921]/50"
                }`}
                onClick={() => handleTabClick(item.id)}
              >
                <div className={`${isActive(item) ? "text-[#FF3366]" : "text-gray-400"}`}>{item.icon}</div>
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Become a creator button */}
          <div className="border-t border-gray-800 mt-4 pt-4">
            <button
              onClick={onCreateClick}
              className="w-full flex items-center gap-3 p-2.5 rounded-md text-left text-[#FF3366] hover:bg-[#161921]/50 transition-colors"
            >
              <PlusCircle className="w-5 h-5" />
              <span>Become a Creator</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Desktop sidebar */}
      <aside
        className={`hidden lg:flex flex-col w-64 bg-gradient-to-b from-[#0A0A0B] to-[#0F1116] border-r border-gray-800 h-screen sticky top-0 ${className}`}
        style={{ backdropFilter: "blur(12px)" }}
      >
        <div className="py-4 px-3 overflow-y-auto hide-scrollbar h-full">
          {/* Main navigation */}
          <div className="mb-6">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`w-full flex items-center gap-3 p-2.5 rounded-md text-left transition-colors ${
                  isActive(item)
                    ? "bg-gradient-to-r from-[#FF3366]/20 to-[#FF3366]/5 text-[#FF3366] border border-[#FF3366]/20 shadow-glow-sm"
                    : "text-gray-300 hover:bg-[#161921]/50"
                }`}
                onClick={() => handleTabClick(item.id)}
              >
                <div className={`${isActive(item) ? "text-[#FF3366]" : "text-gray-400"}`}>{item.icon}</div>
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          <div className="border-t border-gray-800 pt-4 mb-6">
            {libraryItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`w-full flex items-center gap-3 p-2.5 rounded-md text-left transition-colors ${
                  isActive(item)
                    ? "bg-gradient-to-r from-[#FF3366]/20 to-[#FF3366]/5 text-[#FF3366] border border-[#FF3366]/20 shadow-glow-sm"
                    : "text-gray-300 hover:bg-[#161921]/50"
                }`}
                onClick={() => handleTabClick(item.id)}
              >
                <div className={`${isActive(item) ? "text-[#FF3366]" : "text-gray-400"}`}>{item.icon}</div>
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Subscriptions */}
          <div className="border-t border-gray-800 pt-4">
            <h3 className="text-sm font-medium text-gray-400 mb-2 px-3">SUBSCRIPTIONS</h3>
            {trendingCreators.slice(0, showMoreSubscriptions ? trendingCreators.length : 3).map((creator, index) => (
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

            <button
              className="w-full flex items-center gap-3 p-2.5 rounded-md text-left text-gray-300 hover:bg-[#161921]/50 transition-colors"
              onClick={() => setShowMoreSubscriptions(!showMoreSubscriptions)}
            >
              <ChevronDown className="w-5 h-5" />
              <span>{showMoreSubscriptions ? "Show less" : "Show more"}</span>
            </button>
          </div>

          {/* Explore content types */}
          <div className="border-t border-gray-800 mt-4 pt-4">
            <h3 className="text-sm font-medium text-gray-400 mb-2 px-3">EXPLORE</h3>

            {exploreItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`w-full flex items-center gap-3 p-2.5 rounded-md text-left transition-colors ${
                  isActive(item)
                    ? "bg-gradient-to-r from-[#FF3366]/20 to-[#FF3366]/5 text-[#FF3366] border border-[#FF3366]/20 shadow-glow-sm"
                    : "text-gray-300 hover:bg-[#161921]/50"
                }`}
                onClick={() => handleTabClick(item.id)}
              >
                <div className={`${isActive(item) ? "text-[#FF3366]" : "text-gray-400"}`}>{item.icon}</div>
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Become a creator button */}
          <div className="border-t border-gray-800 mt-4 pt-4">
            <button
              onClick={onCreateClick}
              className="w-full flex items-center gap-3 p-2.5 rounded-md text-left text-[#FF3366] hover:bg-[#161921]/50 transition-colors"
            >
              <PlusCircle className="w-5 h-5" />
              <span>Become a Creator</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}

export default LeftSidebar
