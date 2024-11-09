"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordSchema = exports.resendOtpSchema = exports.otpSchema = exports.loginSchema = exports.SignUpSchema = void 0;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
exports.SignUpSchema = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    role: zod_1.z.nativeEnum(client_1.userRole, { message: "Invalid" }),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email address"),
    password: zod_1.z.string().min(6),
});
exports.otpSchema = zod_1.z.object({
    token: zod_1.z.string(),
});
exports.resendOtpSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
});
exports.resetPasswordSchema = zod_1.z.object({
    token: zod_1.z.string(),
    new_password: zod_1.z.string().min(6),
    confirm_password: zod_1.z.string().min(6),
});
