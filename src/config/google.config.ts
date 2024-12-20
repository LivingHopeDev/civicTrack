import { OAuth2Client } from "google-auth-library";
import { BadRequest } from "../middlewares";
import log from "../utils/logger";
const client = new OAuth2Client();

export const verifyGoogleToken = async (idToken: string) => {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();
  console.log("here i am");
  log.info(payload);
  if (!payload) {
    throw new BadRequest("Unable to verify token");
  }
  return payload;
};
