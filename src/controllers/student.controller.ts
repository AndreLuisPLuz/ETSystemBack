import { Request, Response } from "express";
import { 
    createStudentService, 
    listStudentsService, 
    retrieveStudentService 
} from "../services";
import { Student } from "../entities";

const createStudentController = async(req: Request, res: Response): Promise<Response> => {
    const student: Student = await createStudentService(req.body);
    return res.status(201).json(student);
};

const listStudentsController = async(req: Request, res: Response): Promise<Response> => {
    const students: Student[] = await listStudentsService();
    return res.status(200).json(students);
}

const retrieveStudentController = async(req: Request, res: Response): Promise<Response> => {
    const student: Student = await retrieveStudentService(req.params.id);
    return res.status(200).json(student);
}

export {
    createStudentController,
    listStudentsController,
    retrieveStudentController
}