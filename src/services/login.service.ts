import { ILoginPayload, ILoginResponse } from "../contracts";
import { AppDataSource } from "../data-source";
import { User } from "../entities";

import { Repository } from "typeorm";
import { AppError } from "../errors";

import { compareSync } from "bcryptjs";
import { sign } from "jsonwebtoken";
import 'dotenv/config';

const loginService = async(payload: ILoginPayload): Promise<ILoginResponse> => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User);
    const foundUser: User | null = await userRepo.findOneBy({username: payload.username});

    if (!foundUser) {
        throw new AppError('Invalid credentials.', 401);
    }

    if (!compareSync(payload.password, foundUser.password)) {
        throw new AppError('Invalid credentials', 401);
    }

    const idUser = foundUser.idUser;
    const token: string = sign(
        { idRequestingUser: foundUser.idUser },
        String(process.env.SECRET_KEY),
        { expiresIn: '2 days' }
    );

    return {token, idUser};
}

export { loginService };