import { Request, Response } from "express";
import { ContentKind, Article, Guide, PodcastEpisode, Video } from "../../models/content";
import Creator from "../../models/creator";

interface ContentBody {
  kind: ContentKind;
  title: string;
  description: string;
  thumbnailUrl?: string;
  tags?: string[];
  collaborators?: string[];
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  isPublic?: boolean;
  allowComments?: boolean;
  allowReactions?: boolean;
  accessType?: "free" | "paid";
  price?: number;
  isScheduled?: boolean;
  publishAt?: string;
  isDraft?: boolean;
  content?: string;
  sections?: { title: string; content: string }[];
  audioUrl?: string;
  duration?: string;
  episodeNumber?: number;
  seasonNumber?: number;
  showNotes?: string;
  transcript?: string;
  guests?: { name: string; role: string }[];
  videoUrl?: string;
  chapters?: { title: string; timestamp: string }[];
}

export async function createContent(req: Request, res: Response) {
  try {
    const body: ContentBody = req.body;
    const walletAddress = req.body.creatorWallet;

    if (!walletAddress) {
      return res.status(400).json({ error: "Creator wallet address is required" });
    }

    const creator = await Creator.findOne({ walletAddress }).exec();
    if (!creator) {
      return res.status(404).json({ error: "Creator not found" });
    }

    // Validate kind
    if (!Object.values(ContentKind).includes(body.kind)) {
      return res.status(400).json({ error: "Invalid content kind" });
    }

    // Validate required base fields
    if (!body.title || !body.description) {
      return res.status(400).json({ error: "Title and description are required" });
    }

    const publishAt = body.publishAt ? new Date(body.publishAt) : undefined;

    let createdContent;

    switch (body.kind) {
      case ContentKind.ARTICLE:
        if (!body.content) {
          return res.status(400).json({ error: "Content field is required for article" });
        }
        createdContent = await Article.create({
          ...body,
          creator: creator._id,
          publishAt,
        });
        break;

      case ContentKind.GUIDE:
        if (!body.sections || !Array.isArray(body.sections) || body.sections.length === 0) {
          return res.status(400).json({ error: "At least one section is required for guide" });
        }
        createdContent = await Guide.create({
          ...body,
          creator: creator._id,
          publishAt,
        });
        break;

      case ContentKind.PODCAST:
        if (!body.audioUrl) {
          return res.status(400).json({ error: "audioUrl is required for podcast" });
        }
        createdContent = await PodcastEpisode.create({
          ...body,
          creator: creator._id,
          publishAt,
        });
        break;

      case ContentKind.VIDEO:
        if (!body.videoUrl) {
          return res.status(400).json({ error: "videoUrl is required for video" });
        }
        createdContent = await Video.create({
          ...body,
          creator: creator._id,
          publishAt,
        });
        break;

      default:
        return res.status(400).json({ error: "Unsupported content kind" });
    }

    return res.status(201).json({ message: "Content created", content: createdContent });
  } catch (error) {
    console.error("Error creating content:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
