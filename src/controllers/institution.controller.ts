import { Request, Response } from "express";
import { 
    createInstitutionService,
    listIntitutionsService,
    retrieveInstitutionService
} from "../services";
import { Institution } from "../entities";

const createInstitutionController = async(req: Request, res: Response): Promise<Response> => {
    const institution: Institution = await createInstitutionService(req.body);
    return res.status(201).json(institution);
};

const listIntitutionsController = async(req: Request, res: Response): Promise<Response> => {
    const institutions: Institution[] = await listIntitutionsService();
    return res.status(200).json(institutions);
};

const retrieveInstitutionController = async(req: Request, res: Response): Promise<Response> => {
    const institution: Institution = await retrieveInstitutionService(req.params.id);
    return res.status(200).json(institution);
};

export {
    createInstitutionController,
    listIntitutionsController,
    retrieveInstitutionController
};