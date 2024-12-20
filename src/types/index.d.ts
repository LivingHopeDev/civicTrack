import { User, userRole } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { userRole } from "@prisma/client";
declare module "express-serve-static-core" {
  interface Request {
    user?: User;
    role: UserRole;
  }
}

export interface IUserSignUp {
  name: string;
  email: string;
  password: string;
  role: userRole;
}
export interface IUserLogin {
  email: string;
  password: string;
}
interface IGoogleUserInfo {
  sub: string;
  email: string;
  name: string;
  email_verified: boolean;
  image_url: string;
}

export interface IAuthService {
  login(payload: IUserLogin): Promise<unknown>;
  signUp(payload: IUserSignUp, res: unknown): Promise<unknown>;
  // verifyEmail(token: string, email: string): Promise<unknown>;
  // changePassword(
  //   userId: string,
  //   oldPassword: string,
  //   newPassword: string,
  //   confirmPassword: string,
  // ): Promise<{ message: string }>;
  // generateMagicLink(email: string): Promise<{ ok: boolean; message: string }>;
  // validateMagicLinkToken(
  //   token: string,
  // ): Promise<{ status: string; email: string; userId: string }>;
  // passwordlessLogin(userId: string): Promise<{ access_token: string }>;
}
