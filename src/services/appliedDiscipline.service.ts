import { IAppliedDisciplineCreatePayload } from "../contracts";
import { AppliedDisciplineDTO } from "../classes";
import { AppDataSource } from "../data-source";
import {
    AppliedDiscipline,
    Discipline,
    Instructor,
    IsBosch,
    Student,
    StudentGroup
} from "../entities";

import { Repository, SelectQueryBuilder } from "typeorm";
import { AppError } from "../errors";

const listAppliedDisciplinesService = async(
    isBosch: IsBosch,
    accessLevel: number,
    idStudent: string,
    idDiscipline?: string,
    idStudentGroup?: string,
    idInstructor?: string,
): Promise<AppliedDisciplineDTO[]> => {

    const appliedDisciplineRepo = AppDataSource.getRepository(AppliedDiscipline);
    let query = appliedDisciplineRepo
        .createQueryBuilder("applied_discipline")
        .innerJoinAndSelect("applied_discipline.discipline", "discipline")
        .innerJoinAndSelect("applied_discipline.studentGroup", "student_group")
        .innerJoinAndSelect("applied_discipline.instructor", "instructor")
        .where("1 = 1");

    if (isBosch == IsBosch.FALSE) {
        query = query.andWhere(
            "applied_discipline.isBosch = :isBosch",
            { isBosch: isBosch }
        );
    }
    
    if (idDiscipline != "undefined") {
        query = query.andWhere(
            "applied_discipline.[disciplineIdDiscipline] = :idDiscipline",
            { idDiscipline: idDiscipline }
        );
    }

    if (idStudentGroup != "undefined") {        
        query = query.andWhere(
            "applied_discipline.[studentGroupIdStudentGroup] = :idStudentGroup",
            { idStudentGroup: idStudentGroup }
        );
    }

    if (idInstructor != "undefined") {
        query = query.andWhere(
            "applied_discipline.[instructorInstructorId] = :idInstructor",
            { idInstructor: idInstructor }
        );
    }

    if (accessLevel == 1) {
        const studentRepo = AppDataSource.getRepository(Student);
        const student = await studentRepo.findOne({
            where: {
                idStudent: idStudent
            },
            relations: {
                studentGroup: true
            }
        });
    
        if (!student) {
            throw new AppError("Student not found.", 404);
        }
    
        query = query
            .andWhere(
                "student_group.idStudentGroup = :idStudentGroup",
                { idStudentGroup: student.studentGroup.idStudentGroup }
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