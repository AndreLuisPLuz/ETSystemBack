import { IUserCreatePayload, IUserRegisterPayload } from "./user.interface"
import { IInstitutionCreatePayload } from "./institution.interface"
import { IStudentGroupCreatePayload, IStudentGroupUpdatePayload } from "./studentGroup.interface"
import { IInstructorCreatePayload } from "./instructor.interface"
import { IAdministratorCreatePayload } from "./administrator.interface"
import {
    ILoginPayload,
    ILoginResponse
} from "./login.interface"
import { 
    RequirementTypes,
    IReqRequirements
} from "./reqRequirements.interface";

export {
    IUserCreatePayload, IUserRegisterPayload,
    IInstitutionCreatePayload,
    IStudentGroupCreatePayload, IStudentGroupUpdatePayload,
    IInstructorCreatePayload,
    IAdministratorCreatePayload,
    ILoginPayload, ILoginResponse,
    RequirementTypes,
    IReqRequirements
}