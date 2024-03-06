import { IUserCreatePayload } from "./user.interface";

export interface IStudentCreatePayload {
    user: IUserCreatePayload,
    idClass: string,
};