"use client"

import type React from "react"
import { motion } from "framer-motion"

interface GradientCardProps {
  title: string
  description: string
  icon: React.ReactNode
  delay?: number
}

const GradientCard: React.FC<GradientCardProps> = ({ title, description, icon, delay = 0 }) => {
  return (
    <motion.div
      className="relative rounded-xl border border-white/10 bg-[#111111] p-6 h-full overflow-hidden group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -10 }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF3366]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Icon with gradient background */}
      <div className="relative z-10 mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-[#FF3366]/20 to-[#FF9933]/20">
        <div className="text-[#FF3366]">{icon}</div>
      </div>

      <h3 className="relative z-10 text-xl font-bold mb-2">{title}</h3>
      <p className="relative z-10 text-gray-400 text-sm">{description}</p>

      {/* Animated border gradient */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#FF3366] to-[#FF9933] w-0 group-hover:w-full transition-all duration-300"
        initial={{ width: 0 }}
        whileHover={{ width: "100%" }}
      />
    </motion.div>
  )
}

export default GradientCard
