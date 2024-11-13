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
exports.roleMiddleware = exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const logger_1 = __importDefault(require("../utils/logger"));
const error_1 = require("./error");
const __1 = require("..");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({
                status_code: "401",
                message: "Invalid token",
            });
            return;
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            res.status(401).json({
                status_code: "401",
                message: "Invalid token",
            });
            return;
        }
        jsonwebtoken_1.default.verify(token, config_1.default.TOKEN_SECRET, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                res.status(401).json({
                    status_code: "401",
                    message: "Invalid token",
                });
                return;
            }
            const user = yield __1.prismaClient.user.findFirst({
                where: { id: decoded["userId"] },
            });
            if (!user) {
                res.status(401).json({
                    status_code: "401",
                    message: "Invalid token",
                });
                return;
            }
            req.user = user;
            next();
        }));
    }
    catch (error) {
        logger_1.default.error(error);
        throw new error_1.ServerError("INTERNAL_SERVER_ERROR");
    }
});
exports.authMiddleware = authMiddleware;
const roleMiddleware = (allowedRoles) => {
    return (req, res, next) => {
        const user = req.user;
        if (!user) {
            return res.status(401).json({
                status_code: "401",
                message: "Authentication required",
            });
        }
        if (!allowedRoles.includes(user.role)) {
            return res.status(403).json({
                status_code: "403",
                message: "Unauthorized",
            });
        }
        next();
    };
};
exports.roleMiddleware = roleMiddleware;
