import { Request, Response } from "express";
import { loginService } from "../services/login.service";

const loginController = async(req: Request, res: Response): Promise<Response> => {
    const response = await loginService(req.body);
    return res.status(200).json(response);
}

export { loginController };