import nodemailer from "nodemailer";
import config from "../config";
import { BadRequest } from "../middlewares";
import log from "./logger";

const Sendmail = async (emailcontent: any) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.GOOGLE_USER,
      pass: config.GOOGLE_APP_PASSWORD,
    },
    // tls: {
    //     rejectUnauthorized: false,
    // },
  });
  try {
    const transRes = await transporter.verify();
    log.info(transRes);
    await transporter.sendMail(emailcontent);
    return "Email sent successfully.";
  } catch (error) {
    log.error(error);
    throw new BadRequest("Error sending email");
  }
};

export { Sendmail };
