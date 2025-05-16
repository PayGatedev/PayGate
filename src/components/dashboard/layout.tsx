import type { ReactNode } from "react"
import { Sidebar } from "./sidebar"
import { DashboardHeader } from "./header"

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1116] to-[#0A0A0B] text-white">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 relative">
          {/* Background gradient elements */}
          <div className="absolute top-40 left-1/4 w-96 h-96 bg-[#FF3366]/10 rounded-full filter blur-[120px] opacity-30 animate-pulse"></div>
          <div
            className="absolute bottom-40 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-[120px] opacity-30 animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>

          <DashboardHeader />
          <main className="p-4 lg:p-6 relative z-10">{children}</main>
        </div>
      </div>
    </div>
  )
}
