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
export const AddressSchema = z.object({
  lineOne: z.string(),
  lineTwo: z.string().optional(),
  pincode: z.string().length(6),
  city: z.string(),
  country: z.string(),
});

export const UpdateUserSchema = z.object({
  name: z.string().optional(),
  defaultShippingAddressId: z.number().optional(),
  defaultBillingAddressId: z.number().optional(),
});
