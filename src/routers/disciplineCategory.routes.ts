import { Router } from "express";
import {
    createDisciplineCategoryController,
    listDisciplineCategoriesController
} from "../controllers";
import { authenticateToken, buildRequirements } from "../middlewares";

const disciplineCategoryRouter: Router = Router();

disciplineCategoryRouter.get(
    "/",
    authenticateToken,
    listDisciplineCategoriesController
);

disciplineCategoryRouter.post(
    "/",
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

export default disciplineCategoryRouter;