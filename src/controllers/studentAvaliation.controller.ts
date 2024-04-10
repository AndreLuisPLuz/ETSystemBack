import { Request, Response } from "express";
import {
    listStudentAvaliationsService,
    listStudentAvaliationsByStudentService,
    createStudentAvaliationService,
    softDeleteStudentAvaliationService,
} from "../services";

const listStudentAvaliationsController = async(
    req: Request,
    res: Response
): Promise<Response> => {

    const studentAvaliations = await listStudentAvaliationsService(
        res.locals.isBosch,
        req.params.idAppliedDiscipline
    );

    return res.status(200).json(studentAvaliations);
}

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

const softDeleteStudentAvaliationController = async(req: Request, res: Response): Promise<Response> => {
    await softDeleteStudentAvaliationService(
        req.params.idStudentAvaliation
    );

    return res.status(204).json();
}

export {
    listStudentAvaliationsController,
    listStudentAvaliationsByStudentController,
    createStudentAvaliationController,
    softDeleteStudentAvaliationController
};