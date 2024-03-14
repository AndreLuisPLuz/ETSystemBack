import { IInstructorCreatePayload, IInstructorStudentGroupsGetResponse } from "../contracts";
import { AppDataSource } from "../data-source";
import { Instructor } from "../entities";
import { User } from "../entities";
import { Institution } from "../entities";
import { DisciplineStudentGroup } from "../entities";

import { Repository } from "typeorm";
import { AppError } from "../errors";

import { createUserService } from "./user.service";
import { retrieveInstitutionService } from "./institution.service";

const createInstructorService = async(payload: IInstructorCreatePayload): Promise<Instructor> => {
    const instructorRepo: Repository<Instructor> = AppDataSource.getRepository(Instructor);

    const user: User = await createUserService(payload.user);
    const institution: Institution = await retrieveInstitutionService(payload.idInstitution);

    const instructor: Instructor = instructorRepo.create({
        user: user,
        institution: institution,
    });

    await instructorRepo.save(instructor);

    return instructor;
}

const retrieveInstructorService = async(searchId: string): Promise<Instructor> => {
    const instructorRepo: Repository<Instructor> = AppDataSource.getRepository(Instructor);
    const instructor: Instructor | null = await instructorRepo.findOne({
        where: {
            instructorId: searchId,
        },
        relations: {
            user: true,
        }
    });

    if (!instructor) {
        throw new AppError('Instructor not found.', 404);
    }

    return instructor;
}

const retrieveInstructorStudentGroupsService = async(id: string, search: string, searchType: string, page: number): Promise<DisciplineStudentGroup[]> => {
    const instructorRepo: Repository<Instructor> = AppDataSource.getRepository(Instructor);
    const instructor: Instructor | null = await instructorRepo.findOneBy({instructorId: id});

    if (!instructor) {
        throw new AppError('Instructor not found.', 404);
    }

    const disciplineStudentGroupRepo: Repository<DisciplineStudentGroup> = AppDataSource.getRepository(DisciplineStudentGroup);
    const disciplineStudentGroups: DisciplineStudentGroup[] = await disciplineStudentGroupRepo.find({
        where: {
            instructor: instructor
        },
        relations: {
            studentGroup: (searchType == "studentgroup"),
            discipline: (searchType == "discipline")
        }
    })

    return disciplineStudentGroups;
}

export {
    createInstructorService,
    retrieveInstructorService,
}