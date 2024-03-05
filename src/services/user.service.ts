import { IUserPayload } from "../interfaces";
import { AppDataSource } from "../data-source";
import { User } from "../entities";

import { Repository } from "typeorm";

const createUserService = async(payload: IUserPayload): Promise<User> => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User);
    const user: User = userRepo.create(payload);

    await userRepo.save(user);

    return user;
};

const listUsersService = async(): Promise<User[]> => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User);
    return await userRepo.find();
};

const retrieveUserService = async(searchIdUser: string):
        Promise<User | null> => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User);
    return await userRepo.findOneBy({ idUser: searchIdUser });
};

export { createUserService, listUsersService, retrieveUserService };