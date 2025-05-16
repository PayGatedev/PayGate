"use client"

import { useState, useEffect } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { Bell, ChevronDown, ExternalLink, LogOut, Search } from "lucide-react"
import { WalletButton } from "../wallet-button"

export function DashboardHeader() {
  const wallet = useWallet()
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const notifications = [
    {
      id: 1,
      title: "New Subscriber",
      message: "You have a new subscriber to your recurring plan",
      time: "10 minutes ago",
      read: false,
    },
    {
      id: 2,
      title: "Content Published",
      message: "Your latest article has been published successfully",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      title: "Payout Completed",
      message: "Your monthly payout of 12.5 SOL has been processed",
      time: "Yesterday",
      read: true,
    },
  ]

  if (!mounted) return null

  return (
    <header className="bg-white/5 backdrop-blur-md border-b border-white/10 py-4 px-6 sticky top-0 z-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className={`relative flex-1 max-w-md transition-all duration-300 ${searchFocused ? "scale-105" : ""}`}>
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
            <input
              type="text"
              placeholder="Search content, subscribers, transactions..."
              className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF3366]/30 focus:bg-white/10 transition-all"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => {
                setNotificationsOpen(!notificationsOpen)
                setProfileOpen(false)
              }}
              className="relative p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <Bell className="w-5 h-5 text-white/80" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#FF3366] rounded-full"></span>
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 glassmorphism-card bg-white/5 border border-white/10 rounded-lg shadow-lg z-10 backdrop-blur-md">
                <div className="p-3 border-b border-white/10">
                  <h3 className="font-medium text-white">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 border-b border-white/10 hover:bg-white/10 transition-colors ${
                        !notification.read ? "bg-white/5" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-2 h-2 rounded-full mt-2 ${!notification.read ? "bg-[#FF3366]" : "bg-white/20"}`}
                        ></div>
                        <div>
                          <h4 className="font-medium text-sm text-white">{notification.title}</h4>
                          <p className="text-xs text-white/60 mt-1">{notification.message}</p>
                          <p className="text-xs text-white/40 mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-2 border-t border-white/10">
                  <button className="w-full text-center text-xs text-[#FF3366] hover:text-[#FF3366]/80 py-1">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Wallet/Profile */}
          <div className="relative">
            {wallet.connected ? (
              <>
                <button
                  onClick={() => {
                    setProfileOpen(!profileOpen)
                    setNotificationsOpen(false)
                  }}
                  className="flex items-center gap-2 py-1.5 px-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#FF3366]/30 to-[#FF3366]/10 flex items-center justify-center text-xs text-white">
                    {wallet.publicKey?.toString().slice(0, 2)}
                  </div>
                  <span className="text-sm hidden sm:inline text-white">
                    {wallet.publicKey?.toString().slice(0, 4)}...{wallet.publicKey?.toString().slice(-4)}
                  </span>
                  <ChevronDown className="w-4 h-4 text-white/60" />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-56 glassmorphism-card bg-white/5 border border-white/10 rounded-lg shadow-lg z-10 backdrop-blur-md">
                    <div className="p-3 border-b border-white/10">
                      <p className="text-xs text-white/60">Connected as</p>
                      <p className="font-medium text-sm truncate text-white">
                        {wallet.publicKey?.toString().slice(0, 8)}...{wallet.publicKey?.toString().slice(-8)}
                      </p>
                    </div>
                    <div className="p-2">
                      <button className="flex items-center w-full gap-2 px-3 py-2 text-sm hover:bg-white/10 rounded-md transition-colors text-white/80">
                        <ExternalLink className="w-4 h-4" />
                        View on Explorer
                      </button>
                      <button className="flex items-center w-full gap-2 px-3 py-2 text-sm text-red-400 hover:bg-white/10 rounded-md transition-colors">
                        <LogOut className="w-4 h-4" />
                        Disconnect
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <WalletButton size="sm" variant="primary" />
            )}
          </div>

          {/* Creator Status */}
          <div className="hidden md:flex items-center gap-2 py-1.5 px-3 rounded-lg border border-white/10 bg-white/5">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-xs text-white/80">
              Creator Status: <span className="text-white">Active</span>
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
