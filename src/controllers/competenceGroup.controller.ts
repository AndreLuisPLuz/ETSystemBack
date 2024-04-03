import { Request, Response } from "express";
import {
    createCompetenceGroupService,
    updateCompetenceGroupService
} from "../services";

const createCompetenceGroupController = async(req: Request, res: Response): Promise<Response> => {
    const competenceGroup = await createCompetenceGroupService(
        res.locals.accessLevel,
        res.locals.idRequestingUser,
        req.params.idAppliedDiscipline,
        req.body
    );
    return res.status(201).json(competenceGroup);
};

const updateCompetenceGroupController = async(req: Request, res: Response): Promise<Response> => {
    const competenceGroup = await updateCompetenceGroupService(
        res.locals.isBosch,
        req.params.idCompetenceGroup,
        req.body
    );
    return res.status(200).json(competenceGroup);
};

export {
    createCompetenceGroupController,
    updateCompetenceGroupController
};