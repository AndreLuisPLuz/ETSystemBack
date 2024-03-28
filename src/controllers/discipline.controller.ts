import { Request, Response } from "express";
import {
    listDisciplinesService,
    createDisciplineService,
    updateDisciplineService,
    softDeleteDisciplineService
} from "../services";
import { DisciplineDTO, DisciplineSingleDTO, Paginator } from "../classes";

const listDisciplinesController = async(req: Request, res: Response): Promise<Response> => {
    // TS will yield a string from String(undefined), so we need to actually
    // tell that it should stay undefined. TS also won't accept the req.query
    // attribute outright without this. 
    const category = (req.query.category != undefined)
        ? String(req.query.category)
        : undefined;

    const disciplines: DisciplineDTO[] = await listDisciplinesService(
        res.locals.isBosch,
        category
    );

    const paginatedDisciplines: Paginator<DisciplineDTO> = new Paginator(
        disciplines,
        Number(req.query.page),
        Number(req.query.limit)
    );

    return res.status(200).json(paginatedDisciplines);
};

const createDisciplineController = async(req: Request, res: Response): Promise<Response> => {
    const discipline: DisciplineSingleDTO = await createDisciplineService(
        req.body,
        res.locals.isBosch
    );
    return res.status(201).json(discipline);
};

const updateDisciplineController = async(req: Request, res: Response): Promise<Response> => {
    const discipline: DisciplineSingleDTO = await updateDisciplineService(
        req.params.idDiscipline,
        req.body
    );
    return res.status(200).json(discipline);
};

const softDeleteDisciplineController = async(req: Request, res: Response): Promise<Response> => {
    await softDeleteDisciplineService(req.params.idDiscipline);
    return res.status(204).json();
};

export {
    listDisciplinesController,
    createDisciplineController,
    updateDisciplineController,
    softDeleteDisciplineController
};