import { IUserCreatePayload } from "./user.interface";

export interface IAdministratorCreatePayload {
    user: IUserCreatePayload;
    idInstitution: string;
}