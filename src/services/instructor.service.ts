import { AppDataSource } from "../data-source";
import { InstructorDTO, UserSingleDTO } from "../classes";
import { Instructor, IsBosch } from "../entities";
import { User } from "../entities";

import { Repository } from "typeorm";
import { AppError } from "../errors";

const listInstructorsService = async(isBosch: IsBosch): Promise<InstructorDTO[]> => {
    const instructorRepo = AppDataSource.getRepository(Instructor);
    const findQuery = instructorRepo
        .createQueryBuilder("instructor")
        .select()
        .innerJoinAndSelect("instructor.user", "user")
        .innerJoin("user.institution", "institution")
        .where(
            "institution.isBosch = :isBosch",
            { isBosch: isBosch }
        );
    
    const instructors = await findQuery.getMany();
    const instructorsShown = instructors.map((instructor) => 
        new InstructorDTO(instructor)
    );

    return instructorsShown;
};

const createInstructorService = async(idUser: string): Promise<UserSingleDTO> => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User);
    const user: User | null = await userRepo.findOne({
        where: {
            idUser: idUser
        },
        relations: [
            "student",
            "student.studentGroup",
            "instructor",
            "administrator",
            "institution"
        ]
    });

    if (!user) {
        throw new AppError("User not found, cannot be bound to instructor access.", 404);
    }

    const instructorRepo: Repository<Instructor> = AppDataSource.getRepository(Instructor);
    const instructor: Instructor = instructorRepo.create({
        user: user
    });

    await instructorRepo.save(instructor);
    const updatedUser: User = userRepo.create({
        ...user,
        instructor: instructor,
    });

    return new UserSingleDTO(updatedUser);
}

export {
    listInstructorsService,
    createInstructorService
};