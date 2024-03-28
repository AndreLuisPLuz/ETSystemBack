import { ICreateDisciplinePayload } from "../contracts/discipline.interface";
import { DisciplineDTO, DisciplineSingleDTO } from "../classes/dataTransfer/discipline.dto";
import { AppDataSource } from "../data-source";
import { Discipline, DisciplineCategory, IsBosch } from "../entities";

import { Repository, UpdateResult } from "typeorm";
import { AppError } from "../errors";

const listDisciplinesService = async(
    isBosch: IsBosch,
    categoryName?: string
): Promise<DisciplineDTO[]> => {

    const disciplineRepo = AppDataSource.getRepository(Discipline);
    let query = disciplineRepo
        .createQueryBuilder('discipline')
        .where(
            "discipline.isBosch = :isBosch",
            { isBosch: isBosch }
        );

    if (categoryName) {
        query = query
            .innerJoin("discipline.disciplineCategory", "disciplineCategory")
            .andWhere(
                "LOWER(disciplineCategory.name) = :categoryName",
                { categoryName: categoryName?.toLowerCase() }
            );
    }

    const disciplines: Discipline[] = await query.getMany();
    const disciplinesShown: DisciplineDTO[] = disciplines.map(
        (discipline) => new DisciplineDTO(discipline)
    );

    return disciplinesShown;
};

const createDisciplineService = async(payload: ICreateDisciplinePayload, isBosch: IsBosch)
        :Promise<DisciplineSingleDTO> => {
    const categoryRepo: Repository<DisciplineCategory> = AppDataSource
        .getRepository(DisciplineCategory);

    const category: DisciplineCategory | null = await categoryRepo.findOneBy({
        idDisciplineCategory: payload.idCategory
    });

    if (!category) {
        throw new AppError("Discipline category not found.", 404);
    }

    const disciplineRepo: Repository<Discipline> = AppDataSource.getRepository(Discipline);
    const discipline: Discipline = disciplineRepo.create({
        disciplineCategory: category,
        isBosch: isBosch,
        ...payload
    });

    await disciplineRepo.save(discipline);
    return new DisciplineSingleDTO(discipline);
};

const updateDisciplineService = async(
    idDiscipline: string,
    payload: ICreateDisciplinePayload
): Promise<DisciplineSingleDTO> => {

    const categoryRepo: Repository<DisciplineCategory> = AppDataSource
        .getRepository(DisciplineCategory);

    const category: DisciplineCategory | null = await categoryRepo.findOneBy({
        idDisciplineCategory: payload.idCategory
    });

    if (!category) {
        throw new AppError("Discipline category not found.", 404);
    }

    const disciplineRepo = AppDataSource.getRepository(Discipline);
    const result: UpdateResult = await disciplineRepo.update(
        {
            idDiscipline: idDiscipline,
            disciplineCategory: category
        },
        { ...payload }
    );

    if (result.affected == 0 || result.affected === undefined) {
        throw new AppError("Discipline not found.", 404);
    }

    const updatedDiscipline: Discipline = disciplineRepo.create({
        idDiscipline: idDiscipline,
        disciplineCategory: category,
        ...payload
    });

    return new DisciplineSingleDTO(updatedDiscipline);
};

export {
    listDisciplinesService,
    createDisciplineService,
    updateDisciplineService
};