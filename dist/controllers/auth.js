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
exports.resetPassword = exports.forgetPassword = exports.resendOtp = exports.verifyOtp = exports.login = exports.signup = void 0;
const services_1 = require("../services");
const asyncHandler_1 = __importDefault(require("../middlewares/asyncHandler"));
const authService = new services_1.AuthService();
const otpService = new services_1.OtpService();
exports.signup = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, access_token, message } = yield authService.signUp(req.body);
    const data = {
        user,
        access_token,
    };
    res.status(201).json({ status_code: 201, message, data });
}));
exports.login = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { message, access_token, user } = yield authService.login(req.body);
    const data = {
        user,
        access_token,
    };
    res.status(201).json({ status_code: 200, message, data });
}));
exports.verifyOtp = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.body;
    const { message } = yield otpService.verifyOtp(token);
    res.status(200).json({
        status_code: 200,
        message,
    });
}));
exports.resendOtp = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const { message } = yield authService.resendOTP(email);
    return res.status(200).json({ status_code: 200, message });
}));
exports.forgetPassword = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const { message } = yield authService.forgotPassword(email);
    return res.status(200).json({ status_code: 200, message });
}));
exports.resetPassword = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, new_password, confirm_password } = req.body;
    const { message } = yield authService.resetPassword(token, new_password, confirm_password);
    return res.status(200).json({ status_code: 200, message });
}));
