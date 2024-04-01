export interface IAppliedDisciplineCreatePayload {
    idDiscipline: string,
    idStudentGroup: string,
    idInstructor: string,
    period: number,
    totalHours: number
}

export interface IAppliedDisciplineUpdatePayload {
    idInstructor: string,
    period: number,
    totalHours: number,
    isComplete: boolean
}