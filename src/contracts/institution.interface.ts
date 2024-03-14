import { IsBosch } from "../entities";

export interface IInstitutionCreatePayload {
    name: string,
    isBosch: IsBosch,
}