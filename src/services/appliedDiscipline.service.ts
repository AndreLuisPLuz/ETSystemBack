import {
    IAppliedDisciplineCreatePayload,
    IAppliedDisciplineUpdatePayload
} from "../contracts";
import { AppliedDisciplineDTO, AccessLevel, AppliedDisciplineSingleDTO } from "../classes";
import { AppDataSource } from "../data-source";
import {
    AppliedDiscipline,
    Discipline,
    Instructor,
    IsBosch,
    Student,
    StudentGroup
} from "../entities";

import { AppError } from "../errors";

const listAppliedDisciplinesService = async(
    isBosch: IsBosch,
    accessLevel: AccessLevel,
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

    if (accessLevel == AccessLevel.STUDENT) {
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

const retrieveAppliedDisciplineService = async(
    isBosch: IsBosch,
    idAppliedDiscipline: string
): Promise<AppliedDisciplineSingleDTO> => {

    const appliedDisciplineRepo = AppDataSource.getRepository(AppliedDiscipline);
    const appliedDiscipline = await appliedDisciplineRepo.findOne({
        where: {
            idAppliedDiscipline: idAppliedDiscipline
        },
        relations: [
            "competenceGroups",
            "competenceGroups.competences",
            "studentGroup",
            "instructor",
            "instructor.user",
            "instructor.user.institution",
            "discipline"
        ]
    });

    if (!appliedDiscipline) {
        throw new AppError("Applied discipline not found.", 404);
    }

    // Institution check does NOT raise a 403 FORBIDDEN error since we
    // don't want an attacker to be able to tell that this discipline
    // exists.
    if (appliedDiscipline.discipline.isBosch != isBosch) {
        throw new AppError("Applied discipline not found.", 404);
    }

    return new AppliedDisciplineSingleDTO(appliedDiscipline);
};

const updateAppliedDisciplineService = async(
    idAppliedDiscipline: string,
    accessLevel: AccessLevel,
    payload: IAppliedDisciplineUpdatePayload
): Promise<AppliedDisciplineDTO> => {

    type UpdatePayload = Omit<IAppliedDisciplineUpdatePayload, 'idInstructor'>;

    type InstructorUpdatePayload = Omit<
        IAppliedDisciplineUpdatePayload,
        'idInstructor' | 'period' | 'totalHours'
    > & {
        instructor: Instructor
    };

    let updateFields: UpdatePayload | InstructorUpdatePayload;

    if (accessLevel == AccessLevel.INSTRUCTOR) {
        const instructorRepo = AppDataSource.getRepository(Instructor);
        const instructor = await instructorRepo.findOneBy({instructorId: payload.idInstructor});

        if (!instructor) {
            throw new AppError("Instructor not found.", 404);
        }

        updateFields = {
            instructor: instructor,
            isComplete: payload.isComplete
        };
    } else {
        updateFields = {
            period: payload.period,
            totalHours: payload.totalHours,
            isComplete: payload.isComplete
        };
    }

    const appliedDisciplineRepo = AppDataSource.getRepository(AppliedDiscipline);
    const result = await appliedDisciplineRepo.update(
        {idAppliedDiscipline: idAppliedDiscipline},
        {...updateFields}
    );

    if (result.affected == 0 || result.affected === undefined) {
        throw new AppError("Applied discipline not found.", 404);
    }

    const updatedAppliedDiscipline = await appliedDisciplineRepo.findOneOrFail({
        where: {
            idAppliedDiscipline: idAppliedDiscipline
        },
        relations: {
            discipline: true,
            studentGroup: true,
            instructor: true
        }
    });

    return new AppliedDisciplineDTO(updatedAppliedDiscipline);
};

const softDeleteAppliedDisciplineService = async(
    isBosch: IsBosch,
    accessLevel: AccessLevel,
    idAppliedDiscipline: string
): Promise<void> => {

    const appliedDisciplineRepo = AppDataSource.getRepository(AppliedDiscipline);

    if (accessLevel != AccessLevel.MASTER) {
        const appliedDiscipline = await appliedDisciplineRepo.findOne({
            where: {
                idAppliedDiscipline: idAppliedDiscipline
            },
            relations: {
                discipline: true
            }
        });

        // Institution check does NOT raise a 403 FORBIDDEN error since we
        // don't want an attacker to be able to tell that this discipline
        // exists.
        if (!appliedDiscipline || appliedDiscipline.discipline.isBosch != isBosch) {
            throw new AppError("Applied discipline not found.", 404);
        }
    }

    const result = await appliedDisciplineRepo.softDelete({
        idAppliedDiscipline: idAppliedDiscipline
    });

    if (result.affected == 0 || result.affected === undefined) {
        throw new AppError("Applied discipline not found.", 404);
    }
};

export {
    createAppliedDisciplineService,
    listAppliedDisciplinesService,
    retrieveAppliedDisciplineService,
    updateAppliedDisciplineService,
    softDeleteAppliedDisciplineService
};