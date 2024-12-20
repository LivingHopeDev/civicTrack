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
exports.updatePolRepProfile = exports.getAllPolRepProfile = exports.getPolRepProfile = exports.createPolRepProfile = exports.updateProfile = exports.deleteProfileImage = exports.uploadProfileImage = void 0;
const asyncHandler_1 = __importDefault(require("../middlewares/asyncHandler"));
const profileService_1 = require("../services/profileService");
const profileService = new profileService_1.ProfileService();
exports.uploadProfileImage = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const pixFile = req.file;
    const message = yield profileService.uploadProfileImage(userId, pixFile);
    res.status(200).json(message);
}));
exports.deleteProfileImage = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const message = yield profileService.deleteProfileImage(userId);
    res.status(200).json(message);
}));
exports.updateProfile = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const message = yield profileService.updateProfile(userId, req.body);
    res.status(200).json(message);
}));
exports.createPolRepProfile = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const message = yield profileService.createPolRepProfile(userId, req.body);
    res.status(201).json(message);
}));
exports.getPolRepProfile = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const message = yield profileService.getPolRepProfile(userId);
    res.status(200).json(message);
}));
exports.getAllPolRepProfile = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const message = yield profileService.getAllPolRepProfile();
    res.status(200).json(message);
}));
exports.updatePolRepProfile = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const message = yield profileService.updatePolRepProfile(userId, req.body);
    res.status(200).json(message);
}));
