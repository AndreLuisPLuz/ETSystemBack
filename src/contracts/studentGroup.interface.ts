import { WorkPeriod } from "../entities";

export interface IStudentGroupCreatePayload {
    name: string;
    dateOfStart: Date;
    workPeriod: WorkPeriod;
}