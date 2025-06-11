"use client"

import type React from "react"

import { DashboardLayout } from "@/components/dashboard/layout"
import {
  Grid,
  Plus,
  Upload,
  MoreHorizontal,
  Edit,
  Eye,
  Share2,
  Filter,
  Search,
  ChevronDown,
  ArrowUpRight,
  CheckCircle,
  AlertCircle,
  Clock,
  Users,
  List,
  Wallet,
} from "lucide-react"
import { useState, useRef } from "react"

// Sample NFT data
const sampleNFTs = [
  {
    id: "nft-001",
    name: "Creator Access Pass #001",
    image: "/placeholder-nv6cy.png",
    description: "Exclusive access to premium content",
    price: 1.5,
    status: "active",
    created: "2025-04-15",
    holders: 12,
    type: "access",
  },
  {
    id: "nft-002",
    name: "Early Supporter Badge #042",
    image: "/placeholder-7tmqw.png",
    description: "Special badge for early supporters",
    price: 0.8,
    status: "active",
    created: "2025-04-10",
    holders: 28,
    type: "badge",
  },
  {
    id: "nft-003",
    name: "VIP Membership Card #007",
    image: "/placeholder-1krfh.png",
    description: "VIP membership with exclusive benefits",
    price: 2.5,
    status: "active",
    created: "2025-04-05",
    holders: 5,
    type: "membership",
  },
  {
    id: "nft-004",
    name: "Content Bundle #003",
    image: "/placeholder-cldg5.png",
    description: "Bundle of premium content pieces",
    price: 1.2,
    status: "draft",
    created: "2025-04-18",
    holders: 0,
    type: "bundle",
  },
  {
    id: "nft-005",
    name: "Collaboration Pass #021",
    image: "/placeholder-vqve1.png",
    description: "Access to collaboration opportunities",
    price: 1.8,
    status: "pending",
    created: "2025-04-20",
    holders: 0,
    type: "access",
  },
]

