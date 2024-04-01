export interface IAppliedDisciplineCreatePayload {
    idDiscipline: string,
    idStudentGroup: string,
    idInstructor: string,
    period: number,
    total_horus: number
}

export interface IAppliedDisciplineUpdatePayload {
    idInstructor: string,
    period: number,
    total_hours: number,
    isComplete: boolean
}