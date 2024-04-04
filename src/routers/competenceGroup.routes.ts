import { Router } from "express";
import {
    createCompetenceGroupController,
    updateCompetenceGroupController,
    softDeleteCompetenceGroupController
} from "../controllers";
import { authenticateToken, buildRequirements } from "../middlewares";

const competenceGroupRouter = Router();

competenceGroupRouter.post(
    "/appliedDiscipline/:idAppliedDiscipline",
    authenticateToken,
    (req, res, next) => {
        res.locals.requirements = {
            admin: false,
            instructor: false
        };
        return next();
    },
    buildRequirements,
    createCompetenceGroupController
);

competenceGroupRouter.patch(
    "/:idCompetenceGroup",
    authenticateToken,
    (req, res, next) => {
        res.locals.requirements = {
            admin: false,
            instructor: false
        };
        return next();
    },
    buildRequirements,
    updateCompetenceGroupController
);

competenceGroupRouter.delete(
    "/:idCompetenceGroup",
    authenticateToken,
    (req, res, next) => {
        res.locals.requirements = {
            admin: false,
            instructor: false
        };
        return next();
    },
    buildRequirements,
    softDeleteCompetenceGroupController
);

export default competenceGroupRouter;