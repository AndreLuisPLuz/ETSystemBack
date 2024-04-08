import { Router } from "express";
import {
    createCompetenceController,
    updateCompetenceController
} from "../controllers";
import { authenticateToken, buildRequirements } from "../middlewares";

const competenceRouter = Router();

competenceRouter.post(
    "/competenceGroup/:idCompetenceGroup",
    authenticateToken,
    (req, res, next) => {
        res.locals.requirements = {
            admin: false,
            instructor: false
        };
        return next();
    },
    buildRequirements,
    createCompetenceController
);

competenceRouter.patch(
    "/:idCompetence",
    authenticateToken,
    (req, res, next) => {
        res.locals.requirements = {
            admin: false,
            instructor: false
        };
        return next();
    },
    buildRequirements,
    updateCompetenceController
);

export default competenceRouter;