import { Router } from "express";
import {
  createUserController,
  updateUserInformationController,
  retrieveUserController,
} from "../controllers"

const userRouter = Router();

userRouter.post("", createUserController);
userRouter.post("/update?:id", updateUserInformationController);
userRouter.get("/:id", retrieveUserController);

export default userRouter;