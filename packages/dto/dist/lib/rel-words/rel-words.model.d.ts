import { z } from 'zod';
export declare const zRelWords: z.ZodObject<{
    keyword: z.ZodString;
    relWords: z.ZodString;
}, "strip", z.ZodTypeAny, {
    keyword?: string;
    relWords?: string;
}, {
    keyword?: string;
    relWords?: string;
}>;
export type RelWordsModel = z.TypeOf<typeof zRelWords>;
//# sourceMappingURL=rel-words.model.d.ts.map