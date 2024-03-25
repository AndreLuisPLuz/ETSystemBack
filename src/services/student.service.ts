import { IStudentCreatePayload } from "../contracts/student.interface";
import { AppDataSource } from "../data-source";
import { Student } from "../entities";
import { User } from "../entities";
import { StudentGroup } from "../entities";

import { Repository } from "typeorm";
import { AppError } from "../errors";

import { createUserService } from "./user.service";
import { retrieveStudentGroupService } from "./studentGroup.service";

const createStudentService = async(idUser: string, idStudentGroup: string): Promise<Student> => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User);
    const user: User | null = await userRepo.findOneBy({idUser: idUser});

    if (!user) {
        throw new AppError("User not found.", 404);
    }

    const studentGroupRepo: Repository<StudentGroup> = AppDataSource.getRepository(StudentGroup);
    const studentGroup: StudentGroup | null = await studentGroupRepo.findOneBy({idStudentGroup: idStudentGroup});

    if (!studentGroup) {
        throw new AppError("Student group not found.", 404);
    }

    const studentRepo: Repository<Student> = AppDataSource.getRepository(Student);
    const student: Student = studentRepo.create({
        user: user,
        studentGroup: studentGroup
    });
    
    await studentRepo.save(student);

    return student;
}

export { createStudentService };