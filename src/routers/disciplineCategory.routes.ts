import { Router } from "express";
import {
    createDisciplineCategoryController,
    listDisciplineCategoriesController,
    updateDisciplineCategoryController,
    softDeleteDisciplineCategoryController
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

disciplineCategoryRouter.delete(
    "/:idDisciplineCategory",
    authenticateToken,
    (req, res, next) => {
        res.locals.requirements = {
            master: false
        };
        return next();
    },
    buildRequirements,
    softDeleteDisciplineCategoryController
);

export default disciplineCategoryRouter;