"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function cleanTag(tag) {
    if (tag.startsWith("#"))
        tag = tag.slice(1);
    return tag.replace(/O/g, "0");
}
exports.cleanTag = cleanTag;
