import { Request, Response } from "express";
import { createInstructorService } from "../services";
import { UserDTO } from "../classes";

const createInstructorController = async(req: Request, res: Response): Promise<Response> => {
    const user: UserDTO = await createInstructorService(req.params.idUser);
    return res.status(201).json(user);
};

export { createInstructorController };