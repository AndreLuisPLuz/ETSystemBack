import { Request, Response } from "express";
import { createCompetenceGroupService } from "../services";

const createCompetenceGroupController = async(req: Request, res: Response): Promise<Response> => {
    const competenceGroup = await createCompetenceGroupService(
        res.locals.accessLevel,
        res.locals.idRequestingUser,
        req.params.idAppliedDiscipline,
        req.body
    );
    return res.status(201).json(competenceGroup);
};

export { createCompetenceGroupController };