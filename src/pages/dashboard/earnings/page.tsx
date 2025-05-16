"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/layout"
import { TransactionCard } from "@/components/dashboard/transaction-card"
import {
  ArrowUpRight,
  ArrowDownRight,
  ChevronDown,
  ChevronUp,
  Download,
  Filter,
  RefreshCw,
  Search,
  Clock,
  Sparkles,
  TrendingUp,
  Wallet,
  Calendar,
} from "lucide-react"

export default function EarningsPage() {
  const [activeFilter, setActiveFilter] = useState<string>("all")
  const [activeTimeframe, setActiveTimeframe] = useState<string>("month")
  const [showRevenueDetails, setShowRevenueDetails] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [showStats, setShowStats] = useState(true)

  const transactions = [
    {
      id: 1,
      type: "incoming",
      amount: "12.5",
      timestamp: "May 15, 2025 - 14:32",
      from: "8xGzr4NxJqH7aPV1tcWC5",
      contentTitle: "NFT Marketplace Deep Dive",
      txHash: "5UxG7n2JqH7aPV1tcWC5qrZeNmFtQf8QNPtUZYvd",
    },
    {
      id: 2,
      type: "incoming",
      amount: "5.2",
      timestamp: "May 14, 2025 - 09:15",
      from: "3rTyH8NpQs2VbLmFxW9K",
      contentTitle: "Getting Started with Solana Development",
      txHash: "7YhG9m4KsL8bPW2ucXD6prZeNmFtQf8QNPtUZYvd",
    },
    {
      id: 3,
      type: "outgoing",
      amount: "2.8",
      timestamp: "May 12, 2025 - 16:45",
      to: "9zXcR6TyU4PqS3VdLmN",
      contentTitle: "Collaborator Payment",
      txHash: "2AbC9m4KsL8bPW2ucXD6prZeNmFtQf8QNPtUZYvd",
    },
    {
      id: 4,
      type: "incoming",
      amount: "8.3",
      timestamp: "May 10, 2025 - 11:20",
      from: "5kLmN8PqR3SdFgH7jK",
      contentTitle: "Web3 Gaming Podcast Episode 5",
      txHash: "8DeFgH1JkLmN2OpQrStUvWxYz3AbCd",
    },
    {
      id: 5,
      type: "incoming",
      amount: "3.7",
      timestamp: "May 8, 2025 - 15:10",
      from: "2aBcD4EfG5HiJ6KlM",
      contentTitle: "Building a DAO from Scratch",
      txHash: "9EfGhIjKlMnOpQrStUvWxYz1AbCdE",
    },
    {
      id: 6,
      type: "outgoing",
      amount: "1.5",
      timestamp: "May 5, 2025 - 09:30",
      to: "7nOpQ8RsTuV9WxYz",
      contentTitle: "Platform Fee",
      txHash: "4FgHiJkLmNoPqRsTuVwXyZ1A2B3C",
    },
  ]

  // Filter transactions based on active filter and search query
  const filteredTransactions = transactions
    .filter((tx) => {
      const matchesFilter = activeFilter === "all" || tx.type === activeFilter
      const matchesSearch =
        searchQuery === "" ||
        tx.contentTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.from?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.to?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.txHash.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesFilter && matchesSearch
    })
    .sort((a, b) => {
      const dateA = new Date(a.timestamp.split(" - ")[0]).getTime()
      const dateB = new Date(b.timestamp.split(" - ")[0]).getTime()
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB
    })

  // Calculate total earnings
  const totalEarnings = transactions
    .filter((tx) => tx.type === "incoming")
    .reduce((sum, tx) => sum + Number.parseFloat(tx.amount), 0)

  // Calculate total outgoing
  const totalOutgoing = transactions
    .filter((tx) => tx.type === "outgoing")
    .reduce((sum, tx) => sum + Number.parseFloat(tx.amount), 0)

  // Calculate net earnings
  const netEarnings = totalEarnings - totalOutgoing

  // Generate monthly data for chart
  const monthlyData = [
    { month: "Jan", amount: 85.2 },
    { month: "Feb", amount: 92.7 },
    { month: "Mar", amount: 105.3 },
    { month: "Apr", amount: 110.8 },
    { month: "May", amount: 124.8 },
    { month: "Jun", amount: 0 }, // Future month
    { month: "Jul", amount: 0 }, // Future month
  ]

  // Calculate max value for chart scaling
  const maxValue = Math.max(...monthlyData.map((d) => d.amount))

  return (
    <DashboardLayout>
      {/* Hero Section with Glassmorphism */}
      <div className="relative mb-10 overflow-hidden">
        {/* Background SVG Pattern */}
        <div className="absolute inset-0 z-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#FF3366" strokeWidth="0.5" opacity="0.3" />
              </pattern>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF3366" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#0F1116" stopOpacity="0" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <rect width="100%" height="100%" fill="url(#gradient)" />
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 glassmorphism-card bg-[#161921]/40 border border-gray-800 rounded-xl p-8 shadow-glow">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-[#FF3366]/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-[#FF3366]" />
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  Earnings Dashboard
                </h1>
              </div>
              <p className="text-gray-400 ml-[52px]">Track your revenue and financial performance</p>
            </div>
            <div className="flex gap-3 ml-[52px] md:ml-0">
              <button className="flex items-center gap-2 bg-[#161921]/60 hover:bg-[#161921] text-white px-4 py-2 rounded-md border border-gray-800 transition-all duration-300">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
              <button className="flex items-center gap-2 bg-[#FF3366] hover:bg-[#FF3366]/90 text-white px-4 py-2 rounded-md transition-all duration-300 shadow-glow-sm">
                <ArrowUpRight className="w-4 h-4" />
                <span>Withdraw</span>
              </button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Available Balance */}
            <div className="glassmorphism-card bg-gradient-to-br from-[#161921]/60 to-[#161921]/30 backdrop-blur-md border border-gray-800/50 rounded-lg p-6 transition-all duration-300 hover:shadow-glow-sm group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#FF3366]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Wallet className="w-6 h-6 text-[#FF3366]" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Available Balance</p>
                  <div className="flex items-end gap-1">
                    <h3 className="text-2xl font-bold">458.2</h3>
                    <span className="text-sm text-gray-400 mb-0.5">SOL</span>
                  </div>
                </div>
              </div>
              <button className="w-full bg-gradient-to-r from-[#FF3366] to-[#FF3366]/80 hover:from-[#FF3366]/90 hover:to-[#FF3366]/70 text-white py-2 rounded-md transition-all duration-300 flex items-center justify-center gap-2 shadow-glow-sm">
                <ArrowUpRight className="w-4 h-4" />
                Withdraw
              </button>
            </div>

            {/* Monthly Revenue */}
            <div className="glassmorphism-card bg-gradient-to-br from-[#161921]/60 to-[#161921]/30 backdrop-blur-md border border-gray-800/50 rounded-lg p-6 transition-all duration-300 hover:shadow-glow-sm group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#FF3366]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-6 h-6 text-[#FF3366]" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Monthly Revenue</p>
                  <div className="flex items-end gap-1">
                    <h3 className="text-2xl font-bold">124.8</h3>
                    <span className="text-sm text-gray-400 mb-0.5">SOL</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="w-full bg-[#0F1116]/60 h-2 rounded-full mt-2 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#FF3366] to-[#FF3366]/70"
                    style={{ width: "65%" }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>Previous: 98.2 SOL</span>
                  <span className="text-green-500">+27%</span>
                </div>
              </div>
            </div>

            {/* Total Earnings */}
            <div className="glassmorphism-card bg-gradient-to-br from-[#161921]/60 to-[#161921]/30 backdrop-blur-md border border-gray-800/50 rounded-lg p-6 transition-all duration-300 hover:shadow-glow-sm group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#FF3366]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="w-6 h-6 text-[#FF3366]" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Earnings</p>
                  <div className="flex items-end gap-1">
                    <h3 className="text-2xl font-bold">1,245.8</h3>
                    <span className="text-sm text-gray-400 mb-0.5">SOL</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-2">
                <div className="bg-[#0F1116]/60 p-2 rounded-md text-center backdrop-blur-sm">
                  <p className="text-xs text-gray-400">Recurring</p>
                  <p className="font-medium text-sm">845.3</p>
                </div>
                <div className="bg-[#0F1116]/60 p-2 rounded-md text-center backdrop-blur-sm">
                  <p className="text-xs text-gray-400">One-time</p>
                  <p className="font-medium text-sm">312.5</p>
                </div>
                <div className="bg-[#0F1116]/60 p-2 rounded-md text-center backdrop-blur-sm">
                  <p className="text-xs text-gray-400">NFT</p>
                  <p className="font-medium text-sm">88.0</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-[#161921] border border-gray-800 rounded-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-bold text-lg">Revenue Trends</h2>
          <button className="text-gray-400 hover:text-white transition-colors" onClick={() => setShowStats(!showStats)}>
            {showStats ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>

        {showStats && (
          <>
            <div className="h-[200px] relative mt-6">
              {/* SVG Chart */}
              <svg width="100%" height="200" className="overflow-visible">
                {/* Horizontal grid lines */}
                {[0, 1, 2, 3, 4].map((i) => (
                  <line
                    key={i}
                    x1="40"
                    y1={200 - i * 40}
                    x2="100%"
                    y2={200 - i * 40}
                    stroke="#1F2937"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                ))}

                {/* Y-axis labels */}
                {[0, 50, 100, 150].map((value, i) => (
                  <text key={i} x="30" y={200 - i * 40 + 5} fontSize="12" textAnchor="end" fill="#6B7280">
                    {value}
                  </text>
                ))}

                {/* X-axis */}
                <line x1="40" y1="200" x2="100%" y2="200" stroke="#1F2937" strokeWidth="1" />

                {/* Bars */}
                {monthlyData.map((data, index) => {
                  const barWidth = 30
                  const gap = 40
                  const x = 60 + index * (barWidth + gap)
                  const height = data.amount > 0 ? (data.amount / maxValue) * 160 : 0
                  const y = 200 - height

                  return (
                    <g key={index}>
                      {/* Bar */}
                      <rect
                        x={x}
                        y={y}
                        width={barWidth}
                        height={height}
                        rx="2"
                        fill={data.month === "May" ? "#FF3366" : "#4B5563"}
                        opacity={data.amount > 0 ? 1 : 0.3}
                      />

                      {/* Month label */}
                      <text x={x + barWidth / 2} y="220" fontSize="12" textAnchor="middle" fill="#9CA3AF">
                        {data.month}
                      </text>

                      {/* Value label (only for current month) */}
                      {data.month === "May" && (
                        <text x={x + barWidth / 2} y={y - 10} fontSize="12" textAnchor="middle" fill="#FF3366">
                          {data.amount}
                        </text>
                      )}
                    </g>
                  )
                })}
              </svg>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-800 grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="text-xs text-gray-400">Highest Month</p>
                <p className="font-medium">May (124.8 SOL)</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Average Monthly</p>
                <p className="font-medium">103.8 SOL</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Growth Rate</p>
                <p className="font-medium text-green-500">+12.7%</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Projected Next Month</p>
                <p className="font-medium">135.2 SOL</p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Revenue Split */}
      <div className="bg-[#161921] border border-gray-800 rounded-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-bold text-lg">Revenue Split</h2>
          <button
            className="text-gray-400 hover:text-white transition-colors"
            onClick={() => setShowRevenueDetails(!showRevenueDetails)}
          >
            {showRevenueDetails ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1 md:col-span-2 space-y-6">
            {/* You */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF3366]"></div>
                  <span>You</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#FF3366] font-medium">92%</span>
                  <span className="text-sm text-gray-400">1,146.1 SOL</span>
                </div>
              </div>
              <div className="w-full h-3 bg-[#0F1116] rounded-full overflow-hidden">
                <div className="h-full bg-[#FF3366] rounded-full" style={{ width: "92%" }}></div>
              </div>
            </div>

            {/* Collaborators */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#3B82F6]"></div>
                  <span>Collaborators</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#3B82F6] font-medium">5%</span>
                  <span className="text-sm text-gray-400">62.3 SOL</span>
                </div>
              </div>
              <div className="w-full h-3 bg-[#0F1116] rounded-full overflow-hidden">
                <div className="h-full bg-[#3B82F6] rounded-full" style={{ width: "5%" }}></div>
              </div>
            </div>

            {/* Platform Fee */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#6B7280]"></div>
                  <span>Platform Fee</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#6B7280] font-medium">3%</span>
                  <span className="text-sm text-gray-400">37.4 SOL</span>
                </div>
              </div>
              <div className="w-full h-3 bg-[#0F1116] rounded-full overflow-hidden">
                <div className="h-full bg-[#6B7280] rounded-full" style={{ width: "3%" }}></div>
              </div>
            </div>

            {showRevenueDetails && (
              <div className="mt-6 pt-6 border-t border-gray-800">
                <h3 className="text-sm font-medium mb-4">Collaborator Breakdown</h3>
                <div className="space-y-4">
                  {/* Collaborator 1 */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">Alex W.</span>
                      <span className="text-sm">28.5 SOL (45.7%)</span>
                    </div>
                    <div className="w-full h-2 bg-[#0F1116] rounded-full overflow-hidden">
                      <div className="h-full bg-[#3B82F6] rounded-full" style={{ width: "45.7%" }}></div>
                    </div>
                  </div>

                  {/* Collaborator 2 */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">Maria J.</span>
                      <span className="text-sm">18.7 SOL (30.0%)</span>
                    </div>
                    <div className="w-full h-2 bg-[#0F1116] rounded-full overflow-hidden">
                      <div className="h-full bg-[#3B82F6] rounded-full" style={{ width: "30%" }}></div>
                    </div>
                  </div>

                  {/* Collaborator 3 */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">Sam T.</span>
                      <span className="text-sm">15.1 SOL (24.3%)</span>
                    </div>
                    <div className="w-full h-2 bg-[#0F1116] rounded-full overflow-hidden">
                      <div className="h-full bg-[#3B82F6] rounded-full" style={{ width: "24.3%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-center">
            <svg width="160" height="160" viewBox="0 0 160 160">
              <defs>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Background circle */}
              <circle cx="80" cy="80" r="70" fill="#0F1116" />

              {/* Donut segments */}
              <circle
                cx="80"
                cy="80"
                r="60"
                fill="transparent"
                stroke="#FF3366"
                strokeWidth="20"
                strokeDasharray="377"
                strokeDashoffset="0"
                transform="rotate(-90 80 80)"
              />

              <circle
                cx="80"
                cy="80"
                r="60"
                fill="transparent"
                stroke="#3B82F6"
                strokeWidth="20"
                strokeDasharray="377"
                strokeDashoffset="347"
                transform="rotate(-90 80 80)"
              />

              <circle
                cx="80"
                cy="80"
                r="60"
                fill="transparent"
                stroke="#6B7280"
                strokeWidth="20"
                strokeDasharray="377"
                strokeDashoffset="358"
                transform="rotate(-90 80 80)"
              />

              {/* Center circle */}
              <circle cx="80" cy="80" r="40" fill="#161921" />

              {/* Text */}
              <text x="80" y="75" textAnchor="middle" fontSize="24" fontWeight="bold" fill="white">
                92%
              </text>
              <text x="80" y="95" textAnchor="middle" fontSize="12" fill="#9CA3AF">
                Your Share
              </text>
            </svg>
          </div>
        </div>
      </div>

      {/* Transactions */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-bold text-lg">Transaction History</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTimeframe("week")}
              className={`px-3 py-1 rounded-md text-xs ${
                activeTimeframe === "week"
                  ? "bg-[#FF3366]/10 text-[#FF3366] border border-[#FF3366]/30"
                  : "bg-[#161921] text-gray-300 border border-gray-800"
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setActiveTimeframe("month")}
              className={`px-3 py-1 rounded-md text-xs ${
                activeTimeframe === "month"
                  ? "bg-[#FF3366]/10 text-[#FF3366] border border-[#FF3366]/30"
                  : "bg-[#161921] text-gray-300 border border-gray-800"
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setActiveTimeframe("year")}
              className={`px-3 py-1 rounded-md text-xs ${
                activeTimeframe === "year"
                  ? "bg-[#FF3366]/10 text-[#FF3366] border border-[#FF3366]/30"
                  : "bg-[#161921] text-gray-300 border border-gray-800"
              }`}
            >
              Year
            </button>
            <button
              onClick={() => setActiveTimeframe("all")}
              className={`px-3 py-1 rounded-md text-xs ${
                activeTimeframe === "all"
                  ? "bg-[#FF3366]/10 text-[#FF3366] border border-[#FF3366]/30"
                  : "bg-[#161921] text-gray-300 border border-gray-800"
              }`}
            >
              All Time
            </button>
          </div>
        </div>

        <div className="bg-[#161921] border border-gray-800 rounded-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search transactions..."
                className="w-full bg-[#0F1116] border border-gray-800 rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#FF3366]/50 focus:border-[#FF3366]/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
              <button
                onClick={() => setActiveFilter("all")}
                className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm whitespace-nowrap ${
                  activeFilter === "all"
                    ? "bg-[#FF3366]/10 text-[#FF3366] border border-[#FF3366]/30"
                    : "bg-[#0F1116] text-gray-300 border border-gray-800 hover:bg-[#0F1116]/80"
                }`}
              >
                <Filter className="w-4 h-4" />
                All
              </button>
              <button
                onClick={() => setActiveFilter("incoming")}
                className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm whitespace-nowrap ${
                  activeFilter === "incoming"
                    ? "bg-[#FF3366]/10 text-[#FF3366] border border-[#FF3366]/30"
                    : "bg-[#0F1116] text-gray-300 border border-gray-800 hover:bg-[#0F1116]/80"
                }`}
              >
                <ArrowDownRight className="w-4 h-4" />
                Incoming
              </button>
              <button
                onClick={() => setActiveFilter("outgoing")}
                className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm whitespace-nowrap ${
                  activeFilter === "outgoing"
                    ? "bg-[#FF3366]/10 text-[#FF3366] border border-[#FF3366]/30"
                    : "bg-[#0F1116] text-gray-300 border border-gray-800 hover:bg-[#0F1116]/80"
                }`}
              >
                <ArrowUpRight className="w-4 h-4" />
                Outgoing
              </button>
              <button
                className="flex items-center gap-1 px-3 py-2 rounded-md text-sm whitespace-nowrap bg-[#0F1116] text-gray-300 border border-gray-800 hover:bg-[#0F1116]/80"
                onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
              >
                <Clock className="w-4 h-4" />
                {sortOrder === "desc" ? "Newest First" : "Oldest First"}
              </button>
            </div>
          </div>
        </div>

        {/* Transaction Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-[#161921] border border-gray-800 rounded-lg p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center">
                <svg width="48" height="48" viewBox="0 0 48 48">
                  <circle cx="24" cy="24" r="20" fill="#10B981" opacity="0.1" />
                  <path
                    d="M32 24L24 32M24 32L16 24M24 32V16"
                    stroke="#10B981"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    transform="rotate(180 24 24)"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Incoming</p>
                <p className="text-xl font-bold">{totalEarnings.toFixed(1)} SOL</p>
              </div>
            </div>
          </div>

          <div className="bg-[#161921] border border-gray-800 rounded-lg p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center">
                <svg width="48" height="48" viewBox="0 0 48 48">
                  <circle cx="24" cy="24" r="20" fill="#EF4444" opacity="0.1" />
                  <path
                    d="M32 24L24 32M24 32L16 24M24 32V16"
                    stroke="#EF4444"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Outgoing</p>
                <p className="text-xl font-bold">{totalOutgoing.toFixed(1)} SOL</p>
              </div>
            </div>
          </div>

          <div className="bg-[#161921] border border-gray-800 rounded-lg p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center">
                <svg width="48" height="48" viewBox="0 0 48 48">
                  <circle cx="24" cy="24" r="20" fill="#FF3366" opacity="0.1" />
                  <path
                    d="M24 12V36M30 18H21C19.3431 18 18 19.3431 18 21C18 22.6569 19.3431 24 21 24H27C28.6569 24 30 25.3431 30 27C30 28.6569 28.6569 30 27 30H18"
                    stroke="#FF3366"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-400">Net Earnings</p>
                <p className="text-xl font-bold">{netEarnings.toFixed(1)} SOL</p>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction List */}
        <div className="space-y-4">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction) => (
              <TransactionCard
                key={transaction.id}
                type={transaction.type as any}
                amount={transaction.amount}
                timestamp={transaction.timestamp}
                from={transaction.from}
                to={transaction.to}
                contentTitle={transaction.contentTitle}
                txHash={transaction.txHash}
              />
            ))
          ) : (
            <div className="bg-[#161921] border border-gray-800 rounded-lg p-8 text-center">
              <div className="w-16 h-16 mx-auto bg-[#0F1116] rounded-full flex items-center justify-center mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="#6B7280" strokeWidth="1.5" />
                  <path d="M8 12L16 12" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">No transactions found</h3>
              <p className="text-gray-400 mb-4">Try adjusting your search or filter criteria</p>
              <button
                className="inline-flex items-center gap-2 bg-[#0F1116] hover:bg-[#0F1116]/80 text-gray-300 px-4 py-2 rounded-md border border-gray-800 transition-colors"
                onClick={() => {
                  setActiveFilter("all")
                  setSearchQuery("")
                }}
              >
                <RefreshCw className="w-4 h-4" />
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions Footer */}
      <div className="bg-[#161921] border border-gray-800 rounded-lg p-6 mb-6">
        <h3 className="font-medium mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="bg-[#0F1116] hover:bg-[#0F1116]/80 border border-gray-800 rounded-lg p-4 text-center transition-all hover:border-[#FF3366]/30">
            <div className="w-10 h-10 mx-auto mb-2 rounded-full flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="5" width="18" height="14" rx="2" stroke="#FF3366" strokeWidth="1.5" />
                <path d="M3 10H21" stroke="#FF3366" strokeWidth="1.5" />
                <path d="M7 15H13" stroke="#FF3366" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <span className="text-sm">Set Up Payout</span>
          </button>
          <button className="bg-[#0F1116] hover:bg-[#0F1116]/80 border border-gray-800 rounded-lg p-4 text-center transition-all hover:border-[#FF3366]/30">
            <div className="w-10 h-10 mx-auto mb-2 rounded-full flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M3 9H21" stroke="#FF3366" strokeWidth="1.5" />
                <path d="M9 21V9" stroke="#FF3366" strokeWidth="1.5" />
                <path d="M3 3H21" stroke="#FF3366" strokeWidth="1.5" />
                <path d="M3 15H21" stroke="#FF3366" strokeWidth="1.5" />
                <path d="M15 21V15" stroke="#FF3366" strokeWidth="1.5" />
              </svg>
            </div>
            <span className="text-sm">View Reports</span>
          </button>
          <button className="bg-[#0F1116] hover:bg-[#0F1116]/80 border border-gray-800 rounded-lg p-4 text-center transition-all hover:border-[#FF3366]/30">
            <div className="w-10 h-10 mx-auto mb-2 rounded-full flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 3V16M12 16L16 12M12 16L8 12"
                  stroke="#FF3366"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 17V18C3 19.6569 4.34315 21 6 21H18C19.6569 21 21 19.6569 21 18V17"
                  stroke="#FF3366"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span className="text-sm">Export Data</span>
          </button>
          <button className="bg-[#0F1116] hover:bg-[#0F1116]/80 border border-gray-800 rounded-lg p-4 text-center transition-all hover:border-[#FF3366]/30">
            <div className="w-10 h-10 mx-auto mb-2 rounded-full flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M4 21V14" stroke="#FF3366" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M4 10V3" stroke="#FF3366" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M12 21V12" stroke="#FF3366" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M12 8V3" stroke="#FF3366" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M20 21V16" stroke="#FF3366" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M20 12V3" stroke="#FF3366" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M1 14H7" stroke="#FF3366" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M9 8H15" stroke="#FF3366" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M17 16H23" stroke="#FF3366" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <span className="text-sm">Tax Settings</span>
          </button>
        </div>
      </div>
    </DashboardLayout>
  )
}
