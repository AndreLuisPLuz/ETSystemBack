import { Request, Response } from "express";
import {
    listStudentAvaliationsByStudentService,
    createStudentAvaliationService
} from "../services";

const listStudentAvaliationsByStudentController = async(req: Request, res: Response): Promise<Response> => {
    const studentAvaliations = await listStudentAvaliationsByStudentService(
        res.locals.isBosch,
        res.locals.accessLevel,
        req.params.idAppliedDiscipline,
        req.params.idStudent
    );

    return res.status(200).json(studentAvaliations);
}

const createStudentAvaliationController = async(req: Request, res: Response): Promise<Response> => {
    await createStudentAvaliationService(
        req.params.idAppliedDiscipline,
        req.params.idStudent,
        req.body
    );

    return res.status(201).json();
}

export {
    listStudentAvaliationsByStudentController,
    createStudentAvaliationController
};