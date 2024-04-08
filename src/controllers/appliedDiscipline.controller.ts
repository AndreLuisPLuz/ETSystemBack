import { Request, Response } from "express";
import {
    createAppliedDisciplineService,
    listAppliedDisciplinesService,
    retrieveAppliedDisciplineService,
    updateAppliedDisciplineService,
    softDeleteAppliedDisciplineService
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

const retrieveAppliedDisciplineController = async(req: Request, res: Response): Promise<Response> => {
    const appliedDiscipline = await retrieveAppliedDisciplineService(
        res.locals.isBosch,
        req.params.idAppliedDiscipline
    );
    return res.status(200).json(appliedDiscipline);
};

const updateAppliedDisciplineController = async(req: Request, res: Response): Promise<Response> => {
    const appliedDiscipline = await updateAppliedDisciplineService(
        req.params.idAppliedDiscipline,
        res.locals.accessLevel,
        req.body
    );
    return res.status(200).json(appliedDiscipline);
};

const softDeleteAppliedDisciplineController = async(req: Request, res: Response): Promise<Response> => {
    await softDeleteAppliedDisciplineService(
        res.locals.isBosch,
        res.locals.accessLevel,
        req.params.idAppliedDiscipline
    );
    return res.status(204).json();
};

export {
    createAppliedDisciplineController,
    listAppliedDisciplinesController,
    retrieveAppliedDisciplineController,
    updateAppliedDisciplineController,
    softDeleteAppliedDisciplineController
};