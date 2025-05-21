import mongoose, { Schema, Document } from "mongoose";

export type SubscriptionType = "one-time" | "recurring" | "nft";

export interface ISubscription extends Document {
  user: mongoose.Types.ObjectId;
  creator: mongoose.Types.ObjectId;
  type: SubscriptionType;
  nftTokenId?: string;
  transactionHash: string;
  startDate: Date;
  endDate?: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SubscriptionSchema = new Schema<ISubscription>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "Creator",
      required: true,
    },
    type: {
      type: String,
      enum: ["one-time", "recurring", "nft"],
      required: true,
    },
    nftTokenId: {
      type: String,
      trim: true,
    },
    transactionHash: {
      type: String,
      required: true,
      trim: true,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: Date,
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Subscription = mongoose.model<ISubscription>("Subscription", SubscriptionSchema);
