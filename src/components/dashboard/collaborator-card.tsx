import { Users2, Percent } from "lucide-react"

interface CollaboratorCardProps {
  name: string
  walletAddress: string
  role: string
  revenueShare: number
  pendingAmount: string
  contentCount: number
}

export function CollaboratorCard({
  name,
  walletAddress,
  role,
  revenueShare,
  pendingAmount,
  contentCount,
}: CollaboratorCardProps) {
  return (
    <div className="bg-[#161921] border border-gray-800 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#FF3366]/10 flex items-center justify-center">
            <Users2 className="w-5 h-5 text-[#FF3366]" />
          </div>
          <div>
            <p className="font-medium">{name}</p>
            <p className="text-xs text-gray-400 mt-1">{`${walletAddress.slice(0, 6)}...${walletAddress.slice(-6)}`}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 justify-end">
            <Percent className="w-4 h-4 text-[#FF3366]" />
            <span className="font-medium">{revenueShare}%</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">Role: {role}</p>
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-gray-800 flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-400">Pending</p>
          <p className="font-medium text-[#FF3366]">{pendingAmount} SOL</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Content</p>
          <p className="font-medium text-center">{contentCount}</p>
        </div>
        <button className="bg-[#0F1116] hover:bg-[#0F1116]/80 text-xs px-3 py-1.5 rounded-md border border-gray-700 transition-colors">
          Pay Now
        </button>
      </div>
    </div>
  )
}
