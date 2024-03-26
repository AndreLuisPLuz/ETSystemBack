import { AppDataSource } from "../data-source";
import { UserDTO } from "../classes";
import { Instructor } from "../entities";
import { User } from "../entities";

import { Repository } from "typeorm";
import { AppError } from "../errors";

const createInstructorService = async(idUser: string): Promise<UserDTO> => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User);
    const user: User | null = await userRepo.findOne({
        where: {
            idUser: idUser
        },
        relations: {
            administrator: true,
            student: true
        }
    });

    if (!user) {
        throw new AppError("User not found, cannot be bound to instructor access.", 404);
    }

    const instructorRepo: Repository<Instructor> = AppDataSource.getRepository(Instructor);
    const instructor: Instructor = instructorRepo.create({
        user: user
    });

    await instructorRepo.insert(instructor);
    const updatedUser: User = userRepo.create({
        ...user,
        instructor: instructor,
    });

    return new UserDTO(updatedUser);
}

export { createInstructorService };