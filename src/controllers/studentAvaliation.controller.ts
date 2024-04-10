import { Request, Response } from "express";
import {
    listStudentAvaliationsService,
    createStudentAvaliationService
} from "../services";

const listAppliedDisciplinesController = async(req: Request, res: Response): Promise<Response> => {
    const studentAvaliations = await listStudentAvaliationsService(
        res.locals.isBosch,
        res.locals.accessLevel,
        req.params.idAppliedDiscipline,
        req.params.idStudent
    );

    return res.status(200).json();
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
    listAppliedDisciplinesController,
    createStudentAvaliationController
};