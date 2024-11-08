import { User, Otp } from "@prisma/client";
import { generateNumericOTP } from "../utils";
import { Expired, ResourceNotFound } from "../middlewares";
import prismaClient from "../prisma/client";

export class OtpService {
  public async createOtp(userId: string): Promise<Otp | undefined> {
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
  }

  public async verifyOtp(token: string): Promise<{ message: string }> {
    const otp = await prismaClient.otp.findFirst({
      where: { token },
      include: { user: true },
    });
    console.log("otp", otp);
    if (!otp) {
      throw new ResourceNotFound("Invalid OTP");
    }

    if (otp.expiry < new Date()) {
      // Delete the expired OTP
      await prismaClient.otp.delete({
        where: { id: otp.id },
      });
      throw new Expired("OTP has expired");
    }

    // Mark user as verified and delete the OTP
    await prismaClient.$transaction([
      prismaClient.user.update({
        where: { id: otp.userId },
        data: { is_verified: true },
      }),
      prismaClient.otp.delete({
        where: { id: otp.id },
      }),
    ]);

    return {
      message: "Email verified successfully.",
    };
  }
}
