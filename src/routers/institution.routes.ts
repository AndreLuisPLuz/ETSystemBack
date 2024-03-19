import { Router } from "express";
import {
    createInstitutionController,
    listIntitutionsController
} from "../controllers";
import {
    authenticateToken,
    buildRequirements
} from "../middlewares";

const institutionRouter = Router();

institutionRouter.get(
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
    listIntitutionsController
);

institutionRouter.post(
    "",
    authenticateToken,
    (req, res, next) => {
        res.locals.requirements = {
            master: false
        };
        return next();
    },
    buildRequirements,
    createInstitutionController
);

export default institutionRouter;