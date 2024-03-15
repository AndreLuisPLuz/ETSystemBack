import { Request, Response } from "express";
import { 
    createUserService,
    listUsersService,
    updateUserInformationService, 
    retrieveUserService 
} from "../services";
import { UserDTO, Paginator } from "../classes";

const createUserController = async(req: Request, res: Response):
        Promise<Response> => {
    const message = await createUserService(req.body);
    return res.status(201).json(message);
};

const listUsersController = async(req: Request, res: Response): Promise<Response> => {
    const users: UserDTO[] = await listUsersService(res.locals.idUser);
    const paginatedUsers: Paginator<UserDTO> = new Paginator(
        users, 
        Number(req.query.page), 
        Number(req.query.limit)
    );
    return res.status(200).json(paginatedUsers);
}

const updateUserInformationController = async(req: Request, res: Response):
        Promise<Response> => {
    const user: UserDTO = await updateUserInformationService(
        res.locals.idUser,
        req.params.id,
        req.body
    );
    return res.status(204).json(user);
};

const retrieveUserController = async (req: Request, res: Response):
        Promise<Response> => {
    const user: UserDTO | null = await retrieveUserService(res.locals.idUser, req.params.userId);

    return res.status(200).json(user);
};

export { 
    createUserController,
    listUsersController,
    updateUserInformationController,
    retrieveUserController 
};