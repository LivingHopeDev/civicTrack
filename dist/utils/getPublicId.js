"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPublicIdFromUrl = void 0;
const getPublicIdFromUrl = (url) => {
    const parts = url.split('/');
    const lastPart = parts[parts.length - 1];
    const publicIdWithExtension = lastPart.split('.')[0];
    return publicIdWithExtension ? publicIdWithExtension : null;
};
exports.getPublicIdFromUrl = getPublicIdFromUrl;
