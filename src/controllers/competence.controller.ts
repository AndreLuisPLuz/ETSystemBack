import { Request, Response } from "express";
import {
    createCompetenceService,
    updateCompetenceService,
    softDeleteCompetenceService
} from "../services";

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

const softDeleteCompetenceController = async(req: Request, res: Response): Promise<Response> => {
    await softDeleteCompetenceService(
        res.locals.accessLevel,
        res.locals.idRequestingUser,
        req.params.idCompetence
    );

    return res.status(204).json();
};

export {
    createCompetenceController,
    updateCompetenceController,
    softDeleteCompetenceController
};