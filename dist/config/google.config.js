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
exports.verifyGoogleToken = void 0;
const google_auth_library_1 = require("google-auth-library");
const middlewares_1 = require("../middlewares");
const logger_1 = __importDefault(require("../utils/logger"));
const client = new google_auth_library_1.OAuth2Client();
const verifyGoogleToken = (idToken) => __awaiter(void 0, void 0, void 0, function* () {
    const ticket = yield client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    console.log("here i am");
    logger_1.default.info(payload);
    if (!payload) {
        throw new middlewares_1.BadRequest("Unable to verify token");
    }
    return payload;
});
exports.verifyGoogleToken = verifyGoogleToken;
