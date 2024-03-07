import { ILoginPayload } from "../interfaces";
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
            email: payload.email,
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
        throw new AppError('Invalid credentials.', 401);
    }

    const token: string = sign(
        {
            user: foundUser,
        },
        String(process.env.SECRET_KEY),
        {
            expiresIn: String(process.env.EXPIRES_IN),
            subject: String(foundUser.idUser)
        }
    )

    return token;
}

export { loginService };