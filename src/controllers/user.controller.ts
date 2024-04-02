import { Request, Response } from "express";
import { 
    createUserService,
    listUsersService,
    updateUserInformationService, 
    retrieveUserService,
    softDeleteUserService
} from "../services";
import { UserDTO, Paginator, UserSingleDTO } from "../classes";

const listUsersController = async(req: Request, res: Response): Promise<Response> => {
    req.query.idInstitution = (req.query.idInstitution != undefined)
        ? String(req.query.idInstitution)
        : undefined;

    const users = await listUsersService(req.query.idInstitution);
    const paginatedUsers: Paginator<UserDTO> = new Paginator(
        users, 
        Number(req.query.page), 
        Number(req.query.limit)
    );
    return res.status(200).json(paginatedUsers);
}

const createUserController = async(req: Request, res: Response):
        Promise<Response> => {
    const user = await createUserService(req.body);
    return res.status(201).json(user);
};

const retrieveUserController = async (req: Request, res: Response):
        Promise<Response> => {
    const user = await retrieveUserService(req.params.idUser);
    return res.status(200).json(user);
};

const updateUserInformationController = async(req: Request, res: Response):
        Promise<Response> => {
    const user = await updateUserInformationService(
        req.params.idUser,
        req.body
    );
    return res.status(200).json(user);
};

const softDeleteUserController = async(req: Request, res: Response): Promise<Response> => {
    await softDeleteUserService(req.params.idUser);
    return res.status(204).json();
};

export { 
    createUserController,
    listUsersController,
    updateUserInformationController,
    retrieveUserController,
    softDeleteUserController
};