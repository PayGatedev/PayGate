import mongoose from "mongoose";
import {
  ContentBase,
  ContentKind,
  AccessType,
  IContentBase,
  IVideo,
  IPodcastEpisode,
  IGuide,
  IArticle
} from "../../models/content";
import { ICreator } from "../../models/creator"; // Import ICreator

export interface HomePageFeedItem {
  id: string;
  type: ContentKind;
  title: string;
  description: string;
  thumbnailUrl?: string;
  creatorName: string;
  creatorWalletAddress: string;
  views: number;
  likes: number;
  comments: number;
  createdAt: string;
  duration?: string;
  readTime?: string;
  chapters?: string;
  accessType: AccessType;
  price?: number;
  isPublic: boolean;
  isDraft: boolean;
}

export async function getAllContent(): Promise<HomePageFeedItem[]> {
  try {
    const contentsFromDb = await ContentBase.find({})
      .sort({ createdAt: -1 })
      .populate<{ creator: Pick<ICreator, '_id' | 'username' | 'walletAddress'> | null }>('creator', 'username walletAddress')
      .lean()
      .exec();

    const transformedContents: HomePageFeedItem[] = contentsFromDb.map((contentDocUntyped) => {
      const contentDoc = contentDocUntyped as IContentBase;

      let detailsDuration: string | undefined;
      let detailsReadTime: string | undefined;
      let detailsChapters: string | undefined;

      switch (contentDoc.kind) {
        case ContentKind.VIDEO:
          detailsDuration = (contentDoc as IVideo).duration || undefined;
          break;
        case ContentKind.PODCAST:
          detailsDuration = (contentDoc as IPodcastEpisode).duration || undefined;
          break;
        case ContentKind.ARTICLE:
          detailsReadTime = "Approx. 5-10 min read";
          break;
        case ContentKind.GUIDE:
          const sections = (contentDoc as IGuide).sections;
          detailsChapters = sections && sections.length > 0 ? `${sections.length} chapters` : undefined;
          break;
      }
      
      const populatedCreator = contentDoc.creator as (Pick<ICreator, '_id' | 'username' | 'walletAddress'> | null);

      return {
        id: contentDoc._id.toString(),
        type: contentDoc.kind,
        title: contentDoc.title,
        description: contentDoc.description,
        thumbnailUrl: contentDoc.thumbnailUrl || undefined,
        
        creatorName: populatedCreator?.username || "Unknown Creator",
        creatorWalletAddress: populatedCreator?.walletAddress || "N/A",
        
        views: contentDoc.views?.length || 0,
        likes: contentDoc.likes?.length || 0,
        comments: contentDoc.comments?.length || 0,
        createdAt: contentDoc.createdAt.toISOString(),

        duration: detailsDuration,
        readTime: detailsReadTime,
        chapters: detailsChapters,

        accessType: contentDoc.accessType,
        price: contentDoc.price,
        isPublic: contentDoc.isPublic,
        isDraft: contentDoc.isDraft,
      };
    });

    return transformedContents;
  } catch (error) {
    console.error("Error fetching all content in service:", error);
    throw new Error("Failed to fetch content from the database.");
  }
}