import { Router } from "express";
import {
  createPolRepProfile,
  updateProfile,
  uploadProfileImage,
  getPolRepProfile,
} from "../controllers";
import { authMiddleware, roleMiddleware } from "../middlewares";
import { uploadFile } from "../utils/multer";
import { userRole } from "@prisma/client";
import { auth } from "google-auth-library";
const profileRoute = Router();

profileRoute.post(
  "/",
  authMiddleware,
  roleMiddleware([userRole.polRep]),
  createPolRepProfile
);
profileRoute.get(
  "/",
  authMiddleware,
  roleMiddleware([userRole.polRep]),
  getPolRepProfile
);
profileRoute.put("/", authMiddleware, updateProfile);
profileRoute.post("/upload", uploadFile, authMiddleware, uploadProfileImage);

export { profileRoute };
