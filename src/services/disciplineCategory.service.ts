import { IDisciplineCategoryCreatePayload } from "../contracts";
import { DisciplineCategoryDTO } from "../classes";
import { DisciplineCategory } from "../entities";
import { AppDataSource } from "../data-source";

import { Repository } from "typeorm";
import { AppError } from "../errors";

const listDisciplineCategoriesService = async(): Promise<DisciplineCategoryDTO[]> => {
    const disciplineCategoryRepo: Repository<DisciplineCategory> = AppDataSource.getRepository(DisciplineCategory);
    const categories: DisciplineCategory[] = await disciplineCategoryRepo.find();

    const categoriesShown: DisciplineCategoryDTO[] = categories.map((category) => new DisciplineCategoryDTO(category));

    return categoriesShown;
};

const createDisciplineCategoryService = async(payload: IDisciplineCategoryCreatePayload): Promise<DisciplineCategoryDTO> => {
    const disciplineCategoryRepo: Repository<DisciplineCategory> = AppDataSource.getRepository(DisciplineCategory);
    const disciplineCategory: DisciplineCategory = disciplineCategoryRepo.create(payload);

    await disciplineCategoryRepo.save(disciplineCategory);

    return new DisciplineCategoryDTO(disciplineCategory);
};

export {
    createDisciplineCategoryService,
    listDisciplineCategoriesService
};