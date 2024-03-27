import { Request, Response } from "express";
import { createDisciplineService } from "../services";
import { DisciplineDTO, DisciplineSingleDTO } from "../classes/dataTransfer/discipline.dto";

const createDisciplineController = async(req: Request, res: Response): Promise<Response> => {
    const discipline: DisciplineSingleDTO = await createDisciplineService(
        req.body,
        res.locals.isBosch
    );
    return res.status(201).json(discipline);
};

export { createDisciplineController };