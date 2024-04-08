import { Request, Response } from "express";
import {
    createCompetenceService
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

export {
    createCompetenceController
};