export default function NFTsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedNFT, setSelectedNFT] = useState<string | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<string | null>(null)
  const [filterType, setFilterType] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Filter NFTs based on search query and filters
  const filteredNFTs = sampleNFTs.filter((nft) => {
    const matchesSearch =
      nft.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nft.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus ? nft.status === filterStatus : true
    const matchesType = filterType ? nft.type === filterType : true

    return matchesSearch && matchesStatus && matchesType
  })

  const handleCreateNFT = () => {
    setShowCreateModal(true)
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Handle file upload logic here
    console.log("File selected:", e.target.files)
  }

  const handleNFTClick = (id: string) => {
    setSelectedNFT(id === selectedNFT ? null : id)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-emerald-400 bg-emerald-500/20"
      case "draft":
        return "text-amber-400 bg-amber-500/20"
      case "pending":
        return "text-sky-400 bg-sky-500/20"
      default:
        return "text-white/60 bg-white/10"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-3 h-3 mr-1" />
      case "draft":
        return <Edit className="w-3 h-3 mr-1" />
      case "pending":
        return <Clock className="w-3 h-3 mr-1" />
      default:
        return <AlertCircle className="w-3 h-3 mr-1" />
    }
  }

  // Calculate total NFTs by status
  const totalActive = sampleNFTs.filter((nft) => nft.status === "active").length
  const totalDraft = sampleNFTs.filter((nft) => nft.status === "draft").length
  const totalPending = sampleNFTs.filter((nft) => nft.status === "pending").length

  // Calculate total value
  const totalValue = sampleNFTs.reduce((sum, nft) => sum + nft.price, 0).toFixed(1)

  return (
    <DashboardLayout>
      {/* Hero section with glassmorphism effect */}
      <div className="relative mb-8 overflow-hidden rounded-xl">
        {/* SVG Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20"></div>

        {/* Content */}
        <div className="relative glassmorphism-card p-6 border border-gray-800/50">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Wallet className="w-6 h-6 text-purple-500" />
                My NFTs
              </h1>
              <p className="text-gray-400 mt-1">Manage your NFT collections and access passes</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                className="flex items-center gap-2 bg-[#161921] hover:bg-[#1E2029] text-gray-300 px-4 py-2 rounded-md border border-gray-800 transition-all"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4" />
                <span>Filter</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
              </button>

              <button
                onClick={handleCreateNFT}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-md transition-all shadow-glow-sm hover:shadow-glow"
              >
                <Plus className="w-4 h-4" />
                <span>Create NFT</span>
              </button>
            </div>
          </div>

          {/* Filters panel - conditionally shown */}
          {showFilters && (
            <div className="mt-4 p-4 bg-[#161921]/80 border border-gray-800/50 rounded-lg animate-fadeIn">
              <div className="flex flex-wrap gap-3">
                <button
                  className={`px-3 py-1.5 rounded-full text-sm transition-all ${filterStatus === null ? "bg-purple-600 text-white" : "bg-[#1E2029] text-gray-300 hover:bg-[#1E2029]/80"}`}
                  onClick={() => setFilterStatus(null)}
                >
                  All Status
                </button>

                <button
                  className={`px-3 py-1.5 rounded-full text-sm transition-all flex items-center gap-1.5 ${filterStatus === "active" ? "bg-emerald-500 text-white" : "bg-[#1E2029] text-gray-300 hover:bg-[#1E2029]/80"}`}
                  onClick={() => setFilterStatus(filterStatus === "active" ? null : "active")}
                >
                  <CheckCircle className="w-3 h-3" />
                  Active
                </button>

                <button
                  className={`px-3 py-1.5 rounded-full text-sm transition-all flex items-center gap-1.5 ${filterStatus === "draft" ? "bg-amber-500 text-white" : "bg-[#1E2029] text-gray-300 hover:bg-[#1E2029]/80"}`}
                  onClick={() => setFilterStatus(filterStatus === "draft" ? null : "draft")}
                >
                  <Edit className="w-3 h-3" />
                  Draft
                </button>

                <button
                  className={`px-3 py-1.5 rounded-full text-sm transition-all flex items-center gap-1.5 ${filterStatus === "pending" ? "bg-sky-500 text-white" : "bg-[#1E2029] text-gray-300 hover:bg-[#1E2029]/80"}`}
                  onClick={() => setFilterStatus(filterStatus === "pending" ? null : "pending")}
                >
                  <Clock className="w-3 h-3" />
                  Pending
                </button>
              </div>

              <div className="flex justify-between mt-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-400">View as:</span>
                  <div className="flex bg-[#1E2029] rounded-md overflow-hidden">
                    <button
                      className={`px-3 py-1.5 text-sm transition-all ${viewMode === "grid" ? "bg-purple-600 text-white" : "text-gray-300 hover:bg-[#1E2029]/80"}`}
                      onClick={() => setViewMode("grid")}
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      className={`px-3 py-1.5 text-sm transition-all ${viewMode === "list" ? "bg-purple-600 text-white" : "text-gray-300 hover:bg-[#1E2029]/80"}`}
                      onClick={() => setViewMode("list")}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats Cards with glassmorphism */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="glassmorphism-card bg-[#161921]/60 border border-gray-800/50 rounded-lg p-5 group hover:shadow-glow-sm transition-all">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-400">Total NFTs</p>
              <h3 className="text-2xl font-bold mt-1">{sampleNFTs.length}</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-purple-600/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Wallet className="w-5 h-5 text-purple-500" />
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-800/50">
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <span className="flex items-center gap-0.5 text-green-400">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M18 15L12 9L6 15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                15%
              </span>
              from last month
            </div>
          </div>
        </div>

        <div className="glassmorphism-card bg-[#161921]/60 border border-gray-800/50 rounded-lg p-5 group hover:shadow-glow-sm transition-all">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-400">Active NFTs</p>
              <h3 className="text-2xl font-bold mt-1">{totalActive}</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-800/50">
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <span>{((totalActive / sampleNFTs.length) * 100).toFixed(0)}% of total</span>
            </div>
          </div>
        </div>

        <div className="glassmorphism-card bg-[#161921]/60 border border-gray-800/50 rounded-lg p-5 group hover:shadow-glow-sm transition-all">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Holders</p>
              <h3 className="text-2xl font-bold mt-1">{sampleNFTs.reduce((sum, nft) => sum + nft.holders, 0)}</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-pink-600/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5 text-pink-500" />
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-800/50">
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <span className="flex items-center gap-0.5 text-green-400">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M18 15L12 9L6 15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                8%
              </span>
              from last month
            </div>
          </div>
        </div>

        <div className="glassmorphism-card bg-[#161921]/60 border border-gray-800/50 rounded-lg p-5 group hover:shadow-glow-sm transition-all">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Value</p>
              <h3 className="text-2xl font-bold mt-1">◎ {totalValue}</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-purple-600/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 1V23" stroke="#9C6ADE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path
                  d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6"
                  stroke="#9C6ADE"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-800/50">
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <span>SOL at current prices</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search with improved styling */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search NFTs by name, description or type..."
          className="w-full bg-[#161921] border border-gray-800 rounded-md py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            onClick={() => setSearchQuery("")}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </div>

      {/* NFT Grid */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
          {filteredNFTs.map((nft) => (
            <div
              key={nft.id}
              className={`glassmorphism-card rounded-xl border ${
                selectedNFT === nft.id
                  ? "border-purple-500/30 shadow-glow-sm"
                  : "border-gray-800/50 hover:border-gray-700/50"
              } overflow-hidden transition-all bg-[#161921]/60 backdrop-blur-md group`}
              onClick={() => handleNFTClick(nft.id)}
            >
              <div className="relative aspect-square bg-gradient-to-br from-[#1a1d29]/80 to-[#12141c]/80 overflow-hidden">
                <img
                  src={nft.image || "/placeholder.svg"}
                  alt={nft.name}
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <span
                    className={`text-xs px-2 py-1 rounded-md backdrop-blur-sm flex items-center ${getStatusColor(nft.status)}`}
                  >
                    {getStatusIcon(nft.status)}
                    {nft.status}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-medium text-white truncate group-hover:text-purple-400 transition-colors">
                  {nft.name}
                </h3>
                <p className="text-gray-400 text-sm mt-1 line-clamp-2 h-10">{nft.description}</p>

                <div className="flex justify-between items-center mt-3">
                  <div className="flex items-baseline">
                    <span className="text-white font-medium">◎ {nft.price}</span>
                    <span className="text-gray-500 text-xs ml-1">SOL</span>
                  </div>
                  <span className="text-gray-500 text-xs">{nft.holders} holders</span>
                </div>

                <div className="flex gap-2 mt-4">
                  <button className="flex-1 py-1.5 text-xs bg-[#0F1116] hover:bg-[#0F1116]/80 text-gray-300 rounded-lg transition-all">
                    Edit
                  </button>
                  <button className="flex items-center justify-center w-8 h-8 bg-[#0F1116] hover:bg-[#0F1116]/80 text-gray-300 rounded-lg transition-all">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Create NFT Card */}
          <div
            className="glassmorphism-card rounded-xl border border-dashed border-gray-700/50 hover:border-purple-500/30 overflow-hidden transition-all cursor-pointer h-full flex flex-col items-center justify-center p-8 bg-[#161921]/60 backdrop-blur-md"
            onClick={handleCreateNFT}
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600/20 to-pink-600/5 flex items-center justify-center mb-4">
              <Plus className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="font-medium text-white text-center">Create New NFT</h3>
            <p className="text-gray-400 text-sm mt-2 text-center">Create a new NFT collection or access pass</p>
          </div>
        </div>
      ) : (
        // List view
        <div className="glassmorphism-card rounded-xl border border-gray-800/50 overflow-hidden bg-[#161921]/60 backdrop-blur-md mb-6">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800/50">
                <th className="text-left p-4 text-gray-400 font-medium">Name</th>
                <th className="text-left p-4 text-gray-400 font-medium">Type</th>
                <th className="text-left p-4 text-gray-400 font-medium">Price</th>
                <th className="text-left p-4 text-gray-400 font-medium">Status</th>
                <th className="text-left p-4 text-gray-400 font-medium">Holders</th>
                <th className="text-left p-4 text-gray-400 font-medium">Created</th>
                <th className="text-right p-4 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredNFTs.map((nft) => (
                <tr key={nft.id} className="border-b border-gray-800/50 hover:bg-[#1E2029]/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden">
                        <img
                          src={nft.image || "/placeholder.svg"}
                          alt={nft.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-white hover:text-purple-400 transition-colors">{nft.name}</h4>
                        <p className="text-gray-500 text-xs">{nft.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-gray-300 capitalize">{nft.type}</td>
                  <td className="p-4">
                    <div className="flex items-baseline">
                      <span className="text-white font-medium">◎ {nft.price}</span>
                      <span className="text-gray-500 text-xs ml-1">SOL</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span
                      className={`text-xs px-2 py-1 rounded-md flex items-center w-fit ${getStatusColor(nft.status)}`}
                    >
                      {getStatusIcon(nft.status)}
                      {nft.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-300">{nft.holders}</td>
                  <td className="p-4 text-gray-400 text-sm">{nft.created}</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 rounded-lg bg-[#0F1116] hover:bg-[#0F1116]/80 text-gray-300 transition-all">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg bg-[#0F1116] hover:bg-[#0F1116]/80 text-gray-300 transition-all">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg bg-[#0F1116] hover:bg-[#0F1116]/80 text-gray-300 transition-all">
                        <Share2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg bg-[#0F1116] hover:bg-[#0F1116]/80 text-gray-300 transition-all">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Quick actions footer */}
      <div className="glassmorphism-card bg-[#161921]/60 border border-gray-800/50 rounded-lg p-4 flex justify-between items-center">
        <div className="flex items-center gap-1 text-sm text-gray-400">
          <span>
            Showing {filteredNFTs.length} of {sampleNFTs.length} NFTs
          </span>
          {filterStatus && (
            <button
              className="ml-2 flex items-center gap-1 bg-purple-600/20 text-purple-400 px-2 py-0.5 rounded-full text-xs"
              onClick={() => setFilterStatus(null)}
            >
              {filterStatus}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7 10L12 15L17 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Export Collection
          </button>
        </div>
      </div>

      {/* Create NFT Modal (hidden by default) */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowCreateModal(false)}
          ></div>
          <div className="glassmorphism-card rounded-xl border border-gray-800/50 p-6 w-full max-w-2xl z-10 max-h-[90vh] overflow-y-auto bg-[#161921]/90 backdrop-blur-md">
            <h2 className="text-2xl font-bold text-white mb-4">Create New NFT</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">NFT Type</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button className="glassmorphism-card p-4 rounded-xl border border-purple-500/30 bg-gradient-to-br from-purple-600/10 to-pink-600/5 text-left">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-purple-600/20 flex items-center justify-center">
                        <ArrowUpRight className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">Access Pass</h3>
                        <p className="text-gray-400 text-xs">Grant access to premium content</p>
                      </div>
                    </div>
                  </button>

                  <button className="glassmorphism-card p-4 rounded-xl border border-gray-800/50 hover:border-gray-700/50 text-left">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">Badge</h3>
                        <p className="text-gray-400 text-xs">Collectible badge or achievement</p>
                      </div>
                    </div>
                  </button>

                  <button className="glassmorphism-card p-4 rounded-xl border border-gray-800/50 hover:border-gray-700/50 text-left">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                        <Users className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">Membership</h3>
                        <p className="text-gray-400 text-xs">Ongoing membership benefits</p>
                      </div>
                    </div>
                  </button>

                  <button className="glassmorphism-card p-4 rounded-xl border border-gray-800/50 hover:border-gray-700/50 text-left">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                        <Grid className="w-5 h-5 text-green-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">Bundle</h3>
                        <p className="text-gray-400 text-xs">Bundle of content or benefits</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="nft-name" className="block text-gray-300 mb-2 text-sm font-medium">
                  NFT Name <span className="text-purple-500">*</span>
                </label>
                <input
                  type="text"
                  id="nft-name"
                  placeholder="Enter NFT name"
                  className="w-full bg-[#0F1116] border border-gray-800/50 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:bg-[#0F1116]/80 transition-all"
                />
              </div>

              <div>
                <label htmlFor="nft-description" className="block text-gray-300 mb-2 text-sm font-medium">
                  Description <span className="text-purple-500">*</span>
                </label>
                <textarea
                  id="nft-description"
                  placeholder="Describe your NFT and its benefits"
                  className="w-full bg-[#0F1116] border border-gray-800/50 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:bg-[#0F1116]/80 transition-all min-h-[100px]"
                ></textarea>
              </div>

              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">
                  NFT Image <span className="text-purple-500">*</span>
                </label>
                <div
                  className="border-2 border-dashed border-gray-700/50 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-purple-500/40 hover:bg-[#0F1116]/50 transition-all"
                  onClick={handleUploadClick}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600/20 to-pink-600/5 flex items-center justify-center mb-4">
                    <Upload className="w-8 h-8 text-purple-400" />
                  </div>
                  <h4 className="text-white font-medium mb-2">Upload Image</h4>
                  <p className="text-gray-400 text-sm text-center mb-4">
                    Drag and drop your image here, or click to browse
                  </p>
                  <p className="text-gray-500 text-xs text-center">
                    Recommended size: 1000x1000px. Max size: 5MB. Supported formats: PNG, JPG, GIF
                  </p>
                </div>
              </div>

              <div>
                <label htmlFor="nft-price" className="block text-gray-300 mb-2 text-sm font-medium">
                  Price (SOL) <span className="text-purple-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="nft-price"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className="w-full bg-[#0F1116] border border-gray-800/50 rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:bg-[#0F1116]/80 transition-all"
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-400">◎</span>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="nft-supply" className="block text-gray-300 mb-2 text-sm font-medium">
                  Supply <span className="text-gray-500">(Optional)</span>
                </label>
                <input
                  type="number"
                  id="nft-supply"
                  placeholder="Leave blank for unlimited"
                  min="1"
                  className="w-full bg-[#0F1116] border border-gray-800/50 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:bg-[#0F1116]/80 transition-all"
                />
                <p className="text-gray-500 text-xs mt-1">
                  Maximum number of NFTs that can be minted. Leave blank for unlimited.
                </p>
              </div>

              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">
                  Access Settings <span className="text-purple-500">*</span>
                </label>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="access-content"
                      checked={true}
                      className="w-4 h-4 bg-[#0F1116] border border-gray-800/50 rounded focus:ring-purple-500/30 text-purple-600"
                    />
                    <label htmlFor="access-content" className="ml-2 text-gray-300 text-sm">
                      Access to premium content
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="access-community"
                      className="w-4 h-4 bg-[#0F1116] border border-gray-800/50 rounded focus:ring-purple-500/30 text-purple-600"
                    />
                    <label htmlFor="access-community" className="ml-2 text-gray-300 text-sm">
                      Access to private community
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="access-events"
                      className="w-4 h-4 bg-[#0F1116] border border-gray-800/50 rounded focus:ring-purple-500/30 text-purple-600"
                    />
                    <label htmlFor="access-events" className="ml-2 text-gray-300 text-sm">
                      Access to exclusive events
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-800/50">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-lg border border-gray-800/50 text-gray-300 hover:bg-[#0F1116]/50 transition-all"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 rounded-lg bg-[#0F1116] text-gray-300 hover:bg-[#0F1116]/80 transition-all">
                  Save as Draft
                </button>
                <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transition-all shadow-glow-sm">
                  Create NFT
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hidden file input for uploads */}
      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
    </DashboardLayout>
  )
}
