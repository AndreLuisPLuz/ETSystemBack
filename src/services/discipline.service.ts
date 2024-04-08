import { ICreateDisciplinePayload } from "../contracts/discipline.interface";
import { DisciplineDTO } from "../classes/dataTransfer/discipline.dto";
import { AppDataSource } from "../data-source";
import { Discipline, DisciplineCategory, IsBosch } from "../entities";

import { Repository, UpdateQueryBuilder, UpdateResult } from "typeorm";
import { AppError } from "../errors";
import { set } from "zod";

const listDisciplinesService = async(
    isBosch: IsBosch,
    categoryName?: string
): Promise<DisciplineDTO[]> => {

    const disciplineRepo = AppDataSource.getRepository(Discipline);
    let query = disciplineRepo
        .createQueryBuilder('discipline')
        .innerJoinAndSelect("discipline.disciplineCategory", "disciplineCategory")
        .where(
            "discipline.isBosch = :isBosch",
            { isBosch: isBosch }
        );

    if (categoryName) {
        query = query
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
        :Promise<DisciplineDTO> => {
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
    return new DisciplineDTO(discipline);
};

const updateDisciplineService = async(
    idDiscipline: string,
    payload: ICreateDisciplinePayload
): Promise<DisciplineDTO> => {

    const setFields: Record<string, any> = {
        name: payload.name
    };

    if (payload.idCategory) {
        setFields.disciplineCategory = {idDisciplineCategory: payload.idCategory};
    }

    const query: UpdateQueryBuilder<Discipline> = AppDataSource
        .createQueryBuilder()
        .update('discipline')
        .set(setFields)
        .where(
            "idDiscipline = :idDiscipline",
            { idDiscipline: idDiscipline }
        );

    const result: UpdateResult = await query.execute();

    if (result.affected == 0 || result.affected === undefined) {
        throw new AppError("Discipline not found.", 404);
    }

    const disciplineRepo = AppDataSource.getRepository(Discipline);
    const updatedDiscipline = await disciplineRepo.findOneOrFail({
        where: {
            idDiscipline: idDiscipline
        },
        relations: {
            disciplineCategory: true
        }
    });

    return new DisciplineDTO(updatedDiscipline);
};

const softDeleteDisciplineService = async(idDiscipline: string): Promise<void> => {
    const disciplineRepo = AppDataSource.getRepository(Discipline);
    const result: UpdateResult = await disciplineRepo.softDelete({
        idDiscipline: idDiscipline
    });

    if (result.affected == 0 || result.affected === undefined) {
        throw new AppError("Discipline not found.", 404);
    }
}

export {
    listDisciplinesService,
    createDisciplineService,
    updateDisciplineService,
    softDeleteDisciplineService
};