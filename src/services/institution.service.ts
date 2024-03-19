import { IInstitutionCreatePayload } from "../contracts";
import { AppDataSource } from "../data-source";
import { Institution } from "../entities";
import { InstitutionDTO } from "../classes";

import { Repository } from "typeorm";
import { AppError } from "../errors";

const createInstitutionService = async(payload: IInstitutionCreatePayload):
        Promise<InstitutionDTO> => {
    const institutionRepo: Repository<Institution> = AppDataSource.getRepository(Institution);
    const institution: Institution = institutionRepo.create(payload);

    return new InstitutionDTO(await institutionRepo.save(institution));
}

const listIntitutionsService = async (isBosch: boolean): Promise<InstitutionDTO[]> => {
    const institutionRepo: Repository<Institution> = AppDataSource.getRepository(Institution);
    const institutions: Institution[] = await institutionRepo.find({
        select: { isBosch: isBosch }
    });

    const institutionsShown: InstitutionDTO[] = [];
    institutions.forEach((institution) => {
        institutionsShown.push(new InstitutionDTO(institution));
    });

    return institutionsShown;
}

const updateInstitutionService = async(searchId: string,
        payload: IInstitutionCreatePayload): Promise<InstitutionDTO> => {
    const institutionRepo: Repository<Institution> = AppDataSource.getRepository(Institution);
    const institution: Institution | null = await institutionRepo.findOneBy({idInstitution: searchId});

    if (!institution) {
        throw new AppError("Institution not found.", 404);
    }

    return new InstitutionDTO(institution);
}

export {
    createInstitutionService,
    listIntitutionsService,
    updateInstitutionService
}