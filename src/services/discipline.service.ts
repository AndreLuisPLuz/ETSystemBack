import { ICreateDisciplinePayload } from "../contracts/discipline.interface";
import { DisciplineDTO, DisciplineSingleDTO } from "../classes/dataTransfer/discipline.dto";
import { AppDataSource } from "../data-source";
import { Discipline, DisciplineCategory } from "../entities";

import { Repository } from "typeorm";
import { AppError } from "../errors";

const createDisciplineService = async(payload: ICreateDisciplinePayload): Promise<DisciplineSingleDTO> => {
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
        ...payload
    });

    await disciplineRepo.save(discipline);
    return new DisciplineSingleDTO(discipline);
};

export { createDisciplineService };