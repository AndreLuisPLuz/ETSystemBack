import { Request, Response } from "express";
import { 
    createInstitutionService,
    listIntitutionsService,
} from "../services";
import { InstitutionDTO } from "../classes";

const listIntitutionsController = async(req: Request, res: Response):
        Promise<Response> => {
    const institutions: InstitutionDTO[] = await listIntitutionsService(
        Boolean(req.query.is_bosch)
    );
    return res.status(200).json(institutions);
};

const createInstitutionController = async(req: Request, res: Response):
        Promise<Response> => {
    const institution: InstitutionDTO = await createInstitutionService(req.body);
    return res.status(201).json(institution);
};

export {
    createInstitutionController,
    listIntitutionsController
};