"use client"

import { DashboardLayout } from "@/components/dashboard/layout"
import {
  Plus,
  Search,
  Users2,
  Filter,
  SlidersHorizontal,
  ChevronDown,
  Download,
  Mail,
  Percent,
  FileText,
  BarChart3,
  Clock,
} from "lucide-react"
import { useState } from "react"

// Role types with their associated colors
const ROLE_COLORS = {
  "Co-creator": "#FF3366",
  Editor: "#9C6ADE",
  Designer: "#4F8BFF",
  "Technical Advisor": "#00B2D9",
  Contributor: "#36B37E",
}

type RoleType = keyof typeof ROLE_COLORS

export default function CollaboratorsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")
  const [showOnboarding, setShowOnboarding] = useState(true)

  // Sample collaborators data
  const collaborators = [
    {
      id: 1,
      name: "Alex Johnson",
      walletAddress: "8xGzr4NxJqH7aPV1tcWC5",
      role: "Co-creator" as RoleType,
      revenueShare: 15,
      pendingAmount: "24.5",
      contentCount: 5,
      status: "active",
      lastActive: "2 hours ago",
      joinedDate: "Mar 15, 2023",
    },
    {
      id: 2,
      name: "Maria Garcia",
      walletAddress: "3rTyH8NpQs2VbLmFxW9K",
      role: "Editor" as RoleType,
      revenueShare: 8,
      pendingAmount: "12.8",
      contentCount: 8,
      status: "active",
      lastActive: "5 hours ago",
      joinedDate: "Apr 22, 2023",
    },
    {
      id: 3,
      name: "Sam Wilson",
      walletAddress: "9zXcR6TyU4PqS3VdLmN",
      role: "Designer" as RoleType,
      revenueShare: 5,
      pendingAmount: "8.3",
      contentCount: 4,
      status: "inactive",
      lastActive: "3 days ago",
      joinedDate: "Jan 10, 2023",
    },
    {
      id: 4,
      name: "Taylor Kim",
      walletAddress: "5kLmN8PqR3SdFgH7jK",
      role: "Technical Advisor" as RoleType,
      revenueShare: 10,
      pendingAmount: "16.7",
      contentCount: 3,
      status: "active",
      lastActive: "1 day ago",
      joinedDate: "Feb 5, 2023",
    },
  ]

  // Calculate total pending payments
  const totalPending = collaborators
    .reduce((sum, collab) => sum + Number.parseFloat(collab.pendingAmount), 0)
    .toFixed(1)

  // Calculate total revenue share
  const totalRevenueShare = collaborators.reduce((sum, collab) => sum + collab.revenueShare, 0)

  // Filter collaborators based on search query and active filter
  const filteredCollaborators = collaborators.filter((collab) => {
    const matchesSearch =
      collab.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      collab.walletAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
      collab.role.toLowerCase().includes(searchQuery.toLowerCase())

    if (!activeFilter) return matchesSearch
    return matchesSearch && collab.role === activeFilter
  })

  // Group collaborators by role for the team visualization
  const collaboratorsByRole = collaborators.reduce(
    (acc, collab) => {
      if (!acc[collab.role]) {
        acc[collab.role] = []
      }
      acc[collab.role].push(collab)
      return acc
    },
    {} as Record<string, typeof collaborators>,
  )

  // Generate SVG avatar based on wallet address
  const generateAvatar = (walletAddress: string, size = 40) => {
    // Generate a deterministic color based on wallet address
    const hash = walletAddress.split("").reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc)
    }, 0)

    const h = Math.abs(hash % 360)
    const s = 70 + (hash % 20)
    const l = 45 + (hash % 10)

    const bgColor = `hsl(${h}, ${s}%, ${l}%)`
    const textColor = `hsl(${h}, ${s}%, 95%)`

    // Get initials from wallet address (first and last character)
    const initials = `${walletAddress.charAt(0)}${walletAddress.charAt(walletAddress.length - 1)}`.toUpperCase()

    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rounded-full">
        <circle cx={size / 2} cy={size / 2} r={size / 2} fill={bgColor} opacity="0.2" />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="central"
          fill={textColor}
          fontSize={size / 2}
          fontWeight="bold"
        >
          {initials}
        </text>
      </svg>
    )
  }

  // Role icon component
  const RoleIcon = ({ role }: { role: RoleType }) => {
    const color = ROLE_COLORS[role]

    switch (role) {
      case "Co-creator":
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M17 2H7C5.9 2 5 2.9 5 4V20C5 21.1 5.9 22 7 22H17C18.1 22 19 21.1 19 20V4C19 2.9 18.1 2 17 2Z"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 18C13.6569 18 15 16.6569 15 15C15 13.3431 13.6569 12 12 12C10.3431 12 9 13.3431 9 15C9 16.6569 10.3431 18 12 18Z"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M9 8H15" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )
      case "Editor":
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 19L19 12L22 15L15 22L12 19Z"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18 13L16.5 5.5L2 2L5.5 16.5L13 18L18 13Z"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M2 2L9.5 9.5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )
      case "Designer":
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M9 9H9.01" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15 9H15.01" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )
      case "Technical Advisor":
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M14 3V7C14 7.26522 14.1054 7.51957 14.2929 7.70711C14.4804 7.89464 14.7348 8 15 8H19"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17 21H7C6.46957 21 5.96086 20.7893 5.58579 20.4142C5.21071 20.0391 5 19.5304 5 19V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H14L19 8V19C19 19.5304 18.7893 20.0391 18.4142 20.4142C18.0391 20.7893 17.5304 21 17 21Z"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M9 7H10" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9 13H15" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13 17H15" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )
      default:
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8.5 11C10.7091 11 12.5 9.20914 12.5 7C12.5 4.79086 10.7091 3 8.5 3C6.29086 3 4.5 4.79086 4.5 7C4.5 9.20914 6.29086 11 8.5 11Z"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M20 8V14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M23 11H17" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )
    }
  }

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
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF3366]/20 to-purple-500/20"></div>

        {/* Content */}
        <div className="relative glassmorphism-card p-6 border border-gray-800/50">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Users2 className="w-6 h-6 text-[#FF3366]" />
                Collaborators
              </h1>
              <p className="text-gray-400 mt-1">Manage your team and revenue sharing</p>
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

              <button className="flex items-center gap-2 bg-[#FF3366] hover:bg-[#FF3366]/90 text-white px-4 py-2 rounded-md transition-all shadow-glow-sm hover:shadow-glow">
                <Plus className="w-4 h-4" />
                <span>Add Collaborator</span>
              </button>
            </div>
          </div>

          {/* Filters panel - conditionally shown */}
          {showFilters && (
            <div className="mt-4 p-4 bg-[#161921]/80 border border-gray-800/50 rounded-lg animate-fadeIn">
              <div className="flex flex-wrap gap-3">
                <button
                  className={`px-3 py-1.5 rounded-full text-sm transition-all ${activeFilter === null ? "bg-[#FF3366] text-white" : "bg-[#1E2029] text-gray-300 hover:bg-[#1E2029]/80"}`}
                  onClick={() => setActiveFilter(null)}
                >
                  All Roles
                </button>

                {Object.keys(ROLE_COLORS).map((role) => (
                  <button
                    key={role}
                    className={`px-3 py-1.5 rounded-full text-sm transition-all flex items-center gap-1.5 ${activeFilter === role ? "bg-[#FF3366] text-white" : "bg-[#1E2029] text-gray-300 hover:bg-[#1E2029]/80"}`}
                    onClick={() => setActiveFilter(activeFilter === role ? null : role)}
                    style={{
                      backgroundColor: activeFilter === role ? ROLE_COLORS[role as RoleType] : undefined,
                    }}
                  >
                    <RoleIcon role={role as RoleType} />
                    {role}
                  </button>
                ))}
              </div>

              <div className="flex justify-between mt-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-400">View as:</span>
                  <div className="flex bg-[#1E2029] rounded-md overflow-hidden">
                    <button
                      className={`px-3 py-1.5 text-sm transition-all ${viewMode === "list" ? "bg-[#FF3366] text-white" : "text-gray-300 hover:bg-[#1E2029]/80"}`}
                      onClick={() => setViewMode("list")}
                    >
                      List
                    </button>
                    <button
                      className={`px-3 py-1.5 text-sm transition-all ${viewMode === "grid" ? "bg-[#FF3366] text-white" : "text-gray-300 hover:bg-[#1E2029]/80"}`}
                      onClick={() => setViewMode("grid")}
                    >
                      Grid
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1">
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                  <span className="text-gray-600">|</span>
                  <button className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1">
                    <SlidersHorizontal className="w-4 h-4" />
                    Advanced
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Onboarding tip - shown only for new users */}
      {showOnboarding && (
        <div className="mb-6 p-4 bg-[#161921] border-l-4 border-[#FF3366] rounded-r-lg animate-fadeIn relative">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-300"
            onClick={() => setShowOnboarding(false)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <h3 className="font-medium flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="#FF3366"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M12 16V12" stroke="#FF3366" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 8H12.01" stroke="#FF3366" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Collaborator Management Tips
          </h3>
          <p className="text-sm text-gray-400 mt-1 ml-6">
            Add team members to collaborate on content and share revenue. Each collaborator can have a specific role and
            revenue percentage.
          </p>
          <div className="flex gap-4 mt-3 ml-6">
            <button className="text-sm text-[#FF3366] hover:text-[#FF3366]/80 transition-colors">Learn more</button>
            <button
              className="text-sm text-gray-400 hover:text-white transition-colors"
              onClick={() => setShowOnboarding(false)}
            >
              Don't show again
            </button>
          </div>
        </div>
      )}

      {/* Stats Cards with glassmorphism */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="glassmorphism-card bg-[#161921]/60 border border-gray-800/50 rounded-lg p-5 group hover:shadow-glow-sm transition-all">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Collaborators</p>
              <h3 className="text-2xl font-bold mt-1">{collaborators.length}</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#FF3366]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users2 className="w-5 h-5 text-[#FF3366]" />
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
                25%
              </span>
              from last month
            </div>
          </div>
        </div>

        <div className="glassmorphism-card bg-[#161921]/60 border border-gray-800/50 rounded-lg p-5 group hover:shadow-glow-sm transition-all">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-400">Pending Payments</p>
              <h3 className="text-2xl font-bold mt-1">{totalPending} SOL</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#FF3366]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 1V23" stroke="#FF3366" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path
                  d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6"
                  stroke="#FF3366"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-800/50">
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <span className="flex items-center gap-0.5 text-amber-400">
                <Clock className="w-3 h-3" />
                Next payout in 3 days
              </span>
            </div>
          </div>
        </div>

        <div className="glassmorphism-card bg-[#161921]/60 border border-gray-800/50 rounded-lg p-5 group hover:shadow-glow-sm transition-all">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-400">Revenue Share</p>
              <h3 className="text-2xl font-bold mt-1">{totalRevenueShare}%</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#FF3366]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Percent className="w-5 h-5 text-[#FF3366]" />
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-800/50">
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <span>of total content revenue</span>
            </div>
          </div>
        </div>
      </div>

      {/* Team visualization */}
      <div className="mb-6 glassmorphism-card bg-[#161921]/60 border border-gray-800/50 rounded-lg p-5">
        <h3 className="font-medium mb-4 flex items-center gap-2">
          <Users2 className="w-5 h-5 text-[#FF3366]" />
          Team Visualization
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Role distribution */}
          <div>
            <h4 className="text-sm text-gray-400 mb-2">Role Distribution</h4>
            {Object.entries(collaboratorsByRole).map(([role, members]) => (
              <div key={role} className="mb-2">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <RoleIcon role={role as RoleType} />
                    <span className="text-sm">{role}</span>
                  </div>
                  <span className="text-sm">{members.length}</span>
                </div>
                <div className="h-2 bg-[#0F1116] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${(members.length / collaborators.length) * 100}%`,
                      backgroundColor: ROLE_COLORS[role as RoleType],
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Revenue share distribution */}
          <div>
            <h4 className="text-sm text-gray-400 mb-2">Revenue Share Distribution</h4>
            <div className="flex justify-center">
              <svg width="150" height="150" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#1E2029" strokeWidth="10" />

                {/* Calculate and render the donut chart segments */}
                {(() => {
                  let startAngle = 0
                  return Object.entries(collaboratorsByRole).map(([role, members]) => {
                    const totalRoleShare = members.reduce((sum, member) => sum + member.revenueShare, 0)
                    const percentage = totalRoleShare / totalRevenueShare
                    const dashArray = percentage * 283 // 2πr where r=45
                    const dashOffset = startAngle * 283
                    startAngle += percentage

                    return (
                      <circle
                        key={role}
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke={ROLE_COLORS[role as RoleType]}
                        strokeWidth="10"
                        strokeDasharray={`${dashArray} ${283 - dashArray}`}
                        strokeDashoffset={-dashOffset}
                        transform="rotate(-90 50 50)"
                      />
                    )
                  })
                })()}

                {/* Center text */}
                <text x="50" y="45" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                  {totalRevenueShare}%
                </text>
                <text x="50" y="60" textAnchor="middle" fill="#9CA3AF" fontSize="8">
                  Total Share
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Search with improved styling */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search collaborators by name, wallet or role..."
          className="w-full bg-[#161921] border border-gray-800 rounded-md py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF3366]/50 transition-all"
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

      {/* Collaborators List/Grid with improved styling */}
      {filteredCollaborators.length > 0 ? (
        <>
          {viewMode === "list" ? (
            <div className="space-y-4 mb-6">
              {filteredCollaborators.map((collaborator) => (
                <div
                  key={collaborator.id}
                  className="glassmorphism-card bg-[#161921]/60 border border-gray-800/50 rounded-lg p-5 hover:shadow-glow-sm transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {generateAvatar(collaborator.walletAddress)}
                      <div>
                        <p className="font-medium group-hover:text-[#FF3366] transition-colors">{collaborator.name}</p>
                        <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                          <span className="font-mono">{`${collaborator.walletAddress.slice(0, 6)}...${collaborator.walletAddress.slice(-6)}`}</span>
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-500"></span>
                          <span>Joined {collaborator.joinedDate}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div
                          className="flex items-center gap-1 justify-end px-2 py-0.5 rounded-full text-xs"
                          style={{
                            backgroundColor: `${ROLE_COLORS[collaborator.role]}20`,
                            color: ROLE_COLORS[collaborator.role],
                          }}
                        >
                          <RoleIcon role={collaborator.role} />
                          <span>{collaborator.role}</span>
                        </div>
                        <div className="flex items-center gap-1 justify-end mt-1">
                          <Percent className="w-3 h-3 text-[#FF3366]" />
                          <span className="font-medium">{collaborator.revenueShare}% share</span>
                        </div>
                      </div>

                      <div className="flex flex-col items-end">
                        <div className="flex items-center gap-1">
                          <span
                            className={`inline-block w-2 h-2 rounded-full ${collaborator.status === "active" ? "bg-green-500" : "bg-gray-500"}`}
                          ></span>
                          <span className="text-sm">{collaborator.status === "active" ? "Active" : "Inactive"}</span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">Last active {collaborator.lastActive}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-800/50 flex justify-between items-center">
                    <div className="flex gap-6">
                      <div>
                        <p className="text-sm text-gray-400">Pending</p>
                        <p className="font-medium text-[#FF3366]">{collaborator.pendingAmount} SOL</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Content</p>
                        <p className="font-medium">{collaborator.contentCount} items</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button className="bg-[#0F1116] hover:bg-[#0F1116]/80 text-xs px-3 py-1.5 rounded-md border border-gray-700 transition-colors flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        Message
                      </button>
                      <button className="bg-[#0F1116] hover:bg-[#0F1116]/80 text-xs px-3 py-1.5 rounded-md border border-gray-700 transition-colors flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        Details
                      </button>
                      <button className="bg-[#FF3366] hover:bg-[#FF3366]/90 text-white text-xs px-3 py-1.5 rounded-md transition-colors flex items-center gap-1">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M12 1V23"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Pay Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {filteredCollaborators.map((collaborator) => (
                <div
                  key={collaborator.id}
                  className="glassmorphism-card bg-[#161921]/60 border border-gray-800/50 rounded-lg p-5 hover:shadow-glow-sm transition-all group"
                >
                  <div className="flex flex-col items-center text-center mb-4">
                    <div className="mb-3">{generateAvatar(collaborator.walletAddress, 60)}</div>
                    <h3 className="font-medium group-hover:text-[#FF3366] transition-colors">{collaborator.name}</h3>
                    <p className="text-xs text-gray-400 mt-1 font-mono">{`${collaborator.walletAddress.slice(0, 6)}...${collaborator.walletAddress.slice(-6)}`}</p>
                    <div
                      className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs mt-2"
                      style={{
                        backgroundColor: `${ROLE_COLORS[collaborator.role]}20`,
                        color: ROLE_COLORS[collaborator.role],
                      }}
                    >
                      <RoleIcon role={collaborator.role} />
                      <span>{collaborator.role}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="bg-[#0F1116] rounded-lg p-2 text-center">
                      <p className="text-xs text-gray-400">Share</p>
                      <p className="font-medium text-[#FF3366]">{collaborator.revenueShare}%</p>
                    </div>
                    <div className="bg-[#0F1116] rounded-lg p-2 text-center">
                      <p className="text-xs text-gray-400">Pending</p>
                      <p className="font-medium">{collaborator.pendingAmount}</p>
                    </div>
                    <div className="bg-[#0F1116] rounded-lg p-2 text-center">
                      <p className="text-xs text-gray-400">Content</p>
                      <p className="font-medium">{collaborator.contentCount}</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                      <span
                        className={`inline-block w-2 h-2 rounded-full ${collaborator.status === "active" ? "bg-green-500" : "bg-gray-500"}`}
                      ></span>
                      <span className="text-xs">{collaborator.status === "active" ? "Active" : "Inactive"}</span>
                    </div>

                    <button className="bg-[#FF3366] hover:bg-[#FF3366]/90 text-white text-xs px-3 py-1.5 rounded-md transition-colors flex items-center gap-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 1V23"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Pay Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quick actions footer */}
          <div className="glassmorphism-card bg-[#161921]/60 border border-gray-800/50 rounded-lg p-4 flex justify-between items-center">
            <div className="flex items-center gap-1 text-sm text-gray-400">
              <span>
                Showing {filteredCollaborators.length} of {collaborators.length} collaborators
              </span>
              {activeFilter && (
                <button
                  className="ml-2 flex items-center gap-1 bg-[#FF3366]/20 text-[#FF3366] px-2 py-0.5 rounded-full text-xs"
                  onClick={() => setActiveFilter(null)}
                >
                  {activeFilter}
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
                <BarChart3 className="w-4 h-4" />
                View Analytics
              </button>
              <button className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 1V23"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Pay All
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="glassmorphism-card bg-[#161921]/60 border border-gray-800/50 rounded-lg p-8 text-center">
          <div className="w-20 h-20 rounded-full bg-[#0F1116] mx-auto flex items-center justify-center mb-4">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
                stroke="#FF3366"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.5 11C10.7091 11 12.5 9.20914 12.5 7C12.5 4.79086 10.7091 3 8.5 3C6.29086 3 4.5 4.79086 4.5 7C4.5 9.20914 6.29086 11 8.5 11Z"
                stroke="#FF3366"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M20 8V14" stroke="#FF3366" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M23 11H17" stroke="#FF3366" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h3 className="text-lg font-medium mb-2">No collaborators found</h3>
          <p className="text-gray-400 mb-4 max-w-md mx-auto">
            {searchQuery
              ? `No results found for "${searchQuery}". Try a different search term or clear your filters.`
              : "You haven't added any collaborators yet. Add team members to collaborate on content and share revenue."}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="flex items-center gap-2 bg-[#FF3366] hover:bg-[#FF3366]/90 text-white px-4 py-2 rounded-md transition-colors shadow-glow-sm hover:shadow-glow">
              <Plus className="w-4 h-4" />
              <span>Add Your First Collaborator</span>
            </button>
            {searchQuery && (
              <button
                className="flex items-center gap-2 bg-[#161921] hover:bg-[#1E2029] text-gray-300 px-4 py-2 rounded-md border border-gray-800 transition-colors"
                onClick={() => setSearchQuery("")}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                <span>Clear Search</span>
              </button>
            )}
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}
