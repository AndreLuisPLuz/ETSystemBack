import { IStudentGroupCreatePayload } from "../interfaces";
import { AppDataSource } from "../data-source";
import { StudentGroup } from "../entities";

import { Repository } from "typeorm";
import { AppError } from "../errors";

const createClassService = async(payload: IStudentGroupCreatePayload):
        Promise<StudentGroup> => {
    const studentGroupRepo: Repository<StudentGroup> = AppDataSource.getRepository(StudentGroup);
    const studentGroup: StudentGroup = studentGroupRepo.create(payload);

    return studentGroupRepo.save(studentGroup);
}

const listClassesService = async(): Promise<StudentGroup[]> => {
    const studentGroupRepo: Repository<StudentGroup> = AppDataSource.getRepository(StudentGroup);
    
    return await studentGroupRepo.find();
}

const retrieveClassService = async(searchId: string): Promise<StudentGroup> => {
    const studentGroupRepo: Repository<StudentGroup> = AppDataSource.getRepository(StudentGroup);
    const studentGroup: StudentGroup | null = await studentGroupRepo.findOneBy({idStudentGroup: searchId});

    if (!studentGroup) {
        throw new AppError('Class not found.', 404);
    }

    return studentGroup;
}

export { createClassService, listClassesService, retrieveClassService };