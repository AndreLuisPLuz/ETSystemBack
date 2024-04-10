import { Request, Response } from "express";
import { listInstructorsService, createInstructorService } from "../services";

const listInstructorsController = async(req: Request, res: Response): Promise<Response> => {
    const instructors = await listInstructorsService(res.locals.isBosch);
    return res.status(200).json(instructors);
}

const createInstructorController = async(req: Request, res: Response): Promise<Response> => {
    const user = await createInstructorService(req.params.idUser);
    return res.status(201).json(user);
};

export {
    listInstructorsController,
    createInstructorController
};