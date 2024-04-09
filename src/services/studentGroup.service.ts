import { IStudentGroupCreatePayload, IStudentGroupUpdatePayload } from "../contracts";
import { StudentGroupDTO, StudentGroupSingleDTO } from "../classes";
import { AppDataSource } from "../data-source";
import { StudentGroup, WorkPeriod } from "../entities";

import { Repository, LessThanOrEqual, MoreThanOrEqual, UpdateResult, SelectQueryBuilder } from "typeorm";
import { AppError } from "../errors";

/**
 * Fetches the full list of student groups in the database. This return must
 * be paginated on the controller, though use of a Paginator object.
 * @param workPeriodSearch - Work period search; 'm' for mornings, 'a' for
 * afternoons.
 * @param year - Year in which the student groups must be active.
 * @returns List of all student groups found.
 */
const listStudentGroupsService = async(
    workPeriodSearch?: string,
    year?: number
): Promise<StudentGroupDTO[]> => {

    const studentGroupRepo = AppDataSource.getRepository(StudentGroup);
    let query: SelectQueryBuilder<StudentGroup> = studentGroupRepo
        .createQueryBuilder('studentGroup')
        .where("1 = 1");
    
    if (workPeriodSearch != "undefined") {
        query = query.andWhere(
            "studentGroup.workPeriod = :workPeriod",
            { workPeriod: workPeriodSearch }
        );
    }

    if (!Number.isNaN(year)) {
        query = query.andWhere(
            `:year BETWEEN YEAR(studentGroup.dateOfStart) AND COALESCE(
                YEAR(studentGroup.dateOfFinish), YEAR(studentGroup.dateOfStart) + 2
            )`,
            { year: year }
        );
    }

    const studentGroups: StudentGroup[] = await query.getMany();
    const studentGroupsShown: StudentGroupDTO[] = [];
    studentGroups.forEach((studentGroup) => {
        studentGroupsShown.push(new StudentGroupDTO(studentGroup));
    });

    return studentGroupsShown;
}

/**
 * Creates a student group and saves it to the database.
 * @param payload - The body of the requisition.
 * @returns The student group created, without any sensible data.
 */
const createStudentGroupService = async (payload: IStudentGroupCreatePayload):
        Promise<StudentGroupDTO> => {
    const studentGroupRepo: Repository<StudentGroup> = AppDataSource.getRepository(StudentGroup);
    const studentGroup: StudentGroup = studentGroupRepo.create(payload);

    return new StudentGroupDTO(await studentGroupRepo.save(studentGroup));
}

/**
 * Retrieves a student group from the database. If the application is unable to
 * find a student group matching the ID, an AppError is raised and should be
 * captured on a middleware to return the proper HTTP status code.
 * 
 * @param searchId - Unique ID of the student group to be retrieved.
 * @returns The student group retrieved, without any sensible data.
 */
const retrieveStudentGroupService = async (searchId: string):
        Promise<StudentGroupSingleDTO> => {
    const studentGroupRepo: Repository<StudentGroup> = AppDataSource.getRepository(StudentGroup);
    const studentGroup: StudentGroup | null = await studentGroupRepo.findOne({
        where: {
            idStudentGroup: searchId
        },
        relations: [
            'students',
            'students.user'
        ]
    });

    if (!studentGroup) {
        throw new AppError('Student group not found.', 404);
    }

    return new StudentGroupSingleDTO(studentGroup);
}

/**
 * Updates a student group on the database. If the application is unable to
 * find a student group matching the ID, an AppError is raised and should be
 * captured on a middleware to return the proper HTTP status code.
 * 
 * @param searchId Unique ID of the student group to be updated.
 * @param payload The body of the requisition with the update data.
 * @returns The student group updated, without any sensible data.
 */
const updateStudentGroupService = async(
        searchId: string,
        payload: IStudentGroupUpdatePayload
)       :Promise<StudentGroupSingleDTO> => {
    const studentGroupRepo: Repository<StudentGroup> = AppDataSource.getRepository(StudentGroup);
    const result: UpdateResult = await studentGroupRepo.update(
        {idStudentGroup: searchId},
        {...payload}
    );

    if (result.affected == 0 || result.affected === undefined) {
        throw new AppError('Student group not found.', 404);
    }

    const updatedStudentGroup: StudentGroup = await studentGroupRepo
        .findOneOrFail({
            where: {
                idStudentGroup: searchId
            },
            relations: [
                'students',
                'students.user'
            ]
        });

    return new StudentGroupSingleDTO(updatedStudentGroup);
};

/**
 * Performs a soft delete operation on a student group on the database,
 * meaning that the record won't be removed from the table, but merely marked
 * as deleted. If the application is unable to find a student group matching
 * the ID, an AppError is raised and should be captured on a middleware to
 * return the proper HTTP status code.
 * 
 * @param idStudentGroup Unique ID of the student group to be deleted.
 */
const softDeleteStudentGroupService = async(idStudentGroup: string): Promise<void> => {
    const studentGroupRepo: Repository<StudentGroup> = AppDataSource.getRepository(StudentGroup);
    const result: UpdateResult = await studentGroupRepo.softDelete({
        idStudentGroup: idStudentGroup
    });

    if (result.affected == 0 || result.affected === undefined) {
        throw new AppError('User not found, cannot be deleted.', 404);
    }
};

export {
    createStudentGroupService,
    listStudentGroupsService,
    retrieveStudentGroupService,
    updateStudentGroupService,
    softDeleteStudentGroupService
};