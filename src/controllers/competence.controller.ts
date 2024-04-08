import { Request, Response } from "express";
import {
    createCompetenceService,
    updateCompetenceService
} from "../services";
import { Paginator } from "../classes";

const createCompetenceController = async(req: Request, res: Response): Promise<Response> => {
    const competence = await createCompetenceService(
        res.locals.accessLevel,
        res.locals.idRequestingUser,
        req.params.idCompetenceGroup,
        req.body
    );

    return res.status(201).json(competence);
}

const updateCompetenceController = async(req: Request, res: Response): Promise<Response> => {
    const competence = await updateCompetenceService(
        res.locals.accessLevel,
        res.locals.idRequestingUser,
        req.params.idCompetence,
        req.body
    );

    return res.status(200).json(competence);
}

export {
    createCompetenceController,
    updateCompetenceController
};