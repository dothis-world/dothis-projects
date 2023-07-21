"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheApi = exports.cacheBaseApiUrl = void 0;
const contract_1 = require("../contract");
exports.cacheBaseApiUrl = '/cache';
exports.cacheApi = contract_1.c.router({
    set: {
        method: 'GET',
        path: `${exports.cacheBaseApiUrl}/term-update`,
        pathParams: '',
        responses: {
            200: 'OK',
            401: 'Not Found',
            500: 'Internal Server Error',
        },
        summary: '탐색어를 redis에 업데이트 하기위해 크롤링서버에서 http 요청을 받습니다.',
        description: 'http 요청을 받아 자동으로 redis에 업데이트합니다.',
    },
    get: {
        method: 'GET',
        path: `${exports.cacheBaseApiUrl}/term`,
        query: 'key=dic-term',
        responses: {
            200: '',
            401: 'Not Found',
            500: 'Internal Server Error',
        },
        summary: '탐색어를 redis에 불러옵니다.',
        description: '탐색어를 redis에 불러옵니다.',
    },
});
//# sourceMappingURL=cache.api.js.map