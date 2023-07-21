"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zRelWords = void 0;
const zod_1 = require("zod");
exports.zRelWords = zod_1.z.object({
    keyword: zod_1.z.string(),
    relWords: zod_1.z.string(),
});
//# sourceMappingURL=rel-words.model.js.map