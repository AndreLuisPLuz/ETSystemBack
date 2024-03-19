import { NextFunction, Router } from "express";
import { RequirementTypes, IReqRequirements } from "../contracts";

import {
  listUsersController,
  createUserController,

  retrieveUserController,
  updateUserInformationController,
  softDeleteUserController,

  createAdministratorController
} from "../controllers";

import { 
  authenticateToken,
  authenticateAdmin,
  authenticateBosch,
  authenticateMaster,
  authenticateBoschOrMaster,
  authenticateOwnUser,
  buildRequirements
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
  (req, res, next) => {
    res.locals.requirements = {
      ownUser: false,
      admin: false,
      master: false,
      isBosch: false
    };
    return next();
  },
  buildRequirements,
  retrieveUserController
);
userRouter.patch("/:idUser", authenticateToken, updateUserInformationController);
userRouter.delete("/:idUser", authenticateToken, softDeleteUserController);

userRouter.post("/:idUser/admin", authenticateToken, createAdministratorController);

export default userRouter;