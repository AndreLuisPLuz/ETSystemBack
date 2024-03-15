import { Router } from "express";
import {
  listUsersController,
  createUserController,

  retrieveUserController,
  updateUserInformationController,
  softDeleteUserController,

  createAdministratorController
} from "../controllers"
import { authenticateToken } from "../middlewares";

const userRouter = Router();

userRouter.get("", authenticateToken, listUsersController);
userRouter.post("", authenticateToken, createUserController);

userRouter.get("/:idUser", authenticateToken, retrieveUserController);
userRouter.patch("/:idUser", authenticateToken, updateUserInformationController);
userRouter.delete("/:idUser", authenticateToken, softDeleteUserController);

userRouter.post("/:idUser/admin", authenticateToken, createAdministratorController);

export default userRouter;