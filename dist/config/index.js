"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    port: (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 8070,
    NODE_ENV: process.env.NODE_ENV,
    TOKEN_SECRET: process.env.AUTH_SECRET,
    TOKEN_EXPIRY: process.env.AUTH_EXPIRY,
    GOOGLE_USER: process.env.GOOGLE_USER,
    GOOGLE_SENDER_MAIL: process.env.GOOGLE_SENDER_MAIL,
    GOOGLE_APP_PASSWORD: process.env.GOOGLE_APP_PASSWORD,
};
exports.default = config;
