import { WorkPeriod } from "../entities";

export interface IStudentGroupCreatePayload {
    name: string;
    dateOfStart: Date;
    workPeriod: WorkPeriod;
}

export interface IStudentGroupUpdatePayload {
    name: string;
    dateOfStart: Date;
    dateOfFinish: Date | null;
    workPeriod: WorkPeriod;
}