import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors";

import { RequirementTypes, IReqRequirements } from "../contracts";
import { Repository } from "typeorm";
import { IsBosch, User } from "../entities";

import { AccessLevel } from "../classes";

const checkOwnUser = async (requestingUser: User, res: Response): Promise<boolean> => {
    return requestingUser.idUser == res.locals.idRequestingUser;
};

const checkStudent = async (requestingUser: User): Promise<boolean> => {
    return requestingUser.student !== undefined;
}

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
    if (!requestingUser.administrator) {
        return false;
    }
    return requestingUser.administrator.isMaster;
};

const checkAdminAndBosch = async (requestingUser: User): Promise<boolean> => {
    if (!requestingUser.administrator) {
        return false;
    }
    return requestingUser.institution.isBosch == IsBosch.TRUE;
};

const checkAdminNotBosch = async (requestingUser: User): Promise<boolean> => {
    if (!requestingUser.administrator) {
        return false;
    }
    return requestingUser.institution.isBosch == IsBosch.FALSE;
};

const checkInstructorAndBosch = async (requestingUser: User): Promise<boolean> => {
    if (!requestingUser.instructor) {
        return false;
    }
    return requestingUser.institution.isBosch == IsBosch.TRUE;
};

const checkInstructorNotBosch = async (requestingUser: User): Promise<boolean> => {
    if (!requestingUser.instructor) {
        return false;
    }
    return requestingUser.institution.isBosch == IsBosch.FALSE;
};

const requirementChecks: { [key: string]: (user: User, res: Response) => Promise<boolean> } = {
    [RequirementTypes.OWN_USER]: checkOwnUser,
    [RequirementTypes.STUDENT]: checkStudent,
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
        relations: [
            'administrator',
            'instructor',
            'student',
            'student.studentGroup',
            'institution'
        ]
    });

    res.locals.isBosch = requestingUser.institution.isBosch;
    res.locals.accessLevel = (() => {
        if (requestingUser.administrator) { return AccessLevel.ADMINISTRATOR };
        if (requestingUser.instructor) { return AccessLevel.INSTRUCTOR };
        if (requestingUser.student) { return AccessLevel.STUDENT };
    })();

    switch(res.locals.accessLevel) {
        case AccessLevel.ADMINISTRATOR:
            res.locals.idAdministrator = requestingUser.administrator.idAdministrator;
            res.locals.accessLevel = requestingUser.administrator.isMaster
                ? AccessLevel.MASTER
                : AccessLevel.ADMINISTRATOR;
            break;
        case AccessLevel.INSTRUCTOR:
            res.locals.idInstructor = requestingUser.instructor.instructorId;
            break;
        case AccessLevel.STUDENT:
            res.locals.idStudent = requestingUser.student.idStudent;
            break;
    }

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