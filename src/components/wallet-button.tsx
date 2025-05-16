"use client"

import { useState, useEffect, useRef } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { useWalletModal } from "@solana/wallet-adapter-react-ui"
import { Wallet, ChevronDown, Copy, LogOut, ExternalLink } from "lucide-react"

// Helper function to truncate address
const truncateAddress = (address: string) => {
  if (!address) return ""
  return `${address.slice(0, 4)}...${address.slice(-4)}`
}

export function WalletButton() {
  const { publicKey, wallet, disconnect, connected } = useWallet()
  const { setVisible } = useWalletModal()
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [balance, setBalance] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Simulate fetching balance when connected
  useEffect(() => {
    if (connected && publicKey) {
      setIsLoading(true)
      // This is a mock - in a real app, you would fetch the actual balance
      setTimeout(() => {
        setBalance(Math.random() * 100)
        setIsLoading(false)
      }, 1000)
    } else {
      setBalance(null)
    }
  }, [connected, publicKey])

  const handleCopyAddress = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey.toString())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const openExplorer = () => {
    if (publicKey) {
      window.open(`https://explorer.solana.com/address/${publicKey.toString()}`, "_blank")
    }
  }

  if (!connected) {
    return (
      <button
        onClick={() => setVisible(true)}
        className="bg-[#FF3366] hover:bg-[#FF3366]/90 text-white flex items-center gap-2 py-2 px-4 rounded-md transition-colors duration-200 ease-in-out"
      >
        <Wallet className="h-4 w-4" />
        <span>Connect Wallet</span>
      </button>
    )
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="border border-gray-700 bg-[#161921] hover:bg-[#1F222C] text-white flex items-center gap-2 py-2 px-4 rounded-md transition-colors duration-200 ease-in-out"
      >
        <div className="flex items-center gap-2">
          {wallet?.adapter.icon && (
            <img src={wallet.adapter.icon || "/placeholder.svg"} alt={wallet.adapter.name} className="h-4 w-4" />
          )}
          <span className="font-medium">{truncateAddress(publicKey?.toString() || "")}</span>
        </div>
        <ChevronDown className="h-4 w-4 text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-[#161921] border border-gray-700 z-50 ">
          <div className="py-2">
            <div className="flex flex-col space-y-1 px-4 py-2">
              <p className="text-xs text-gray-400">Connected as</p>
              <p className="font-medium text-sm text-white">{wallet?.adapter.name}</p>
              {isLoading ? (
                <div className="h-5 w-20 bg-gray-700 animate-pulse rounded mt-1"></div>
              ) : balance !== null ? (
                <p className="text-[#FF3366] font-medium text-sm">{balance.toFixed(2)} SOL</p>
              ) : null}
            </div>

            <div className="border-t border-gray-700 my-2"></div>

            <button
              onClick={handleCopyAddress}
              className="flex items-center w-full px-4 py-2 text-sm text-white hover:bg-gray-700 transition-colors"
            >
              <Copy className="mr-2 h-4 w-4" />
              <span>{copied ? "Copied!" : "Copy address"}</span>
            </button>

            <button
              onClick={openExplorer}
              className="flex items-center w-full px-4 py-2 text-sm text-white hover:bg-gray-700 transition-colors"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              <span>View on Explorer</span>
            </button>

            <div className="border-t border-gray-700 my-2"></div>

            <button
              onClick={() => {
                disconnect()
                setIsOpen(false)
              }}
              className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-gray-700 transition-colors"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Disconnect</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
