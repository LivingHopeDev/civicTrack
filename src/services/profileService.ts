import { prismaClient } from "..";
import { cloudinary } from "../utils/cloudinary";
import { getPublicIdFromUrl } from "../utils/getPublicId";
import log from "../utils/logger";
import fs from "fs";
export class ProfileService {
  public async uploadProfileImage(userId: string, file: Express.Multer.File) {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "/civicTrack/profile",
      public_id: `user_${userId}`,
    });

    const user = await prismaClient.user.findUnique({
      where: { id: userId },
    });

    if (!user.google_id && user.image_url) {
      const publicId = getPublicIdFromUrl(user.image_url);
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
    }

    await prismaClient.user.update({
      where: { id: userId },
      data: { image_url: result.secure_url },
    });
    fs.unlink(file.path, (err) => {
      if (err) {
        console.error("Error deleting file from server:", err);
      }
    });
    return { message: "Profile image updated" };
  }
}
