import { Router } from "express";
import {
  createUserController,
  listUsersController,
  retrieveUserController,
} from "../controllers/user.controller";

const userRouter = Router();

userRouter.post("", createUserController);
userRouter.get("", listUsersController);
userRouter.get("/:id", retrieveUserController);

export default userRouter;