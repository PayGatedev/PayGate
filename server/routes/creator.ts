import express from "express"
import Creator from "../models/creator"
import { validateCreatorInput } from "../utils/validation"

const router = express.Router()

// Get all creators (admin only in a real app)
router.get("/", async (req, res) => {
  try {
    const creators = await Creator.find().select("-__v")
    res.status(200).json(creators)
  } catch (error) {
    console.error("Error fetching creators:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get creator by wallet address
router.get("/:walletAddress", async (req, res) => {
  try {
    const creator = await Creator.findOne({ walletAddress: req.params.walletAddress }).select("-__v")

    if (!creator) {
      return res.status(404).json({ message: "Creator not found" })
    }

    res.status(200).json(creator)
  } catch (error) {
    console.error("Error fetching creator:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Create new creator application
router.post("/", async (req, res) => {
  try {
    const { username, walletAddress, contentTypes, subscriptionModels, description, portfolioLinks } = req.body

    // Validate input
    const validationError = validateCreatorInput(req.body)
    if (validationError) {
      return res.status(400).json({ message: validationError })
    }

    // Check if wallet address already exists
    const existingWallet = await Creator.findOne({ walletAddress })
    if (existingWallet) {
      return res.status(400).json({ message: "Wallet address already registered" })
    }

    // Check if username already exists
    const existingUsername = await Creator.findOne({ username })
    if (existingUsername) {
      return res.status(400).json({ message: "Username already taken" })
    }

    // Create new creator
    const newCreator = new Creator({
      username,
      walletAddress,
      contentTypes,
      subscriptionModels,
      description,
      portfolioLinks,
      status: "pending",
    })

    // Save to database
    const savedCreator = await newCreator.save()

    res.status(201).json({
      message: "Creator application submitted successfully",
      creator: savedCreator,
    })
  } catch (error: any) {
    console.error("Error creating creator:", error)

    // Handle mongoose validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err: any) => err.message)
      return res.status(400).json({ message: messages.join(", ") })
    }

    res.status(500).json({ message: "Server error" })
  }
})

// Update creator status (admin only in a real app)
router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body

    if (!["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" })
    }

    const creator = await Creator.findByIdAndUpdate(req.params.id, { status }, { new: true, runValidators: true })

    if (!creator) {
      return res.status(404).json({ message: "Creator not found" })
    }

    res.status(200).json({
      message: `Creator status updated to ${status}`,
      creator,
    })
  } catch (error) {
    console.error("Error updating creator status:", error)
    res.status(500).json({ message: "Server error" })
  }
})

export { router as creatorRouter }
