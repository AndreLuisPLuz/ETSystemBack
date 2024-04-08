import { Router } from "express";
import { createCompetenceController } from "../controllers";
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

export default competenceRouter;