import { IUserSignUp, IAuthService, IUserLogin } from "../types";
import { User } from "@prisma/client";
import { prismaClient } from "..";
import {
  hashPassword,
  comparePassword,
  generateNumericOTP,
  generateAccessToken,
} from "../utils";
import { HttpError } from "../middlewares/error";

import {
  BadRequest,
  Conflict,
  ResourceNotFound,
  Unauthorised,
} from "../middlewares/error";
import { OtpService, EmailService } from ".";
import { Sendmail } from "../utils/sendMail";
import config from "../config";
export class AuthService implements IAuthService {
  private otpService = new OtpService();
  private emailService = new EmailService();
  public async signUp(payload: IUserSignUp): Promise<{
    message: string;
    user: Partial<User>;
    access_token: string;
  }> {
    const { email, password, name, role } = payload;

    const hashedPassword = await hashPassword(password);
    let user = await prismaClient.user.findFirst({ where: { email } });
    if (user) {
      throw new Conflict("User already exists");
    }
    const newUser = await prismaClient.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });
    const access_token = await generateAccessToken(newUser.id);
    const otp = await this.otpService.createOtp(newUser.id);
    const first_name = name.split(" ")[0];
    const { emailBody, emailText } = await this.emailService.otpEmailTemplate(
      first_name,
      otp!.token
    );

    await Sendmail({
      from: `${config.GOOGLE_SENDER_MAIL}`,
      to: email,
      subject: "EMAIL VERIFICATION",
      text: emailText,
      html: emailBody,
    });
    const userResponse = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    };
    return {
      user: userResponse,
      access_token,
      message:
        "User Created Successfully. Kindly check your mail for your verification token",
    };
  }

  public async login(payload: IUserLogin): Promise<{
    message: string;
    user: Partial<User>;
    access_token: string;
  }> {
    const { email, password } = payload;
    const user = await prismaClient.user.findFirst({ where: { email } });
    if (!user) {
      throw new ResourceNotFound("User not found");
    }
    if (!user.is_verified) {
      throw new Unauthorised(
        "Email verification required. Please verify your email to proceed."
      );
    }
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequest("Authentication failed");
    }
    const access_token = await generateAccessToken(user.id);
    const userResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    return {
      user: userResponse,
      access_token,
      message: "Login successful",
    };
  }

  public async resendOTP(email: string) {
    const user = await prismaClient.user.findFirst({
      where: { email: email },
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
        userId: user.id,
      },
    });
    const first_name = user.name.split(" ")[0];
    const { emailBody, emailText } = await this.emailService.otpEmailTemplate(
      first_name,
      otp!.token
    );

    await Sendmail({
      from: `${config.GOOGLE_SENDER_MAIL}`,
      to: email,
      subject: "OTP VERIFICATION",
      text: emailText,
      html: emailBody,
    });
    return {
      message: "OTP sent successfully",
    };
  }

  // public async forgotPassword(email: string): Promise<{ message: string }> {
  //   try {
  //     const user = await User.findOne({ where: { email } });

  //     if (!user) {
  //       throw new HttpError(404, "User not found");
  //     }

  //     const resetToken = jwt.sign({ userId: user.id }, config.TOKEN_SECRET, {
  //       expiresIn: "30d",
  //     });

  //     const resetUrl = `${config.BASE_URL}/new-password?token=${resetToken}`;

  //     await sendEmailTemplate({
  //       to: email,
  //       subject: "Reset Password",
  //       templateName: "password-reset",
  //       variables: {
  //         name: user.last_name,
  //         resetUrl,
  //       },
  //     });
  //     return { message: "Password reset link sent successfully." };
  //   } catch (error) {
  //     throw new HttpError(error.status || 500, error.message || error);
  //   }
  // }

  // resetPassword = async (
  //   token: string,
  //   new_password: string,
  //   confirm_password: string
  // ): Promise<{ message: string }> => {
  //   try {
  //     const payload = jwt.verify(token, config.TOKEN_SECRET);
  //     const user = await User.findOne({
  //       where: { id: payload["userId"] as string },
  //     });

  //     if (!user) {
  //       throw new HttpError(404, "Token is invalid or has expired");
  //     }

  //     if (new_password !== confirm_password) {
  //       throw new HttpError(400, "Passwords do not match");
  //     }

  //     const hashed_password = await hashPassword(new_password);

  //     user.password = hashed_password;
  //     await AppDataSource.manager.save(user);

  //     return { message: "Password reset successfully." };
  //   } catch (error) {
  //     throw new HttpError(error.status || 500, error.message || error);
  //   }
  // };
}
