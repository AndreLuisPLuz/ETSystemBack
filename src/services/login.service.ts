import { ILoginPayload } from "../interfaces";
import { AppDataSource } from "../data-source";
import { User } from "../entities";

import { Repository } from "typeorm";
import { AppError } from "../errors";

import { compareSync, hashSync } from "bcryptjs";
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
        throw new AppError('Invalid credentials. --un', 401);
    }

    const numSaltRounds: number = process.env.NODE_ENV === 'dev' ? 1 : 16;
    const hash = hashSync(payload.password, numSaltRounds);

    const compare: boolean = compareSync(hash, foundUser.password);

    if (!compare) {
        throw new AppError('Invalid credentials --pw.', 401);
    }

    const token: string = sign(
        {
            idUser: foundUser.idUser,
        },
        String(process.env.SECRET_KEY),
        {
            subject: String(foundUser.idUser)
        }
    )

    return token;
}

export { loginService };