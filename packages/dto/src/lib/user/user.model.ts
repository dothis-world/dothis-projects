import { z } from 'zod';

export const zUserModel = z.object({
  data: z.object({
    id: z.number().nullable().describe('The id of user'),
    userEmail: z.string().email().max(30).nullable().describe('user email'),
    channelId: z.number().nullable().describe('User Channel-id'),
    tokenRefresh: z.string().max(110).nullable().describe('refresh token'),
    plan: z.string().max(10).describe('price plan'),
    isAdmin: z
      .boolean()
      .default(false)
      .nullable()
      .describe('Whether or not you are an administrator'),
    status: z.string().nullable().describe('membership status'),
    dateSignIn: z
      .date()
      .nullable()
      .describe('The date which the user was created'),
    agreePromotion: z
      .boolean()
      .default(false)
      .nullable()
      .describe('user agreePromotion'),
    personalizationTag: z
      .string()
      .nullable()
      .describe('tags saved for the user to analyze-channel'),
    searchWord: z.string().nullable().describe('search_word'),
  }),
});

export type TUserModel = z.TypeOf<typeof zUserModel>;

export const zKeywordModel = z.object({
  data: z.object({
    channelKeywords: z.array(z.string()).nullable(),
    channelTags: z.array(z.string()).nullable(),
  }),
});
