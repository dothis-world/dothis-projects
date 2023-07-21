import { z } from 'zod';
export declare const userBaseApiUrl = "/user";
export declare const userApi: {
    getUser: {
        method: "GET";
        path: "/user/:id";
        pathParams: string;
        query: z.ZodObject<{
            search: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            search?: string;
        }, {
            search?: string;
        }>;
        responses: {
            200: z.ZodObject<{
                id: z.ZodNullable<z.ZodNumber>;
                userEmail: z.ZodNullable<z.ZodString>;
                channelId: z.ZodNullable<z.ZodNumber>;
                tokenRefresh: z.ZodNullable<z.ZodString>;
                plan: z.ZodString;
                isAdmin: z.ZodNullable<z.ZodDefault<z.ZodBoolean>>;
                status: z.ZodNullable<z.ZodString>;
                dateSignIn: z.ZodNullable<z.ZodDate>;
            }, "strip", z.ZodTypeAny, {
                id?: number;
                userEmail?: string;
                channelId?: number;
                tokenRefresh?: string;
                plan?: string;
                isAdmin?: boolean;
                status?: string;
                dateSignIn?: Date;
            }, {
                id?: number;
                userEmail?: string;
                channelId?: number;
                tokenRefresh?: string;
                plan?: string;
                isAdmin?: boolean;
                status?: string;
                dateSignIn?: Date;
            }>;
            401: string;
            500: string;
        };
        summary: "유저를 가져옵니다.";
        description: "쿼리 id로 유저를 찾아 옵니다.";
    };
    getUserChannelData: {
        method: "POST";
        path: "/user/get-channel-data";
        pathParams: string;
        body: {};
        responses: {
            200: string;
            401: string;
            404: string;
            500: string;
        };
        summary: "유저 채널 데이터 저장하기";
        description: "유저가 채널 데이터를 가져오기 하면 크롤링된 channel 테이블에서 userChannelData 테이블로 이동, 추후 로직이 변경 될수 있음(2023.02.06일 기준)";
    };
    getUserKeyword: {
        method: "GET";
        path: "/user/keyword";
        pathParams: string;
        responses: {
            200: string;
            404: string;
            500: string;
        };
        summary: "유저 채널 키워드 겟하기";
        description: "유저의 채널 키워드를 가져온다";
    };
};
//# sourceMappingURL=user.api.d.ts.map