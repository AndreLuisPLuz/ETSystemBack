import { Router } from "express";
import { createCompetenceGroupController } from "../controllers";
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

export default competenceGroupRouter;