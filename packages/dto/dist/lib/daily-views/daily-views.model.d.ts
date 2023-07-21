import { z } from 'zod';
export declare const zDailyViews: z.ZodObject<{
    id: z.ZodNumber;
    channelIndex: z.ZodNumber;
    videoId: z.ZodNumber;
    date: z.ZodDate;
    views: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id?: number;
    channelIndex?: number;
    videoId?: number;
    date?: Date;
    views?: number;
}, {
    id?: number;
    channelIndex?: number;
    videoId?: number;
    date?: Date;
    views?: number;
}>;
export type DailyViewModel = z.TypeOf<typeof zDailyViews>;
//# sourceMappingURL=daily-views.model.d.ts.map