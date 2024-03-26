import { Router } from "express";
import { 
    listStudentGroupsController,
    createStudentGroupController,
    retrieveStudentGroupController,
    updateStudentGroupController,
    softDeleteStudentGroupController
} from "../controllers";
import {
    authenticateToken,
    buildRequirements
} from "../middlewares";

const studentGroupRouter = Router();

studentGroupRouter.get(
    "",
    authenticateToken,
    (req, res, next) => {
        res.locals.requirements = {
            admin: false,
            instructor: false
        };
        return next();
    },
    buildRequirements,
    listStudentGroupsController
);

studentGroupRouter.post(
    "",
    authenticateToken,
    (req, res, next) => {
        res.locals.requirements = {
            master: false,
            adminAndBosch: false
        };
        return next();
    },
    buildRequirements,
    createStudentGroupController
);

studentGroupRouter.get(
    "/:idStudentGroup",
    authenticateToken,
    (req, res, next) => {
        res.locals.requirements = {
            admin: false,
            instructor: false
        };
        return next();
    },
    buildRequirements,
    retrieveStudentGroupController
);

studentGroupRouter.patch(
    "/:idStudentGroup",
    authenticateToken,
    (req, res, next) => {
        res.locals.requirements = {
            master: false,
            adminAndBosch: false
        };
        return next();
    },
    buildRequirements,
    updateStudentGroupController
);

studentGroupRouter.delete(
    "/:idStudentGroup",
    authenticateToken,
    (req, res, next) => {
        res.locals.requirements = {
            master: false
        };
        return next();
    },
    buildRequirements,
    softDeleteStudentGroupController
);

export default studentGroupRouter;