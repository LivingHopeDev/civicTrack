import { z } from "zod";
import { userRole } from "@prisma/client";
export const SignUpSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.nativeEnum(userRole, { message: "Invalid" }),
});
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const otpSchema = z.object({
  token: z.string(),
});
export const resendOtpSchema = z.object({
  email: z.string().email(),
});
