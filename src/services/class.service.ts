import { IClassCreatePayload } from "../interfaces";
import { AppDataSource } from "../data-source";
import { Class } from "../entities";

import { Repository } from "typeorm";
import { AppError } from "../errors";

const createClassService = async(payload: IClassCreatePayload):
        Promise<Class> => {
    const classRepo: Repository<Class> = AppDataSource.getRepository(Class);
    const classObj: Class = classRepo.create(payload);

    return classRepo.save(classObj);
}

const listClassesService = async(): Promise<Class[]> => {
    const classRepo: Repository<Class> = AppDataSource.getRepository(Class);
    
    return await classRepo.find();
}

const retrieveClassService = async(searchId: string): Promise<Class> => {
    const classRepo: Repository<Class> = AppDataSource.getRepository(Class);
    const classObj: Class | null = await classRepo.findOneBy({id: searchId});

    if (!classObj) {
        throw new AppError('Class not found.', 404);
    }

    return classObj;
}