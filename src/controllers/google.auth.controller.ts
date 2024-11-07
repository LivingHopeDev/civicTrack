import { verifyGoogleToken } from "../config/google.config";
import asyncHandler from "../middlewares/asyncHandler";
import { Request, Response } from "express";
import { IGoogleUserInfo } from "../types";
import { GoogleUserInfo } from "../services/google.auth.service";
import { generateAccessToken } from "../utils";

export const googleAuthCall = asyncHandler(
  async (req: Request, res: Response) => {
    const { id_token } = req.body;

    const payload = await verifyGoogleToken(id_token);

    const userInfo: IGoogleUserInfo = {
      sub: payload.sub,
      email: payload.email,
      name: payload.name,
      email_verified: payload.email_verified,
      // image_url: payload,
    };
    const { user, message } = await GoogleUserInfo(userInfo);
    const access_token = await generateAccessToken(user.id);

    res
      .status(201)
      .json({ status_code: 201, message, data: { access_token, user } });
  }
);
