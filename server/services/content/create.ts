import mongoose from "mongoose";
import {
  ContentKind,
  Article,
  Guide,
  PodcastEpisode,
  Video,
  IArticle,
  IGuide,
  IPodcastEpisode,
  IVideo,
  AccessType,
  IContentBase
} from "../../models/content";
import Creator from "../../models/creator";

interface CreateContentPayload {
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
  guests?: { name: string; role?: string }[];
  videoUrl?: string;
  chapters?: { title: string; timestamp: string }[];
}

export async function createContent(
  creatorWalletAddress: string,
  data: CreateContentPayload
): Promise<IArticle | IGuide | IPodcastEpisode | IVideo> {

  if (!creatorWalletAddress) {
    const err = new Error("Creator wallet address is required for the service.");
    (err as any).statusCode = 400;
    throw err;
  }

  const creator = await Creator.findOne({ walletAddress: creatorWalletAddress }).exec();
  if (!creator) {
    const err = new Error("Creator not found");
    (err as any).statusCode = 404;
    throw err;
  }

  if (!Object.values(ContentKind).includes(data.kind)) {
    const err = new Error("Invalid content kind provided to service.");
    (err as any).statusCode = 400;
    throw err;
  }
  if (!data.title || !data.description) {
    const err = new Error("Title and description are required.");
    (err as any).statusCode = 400;
    throw err;
  }

  const finalPublishAt = data.publishAt ? new Date(data.publishAt) : undefined;
  
  let processedCollaboratorObjectIds: mongoose.Types.ObjectId[] = [];
  if (data.collaborators && Array.isArray(data.collaborators) && data.collaborators.length > 0) {
    const foundCollaborators = await Creator.find({ 
        walletAddress: { $in: data.collaborators } 
    }).select('_id').lean().exec();
    processedCollaboratorObjectIds = foundCollaborators.map(c => c._id);
    
    if (processedCollaboratorObjectIds.length !== data.collaborators.length) {
        console.warn(
            `Warning: Some collaborator wallet addresses were not found or did not resolve to valid creators. Provided: ${data.collaborators.length}, Found: ${processedCollaboratorObjectIds.length}`
        );
    }
  }
  
  const commonDataForCreate: Partial<IContentBase & { [key: string]: any }> = {
    creator: creator._id,
    kind: data.kind,
    title: data.title,
    description: data.description,
    thumbnailUrl: data.thumbnailUrl,
    tags: data.tags || [],
    collaborators: processedCollaboratorObjectIds,
    seoTitle: data.seoTitle,
    seoDescription: data.seoDescription,
    seoKeywords: data.seoKeywords,
    isPublic: data.isPublic !== undefined ? data.isPublic : true,
    allowComments: data.allowComments !== undefined ? data.allowComments : true,
    allowReactions: data.allowReactions !== undefined ? data.allowReactions : true,
    accessType: (data.accessType || AccessType.FREE) as AccessType, // Fixed line
    price: data.price,
    isScheduled: data.isScheduled !== undefined ? data.isScheduled : false,
    publishAt: finalPublishAt,
    isDraft: data.isDraft !== undefined ? data.isDraft : false,
  };
  
  let createdDbContent: IArticle | IGuide | IPodcastEpisode | IVideo;

  switch (data.kind) {
    case ContentKind.ARTICLE:
      if (!data.content) {
        const err = new Error("Content field is required for article.");
        (err as any).statusCode = 400;
        throw err;
      }
      createdDbContent = await Article.create({
        ...commonDataForCreate,
        content: data.content,
      });
      break;
    case ContentKind.GUIDE:
      if (!data.sections || !Array.isArray(data.sections) || data.sections.length === 0) {
        const err = new Error("At least one section is required for guide.");
        (err as any).statusCode = 400;
        throw err;
      }
      createdDbContent = await Guide.create({
        ...commonDataForCreate,
        sections: data.sections,
      });
      break;
    case ContentKind.PODCAST:
      if (!data.audioUrl) {
        const err = new Error("audioUrl is required for podcast.");
        (err as any).statusCode = 400;
        throw err;
      }
      createdDbContent = await PodcastEpisode.create({
        ...commonDataForCreate,
        audioUrl: data.audioUrl,
        duration: data.duration,
        episodeNumber: data.episodeNumber,
        seasonNumber: data.seasonNumber,
        showNotes: data.showNotes,
        transcript: data.transcript,
        guests: data.guests || [],
      });
      break;
    case ContentKind.VIDEO:
      if (!data.isDraft && !data.videoUrl) {
        const err = new Error("videoUrl is required for a non-draft video.");
        (err as any).statusCode = 400;
        throw err;
      }
      createdDbContent = await Video.create({
        ...commonDataForCreate,
        videoUrl: data.videoUrl,
        duration: data.duration,
        transcript: data.transcript,
        chapters: data.chapters || [],
      });
      break;
    default:
      const err = new Error("Unsupported content kind in service.");
      (err as any).statusCode = 400;
      throw err;
  }

  return createdDbContent;
}