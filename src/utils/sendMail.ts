import nodemailer from "nodemailer";
import config from "../config";
import { BadRequest } from "../middlewares";
import log from "./logger";

const Sendmail = async (emailcontent: any) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.elasticemail.com",
        port: 2525,
        auth: {
            user: config.ELASTIC_EMAIL,
            pass: config.ELASTIC_PASSWORD,
        },
        // tls: {
        //     rejectUnauthorized: false,
        // },
    });
    try {
        const transRes = await transporter.verify()
        log.info(transRes)
        await transporter.sendMail(emailcontent);
        return "Email sent successfully.";
    } catch (error) {
        log.error(error);
        throw new BadRequest("Error sending email");
    }
};

export { Sendmail };
