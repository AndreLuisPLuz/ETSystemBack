import { Router } from "express";
import {
  createUserController,
  listUsersController,
  updateUserInformationController,
  retrieveUserController,
} from "../controllers"
import { authenticateToken } from "../middlewares";

const userRouter = Router();

userRouter.get("", authenticateToken, listUsersController);
userRouter.post("", authenticateToken, createUserController);

userRouter.get("/:id", authenticateToken, retrieveUserController);
userRouter.patch("/:id", authenticateToken, updateUserInformationController);
userRouter.delete("/:id", authenticateToken);


export default userRouter;