"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import {
  ChevronRight,
  Check,
  Menu,
  X,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Star,
  Users,
  Globe,
  TrendingUp,
  Percent,
  Wallet,
  ArrowRight,
} from "lucide-react"

const Home: React.FC = () => {
  const wallet = useWallet()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Refs for scroll animations
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  // Intersection observers for fade-in animations
  const [servicesRef, servicesInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [statsRef, statsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [testimonialsRef, testimonialsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

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

  const handleSubscribe = async () => {
    if (!wallet.connected || !wallet.publicKey) {
      alert("Please connect your wallet")
      return
    }

    setLoading(true)
    try {
      const metadata = {
        name: "PayGate Access Pass",
        description: "This NFT grants access to exclusive content from your creator.",
        image: "https://placehold.co/600x400.png?text=NFT+Subscription",
      }

      const response = await fetch("http://localhost:5000/mint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: metadata.name,
          description: metadata.description,
          imageUrl: metadata.image,
          walletAddress: wallet.publicKey.toBase58(),
        }),
      })

      const result = await response.json()
      if (result.success) {
        setSuccess(true)
        console.log("NFT Minted! TX:", result.tx)
      } else {
        console.error("Minting failed")
      }
    } catch (error) {
      console.error("Error minting subscription NFT:", error)
      alert("Mint failed. Check console for details.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen bg-[#0A0A0B] text-white font-sans overflow-hidden">
      {/* Background gradients */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-0 w-1/3 h-1/2 bg-gradient-to-r from-[#FF3366]/20 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-gradient-to-l from-[#FF9933]/20 to-transparent"></div>
      </div>

      {/* Animated background elements */}
      {/* <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#FF3366]/5 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#FF9933]/5 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          delay: 1,
        }}
      /> */}

      {/* Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 backdrop-blur-sm bg-[#0A0A0B]/80"
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
      <section ref={heroRef} className="relative pt-32 pb-20 min-h-screen flex items-center overflow-hidden">
        {/* Animated Circles */}
        {/* <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#FF3366]/5 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />

        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#FF9933]/5 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 1,
          }}
        /> */}

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div className="md:w-1/2 mb-12 md:mb-0" style={{ y, opacity }}>
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
              className="md:w-1/2 h-[500px] flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <CreatorVisual />
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

      {/* Services Slider */}
      <div className="relative py-4 bg-[#111111] overflow-hidden border-t border-b border-white/10">
        <div className="flex whitespace-nowrap animate-marquee">
          <ServiceItem text="Site Design" />
          <ServiceItem text="Dashboard" />
          <ServiceItem text="NFT ART" />
          <ServiceItem text="Development" />
          <ServiceItem text="Strategy" />
          <ServiceItem text="Mention Design" />
          <ServiceItem text="Site Design" />
          <ServiceItem text="Dashboard" />
          <ServiceItem text="NFT ART" />
          <ServiceItem text="Development" />
          <ServiceItem text="Strategy" />
          <ServiceItem text="Mention Design" />
        </div>
      </div>

      {/* Our Services */}
      <section ref={servicesRef} className="py-20" id="products">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            className="text-5xl md:text-6xl font-bold mb-20 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Our Services
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={servicesInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-4xl md:text-5xl font-bold mb-6">
                UI/UX <br />
                Design
              </h3>
              <p className="text-gray-400 mb-8 text-sm leading-relaxed">
                Hands-on learning via real-life innovation projects. Save Rs.6,210 On This Course. Create immersive
                UI/UX wireframes. Conduct heuristic evaluations of your UX design.
              </p>
              <ul className="space-y-4">
                <ServiceFeature text="User Interface design" />
                <ServiceFeature text="User Experience Design" />
                <ServiceFeature text="Mobile Application design" />
              </ul>
              <motion.button
                className="mt-8 flex items-center gap-2 text-sm font-medium bg-transparent hover:text-[#FF3366] transition-colors"
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                LEARN MORE
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={servicesInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-xl">
                <motion.img
                  src="https://placehold.co/600x400.png?text=UI/UX+Design"
                  alt="UI/UX Design"
                  className="rounded-xl shadow-2xl w-full"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#FF3366]/20 to-[#FF9933]/20 opacity-0 hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ opacity: 1 }}
                />
              </div>

              <div className="absolute -top-4 -right-4 w-16 h-16">
                <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="32" cy="32" r="24" stroke="#FF3366" strokeWidth="2" />
                  <circle cx="32" cy="32" r="16" stroke="#FF9933" strokeWidth="2" />
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#0D0D0F]" id="features">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            className="text-5xl md:text-6xl font-bold mb-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Premium Features
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <GradientCard
              title="NFT Access Passes"
              description="Grant exclusive access to your content with NFT-based subscriptions"
              icon={<Star className="w-6 h-6" />}
              delay={0.1}
            />
            <GradientCard
              title="Creator Dashboard"
              description="Manage your content and subscribers with an intuitive dashboard"
              icon={<Globe className="w-6 h-6" />}
              delay={0.2}
            />
            <GradientCard
              title="Revenue Sharing"
              description="Automatically distribute revenue to collaborators and partners"
              icon={<Percent className="w-6 h-6" />}
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 bg-[#0A0A0B]" id="solutions">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <StatItem value="5M+" label="Customer" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <StatItem value="450M+" label="Coverage" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <StatItem value="22%" label="Earning" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <StatItem value="8.03%" label="Interest" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Happy Customers */}
      <section ref={testimonialsRef} className="py-20" id="customer">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            className="text-5xl md:text-6xl font-bold text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Our happy Customers
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -10 }}
            >
              <TestimonialCard
                avatar="https://placehold.co/100x100.png?text=SM"
                name="Satin Matelea"
                role="Founder of Artify"
                text="I suggest that the top planners spend most of their time engaged in analysis and planning rather than firefighting."
                rating={5}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -10 }}
            >
              <TestimonialCard
                avatar="https://placehold.co/100x100.png?text=DC"
                name="Rustin Cole"
                role="Director of Agora"
                text="Quickly as sources provide data and analysis trends, rather than wait for everything to be perfect reports."
                rating={5}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -10 }}
            >
              <TestimonialCard
                avatar="https://placehold.co/100x100.png?text=JB"
                name="John Brown"
                role="Founder of Loomi"
                text="Notable systems on the market include Canopy, Lookmint, Pearpd, Markets, and Chainlink."
                rating={5}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-[#0D0D0F]" id="pricing">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            className="text-5xl md:text-6xl font-bold text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Pricing Plans
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PricingCard
              title="Starter"
              price="$49"
              description="Perfect for beginners"
              features={["Basic NFT Access Passes", "Creator Dashboard", "Email Support", "1 Project"]}
              cta="Get Started"
              delay={0.1}
              popular={false}
            />
            <PricingCard
              title="Professional"
              price="$99"
              description="For serious creators"
              features={[
                "Advanced NFT Access Passes",
                "Creator Dashboard",
                "Priority Support",
                "5 Projects",
                "Revenue Sharing",
              ]}
              cta="Get Started"
              delay={0.2}
              popular={true}
            />
            <PricingCard
              title="Enterprise"
              price="$249"
              description="For large organizations"
              features={[
                "Custom NFT Access Passes",
                "Advanced Dashboard",
                "24/7 Support",
                "Unlimited Projects",
                "Revenue Sharing",
                "Custom Integration",
              ]}
              cta="Contact Us"
              delay={0.3}
              popular={false}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF3366]/10 to-[#FF9933]/10"></div>

        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#FF3366]/5 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />

        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#FF9933]/5 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 1,
          }}
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Ready to transform your content monetization?
            </motion.h2>
            <motion.p
              className="text-xl text-gray-300 mb-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Join the future of creator economy with our Web3 platform
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <GlowingButton onClick={handleSubscribe} size="large">
                GET STARTED
              </GlowingButton>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A0A0B] border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between mb-12">
            <div className="mb-8 md:mb-0">
              <span className="text-[#FF3366] font-bold text-xl">WE03</span>
              <p className="text-gray-500 mt-4 max-w-xs text-sm">
                WE03 is a host of virtual companies that uses cryptocurrency to enable transactions that are digitally
                recorded on a distributed ledger, such as a blockchain.
              </p>
              <div className="flex space-x-4 mt-6">
                <SocialIcon icon={<Facebook className="w-5 h-5" />} />
                <SocialIcon icon={<Twitter className="w-5 h-5" />} />
                <SocialIcon icon={<Instagram className="w-5 h-5" />} />
                <SocialIcon icon={<Youtube className="w-5 h-5" />} />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-bold text-sm mb-4">Useful Link</h3>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Services
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Terms & Condition
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Privacy
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-sm mb-4">Contact Us</h3>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">📱</span>
                    <span>+1 (234) 567-8901</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">📧</span>
                    <span>info@we03.com</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">📍</span>
                    <span>123 St, Calisto, California 90210</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">All rights Reserved © minter 2022</p>
          </div>
        </div>
      </footer>
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

// Creator Visual Component (Canvas-based animation)
const CreatorVisual = () => {
  const canvasRef = useRef(null)

  // Canvas animation effect
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions with higher resolution for retina displays
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    // Set canvas CSS dimensions
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`

    // Center coordinates
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Create particles
    const particles = []
    const particleCount = 150
    const colors = ["#FF3366", "#FF9933", "#66FF99", "#3366FF", "#FFFF66", "#FF66FF"]

    for (let i = 0; i < particleCount; i++) {
      const size = Math.random() * 15 + 5
      const color = colors[Math.floor(Math.random() * colors.length)]
      const type = Math.random() > 0.7 ? "cube" : Math.random() > 0.5 ? "sphere" : "triangle"

      // Create particles in a head shape
      const angle = Math.random() * Math.PI * 2
      const radius = Math.random() * 100 + 50
      const x = centerX + Math.cos(angle) * radius * (Math.random() * 0.5 + 0.5)
      const y = centerY + Math.sin(angle) * radius * (Math.random() * 0.5 + 0.5)

      particles.push({
        x,
        y,
        size,
        color,
        type,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        opacity: Math.random() * 0.5 + 0.5,
      })
    }

    // Add glasses
    const glasses = {
      x: centerX,
      y: centerY - 20,
      width: 160,
      height: 60,
      color: "#FF9933",
      thickness: 6,
    }

    // Add spiral
    const spiral = {
      x: centerX,
      y: centerY + 150,
      radius: 10,
      color: "#FF6699",
      thickness: 4,
      length: 100,
      rotation: 0,
      rotationSpeed: 0.02,
    }

    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, rect.width, rect.height)

      // Draw head outline (subtle)
      ctx.beginPath()
      ctx.ellipse(centerX, centerY, 120, 150, 0, 0, Math.PI * 2)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
      ctx.lineWidth = 1
      ctx.stroke()

      // Draw particles
      particles.forEach((particle) => {
        ctx.save()
        ctx.globalAlpha = particle.opacity
        ctx.translate(particle.x, particle.y)
        ctx.rotate(particle.rotation)

        if (particle.type === "cube") {
          ctx.fillStyle = particle.color
          ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size)
        } else if (particle.type === "sphere") {
          ctx.beginPath()
          ctx.arc(0, 0, particle.size / 2, 0, Math.PI * 2)
          ctx.fillStyle = particle.color
          ctx.fill()
        } else {
          // Triangle
          ctx.beginPath()
          ctx.moveTo(0, -particle.size / 2)
          ctx.lineTo(particle.size / 2, particle.size / 2)
          ctx.lineTo(-particle.size / 2, particle.size / 2)
          ctx.closePath()
          ctx.fillStyle = particle.color
          ctx.fill()
        }

        ctx.restore()

        // Update rotation
        particle.rotation += particle.rotationSpeed
      })

      // Draw glasses
      // Left lens
      ctx.beginPath()
      ctx.ellipse(glasses.x - glasses.width / 4, glasses.y, glasses.width / 5, glasses.height / 2.5, 0, 0, Math.PI * 2)
      ctx.strokeStyle = glasses.color
      ctx.lineWidth = glasses.thickness
      ctx.stroke()

      // Right lens
      ctx.beginPath()
      ctx.ellipse(glasses.x + glasses.width / 4, glasses.y, glasses.width / 5, glasses.height / 2.5, 0, 0, Math.PI * 2)
      ctx.strokeStyle = glasses.color
      ctx.lineWidth = glasses.thickness
      ctx.stroke()

      // Bridge
      ctx.beginPath()
      ctx.moveTo(glasses.x - glasses.width / 10, glasses.y)
      ctx.lineTo(glasses.x + glasses.width / 10, glasses.y)
      ctx.strokeStyle = glasses.color
      ctx.lineWidth = glasses.thickness
      ctx.stroke()

      // Draw spiral
      spiral.rotation += spiral.rotationSpeed
      ctx.save()
      ctx.translate(spiral.x, spiral.y)
      ctx.rotate(spiral.rotation)

      ctx.beginPath()
      for (let i = 0; i < spiral.length; i++) {
        const angle = i * 0.2
        const radius = spiral.radius + i * 0.5
        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }

      ctx.strokeStyle = spiral.color
      ctx.lineWidth = spiral.thickness
      ctx.stroke()
      ctx.restore()

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      // Cleanup if needed
    }
  }, [])

  return (
    <motion.div
      className="relative w-full h-full flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-[#FF3366]/10 to-transparent opacity-50"
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
      <canvas ref={canvasRef} className="w-full h-full" style={{ maxWidth: "100%", maxHeight: "100%" }} />
    </motion.div>
  )
}

// Service Item Component
const ServiceItem = ({ text }) => (
  <div className="flex items-center px-8">
    <span className="text-[#FF3366] mx-2">+</span>
    <span className="whitespace-nowrap text-sm">{text}</span>
  </div>
)

// Service Feature Component
const ServiceFeature = ({ text }) => (
  <motion.div className="flex items-center gap-2" whileHover={{ x: 5 }}>
    <Check className="w-4 h-4 text-[#FF3366]" />
    <span className="text-sm">{text}</span>
  </motion.div>
)

// Stat Item Component
const StatItem = ({ value, label }) => (
  <div className="text-center">
    <div className="relative">
      <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
        {value}
      </div>
      <div className="absolute -inset-1 bg-[#FF3366]/5 blur-lg rounded-full -z-10"></div>
    </div>
    <div className="text-gray-500 text-sm mt-2">{label}</div>
  </div>
)

// Testimonial Card Component
const TestimonialCard = ({ avatar, name, role, text, rating }) => (
  <div className="bg-[#111111] p-6 rounded-lg border border-white/10 h-full transition-all duration-300 hover:border-[#FF3366]/30 hover:shadow-lg hover:shadow-[#FF3366]/5">
    <div className="flex items-center mb-4">
      <img src={avatar || "/placeholder.svg"} alt={name} className="w-10 h-10 rounded-full mr-3" />
      <div>
        <div className="font-bold text-sm">{name}</div>
        <div className="text-gray-500 text-xs">{role}</div>
      </div>
    </div>
    <div className="flex mb-3">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
      ))}
    </div>
    <p className="text-gray-300 text-sm">{text}</p>
  </div>
)

// Pricing Card Component
const PricingCard = ({ title, price, description, features, cta, delay, popular }) => (
  <motion.div
    className={`
      relative rounded-xl border border-white/10 overflow-hidden
      ${popular ? "bg-gradient-to-b from-[#111111] to-[#1A1A1A]" : "bg-[#111111]"}
    `}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    whileHover={{ y: -10 }}
  >
    {popular && (
      <div className="absolute top-0 right-0 bg-[#FF3366] text-white text-xs font-bold py-1 px-3 rounded-bl-lg">
        POPULAR
      </div>
    )}
    <div className="p-6">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <div className="flex items-end gap-1 mb-2">
        <span className="text-4xl font-bold">{price}</span>
        <span className="text-gray-400 mb-1">/month</span>
      </div>
      <p className="text-gray-400 text-sm mb-6">{description}</p>

      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2 text-sm">
            <Check className="w-4 h-4 text-[#FF3366] mt-0.5 shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button
        className={`
          w-full py-2 rounded-lg font-medium transition-colors
          ${popular ? "bg-[#FF3366] hover:bg-[#FF3366]/90 text-white" : "bg-white/10 hover:bg-white/20 text-white"}
        `}
      >
        {cta}
      </button>
    </div>
  </motion.div>
)

// Social Icon Component
const SocialIcon = ({ icon }) => {
  return (
    <motion.a
      href="#"
      className="text-gray-500 hover:text-white transition-colors"
      whileHover={{ y: -3, color: "#FF3366" }}
      whileTap={{ scale: 0.9 }}
    >
      {icon}
    </motion.a>
  )
}

// Gradient Card Component
const GradientCard = ({ title, description, icon, delay }) => (
  <motion.div
    className="relative p-6 rounded-xl border border-white/10 overflow-hidden bg-[#111111] hover:border-[#FF3366]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#FF3366]/5"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-[#FF3366]/10 to-[#FF9933]/10"></div>
    <div className="relative z-10">
      <div className="flex items-center gap-2 mb-4">
        <div className="text-[#FF3366]">{icon}</div>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  </motion.div>
)

export default Home
