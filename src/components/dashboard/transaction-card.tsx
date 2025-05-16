import { ExternalLink } from "lucide-react"

interface TransactionCardProps {
  type: "incoming" | "outgoing"
  amount: string
  timestamp: string
  from?: string
  to?: string
  contentTitle?: string
  txHash: string
}

export function TransactionCard({ type, amount, timestamp, from, to, contentTitle, txHash }: TransactionCardProps) {
  // Generate a deterministic color based on the wallet address
  const generateColor = (hash: string) => {
    const colors = ["#FF3366", "#3B82F6", "#10B981", "#F59E0B", "#8B5CF6"]
    const index = Math.abs(hash.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)) % colors.length
    return colors[index]
  }

  // Create SVG placeholder for wallet address
  const WalletAvatar = ({ address }: { address: string }) => {
    const bgColor = generateColor(address)
    const initials = `${address.charAt(0)}${address.charAt(address.length - 1)}`.toUpperCase()

    return (
      <div
        className="w-6 h-6 rounded-full flex items-center justify-center text-xs"
        style={{ backgroundColor: `${bgColor}20` }}
      >
        <span style={{ color: bgColor }}>{initials}</span>
      </div>
    )
  }

  return (
    <div className="bg-[#161921] border border-gray-800 rounded-lg p-4 transition-all duration-300 hover:border-gray-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center">
            <svg width="40" height="40" viewBox="0 0 40 40">
              <circle cx="20" cy="20" r="20" fill={type === "incoming" ? "#10B981" : "#EF4444"} opacity="0.1" />
              <path
                d={
                  type === "incoming"
                    ? "M26 20L20 26M20 26L14 20M20 26V14" // Arrow down
                    : "M26 20L20 14M20 14L14 20M20 14V26" // Arrow up
                }
                stroke={type === "incoming" ? "#10B981" : "#EF4444"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform={type === "incoming" ? "rotate(180 20 20)" : ""}
              />
            </svg>
          </div>
          <div>
            <p className="font-medium">
              {type === "incoming" ? "Payment Received" : "Payment Sent"}
              {contentTitle && ` - ${contentTitle}`}
            </p>
            <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
              {from && (
                <div className="flex items-center gap-1">
                  <span>From:</span>
                  <div className="flex items-center gap-1 bg-[#0F1116] px-2 py-0.5 rounded-full">
                    <WalletAvatar address={from} />
                    <span>{`${from.slice(0, 4)}...${from.slice(-4)}`}</span>
                  </div>
                </div>
              )}
              {to && (
                <div className="flex items-center gap-1">
                  <span>To:</span>
                  <div className="flex items-center gap-1 bg-[#0F1116] px-2 py-0.5 rounded-full">
                    <WalletAvatar address={to} />
                    <span>{`${to.slice(0, 4)}...${to.slice(-4)}`}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className={`font-medium ${type === "incoming" ? "text-green-500" : "text-red-500"}`}>
            {type === "incoming" ? "+" : "-"}
            {amount} SOL
          </p>
          <p className="text-xs text-gray-400 mt-1">{timestamp}</p>
          <div className="flex items-center justify-end gap-1 text-xs text-gray-500 mt-1">
            <span className="truncate max-w-[80px]">{`${txHash.slice(0, 6)}...${txHash.slice(-4)}`}</span>
            <ExternalLink className="w-3 h-3" />
          </div>
        </div>
      </div>
    </div>
  )
}
