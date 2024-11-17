import { Router } from "express";
import {
  createPolRepProfile,
  updateProfile,
  uploadProfileImage,
  getPolRepProfile,
  updatePolRepProfile,
  getAllPolRepProfile,
  deleteProfileImage,
} from "../controllers";
import { authMiddleware, roleMiddleware } from "../middlewares";
import { uploadFile } from "../utils/multer";
import { userRole } from "@prisma/client";

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
profileRoute.get("/political-profile", getAllPolRepProfile);
profileRoute.put(
  "/political-profile",
  authMiddleware,
  roleMiddleware([userRole.polRep]),
  updatePolRepProfile
);
profileRoute.post("/upload", uploadFile, authMiddleware, uploadProfileImage);
profileRoute.delete("/image", authMiddleware, deleteProfileImage);

export { profileRoute };
