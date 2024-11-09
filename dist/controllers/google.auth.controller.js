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
exports.googleAuthCall = void 0;
const google_config_1 = require("../config/google.config");
const asyncHandler_1 = __importDefault(require("../middlewares/asyncHandler"));
const google_auth_service_1 = require("../services/google.auth.service");
const utils_1 = require("../utils");
exports.googleAuthCall = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_token } = req.body;
    const payload = yield (0, google_config_1.verifyGoogleToken)(id_token);
    const userInfo = {
        sub: payload.sub,
        email: payload.email,
        name: payload.name,
        email_verified: payload.email_verified,
        // image_url: payload,
    };
    const { user, message } = yield (0, google_auth_service_1.GoogleUserInfo)(userInfo);
    const access_token = yield (0, utils_1.generateAccessToken)(user.id);
    res
        .status(201)
        .json({ status_code: 201, message, data: { access_token, user } });
}));
