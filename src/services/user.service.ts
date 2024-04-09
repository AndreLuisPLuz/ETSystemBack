import { IUserCreatePayload, IUserRegisterPayload } from "../contracts";
import { UserDTO, UserSingleDTO } from "../classes";
import { AppDataSource } from "../data-source";
import { Institution, User } from "../entities";

import { Repository, UpdateResult } from "typeorm";
import { AppError } from "../errors";

import { hashSync } from "bcryptjs";
import "dotenv/config";

const passwordHashService = (plainPassword: string): string => {
    const numSaltRounds = process.env.NODE_ENV === 'dev' ? 1 : 16;
    return hashSync(plainPassword, numSaltRounds);
};

const listUsersService = async(idInstitution?: string): Promise<UserDTO[]> => {
    let institution: Institution | null = null;

    if (idInstitution) {
        const institutionRepo = AppDataSource.getRepository(Institution);
        institution = await institutionRepo.findOneBy({idInstitution: idInstitution});

        if (!institution) {
            throw new AppError("Intitution not found.", 404);
        }
    }

    const userRepo = AppDataSource.getRepository(User);
    let query = userRepo
        .createQueryBuilder("person")
        .leftJoinAndSelect("person.administrator", "administrator")
        .leftJoinAndSelect("person.instructor", "instructor")
        .leftJoinAndSelect("person.student", "student");
        
    if (institution !== null) {
        query = query
        .innerJoinAndSelect("person.institution", "institution")
        .where(
            "person.institutionIdInstitution = :idInstitution",
            { idInstitution: institution.idInstitution }
        );
    }

    const users = await query.getMany();
    const usersShown = users.map((user) => new UserDTO(user));

    return usersShown;
};

const createUserService = async(payload: IUserCreatePayload): Promise<UserDTO> => {
    const institutionRepo = AppDataSource.getRepository(Institution);
    const institution = await institutionRepo.findOneBy({
        idInstitution: payload.idInstitution
    });

    if (!institution) {
        throw new AppError("Institution not found. Cannot be bound.", 404);
    }

    const userRepo = AppDataSource.getRepository(User);
    const user = userRepo.create(payload);
    user.institution = institution;

    const defaultPassword = process.env.DEFAULT_USER_PW || "ets@Bosch200";
    user.password = passwordHashService(defaultPassword);

    await userRepo.save(user);

    return new UserDTO(user);
};

const retrieveUserService = async(searchId: string): Promise<UserSingleDTO> => {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({
        where: {
            idUser: searchId,
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
        throw new AppError('User not found.', 404);
    }

    return new UserSingleDTO(user);
};

const updateUserInformationService = async(
    searchId: string,
    payload: IUserRegisterPayload
): Promise<UserDTO> => {
    
    if(payload.password) {
        payload.password = passwordHashService(payload.password);
    }

    const userRepo = AppDataSource.getRepository(User);
    const result = await userRepo.update(
        {idUser: searchId},
        {...payload}
    );

    if (result.affected == 0 || result.affected === undefined) {
        throw new AppError('User not found.', 404);
    }

    const updatedUser = await userRepo.findOneOrFail({
        where: {
            idUser: searchId
        },
        relations: {
            administrator: true,
            instructor: true,
            student: true
        }
    })
    return new UserDTO(updatedUser);
};

const softDeleteUserService = async(idUser: string) => {
    const userRepo = AppDataSource.getRepository(User);
    const result = await userRepo.softDelete({idUser: idUser});

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