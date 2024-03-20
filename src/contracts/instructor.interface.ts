import { IUserCreatePayload } from "./user.interface";

export interface IInstructorCreatePayload {
    user: IUserCreatePayload;
    idInstitution: string;
}