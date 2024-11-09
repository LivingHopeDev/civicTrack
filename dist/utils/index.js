"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.Limiter = exports.verifyToken = exports.generateNumericOTP = exports.getIsInvalidMessage = void 0;
exports.hashPassword = hashPassword;
exports.comparePassword = comparePassword;
exports.generateAccessToken = generateAccessToken;
const bcrypt = __importStar(require("bcrypt"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const getIsInvalidMessage = (fieldLabel) => `${fieldLabel} is invalid`;
exports.getIsInvalidMessage = getIsInvalidMessage;
function hashPassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt.hash(password, 10);
    });
}
function comparePassword(password, hashedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt.compare(password, hashedPassword);
    });
}
function generateAccessToken(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield jsonwebtoken_1.default.sign({ userId }, config_1.default.TOKEN_SECRET, {
            expiresIn: config_1.default.TOKEN_EXPIRY,
        });
    });
}
const generateNumericOTP = (length) => {
    let otp = "";
    for (let i = 0; i < length; i++) {
        otp += Math.floor(Math.random() * 9 + 1).toString();
    }
    return otp;
};
exports.generateNumericOTP = generateNumericOTP;
const verifyToken = (token) => {
    try {
        const payload = jsonwebtoken_1.default.verify(token, config_1.default.TOKEN_SECRET);
        return payload;
    }
    catch (error) {
        if (error instanceof Error)
            return {
                error: error.message,
            };
        return {
            error: "An unknown error occurred",
        };
    }
};
exports.verifyToken = verifyToken;
exports.Limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again after 15 minutes",
});
