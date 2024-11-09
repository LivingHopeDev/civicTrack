"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("./auth");
const rootRouter = (0, express_1.Router)();
rootRouter.use("/auth", auth_1.authRoute);
exports.default = rootRouter;
