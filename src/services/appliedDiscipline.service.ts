import { IAppliedDisciplineCreatePayload } from "../contracts";
import { AppliedDisciplineDTO } from "../classes";
import { AppDataSource } from "../data-source";
import { AppliedDiscipline, Discipline, Instructor, StudentGroup } from "../entities";

import { Repository, SelectQueryBuilder } from "typeorm";
import { AppError } from "../errors";

const createAppliedDisciplineService = async(
    payload: IAppliedDisciplineCreatePayload
): Promise<AppliedDisciplineDTO> => {

    const disciplineRepo = AppDataSource.getRepository(Discipline);
    const discipline = await disciplineRepo.findOneBy({
        idDiscipline: payload.idDiscipline
    });

    if (!discipline) {
        throw new AppError("Discipline not found.", 404);
    }

    const studentGroupRepo = AppDataSource.getRepository(StudentGroup);
    const studentGroup = await studentGroupRepo.findOneBy({
        idStudentGroup: payload.idStudentGroup
    });

    if (!studentGroup) {
        throw new AppError("Student group not found.", 404);
    }

    const instructorRepo = AppDataSource.getRepository(Instructor);
    const instructor = await instructorRepo.findOneBy({
        instructorId: payload.idInstructor
    });

    if (!instructor) {
        throw new AppError("Instructor not found.", 404);
    }

    const appliedDisciplineRepo = AppDataSource.getRepository(AppliedDiscipline);
    const appliedDiscipline = appliedDisciplineRepo.create({
        ...payload,
        discipline: discipline,
        studentGroup: studentGroup,
        instructor: instructor
    });

    await appliedDisciplineRepo.save(appliedDiscipline);

    return new AppliedDisciplineDTO(appliedDiscipline);
};

export { createAppliedDisciplineService };