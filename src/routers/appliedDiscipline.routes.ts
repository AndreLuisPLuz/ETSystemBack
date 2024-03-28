import { Router } from "express";
import { createAppliedDisciplineController } from "../controllers";
import { authenticateToken, buildRequirements } from "../middlewares";

const appliedDisciplineRouter = Router();

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