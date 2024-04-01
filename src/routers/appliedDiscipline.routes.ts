import { Router } from "express";
import {
    createAppliedDisciplineController,
    listAppliedDisciplinesController
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

export default appliedDisciplineRouter;