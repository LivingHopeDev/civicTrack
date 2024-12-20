"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileRoute = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const multer_1 = require("../utils/multer");
const client_1 = require("@prisma/client");
const profileRoute = (0, express_1.Router)();
exports.profileRoute = profileRoute;
profileRoute.post("/", middlewares_1.authMiddleware, (0, middlewares_1.roleMiddleware)([client_1.userRole.polRep]), controllers_1.createPolRepProfile);
profileRoute.get("/", middlewares_1.authMiddleware, (0, middlewares_1.roleMiddleware)([client_1.userRole.polRep]), controllers_1.getPolRepProfile);
profileRoute.put("/", middlewares_1.authMiddleware, controllers_1.updateProfile);
profileRoute.get("/political-profile", controllers_1.getAllPolRepProfile);
profileRoute.put("/political-profile", middlewares_1.authMiddleware, (0, middlewares_1.roleMiddleware)([client_1.userRole.polRep]), controllers_1.updatePolRepProfile);
profileRoute.post("/upload", multer_1.uploadFile, middlewares_1.authMiddleware, controllers_1.uploadProfileImage);
profileRoute.delete("/image", middlewares_1.authMiddleware, controllers_1.deleteProfileImage);
