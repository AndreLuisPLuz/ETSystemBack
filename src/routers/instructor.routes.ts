import { Router } from "express";
import { listInstructorsController } from "../controllers";
import { authenticateToken, buildRequirements } from "../middlewares";

const instructorsRouter = Router();

instructorsRouter.get(
    "",
    authenticateToken,
    (req, res, next) => {
        res.locals.requirements = {
            admin: false
        };
        return next();
    },
    buildRequirements,
    listInstructorsController
)

export default instructorsRouter;