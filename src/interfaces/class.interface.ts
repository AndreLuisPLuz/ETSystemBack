export interface IClassCreatePayload {
    name: string;
    dateOfStart: Date;
    dateOfFinish: Date | null,
    workPeriod: string,
}