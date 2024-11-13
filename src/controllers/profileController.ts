import asyncHandler from "../middlewares/asyncHandler";
import { Request, Response } from "express";
import { ProfileService } from "../services/profileService";
import log from "../utils/logger";
import { string } from "zod";
const profileService = new ProfileService();
export const uploadProfileImage = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user.id;
    const pixFile = req.file;

    const message = await profileService.uploadProfileImage(userId, pixFile);
    res.status(200).json(message);
  }
);

export const createProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user.id;
    const role = req.user.role;
    const message = await profileService.createProfile(userId, req.body);
    res.status(201).json(message);
  }
);
