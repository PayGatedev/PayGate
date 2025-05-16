"use client"

import { useState, useEffect } from "react"
import {
  TrendingUp,
  Users,
  Wallet,
  ArrowUpRight,
  Plus,
  FileText,
  Vote,
  BarChart3,
  Calendar,
  ArrowRight,
  Sparkles,
  Coins,
  Eye,
  Heart,
  MessageSquare,
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard/layout"

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [showWelcome, setShowWelcome] = useState(true)

  // Animation states
  const [animateStats, setAnimateStats] = useState(false)
  const [animateContent, setAnimateContent] = useState(false)
  const [animateSidebar, setAnimateSidebar] = useState(false)

  // Add these functions to handle tab changes and button clicks
  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  const handleNewContent = () => {
    // In a real app, this would navigate to content creation page
    console.log("Navigate to new content page")
    // Example navigation: router.push("/dashboard/content/new");
  }

  const handleViewAllContent = () => {
    // In a real app, this would navigate to all content page
    console.log("Navigate to all content page")
    // Example navigation: router.push("/dashboard/content");
  }

  const handleViewAllTransactions = () => {
    // In a real app, this would navigate to transactions page
    console.log("Navigate to all transactions page")
    // Example navigation: router.push("/dashboard/wallet");
  }

  const handleViewAllSubscribers = () => {
    // In a real app, this would navigate to subscribers page
    console.log("Navigate to all subscribers page")
    // Example navigation: router.push("/dashboard/subscribers");
  }

  const handleNewProposal = () => {
    // In a real app, this would navigate to new proposal page
    console.log("Navigate to new proposal page")
    // Example navigation: router.push("/dashboard/proposals/new");
  }

  const handleVoteFor = () => {
    console.log("Vote For submitted")
    // Implement voting logic here
  }

  const handleVoteAgainst = () => {
    console.log("Vote Against submitted")
    // Implement voting logic here
  }

  const handleWithdraw = () => {
    // In a real app, this would open a withdrawal modal
    console.log("Open withdrawal modal")
  }

  const handleNewPoll = () => {
    // In a real app, this would navigate to new poll page
    console.log("Navigate to new poll page")
    // Example navigation: router.push("/dashboard/proposals/new-poll");
  }

  const handleAnalytics = () => {
    // In a real app, this would navigate to analytics page
    console.log("Navigate to analytics page")
    // Example navigation: router.push("/dashboard/analytics");
  }

  const handleSetReminder = () => {
    console.log("Reminder set")
    // Implement reminder logic here
  }

  const handleChartPeriod = (period: any) => {
    console.log(`Chart period changed to: ${period}`)
    // Implement chart period change logic here
  }

  useEffect(() => {
    setMounted(true)

    // Staggered animations with shorter durations
    const timer1 = setTimeout(() => setAnimateStats(true), 200)
    const timer2 = setTimeout(() => setAnimateContent(true), 300)
    const timer3 = setTimeout(() => setAnimateSidebar(true), 400)

    // Auto-dismiss welcome message after 5 seconds instead of 8
    const welcomeTimer = setTimeout(() => setShowWelcome(false), 5000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(welcomeTimer)
    }
  }, [])

  if (!mounted) return null

  return (
    <DashboardLayout>
      {/* Welcome Message */}
      {showWelcome && (
        <div className="fixed top-20 right-6 z-50 max-w-md animate-fade-in-right">
          <div className="relative glassmorphism-card p-4 pr-10 rounded-xl border border-white/10 bg-gradient-to-br from-[#FF3366]/10 to-purple-500/10 backdrop-blur-md shadow-glow">
            <button
              onClick={() => setShowWelcome(false)}
              className="absolute top-2 right-2 text-white/60 hover:text-white"
            >
              ×
            </button>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-gradient-to-br from-[#FF3366] to-purple-500 shadow-glow-sm">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-medium text-white">Welcome back, Creator!</h3>
                <p className="text-sm text-white/80 mt-1">
                  You've gained 12 new subscribers since your last login. Your latest content is performing well!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dashboard Header */}
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
          Dashboard Overview
        </h1>
        <p className="text-white/60 mt-1">Welcome back! Here's what's happening with your content.</p>
      </div>

      {/* Dashboard Tabs */}
      <div className="mb-8 flex overflow-x-auto hide-scrollbar animate-fade-in">
        <button
          onClick={() => handleTabChange("overview")}
          className={`px-4 py-2 rounded-full mr-2 transition-all ${
            activeTab === "overview"
              ? "bg-gradient-to-r from-[#FF3366] to-[#FF3366]/80 text-white font-medium shadow-glow-sm"
              : "text-white/60 hover:text-white hover:bg-white/5"
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => handleTabChange("performance")}
          className={`px-4 py-2 rounded-full mr-2 transition-all ${
            activeTab === "performance"
              ? "bg-gradient-to-r from-[#FF3366] to-[#FF3366]/80 text-white font-medium shadow-glow-sm"
              : "text-white/60 hover:text-white hover:bg-white/5"
          }`}
        >
          Performance
        </button>
        <button
          onClick={() => handleTabChange("earnings")}
          className={`px-4 py-2 rounded-full mr-2 transition-all ${
            activeTab === "earnings"
              ? "bg-gradient-to-r from-[#FF3366] to-[#FF3366]/80 text-white font-medium shadow-glow-sm"
              : "text-white/60 hover:text-white hover:bg-white/5"
          }`}
        >
          Earnings
        </button>
        <button
          onClick={() => handleTabChange("subscribers")}
          className={`px-4 py-2 rounded-full transition-all ${
            activeTab === "subscribers"
              ? "bg-gradient-to-r from-[#FF3366] to-[#FF3366]/80 text-white font-medium shadow-glow-sm"
              : "text-white/60 hover:text-white hover:bg-white/5"
          }`}
        >
          Subscribers
        </button>
      </div>

      {/* Stats Grid */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 ${animateStats ? "animate-fade-in-up" : "opacity-0"}`}
      >
        <div className="glassmorphism-card p-5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all group">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-white/60 text-sm">Total Revenue</p>
              <div className="flex items-baseline mt-1">
                <h3 className="text-2xl font-bold text-white">1,245.8</h3>
                <span className="ml-1 text-white/80">SOL</span>
              </div>
              <p className="text-xs text-green-400 mt-1 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12.5% from last month
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF3366]/20 to-[#FF3366]/10 flex items-center justify-center text-[#FF3366] group-hover:scale-110 transition-transform">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 h-1 w-full bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#FF3366] to-purple-500 rounded-full"
              style={{ width: "75%" }}
            ></div>
          </div>
        </div>

        <div className="glassmorphism-card p-5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all group">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-white/60 text-sm">Active Subscribers</p>
              <div className="flex items-baseline mt-1">
                <h3 className="text-2xl font-bold text-white">328</h3>
                <span className="ml-1 text-white/80">users</span>
              </div>
              <p className="text-xs text-green-400 mt-1 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                +8.3% from last month
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 h-1 w-full bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
              style={{ width: "65%" }}
            ></div>
          </div>
        </div>

        <div className="glassmorphism-card p-5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all group">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-white/60 text-sm">Content Views</p>
              <div className="flex items-baseline mt-1">
                <h3 className="text-2xl font-bold text-white">24,892</h3>
                <span className="ml-1 text-white/80">views</span>
              </div>
              <p className="text-xs text-green-400 mt-1 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                +15.2% from last month
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
              <BarChart3 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 h-1 w-full bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-violet-400 rounded-full"
              style={{ width: "85%" }}
            ></div>
          </div>
        </div>

        <div className="glassmorphism-card p-5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all group">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-white/60 text-sm">Wallet Balance</p>
              <div className="flex items-baseline mt-1">
                <h3 className="text-2xl font-bold text-white">458.2</h3>
                <span className="ml-1 text-white/80">SOL</span>
              </div>
              <p className="text-xs text-red-400 mt-1 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1 rotate-180" />
                -5.1% from last month
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/10 flex items-center justify-center text-green-400 group-hover:scale-110 transition-transform">
              <Wallet className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 h-1 w-full bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"
              style={{ width: "45%" }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2/3 width) */}
        <div
          className={`lg:col-span-2 space-y-6 ${animateContent ? "animate-fade-in-up" : "opacity-0"}`}
          style={{ animationDelay: "0.2s" }}
        >
          {/* Recent Content */}
          <div className="glassmorphism-card rounded-xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden">
            <div className="p-5 border-b border-white/10 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF3366]/30 to-[#FF3366]/10 flex items-center justify-center text-[#FF3366]">
                  <FileText className="w-4 h-4" />
                </div>
                <h2 className="font-bold text-white">Recent Content</h2>
              </div>
              <button
                onClick={handleNewContent}
                className="flex items-center gap-1 text-xs bg-gradient-to-r from-[#FF3366] to-[#FF3366]/80 hover:from-[#FF3366]/90 hover:to-[#FF3366]/70 text-white px-3 py-1.5 rounded-lg transition-all shadow-glow-sm"
              >
                <Plus className="w-3 h-3" />
                New Content
              </button>
            </div>

            <div className="p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="glassmorphism-card rounded-xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden hover:bg-white/10 transition-all group">
                  <div className="relative aspect-video bg-gradient-to-br from-[#161921]/80 to-[#0F1116]/80 overflow-hidden">
                    <img
                      src="/placeholder-7tmqw.png"
                      alt="Getting Started with Solana Development"
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute top-2 right-2 flex gap-2">
                      <span className="text-xs px-2 py-1 rounded-md bg-green-500/20 text-green-400 backdrop-blur-sm">
                        published
                      </span>
                      <span className="text-xs px-2 py-1 rounded-md bg-[#FF3366]/20 text-[#FF3366] backdrop-blur-sm">
                        recurring
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-xs px-2 py-1 rounded-md bg-green-500/20 text-green-400">article</span>
                        <h3 className="font-medium mt-2 text-white group-hover:text-[#FF3366] transition-colors">
                          Getting Started with Solana Development
                        </h3>
                        <p className="text-xs text-white/60 mt-1">May 10, 2025</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-1 text-xs text-white/60">
                        <Eye className="w-3 h-3" />
                        <span>1,245</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-white/60">
                        <Heart className="w-3 h-3" />
                        <span>89</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-white/60">
                        <MessageSquare className="w-3 h-3" />
                        <span>32</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="glassmorphism-card rounded-xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden hover:bg-white/10 transition-all group">
                  <div className="relative aspect-video bg-gradient-to-br from-[#161921]/80 to-[#0F1116]/80 overflow-hidden">
                    <img
                      src="/placeholder-1krfh.png"
                      alt="NFT Marketplace Deep Dive"
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute top-2 right-2 flex gap-2">
                      <span className="text-xs px-2 py-1 rounded-md bg-green-500/20 text-green-400 backdrop-blur-sm">
                        published
                      </span>
                      <span className="text-xs px-2 py-1 rounded-md bg-purple-500/20 text-purple-400 backdrop-blur-sm">
                        nft
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-xs px-2 py-1 rounded-md bg-blue-500/20 text-blue-400">video</span>
                        <h3 className="font-medium mt-2 text-white group-hover:text-[#FF3366] transition-colors">
                          NFT Marketplace Deep Dive
                        </h3>
                        <p className="text-xs text-white/60 mt-1">May 5, 2025</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-1 text-xs text-white/60">
                        <Eye className="w-3 h-3" />
                        <span>2,189</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-white/60">
                        <Heart className="w-3 h-3" />
                        <span>156</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-white/60">
                        <MessageSquare className="w-3 h-3" />
                        <span>47</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-center">
                <button
                  onClick={handleViewAllContent}
                  className="text-sm text-[#FF3366] hover:text-[#FF3366]/80 flex items-center gap-1 mx-auto"
                >
                  View all content
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="glassmorphism-card rounded-xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden">
            <div className="p-5 border-b border-white/10 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500/30 to-green-500/10 flex items-center justify-center text-green-400">
                  <Coins className="w-4 h-4" />
                </div>
                <h2 className="font-bold text-white">Recent Transactions</h2>
              </div>
              <button
                onClick={handleViewAllTransactions}
                className="text-xs text-[#FF3366] hover:text-[#FF3366]/80 flex items-center gap-1"
              >
                View all
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="p-5 space-y-3">
              <div className="glassmorphism-card rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-4 hover:bg-white/10 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500/20 to-green-500/5 flex items-center justify-center">
                      <ArrowUpRight className="w-5 h-5 text-green-400 rotate-180" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Subscription payment</p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-white/60">
                        <span>From: 8xGzr4...WC5</span>
                        <span className="text-white/40">•</span>
                        <span>NFT Marketplace Deep Dive</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-400">+12.5 SOL</p>
                    <p className="text-xs text-white/60 mt-1">May 15, 2025</p>
                  </div>
                </div>
              </div>

              <div className="glassmorphism-card rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-4 hover:bg-white/10 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500/20 to-green-500/5 flex items-center justify-center">
                      <ArrowUpRight className="w-5 h-5 text-green-400 rotate-180" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Subscription payment</p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-white/60">
                        <span>From: 3rTyH8...W9K</span>
                        <span className="text-white/40">•</span>
                        <span>Getting Started with Solana Development</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-400">+5.2 SOL</p>
                    <p className="text-xs text-white/60 mt-1">May 14, 2025</p>
                  </div>
                </div>
              </div>

              <div className="glassmorphism-card rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-4 hover:bg-white/10 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500/20 to-red-500/5 flex items-center justify-center">
                      <ArrowUpRight className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Collaborator payment</p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-white/60">
                        <span>To: 9zXcR6...LmN</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-red-400">-2.8 SOL</p>
                    <p className="text-xs text-white/60 mt-1">May 12, 2025</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Chart */}
          <div className="glassmorphism-card rounded-xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden">
            <div className="p-5 border-b border-white/10 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/30 to-blue-500/10 flex items-center justify-center text-blue-400">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <h2 className="font-bold text-white">Performance Overview</h2>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleChartPeriod("week")}
                  className="text-xs px-2 py-1 rounded-lg bg-white/10 text-white/80 hover:bg-white/20 transition-colors"
                >
                  Week
                </button>
                <button
                  onClick={() => handleChartPeriod("month")}
                  className="text-xs px-2 py-1 rounded-lg bg-gradient-to-r from-[#FF3366] to-[#FF3366]/80 text-white shadow-glow-sm"
                >
                  Month
                </button>
                <button
                  onClick={() => handleChartPeriod("year")}
                  className="text-xs px-2 py-1 rounded-lg bg-white/10 text-white/80 hover:bg-white/20 transition-colors"
                >
                  Year
                </button>
              </div>
            </div>

            <div className="p-5">
              <div className="h-64 w-full relative">
                {/* Placeholder for chart - in a real app, you'd use a chart library */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full">
                    <div className="relative h-full">
                      {/* Chart grid lines */}
                      <div className="absolute inset-0 grid grid-cols-6 grid-rows-4">
                        {Array.from({ length: 24 }).map((_, i) => (
                          <div key={i} className="border-t border-l border-white/5"></div>
                        ))}
                      </div>

                      {/* Chart line */}
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 240" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#FF3366" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#FF3366" stopOpacity="0" />
                          </linearGradient>
                        </defs>

                        {/* Area fill */}
                        <path
                          d="M0,180 C50,160 100,120 150,140 C200,160 250,100 300,80 C350,60 400,100 450,60 C500,20 550,40 600,30 L600,240 L0,240 Z"
                          fill="url(#gradient)"
                        />

                        {/* Line */}
                        <path
                          d="M0,180 C50,160 100,120 150,140 C200,160 250,100 300,80 C350,60 400,100 450,60 C500,20 550,40 600,30"
                          fill="none"
                          stroke="#FF3366"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />

                        {/* Data points */}
                        <circle cx="0" cy="180" r="4" fill="#FF3366" />
                        <circle cx="150" cy="140" r="4" fill="#FF3366" />
                        <circle cx="300" cy="80" r="4" fill="#FF3366" />
                        <circle cx="450" cy="60" r="4" fill="#FF3366" />
                        <circle cx="600" cy="30" r="4" fill="#FF3366" />
                      </svg>

                      {/* Y-axis labels */}
                      <div className="absolute -left-10 inset-y-0 flex flex-col justify-between text-xs text-white/60 py-2">
                        <div>500 SOL</div>
                        <div>375 SOL</div>
                        <div>250 SOL</div>
                        <div>125 SOL</div>
                        <div>0 SOL</div>
                      </div>

                      {/* X-axis labels */}
                      <div className="absolute -bottom-6 inset-x-0 flex justify-between text-xs text-white/60">
                        <div>May 1</div>
                        <div>May 7</div>
                        <div>May 14</div>
                        <div>May 21</div>
                        <div>May 28</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="glassmorphism-card rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-3 text-center">
                  <p className="text-xs text-white/60">Total Views</p>
                  <p className="text-xl font-bold text-white mt-1">24.8K</p>
                  <p className="text-xs text-green-400 mt-1">+18.2%</p>
                </div>
                <div className="glassmorphism-card rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-3 text-center">
                  <p className="text-xs text-white/60">Engagement Rate</p>
                  <p className="text-xl font-bold text-white mt-1">8.7%</p>
                  <p className="text-xs text-green-400 mt-1">+2.3%</p>
                </div>
                <div className="glassmorphism-card rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-3 text-center">
                  <p className="text-xs text-white/60">Conversion Rate</p>
                  <p className="text-xl font-bold text-white mt-1">5.2%</p>
                  <p className="text-xs text-red-400 mt-1">-0.8%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (1/3 width) */}
        <div className={`space-y-6 ${animateSidebar ? "animate-fade-in-right" : "opacity-0"}`}>
          {/* Recent Subscribers */}
          <div className="glassmorphism-card rounded-xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden">
            <div className="p-5 border-b border-white/10 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/30 to-blue-500/10 flex items-center justify-center text-blue-400">
                  <Users className="w-4 h-4" />
                </div>
                <h2 className="font-bold text-white">Recent Subscribers</h2>
              </div>
              <button
                onClick={handleViewAllSubscribers}
                className="text-xs text-[#FF3366] hover:text-[#FF3366]/80 flex items-center gap-1"
              >
                View all
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="p-5 space-y-3">
              <div className="glassmorphism-card rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-4 hover:bg-white/10 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF3366]/20 to-[#FF3366]/5 flex items-center justify-center text-[#FF3366]">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-white">8xGzr4...WC5</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs px-2 py-0.5 rounded-md bg-[#FF3366]/20 text-[#FF3366]">
                          recurring - Premium
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-xs text-white/60">
                      <Calendar className="w-3 h-3" />
                      <span>May 15</span>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-md bg-green-500/20 text-green-400 mt-1 inline-block">
                      active
                    </span>
                  </div>
                </div>
              </div>

              <div className="glassmorphism-card rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-4 hover:bg-white/10 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/20 to-purple-500/5 flex items-center justify-center text-purple-400">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-white">3rTyH8...W9K</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-400">nft</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-xs text-white/60">
                      <Calendar className="w-3 h-3" />
                      <span>May 10</span>
                    </div>
                    <span className="text-xs text-purple-400 mt-1 inline-block">NFT #1234</span>
                  </div>
                </div>
              </div>

              <div className="glassmorphism-card rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-4 hover:bg-white/10 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 flex items-center justify-center text-yellow-400">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-white">9zXcR6...LmN</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs px-2 py-0.5 rounded-md bg-yellow-500/20 text-yellow-400">
                          one-time
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-xs text-white/60">
                      <Calendar className="w-3 h-3" />
                      <span>May 5</span>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-md bg-red-500/20 text-red-400 mt-1 inline-block">
                      expired
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Active Proposals */}
          <div className="glassmorphism-card rounded-xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden">
            <div className="p-5 border-b border-white/10 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/30 to-purple-500/10 flex items-center justify-center text-purple-400">
                  <Vote className="w-4 h-4" />
                </div>
                <h2 className="font-bold text-white">Active Proposals</h2>
              </div>
              <button
                onClick={handleNewProposal}
                className="flex items-center gap-1 text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg transition-colors"
              >
                <Plus className="w-3 h-3" />
                New Proposal
              </button>
            </div>

            <div className="p-5">
              <div className="glassmorphism-card rounded-xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden hover:bg-white/10 transition-all">
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/20 to-purple-500/5 flex items-center justify-center">
                        <Vote className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">Next Content Topic Poll</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-400">active</span>
                          <span className="text-xs text-white/60">ID: PROP-1234</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-400">active</span>
                  </div>

                  <div className="mt-3">
                    <p className="text-sm text-white/80 line-clamp-2">
                      Vote on what content I should create next. Options include: Advanced Solana Programming, NFT
                      Collection Launch Guide, or DeFi Protocol Analysis.
                    </p>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs text-white/60 mb-1">
                      <span>Votes</span>
                      <span>198 / 328</span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-green-400"
                        style={{ width: "60%" }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-1 text-xs">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="text-green-400">78%</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <span className="text-red-400">22%</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={handleVoteFor}
                      className="flex-1 bg-gradient-to-r from-green-500/20 to-green-500/10 hover:from-green-500/30 hover:to-green-500/20 text-green-400 text-sm py-2 rounded-lg transition-colors"
                    >
                      Vote For
                    </button>
                    <button
                      onClick={handleVoteAgainst}
                      className="flex-1 bg-gradient-to-r from-red-500/20 to-red-500/10 hover:from-red-500/30 hover:to-red-500/20 text-red-400 text-sm py-2 rounded-lg transition-colors"
                    >
                      Vote Against
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="glassmorphism-card rounded-xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden">
            <div className="p-5 border-b border-white/10">
              <h2 className="font-bold text-white">Quick Actions</h2>
            </div>

            <div className="p-5">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleNewContent}
                  className="glassmorphism-card flex flex-col items-center justify-center bg-gradient-to-br from-[#FF3366]/10 to-[#FF3366]/5 hover:from-[#FF3366]/20 hover:to-[#FF3366]/10 border border-white/10 rounded-xl p-4 transition-all group"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF3366]/20 to-[#FF3366]/10 flex items-center justify-center text-[#FF3366] mb-2 group-hover:scale-110 transition-transform">
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className="text-xs text-white group-hover:text-[#FF3366] transition-colors">New Content</span>
                </button>

                <button
                  onClick={handleWithdraw}
                  className="glassmorphism-card flex flex-col items-center justify-center bg-gradient-to-br from-green-500/10 to-green-500/5 hover:from-green-500/20 hover:to-green-500/10 border border-white/10 rounded-xl p-4 transition-all group"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500/20 to-green-500/10 flex items-center justify-center text-green-400 mb-2 group-hover:scale-110 transition-transform">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                  <span className="text-xs text-white group-hover:text-green-400 transition-colors">Withdraw</span>
                </button>

                <button
                  onClick={handleNewPoll}
                  className="glassmorphism-card flex flex-col items-center justify-center bg-gradient-to-br from-purple-500/10 to-purple-500/5 hover:from-purple-500/20 hover:to-purple-500/10 border border-white/10 rounded-xl p-4 transition-all group"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/20 to-purple-500/10 flex items-center justify-center text-purple-400 mb-2 group-hover:scale-110 transition-transform">
                    <Vote className="w-5 h-5" />
                  </div>
                  <span className="text-xs text-white group-hover:text-purple-400 transition-colors">New Poll</span>
                </button>

                <button
                  onClick={handleAnalytics}
                  className="glassmorphism-card flex flex-col items-center justify-center bg-gradient-to-br from-blue-500/10 to-blue-500/5 hover:from-blue-500/20 hover:to-blue-500/10 border border-white/10 rounded-xl p-4 transition-all group"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-500/10 flex items-center justify-center text-blue-400 mb-2 group-hover:scale-110 transition-transform">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <span className="text-xs text-white group-hover:text-blue-400 transition-colors">Analytics</span>
                </button>
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="glassmorphism-card rounded-xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden">
            <div className="p-5 border-b border-white/10">
              <h2 className="font-bold text-white">Upcoming Events</h2>
            </div>

            <div className="p-5">
              <div className="glassmorphism-card rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-4 hover:bg-white/10 transition-all">
                <div className="flex items-start gap-3">
                  <div className="min-w-12 h-12 rounded-lg bg-gradient-to-br from-[#FF3366]/20 to-[#FF3366]/5 flex flex-col items-center justify-center text-[#FF3366]">
                    <span className="text-xs font-medium">MAY</span>
                    <span className="text-lg font-bold">20</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Community AMA Session</h3>
                    <p className="text-xs text-white/60 mt-1">Live Q&A with special guests from the Solana ecosystem</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs px-2 py-0.5 rounded-md bg-[#FF3366]/20 text-[#FF3366]">3:00 PM UTC</span>
                      <button onClick={handleSetReminder} className="text-xs text-[#FF3366]">
                        Set Reminder
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
