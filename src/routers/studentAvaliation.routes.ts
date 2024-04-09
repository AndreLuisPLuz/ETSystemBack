import { Router } from "express";
import { createStudentAvaliationController } from "../controllers";
import { authenticateToken, buildRequirements } from "../middlewares";

const studentRouter = Router();

studentRouter.post(
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
)