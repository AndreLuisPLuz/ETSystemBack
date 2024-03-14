import { Router } from "express";
import { createInstitutionController,
    listIntitutionsController,
    retrieveInstitutionController
} from "../controllers";

const institutionRouter = Router();

institutionRouter.post("", createInstitutionController);
institutionRouter.get("", listIntitutionsController);
institutionRouter.get("/fetch?:id", retrieveInstitutionController);

export default institutionRouter;