"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { DashboardLayout } from "@/components/dashboard/layout"
import { Plus, Search, Filter, FileText, Video, Headphones, BookOpen, SlidersHorizontal, Eye, Heart, MessageSquare, MoreVertical, Edit, Trash2, ExternalLink, Calendar, Clock, ArrowRight, CheckCircle, AlertCircle, Clock3 } from 'lucide-react'

export default function ContentPage() {
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState<string>("all")
  const [activeTab, setActiveTab] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [menuOpen, setMenuOpen] = useState<number | null>(null)

  const contentItems = [
    {
      id: 1,
      title: "Getting Started with Solana Development",
      type: "article",
      status: "published",
      accessType: "recurring",
      date: "May 10, 2025",
      views: 1245,
      likes: 89,
      comments: 32,
      duration: "15 min read",
    },
    {
      id: 2,
      title: "NFT Marketplace Deep Dive",
      type: "video",
      status: "published",
      accessType: "nft",
      date: "May 5, 2025",
      views: 2189,
      likes: 156,
      comments: 47,
      duration: "32 min",
    },
    {
      id: 3,
      title: "Web3 Gaming Podcast Episode 5",
      type: "podcast",
      status: "published",
      accessType: "free",
      date: "May 1, 2025",
      views: 876,
      likes: 45,
      comments: 12,
      duration: "48 min",
    },
    {
      id: 4,
      title: "DeFi Staking Strategies",
      type: "guide",
      status: "draft",
      accessType: "one-time",
      date: "Draft",
      views: 0,
      likes: 0,
      comments: 0,
      duration: "25 min read",
    },
    {
      id: 5,
      title: "Tokenomics Explained",
      type: "article",
      status: "scheduled",
      accessType: "recurring",
      date: "Scheduled for May 20, 2025",
      views: 0,
      likes: 0,
      comments: 0,
      duration: "20 min read",
    },
    {
      id: 6,
      title: "Building a DAO from Scratch",
      type: "video",
      status: "published",
      accessType: "recurring",
      date: "April 25, 2025",
      views: 1567,
      likes: 123,
      comments: 34,
      duration: "45 min",
    },
  ]

  const typeIcons = {
    article: <FileText className="w-full h-full" />,
    video: <Video className="w-full h-full" />,
    podcast: <Headphones className="w-full h-full" />,
    guide: <BookOpen className="w-full h-full" />,
  }

  const typeColors = {
    article: "from-green-500/30 to-green-500/10 text-green-400",
    video: "from-blue-500/30 to-blue-500/10 text-blue-400",
    podcast: "from-purple-500/30 to-purple-500/10 text-purple-400",
    guide: "from-yellow-500/30 to-yellow-500/10 text-yellow-400",
  }

  const statusColors = {
    published: "bg-green-500/20 text-green-400",
    draft: "bg-gray-500/20 text-gray-400",
    scheduled: "bg-blue-500/20 text-blue-400",
  }

  const accessColors = {
    free: "bg-green-500/20 text-green-400",
    "one-time": "bg-yellow-500/20 text-yellow-400",
    recurring: "bg-[#FF3366]/20 text-[#FF3366]",
    nft: "bg-purple-500/20 text-purple-400",
  }

  const statusIcons = {
    published: <CheckCircle className="w-4 h-4 mr-1" />,
    draft: <AlertCircle className="w-4 h-4 mr-1" />,
    scheduled: <Clock3 className="w-4 h-4 mr-1" />,
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter)
  }

  const handleMenuToggle = (id: number) => {
    setMenuOpen(menuOpen === id ? null : id)
  }

  const handleNewContent = () => {
    navigate("/dashboard/content/create")
  }

  const handleEdit = (id: number) => {
    console.log("Edit content", id)
    setMenuOpen(null)
  }

  const handleDelete = (id: number) => {
    console.log("Delete content", id)
    setMenuOpen(null)
  }

  const handleViewOnChain = (id: number) => {
    console.log("View on chain", id)
    setMenuOpen(null)
  }

  const filteredContent = contentItems.filter((item) => {
    // Filter by tab
    if (activeTab !== "all" && item.status !== activeTab) return false

    // Filter by type/access/etc
    const matchesFilter =
      activeFilter === "all" ||
      item.type === activeFilter ||
      item.status === activeFilter ||
      item.accessType === activeFilter

    // Filter by search
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesFilter && matchesSearch
  })

  return (
    <DashboardLayout>
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

      {/* Content Tabs */}
      <div className="mb-6 flex overflow-x-auto hide-scrollbar">
        <button
          onClick={() => handleTabChange("all")}
          className={`px-4 py-2 rounded-full mr-2 transition-all ${
            activeTab === "all"
              ? "bg-gradient-to-r from-[#FF3366] to-[#FF3366]/80 text-white font-medium shadow-glow-sm"
              : "text-white/60 hover:text-white hover:bg-white/5"
          }`}
        >
          All Content
        </button>
        <button
          onClick={() => handleTabChange("published")}
          className={`px-4 py-2 rounded-full mr-2 transition-all ${
            activeTab === "published"
              ? "bg-gradient-to-r from-[#FF3366] to-[#FF3366]/80 text-white font-medium shadow-glow-sm"
              : "text-white/60 hover:text-white hover:bg-white/5"
          }`}
        >
          Published
        </button>
        <button
          onClick={() => handleTabChange("draft")}
          className={`px-4 py-2 rounded-full mr-2 transition-all ${
            activeTab === "draft"
              ? "bg-gradient-to-r from-[#FF3366] to-[#FF3366]/80 text-white font-medium shadow-glow-sm"
              : "text-white/60 hover:text-white hover:bg-white/5"
          }`}
        >
          Drafts
        </button>
        <button
          onClick={() => handleTabChange("scheduled")}
          className={`px-4 py-2 rounded-full transition-all ${
            activeTab === "scheduled"
              ? "bg-gradient-to-r from-[#FF3366] to-[#FF3366]/80 text-white font-medium shadow-glow-sm"
              : "text-white/60 hover:text-white hover:bg-white/5"
          }`}
        >
          Scheduled
        </button>
      </div>

      {/* Search and Filters */}
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
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${
                  activeFilter === "all"
                    ? "bg-gradient-to-r from-[#FF3366]/20 to-[#FF3366]/5 text-[#FF3366] border border-[#FF3366]/20 shadow-glow-sm"
                    : "bg-white/5 text-white/80 border border-white/10 hover:bg-white/10"
                }`}
              >
                <Filter className="w-4 h-4" />
                All Types
              </button>
              <button
                onClick={() => handleFilterChange("article")}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${
                  activeFilter === "article"
                    ? "bg-gradient-to-r from-green-500/20 to-green-500/5 text-green-400 border border-green-500/20"
                    : "bg-white/5 text-white/80 border border-white/10 hover:bg-white/10"
                }`}
              >
                <FileText className="w-4 h-4" />
                Articles
              </button>
              <button
                onClick={() => handleFilterChange("video")}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${
                  activeFilter === "video"
                    ? "bg-gradient-to-r from-blue-500/20 to-blue-500/5 text-blue-400 border border-blue-500/20"
                    : "bg-white/5 text-white/80 border border-white/10 hover:bg-white/10"
                }`}
              >
                <Video className="w-4 h-4" />
                Videos
              </button>
              <button
                onClick={() => handleFilterChange("podcast")}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${
                  activeFilter === "podcast"
                    ? "bg-gradient-to-r from-purple-500/20 to-purple-500/5 text-purple-400 border border-purple-500/20"
                    : "bg-white/5 text-white/80 border border-white/10 hover:bg-white/10"
                }`}
              >
                <Headphones className="w-4 h-4" />
                Podcasts
              </button>
              <button
                onClick={() => handleFilterChange("guide")}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${
                  activeFilter === "guide"
                    ? "bg-gradient-to-r from-yellow-500/20 to-yellow-500/5 text-yellow-400 border border-yellow-500/20"
                    : "bg-white/5 text-white/80 border border-white/10 hover:bg-white/10"
                }`}
              >
                <BookOpen className="w-4 h-4" />
                Guides
              </button>
              <button className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm whitespace-nowrap bg-white/5 text-white/80 border border-white/10 hover:bg-white/10 transition-all">
                <SlidersHorizontal className="w-4 h-4" />
                More Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      {filteredContent.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredContent.map((item) => (
            <div
              key={item.id}
              className="glassmorphism-card rounded-xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden hover:bg-white/10 transition-all group"
            >
              <div className="relative aspect-video bg-gradient-to-br from-[#161921]/80 to-[#0F1116]/80 overflow-hidden">
                {/* SVG Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#161921] to-[#0F1116]">
                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-br ${typeColors[item.type]} p-4 opacity-50 group-hover:opacity-70 transition-opacity`}
                  >
                    {typeIcons[item.type]}
                  </div>
                </div>

                <div className="absolute top-2 right-2 flex gap-2">
                  <span
                    className={`text-xs px-2 py-1 rounded-md ${statusColors[item.status]} backdrop-blur-sm flex items-center`}
                  >
                    {statusIcons[item.status]}
                    {item.status}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-md ${accessColors[item.accessType]} backdrop-blur-sm`}>
                    {item.accessType}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className={`text-xs px-2 py-1 rounded-md bg-gradient-to-r ${typeColors[item.type]}`}>
                      {item.type}
                    </span>
                    <h3 className="font-medium mt-2 text-white group-hover:text-[#FF3366] transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 text-xs text-white/60">
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        <span>{item.date}</span>
                      </div>
                      <span className="text-white/40">•</span>
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>{item.duration}</span>
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <button
                      onClick={() => handleMenuToggle(item.id)}
                      className="p-1 rounded-md hover:bg-white/10 transition-colors"
                    >
                      <MoreVertical className="w-4 h-4 text-white/60" />
                    </button>

                    {menuOpen === item.id && (
                      <div className="absolute right-0 mt-1 w-36 glassmorphism-card bg-white/5 border border-white/10 rounded-lg shadow-lg z-10 backdrop-blur-md">
                        <button
                          onClick={() => handleEdit(item.id)}
                          className="flex items-center w-full gap-2 px-3 py-2 text-xs hover:bg-white/10 transition-colors text-white/80"
                        >
                          <Edit className="w-3 h-3" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleViewOnChain(item.id)}
                          className="flex items-center w-full gap-2 px-3 py-2 text-xs hover:bg-white/10 transition-colors text-white/80"
                        >
                          <ExternalLink className="w-3 h-3" />
                          View on Chain
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="flex items-center w-full gap-2 px-3 py-2 text-xs text-red-400 hover:bg-white/10 transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-1 text-xs text-white/60">
                    <Eye className="w-3 h-3" />
                    <span>{item.views.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-white/60">
                    <Heart className="w-3 h-3" />
                    <span>{item.likes.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-white/60">
                    <MessageSquare className="w-3 h-3" />
                    <span>{item.comments.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glassmorphism-card rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FF3366]/20 to-[#FF3366]/5 mx-auto flex items-center justify-center mb-4">
            <FileText className="w-8 h-8 text-[#FF3366]" />
          </div>
          <h3 className="text-lg font-medium mb-2 text-white">No content found</h3>
          <p className="text-white/60 mb-4">
            {searchQuery
              ? `No results found for "${searchQuery}"`
              : "You haven't created any content matching these filters yet."}
          </p>
          <button
            onClick={handleNewContent}
            className="flex items-center gap-2 bg-gradient-to-r from-[#FF3366] to-[#FF3366]/80 hover:from-[#FF3366]/90 hover:to-[#FF3366]/70 text-white px-4 py-2 rounded-lg transition-all shadow-glow-sm mx-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Content</span>
          </button>
        </div>
      )}

      {/* Pagination */}
      {filteredContent.length > 0 && (
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
      )}
    </DashboardLayout>
  )
}
