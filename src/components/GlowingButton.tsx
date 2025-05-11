"use client"

import type React from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

interface GlowingButtonProps {
  children: React.ReactNode
  onClick?: () => void
  size?: "default" | "large"
}

const GlowingButton: React.FC<GlowingButtonProps> = ({ children, onClick, size = "default" }) => {
  return (
    <motion.button
      className={`
        relative group overflow-hidden
        bg-white text-black font-medium rounded-full
        flex items-center justify-center gap-2
        ${size === "large" ? "px-10 py-4 text-lg" : "px-8 py-3 text-base"}
      `}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="relative z-10">{children}</span>

      <motion.span
        className="relative z-10"
        initial={{ x: -5, opacity: 0 }}
        whileHover={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <ArrowRight className="w-4 h-4" />
      </motion.span>

      {/* Glow effect */}
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-[#FF3366] to-[#FF9933] opacity-0 group-hover:opacity-20 transition-opacity duration-300"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.2 }}
      />

      {/* Shine effect */}
      <motion.span
        className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
    </motion.button>
  )
}

export default GlowingButton
