import { Request, Response } from "express";
import { createInstructorService } from "../services";

const createInstructorController = async(req: Request, res: Response): Promise<Response> => {
    const user = await createInstructorService(req.params.idUser);
    return res.status(201).json(user);
};

export { createInstructorController };