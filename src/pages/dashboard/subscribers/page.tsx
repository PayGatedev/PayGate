"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/layout"
import {
  Search,
  Filter,
  Download,
  MessageSquare,
  SlidersHorizontal,
  Users,
  Wallet,
  Calendar,
  ArrowUpRight,
  ChevronDown,
  BarChart3,
  Zap,
  Shield,
  Star,
  Clock,
  FileText,
} from "lucide-react"
import { useNavigate } from "react-router-dom"

// SVG Placeholder component for subscriber avatars
const SubscriberAvatar = ({ address }: { address: string }) => {
  // Generate a deterministic color based on the wallet address
  const getColor = (addr: string) => {
    const colors = [
      "#FF3366",
      "#9C27B0",
      "#3F51B5",
      "#2196F3",
      "#00BCD4",
      "#009688",
      "#4CAF50",
      "#CDDC39",
      "#FFC107",
      "#FF9800",
      "#FF5722",
      "#795548",
    ]

    // Use the first few characters of the address to pick a color
    const colorIndex = Number.parseInt(addr.substring(0, 2), 16) % colors.length
    return colors[colorIndex]
  }

  // Get initials from the address (first and last character)
  const getInitials = (addr: string) => {
    return `${addr.charAt(0)}${addr.charAt(addr.length - 1)}`.toUpperCase()
  }

  const bgColor = getColor(address)
  const initials = getInitials(address)

  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center"
      style={{ backgroundColor: `${bgColor}20` }}
    >
      <span className="font-medium text-sm" style={{ color: bgColor }}>
        {initials}
      </span>
    </div>
  )
}

// Larger avatar for grid view
const SubscriberAvatarLarge = ({ address }: { address: string }) => {
  // Generate a deterministic color based on the wallet address
  const getColor = (addr: string) => {
    const colors = [
      "#FF3366",
      "#9C27B0",
      "#3F51B5",
      "#2196F3",
      "#00BCD4",
      "#009688",
      "#4CAF50",
      "#CDDC39",
      "#FFC107",
      "#FF9800",
      "#FF5722",
      "#795548",
    ]

    // Use the first few characters of the address to pick a color
    const colorIndex = Number.parseInt(addr.substring(0, 2), 16) % colors.length
    return colors[colorIndex]
  }

  // Get initials from the address (first and last character)
  const getInitials = (addr: string) => {
    return `${addr.charAt(0)}${addr.charAt(addr.length - 1)}`.toUpperCase()
  }

  const bgColor = getColor(address)
  const initials = getInitials(address)

  return (
    <div
      className="w-12 h-12 rounded-full flex items-center justify-center"
      style={{ backgroundColor: `${bgColor}20` }}
    >
      <span className="font-medium text-base" style={{ color: bgColor }}>
        {initials}
      </span>
    </div>
  )
}

