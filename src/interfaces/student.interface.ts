import { IUserCreatePayload } from "./user.interface";

export interface IStudentCreatePayload {
    user: IUserCreatePayload,
    idStudentGroup: string,
};