import { Router } from "express";
import {
    listDisciplinesController,
    createDisciplineController
} from "../controllers";
import { authenticateToken, buildRequirements } from "../middlewares";

const disciplineRouter: Router = Router();

disciplineRouter.get(
    "",
    authenticateToken,
    (req, res, next)=> {
        res.locals.requirements = {
            adminAndBosch: false,
            adminNotBosch: false,
            instructorAndBosch: false,
            instructorNotBosch: false
        };
        return next();
    },
    buildRequirements,
    listDisciplinesController
);

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