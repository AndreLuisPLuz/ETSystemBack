import { IAppliedDisciplineCreatePayload } from "../contracts";
import { AppliedDisciplineDTO } from "../classes";
import { AppDataSource } from "../data-source";
import {
    AppliedDiscipline,
    Discipline,
    Instructor,
    IsBosch,
    StudentGroup
} from "../entities";

import { Repository, SelectQueryBuilder } from "typeorm";
import { AppError } from "../errors";

const listAppliedDisciplinesService = async(
    isBosch: IsBosch,
    idDiscipline?: string,
    idStudentGroup?: string,
    idInstructor?: string,
): Promise<AppliedDisciplineDTO[]> => {

    const appliedDisciplineRepo = AppDataSource.getRepository(AppliedDiscipline);
    let query = appliedDisciplineRepo
        .createQueryBuilder("appliedDiscipline")
        .where(
            "appliedDiscipline.isBosch = :isBosch",
            { isBosch: isBosch }
        );
    
    if (idDiscipline != "undefined") {
        query = query.andWhere(
            "appliedDiscipline.[disciplineIdDiscipline] = :idDiscipline",
            { idDiscipline: idDiscipline }
        );
    }

    if (idStudentGroup != "undefined") {
        query = query.andWhere(
            "appliedDiscipline.[studentGroupIdStudentGroup] = :idStudentGroup",
            { idStudentGroup: idStudentGroup }
        );
    }

    if (idInstructor != "undefined") {
        query = query.andWhere(
            "appliedDiscipline.[instructorInstructorId] = :idInstructor",
            { idInstructor: idInstructor }
        );
    }

    const appliedDisciplines = await query.getMany();
    const appliedDisciplinesShown = appliedDisciplines.map(
        (appliedDiscipline) => new AppliedDisciplineDTO(appliedDiscipline)
    );

    return appliedDisciplinesShown
};

const createAppliedDisciplineService = async(
    payload: IAppliedDisciplineCreatePayload,
    isBosch: IsBosch
): Promise<AppliedDisciplineDTO> => {

    const disciplineRepo = AppDataSource.getRepository(Discipline);
    const discipline = await disciplineRepo.findOneBy({
        idDiscipline: payload.idDiscipline,
        isBosch: isBosch
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

export {
    createAppliedDisciplineService,
    listAppliedDisciplinesService
};