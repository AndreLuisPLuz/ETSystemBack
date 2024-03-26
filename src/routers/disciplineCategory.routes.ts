import { Router } from "express";
import { createDisciplineCategoryController } from "../controllers";
import { authenticateToken, buildRequirements } from "../middlewares";

const disciplineCategoryRouter: Router = Router();

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