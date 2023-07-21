"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoApi = exports.videoBaseApiUrl = void 0;
const contract_1 = require("../contract");
exports.videoBaseApiUrl = '/video';
exports.videoApi = contract_1.c.router({
    getVideo: {
        method: 'GET',
        path: `${exports.videoBaseApiUrl}`,
        pathParams: exports.videoBaseApiUrl,
        responses: {
            200: 'video 튜플',
            401: 'Not Found',
            500: '서버에 문제가 있으면 리턴한다.',
        },
        summary: '관련어와 탐색어를 기준으로 비디오를 가져옵니다.',
        description: '관련어와 탐색어를 기준으로 비디오를 가져옵니다.',
    },
});
//# sourceMappingURL=video.api.js.map