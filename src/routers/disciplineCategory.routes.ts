import { Router } from "express";
import {
    createDisciplineCategoryController,
    listDisciplineCategoriesController,
    updateDisciplineCategoryController
} from "../controllers";
import { authenticateToken, buildRequirements } from "../middlewares";

const disciplineCategoryRouter: Router = Router();

disciplineCategoryRouter.get(
    "",
    authenticateToken,
    listDisciplineCategoriesController
);

disciplineCategoryRouter.post(
    "",
    authenticateToken,
    (req, res, next) => {
        res.locals.requirements = {
            master: false,
            adminAndBosch: false,
        };
        return next();
    },
    buildRequirements,
    createDisciplineCategoryController
);

disciplineCategoryRouter.patch(
    "/:idDisciplineCategory",
    authenticateToken,
    (req, res, next) => {
        res.locals.requirements = {
            master: false,
            adminAndBosch: false,
        };
        return next();
    },
    buildRequirements,
    updateDisciplineCategoryController
);

export default disciplineCategoryRouter;