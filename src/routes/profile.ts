import { Router } from "express";
import { uploadProfileImage } from "../controllers";
import { authMiddleware } from "../middlewares";
import { uploadFile } from "../utils/multer";
const profileRoute = Router();
profileRoute.post("/upload", uploadFile, authMiddleware, uploadProfileImage);

export { profileRoute };
