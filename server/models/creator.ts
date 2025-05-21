import mongoose, { type Document, Schema } from "mongoose"

export type ContentType = "video" | "article" | "podcast" | "guide" | "other"
export type SubscriptionModel = "one-time" | "recurring" | "nft" | "multiple"
export type ApplicationStatus = "pending" | "approved" | "rejected"

export interface ICreator extends Document {
  username: string
  walletAddress: string
  contentTypes: ContentType[]
  subscriptionModels: SubscriptionModel[]
  description: string
  portfolioLinks?: string
  status: ApplicationStatus
  createdAt: Date
  updatedAt: Date
}

const CreatorSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      unique: true,
    },
    walletAddress: {
      type: String,
      required: [true, "Wallet address is required"],
      trim: true,
      unique: true,
    },
    contentTypes: {
      type: [String],
      enum: ["video", "article", "podcast", "guide", "other"],
      required: [true, "At least one content type is required"],
      validate: {
        validator: (v: any[]) => v.length > 0,
        message: "At least one content type must be selected",
      },
    },
    subscriptionModels: {
      type: [String],
      enum: ["one-time", "recurring", "nft", "multiple"],
      required: [true, "At least one subscription model is required"],
      validate: {
        validator: (v: any[]) => v.length > 0,
        message: "At least one subscription model must be selected",
      },
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    portfolioLinks: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "approved",
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model<ICreator>("Creator", CreatorSchema)
