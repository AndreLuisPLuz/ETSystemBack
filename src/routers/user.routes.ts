import { Router } from "express";
import {
  createUserController,
  listUsersController,
  updateUserInformationController,
  retrieveUserController,
} from "../controllers"
import { authenticateToken } from "../middlewares";

const userRouter = Router();

userRouter.post("", createUserController);
userRouter.get("", authenticateToken, listUsersController);
userRouter.post("/update?:id", updateUserInformationController);
userRouter.get("/:id", retrieveUserController);

export default userRouter;