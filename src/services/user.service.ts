import { IUserCreatePayload, IUserRegisterPayload } from "../contracts";
import { UserDTO } from "../classes";
import { AppDataSource } from "../data-source";
import { User } from "../entities";

import { Repository, Not } from "typeorm";
import { AppError } from "../errors";

import { hashSync } from "bcryptjs";
import "dotenv/config";

const createUserService = async(payload: IUserCreatePayload): Promise<object> => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User);
    const user: User = userRepo.create(payload);

    const defaultPassword: string = process.env.DEFAULT_USER_PW || "ets@Bosch2020";
    const numSaltRounds: number = process.env.NODE_ENV === 'dev' ? 1 : 16;
    user.password = hashSync(defaultPassword, numSaltRounds);

    await userRepo.save(user);

    return {"message": "User created."};
};

const listUsersService = async(requestingUserId: string): Promise<UserDTO[]> => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User);
    const requestingUser: User | null = await userRepo.findOne({
        where: {
            idUser: requestingUserId,
        },
        relations: {
            administrator: true,
        }
    });

    if (!requestingUser) {
        throw new AppError('User not found.', 404);
    }

    if (!requestingUser.administrator) {
        throw new AppError('Missing admin access.', 401);
    }

    const users: User[] = await userRepo.find({
        relations: {
            student: true,
            instructor: true,
            administrator: true
        }
    });

    const usersShown: UserDTO[] = []
    users.forEach(function (user) {
        usersShown.push(new UserDTO(user))
    });

    return usersShown;
}

const updateUserInformationService = async(searchId: string, payload: IUserRegisterPayload):
        Promise<User> => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User);
    const user: User | null = await userRepo.findOneBy({idUser: searchId});

    if (!user) {
        throw new AppError('User not found.', 404);
    }

    return userRepo.save({
        idUser: searchId,
        ...payload,
    })
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
    listUsersService,
    updateUserInformationService, 
    retrieveUserService 
};