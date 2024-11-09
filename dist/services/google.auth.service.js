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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleUserInfo = void 0;
const __1 = require("..");
const GoogleUserInfo = (userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const { sub: google_id, email, name, email_verified } = userInfo;
    let user;
    user = yield __1.prismaClient.user.findUnique({
        where: { email },
    });
    if (!user) {
        user = yield __1.prismaClient.user.create({
            data: {
                name,
                email,
                is_verified: email_verified,
                google_id,
                // image_url: userInfo.picture
            },
        });
        return {
            user,
            message: "User Created Successfully",
        };
    }
    // If user exists, return user information
    return {
        user,
        message: "User already exists",
    };
});
exports.GoogleUserInfo = GoogleUserInfo;
