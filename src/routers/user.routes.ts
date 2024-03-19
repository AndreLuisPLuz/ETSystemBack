import { NextFunction, Router } from "express";
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
  buildRequirements
} from "../middlewares";

const userRouter = Router();

userRouter.get(
  "", 
  authenticateToken, 
  (req, res, next) => {
    res.locals.requirements = {
      master: false,
      adminAndBosch: false,
    };
    return next();
  }, 
  buildRequirements,
  listUsersController
);

userRouter.post(
  "", 
  authenticateToken,
  (req, res, next) => {
    res.locals.requirements = {
      master: false,
      adminAndBosch: false,
    };
    return next();
  }, 
  buildRequirements,
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

userRouter.patch(
  "/:idUser",
  authenticateToken,
  (req, res, next) => {
    res.locals.requirements = {
      ownUser: false,
      master: false,
    };
    return next();
  },
  buildRequirements,
  updateUserInformationController
);

userRouter.delete(
  "/:idUser",
  authenticateToken,
  (req, res, next) => {
    res.locals.requirements = {
      master: false,
    };
    return next();
  },
  buildRequirements,
  softDeleteUserController
);

userRouter.post("/:idUser/admin", authenticateToken, createAdministratorController);

export default userRouter;