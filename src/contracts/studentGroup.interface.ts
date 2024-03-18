export interface IStudentGroupCreatePayload {
    name: string;
    dateOfStart: Date;
    dateOfFinish: Date | null,
    workPeriod: string,
}