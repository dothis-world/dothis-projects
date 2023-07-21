import { z } from 'zod';
export declare const zChannelHistoryModel: z.ZodObject<{
    id: z.ZodNullable<z.ZodString>;
    channelId: z.ZodString;
    totalView: z.ZodNumber;
    totalVideos: z.ZodNumber;
    averageViews: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id?: string;
    channelId?: string;
    totalView?: number;
    totalVideos?: number;
    averageViews?: number;
}, {
    id?: string;
    channelId?: string;
    totalView?: number;
    totalVideos?: number;
    averageViews?: number;
}>;
export type ChannelHistoryModel = z.TypeOf<typeof zChannelHistoryModel>;
//# sourceMappingURL=channel-history.model.d.ts.map