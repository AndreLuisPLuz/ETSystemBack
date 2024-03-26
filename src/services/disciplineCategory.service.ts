import { IDisciplineCategoryCreatePayload } from "../contracts";
import { DisciplineCategoryDTO } from "../classes";
import { DisciplineCategory } from "../entities";
import { AppDataSource } from "../data-source";

import { Repository, UpdateResult } from "typeorm";
import { AppError } from "../errors";

const listDisciplineCategoriesService = async(): Promise<DisciplineCategoryDTO[]> => {
    const disciplineCategoryRepo: Repository<DisciplineCategory> = AppDataSource
        .getRepository(DisciplineCategory);
    const categories: DisciplineCategory[] = await disciplineCategoryRepo.find();

    const categoriesShown: DisciplineCategoryDTO[] = categories.map(
        (category) => new DisciplineCategoryDTO(category)
    );

    return categoriesShown;
};

const createDisciplineCategoryService = async(payload: IDisciplineCategoryCreatePayload):
        Promise<DisciplineCategoryDTO> => {
    const disciplineCategoryRepo: Repository<DisciplineCategory> = AppDataSource
        .getRepository(DisciplineCategory);
    const disciplineCategory: DisciplineCategory = disciplineCategoryRepo.create(payload);

    await disciplineCategoryRepo.save(disciplineCategory);

    return new DisciplineCategoryDTO(disciplineCategory);
};

const updateDisciplineCategoryService = async(
        idDisciplineCategory: string,
        payload: IDisciplineCategoryCreatePayload
)       :Promise<DisciplineCategoryDTO> => {
    const disciplineCategoryRepo: Repository<DisciplineCategory> = AppDataSource
        .getRepository(DisciplineCategory);
    const result: UpdateResult = await disciplineCategoryRepo.update(
        {idDisciplineCategory: idDisciplineCategory},
        {...payload}
    );

    if (result.affected == 0 || result.affected === undefined) {
        throw new AppError("Discipline category not found.", 404);
    }

    const updatedDisciplineCategory: DisciplineCategory = await disciplineCategoryRepo
        .findOneByOrFail({
            idDisciplineCategory: idDisciplineCategory
        });
    return new DisciplineCategoryDTO(updatedDisciplineCategory);
}

export {
    createDisciplineCategoryService,
    listDisciplineCategoriesService,
    updateDisciplineCategoryService
};