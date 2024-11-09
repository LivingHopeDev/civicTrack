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
exports.Sendmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../config"));
const middlewares_1 = require("../middlewares");
const logger_1 = __importDefault(require("./logger"));
const Sendmail = (emailcontent) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: config_1.default.GOOGLE_USER,
            pass: config_1.default.GOOGLE_APP_PASSWORD,
        },
        // tls: {
        //     rejectUnauthorized: false,
        // },
    });
    try {
        const transRes = yield transporter.verify();
        logger_1.default.info(transRes);
        yield transporter.sendMail(emailcontent);
        return "Email sent successfully.";
    }
    catch (error) {
        logger_1.default.error(error);
        throw new middlewares_1.BadRequest("Error sending email");
    }
});
exports.Sendmail = Sendmail;
