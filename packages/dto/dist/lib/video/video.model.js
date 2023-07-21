"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zVideoModel = void 0;
const zod_1 = require("zod");
exports.zVideoModel = zod_1.z.object({
    id: zod_1.z.number().nullable().describe('The id of video'),
    channelIndex: zod_1.z.string().describe('The index of channel'),
    videoTitle: zod_1.z.string().describe('The title of video'),
    videoUrl: zod_1.z.string().describe('The url of video'),
    videoDescription: zod_1.z.string().describe('The Description of video'),
    videoDuration: zod_1.z.string().describe('The Duration of video'),
    videoPublished: zod_1.z.string().describe('The Published of video'),
    videoViews: zod_1.z.string().describe('Daily view count').default('0'),
    videoLikes: zod_1.z.number().describe('like count').default(0),
    videoTags: zod_1.z.string().describe('video tag').default('[]'),
    videoCategory: zod_1.z.string().describe('video category').default('[]'),
    videoInfoCard: zod_1.z.string().describe('video info card').default('0'),
    videoWithAds: zod_1.z
        .string()
        .describe('whether or not there is an advertisement and the number of advertisements'),
    videoEndScreen: zod_1.z
        .string()
        .describe(`I think it's the next video recommendation on YouTube, but I'm not sure what it is`),
    //   videoCoreKeyword: z.string(),
    videoAverageViews: zod_1.z.number().describe('Average number of views'),
    crawlUpdateAt: zod_1.z.date().describe('Crawled time'),
});
//# sourceMappingURL=video.model.js.map