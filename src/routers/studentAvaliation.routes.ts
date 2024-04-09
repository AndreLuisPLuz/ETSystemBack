import { Router } from "express";
import { createStudentAvaliationController } from "../controllers";
import { authenticateToken, buildRequirements } from "../middlewares";

const studentAvaliationRouter = Router();

studentAvaliationRouter.post(
    "/appliedDiscipline/:idAppliedDiscipline/student/:idStudent",
    authenticateToken,
    (req, res, next) => {
        res.locals.requirements = {
            admin: false,
            instructor: false
        };
        return next();
    },
    buildRequirements,
    createStudentAvaliationController
);

export default studentAvaliationRouter;