"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("./auth");
const profile_1 = require("./profile");
const rootRouter = (0, express_1.Router)();
rootRouter.use("/auth", auth_1.authRoute);
rootRouter.use("/profile", profile_1.profileRoute);
exports.default = rootRouter;
