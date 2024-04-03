import { ICompetenceGroupCreatePayload } from "../contracts";
import { CompetenceGroupDTO, CompetenceGroupSingleDTO } from "../classes/dataTransfer/competenceGroup.dto";
import { Administrator, AppliedDiscipline, CompetenceGroup, IsBosch, User } from "../entities";
import { AppDataSource } from "../data-source";

import { AppError } from "../errors";
import { AccessLevel } from "../classes";
import { query } from "express";

const createCompetenceGroupService = async(
    accessLevel: AccessLevel,
    idRequestingUser: string,
    idAppliedDiscipline: string,
    payload: ICompetenceGroupCreatePayload
): Promise<CompetenceGroupSingleDTO> => {

    const appliedDisciplineRepo = AppDataSource.getRepository(AppliedDiscipline);
    const appliedDiscipline = await appliedDisciplineRepo.findOne({
        where: {
            idAppliedDiscipline: idAppliedDiscipline
        },
        relations: {
            instructor: true,
            discipline: true
        }
    });

    if (!appliedDiscipline) {
        throw new AppError("Applied discipline not fond.", 404);
    }

    const userRepo = AppDataSource.getRepository(User);
    const requestingUser = await userRepo.findOne({
        where: {
            idUser: idRequestingUser
        },
        relations: {
            instructor: true,
            institution: true
        }
    });

    if (!requestingUser) {
        throw new AppError("User not found.", 404);
    }

    // We do not give a 403 FORBIDDEN response so that an attacker can't know
    // that this given discipline exists in a different acces level.
    if (accessLevel == AccessLevel.ADMINISTRATOR || accessLevel == AccessLevel.MASTER) {
        if (requestingUser.institution.isBosch != appliedDiscipline.discipline.isBosch) {
            throw new AppError("Applied discipline not found.", 404);
        }
    } else if (accessLevel == AccessLevel.INSTRUCTOR) {
        if (requestingUser.instructor != appliedDiscipline.instructor) {
            throw new AppError("Applied discipline not found.", 404);
        }
    }

    const competenceGroupRepo = AppDataSource.getRepository(CompetenceGroup);
    const competenceGroup = competenceGroupRepo.create({
        ...payload,
        appliedDiscipline: appliedDiscipline
    });

    await competenceGroupRepo.save(competenceGroup);
    return new CompetenceGroupSingleDTO(competenceGroup);
};

const updateCompetenceGroupService = async(
    isBosch: IsBosch,
    idCompetenceGroup: string,
    payload: ICompetenceGroupCreatePayload
): Promise<CompetenceGroupSingleDTO> => {

    const competenceGroupRepo = AppDataSource.getRepository(CompetenceGroup);
    const competenceGroup = await competenceGroupRepo.findOne({
        where: {
            idCompetenceGroup: idCompetenceGroup
        },
        relations: [
            "appliedDiscipline",
            "appliedDiscipline.discipline"
        ]
    });

    if (!competenceGroup) {
        throw new AppError("Competence group not found.", 404);
    }

    if (competenceGroup.appliedDiscipline.discipline.isBosch != isBosch) {
        throw new AppError("Competence group not found.", 404);
    }

    await competenceGroupRepo.update(
        {idCompetenceGroup: competenceGroup.idCompetenceGroup},
        payload
    );

    const updatedCompetenceGroup = competenceGroupRepo.create({
        ...competenceGroup,
        ...payload
    });

    return new CompetenceGroupSingleDTO(updatedCompetenceGroup);
};

const softDeleteCompetenceGroupService = async(
    isBosch: IsBosch,
    accessLevel: AccessLevel,
    idCompetenceGroup: string
): Promise<void> => {

    const competenceGroupRepo = AppDataSource.getRepository(CompetenceGroup);
    let query = competenceGroupRepo
        .createQueryBuilder("competenceGroup")
        .softDelete()
        .where(
            "idCompetenceGroup = :idCompetenceGroup",
            { idCompetenceGroup: idCompetenceGroup }
        );

    if (accessLevel == AccessLevel.INSTRUCTOR) {
        // figure out how to set this up
    }
};

export {
    createCompetenceGroupService,
    updateCompetenceGroupService
};