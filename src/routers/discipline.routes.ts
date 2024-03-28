import { Router } from "express";
import {
    listDisciplinesController,
    createDisciplineController,
    updateDisciplineController,
    softDeleteDisciplineController
} from "../controllers";
import { authenticateToken, buildRequirements } from "../middlewares";

const disciplineRouter: Router = Router();

disciplineRouter.get(
    "",
    authenticateToken,
    (req, res, next)=> {
        res.locals.requirements = {
            admin: false,
            instructor: false
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
            admin: false
        };
        return next();
    },
    buildRequirements,
    createDisciplineController
);

disciplineRouter.patch(
    "/:idDiscipline",
    authenticateToken,
    (req, res, next)=> {
        res.locals.requirements = {
            admin: false,
            instructor: false
        };
        return next();
    },
    buildRequirements,
    updateDisciplineController
);

disciplineRouter.delete(
    "/:idDiscipline",
    authenticateToken,
    (req, res, next) => {
        res.locals.requirements = {
            master: false
        };
        return next();
    },
    buildRequirements,
    softDeleteDisciplineController
);

export default disciplineRouter;