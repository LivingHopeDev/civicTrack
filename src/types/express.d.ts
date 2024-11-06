import * as Express from "express";
import { userRole } from "@prisma/client";
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        role?: userRole;
      };
    }
  }
}
