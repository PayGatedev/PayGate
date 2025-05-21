import mongoose, { Document, Schema } from "mongoose";
import { ICreator } from "./creator";

export enum AccessType {
  FREE = "free",
  PAID = "paid",
}

export enum ContentKind {
  ARTICLE = "article",
  GUIDE = "guide",
  PODCAST = "podcast",
  VIDEO = "video",
}

interface IContentBase extends Document {
  creator: ICreator["_id"];
  kind: ContentKind;
  title: string;
  description: string;
  thumbnailUrl?: string;
  tags: string[];
  collaborators: ICreator["_id"][];
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  isPublic: boolean;
  allowComments: boolean;
  allowReactions: boolean;
  accessType: AccessType;
  price?: number;
  isScheduled: boolean;
  publishAt?: Date;
  isDraft: boolean;
  views: mongoose.Types.ObjectId[];
  likes: mongoose.Types.ObjectId[];
  comments: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const ContentBaseSchema = new Schema<IContentBase>(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: "Creator",
      required: true,
      index: true,
    },
    kind: {
      type: String,
      enum: Object.values(ContentKind),
      required: true,
    },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    thumbnailUrl: { type: String, trim: true },
    tags: { type: [String], default: [] },
    collaborators: [{ type: Schema.Types.ObjectId, ref: "Creator" }],
    seoTitle: { type: String, trim: true },
    seoDescription: { type: String, trim: true },
    seoKeywords: { type: String, trim: true },
    isPublic: { type: Boolean, default: true },
    allowComments: { type: Boolean, default: true },
    allowReactions: { type: Boolean, default: true },
    accessType: {
      type: String,
      enum: Object.values(AccessType),
      default: AccessType.FREE,
    },
    price: { type: Number, min: 0 },
    isScheduled: { type: Boolean, default: false },
    publishAt: { type: Date },
    isDraft: { type: Boolean, default: false },

    views: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
    likes: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment", default: [] }],
  },
  { timestamps: true, discriminatorKey: "kind" },
);

export interface IArticle extends IContentBase {
  kind: ContentKind.ARTICLE;
  content: string;
}

const ArticleSchema = new Schema<IArticle>({
  content: { type: String, required: true },
});

export interface IGuide extends IContentBase {
  kind: ContentKind.GUIDE;
  sections: { title: string; content: string }[];
}

const GuideSchema = new Schema<IGuide>({
  sections: {
    type: [
      {
        title: { type: String, required: true },
        content: { type: String, required: true },
      },
    ],
    validate: {
      validator: (v: any[]) => v.length > 0,
      message: "At least one section is required",
    },
  },
});

export interface IPodcastEpisode extends IContentBase {
  kind: ContentKind.PODCAST;
  audioUrl: string;
  duration?: string;
  episodeNumber?: number;
  seasonNumber?: number;
  showNotes?: string;
  transcript?: string;
  guests: { name: string; role: string }[];
}

const PodcastSchema = new Schema<IPodcastEpisode>({
  audioUrl: { type: String, required: true, trim: true },
  duration: String,
  episodeNumber: Number,
  seasonNumber: Number,
  showNotes: String,
  transcript: String,
  guests: [
    {
      name: { type: String, required: true },
      role: { type: String, trim: true },
    },
  ],
});

export interface IVideo extends IContentBase {
  kind: ContentKind.VIDEO;
  videoUrl: string;
  duration?: string;
  transcript?: string;
  chapters: { title: string; timestamp: string }[];
}

const VideoSchema = new Schema<IVideo>({
  videoUrl: { type: String, required: true, trim: true },
  duration: String,
  transcript: String,
  chapters: [
    {
      title: { type: String, required: true },
      timestamp: { type: String, required: true },
    },
  ],
});

export const ContentBase = mongoose.model<IContentBase>(
  "Content",
  ContentBaseSchema,
);

export const Article = ContentBase.discriminator<IArticle>(
  ContentKind.ARTICLE,
  ArticleSchema,
);

export const Guide = ContentBase.discriminator<IGuide>(
  ContentKind.GUIDE,
  GuideSchema,
);

export const PodcastEpisode = ContentBase.discriminator<IPodcastEpisode>(
  ContentKind.PODCAST,
  PodcastSchema,
);

export const Video = ContentBase.discriminator<IVideo>(
  ContentKind.VIDEO,
  VideoSchema,
);
