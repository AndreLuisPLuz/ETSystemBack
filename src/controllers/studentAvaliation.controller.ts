import { Request, Response } from "express";
import { createStudentAvaliationService } from "../services/studentAvaliation.service";

const createStudentAvaliationController = async(req: Request, res: Response): Promise<Response> => {
    await createStudentAvaliationService(
        req.params.idAppliedDiscipline,
        req.params.idStudent,
        req.body
    );

    return res.status(201).json();
}

export { createStudentAvaliationController };