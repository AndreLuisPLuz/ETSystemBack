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

const authenticateBosch = async(req: Request, res: Response, next: NextFunction) => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User);
    const user: User = await userRepo.findOneOrFail({
        where: {
            idUser: res.locals.idRequestingUser
        },
        relations: {
            institution: true
        }
    });

    if (!user.institution.isBosch) {
        throw new AppError("Incorrect institution access.", 403);
    }

    return next();
};

const authenticateAdmin = async(req: Request, res: Response, next: NextFunction) => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User);
    const requestingUser: User = await userRepo.findOneOrFail({
        where: {
            idUser: res.locals.idRequestingUser
        },
        relations: {
            administrator: true
        }
    });

    if (!requestingUser.administrator) {
        throw new AppError("Access level not high enough to perform action.", 403);
    }

    res.locals.idAdmin = requestingUser.administrator.idAdministrator;

    return next();
};

const authenticateMaster = async(req: Request, res: Response, next: NextFunction) => {
    const adminRepo: Repository<Administrator> = AppDataSource.getRepository(Administrator);
    const admin: Administrator = await adminRepo.findOneByOrFail(res.locals.idAdmin);

    if (!admin.isMaster) {
        throw new AppError("Access level not high enough to perform action.", 403);
    }

    return next();
};

const authenticateBoschOrMaster = async(req: Request, res: Response, next: NextFunction) => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User);
    const user: User = await userRepo.findOneOrFail({
        where: {
            idUser: res.locals.idRequestingUser
        },
        relations: {
            administrator: true,
            institution: true
        }
    });

    if (!user.administrator.isMaster && !user.institution.isBosch) {
        throw new AppError("Access level not high enough to perform action.", 403);
    }

    return next();
};

const authenticateOwnUser = async(req: Request, res: Response, next: NextFunction) => {
    if (res.locals.idAdmin != undefined) {
        return next();
    }

    if (res.locals.idRequestingUser != req.params.idUser) {
        throw new AppError("Access level not high enough to perform action.", 403);
    }

    return next();
};

export { 
    authenticateToken,
    authenticateBosch,
    authenticateAdmin,
    authenticateMaster,
    authenticateBoschOrMaster,
    authenticateOwnUser
};