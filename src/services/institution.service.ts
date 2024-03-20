import { IInstitutionCreatePayload } from "../contracts";
import { AppDataSource } from "../data-source";
import { Institution } from "../entities";
import { InstitutionDTO } from "../classes";

import { Repository, UpdateResult } from "typeorm";
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
    const result: UpdateResult = await institutionRepo.update(
        {idInstitution: searchId},
        {...payload}
    );

    if (result.affected == 0 || result.affected === undefined) {
        throw new AppError('Institution not found.', 404);
    }

    const updatedInstitution: Institution = await institutionRepo.findOneByOrFail({idInstitution: searchId});
    return new InstitutionDTO(updatedInstitution);
}

export {
    createInstitutionService,
    listIntitutionsService,
    updateInstitutionService
}