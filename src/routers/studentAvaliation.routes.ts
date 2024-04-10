import { Router } from "express";
import {
    listStudentAvaliationsByStudentGroupController,
    listStudentAvaliationsByStudentController,
    createStudentAvaliationController,
} from "../controllers";
import { authenticateToken, buildRequirements } from "../middlewares";

const studentAvaliationRouter = Router();

studentAvaliationRouter.get(
    "/studentAvaliation/appliedDiscipline/:idAppliedDiscipline/studentGroup/:idStudentGroup",
    authenticateToken,
    (req, res, next) => {
        res.locals.requirements = {
            admin: false,
            instructor: false
        };
        return next();
    },
    buildRequirements,
    listStudentAvaliationsByStudentGroupController
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

export default studentAvaliationRouter;