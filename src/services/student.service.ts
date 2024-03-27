import { AppDataSource } from "../data-source";
import { Student } from "../entities";
import { User } from "../entities";
import { StudentGroup } from "../entities";

import { Repository } from "typeorm";
import { AppError } from "../errors";
import { StudentSingleDTO, UserSingleDTO } from "../classes";

const createStudentService = async(idUser: string, idStudentGroup: string): Promise<UserSingleDTO> => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User);
    const user: User | null = await userRepo.findOne({
        where: {
            idUser: idUser
        },
        relations: {
            administrator: true,
            instructor: true,
            institution: true
        }
    });

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

    const updatedUser = userRepo.create({
        ...user,
        student: student        
    })

    return new UserSingleDTO(updatedUser);
};

const retrieveStudentService = async(idStudent: string): Promise<StudentSingleDTO> => {
    const studentRepo: Repository<Student> = AppDataSource.getRepository(Student);
    const student: Student | null = await studentRepo.findOne({
        where: {
            idStudent: idStudent
        },
        relations: {
            studentGroup: true,
            competences: true
        }
    });

    if (!student) {
        throw new AppError("Student not found.", 404);
    }

    return new StudentSingleDTO(student);
}

export {
    createStudentService,
    retrieveStudentService
};