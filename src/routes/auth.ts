import {
  SignUpSchema,
  loginSchema,
  otpSchema,
  resendOtpSchema,
} from "../schema";
import { authMiddleware, validateData } from "../middlewares";
import {
  signup,
  login,
  googleAuthCall,
  verifyOtp,
  resendOtp,
} from "../controllers";
import { Router } from "express";

const authRoute = Router();

authRoute.post("/register", validateData(SignUpSchema), signup);
authRoute.post("/verify-otp", validateData(otpSchema), verifyOtp);
authRoute.post("/resend-otp", validateData(resendOtpSchema), resendOtp);
authRoute.post("/login", validateData(loginSchema), login);
authRoute.post("/google", googleAuthCall);
export { authRoute };
