import mongoose from "mongoose";
import {
  ContentBase,
  ContentKind,
  AccessType,
  IContentBase,
  IVideo,
  IArticle,
  IGuide,
  IPodcastEpisode
} from "../../models/content";
import Creator, { ICreator } from "../../models/creator";

export interface DetailedContentItem {
  _id: string;
  kind: ContentKind;
  title: string;
  description: string;
  thumbnailUrl?: string;
  tags: string[];
  isPublic: boolean;
  accessType: AccessType;
  price?: number;
  isDraft: boolean;
  createdAt: string;
  publishAt?: string;
  views: number;
  likes: number;
  commentsCount: number;
  creator: {
    _id: string;
    username: string;
    walletAddress: string;
  };
  videoUrl?: string;
  videoDuration?: string;
  chapters?: { title: string; timestamp: string }[];
  articleContent?: string;
  guideSections?: { title: string; content: string }[];
  audioUrl?: string;
  podcastDuration?: string;
  episodeNumber?: number;
  seasonNumber?: number;
  showNotes?: string;
  podcastTranscript?: string;
  guests?: { name: string; role?: string }[];
  premium?: boolean;
}

export async function getContentById(
  contentId: string
): Promise<DetailedContentItem | null> {
  if (!mongoose.Types.ObjectId.isValid(contentId)) {
    console.error("GetContentById: Invalid content ID format provided.");
    return null;
  }

  try {
    const contentDoc = await ContentBase.findById(contentId)
      .populate<{ creator: Pick<ICreator, '_id' | 'username' | 'walletAddress'> | null }>('creator', 'username walletAddress')
      .lean()
      .exec();

    if (!contentDoc) {
      console.log(`GetContentById: Content not found for ID: ${contentId}`);
      return null;
    }

    const creatorInfo = contentDoc.creator;
    const transformedContent: DetailedContentItem = {
      _id: contentDoc._id.toString(),
      kind: contentDoc.kind,
      title: contentDoc.title,
      description: contentDoc.description,
      thumbnailUrl: contentDoc.thumbnailUrl || undefined,
      tags: contentDoc.tags || [],
      isPublic: contentDoc.isPublic,
      accessType: contentDoc.accessType,
      price: contentDoc.price,
      isDraft: contentDoc.isDraft,
      createdAt: contentDoc.createdAt.toISOString(),
      publishAt: contentDoc.publishAt ? contentDoc.publishAt.toISOString() : undefined,
      views: contentDoc.views?.length || 0,
      likes: contentDoc.likes?.length || 0,
      commentsCount: contentDoc.comments?.length || 0,
      creator: {
        _id: creatorInfo?._id?.toString() || 'N/A',
        username: creatorInfo?.username || "Unknown Creator",
        walletAddress: creatorInfo?.walletAddress || "N/A",
      },
      premium: contentDoc.accessType === AccessType.PAID && (contentDoc.price || 0) > 0,
    };

    switch (contentDoc.kind) {
      case ContentKind.VIDEO:
        const videoDoc = contentDoc as IVideo;
        transformedContent.videoUrl = videoDoc.videoUrl;
        transformedContent.videoDuration = videoDoc.duration;
        transformedContent.chapters = videoDoc.chapters && videoDoc.chapters.length > 0 ? videoDoc.chapters : undefined;
        break;
      case ContentKind.ARTICLE:
        transformedContent.articleContent = (contentDoc as IArticle).content;
        break;
      case ContentKind.GUIDE:
        transformedContent.guideSections = (contentDoc as IGuide).sections;
        break;
      case ContentKind.PODCAST:
        const podcastDoc = contentDoc as IPodcastEpisode;
        transformedContent.audioUrl = podcastDoc.audioUrl;
        transformedContent.podcastDuration = podcastDoc.duration;
        transformedContent.episodeNumber = podcastDoc.episodeNumber;
        transformedContent.seasonNumber = podcastDoc.seasonNumber;
        transformedContent.showNotes = podcastDoc.showNotes;
        transformedContent.podcastTranscript = podcastDoc.transcript;
        transformedContent.guests = podcastDoc.guests && podcastDoc.guests.length > 0 ? podcastDoc.guests : undefined;
        break;
    }

    return transformedContent;

  } catch (error) {
    console.error(`Error fetching content by ID (${contentId}):`, error);
    throw new Error(`Failed to fetch content for ID ${contentId}.`);
  }
}