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
exports.OtpService = void 0;
const utils_1 = require("../utils");
const middlewares_1 = require("../middlewares");
const client_1 = __importDefault(require("../prisma/client"));
class OtpService {
    createOtp(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield client_1.default.user.findFirst({
                where: { id: userId },
            });
            if (!user) {
                throw new middlewares_1.ResourceNotFound("User not found");
            }
            const token = (0, utils_1.generateNumericOTP)(6);
            const otp_expires = new Date(Date.now() + 15 * 60 * 1000);
            const otp = yield client_1.default.otp.create({
                data: {
                    token: token,
                    expiry: otp_expires,
                    userId: userId,
                },
            });
            return otp;
        });
    }
    verifyOtp(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const otp = yield client_1.default.otp.findFirst({
                where: { token },
                include: { user: true },
            });
            if (!otp) {
                throw new middlewares_1.ResourceNotFound("Invalid OTP");
            }
            if (otp.expiry < new Date()) {
                // Delete the expired OTP
                yield client_1.default.otp.delete({
                    where: { id: otp.id },
                });
                throw new middlewares_1.Expired("OTP has expired");
            }
            // Mark user as verified and delete the OTP
            yield client_1.default.$transaction([
                client_1.default.user.update({
                    where: { id: otp.userId },
                    data: { is_verified: true },
                }),
                client_1.default.otp.delete({
                    where: { id: otp.id },
                }),
            ]);
            return {
                message: "Email verified successfully.",
            };
        });
    }
}
exports.OtpService = OtpService;
