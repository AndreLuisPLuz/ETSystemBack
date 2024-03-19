import { Request, Response } from "express";
import { 
    createAdministratorService,
    retrieveAdministratorService
} from "../services";
import { Administrator } from "../entities";
import { AdministratorDTO } from "../classes";

const createAdministratorController = async(req: Request, res: Response): Promise<Response> => {
    const admin: AdministratorDTO = await createAdministratorService(req.params.idUser, req.body);
    return res.status(201).json(admin);
};

const retrieveAdministratorController = async(req: Request, res: Response): Promise<Response> => {
    const admin: Administrator = await retrieveAdministratorService(req.params.id);
    return res.status(200).json(admin);
};

export {
    createAdministratorController,
    retrieveAdministratorController
};