"use client"

import { DashboardLayout } from "@/components/dashboard/layout"
import { ProposalCard } from "@/components/dashboard/proposal-card"
import { Plus, Search, Vote, Clock, CheckCircle2, XCircle, AlertCircle } from "lucide-react"
import { useState, useEffect } from "react"

export default function ProposalsPage() {
  const [activeTab, setActiveTab] = useState<string>("active")
  const [searchQuery, setSearchQuery] = useState("")
  const [animateCards, setAnimateCards] = useState(false)

  useEffect(() => {
    // Animate cards after a short delay
    const animateTimer = setTimeout(() => setAnimateCards(true), 300)
    return () => clearTimeout(animateTimer)
  }, [])

  const proposals = [
    {
      id: "PROP-1234",
      title: "Next Content Topic Poll",
      description:
        "Vote on what content I should create next. Options include: Advanced Solana Programming, NFT Collection Launch Guide, or DeFi Protocol Analysis.",
      status: "active",
      votesFor: 156,
      votesAgainst: 42,
      totalVotes: 328,
      endDate: "May 20, 2025",
      category: "content",
      daysLeft: 5,
    },
    {
      id: "PROP-1233",
      title: "Community AMA Session",
      description:
        "Should we host a live AMA session with special guests from the Solana ecosystem? This would be a 2-hour session with Q&A and networking opportunities.",
      status: "active",
      votesFor: 203,
      votesAgainst: 15,
      totalVotes: 328,
      endDate: "May 18, 2025",
      category: "event",
      daysLeft: 3,
    },
    {
      id: "PROP-1232",
      title: "Premium Tier Price Adjustment",
      description:
        "Proposal to increase the premium tier subscription from 5 SOL to 7.5 SOL per month, with added benefits including exclusive NFT airdrops and priority support.",
      status: "passed",
      votesFor: 189,
      votesAgainst: 87,
      totalVotes: 310,
      endDate: "May 5, 2025",
      category: "pricing",
      daysLeft: 0,
    },
    {
      id: "PROP-1231",
      title: "Collaborator Revenue Split Change",
      description:
        "Proposal to adjust the revenue split for collaborators from 5% to 8% to attract more high-quality contributors to our platform.",
      status: "rejected",
      votesFor: 98,
      votesAgainst: 202,
      totalVotes: 300,
      endDate: "April 28, 2025",
      category: "finance",
      daysLeft: 0,
    },
    {
      id: "PROP-1230",
      title: "Weekly Live Coding Sessions",
      description:
        "Should we start weekly live coding sessions where subscribers can watch and participate in building real projects on Solana?",
      status: "expired",
      votesFor: 145,
      votesAgainst: 145,
      totalVotes: 290,
      endDate: "April 20, 2025",
      category: "content",
      daysLeft: 0,
    },
  ]

  const filteredProposals = proposals.filter((proposal) => {
    // Filter by tab
    const matchesTab = activeTab === "all" || proposal.status === activeTab

    // Filter by search
    const matchesSearch =
      searchQuery === "" ||
      proposal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proposal.description.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesTab && matchesSearch
  })

  // Count proposals by status
  const activeCount = proposals.filter((p) => p.status === "active").length
  const passedCount = proposals.filter((p) => p.status === "passed").length
  const rejectedCount = proposals.filter((p) => p.status === "rejected").length
  const expiredCount = proposals.filter((p) => p.status === "expired").length

  return (
    <DashboardLayout>
      {/* Simplified Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-[#FF3366]/10 flex items-center justify-center">
            <Vote className="w-5 h-5 text-[#FF3366]" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Proposals</h1>
            <p className="text-gray-400 text-sm">Shape the future</p>
          </div>
        </div>
        <button
          className="flex items-center gap-2 bg-[#FF3366] hover:bg-[#FF3366]/90 text-white px-3 py-2 rounded-md transition-all text-sm"
          onClick={() => console.log("Create new proposal")}
        >
          <Plus className="w-4 h-4" />
          <span>New Proposal</span>
        </button>
      </div>

      {/* Simplified Tabs and Search */}
      <div className="mb-6 flex flex-col md:flex-row gap-4 items-center">
        {/* Simplified Tabs */}
        <div className="flex bg-[#161921] rounded-md p-1 w-full md:w-auto border border-gray-800">
          <button
            onClick={() => setActiveTab("active")}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs transition-all ${
              activeTab === "active"
                ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Clock className="w-3 h-3" />
            <span>Active ({activeCount})</span>
          </button>
          <button
            onClick={() => setActiveTab("passed")}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs transition-all ${
              activeTab === "passed"
                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <CheckCircle2 className="w-3 h-3" />
            <span>Passed ({passedCount})</span>
          </button>
          <button
            onClick={() => setActiveTab("rejected")}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs transition-all ${
              activeTab === "rejected"
                ? "bg-red-500/20 text-red-400 border border-red-500/30"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <XCircle className="w-3 h-3" />
            <span>Rejected ({rejectedCount})</span>
          </button>
          <button
            onClick={() => setActiveTab("expired")}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs transition-all ${
              activeTab === "expired"
                ? "bg-gray-500/20 text-gray-400 border border-gray-500/30"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <AlertCircle className="w-3 h-3" />
            <span>Expired ({expiredCount})</span>
          </button>
        </div>

        {/* Simplified Search */}
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
          <input
            type="text"
            placeholder="Search proposals..."
            className="w-full bg-[#161921] border border-gray-800 rounded-md py-1.5 pl-8 pr-3 text-xs focus:outline-none focus:ring-1 focus:ring-[#FF3366]/50 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Proposals Grid with Animation */}
      {filteredProposals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProposals.map((proposal, index) => (
            <div
              key={proposal.id}
              className={`transition-all duration-300 ${
                animateCards ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <ProposalCard
                id={proposal.id}
                title={proposal.title}
                description={proposal.description}
                status={proposal.status as any}
                votesFor={proposal.votesFor}
                votesAgainst={proposal.votesAgainst}
                totalVotes={proposal.totalVotes}
                endDate={proposal.endDate}
                category={proposal.category}
                daysLeft={proposal.daysLeft}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-[#161921] border border-gray-800 rounded-md p-6 text-center animate-fade-in max-w-md mx-auto">
          <div className="w-12 h-12 rounded-md bg-[#0F1116] mx-auto flex items-center justify-center mb-3">
            <Vote className="w-6 h-6 text-gray-500" />
          </div>
          <h3 className="text-base font-medium mb-2">No proposals found</h3>
          <p className="text-gray-400 text-sm mb-3">
            {searchQuery ? `No results found for "${searchQuery}"` : "No proposals match the selected tab."}
          </p>
          <button className="flex items-center gap-2 bg-[#FF3366] hover:bg-[#FF3366]/90 text-white px-3 py-1.5 rounded-md transition-all mx-auto text-sm">
            <Plus className="w-3 h-3" />
            <span>Create New Proposal</span>
          </button>
        </div>
      )}
    </DashboardLayout>
  )
}
