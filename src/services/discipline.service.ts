import { ICreateDisciplinePayload } from "../contracts/discipline.interface";
import { DisciplineDTO, DisciplineSingleDTO } from "../classes/dataTransfer/discipline.dto";
import { AppDataSource } from "../data-source";
import { Discipline, DisciplineCategory, IsBosch } from "../entities";

import { Repository } from "typeorm";
import { AppError } from "../errors";

const listDisciplinesService = async(
    isBosch: IsBosch,
    categoryName?: string
): Promise<DisciplineDTO[]> => {

    let category: DisciplineCategory | null = null;
    if (categoryName) {
        const categoryRepo = AppDataSource.getRepository(DisciplineCategory);
        category = await categoryRepo.findOneBy({name: categoryName});

        if (!category) {
            throw new AppError("Discipline category not found.", 404);
        }
    }

    const disciplineRepo = AppDataSource.getRepository(Discipline);
    let query = disciplineRepo
        .createQueryBuilder('discipline')
        .where(
            "discipline.isBosch = :isBosch",
            { isBosch: isBosch }
        );

    if (category !== null) {
        query = query
            .innerJoin("discipline.disciplineCategory", "disciplineCategory")
            .andWhere(
                "LOWER(disciplineCategory.name) = :categoryName",
                { categoryName: categoryName }
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

export {
    listDisciplinesService,
    createDisciplineService
};