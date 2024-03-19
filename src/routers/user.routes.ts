import { Router } from "express";
import {
  listUsersController,
  createUserController,

  retrieveUserController,
  updateUserInformationController,
  softDeleteUserController,

  createAdministratorController
} from "../controllers"
import { 
  authenticateToken,
  authenticateAdmin,
  authenticateBosch,
  authenticateMaster,
  authenticateBoschOrMaster,
  authenticateOwnUser
} from "../middlewares";

const userRouter = Router();

userRouter.get(
  "", 
  authenticateToken, 
  authenticateAdmin, 
  authenticateBoschOrMaster,
  listUsersController
);
userRouter.post(
  "", 
  authenticateToken,
  authenticateAdmin,
  authenticateBoschOrMaster,
  createUserController
);

userRouter.get(
  "/:idUser", 
  authenticateToken,
  authenticateAdmin,
  authenticateBoschOrMaster,
  authenticateOwnUser,
  retrieveUserController
);
userRouter.patch("/:idUser", authenticateToken, updateUserInformationController);
userRouter.delete("/:idUser", authenticateToken, softDeleteUserController);

userRouter.post("/:idUser/admin", authenticateToken, createAdministratorController);

export default userRouter;