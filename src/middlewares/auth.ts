import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import { User } from "@prisma/client";
import log from "../utils/logger";
import { ServerError } from "./error";
import { prismaClient } from "..";

export const authMiddleware = async (
  req: Request & { user?: User },
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        status_code: "401",
        message: "Invalid token",
      });
      return;
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      res.status(401).json({
        status_code: "401",
        message: "Invalid token",
      });
      return;
    }

    jwt.verify(token, config.TOKEN_SECRET!, async (err, decoded: any) => {
      if (err) {
        res.status(401).json({
          status_code: "401",
          message: "Invalid token",
        });
        return;
      }
      const user = await prismaClient.user.findFirst({
        where: { id: decoded["userId"] as string },
      });
      if (!user) {
        res.status(401).json({
          status_code: "401",
          message: "Invalid token",
        });
        return;
      }
      req.user = user;
      next();
    });
  } catch (error) {
    log.error(error);
    throw new ServerError("INTERNAL_SERVER_ERROR");
  }
};
// export const adminMiddleware = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const user = req.user;
//   if (user?.role === "ADMIN") {
//     next();
//   } else {
//      res.status(403).json({
//       status_code: "403",
//       message: "Unauthorized",
//     });
// return;
//   }
// };
