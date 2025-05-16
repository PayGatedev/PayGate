import type { ContentType, SubscriptionModel } from "../models/Creator"

interface CreatorInput {
  username: string
  walletAddress: string
  contentTypes: ContentType[]
  subscriptionModels: SubscriptionModel[]
  description: string
  portfolioLinks?: string
}

export const validateCreatorInput = (input: CreatorInput): string | null => {
  // Validate username
  if (!input.username || input.username.trim() === "") {
    return "Username is required"
  }

  // Validate wallet address
  if (!input.walletAddress || input.walletAddress.trim() === "") {
    return "Wallet address is required"
  }

  // Basic Solana wallet address validation (starts with a specific pattern)
  const solanaAddressRegex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/
  if (!solanaAddressRegex.test(input.walletAddress)) {
    return "Invalid Solana wallet address format"
  }

  // Validate content types
  if (!input.contentTypes || !Array.isArray(input.contentTypes) || input.contentTypes.length === 0) {
    return "At least one content type is required"
  }

  const validContentTypes: ContentType[] = ["video", "article", "podcast", "guide", "other"]
  const invalidContentTypes = input.contentTypes.filter((type) => !validContentTypes.includes(type as ContentType))

  if (invalidContentTypes.length > 0) {
    return `Invalid content type(s): ${invalidContentTypes.join(", ")}`
  }

  // Validate subscription models
  if (!input.subscriptionModels || !Array.isArray(input.subscriptionModels) || input.subscriptionModels.length === 0) {
    return "At least one subscription model is required"
  }

  const validSubscriptionModels: SubscriptionModel[] = ["one-time", "recurring", "nft", "multiple"]
  const invalidSubscriptionModels = input.subscriptionModels.filter(
    (model) => !validSubscriptionModels.includes(model as SubscriptionModel),
  )

  if (invalidSubscriptionModels.length > 0) {
    return `Invalid subscription model(s): ${invalidSubscriptionModels.join(", ")}`
  }

  // Validate description
  if (!input.description || input.description.trim() === "") {
    return "Description is required"
  }

  return null
}
