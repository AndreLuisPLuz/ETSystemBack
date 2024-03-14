import { Request, Response } from "express";
import { 
    createUserService,
    listUsersService,
    updateUserInformationService, 
    retrieveUserService 
} from "../services";
import { User } from "../entities";

const createUserController = async(req: Request, res: Response):
        Promise<Response> => {
    const user: User = await createUserService(req.body);
    return res.status(201).json(user);
};

const listUsersController = async(req: Request, res: Response): Promise<Response> => {
    const users: User[] = await listUsersService(res.locals.idUser);
    return res.status(200).json(users);
}

const updateUserInformationController = async(req: Request, res: Response):
        Promise<Response> => {
    const user: User = await updateUserInformationService(req.params.idUser, req.body);
    return res.status(204).json(user);
};

const retrieveUserController = async (req: Request, res: Response):
        Promise<Response> => {
    const user: User | null = await retrieveUserService(req.params.idUser);

    return res.status(200).json(user);
};

export { 
    createUserController,
    listUsersController,
    updateUserInformationController,
    retrieveUserController 
};