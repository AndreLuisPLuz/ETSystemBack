import { IUserCreatePayload } from "./user.interface";
import { DisciplineStudentGroup } from "../entities";

export interface IInstructorCreatePayload {
    user: IUserCreatePayload;
    idInstitution: string;
}

export interface IInstructorStudentGroupsGetResponse {
    data: DisciplineStudentGroup[],
    lastPage: string | null,
    nextPage: string
}