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

export const updateProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user.id;
    const message = await profileService.updateProfile(userId, req.body);
    res.status(200).json(message);
  }
);

export const createPolRepProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user.id;
    const message = await profileService.createPolRepProfile(userId, req.body);
    res.status(201).json(message);
  }
);

export const getPolRepProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user.id;
    const message = await profileService.getPolRepProfile(userId);
    res.status(200).json(message);
  }
);

export const updatePolRepProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user.id;
    const message = await profileService.updatePolRepProfile(userId, req.body);
    res.status(200).json(message);
  }
);
