import { Request, Response } from "express";
import { createDisciplineCategoryService } from "../services";
import { DisciplineCategoryDTO } from "../classes";

const createDisciplineCategoryController = async(req: Request, res: Response) => {
    const disciplineCategory: DisciplineCategoryDTO = await createDisciplineCategoryService(req.body);
    return res.status(201).json(disciplineCategory);
};

export { createDisciplineCategoryController };