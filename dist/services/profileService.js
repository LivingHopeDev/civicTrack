"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileService = void 0;
const __1 = require("..");
const cloudinary_1 = require("../utils/cloudinary");
const getPublicId_1 = require("../utils/getPublicId");
const fs_1 = __importDefault(require("fs"));
class ProfileService {
    uploadProfileImage(userId, file) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield cloudinary_1.cloudinary.uploader.upload(file.path, {
                folder: "/civicTrack/profile",
                public_id: `user_${userId}`,
            });
            const user = yield __1.prismaClient.user.findUnique({
                where: { id: userId },
            });
            if (!user.google_id && user.image_url) {
                const publicId = (0, getPublicId_1.getPublicIdFromUrl)(user.image_url);
                if (publicId) {
                    yield cloudinary_1.cloudinary.uploader.destroy(publicId);
                }
            }
            yield __1.prismaClient.user.update({
                where: { id: userId },
                data: { image_url: result.secure_url },
            });
            fs_1.default.unlink(file.path, (err) => {
                if (err) {
                    console.error("Error deleting file from server:", err);
                }
            });
            return { message: "Profile image updated" };
        });
    }
}
exports.ProfileService = ProfileService;
