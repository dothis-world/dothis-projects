"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zChannelHistoryModel = void 0;
const zod_1 = require("zod");
exports.zChannelHistoryModel = zod_1.z.object({
    id: zod_1.z.string().nullable(),
    channelId: zod_1.z.string(),
    totalView: zod_1.z.number(),
    totalVideos: zod_1.z.number(),
    averageViews: zod_1.z.number(),
});
//# sourceMappingURL=channel-history.model.js.map