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
exports.AuthService = void 0;
const __1 = require("..");
const error_1 = require("../middlewares/error");
const utils_1 = require("../utils");
const error_2 = require("../middlewares/error");
const _1 = require(".");
const sendMail_1 = require("../utils/sendMail");
const config_1 = __importDefault(require("../config"));
class AuthService {
    constructor() {
        this.otpService = new _1.OtpService();
        this.emailService = new _1.EmailService();
        this.resetPassword = (token, new_password, confirm_password) => __awaiter(this, void 0, void 0, function* () {
            if (new_password !== confirm_password) {
                throw new error_2.BadRequest("Password doesn't match");
            }
            const otp = yield __1.prismaClient.otp.findFirst({
                where: { token },
                include: { user: true },
            });
            if (!otp) {
                throw new error_2.ResourceNotFound("Invalid OTP");
            }
            if (otp.expiry < new Date()) {
                // Delete the expired OTP
                yield __1.prismaClient.otp.delete({
                    where: { id: otp.id },
                });
                throw new error_1.Expired("OTP has expired");
            }
            const hashedPassword = yield (0, utils_1.hashPassword)(new_password);
            yield __1.prismaClient.$transaction([
                __1.prismaClient.user.update({
                    where: { id: otp.userId },
                    data: { password: hashedPassword },
                }),
                __1.prismaClient.otp.delete({
                    where: { id: otp.id },
                }),
            ]);
            return {
                message: "Password reset successfully.",
            };
        });
    }
    signUp(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, name, role } = payload;
            const hashedPassword = yield (0, utils_1.hashPassword)(password);
            let user = yield __1.prismaClient.user.findFirst({ where: { email } });
            if (user) {
                throw new error_2.Conflict("User already exists");
            }
            const newUser = yield __1.prismaClient.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                    role,
                },
            });
            const access_token = yield (0, utils_1.generateAccessToken)(newUser.id);
            const otp = yield this.otpService.createOtp(newUser.id);
            const first_name = name.split(" ")[0];
            const { emailBody, emailText } = yield this.emailService.verifyEmailTemplate(first_name, otp.token);
            yield (0, sendMail_1.Sendmail)({
                from: `${config_1.default.GOOGLE_SENDER_MAIL}`,
                to: email,
                subject: "EMAIL VERIFICATION",
                text: emailText,
                html: emailBody,
            });
            const userResponse = {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
            };
            return {
                user: userResponse,
                access_token,
                message: "User Created Successfully. Kindly check your mail for your verification token",
            };
        });
    }
    login(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = payload;
            const user = yield __1.prismaClient.user.findFirst({ where: { email } });
            if (!user) {
                throw new error_2.ResourceNotFound("User not found");
            }
            if (!user.is_verified) {
                throw new error_2.Unauthorised("Email verification required. Please verify your email to proceed.");
            }
            if (user.google_id) {
                throw new error_2.Unauthorised("Please log in using Google auth to access your account.");
            }
            const isPasswordValid = yield (0, utils_1.comparePassword)(password, user.password);
            if (!isPasswordValid) {
                throw new error_2.BadRequest("Authentication failed");
            }
            const access_token = yield (0, utils_1.generateAccessToken)(user.id);
            const userResponse = {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            };
            return {
                user: userResponse,
                access_token,
                message: "Login successful",
            };
        });
    }
    resendOTP(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield __1.prismaClient.user.findFirst({
                where: { email: email },
            });
            if (!user) {
                throw new error_2.ResourceNotFound("User not found");
            }
            if (user.is_verified) {
                return { message: "Email already verified" };
            }
            const token = (0, utils_1.generateNumericOTP)(6);
            const otp_expires = new Date(Date.now() + 15 * 60 * 1000);
            const otp = yield __1.prismaClient.otp.create({
                data: {
                    token: token,
                    expiry: otp_expires,
                    userId: user.id,
                },
            });
            const first_name = user.name.split(" ")[0];
            const { emailBody, emailText } = yield this.emailService.verifyEmailTemplate(first_name, otp.token);
            yield (0, sendMail_1.Sendmail)({
                from: `${config_1.default.GOOGLE_SENDER_MAIL}`,
                to: email,
                subject: "Email VERIFICATION",
                text: emailText,
                html: emailBody,
            });
            return {
                message: "OTP sent successfully",
            };
        });
    }
    forgotPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield __1.prismaClient.user.findFirst({
                where: { email: email },
            });
            if (!user) {
                throw new error_2.ResourceNotFound("User not found");
            }
            const token = (0, utils_1.generateNumericOTP)(6);
            const otp_expires = new Date(Date.now() + 15 * 60 * 1000);
            const otp = yield __1.prismaClient.otp.create({
                data: {
                    token: token,
                    expiry: otp_expires,
                    userId: user.id,
                },
            });
            const first_name = user.name.split(" ")[0];
            const { emailBody, emailText } = yield this.emailService.resetPasswordTemplate(first_name, otp.token);
            yield (0, sendMail_1.Sendmail)({
                from: `${config_1.default.GOOGLE_SENDER_MAIL}`,
                to: email,
                subject: "PASSWORD RESET",
                text: emailText,
                html: emailBody,
            });
            return {
                message: "OTP sent successfully",
            };
        });
    }
}
exports.AuthService = AuthService;
