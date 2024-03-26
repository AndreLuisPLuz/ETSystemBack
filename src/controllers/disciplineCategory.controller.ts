import { Request, Response } from "express";
import {
    createDisciplineCategoryService,
    listDisciplineCategoriesService,
    updateDisciplineCategoryService
} from "../services";
import { DisciplineCategoryDTO, Paginator } from "../classes";

const listDisciplineCategoriesController = async(req: Request, res: Response): Promise<Response> => {
    const categories: DisciplineCategoryDTO[] = await listDisciplineCategoriesService();
    const paginatedCategories: Paginator<DisciplineCategoryDTO> = new Paginator(
        categories,
        Number(req.query.page),
        Number(req.query.limit)
    );

    return res.status(200).json(paginatedCategories);
};

const createDisciplineCategoryController = async(req: Request, res: Response): Promise<Response> => {
    const disciplineCategory: DisciplineCategoryDTO = await createDisciplineCategoryService(req.body);
    return res.status(201).json(disciplineCategory);
};

const updateDisciplineCategoryController = async(req: Request, res: Response): Promise<Response> => {
    const disciplineCategory: DisciplineCategoryDTO = await updateDisciplineCategoryService(
        String(req.params.idDisciplineCategory),
        req.body
    );
    return res.status(200).json(disciplineCategory);
};

export {
    createDisciplineCategoryController,
    listDisciplineCategoriesController,
    updateDisciplineCategoryController
};