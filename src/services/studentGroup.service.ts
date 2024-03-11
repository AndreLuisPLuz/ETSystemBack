import { IStudentGroupCreatePayload } from "../interfaces";
import { AppDataSource } from "../data-source";
import { StudentGroup } from "../entities";

import { Repository } from "typeorm";
import { AppError } from "../errors";

const createStudentGroupService = async(payload: IStudentGroupCreatePayload):
        Promise<StudentGroup> => {
    const studentGroupRepo: Repository<StudentGroup> = AppDataSource.getRepository(StudentGroup);
    const studentGroup: StudentGroup = studentGroupRepo.create(payload);

    return studentGroupRepo.save(studentGroup);
}

const listStudentGroupsService = async(): Promise<StudentGroup[]> => {
    const studentGroupRepo: Repository<StudentGroup> = AppDataSource.getRepository(StudentGroup);
    
    return await studentGroupRepo.find();
}

const retrieveStudentGroupService = async(searchId: string): Promise<StudentGroup> => {
    const studentGroupRepo: Repository<StudentGroup> = AppDataSource.getRepository(StudentGroup);
    const studentGroup: StudentGroup | null = await studentGroupRepo.findOneBy({idStudentGroup: searchId});

    if (!studentGroup) {
        throw new AppError('Class not found.', 404);
    }

    return studentGroup;
}

export { 
    createStudentGroupService, 
    listStudentGroupsService, 
    retrieveStudentGroupService 
};