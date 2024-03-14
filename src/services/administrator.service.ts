import { IAdministratorCreatePayload } from "../contracts";
import { AppDataSource } from "../data-source";
import { Administrator } from "../entities";
import { User } from "../entities";

import { Repository } from "typeorm";
import { AppError } from "../errors";

import { createUserService } from "./user.service";

const createAdministratorService = async(payload: IAdministratorCreatePayload): Promise<Administrator> => {    
    const user: User = await createUserService(payload.user);

    const administratorRepo: Repository<Administrator> = AppDataSource.getRepository(Administrator);
    const administrator: Administrator = administratorRepo.create({
        user: user,
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

export {
    createAdministratorService,
    retrieveAdministratorService
}