import { Request, Response } from "express";
import { 
    createUserService,
    listUsersService,
    updateUserInformationService, 
    retrieveUserService,
    softDeleteUserService
} from "../services";
import { UserDTO, Paginator } from "../classes";

const listUsersController = async(req: Request, res: Response): Promise<Response> => {
    const users: UserDTO[] = await listUsersService(res.locals.idRequestingUser);
    const paginatedUsers: Paginator<UserDTO> = new Paginator(
        users, 
        Number(req.query.page), 
        Number(req.query.limit)
    );
    return res.status(200).json(paginatedUsers);
}

const createUserController = async(req: Request, res: Response):
        Promise<Response> => {
    const message = await createUserService(
        res.locals.idRequestingUser,
        req.body
    );
    return res.status(201).json(message);
};

const retrieveUserController = async (req: Request, res: Response):
        Promise<Response> => {
    const user: UserDTO | null = await retrieveUserService(res.locals.idRequestingUser, req.params.idUser);
    return res.status(200).json(user);
};

const updateUserInformationController = async(req: Request, res: Response):
        Promise<Response> => {
    const user: UserDTO = await updateUserInformationService(
        res.locals.idRequestingUser,
        req.params.idUser,
        req.body
    );
    return res.status(200).json(user);
};

const softDeleteUserController = async(req: Request, res: Response): Promise<Response> => {
    await softDeleteUserService(res.locals.idRequestingUser, req.params.idUser);
    return res.status(200).json();
};

export { 
    createUserController,
    listUsersController,
    updateUserInformationController,
    retrieveUserController,
    softDeleteUserController
};