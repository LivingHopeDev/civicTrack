import express, { Express } from "express";
import rootRouter from "./routes";
import { PrismaClient } from "@prisma/client";
import { routeNotFound, errorHandler } from "./middlewares";
import config from "./config";
import { serve, setup } from "swagger-ui-express";
import swaggerSpec from "./config/swaggerConfig";
import log from "./utils/logger";

const app: Express = express();

app.use(express.json());
app.use("/api/v1", rootRouter);
app.use("/api/docs", serve, setup(swaggerSpec));
app.get("/api/v1", (req, res) => {
  res.json({
    status: "Success",
    message: "Welcome: I will responding to your requests",
  });
});

export const prismaClient = new PrismaClient({
  log: ["query"],
});

app.use(routeNotFound);
app.use(errorHandler);

app.listen(config.port, () => {
  log.info(`Server running on port ${config.port}`);
});

export default app;
