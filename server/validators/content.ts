import Joi from "joi";
import { ContentKind, AccessType } from "../models/content";

const walletAddressSchema = Joi.string().required().messages({
    'string.base': `"walletAddress" should be a type of 'text'`,
    'string.empty': `"walletAddress" cannot be an empty field`,
    'any.required': `"walletAddress" is a required field`
});

const shared = {
  title: Joi.string().required(),
  description: Joi.string().required(),
  thumbnailUrl: Joi.string().uri().allow(null, '').optional(),
  tags: Joi.array().items(Joi.string()).optional(),
  collaborators: Joi.array().items(Joi.string()).optional(),
  seoTitle: Joi.string().optional(),
  seoDescription: Joi.string().optional(),
  seoKeywords: Joi.string().optional(),
  isPublic: Joi.boolean().optional(),
  allowComments: Joi.boolean().optional(),
  allowReactions: Joi.boolean().optional(),
  accessType: Joi.string()
    .valid(...Object.values(AccessType))
    .optional(),
  price: Joi.number().min(0).allow(null).optional(),
  isScheduled: Joi.boolean().optional(),
  publishDate: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).allow(null, '').optional(),
  publishTime: Joi.string().pattern(/^\d{2}:\d{2}$/).allow(null, '').optional(),
  isDraft: Joi.boolean().optional(),
};

const article = Joi.object({
  walletAddress: walletAddressSchema,
  kind: Joi.string().valid(ContentKind.ARTICLE).required(),
  content: Joi.string().required(),
  ...shared,
});

const guide = Joi.object({
  walletAddress: walletAddressSchema,
  kind: Joi.string().valid(ContentKind.GUIDE).required(),
  sections: Joi.array()
    .items(
      Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
      }),
    )
    .min(1)
    .required(),
  ...shared,
});

const podcast = Joi.object({
  walletAddress: walletAddressSchema,
  kind: Joi.string().valid(ContentKind.PODCAST).required(),
  audioUrl: Joi.string().uri().required(),
  duration: Joi.string().optional(),
  episodeNumber: Joi.number().optional(),
  seasonNumber: Joi.number().optional(),
  showNotes: Joi.string().optional(),
  transcript: Joi.string().optional(),
  guests: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
        role: Joi.string().optional(),
      }),
    )
    .optional(),
  ...shared,
});

const video = Joi.object({
  walletAddress: walletAddressSchema,
  kind: Joi.string().valid(ContentKind.VIDEO).required(),
  videoUrl: Joi.string().uri().when('isDraft', {
      is: true,
      then: Joi.string().uri().allow(null, '').optional(),
      otherwise: Joi.string().uri().required()
  }),
  duration: Joi.string().optional(),
  transcript: Joi.string().optional(),
  chapters: Joi.array()
    .items(
      Joi.object({
        title: Joi.string().required(),
        timestamp: Joi.string().required(),
      }),
    )
    .optional(),
  ...shared,
});

export const createContentSchema = Joi.alternatives().try(
  article,
  guide,
  podcast,
  video,
);