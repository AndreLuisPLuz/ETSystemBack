import { Request, Response } from "express";
import { createStudentService } from "../services";

const createStudentController = async(req: Request, res: Response): Promise<Response> => {
    const user = await createStudentService(
        req.params.idUser,
        req.body.idStudentGroup
    );
    return res.status(201).json(user);
};

export { createStudentController };