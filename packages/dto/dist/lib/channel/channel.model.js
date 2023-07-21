"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zChannelTagsKeywordsData = exports.zChannelData = void 0;
const zod_1 = require("zod");
exports.zChannelData = zod_1.z.object({
    id: zod_1.z.number(),
    userId: zod_1.z.number(),
    channelName: zod_1.z.string(),
    channelUrl: zod_1.z.string(),
    channelSubsciber: zod_1.z.number(),
    channelDescription: zod_1.z.string(),
    channelSince: zod_1.z.date(),
    channelTotalViews: zod_1.z.number(),
    channelTotalVideos: zod_1.z.number(),
    channelNormalVideos: zod_1.z.number(),
    channelCountry: zod_1.z.string(),
    channelLink: zod_1.z.string(),
    channel_keywords: zod_1.z.array(zod_1.z.string()),
    channel_tags: zod_1.z.array(zod_1.z.string()),
});
exports.zChannelTagsKeywordsData = exports.zChannelData.pick({
    channel_keywords: true,
    channel_tags: true,
});
//# sourceMappingURL=channel.model.js.map