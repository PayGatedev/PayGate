"use client"

import type React from "react"
import { Lock, Wallet } from "lucide-react"
import { useWalletModal } from "@solana/wallet-adapter-react-ui"

interface ContentPaywallProps {
  content: any
  contentType: string
}

const ContentPaywall: React.FC<ContentPaywallProps> = ({ content, contentType }) => {
  const { setVisible } = useWalletModal()

  const handleConnectWallet = () => {
    setVisible(true)
  }

  return (
    <div className="bg-[#161921] border border-gray-800 rounded-lg p-8 text-center">
      <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#FF3366]/20 to-[#FF3366]/5 rounded-full flex items-center justify-center mb-4 shadow-glow-sm">
        <Lock className="w-8 h-8 text-[#FF3366]" />
      </div>
      <h2 className="text-xl font-bold mb-2">Premium Content</h2>
      <p className="text-gray-400 mb-6 max-w-md mx-auto">
        This {contentType} is available exclusively to premium subscribers. Connect your wallet to access.
      </p>
      <button
        onClick={handleConnectWallet}
        className="bg-gradient-to-r from-[#FF3366] to-[#FF6699] text-white font-medium rounded-md px-6 py-3 flex items-center gap-2 mx-auto hover:from-[#FF6699] hover:to-[#FF3366] transition-all shadow-glow-sm"
      >
        <Wallet className="w-5 h-5" />
        Connect Wallet to Access
      </button>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
        <div className="bg-[#0F1116] border border-gray-800 rounded-lg p-4 text-left">
          <h3 className="font-medium mb-2">Basic</h3>
          <p className="text-sm text-gray-400 mb-2">Access to basic content</p>
          <p className="text-xl font-bold mb-4">
            5 SOL <span className="text-sm font-normal text-gray-400">/month</span>
          </p>
          <ul className="text-sm text-gray-300 space-y-2 mb-4">
            <li className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 text-green-400"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Access to articles</span>
            </li>
            <li className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 text-green-400"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Basic tutorials</span>
            </li>
          </ul>
        </div>

        <div className="bg-[#0F1116] border border-[#FF3366]/30 rounded-lg p-4 text-left relative shadow-glow-sm">
          <div className="absolute -top-3 right-4 bg-gradient-to-r from-[#FF3366] to-[#FF6699] text-white text-xs px-2 py-1 rounded-full">
            POPULAR
          </div>
          <h3 className="font-medium mb-2">Premium</h3>
          <p className="text-sm text-gray-400 mb-2">Full access to all content</p>
          <p className="text-xl font-bold mb-4">
            15 SOL <span className="text-sm font-normal text-gray-400">/month</span>
          </p>
          <ul className="text-sm text-gray-300 space-y-2 mb-4">
            <li className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 text-green-400"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>All Basic features</span>
            </li>
            <li className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 text-green-400"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Premium content</span>
            </li>
            <li className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 text-green-400"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Advanced tutorials</span>
            </li>
          </ul>
        </div>

        <div className="bg-[#0F1116] border border-gray-800 rounded-lg p-4 text-left">
          <h3 className="font-medium mb-2">NFT Access</h3>
          <p className="text-sm text-gray-400 mb-2">Lifetime access with NFT</p>
          <p className="text-xl font-bold mb-4">
            50 SOL <span className="text-sm font-normal text-gray-400">/once</span>
          </p>
          <ul className="text-sm text-gray-300 space-y-2 mb-4">
            <li className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 text-green-400"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>All Premium features</span>
            </li>
            <li className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 text-green-400"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Lifetime access</span>
            </li>
            <li className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 text-green-400"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Exclusive NFT</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ContentPaywall
