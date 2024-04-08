import { ICompetenceCreatePayload } from "../contracts";
import { CompetenceDTO } from "../classes/dataTransfer/competence.dto";
import { Competence, CompetenceGroup, IsBosch, User } from "../entities";

import { AppDataSource } from "../data-source";
import { AppError } from "../errors";
import { AccessLevel } from "../classes";

const createCompetenceService = async(
    accessLevel: AccessLevel,
    idRequestingUser: string,
    idCompetenceGroup: string,
    payload: ICompetenceCreatePayload
): Promise<CompetenceDTO> => {

    const competenceGroupRepo = AppDataSource.getRepository(CompetenceGroup);
    const competenceGroup = await competenceGroupRepo.findOne({
        where: {
            idCompetenceGroup: idCompetenceGroup
        },
        relations: [
            "appliedDiscipline",
            "appliedDiscipline.instructor",
            "appliedDiscipline.discipline"
        ]
    });

    if (!competenceGroup) {
        throw new AppError("Competence group not found.", 404);
    }

    const userRepo = AppDataSource.getRepository(User);
    const requestingUser = await userRepo.findOneOrFail({
        where: {
            idUser: idRequestingUser
        },
        relations: {
            institution: true,
            instructor: true
        }
    });

    if (accessLevel == AccessLevel.ADMINISTRATOR || accessLevel == AccessLevel.MASTER) {
        const discipline = competenceGroup.appliedDiscipline.discipline;
        const instituion = requestingUser.institution;

        if (discipline.isBosch != instituion.isBosch) {
            throw new AppError("Incorrect institution access.", 403);
        }
    } else {
        const appliedDiscipline = competenceGroup.appliedDiscipline;

        if (appliedDiscipline.instructor != requestingUser.instructor) {
            throw new AppError("Incorrect instructor access..", 403);
        }
    }

    const competenceRepo = AppDataSource.getRepository(Competence);
    const competence = competenceRepo.create({
        ...payload,
        competenceGroup: competenceGroup
    });

    return new CompetenceDTO(competence);
};

export {
    createCompetenceService
};