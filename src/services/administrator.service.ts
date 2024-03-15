import { IAdministratorCreatePayload } from "../contracts";
import { AppDataSource } from "../data-source";
import { Administrator } from "../entities";
import { User } from "../entities";

import { AdministratorDTO } from "../classes";

import { Repository } from "typeorm";
import { AppError } from "../errors";

const createAdministratorService = async(idUser: string, payload: IAdministratorCreatePayload): Promise<AdministratorDTO> => {    
    const userRepo: Repository<User> = AppDataSource.getRepository(User);
    const user: User | null = await userRepo.findOneBy({idUser: idUser});

    if (!user) {
        throw new AppError("User was not found and cannot be bound to an admin access.", 404);
    }

    const administratorRepo: Repository<Administrator> = AppDataSource.getRepository(Administrator);
    const administrator: Administrator = administratorRepo.create({
        user: user,
        ...payload
    })

    await administratorRepo.save(administrator);
    return new AdministratorDTO(administrator);
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