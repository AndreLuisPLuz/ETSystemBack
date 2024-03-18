import { Request, Response } from "express";
import { 
    createInstitutionService,
    listIntitutionsService,
} from "../services";
import { Institution } from "../entities";

const listIntitutionsController = async(req: Request, res: Response): Promise<Response> => {
    const institutions: Institution[] = await listIntitutionsService(
        res.locals.idRequestingUser,
        Boolean(req.query.is_bosch)
    );
    return res.status(200).json(institutions);
};

const createInstitutionController = async(req: Request, res: Response): Promise<Response> => {
    const institution: Institution = await createInstitutionService(req.body);
    return res.status(201).json(institution);
};

export {
    createInstitutionController,
    listIntitutionsController
};