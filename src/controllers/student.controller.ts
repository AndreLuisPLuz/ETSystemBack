import { Request, Response } from "express";
import { createStudentService } from "../services";
import { UserSingleDTO } from "../classes";

const createStudentController = async(req: Request, res: Response): Promise<Response> => {
    const user: UserSingleDTO = await createStudentService(
        req.params.idUser,
        req.body.idStudentGroup
    );
    return res.status(201).json(user);
};

export { createStudentController };