import type React from "react"
interface StatsCardProps {
  title: string
  value: string
  change?: string
  isPositive?: boolean
  icon: React.ReactNode
  className?: string
}

export function StatsCard({ title, value, change, isPositive = true, icon, className = "" }: StatsCardProps) {
  return (
    <div className={`bg-[#161921] border border-gray-800 rounded-lg p-4 ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          {change && (
            <p className={`text-xs mt-1 ${isPositive ? "text-green-500" : "text-red-500"}`}>
              {isPositive ? "+" : "-"}
              {change} from last month
            </p>
          )}
        </div>
        <div className="w-10 h-10 rounded-full bg-[#FF3366]/10 flex items-center justify-center text-[#FF3366]">
          {icon}
        </div>
      </div>
    </div>
  )
}
