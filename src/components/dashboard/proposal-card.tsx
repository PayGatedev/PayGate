"use client"

import { Users, Calendar, CheckCircle2, XCircle, Clock, ArrowRight, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

interface ProposalCardProps {
  title: string
  description: string
  status: "active" | "passed" | "rejected" | "expired"
  votesFor: number
  votesAgainst: number
  totalVotes: number
  endDate: string
  id: string
  category?: string
  daysLeft?: number
}

export function ProposalCard({
  title,
  description,
  status,
  votesFor,
  votesAgainst,
  totalVotes,
  endDate,
  id,
  category = "content",
  daysLeft = 0,
}: ProposalCardProps) {
  const [expanded, setExpanded] = useState(false)
  const [hasVoted, setHasVoted] = useState(false)
  const [userVote, setUserVote] = useState<"for" | "against" | null>(null)

  const forPercentage = Math.round((votesFor / totalVotes) * 100) || 0
  const againstPercentage = Math.round((votesAgainst / totalVotes) * 100) || 0

  const handleVote = (vote: "for" | "against") => {
    if (status !== "active" || hasVoted) return
    setHasVoted(true)
    setUserVote(vote)
    console.log(`Voted ${vote} on proposal ${id}`)
  }

  // Get status-specific styling
  const getStatusStyles = () => {
    switch (status) {
      case "active":
        return {
          borderColor: "border-blue-500/30",
          accentColor: "text-blue-400",
          badge: "bg-blue-500/10 text-blue-400",
          icon: <Clock className="w-3 h-3" />,
          label: daysLeft > 0 ? `${daysLeft}d left` : "Active",
        }
      case "passed":
        return {
          borderColor: "border-green-500/30",
          accentColor: "text-green-400",
          badge: "bg-green-500/10 text-green-400",
          icon: <CheckCircle2 className="w-3 h-3" />,
          label: "Passed",
        }
      case "rejected":
        return {
          borderColor: "border-red-500/30",
          accentColor: "text-red-400",
          badge: "bg-red-500/10 text-red-400",
          icon: <XCircle className="w-3 h-3" />,
          label: "Rejected",
        }
      case "expired":
        return {
          borderColor: "border-gray-500/30",
          accentColor: "text-gray-400",
          badge: "bg-gray-500/10 text-gray-400",
          icon: <Clock className="w-3 h-3" />,
          label: "Expired",
        }
    }
  }

  const statusStyles = getStatusStyles()

  return (
    <div
      className={`border ${statusStyles.borderColor} rounded-md bg-[#161921] shadow-md hover:shadow-lg transition-all max-w-md mx-auto`}
    >
      <div className="p-4">
        {/* Title with Status Badge */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-white text-base">{title}</h3>
          <div
            className={`flex items-center gap-1 ${statusStyles.badge} px-2 py-0.5 rounded text-xs ml-2 whitespace-nowrap`}
          >
            {statusStyles.icon}
            <span>{statusStyles.label}</span>
          </div>
        </div>

        {/* Category */}
        <div className="mb-2">
          <span className="bg-[#FF3366]/10 text-[#FF3366] px-2 py-0.5 rounded text-xs font-medium">{category}</span>
        </div>

        {/* Description - Compact */}
        <div className="mb-3">
          <div className={`text-gray-300 text-sm ${expanded ? "" : "line-clamp-2"}`}>{description}</div>
          {description.length > 100 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 text-[#FF3366] mt-1 hover:text-[#FF3366]/80 transition-colors text-xs"
            >
              {expanded ? (
                <>
                  <ChevronUp className="w-3 h-3" /> Show less
                </>
              ) : (
                <>
                  <ChevronDown className="w-3 h-3" /> Show more
                </>
              )}
            </button>
          )}
        </div>

        {/* Voting Progress - Compact */}
        <div className="mb-3">
          <div className="w-full h-2 bg-[#0F1116] rounded-md overflow-hidden flex">
            <div className="h-full bg-green-500" style={{ width: `${forPercentage}%` }}></div>
            <div className="h-full bg-red-500" style={{ width: `${againstPercentage}%` }}></div>
          </div>
          <div className="flex justify-between text-xs mt-1">
            <span className="text-green-400">
              {forPercentage}% ({votesFor})
            </span>
            <span className="text-red-400">
              {againstPercentage}% ({votesAgainst})
            </span>
          </div>
        </div>

        {/* Metadata - Compact */}
        <div className="flex justify-between items-center mb-3 text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            <span>{totalVotes} voters</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{status === "active" ? `Ends ${endDate}` : `Ended ${endDate}`}</span>
          </div>
        </div>

        {/* Voting Actions - Compact */}
        {status === "active" && !hasVoted && (
          <div className="flex gap-2 mb-2">
            <button
              onClick={() => handleVote("for")}
              className="flex-1 bg-[#0F1116] hover:bg-green-500/10 border border-gray-800 hover:border-green-500/30 text-white hover:text-green-400 py-1.5 rounded-md transition-all text-sm"
            >
              Vote For
            </button>
            <button
              onClick={() => handleVote("against")}
              className="flex-1 bg-[#0F1116] hover:bg-red-500/10 border border-gray-800 hover:border-red-500/30 text-white hover:text-red-400 py-1.5 rounded-md transition-all text-sm"
            >
              Vote Against
            </button>
          </div>
        )}

        {/* After Voting State - Compact */}
        {status === "active" && hasVoted && (
          <div className="bg-[#0F1116] border border-gray-800 rounded-md p-2 text-center mb-2 text-sm">
            <div className="text-white">
              You voted{" "}
              <span className={userVote === "for" ? "text-green-400 font-medium" : "text-red-400 font-medium"}>
                {userVote === "for" ? "FOR" : "AGAINST"}
              </span>
            </div>
          </div>
        )}

        {/* Status-specific messages - Compact */}
        {status === "passed" && (
          <div className="bg-[#0F1116] border border-green-500/20 rounded-md p-2 text-center mb-2 text-sm">
            <div className="text-green-400 font-medium flex items-center justify-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>This proposal has passed</span>
            </div>
          </div>
        )}

        {status === "rejected" && (
          <div className="bg-[#0F1116] border border-red-500/20 rounded-md p-2 text-center mb-2 text-sm">
            <div className="text-red-400 font-medium flex items-center justify-center gap-1">
              <XCircle className="w-3 h-3" />
              <span>This proposal was rejected</span>
            </div>
          </div>
        )}

        {status === "expired" && (
          <div className="bg-[#0F1116] border border-gray-700 rounded-md p-2 text-center mb-2 text-sm">
            <div className="text-gray-400 font-medium flex items-center justify-center gap-1">
              <Clock className="w-3 h-3" />
              <span>This proposal has expired</span>
            </div>
          </div>
        )}

        {/* View Details Link - Compact */}
        <button className="w-full text-[#FF3366] hover:text-white bg-transparent hover:bg-[#FF3366] flex items-center justify-center gap-1 py-1.5 rounded-md transition-all border border-[#FF3366]/30 hover:border-[#FF3366] text-sm">
          <span>View details</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  )
}
