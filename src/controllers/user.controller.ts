import { Request, Response } from "express";
import { 
    createUserService, 
    updateUserInformationService, 
    retrieveUserService 
} from "../services/user.service";
import { User } from "../entities";

const createUserController = async(req: Request, res: Response):
        Promise<Response> => {
    const user: User = await createUserService(req.body);
    return res.status(201).json(user);
};

const updateUserInformationController = async(req: Request, res: Response):
        Promise<Response> => {
    const user: User = await updateUserInformationService(req.params.idUser, req.body);
    return res.status(204).json(user);
};

const retrieveUserController = async (req: Request, res: Response):
        Promise<Response> => {
    const user: User | null = await retrieveUserService(req.params.idUser);

    if (!user) {
        return res.status(404).json({message: 'User not found.'});
    }

    return res.status(200).json(user);
};

export { createUserController, updateUserInformationController, retrieveUserController };