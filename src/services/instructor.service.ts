import { AppDataSource } from "../data-source";
import { UserSingleDTO } from "../classes";
import { Instructor } from "../entities";
import { User } from "../entities";

import { Repository } from "typeorm";
import { AppError } from "../errors";

const createInstructorService = async(idUser: string): Promise<UserSingleDTO> => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User);
    const user: User | null = await userRepo.findOne({
        where: {
            idUser: idUser
        },
        relations: {
            administrator: true,
            student: true,
            institution: true
        }
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

export { createInstructorService };