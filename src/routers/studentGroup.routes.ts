import { Router } from "express";
import { 
    createStudentGroupController,
    listStudentGroupsController,
    retrieveStudentGroupController
} from "../controllers";

const studentGroupRouter = Router();

studentGroupRouter.post("", createStudentGroupController);
studentGroupRouter.get("", listStudentGroupsController);
studentGroupRouter.get("/:id", retrieveStudentGroupController);

export default studentGroupRouter;