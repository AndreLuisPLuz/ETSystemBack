import { ILoginPayload } from "../contracts";
import { AppDataSource } from "../data-source";
import { User } from "../entities";

import { Repository } from "typeorm";
import { AppError } from "../errors";

import { compareSync } from "bcryptjs";
import { sign } from "jsonwebtoken";
import 'dotenv/config';

const loginService = async(payload: ILoginPayload): Promise<string> => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User);
    const foundUser: User | null = await userRepo.findOne({
        where: {
            username: payload.username,
        },
        relations: {
            administrator: true,
            instructor: true,
            student: true,
        }
    })

    if (!foundUser) {
        throw new AppError('Invalid credentials.', 401);
    }

    const compare: boolean = compareSync(payload.password, foundUser.password);

    if (!compare) {
        throw new AppError('Invalid credentials', 401);
    }

    const token: string = sign(
        {
            idRequestingUser: foundUser.idUser,
        },
        String(process.env.SECRET_KEY),
        {
            expiresIn: '2 days'
        }
    )

    return token;
}

export { loginService };