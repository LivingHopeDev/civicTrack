import { NextFunction, Request, Response } from "express";
import { AuthService, OtpService } from "../services";
import asyncHandler from "../middlewares/asyncHandler";

const authService = new AuthService();
const otpService = new OtpService();

export const signup = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user, access_token, message } = await authService.signUp(req.body);
    const data = {
      user,
      access_token,
    };
    res.status(201).json({ status_code: 201, message, data });
  }
);

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { message, access_token, user } = await authService.login(req.body);

  const data = {
    user,
    access_token,
  };
  res.status(201).json({ status_code: 200, message, data });
});

export const verifyOtp = asyncHandler(async (req: Request, res: Response) => {
  const { token } = req.body;
  const { message } = await otpService.verifyOtp(token);
  res.status(200).json({
    status_code: 200,
    message,
  });
});

export const resendOtp = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;

  const { message } = await authService.resendOTP(email);

  return res.status(200).json({ status_code: 200, message });
});
