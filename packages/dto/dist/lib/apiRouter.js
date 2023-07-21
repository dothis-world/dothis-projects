"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const contract_1 = require("./contract");
const user_1 = require("./user");
const auth_1 = require("./auth");
const cache_1 = require("./cache");
const rel_words_1 = require("./rel-words");
const daily_views_api_1 = require("./daily-views/daily-views.api");
const video_1 = require("./video");
exports.apiRouter = contract_1.c.router({
    auth: auth_1.authApi,
    user: user_1.userApi,
    cache: cache_1.cacheApi,
    dailyViews: daily_views_api_1.dailyViewApi,
    relwords: rel_words_1.relWordsApi,
    video: video_1.videoApi,
});
//# sourceMappingURL=apiRouter.js.map