import { IInstitutionCreatePayload } from "../contracts";
import { AppDataSource } from "../data-source";
import { Institution } from "../entities";
import { User } from "../entities";

import { Repository } from "typeorm";
import { AppError } from "../errors";

const createInstitutionService = async (idRequestingUser: string, payload: IInstitutionCreatePayload):
    Promise<Institution> => {
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
        throw new AppError("Requesting user not found.", 404);
    }

    if (!requestingUser.administrator) {
        throw new AppError("Access level not high enough to perform action.", 401);
    }

    if (!requestingUser.administrator.isMaster) {
        throw new AppError("Access level not high enough to perform action.", 401);
    }

    const institutionRepo: Repository<Institution> = AppDataSource.getRepository(Institution);
    const institution: Institution = institutionRepo.create(payload);

    return institutionRepo.save(institution);
}

const listIntitutionsService = async (idRequestingUser: string, isBosch: boolean): Promise<Institution[]> => {
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
        throw new AppError("Requesting user not found.", 404);
    }

    if (!requestingUser.administrator) {
        throw new AppError("Access level not high enough to perform action.", 401);
    }

    if (!requestingUser.administrator.isMaster) {
        throw new AppError("Access level not high enough to perform action.", 401);
    }

    const institutionRepo: Repository<Institution> = AppDataSource.getRepository(Institution);
    const institutions: Institution[] = await institutionRepo.find({
        select: { isBosch: isBosch }
    });

    return institutions;
}

export {
    createInstitutionService,
    listIntitutionsService,
}