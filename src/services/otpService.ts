import { User, Otp } from "@prisma/client";
import { generateNumericOTP } from "../utils";
import { Expired, ResourceNotFound } from "../middlewares";
import  prismaClient  from "../prisma/client";

export class OtpService {
  public async createOtp(userId: string): Promise<Otp | undefined> {
    try {
      const user = await prismaClient.user.findFirst({
        where: { id: userId },
      });
      if (!user) {
        throw new ResourceNotFound("User not found");
      }

      const token = generateNumericOTP(6);
      const otp_expires = new Date(Date.now() + 15 * 60 * 1000);

      const otp = await prismaClient.otp.create({
        data: {
          token: token,
          expiry: otp_expires,
          userId: userId,
        },
      });

      return otp;
    } catch (error) {
      return;
    }
  }

  async verifyOtp(userId: string, token: string): Promise<boolean> {
    try {
      const otp = await prismaClient.otp.findFirst({
        where: { token, user: { id: userId } },
      });

      if (!otp) {
        throw new ResourceNotFound("Invalid OTP");
      }

      if (otp.expiry < new Date()) {
        throw new Expired("OTP has expired");
      }

      return true;
    } catch (error) {
      return false;
    }
  }
}
