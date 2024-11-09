import pino from "pino";
import dayjs from "dayjs";

const isDev = process.env.NODE_ENV === "development";
const log = pino(
  isDev
    ? {
        transport: {
          target: "pino-pretty",
        },
        base: {
          pid: false,
        },
        timestamp: () => `,"time":"${dayjs().format()}"`,
      }
    : {}
);

export default log;
