import { IStudentCreatePayload } from "../interfaces/student.interface";
import { AppDataSource } from "../data-source";
import { Student } from "../entities";
import { User } from "../entities";
import { StudentGroup } from "../entities";

import { Repository } from "typeorm";
import { AppError } from "../errors";

import { createUserService } from "./user.service";
import { retrieveClassService } from "./class.service";

const createStudentService = async(payload: IStudentCreatePayload): Promise<Student> => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User);
    const studentRepo: Repository<Student> = AppDataSource.getRepository(Student);

    const user: User = await createUserService(payload.userPayload);
    const studentGroup: StudentGroup = await retrieveClassService(payload.idClass);

    const student: Student = studentRepo.create({user: user, studentGroup: studentGroup});
    
    await userRepo.save(user);
    await studentRepo.save(student);

    return student;
}