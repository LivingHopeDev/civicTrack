import customEmail from "../utils/customEmail";
export class EmailService {
  async verifyEmailTemplate(first_name: String, otp: String) {
    const intro = `
    <p>

      We received a request to verify your email address for your account. Please use the following One-Time Password (OTP) to complete the verification process:<br><br>

      <strong>${otp}</strong><br><br>

      This OTP is valid for the next 15 minutes.<br><br>

      If you have any questions or need further assistance, please feel free to contact our support team.<br><br>

      Thank you,<br>
  </p>
  `;

    const { emailBody, emailText } = customEmail(intro, first_name);
    return {
      emailBody,
      emailText,
    };
  }

  async resetPasswordTemplate(first_name: String, otp: String) {
    const intro = `
    <p>

      We received a request to reset your password for your account. Please use the following One-Time Password (OTP) to complete the verification process:<br><br>

      <strong>${otp}</strong><br><br>

      This OTP is valid for the next 15 minutes.<br><br>

      If you have any questions or need further assistance, please feel free to contact our support team.<br><br>

      Thank you,<br>
  </p>
  `;

    const { emailBody, emailText } = customEmail(intro, first_name);
    return {
      emailBody,
      emailText,
    };
  }
}
