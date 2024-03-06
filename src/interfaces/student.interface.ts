import { IUserCreatePayload } from "./user.interface";

export interface IStudentCreatePayload {
    userPayload: IUserCreatePayload,
    idClass: string,
};