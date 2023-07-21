export declare const apiRouter: {
    auth: {
        getGoogleLogin: {
            method: "GET";
            path: "/auth/google-login";
            pathParams: string;
            responses: {
                200: string;
                401: string;
                500: string;
            };
            summary: "구글 로그인";
            description: "구글 로그인 후 /google-redirect로 리다이렉트한다.";
        };
        getGoogleRedirect: {
            method: "GET";
            path: "/auth/google-redirect";
            pathParams: string;
            responses: {
                200: string;
            };
            summary: "유저 로그인 후 토큰 리턴";
            description: "유저 관련 토큰을 accessToken은 해더로 refreshToken은 쿠키로 보내어진다.";
        };
        getVerifyToken: {
            method: "GET";
            path: "/auth/verify-token";
            pathParams: string;
            responses: {
                200: string;
                401: string;
                500: string;
            };
            summary: "토큰 확인(accessToken,refreshToken) 후 갱신된 토큰 리턴";
            description: "갱신된 토큰을 accessToken은 해더로 refreshToken은 쿠키로 보내어진다.";
        };
    };
    user: {
        getUser: {
            method: "GET";
            path: "/user/:id";
            pathParams: string;
            query: import("zod").ZodObject<{
                search: import("zod").ZodString;
            }, "strip", import("zod").ZodTypeAny, {
                search?: string;
            }, {
                search?: string;
            }>;
            responses: {
                200: import("zod").ZodObject<{
                    id: import("zod").ZodNullable<import("zod").ZodNumber>;
                    userEmail: import("zod").ZodNullable<import("zod").ZodString>;
                    channelId: import("zod").ZodNullable<import("zod").ZodNumber>;
                    tokenRefresh: import("zod").ZodNullable<import("zod").ZodString>;
                    plan: import("zod").ZodString;
                    isAdmin: import("zod").ZodNullable<import("zod").ZodDefault<import("zod").ZodBoolean>>;
                    status: import("zod").ZodNullable<import("zod").ZodString>;
                    dateSignIn: import("zod").ZodNullable<import("zod").ZodDate>;
                }, "strip", import("zod").ZodTypeAny, {
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
    cache: {
        set: {
            method: "GET";
            path: "/cache/term-update";
            pathParams: string;
            responses: {
                200: string;
                401: string;
                500: string;
            };
            summary: "탐색어를 redis에 업데이트 하기위해 크롤링서버에서 http 요청을 받습니다.";
            description: "http 요청을 받아 자동으로 redis에 업데이트합니다.";
        };
        get: {
            method: "GET";
            path: "/cache/term";
            query: string;
            responses: {
                200: string;
                401: string;
                500: string;
            };
            summary: "탐색어를 redis에 불러옵니다.";
            description: "탐색어를 redis에 불러옵니다.";
        };
    };
    dailyViews: {
        getDailyViews: {
            method: "GET";
            path: "/daily-views/:relationKeyword";
            pathParams: {
                relationKeyword: import("zod").ZodString;
            };
            query: import("zod").ZodObject<{
                from: import("zod").ZodString;
                to: import("zod").ZodString;
            }, "strip", import("zod").ZodTypeAny, {
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
    relwords: {
        getRelWords: {
            method: "GET";
            path: "/rel-words/:keyword";
            responses: {
                200: import("zod").ZodObject<{
                    keyword: import("zod").ZodString;
                    relWords: import("zod").ZodString;
                }, "strip", import("zod").ZodTypeAny, {
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
    video: {
        getVideo: {
            method: "GET";
            path: "/video";
            pathParams: string;
            responses: {
                200: string;
                401: string;
                500: string;
            };
            summary: "관련어와 탐색어를 기준으로 비디오를 가져옵니다.";
            description: "관련어와 탐색어를 기준으로 비디오를 가져옵니다.";
        };
    };
};
//# sourceMappingURL=apiRouter.d.ts.map