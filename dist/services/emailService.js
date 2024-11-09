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
exports.EmailService = void 0;
const customEmail_1 = __importDefault(require("../utils/customEmail"));
class EmailService {
    verifyEmailTemplate(first_name, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            const intro = `
    <p>

      We received a request to verify your email address for your account. Please use the following One-Time Password (OTP) to complete the verification process:<br><br>

      <strong>${otp}</strong><br><br>

      This OTP is valid for the next 15 minutes.<br><br>

      If you have any questions or need further assistance, please feel free to contact our support team.<br><br>

      Thank you,<br>
  </p>
  `;
            const { emailBody, emailText } = (0, customEmail_1.default)(intro, first_name);
            return {
                emailBody,
                emailText,
            };
        });
    }
    resetPasswordTemplate(first_name, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            const intro = `
    <p>

      We received a request to reset your password for your account. Please use the following One-Time Password (OTP) to complete the verification process:<br><br>

      <strong>${otp}</strong><br><br>

      This OTP is valid for the next 15 minutes.<br><br>

      If you have any questions or need further assistance, please feel free to contact our support team.<br><br>

      Thank you,<br>
  </p>
  `;
            const { emailBody, emailText } = (0, customEmail_1.default)(intro, first_name);
            return {
                emailBody,
                emailText,
            };
        });
    }
}
exports.EmailService = EmailService;
