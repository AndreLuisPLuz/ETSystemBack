import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

import { verify } from "jsonwebtoken";
import 'dotenv/config';

const authenticateToken = async(req: Request, res: Response, next: NextFunction) => {
    const authToken: string | undefined = req.headers.authorization;

    if (!authToken) {
        throw new AppError("Missing bearer token.", 401);
    }

    const [_bearer, token] = authToken.split(" ");

    verify(
        token,
        String(process.env.SECRET_KEY),
        (err: any, decoded: any) => {
            if (err) {
                throw new AppError(err.message, 401);
            }

            res.locals.idRequestingUser = decoded.idRequestingUser;
        }
    )

    return next();
}

export { authenticateToken };