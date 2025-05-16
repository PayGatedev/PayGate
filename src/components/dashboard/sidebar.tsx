"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  LayoutDashboard,
  FileText,
  Users,
  Coins,
  Users2,
  Vote,
  Settings,
  Wallet,
  ChevronRight,
  Menu,
  X,
  Home,
  Bell,
  HelpCircle,
  LogOut,
} from "lucide-react"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className = "" }: SidebarProps) {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      name: "My Content",
      href: "/dashboard/content",
      icon: <FileText className="w-5 h-5" />,
    },
    {
      name: "Subscribers",
      href: "/dashboard/subscribers",
      icon: <Users className="w-5 h-5" />,
    },
    {
      name: "Earnings",
      href: "/dashboard/earnings",
      icon: <Coins className="w-5 h-5" />,
    },
    {
      name: "Collaborators",
      href: "/dashboard/collaborators",
      icon: <Users2 className="w-5 h-5" />,
    },
    {
      name: "DAO Proposals",
      href: "/dashboard/proposals",
      icon: <Vote className="w-5 h-5" />,
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: <Settings className="w-5 h-5" />,
    },
  ]

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-md bg-white/5 border border-white/10 shadow-glow-sm"
          style={{ backdropFilter: "blur(12px)" }}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile sidebar */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
            style={{ backdropFilter: "blur(4px)" }}
          ></div>
          <div
            className="fixed inset-y-0 left-0 w-64 bg-[#0F1116]/90 border-r border-white/10 overflow-y-auto"
            style={{ backdropFilter: "blur(12px)" }}
          >
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF3366] to-[#FF3366]/80 flex items-center justify-center text-white mr-3">
                  <Home className="w-4 h-4" />
                </div>
                <span className="text-[#FF3366] font-bold text-xl">PayGate</span>
              </div>
            </div>
            <nav className="mt-4 px-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-3 px-3 py-2 my-1 rounded-lg transition-colors ${
                    location.pathname === item.href
                      ? "bg-gradient-to-r from-[#FF3366]/20 to-[#FF3366]/5 text-[#FF3366] border border-[#FF3366]/20 shadow-glow-sm"
                      : "text-white/80 hover:bg-white/5"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className={`${location.pathname === item.href ? "text-[#FF3366]" : "text-white/60"}`}>
                    {item.icon}
                  </div>
                  <span>{item.name}</span>
                  {location.pathname === item.href && <ChevronRight className="w-4 h-4 ml-auto" />}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside
        className={`hidden lg:flex flex-col w-64 bg-[#0F1116]/80 border-r border-white/10 h-screen sticky top-0 ${className}`}
        style={{ backdropFilter: "blur(12px)" }}
      >
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center h-8">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF3366] to-[#FF3366]/80 flex items-center justify-center text-white mr-3">
              <Home className="w-4 h-4" />
            </div>
            <span className="text-[#FF3366] font-bold text-xl">PayGate</span>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto p-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center gap-3 px-3 py-2 my-1 rounded-lg transition-colors ${
                location.pathname === item.href
                  ? "bg-gradient-to-r from-[#FF3366]/20 to-[#FF3366]/5 text-[#FF3366] border border-[#FF3366]/20 shadow-glow-sm"
                  : "text-white/80 hover:bg-white/10"
              }`}
            >
              <div className={`${location.pathname === item.href ? "text-[#FF3366]" : "text-white/60"}`}>
                {item.icon}
              </div>
              <span>{item.name}</span>
              {location.pathname === item.href && <ChevronRight className="w-4 h-4 ml-auto" />}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF3366]/20 to-[#FF3366]/5 flex items-center justify-center">
                <Bell className="w-4 h-4 text-[#FF3366]" />
              </div>
              <span className="text-sm text-white/80">Notifications</span>
            </div>
            <div className="w-5 h-5 rounded-full bg-[#FF3366] flex items-center justify-center text-xs text-white font-medium">
              3
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors cursor-pointer p-2 rounded-lg hover:bg-white/5">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span>Creator Status: Active</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors cursor-pointer p-2 rounded-lg hover:bg-white/5">
            <HelpCircle className="w-4 h-4 text-white/60" />
            <span>Help & Support</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors cursor-pointer p-2 mt-2 rounded-lg hover:bg-white/5">
            <LogOut className="w-4 h-4 text-white/60" />
            <span>Logout</span>
          </div>
        </div>
      </aside>
    </>
  )
}
