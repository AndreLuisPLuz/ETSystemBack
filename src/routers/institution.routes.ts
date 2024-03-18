import { Router } from "express";
import {
    createInstitutionController,
    listIntitutionsController
} from "../controllers";
import { authenticateToken } from "../middlewares";

const institutionRouter = Router();

institutionRouter.get("", authenticateToken, listIntitutionsController);
institutionRouter.post("", authenticateToken, createInstitutionController);

export default institutionRouter;