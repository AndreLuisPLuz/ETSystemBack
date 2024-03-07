import { ILoginPayload } from "../interfaces";
import { AppDataSource } from "../data-source";
import { User } from "../entities";

import { Repository } from "typeorm";
import { AppError } from "../errors";

import { compareSync } from "bcryptjs"

const loginService = async(payload: ILoginPayload): Promise<User> => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User);
    const foundUser: User | null = await userRepo.findOneBy({email: payload.email});

    if (!foundUser) {
        throw new AppError('Invalid credentials.', 401);
    }

    const compare: boolean = compareSync(payload.password, foundUser.password);

    if (!compare) {
        throw new AppError('Invalid credentials.');
    }

    return foundUser;
}

export { loginService };