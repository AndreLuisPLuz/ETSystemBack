import { Router } from "express";
import {
    createAdministratorController,
    retrieveAdministratorController
} from "../controllers";

const administratorRouter = Router();

administratorRouter.post("", createAdministratorController);
administratorRouter.get("/fetch?:id", retrieveAdministratorController);

export default administratorRouter;