import { Clock, Wallet } from "lucide-react"

interface SubscriberCardProps {
  walletAddress: string
  subscriptionType: "recurring" | "one-time" | "nft"
  tier?: string
  startDate: string
  renewalStatus?: "active" | "expiring" | "expired"
  nftId?: string
  lastActive?: string
  totalSpent?: string
}

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

export function SubscriberCard({
  walletAddress,
  subscriptionType,
  tier,
  startDate,
  renewalStatus,
  nftId,
  lastActive,
  totalSpent,
}: SubscriberCardProps) {
  const subscriptionColors = {
    recurring: "bg-[#FF3366]/20 text-[#FF3366]",
    "one-time": "bg-yellow-500/20 text-yellow-500",
    nft: "bg-purple-500/20 text-purple-500",
  }

  const renewalColors = {
    active: "bg-green-500/20 text-green-500",
    expiring: "bg-yellow-500/20 text-yellow-500",
    expired: "bg-red-500/20 text-red-500",
  }

  return (
    <div className="bg-gradient-to-r from-[#161921] to-[#0F1116] border border-gray-800 rounded-lg p-4 transition-all hover:border-[#FF3366]/20 hover:shadow-glow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <SubscriberAvatar address={walletAddress} />
          <div>
            <p className="font-medium text-sm">{`${walletAddress.slice(0, 6)}...${walletAddress.slice(-6)}`}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-xs px-2 py-0.5 rounded-md ${subscriptionColors[subscriptionType]}`}>
                {subscriptionType === "recurring" ? "Recurring" : subscriptionType === "one-time" ? "One-time" : "NFT"}
                {tier && ` - ${tier}`}
              </span>
              {renewalStatus && (
                <span className={`text-xs px-2 py-0.5 rounded-md ${renewalColors[renewalStatus]}`}>
                  {renewalStatus}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Clock className="w-3 h-3" />
            <span>Since {startDate}</span>
          </div>
          {nftId && <p className="text-xs text-purple-400 mt-1">NFT #{nftId}</p>}
          {totalSpent && (
            <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
              <Wallet className="w-3 h-3" />
              <span>{totalSpent}</span>
            </div>
          )}
        </div>
      </div>

      {lastActive && (
        <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-800">
          <div className="text-xs text-gray-400">Last active: {lastActive}</div>
          <div className="flex gap-2">
            <button className="text-xs px-2 py-1 rounded bg-[#161921] hover:bg-[#0F1116] border border-gray-800">
              View Profile
            </button>
            <button className="text-xs px-2 py-1 rounded bg-[#FF3366]/10 text-[#FF3366] hover:bg-[#FF3366]/20 border border-[#FF3366]/30">
              Message
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
