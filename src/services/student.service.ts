import { IStudentCreatePayload } from "../interfaces/student.interface";
import { AppDataSource } from "../data-source";
import { Student } from "../entities";
import { User } from "../entities";
import { StudentGroup } from "../entities";

import { Repository } from "typeorm";
import { AppError } from "../errors";

import { createUserService } from "./user.service";
import { retrieveClassService } from "./studentGroup.service";

const createStudentService = async(payload: IStudentCreatePayload): Promise<Student> => {
    const studentRepo: Repository<Student> = AppDataSource.getRepository(Student);

    const user: User = await createUserService(payload.user);
    const studentGroup: StudentGroup = await retrieveClassService(payload.idClass);

    const student: Student = studentRepo.create({user: user, studentGroup: studentGroup});
    
    await studentRepo.save(student);

    return student;
}

const listStudentsService = async(): Promise<Student[]> => {
    const studentRepo: Repository<Student> = AppDataSource.getRepository(Student);
    return await studentRepo.find({
        relations: {
            user: true,
        }
    });
}

const retrieveStudentService = async(searchId: string): Promise<Student> => {
    const studentRepo: Repository<Student> = AppDataSource.getRepository(Student);
    const student: Student | null = await studentRepo.findOne({
        where: {
            idStudent: searchId,
        },
        relations: {
            user: true,
        }
    });

    if (!student) {
        throw new AppError('Student not found.', 404);
    }

    return student;
}

export { 
    createStudentService, 
    listStudentsService, 
    retrieveStudentService 
}