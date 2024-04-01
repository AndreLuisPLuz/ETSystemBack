import { Request, Response } from "express";
import {
    createAppliedDisciplineService,
    listAppliedDisciplinesService
} from "../services";
import { Paginator } from "../classes";

const listAppliedDisciplinesController = async(req: Request, res: Response): Promise<Response> => {
    const appliedDisciplines = await listAppliedDisciplinesService(
        res.locals.isBosch,
        res.locals.accessLevel,
        res.locals.idStudent,
        String(req.query.idDiscipline),
        String(req.query.idStudentGroup),
        String(req.query.idInstructor)
    );

    const paginatedAppliedDisciplines = new Paginator(
        appliedDisciplines,
        Number(req.query.page),
        Number(req.query.limit)
    );

    return res.status(200).json(paginatedAppliedDisciplines);
};

const createAppliedDisciplineController = async(req: Request, res: Response): Promise<Response> => {
    const appliedDiscipline = await createAppliedDisciplineService(
        req.body,
        res.locals.isBosch
    );
    return res.status(201).json(appliedDiscipline);
};

export {
    createAppliedDisciplineController,
    listAppliedDisciplinesController
};