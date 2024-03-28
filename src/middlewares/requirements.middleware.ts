import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors";

import { RequirementTypes, IReqRequirements } from "../contracts";
import { Repository } from "typeorm";
import { IsBosch, User } from "../entities";

const checkOwnUser = async (requestingUser: User, res: Response): Promise<boolean> => {
    return requestingUser.idUser == res.locals.idRequestingUser;
};

const checkInstructor = async (requestingUser: User): Promise<boolean> => {
    return requestingUser.instructor !== undefined;
};

const checkAdmin = async (requestingUser: User): Promise<boolean> => {
    return requestingUser.administrator !== undefined;
};

const checkIsBosch = async (requestingUser: User): Promise<boolean> => {
    return requestingUser.institution.isBosch == IsBosch.TRUE;
};

const checkMaster = async (requestingUser: User): Promise<boolean> => {
    return requestingUser.administrator !== undefined && requestingUser.administrator.isMaster;
};

const checkAdminAndBosch = async (requestingUser: User): Promise<boolean> => {
    return requestingUser.administrator !== undefined && requestingUser.institution.isBosch == IsBosch.TRUE;
};

const checkAdminNotBosch = async (requestingUser: User): Promise<boolean> => {
    return requestingUser.administrator !== undefined && requestingUser.institution.isBosch == IsBosch.FALSE;
};

const checkInstructorAndBosch = async (requestingUser: User): Promise<boolean> => {
    return requestingUser.instructor !== undefined && requestingUser.institution.isBosch == IsBosch.TRUE;
};

const checkInstructorNotBosch = async (requestingUser: User): Promise<boolean> => {
    return requestingUser.instructor !== undefined && requestingUser.institution.isBosch == IsBosch.FALSE;
};

const requirementChecks: { [key: string]: (user: User, res: Response) => Promise<boolean> } = {
    [RequirementTypes.OWN_USER]: checkOwnUser,
    [RequirementTypes.INSTRUCTOR]: checkInstructor,
    [RequirementTypes.ADMIN]: checkAdmin,
    [RequirementTypes.IS_BOSCH]: checkIsBosch,
    [RequirementTypes.MASTER]: checkMaster,
    [RequirementTypes.ADMIN_AND_BOSCH]: checkAdminAndBosch,
    [RequirementTypes.ADMIN_NOT_BOSCH]: checkAdminNotBosch,
    [RequirementTypes.INSTRUCTOR_AND_BOSCH]: checkInstructorAndBosch,
    [RequirementTypes.INSTRUCTOR_NOT_BOSCH]: checkInstructorNotBosch,
};

const buildRequirements = async (req: Request, res: Response, next: NextFunction) => {
    let requirements: IReqRequirements = res.locals.requirements;

    const userRepo: Repository<User> = AppDataSource.getRepository(User);
    const requestingUser: User = await userRepo.findOneOrFail({
        where: {
            idUser: res.locals.idRequestingUser
        },
        relations: {
            administrator: true,
            instructor: true,
            institution: true
        }
    });

    res.locals.isBosch = requestingUser.institution.isBosch;

    const checksPromises = Object.keys(requirements).map(async (property) => {
        if (requirementChecks[property]) {
            requirements[property] = await requirementChecks[property](requestingUser, res);
        }
    });

    await Promise.all(checksPromises);

    const allowed = Object.values(requirements).some((value) => value);

    if (allowed) {
        return next();
    } else {
        throw new AppError("Action not allowed with user access level.", 403);
    }
};

export { buildRequirements };