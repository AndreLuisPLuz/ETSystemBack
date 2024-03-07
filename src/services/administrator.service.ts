import { IAdministratorCreatePayload } from "../interfaces";
import { AppDataSource } from "../data-source";
import { Administrator } from "../entities";
import { User } from "../entities";
import { Institution } from "../entities";

import { Repository } from "typeorm";
import { AppError } from "../errors";

import { createUserService } from "./user.service";
import { retrieveInstitutionService } from "./institution.service";

const createAdministratorService = async(payload: IAdministratorCreatePayload): Promise<Administrator> => {
    const administratorRepo: Repository<Administrator> = AppDataSource.getRepository(Administrator);
    
    const user: User = await createUserService(payload.user);
    const institution: Institution = await retrieveInstitutionService(payload.idInstitution);

    const administrator: Administrator = administratorRepo.create({
        user: user,
        institution: institution,
    })

    await administratorRepo.save(administrator);
    return administrator;
}

const retrieveAdministratorService = async(searchId: string): Promise<Administrator> => {
    const administratorRepo: Repository<Administrator> = AppDataSource.getRepository(Administrator);
    const administrator: Administrator | null = await administratorRepo.findOne({
        where: {
            idAdministrator: searchId,
        },
        relations: {
            user: true,
        },
    });

    if (!administrator) {
        throw new AppError('Admin not found.', 404);
    }

    return administrator;
}