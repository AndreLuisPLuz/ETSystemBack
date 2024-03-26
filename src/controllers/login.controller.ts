import { Request, Response } from "express";
import { loginService } from "../services/login.service";

import { ILoginResponse } from "../contracts";

const loginController = async(req: Request, res: Response): Promise<Response> => {
    const response: ILoginResponse = await loginService(req.body);
    return res.status(200).json(response);
}

export { loginController };