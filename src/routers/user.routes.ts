import { Router } from "express";
import {
  createUserController,
  updateUserInformationController,
  retrieveUserController,
} from "../controllers"

const userRouter = Router();

userRouter.post("", createUserController);
userRouter.post("/update?:idUser", updateUserInformationController);
userRouter.get("/:idUser", retrieveUserController);

export default userRouter;