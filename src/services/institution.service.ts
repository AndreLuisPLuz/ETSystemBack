import { IInstitutionCreatePayload } from "../interfaces";
import { AppDataSource } from "../data-source";
import { Institution } from "../entities";

import { Repository } from "typeorm";
import { AppError } from "../errors";

const createInstitutionService = async(payload: IInstitutionCreatePayload):
        Promise<Institution> => {
    const institutionRepo: Repository<Institution> = AppDataSource.getRepository(Institution);
    const institution: Institution = institutionRepo.create(payload);

    return institutionRepo.save(institution);
}

const listIntitutionsService = async(): Promise<Institution[]> => {
    const institutionRepo: Repository<Institution> = AppDataSource.getRepository(Institution);

    return await institutionRepo.find();
}

const retrieveInstitutionService = async(searchId: string): Promise<Institution> => {
    const institutionRepo: Repository<Institution> = AppDataSource.getRepository(Institution);
    const institution: Institution | null = await institutionRepo.findOneBy({idInstitution: searchId})

    if (!institution) {
        throw new AppError('Institution not found.', 404);
    }

    return institution;
}