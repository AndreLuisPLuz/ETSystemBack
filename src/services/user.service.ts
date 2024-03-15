import { IUserCreatePayload, IUserRegisterPayload } from "../contracts";
import { UserDTO } from "../classes";
import { AppDataSource } from "../data-source";
import { User } from "../entities";

import { Repository, UpdateResult } from "typeorm";
import { AppError } from "../errors";

import { hashSync } from "bcryptjs";
import "dotenv/config";

const passwordHashService = (plainPassword: string): string => {
    const numSaltRounds: number = process.env.NODE_ENV === 'dev' ? 1 : 16;
    return hashSync(plainPassword, numSaltRounds);
};

const createUserService = async(payload: IUserCreatePayload): Promise<object> => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User);
    const user: User = userRepo.create(payload);

    const defaultPassword: string = process.env.DEFAULT_USER_PW || "ets@Bosch2020";
    user.password = passwordHashService(defaultPassword);

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

    const usersShown: UserDTO[] = [];
    users.forEach(function (user) {
        usersShown.push(new UserDTO(user))
    });

    return usersShown;
}

const updateUserInformationService = async(requestingUserId: string, searchId: string,
        payload: IUserRegisterPayload): Promise<UserDTO> => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User);
    const requestingUser: User | null = await userRepo.findOne({
        where: {
            idUser: requestingUserId,
        },
        relations: {
            student: true,
            administrator: true
        }
    });

    if (!requestingUser) {
        throw new AppError("Requesting user not found.", 404);
    }

    if (!requestingUser.administrator) {
        if (requestingUser.idUser != searchId) {
            throw new AppError("Access level not high enough.", 401);
        }
    }

    payload.password = passwordHashService(payload.password);

    const result: UpdateResult = await userRepo.update(
        {idUser: searchId},
        {...payload}
    );

    if (result.affected == 0 || result.affected === undefined) {
        throw new AppError('User not found.', 404);
    }

    const updatedUser: User = await userRepo.findOneByOrFail({idUser: searchId})
    return new UserDTO(updatedUser);
}

const retrieveUserService = async(requestingUserId: string, searchId: string): Promise<UserDTO> => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User);
    const requestingUser: User | null = await userRepo.findOne({
        where: {
            idUser: requestingUserId,
        },
        relations: {
            student: true,
            administrator: true
        }
    });

    if (!requestingUser) {
        throw new AppError("Requesting user not found.", 404);
    }

    if (!requestingUser.administrator) {
        if (requestingUser.idUser != searchId) {
            throw new AppError("Access level not high enough.", 401);
        }
    }

    const user: User | null = await userRepo.findOne({
        where: {
            idUser: searchId,
        },
        relations: {
            student: true,
            instructor: true,
            administrator: true
        }
    });

    if (!user) {
        throw new AppError('User not found.', 404);
    }

    return new UserDTO(user);
};

export { 
    createUserService,
    listUsersService,
    updateUserInformationService, 
    retrieveUserService 
};