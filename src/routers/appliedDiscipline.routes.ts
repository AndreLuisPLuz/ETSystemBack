import { Router } from "express";
import {
    createAppliedDisciplineController,
    listAppliedDisciplinesController,
    updateAppliedDisciplineController
} from "../controllers";
import { authenticateToken, buildRequirements } from "../middlewares";

const appliedDisciplineRouter = Router();

appliedDisciplineRouter.get(
    "",
    authenticateToken,
    (req, res, next) => {
        res.locals.requirements = {
            student: false
        };
        return next();
    },
    buildRequirements,
    listAppliedDisciplinesController
);

appliedDisciplineRouter.post(
    "",
    authenticateToken,
    (req, res, next) => {
        res.locals.requirements = {
            admin: false
        };
        return next();
    },
    buildRequirements,
    createAppliedDisciplineController
);

appliedDisciplineRouter.patch(
    "/:idAppliedDiscipline",
    authenticateToken,
    (req, res, next) => {
        res.locals.requirements = {
            admin: false,
            instructor: false
        };
        return next();
    },
    buildRequirements,
    updateAppliedDisciplineController
);

export default appliedDisciplineRouter;