import { z } from 'zod';
export declare const relWordsApiUrl = "/rel-words";
export declare const relWordsApi: {
    getRelWords: {
        method: "GET";
        path: "/rel-words/:keyword";
        responses: {
            200: z.ZodObject<{
                keyword: z.ZodString;
                relWords: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                keyword?: string;
                relWords?: string;
            }, {
                keyword?: string;
                relWords?: string;
            }>;
            401: string;
            500: string;
        };
        summary: "키워드를 가지고 관련어를 가져옵니다.";
        description: "키워드를 가지고 관련어를 가져옵니다.";
    };
};
//# sourceMappingURL=rel-words.api.d.ts.map