import { Request, Response } from "express";
import { 
    createInstitutionService,
    listIntitutionsService,
    updateInstitutionService,
    softDeleteInstitutionService
} from "../services";
import { InstitutionDTO, Paginator } from "../classes";

const listIntitutionsController = async(
    req: Request,
    res: Response)
: Promise<Response> => {

    const institutions = await listIntitutionsService(
        Boolean(req.query.is_bosch)
    );
    const paginatedInstitutions = new Paginator(
        institutions,
        Number(req.query.page), 
        Number(req.query.limit)
    );

    return res.status(200).json(paginatedInstitutions);
};

const createInstitutionController = async(
    req: Request,
    res: Response
): Promise<Response> => {

    const institution = await createInstitutionService(req.body);
    return res.status(201).json(institution);
};

const updateInstitutionController = async(
    req: Request,
    res: Response
): Promise<Response> => {

    const institution = await updateInstitutionService(
        req.params.idInstitution,
        req.body
    );
    return res.status(200).json(institution);
};

const softDeleteInstitutionController = async(
    req: Request,
    res: Response)
: Promise<Response> => {

    await softDeleteInstitutionService(req.params.idInstitution);
    return res.status(204).json();
};

export {
    createInstitutionController,
    listIntitutionsController,
    updateInstitutionController,
    softDeleteInstitutionController
};