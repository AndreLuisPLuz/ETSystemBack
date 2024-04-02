import { Router } from "express";
import {
  listUsersController,
  createUserController,
  retrieveUserController,
  updateUserInformationController,
  softDeleteUserController,
  createAdministratorController,
  createInstructorController,
  createStudentController
} from "../controllers";
import { 
  authenticateToken,
  buildRequirements,
  validateBody
} from "../middlewares";
import { postUserSchema } from "../schemas";

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
  validateBody(postUserSchema),
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

userRouter.post(
  "/:idUser/admin",
  authenticateToken,
  (req, res, next) => {
    res.locals.requirements = {
      master: false,
      adminAndBosch: false,
    };
    return next();
  },
  buildRequirements,
  createAdministratorController
);

userRouter.post(
  "/:idUser/instructor",
  authenticateToken,
  (req, res, next) => {
    res.locals.requirements = {
      master: false,
      adminAndBosch: false,
      adminNotBosch: false
    };
    return next();
  },
  buildRequirements,
  createInstructorController
);

userRouter.post(
  "/:idUser/student",
  authenticateToken,
  (req, res, next) => {
    res.locals.requirements = {
      master: false,
      adminAndBosch: false
    };
    return next();
  },
  buildRequirements,
  createStudentController
);

export default userRouter;