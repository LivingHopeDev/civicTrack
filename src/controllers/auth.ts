import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services";
import asyncHandler from "../middlewares/asyncHandler";

const authService = new AuthService();

export const signup = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user, access_token, message } = await authService.signUp(req.body);

    res.status(201).json({ message, access_token, user });
  }
);

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { message, access_token, user } = await authService.login(req.body);

  res.status(200).json({ message, access_token, user });
});
