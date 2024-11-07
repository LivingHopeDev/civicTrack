import { SignUpSchema, loginSchema } from "../schema";
import { validateData } from "../middlewares";
import { signup, login, googleAuthCall } from "../controllers";
import { Router } from "express";

const authRoute = Router();

authRoute.post("/register", validateData(SignUpSchema), signup);
// authRoute.post("verify-otp", validateData(otpSchema), verifyOtp);
authRoute.post("/login", validateData(loginSchema), login);
authRoute.post("/google", googleAuthCall);
export { authRoute };
