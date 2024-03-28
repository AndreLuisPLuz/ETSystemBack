import { Request, Response } from "express";
import {
    listDisciplinesService,
    createDisciplineService
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

export {
    listDisciplinesController,
    createDisciplineController
};