import { IStudentGroupCreatePayload, IStudentGroupUpdatePayload } from "../contracts";
import { StudentGroupDTO, StudentGroupSingleDTO } from "../classes";
import { AppDataSource } from "../data-source";
import { StudentGroup, WorkPeriod } from "../entities";

import { Repository, LessThanOrEqual, MoreThanOrEqual, UpdateResult } from "typeorm";
import { AppError } from "../errors";

/**
 * Fetches the full list of student groups in the database. This return must
 * be paginated on the controller, though use of a Paginator object.
 * @param workPeriodSearch - Work period search; 'm' for mornings, 'a' for afternoons.
 * @param year - Year in which the student groups must be active.
 * @returns List of all student groups found.
 */
const listStudentGroupsService = async(
        workPeriodSearch: WorkPeriod,
        year: number
)       :Promise<StudentGroupDTO[]> => {
    const searchDate = new Date(year, 0);

    const studentGroupRepo: Repository<StudentGroup> = AppDataSource.getRepository(StudentGroup);
    const studentGroups: StudentGroup[] = await studentGroupRepo.find({
        where: {
            workPeriod: workPeriodSearch,
            dateOfStart: LessThanOrEqual(searchDate),
            dateOfFinish: MoreThanOrEqual(searchDate)
        }
    })

    const studentGroupsShown: StudentGroupDTO[] = [];
    studentGroups.forEach((studentGroup) => {
        studentGroupsShown.push(new StudentGroupDTO(studentGroup));
    });

    return studentGroupsShown;
}

/**
 * Creates a user and saves it to the database.
 * @param payload - The body of the requisition.
 * @returns StudentGroupSingleDTO - The student group created wo/ sensible
 * data
 */
const createStudentGroupService = async (payload: IStudentGroupCreatePayload):
        Promise<StudentGroupSingleDTO> => {
    const studentGroupRepo: Repository<StudentGroup> = AppDataSource.getRepository(StudentGroup);
    const studentGroup: StudentGroup = studentGroupRepo.create(payload);

    return new StudentGroupSingleDTO(await studentGroupRepo.save(studentGroup));
}

const retrieveStudentGroupService = async (searchId: string):
        Promise<StudentGroupSingleDTO> => {
    const studentGroupRepo: Repository<StudentGroup> = AppDataSource.getRepository(StudentGroup);
    const studentGroup: StudentGroup | null = await studentGroupRepo.findOneBy({idStudentGroup: searchId});

    if (!studentGroup) {
        throw new AppError('Student group not found.', 404);
    }

    return new StudentGroupSingleDTO(studentGroup);
}

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
        .findOneByOrFail({idStudentGroup: searchId});

    return new StudentGroupSingleDTO(updatedStudentGroup);
};

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