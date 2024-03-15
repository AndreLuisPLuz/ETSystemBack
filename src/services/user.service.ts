import { IUserCreatePayload, IUserRegisterPayload } from "../contracts";
import { UserDTO } from "../classes";
import { AppDataSource } from "../data-source";
import { Institution, User } from "../entities";

import { Repository, UpdateResult } from "typeorm";
import { AppError } from "../errors";

import { hashSync } from "bcryptjs";
import "dotenv/config";

const passwordHashService = (plainPassword: string): string => {
    const numSaltRounds: number = process.env.NODE_ENV === 'dev' ? 1 : 16;
    return hashSync(plainPassword, numSaltRounds);
};

const listUsersService = async(idRequestingUser: string): Promise<UserDTO[]> => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User);
    const requestingUser: User | null = await userRepo.findOne({
        where: {
            idUser: idRequestingUser,
        },
        relations: {
            administrator: true,
        }
    });

    
    if (!requestingUser) {
        throw new AppError('User not found.', 404);
    }
    
    let teste: UserDTO[] = [];
    teste.push(new UserDTO(requestingUser));

    return teste;

    if (!requestingUser.administrator) {
        throw new AppError('Access level not high enough to perform action.', 401);
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

const createUserService = async(idRequestingUser: string, payload: IUserCreatePayload): Promise<object> => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User);
    const requestingUser: User | null = await userRepo.findOne({
        where: {
            idUser: idRequestingUser
        },
        relations: {
            administrator: true
        }
    })

    if (!requestingUser) {
        throw new AppError("Requesting user not found.", 404);
    }

    if (!requestingUser.administrator) {
        throw new AppError("Access level not high enough to perform action.", 401);
    }

    const institutionRepo: Repository<Institution> = AppDataSource.getRepository(Institution);
    const institution: Institution | null = await institutionRepo.findOneBy({idInstitution: payload.idInstitution});

    if (!institution) {
        throw new AppError("Institution not found. Cannot be bound.", 404);
    }

    const user: User = userRepo.create(payload);
    user.institution = institution;

    const defaultPassword: string = process.env.DEFAULT_USER_PW || "ets@Bosch200";
    user.password = passwordHashService(defaultPassword);

    await userRepo.save(user);

    return {"message": "User created."};
};

const retrieveUserService = async(idRequestingUser: string, searchId: string): Promise<UserDTO> => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User);
    const requestingUser: User | null = await userRepo.findOne({
        where: {
            idUser: idRequestingUser,
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
            throw new AppError("Access level not high enough to perform action.", 401);
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

const updateUserInformationService = async(idRequestingUser: string, searchId: string,
        payload: IUserRegisterPayload): Promise<UserDTO> => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User);
    const requestingUser: User | null = await userRepo.findOne({
        where: {
            idUser: idRequestingUser,
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
            throw new AppError("Access level not high enough to perform action.", 401);
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
};

const softDeleteUserService = async(idRequestingUser: string, idUser: string) => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User);
    const requestingUser: User | null = await userRepo.findOne({
        where: {
            idUser: idRequestingUser
        },
        relations: {
            administrator: true
        }
    });

    if (!requestingUser) {
        throw new AppError("Requesting user not found.", 404);
    }

    if (requestingUser.administrator === null) {
        throw new AppError("Access level not high enough to perform action.", 401);
    }

    if (requestingUser.administrator.isMaster == false) {
        throw new AppError("Access level not high enough to perform action.", 401);
    }

    const result: UpdateResult = await userRepo.softDelete({idUser: idUser});

    if (result.affected == 0 || result.affected === undefined) {
        throw new AppError("User not found, cannout be deleted.", 404);
    }
};

export { 
    createUserService,
    listUsersService,
    updateUserInformationService, 
    retrieveUserService,
    softDeleteUserService
};