import { Router } from "express";
import {
    listStudentAvaliationsController,
    listStudentAvaliationsByStudentController,
    createStudentAvaliationController,
    softDeleteStudentAvaliationController,
} from "../controllers";
import { authenticateToken, buildRequirements } from "../middlewares";

const studentAvaliationRouter = Router();

studentAvaliationRouter.get(
    "/appliedDiscipline/:idAppliedDiscipline",
    authenticateToken,
    (req, res, next) => {
        res.locals.requirements = {
            admin: false,
            instructor: false
        };
        return next();
    },
    buildRequirements,
    listStudentAvaliationsController
)

studentAvaliationRouter.get(
    "/appliedDiscipline/:idAppliedDiscipline/student/:idStudent",
    authenticateToken,
    (req, res, next) => {
        res.locals.requirements = {
            admin: false,
            instructor: false,
            ownUser: false
        };
        return next();
    },
    buildRequirements,
    listStudentAvaliationsByStudentController
);

studentAvaliationRouter.post(
    "/appliedDiscipline/:idAppliedDiscipline/student/:idStudent",
    authenticateToken,
    (req, res, next) => {
        res.locals.requirements = {
            admin: false,
            instructor: false
        };
        return next();
    },
    buildRequirements,
    createStudentAvaliationController
);

studentAvaliationRouter.delete(
    "/:idStudentAvaliation",
    authenticateToken,
    (req, res, next) => {
        res.locals.requirements = {
            master: false
        };
        return next();
    },
    buildRequirements,
    softDeleteStudentAvaliationController
)

export default studentAvaliationRouter;