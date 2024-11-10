import asyncHandler from "../middlewares/asyncHandler";
import { Request, Response } from "express";
import { ProfileService } from "../services/profileService";
import log from "../utils/logger";
const profileService = new ProfileService();
export const uploadProfileImage = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user.id;
    const pixFile = req.file;

    const message = await profileService.uploadProfileImage(userId, pixFile);
    res.status(200).json(message);
  }
);
