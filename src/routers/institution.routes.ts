import { Router } from "express";
import {
    createInstitutionController,
    listIntitutionsController,
    updateInstitutionController,
    softDeleteInstitutionController
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

institutionRouter.patch(
    "/:idInstitution",
    authenticateToken,
    (req, res, next) => {
        res.locals.requirements = {
            master: false
        };
        return next();
    },
    buildRequirements,
    updateInstitutionController
);

institutionRouter.delete(
    "/:idInstitution",
    authenticateToken,
    (req, res, next) => {
        res.locals.requirements = {
            master: false
        };
        return next();
    },
    buildRequirements,
    softDeleteInstitutionController
);

export default institutionRouter;