import { Request, Response } from "express";
import { createStudentService } from "../services";
import { Student } from "../entities";

const createStudentController = async(req: Request, res: Response): Promise<Response> => {
    const student: Student = await createStudentService(
        req.params.idUser,
        req.params.idStudentGroup
    );
    return res.status(201).json(student);
};

export { createStudentController };