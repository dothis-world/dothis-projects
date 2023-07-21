"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zDailyViews = void 0;
const zod_1 = require("zod");
exports.zDailyViews = zod_1.z.object({
    id: zod_1.z.number(),
    channelIndex: zod_1.z.number(),
    videoId: zod_1.z.number(),
    date: zod_1.z.date(),
    views: zod_1.z.number(),
});
//# sourceMappingURL=daily-views.model.js.map