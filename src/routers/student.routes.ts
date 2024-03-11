import { Router } from "express";
import {
    createStudentService, 
    listStudentsService, 
    retrieveStudentService 
} from "../services";

const studentRouter = Router();

studentRouter.post("", createStudentService);
studentRouter.get("", listStudentsService);
studentRouter.get("/:idStudent", retrieveStudentService);

export default studentRouter;