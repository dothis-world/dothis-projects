import { z } from 'zod';
export declare const dailyViewApiUrl = "/daily-views";
export declare const dailyViewApi: {
    getDailyViews: {
        method: "GET";
        path: "/daily-views/:relationKeyword";
        pathParams: {
            relationKeyword: z.ZodString;
        };
        query: z.ZodObject<{
            from: z.ZodString;
            to: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            from?: string;
            to?: string;
        }, {
            from?: string;
            to?: string;
        }>;
        responses: {
            200: string;
            401: string;
            500: string;
        };
        summary: "데일리 뷰를 가져옵니다.";
        description: "params relationKeyword video를 찾아 옵니다.";
    };
};
//# sourceMappingURL=daily-views.api.d.ts.map