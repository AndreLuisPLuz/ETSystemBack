import { Router } from "express";
import { createDisciplineController } from "../controllers";
import { authenticateToken, buildRequirements } from "../middlewares";

const disciplineRouter: Router = Router();

disciplineRouter.post(
    "",
    authenticateToken,
    (req, res, next) => {
        res.locals.requirements = {
            adminAndBosch: false,
            adminNotBosch: false
        };
        return next();
    },
    buildRequirements,
    createDisciplineController
);

export default disciplineRouter;