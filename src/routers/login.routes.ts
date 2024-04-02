import { Router } from "express";
import { loginController } from "../controllers";
import { validateBody } from "../middlewares";
import { loginSchema } from "../schemas";

const loginRouter = Router();

loginRouter.post("", validateBody(loginSchema), loginController);

export default loginRouter;