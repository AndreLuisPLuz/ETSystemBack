import { IUserCreatePayload, IUserRegisterPayload } from "../contracts";
import { UserDTO, UserSingleDTO } from "../classes";
import { AppDataSource } from "../data-source";
import { Institution, User } from "../entities";

import { Repository, SelectQueryBuilder, UpdateResult } from "typeorm";
import { AppError } from "../errors";

import { hashSync } from "bcryptjs";
import "dotenv/config";

const passwordHashService = (plainPassword: string): string => {
    const numSaltRounds: number = process.env.NODE_ENV === 'dev' ? 1 : 16;
    return hashSync(plainPassword, numSaltRounds);
};

const listUsersService = async(idInstitution?: string): Promise<UserDTO[]> => {
    let institution: Institution | null = null;

    if (idInstitution) {
        let institutionRepo: Repository<Institution> = AppDataSource.getRepository(Institution);
        institution = await institutionRepo.findOneBy({idInstitution: idInstitution});
    }

    const userRepo: Repository<User> = AppDataSource.getRepository(User);
    let query: SelectQueryBuilder<User> = userRepo.createQueryBuilder('person')

    if (institution !== null) {
        query = query
            .innerJoinAndSelect("person.institution", "institution")
            .where(
                'person.institutionIdInstitution = :idInstitution',
                { idInstitution: institution.idInstitution }
            );
    }

    const users: User[] = await query.getMany();
    const usersShown: UserDTO[] = users.map((user) => new UserDTO(user));

    return usersShown;
};

const createUserService = async(payload: IUserCreatePayload): Promise<object> => {
    const institutionRepo: Repository<Institution> = AppDataSource.getRepository(Institution);
    const institution: Institution | null = await institutionRepo.findOneBy({idInstitution: payload.idInstitution});

    if (!institution) {
        throw new AppError("Institution not found. Cannot be bound.", 404);
    }

    const userRepo: Repository<User> = AppDataSource.getRepository(User);
    const user: User = userRepo.create(payload);
    user.institution = institution;

    const defaultPassword: string = process.env.DEFAULT_USER_PW || "ets@Bosch200";
    user.password = passwordHashService(defaultPassword);

    await userRepo.save(user);

    return {"message": "User created."};
};

const retrieveUserService = async(searchId: string): Promise<UserSingleDTO> => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User);
    const user: User | null = await userRepo.findOne({
        where: {
            idUser: searchId,
        },
        relations: {
            student: true,
            instructor: true,
            administrator: true,
            institution: true
        }
    });

    if (!user) {
        throw new AppError('User not found.', 404);
    }

    return new UserSingleDTO(user);
};

const updateUserInformationService = async(searchId: string,
        payload: IUserRegisterPayload): Promise<UserDTO> => {
    payload.password = passwordHashService(payload.password);

    const userRepo: Repository<User> = AppDataSource.getRepository(User);
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

const softDeleteUserService = async(idUser: string) => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User);
    const result: UpdateResult = await userRepo.softDelete({idUser: idUser});

    if (result.affected == 0 || result.affected === undefined) {
        throw new AppError("User not found, cannot be deleted.", 404);
    }
};

export { 
    createUserService,
    listUsersService,
    updateUserInformationService, 
    retrieveUserService,
    softDeleteUserService
};