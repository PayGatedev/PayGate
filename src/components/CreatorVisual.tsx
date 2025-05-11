"use client"

import type React from "react"
import { useRef, useEffect } from "react"
import { motion } from "framer-motion"

const CreatorVisual: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

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
    const particles: Particle[] = []
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

// Particle type
interface Particle {
  x: number
  y: number
  size: number
  color: string
  type: "cube" | "sphere" | "triangle"
  rotation: number
  rotationSpeed: number
  opacity: number
}

export default CreatorVisual
