import { IDisciplineCategoryCreatePayload } from "../contracts";
import { DisciplineCategoryDTO } from "../classes";
import { DisciplineCategory } from "../entities";
import { AppDataSource } from "../data-source";

import { Repository } from "typeorm";
import { AppError } from "../errors";

const createDisciplineCategoryService = async(payload: IDisciplineCategoryCreatePayload) => {
    const disciplineCategoryRepo: Repository<DisciplineCategory> = AppDataSource.getRepository(DisciplineCategory);
    const disciplineCategory: DisciplineCategory = disciplineCategoryRepo.create(payload);

    await disciplineCategoryRepo.save(disciplineCategory);

    return new DisciplineCategoryDTO(disciplineCategory);
};

export { createDisciplineCategoryService };