import { Router } from "express";
import {
    createAppliedDisciplineController,
    listAppliedDisciplinesController,
    updateAppliedDisciplineController,
    softDeleteAppliedDisciplineController,
    retrieveAppliedDisciplineController
} from "../controllers";
import { authenticateToken, buildRequirements } from "../middlewares";

const appliedDisciplineRouter = Router();

appliedDisciplineRouter.get(
    "",
    authenticateToken,
    (req, res, next) => {
        res.locals.requirements = {
            admin: false,
            instructor: false,
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

appliedDisciplineRouter.get(
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
    retrieveAppliedDisciplineController
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

appliedDisciplineRouter.delete(
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
    softDeleteAppliedDisciplineController
);

export default appliedDisciplineRouter;