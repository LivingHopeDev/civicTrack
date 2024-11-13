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
    createCitizenProfile(userId, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, state, local_gov, xUrl, linkedinUrl, instagramUrl, facebookUrl, } = payload;
            yield __1.prismaClient.user.update({
                where: { id: userId },
                data: {
                    name,
                    email,
                    state,
                    local_gov,
                },
            });
            yield __1.prismaClient.socialMedia.create({
                data: {
                    userId,
                    facebookUrl,
                    xUrl,
                    linkedinUrl,
                    instagramUrl,
                },
            });
            return {
                message: "Profile created",
            };
        });
    }
    createPolRepProfile(userId, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { facebookUrl, linkedinUrl, xUrl, instagramUrl, profession, education, politicalParty, previousRole, } = payload;
            // Create PoliticalProfile for the user
            const politicalProfile = yield __1.prismaClient.politicalProfile.create({
                data: {
                    userId,
                },
            });
            // Handle social media links
            const socialMediaData = [];
            if (facebookUrl) {
                socialMediaData.push({
                    politicalProfileId: politicalProfile.id,
                    facebookUrl,
                });
            }
            if (linkedinUrl) {
                socialMediaData.push({
                    politicalProfileId: politicalProfile.id,
                    linkedinUrl,
                });
            }
            if (xUrl) {
                socialMediaData.push({ politicalProfileId: politicalProfile.id, xUrl });
            }
            if (instagramUrl) {
                socialMediaData.push({
                    politicalProfileId: politicalProfile.id,
                    instagramUrl,
                });
            }
            // Create SocialMedia records (only if there are data)
            if (socialMediaData.length > 0) {
                yield __1.prismaClient.socialMedia.createMany({
                    data: socialMediaData,
                });
            }
            // Create Profession records
            if (profession && profession.length > 0) {
                const professionRecords = profession.map((item) => ({
                    politicalProfileId: politicalProfile.id,
                    position: item.position,
                    term: item.term,
                    startDate: item.startDate,
                    endDate: item.endDate,
                }));
                yield __1.prismaClient.profession.createMany({
                    data: professionRecords,
                });
            }
            // Create Education records
            if (education && education.length > 0) {
                const educationRecords = education.map((item) => ({
                    politicalProfileId: politicalProfile.id,
                    institution: item.institution,
                    city: item.city,
                    startDate: new Date(item.startDate),
                    endDate: new Date(item.endDate),
                }));
                yield __1.prismaClient.education.createMany({
                    data: educationRecords,
                });
            }
            // Create PoliticalParty records
            if (politicalParty && politicalParty.length > 0) {
                const politicalPartyRecords = politicalParty.map((party) => ({
                    politicalProfileId: politicalProfile.id,
                    partyName: party.partyName,
                    yearJoined: party.yearJoined,
                }));
                yield __1.prismaClient.politicalParty.createMany({
                    data: politicalPartyRecords,
                });
            }
            // Create PreviousRole records
            if (previousRole && previousRole.length > 0) {
                const previousRoleRecords = previousRole.map((role) => ({
                    politicalProfileId: politicalProfile.id,
                    position: role.position,
                    startDate: new Date(role.startDate),
                    endDate: new Date(role.endDate),
                }));
                yield __1.prismaClient.previousRole.createMany({
                    data: previousRoleRecords,
                });
            }
            return {
                message: "Profile created",
            };
        });
    }
}
exports.ProfileService = ProfileService;
