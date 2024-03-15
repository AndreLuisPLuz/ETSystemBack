import { Router } from "express";
import {
    createInstitutionController,
    listIntitutionsController,
    retrieveInstitutionController
} from "../controllers";

const institutionRouter = Router();

institutionRouter.get("", listIntitutionsController);
institutionRouter.post("", createInstitutionController);

export default institutionRouter;