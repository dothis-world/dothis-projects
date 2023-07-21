"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dailyViewApi = exports.dailyViewApiUrl = void 0;
const zod_1 = require("zod");
const contract_1 = require("../contract");
exports.dailyViewApiUrl = '/daily-views';
exports.dailyViewApi = contract_1.c.router({
    getDailyViews: {
        method: 'GET',
        path: `${exports.dailyViewApiUrl}/:relationKeyword`,
        pathParams: { relationKeyword: zod_1.z.string() },
        query: zod_1.z.object({ from: zod_1.z.string(), to: zod_1.z.string() }),
        responses: {
            200: 'OK',
            401: 'Not Found',
            500: '서버에 문제가 있으면 리턴한다.',
        },
        summary: '데일리 뷰를 가져옵니다.',
        description: 'params relationKeyword video를 찾아 옵니다.',
    },
});
//# sourceMappingURL=daily-views.api.js.map