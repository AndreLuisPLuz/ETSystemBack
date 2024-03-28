import { Request, Response } from "express";
import { createAppliedDisciplineService } from "../services";
import { Paginator } from "../classes";

const createAppliedDisciplineController = async(req: Request, res: Response): Promise<Response> => {
    const appliedDiscipline = await createAppliedDisciplineService(req.body);
    return res.status(201).json(appliedDiscipline);
};

export { createAppliedDisciplineController };