import { Router } from "express";
import {
    createStudentController, 
    listStudentsController, 
    retrieveStudentController 
} from "../controllers";

const studentRouter = Router();

studentRouter.post("", createStudentController);
studentRouter.get("", listStudentsController);
studentRouter.get("/:id", retrieveStudentController);

export default studentRouter;