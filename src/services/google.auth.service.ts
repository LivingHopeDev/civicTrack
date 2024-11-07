import { User } from "@prisma/client";
import { IGoogleUserInfo } from "../types";
import { prismaClient } from "..";

export const GoogleUserInfo = async (
  userInfo: IGoogleUserInfo
): Promise<{
  message: string;
  user: Partial<User>;
}> => {
  const { sub: google_id, email, name, email_verified } = userInfo;
  let user: User;
  user = await prismaClient.user.findUnique({
    where: { email },
  });
  if (!user) {
    user = await prismaClient.user.create({
      data: {
        name,
        email,
        is_verified: email_verified,
        google_id,
        // image_url: userInfo.picture
      },
    });
    return {
      user,
      message: "User Created Successfully",
    };
  }

  // If user exists, return user information
  return {
    user,
    message: "User already exists",
  };
};
