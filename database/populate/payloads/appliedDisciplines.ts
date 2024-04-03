interface IAppliedDisciplineCreationInsertion {
    disciplineIndex: number;
    studentGroupIndex: number;
    instructorIndex: number;
    period: number;
    total_hours: number;
}

const appliedDisciplinePayloads:IAppliedDisciplineCreationInsertion[] = [
    {
        disciplineIndex: 0,
        studentGroupIndex: 0,
        instructorIndex: 4,
        period: 1,
        total_hours: 40,
    },
    {
        disciplineIndex: 0,
        studentGroupIndex: 1,
        instructorIndex: 4,
        period: 1,
        total_hours: 40,
    },
    {
        disciplineIndex: 1,
        studentGroupIndex: 0,
        instructorIndex: 6,
        period: 1,
        total_hours: 60,
    },
    {
        disciplineIndex: 1,
        studentGroupIndex: 1,
        instructorIndex: 6,
        period: 1,
        total_hours: 60,
    },
    {
        disciplineIndex: 3,
        studentGroupIndex: 1,
        instructorIndex: 7,
        period: 1,
        total_hours: 120,
    },
]

export default appliedDisciplinePayloads