import { Router } from "express";
import { authRoute } from "./auth";
import { profileRoute } from "./profile";

const rootRouter: Router = Router();
rootRouter.use("/auth", authRoute);
rootRouter.use("/profile", profileRoute);

export default rootRouter;
