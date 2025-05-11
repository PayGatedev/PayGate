"use client"

import type React from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { motion } from "framer-motion"
import { Wallet } from "lucide-react"

const ConnectWallet: React.FC = () => {
  const { connected, publicKey, connect, disconnect } = useWallet()

  const handleConnect = async () => {
    try {
      await connect()
    } catch (error) {
      console.error("Connection error:", error)
    }
  }

  return (
    <motion.button
      onClick={connected ? disconnect : handleConnect}
      className="bg-transparent border border-white/20 rounded-full px-4 py-1 text-xs tracking-wider flex items-center gap-2 hover:bg-white/10 transition-colors"
      whileHover={{ scale: 1.05, borderColor: "rgba(255, 51, 102, 0.4)" }}
      whileTap={{ scale: 0.95 }}
    >
      {connected ? (
        <>
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          {`${publicKey?.toString().slice(0, 4)}...${publicKey?.toString().slice(-4)}`}
        </>
      ) : (
        <>
          <Wallet className="w-3 h-3" />
          <span>CONNECT WALLET</span>
        </>
      )}
    </motion.button>
  )
}

export default ConnectWallet
