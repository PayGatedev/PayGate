"use client"

import type React from "react"
import { useState } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, Menu, X, Wallet, ArrowRight, Users, TrendingUp } from "lucide-react"

const Home: React.FC = () => {
  const wallet = useWallet()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleConnect = async () => {
    try {
      if (wallet.connected) {
        await wallet.disconnect()
      } else {
        await wallet.connect()
      }
    } catch (error) {
      console.error("Wallet connection error:", error)
    }
  }

  const handleSubscribe = () => {
    if (!wallet.connected || !wallet.publicKey) {
      alert("Please connect your wallet")
      return
    }
    // Subscription logic would go here
    console.log("Subscription initiated")
  }

  return (
    <div className="relative min-h-screen bg-[#0A0A0B] text-white font-sans overflow-hidden">
      {/* Enhanced Background */}
      <div className="fixed inset-0 z-0 bg-[#0A0A0B]">
        {/* Main gradient orbs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          {/* Primary gradient - top left */}
          <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-[#FF3366]/30 to-transparent blur-[100px] opacity-60"></div>

          {/* Secondary gradient - bottom right */}
          <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-tl from-[#FF9933]/30 to-transparent blur-[100px] opacity-60"></div>

          {/* Accent gradient - center right */}
          <div className="absolute top-[30%] -right-[5%] w-[30%] h-[30%] rounded-full bg-gradient-to-l from-[#9933FF]/20 to-transparent blur-[80px] opacity-40"></div>

          {/* Subtle grid overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptMi0yaDF2MWgtMXYtMXptLTIgMmgtMXYxaDF2LTF6bS0yLTJoMXYxaC0xdi0xem0yLTJoMXYxaC0xdi0xem0tMiAydi0xaC0xdjFoMXptLTIgMmgtMXYxaDF2LTF6bS0yLTJoMXYxaC0xdi0xem0yLTJoMXYxaC0xdi0xem0tMiAydi0xaC0xdjFoMXptLTIgMmgtMXYxaDF2LTF6bS0yLTJoMXYxaC0xdi0xem0yLTJoMXYxaC0xdi0xem0tMiAydi0xaC0xdjFoMXptLTIgMmgtMXYxaDF2LTF6bS0yLTJoMXYxaC0xdi0xem0yLTJoMXYxaC0xdi0xem0tMiAydi0xaC0xdjFoMXptLTIgMmgtMXYxaDF2LTF6bS0yLTJoMXYxaC0xdi0xeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
        </div>

        {/* Animated floating elements */}
        <motion.div
          className="absolute top-[15%] left-[20%] w-4 h-4 rounded-full bg-[#FF3366]/40 blur-sm"
          animate={{
            y: [0, -15, 0],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />

        <motion.div
          className="absolute top-[35%] right-[15%] w-6 h-6 rounded-full bg-[#FF9933]/40 blur-sm"
          animate={{
            y: [0, 20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 1,
          }}
        />

        <motion.div
          className="absolute bottom-[25%] left-[30%] w-5 h-5 rounded-full bg-[#9933FF]/40 blur-sm"
          animate={{
            y: [0, -10, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 2,
          }}
        />

        {/* Subtle noise texture overlay */}
        <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1IiBkPSJNMCAwaDMwMHYzMDBIMHoiLz48L3N2Zz4=')]"></div>
      </div>

      {/* Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 backdrop-blur-md bg-[#0A0A0B]/60"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-[#FF3366] font-bold text-xl">PayGate</span>
          </div>

          <div className="hidden md:flex space-x-8">
            <NavLink href="#products">PRODUCTS</NavLink>
            <NavLink href="#solutions">SOLUTIONS</NavLink>
            <NavLink href="#customer">CUSTOMER</NavLink>
            <NavLink href="#pricing">PRICING</NavLink>
            <NavLink href="#resources">RESOURCES</NavLink>
          </div>

          <div className="flex items-center gap-4">
            {/* Connect Wallet Button */}
            <motion.button
              onClick={handleConnect}
              className="bg-transparent border border-white/20 rounded-full px-4 py-1 text-xs tracking-wider flex items-center gap-2 hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.05, borderColor: "rgba(255, 51, 102, 0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              {wallet.connected ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  {`${wallet.publicKey?.toString().slice(0, 4)}...${wallet.publicKey?.toString().slice(-4)}`}
                </>
              ) : (
                <>
                  <Wallet className="w-3 h-3" />
                  <span>CONNECT WALLET</span>
                </>
              )}
            </motion.button>

            <motion.button
              className="bg-transparent border border-white/20 rounded-full px-4 py-1 text-xs tracking-wider flex items-center gap-2 hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              REGISTER NOW
              <ChevronRight className="w-4 h-4" />
            </motion.button>

            {/* Mobile menu button */}
            <button
              className="md:hidden flex flex-col justify-center items-center"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/95 flex flex-col items-center justify-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col space-y-8 items-center">
              <MobileNavLink href="#products" onClick={() => setMenuOpen(false)}>
                PRODUCTS
              </MobileNavLink>
              <MobileNavLink href="#solutions" onClick={() => setMenuOpen(false)}>
                SOLUTIONS
              </MobileNavLink>
              <MobileNavLink href="#customer" onClick={() => setMenuOpen(false)}>
                CUSTOMER
              </MobileNavLink>
              <MobileNavLink href="#pricing" onClick={() => setMenuOpen(false)}>
                PRICING
              </MobileNavLink>
              <MobileNavLink href="#resources" onClick={() => setMenuOpen(false)}>
                RESOURCES
              </MobileNavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div
              className="md:w-1/2 mb-12 md:mb-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1
                className="text-6xl md:text-8xl font-bold leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="text-white">Web3</span> <span className="text-gray-500">Content</span>
                <div className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF3366] to-[#FF9933]">
                  Platform.
                </div>
              </motion.h1>

              <motion.div
                className="flex flex-wrap gap-6 my-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <StatsCard value="240+" label="PARTNERS" icon={<Users className="w-4 h-4" />} />
                <StatsCard value="92%" label="FASTER TECHNOLOGY" icon={<TrendingUp className="w-4 h-4" />} />
              </motion.div>

              <motion.div
                className="text-gray-300 mb-8 max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <p>Better data leads to more performance models.</p>
                <p>Performant models lead to faster deployment.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <GlowingButton onClick={handleSubscribe}>GET STARTED</GlowingButton>
              </motion.div>
            </motion.div>

            <motion.div
              className="md:w-1/2 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <div className="relative w-full max-w-md aspect-square">
                {/* Image glow effects */}
                <div className="absolute -inset-4 bg-gradient-radial from-[#FF3366]/20 via-[#FF9933]/10 to-transparent rounded-full blur-xl"></div>

                {/* Decorative elements */}
                <motion.div
                  className="absolute -top-8 -right-8 w-16 h-16 border border-[#FF3366]/30 rounded-full"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                />

                <motion.div
                  className="absolute -bottom-6 -left-6 w-24 h-24 border border-[#FF9933]/30 rounded-full"
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    delay: 1,
                  }}
                />

                {/* Main image with overlay */}
                <div className="relative z-10 w-full h-full rounded-2xl overflow-hidden border border-white/10 backdrop-blur-sm bg-black/20">
                  <img
                    src="https://placehold.co/600x600.png?text=Web3+Content"
                    alt="Web3 Content Platform"
                    className="w-full h-full object-cover mix-blend-luminosity opacity-90"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FF3366]/30 to-[#FF9933]/30 mix-blend-overlay"></div>

                  {/* Scanlines effect */}
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iMSIgaGVpZ2h0PSIyIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBwYXR0ZXJuVHJhbnNmb3JtPSJyb3RhdGUoOTApIj48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjMDAwIiBvcGFjaXR5PSIwLjAzIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIi8+PC9zdmc+')] opacity-20"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <span className="text-xs text-gray-400 mb-2">SCROLL</span>
          <motion.div
            className="w-0.5 h-8 bg-gradient-to-b from-white to-transparent"
            animate={{
              scaleY: [1, 1.5, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        </motion.div>
      </section>
    </div>
  )
}

// Navigation Link Component
const NavLink = ({ href, children }) => (
  <motion.a
    href={href}
    className="text-gray-300 hover:text-white transition-colors text-xs tracking-wider"
    whileHover={{ y: -2 }}
    whileTap={{ y: 0 }}
  >
    {children}
  </motion.a>
)

// Mobile Navigation Link Component
const MobileNavLink = ({ href, children, onClick }) => (
  <motion.a
    href={href}
    className="text-2xl font-bold"
    onClick={onClick}
    whileHover={{ scale: 1.1, x: 5 }}
    whileTap={{ scale: 0.95 }}
  >
    {children}
  </motion.a>
)

// Stats Card Component
const StatsCard = ({ value, label, icon }) => (
  <motion.div
    className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-white/10 w-32"
    whileHover={{
      y: -5,
      borderColor: "rgba(255, 51, 102, 0.3)",
    }}
  >
    <div className="flex items-center gap-2 mb-1">
      <div className="text-[#FF3366]">{icon}</div>
      <div className="text-3xl font-bold">{value}</div>
    </div>
    <div className="text-xs text-gray-400 uppercase tracking-wider">{label}</div>
  </motion.div>
)

// Glowing Button Component
const GlowingButton = ({ children, onClick }) => (
  <motion.button
    className="relative group overflow-hidden bg-white text-black font-medium rounded-full px-8 py-3 text-base flex items-center justify-center gap-2"
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

export default Home
