import { z } from 'zod';
export declare const zChannelData: z.ZodObject<{
    id: z.ZodNumber;
    userId: z.ZodNumber;
    channelName: z.ZodString;
    channelUrl: z.ZodString;
    channelSubsciber: z.ZodNumber;
    channelDescription: z.ZodString;
    channelSince: z.ZodDate;
    channelTotalViews: z.ZodNumber;
    channelTotalVideos: z.ZodNumber;
    channelNormalVideos: z.ZodNumber;
    channelCountry: z.ZodString;
    channelLink: z.ZodString;
    channel_keywords: z.ZodArray<z.ZodString, "many">;
    channel_tags: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    id?: number;
    userId?: number;
    channelName?: string;
    channelUrl?: string;
    channelSubsciber?: number;
    channelDescription?: string;
    channelSince?: Date;
    channelTotalViews?: number;
    channelTotalVideos?: number;
    channelNormalVideos?: number;
    channelCountry?: string;
    channelLink?: string;
    channel_keywords?: string[];
    channel_tags?: string[];
}, {
    id?: number;
    userId?: number;
    channelName?: string;
    channelUrl?: string;
    channelSubsciber?: number;
    channelDescription?: string;
    channelSince?: Date;
    channelTotalViews?: number;
    channelTotalVideos?: number;
    channelNormalVideos?: number;
    channelCountry?: string;
    channelLink?: string;
    channel_keywords?: string[];
    channel_tags?: string[];
}>;
export type ChannelModel = z.TypeOf<typeof zChannelData>;
export declare const zChannelTagsKeywordsData: z.ZodObject<Pick<{
    id: z.ZodNumber;
    userId: z.ZodNumber;
    channelName: z.ZodString;
    channelUrl: z.ZodString;
    channelSubsciber: z.ZodNumber;
    channelDescription: z.ZodString;
    channelSince: z.ZodDate;
    channelTotalViews: z.ZodNumber;
    channelTotalVideos: z.ZodNumber;
    channelNormalVideos: z.ZodNumber;
    channelCountry: z.ZodString;
    channelLink: z.ZodString;
    channel_keywords: z.ZodArray<z.ZodString, "many">;
    channel_tags: z.ZodArray<z.ZodString, "many">;
}, "channel_keywords" | "channel_tags">, "strip", z.ZodTypeAny, {
    channel_keywords?: string[];
    channel_tags?: string[];
}, {
    channel_keywords?: string[];
    channel_tags?: string[];
}>;
//# sourceMappingURL=channel.model.d.ts.map