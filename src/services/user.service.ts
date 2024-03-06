import { IUserCreatePayload, IUserRegisterPayload } from "../interfaces";
import { AppDataSource } from "../data-source";
import { User } from "../entities";

import { Repository } from "typeorm";
import { AppError } from "../errors";

const createUserService = async(payload: IUserCreatePayload): Promise<User> => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User);
    const user: User = userRepo.create(payload);

    await userRepo.save(user);

    return user;
};

const updateUserInformationService = async(searchId: string, payload: IUserRegisterPayload):
        Promise<User> => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User);

    return userRepo.save({
        idUser: searchId,
        ...payload
    });
}

const retrieveUserService = async(searchId: string): Promise<User> => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User);
    const user: User | null = await userRepo.findOneBy({ idUser: searchId });

    if (!user) {
        throw new AppError('User not found.', 404);
    }

    return user;
};

export { 
    createUserService, 
    updateUserInformationService, 
    retrieveUserService 
};