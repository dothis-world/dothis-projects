"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.relWordsApi = exports.relWordsApiUrl = void 0;
const contract_1 = require("../contract");
const rel_words_model_1 = require("./rel-words.model");
exports.relWordsApiUrl = '/rel-words';
exports.relWordsApi = contract_1.c.router({
    getRelWords: {
        method: 'GET',
        path: `${exports.relWordsApiUrl}/:keyword`,
        responses: {
            200: rel_words_model_1.zRelWords,
            401: 'Not Found',
            500: '서버에 문제가 있으면 리턴한다.',
        },
        summary: '키워드를 가지고 관련어를 가져옵니다.',
        description: '키워드를 가지고 관련어를 가져옵니다.',
    },
});
//# sourceMappingURL=rel-words.api.js.map