import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors";

import { RequirementTypes, IReqRequirements } from "../contracts";
import { Repository } from "typeorm";
import { IsBosch, User } from "../entities";

const buildRequirements = async(req: Request, res: Response, next: NextFunction) => {
    const requirements: IReqRequirements = res.locals.requirements;

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

    for (let property in requirements) {
        switch(property) {
            case RequirementTypes.OWN_USER:
                requirements[property] = (requestingUser.idUser == res.locals.idRequestingUser);
                break;
            case RequirementTypes.INSTRUCTOR:
                requirements[property] = (requestingUser.instructor != undefined);
                break;
            case RequirementTypes.ADMIN:
                requirements[property] = (requestingUser.administrator != undefined);
                break;
            case RequirementTypes.IS_BOSCH:
                requirements[property] = (requestingUser.institution.isBosch == IsBosch.TRUE);
                break;
            case RequirementTypes.MASTER:
                if (requestingUser.administrator != undefined) {
                    requirements[property] = (requestingUser.administrator.isMaster);
                }
                break;
            case RequirementTypes.ADMIN_AND_BOSCH:
                requirements[property] = (
                    (requestingUser.administrator != undefined)
                    && (requestingUser.institution.isBosch == IsBosch.TRUE)
                );
                break;
            case RequirementTypes.ADMIN_NOT_BOSCH:
                requirements[property] = (
                    (requestingUser.administrator != undefined)
                    && (requestingUser.institution.isBosch == IsBosch.FALSE)
                );
                break;
        }
    }

    for (let property in requirements) {
        if (requirements[property]) {
            return next();
        }
    }
    
    throw new AppError("Action not allowed with user access level.", 403);
}

export { buildRequirements };