import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors";

import { Repository } from "typeorm";
import { Administrator, User } from "../entities";

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
    );

    const userRepo: Repository<User> = AppDataSource.getRepository(User);
    const requestingUser: User | null = await userRepo.findOneBy({idUser: res.locals.idRequestingUser});

    if (!requestingUser) {
        throw new AppError('Requesting user not found.', 404);
    }

    return next();
}

export { authenticateToken };