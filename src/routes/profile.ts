import { Router } from "express";
import { createProfile, uploadProfileImage } from "../controllers";
import { authMiddleware, roleMiddleware } from "../middlewares";
import { uploadFile } from "../utils/multer";
import { userRole } from "@prisma/client";
const profileRoute = Router();

profileRoute.post("/", authMiddleware, createProfile);
profileRoute.post("/upload", uploadFile, authMiddleware, uploadProfileImage);

export { profileRoute };
