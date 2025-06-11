import mongoose from "mongoose";
import {
  ContentBase,
  ContentKind,
  AccessType,
  IContentBase
} from "../../models/content";
import Creator from "../../models/creator";

export interface FetchedCreatorContentItem {
  _id: string;
  title: string;
  kind: ContentKind;
  status: "published" | "draft" | "scheduled";
  accessType: AccessType;
  date: string;
  views: number;
  likes: number;
  comments: number;
  thumbnailUrl?: string;
}

export async function getContentByCreator(
  creatorWalletAddress: string
): Promise<FetchedCreatorContentItem[]> {
  if (!creatorWalletAddress) {
    console.error("getContentByCreator: Creator wallet address is required.");
    return [];
  }

  const creator = await Creator.findOne({ walletAddress: creatorWalletAddress })
    .select('_id')
    .lean()
    .exec();

  if (!creator) {
    console.log(`getContentByCreator: Creator not found for wallet address: ${creatorWalletAddress}`);
    return [];
  }

  const creatorId = creator._id;

  const contentsFromDb: IContentBase[] = await ContentBase.find({ creator: creatorId })
    .sort({ createdAt: -1 })
    .lean()
    .exec();

  const transformedContents: FetchedCreatorContentItem[] = contentsFromDb.map((contentDoc) => {
    let status: "published" | "draft" | "scheduled";

    if (contentDoc.isDraft) {
      status = "draft";
    } else if (contentDoc.isScheduled && contentDoc.publishAt && contentDoc.publishAt > new Date()) {
      status = "scheduled";
    } else {
      status = "published";
    }

    return {
      _id: contentDoc._id.toString(),
      title: contentDoc.title,
      kind: contentDoc.kind,
      status: status,
      accessType: contentDoc.accessType,
      date: contentDoc.createdAt.toISOString(),
      views: contentDoc.views ? contentDoc.views.length : 0,
      likes: contentDoc.likes ? contentDoc.likes.length : 0,
      comments: contentDoc.comments ? contentDoc.comments.length : 0,
      thumbnailUrl: contentDoc.thumbnailUrl || undefined,
    };
  });

  return transformedContents;
}