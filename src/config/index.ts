import dotenv from "dotenv";
dotenv.config();

const config = {
  port: process.env.PORT ?? 8070,
  NODE_ENV: process.env.NODE_ENV,
  TOKEN_SECRET: process.env.AUTH_SECRET,
  TOKEN_EXPIRY: process.env.AUTH_EXPIRY,
  ELASTIC_EMAIL: process.env.ELASTIC_EMAIL,
  ELASTIC_PASSWORD: process.env.ELASTIC_PASSWORD,
};

export default config;