export default function SubscribersPage() {
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")
  const [showTiers, setShowTiers] = useState(false)

  const subscribers = [
    {
      id: 1,
      walletAddress: "8xGzr4NxJqH7aPV1tcWC5",
      subscriptionType: "recurring",
      tier: "Premium",
      startDate: "May 15, 2025",
      renewalStatus: "active",
      lastActive: "2 hours ago",
      totalSpent: "1,245 USDC",
    },
    {
      id: 2,
      walletAddress: "3rTyH8NpQs2VbLmFxW9K",
      subscriptionType: "nft",
      startDate: "May 10, 2025",
      nftId: "1234",
      lastActive: "1 day ago",
      totalSpent: "850 USDC",
    },
    {
      id: 3,
      walletAddress: "9zXcR6TyU4PqS3VdLmN",
      subscriptionType: "one-time",
      startDate: "May 5, 2025",
      renewalStatus: "expired",
      lastActive: "5 days ago",
      totalSpent: "150 USDC",
    },
    {
      id: 4,
      walletAddress: "5kLmN8PqR3SdFgH7jK",
      subscriptionType: "recurring",
      tier: "Basic",
      startDate: "April 28, 2025",
      renewalStatus: "active",
      lastActive: "3 hours ago",
      totalSpent: "495 USDC",
    },
    {
      id: 5,
      walletAddress: "2aBcD4EfG5HiJ6KlM",
      subscriptionType: "recurring",
      tier: "Premium",
      startDate: "April 20, 2025",
      renewalStatus: "expiring",
      lastActive: "12 hours ago",
      totalSpent: "1,050 USDC",
    },
    {
      id: 6,
      walletAddress: "7nOpQ8RsTuV9WxYz",
      subscriptionType: "nft",
      startDate: "April 15, 2025",
      nftId: "2345",
      lastActive: "2 days ago",
      totalSpent: "750 USDC",
    },
    {
      id: 7,
      walletAddress: "1AbCdEfGhIjKlMnO",
      subscriptionType: "one-time",
      startDate: "April 10, 2025",
      renewalStatus: "expired",
      lastActive: "1 week ago",
      totalSpent: "200 USDC",
    },
    {
      id: 8,
      walletAddress: "6PqRsTuVwXyZ1A2B",
      subscriptionType: "recurring",
      tier: "Premium",
      startDate: "April 5, 2025",
      renewalStatus: "active",
      lastActive: "5 hours ago",
      totalSpent: "1,345 USDC",
    },
  ]

  const filteredSubscribers = subscribers.filter((sub) => {
    const matchesFilter =
      activeFilter === "all" || sub.subscriptionType === activeFilter || (sub as any).renewalStatus === activeFilter
    const matchesSearch = sub.walletAddress.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  // Calculate stats
  const totalSubscribers = subscribers.length
  const recurringSubscribers = subscribers.filter((s) => s.subscriptionType === "recurring").length
  const nftHolders = subscribers.filter((s) => s.subscriptionType === "nft").length
  const oneTimeSubscribers = subscribers.filter((s) => s.subscriptionType === "one-time").length
  const activeSubscribers = subscribers.filter((s) => (s as any).renewalStatus === "active").length
  const expiringSubscribers = subscribers.filter((s) => (s as any).renewalStatus === "expiring").length

  // Calculate total revenue
  const totalRevenue = subscribers.reduce((sum, sub) => {
    const amount = Number.parseFloat(sub.totalSpent.replace(/,/g, "").replace(" USDC", ""))
    return sum + amount
  }, 0)

  const handleCreateContentClick = () => {
    navigate("/dashboard/content/create")
  }

  return (
    <DashboardLayout>
      {/* Hero section with animated background */}
      <div className="relative overflow-hidden rounded-xl mb-8 bg-gradient-to-r from-[#161921] to-[#0F1116] border border-gray-800">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#FF3366]/10 rounded-full filter blur-[80px] opacity-60"></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-purple-500/10 rounded-full filter blur-[60px] opacity-50"></div>
        </div>

        <div className="relative z-10 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between">
          <div>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#FF3366]/10 text-[#FF3366] text-xs font-medium mb-3">
              <Users className="w-3 h-3 mr-1" />
              Community Hub
            </div>
            <h1 className="text-3xl font-bold mb-2">Your Subscribers</h1>
            <p className="text-gray-400 max-w-lg">
              Connect with your community, understand their preferences, and grow your audience with powerful subscriber
              insights.
            </p>
          </div>

          <div className="flex gap-2 mt-4 md:mt-0">
            <button className="flex items-center gap-2 bg-[#161921] hover:bg-[#161921]/80 text-white px-4 py-2 rounded-md border border-gray-800 transition-colors">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
            <button className="flex items-center gap-2 bg-[#FF3366] hover:bg-[#FF3366]/90 text-white px-4 py-2 rounded-md transition-colors">
              <MessageSquare className="w-4 h-4" />
              <span>Message All</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards with animated hover */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-[#161921] to-[#0F1116] border border-gray-800 rounded-lg p-4 transition-all duration-300 hover:shadow-glow hover:border-[#FF3366]/30 group">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Total Subscribers</p>
            <div className="w-8 h-8 rounded-lg bg-[#FF3366]/10 flex items-center justify-center group-hover:bg-[#FF3366]/20 transition-colors">
              <Users className="w-4 h-4 text-[#FF3366]" />
            </div>
          </div>
          <h3 className="text-2xl font-bold">{totalSubscribers}</h3>
          <div className="flex items-center gap-1 mt-2">
            <ArrowUpRight className="w-3 h-3 text-green-500" />
            <p className="text-xs text-green-500">+12 this month</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#161921] to-[#0F1116] border border-gray-800 rounded-lg p-4 transition-all duration-300 hover:shadow-glow hover:border-[#FF3366]/30 group">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Monthly Recurring</p>
            <div className="w-8 h-8 rounded-lg bg-[#FF3366]/10 flex items-center justify-center group-hover:bg-[#FF3366]/20 transition-colors">
              <Calendar className="w-4 h-4 text-[#FF3366]" />
            </div>
          </div>
          <h3 className="text-2xl font-bold">{recurringSubscribers}</h3>
          <div className="flex items-center gap-1 mt-2">
            <ArrowUpRight className="w-3 h-3 text-green-500" />
            <p className="text-xs text-green-500">+8 this month</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#161921] to-[#0F1116] border border-gray-800 rounded-lg p-4 transition-all duration-300 hover:shadow-glow hover:border-[#FF3366]/30 group">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">NFT Holders</p>
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
              <Shield className="w-4 h-4 text-purple-400" />
            </div>
          </div>
          <h3 className="text-2xl font-bold">{nftHolders}</h3>
          <div className="flex items-center gap-1 mt-2">
            <ArrowUpRight className="w-3 h-3 text-green-500" />
            <p className="text-xs text-green-500">+4 this month</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#161921] to-[#0F1116] border border-gray-800 rounded-lg p-4 transition-all duration-300 hover:shadow-glow hover:border-[#FF3366]/30 group">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Total Revenue</p>
            <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
              <Wallet className="w-4 h-4 text-green-400" />
            </div>
          </div>
          <h3 className="text-2xl font-bold">{totalRevenue.toLocaleString()} USDC</h3>
          <div className="flex items-center gap-1 mt-2">
            <ArrowUpRight className="w-3 h-3 text-green-500" />
            <p className="text-xs text-green-500">+320 this month</p>
          </div>
        </div>
      </div>

      {/* Subscription type breakdown */}
      <div className="bg-gradient-to-br from-[#161921] to-[#0F1116] border border-gray-800 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-medium mb-4">Subscription Breakdown</h3>
        <div className="flex flex-wrap gap-2">
          <div className="flex-1 min-w-[150px] bg-[#0F1116] rounded-lg p-3 border border-gray-800">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full bg-[#FF3366]/20 flex items-center justify-center">
                <Calendar className="w-3 h-3 text-[#FF3366]" />
              </div>
              <span className="text-sm">Recurring</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold">{recurringSubscribers}</span>
              <span className="text-xs text-gray-400">
                {Math.round((recurringSubscribers / totalSubscribers) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-1.5 mt-2">
              <div
                className="bg-[#FF3366] h-1.5 rounded-full"
                style={{ width: `${(recurringSubscribers / totalSubscribers) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="flex-1 min-w-[150px] bg-[#0F1116] rounded-lg p-3 border border-gray-800">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center">
                <Shield className="w-3 h-3 text-purple-400" />
              </div>
              <span className="text-sm">NFT Access</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold">{nftHolders}</span>
              <span className="text-xs text-gray-400">{Math.round((nftHolders / totalSubscribers) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-1.5 mt-2">
              <div
                className="bg-purple-500 h-1.5 rounded-full"
                style={{ width: `${(nftHolders / totalSubscribers) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="flex-1 min-w-[150px] bg-[#0F1116] rounded-lg p-3 border border-gray-800">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <Zap className="w-3 h-3 text-yellow-400" />
              </div>
              <span className="text-sm">One-time</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold">{oneTimeSubscribers}</span>
              <span className="text-xs text-gray-400">
                {Math.round((oneTimeSubscribers / totalSubscribers) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-1.5 mt-2">
              <div
                className="bg-yellow-500 h-1.5 rounded-full"
                style={{ width: `${(oneTimeSubscribers / totalSubscribers) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters with animated focus states */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by wallet address..."
              className="w-full bg-[#161921] border border-gray-800 rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF3366]/50 focus:border-[#FF3366]/50 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-md ${viewMode === "list" ? "bg-[#FF3366]/20 text-[#FF3366] border border-[#FF3366]/30" : "bg-[#161921] border border-gray-800"}`}
            >
              <BarChart3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-md ${viewMode === "grid" ? "bg-[#FF3366]/20 text-[#FF3366] border border-[#FF3366]/30" : "bg-[#161921] border border-gray-800"}`}
            >
              <div className="grid grid-cols-2 gap-0.5">
                <div className="w-1.5 h-1.5 bg-current rounded-sm"></div>
                <div className="w-1.5 h-1.5 bg-current rounded-sm"></div>
                <div className="w-1.5 h-1.5 bg-current rounded-sm"></div>
                <div className="w-1.5 h-1.5 bg-current rounded-sm"></div>
              </div>
            </button>
            <div className="relative">
              <button
                onClick={() => setShowTiers(!showTiers)}
                className="flex items-center gap-2 bg-[#161921] border border-gray-800 rounded-md px-3 py-2 text-sm"
              >
                <Star className="w-4 h-4 text-[#FF3366]" />
                <span>Tiers</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {showTiers && (
                <div className="absolute top-full mt-1 right-0 w-48 bg-[#161921] border border-gray-800 rounded-md shadow-lg z-20 py-1">
                  <div className="px-3 py-2 hover:bg-[#0F1116] cursor-pointer">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#FF3366]"></div>
                      <span>Premium</span>
                    </div>
                  </div>
                  <div className="px-3 py-2 hover:bg-[#0F1116] cursor-pointer">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                      <span>Basic</span>
                    </div>
                  </div>
                  <div className="px-3 py-2 hover:bg-[#0F1116] cursor-pointer">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-purple-400"></div>
                      <span>NFT Holders</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
          <button
            onClick={() => setActiveFilter("all")}
            className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm whitespace-nowrap transition-all ${
              activeFilter === "all"
                ? "bg-[#FF3366]/10 text-[#FF3366] border border-[#FF3366]/30 shadow-glow-sm"
                : "bg-[#161921] text-gray-300 border border-gray-800 hover:bg-[#161921]/80"
            }`}
          >
            <Filter className="w-4 h-4" />
            All Subscribers
          </button>
          <button
            onClick={() => setActiveFilter("recurring")}
            className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm whitespace-nowrap transition-all ${
              activeFilter === "recurring"
                ? "bg-[#FF3366]/10 text-[#FF3366] border border-[#FF3366]/30 shadow-glow-sm"
                : "bg-[#161921] text-gray-300 border border-gray-800 hover:bg-[#161921]/80"
            }`}
          >
            <Calendar className="w-4 h-4" />
            Recurring
          </button>
          <button
            onClick={() => setActiveFilter("one-time")}
            className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm whitespace-nowrap transition-all ${
              activeFilter === "one-time"
                ? "bg-yellow-500/10 text-yellow-500 border border-yellow-500/30 shadow-glow-sm"
                : "bg-[#161921] text-gray-300 border border-gray-800 hover:bg-[#161921]/80"
            }`}
          >
            <Zap className="w-4 h-4" />
            One-time
          </button>
          <button
            onClick={() => setActiveFilter("nft")}
            className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm whitespace-nowrap transition-all ${
              activeFilter === "nft"
                ? "bg-purple-500/10 text-purple-500 border border-purple-500/30 shadow-glow-sm"
                : "bg-[#161921] text-gray-300 border border-gray-800 hover:bg-[#161921]/80"
            }`}
          >
            <Shield className="w-4 h-4" />
            NFT
          </button>
          <button
            onClick={() => setActiveFilter("active")}
            className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm whitespace-nowrap transition-all ${
              activeFilter === "active"
                ? "bg-green-500/10 text-green-500 border border-green-500/30 shadow-glow-sm"
                : "bg-[#161921] text-gray-300 border border-gray-800 hover:bg-[#161921]/80"
            }`}
          >
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            Active
          </button>
          <button
            onClick={() => setActiveFilter("expiring")}
            className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm whitespace-nowrap transition-all ${
              activeFilter === "expiring"
                ? "bg-yellow-500/10 text-yellow-500 border border-yellow-500/30 shadow-glow-sm"
                : "bg-[#161921] text-gray-300 border border-gray-800 hover:bg-[#161921]/80"
            }`}
          >
            <Clock className="w-4 h-4" />
            Expiring
          </button>
          <button className="flex items-center gap-1 px-3 py-2 rounded-md text-sm whitespace-nowrap bg-[#161921] text-gray-300 border border-gray-800 hover:bg-[#161921]/80">
            <SlidersHorizontal className="w-4 h-4" />
            More Filters
          </button>
        </div>
      </div>

      {/* Subscribers List with animations */}
      {filteredSubscribers.length > 0 ? (
        viewMode === "list" ? (
          <div className="space-y-3">
            {filteredSubscribers.map((subscriber, index) => (
              <div
                key={subscriber.id}
                className="bg-gradient-to-r from-[#161921] to-[#0F1116] border border-gray-800 rounded-lg p-4 transition-all hover:border-[#FF3366]/20 hover:shadow-glow-sm"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <SubscriberAvatar address={subscriber.walletAddress} />
                    <div>
                      <p className="font-medium text-sm">{`${subscriber.walletAddress.slice(0, 6)}...${subscriber.walletAddress.slice(-6)}`}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {subscriber.subscriptionType === "recurring" && (
                          <span className="text-xs px-2 py-0.5 rounded-md bg-[#FF3366]/20 text-[#FF3366]">
                            Recurring {subscriber.tier && `- ${subscriber.tier}`}
                          </span>
                        )}
                        {subscriber.subscriptionType === "one-time" && (
                          <span className="text-xs px-2 py-0.5 rounded-md bg-yellow-500/20 text-yellow-500">
                            One-time
                          </span>
                        )}
                        {subscriber.subscriptionType === "nft" && (
                          <span className="text-xs px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-500">
                            NFT #{subscriber.nftId}
                          </span>
                        )}
                        {(subscriber as any).renewalStatus === "active" && (
                          <span className="text-xs px-2 py-0.5 rounded-md bg-green-500/20 text-green-500">Active</span>
                        )}
                        {(subscriber as any).renewalStatus === "expiring" && (
                          <span className="text-xs px-2 py-0.5 rounded-md bg-yellow-500/20 text-yellow-500">
                            Expiring
                          </span>
                        )}
                        {(subscriber as any).renewalStatus === "expired" && (
                          <span className="text-xs px-2 py-0.5 rounded-md bg-red-500/20 text-red-500">Expired</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock className="w-3 h-3" />
                      <span>Since {subscriber.startDate}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                      <Wallet className="w-3 h-3" />
                      <span>{subscriber.totalSpent}</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-800">
                  <div className="text-xs text-gray-400">Last active: {subscriber.lastActive}</div>
                  <div className="flex gap-2">
                    <button className="text-xs px-2 py-1 rounded bg-[#161921] hover:bg-[#0F1116] border border-gray-800">
                      View Profile
                    </button>
                    <button className="text-xs px-2 py-1 rounded bg-[#FF3366]/10 text-[#FF3366] hover:bg-[#FF3366]/20 border border-[#FF3366]/30">
                      Message
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSubscribers.map((subscriber, index) => (
              <div
                key={subscriber.id}
                className="bg-gradient-to-br from-[#161921] to-[#0F1116] border border-gray-800 rounded-lg p-4 transition-all hover:border-[#FF3366]/20 hover:shadow-glow-sm"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <SubscriberAvatarLarge address={subscriber.walletAddress} />
                  <div>
                    <p className="font-medium">{`${subscriber.walletAddress.slice(0, 6)}...${subscriber.walletAddress.slice(-6)}`}</p>
                    <p className="text-xs text-gray-400">Since {subscriber.startDate}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  {subscriber.subscriptionType === "recurring" && (
                    <span className="text-xs px-2 py-0.5 rounded-md bg-[#FF3366]/20 text-[#FF3366]">
                      Recurring {subscriber.tier && `- ${subscriber.tier}`}
                    </span>
                  )}
                  {subscriber.subscriptionType === "one-time" && (
                    <span className="text-xs px-2 py-0.5 rounded-md bg-yellow-500/20 text-yellow-500">One-time</span>
                  )}
                  {subscriber.subscriptionType === "nft" && (
                    <span className="text-xs px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-500">
                      NFT #{subscriber.nftId}
                    </span>
                  )}
                  {(subscriber as any).renewalStatus === "active" && (
                    <span className="text-xs px-2 py-0.5 rounded-md bg-green-500/20 text-green-500">Active</span>
                  )}
                  {(subscriber as any).renewalStatus === "expiring" && (
                    <span className="text-xs px-2 py-0.5 rounded-md bg-yellow-500/20 text-yellow-500">Expiring</span>
                  )}
                  {(subscriber as any).renewalStatus === "expired" && (
                    <span className="text-xs px-2 py-0.5 rounded-md bg-red-500/20 text-red-500">Expired</span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="bg-[#0F1116] rounded p-2">
                    <p className="text-xs text-gray-400">Total Spent</p>
                    <p className="font-medium">{subscriber.totalSpent}</p>
                  </div>
                  <div className="bg-[#0F1116] rounded p-2">
                    <p className="text-xs text-gray-400">Last Active</p>
                    <p className="font-medium">{subscriber.lastActive}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 text-xs px-2 py-1.5 rounded bg-[#161921] hover:bg-[#0F1116] border border-gray-800">
                    View Profile
                  </button>
                  <button className="flex-1 text-xs px-2 py-1.5 rounded bg-[#FF3366]/10 text-[#FF3366] hover:bg-[#FF3366]/20 border border-[#FF3366]/30">
                    Message
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        <div className="bg-gradient-to-br from-[#161921] to-[#0F1116] border border-gray-800 rounded-lg p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-[#0F1116] mx-auto flex items-center justify-center mb-4">
            <Filter className="w-8 h-8 text-gray-500" />
          </div>
          <h3 className="text-lg font-medium mb-2">No subscribers found</h3>
          <p className="text-gray-400 mb-4">
            {searchQuery ? `No results found for "${searchQuery}"` : "No subscribers match the selected filters."}
          </p>
          <button
            onClick={() => {
              setActiveFilter("all")
              setSearchQuery("")
            }}
            className="text-[#FF3366] hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Quick Actions Footer */}
      <div className="mt-8 bg-gradient-to-br from-[#161921] to-[#0F1116] border border-gray-800 rounded-lg p-4">
        <h3 className="text-lg font-medium mb-3">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div
            onClick={handleCreateContentClick}
            className="bg-[#0F1116] hover:bg-[#0A0A0B] border border-gray-800 rounded-lg p-3 transition-all hover:border-[#FF3366]/20 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#FF3366]/10 flex items-center justify-center">
                <FileText className="w-4 h-4 text-[#FF3366]" />
              </div>
              <div>
                <p className="font-medium text-sm">Create Content</p>
                <p className="text-xs text-gray-400">For your subscribers</p>
              </div>
            </div>
          </div>

          <div className="bg-[#0F1116] hover:bg-[#0A0A0B] border border-gray-800 rounded-lg p-3 transition-all hover:border-[#FF3366]/20 cursor-pointer">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Shield className="w-4 h-4 text-purple-400" />
              </div>
              <div>
                <p className="font-medium text-sm">Create NFT Pass</p>
                <p className="text-xs text-gray-400">For premium access</p>
              </div>
            </div>
          </div>

          <div className="bg-[#0F1116] hover:bg-[#0A0A0B] border border-gray-800 rounded-lg p-3 transition-all hover:border-[#FF3366]/20 cursor-pointer">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-green-400" />
              </div>
              <div>
                <p className="font-medium text-sm">Analytics</p>
                <p className="text-xs text-gray-400">Subscriber insights</p>
              </div>
            </div>
          </div>

          <div className="bg-[#0F1116] hover:bg-[#0A0A0B] border border-gray-800 rounded-lg p-3 transition-all hover:border-[#FF3366]/20 cursor-pointer">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <p className="font-medium text-sm">Announcements</p>
                <p className="text-xs text-gray-400">Message all subscribers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
