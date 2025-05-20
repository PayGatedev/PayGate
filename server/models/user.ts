import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  walletAddress: string;
  username?: string;
  comments: mongoose.Types.ObjectId[]; // refs Comment
  likedContents: mongoose.Types.ObjectId[]; // refs Content
  subscriptions: mongoose.Types.ObjectId[]; // refs Subscription
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    walletAddress: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    username: {
      type: String,
      trim: true,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    likedContents: [
      {
        type: Schema.Types.ObjectId,
        ref: "Content",
      },
    ],
    subscriptions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Subscription",
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.model<IUser>("User", UserSchema);
