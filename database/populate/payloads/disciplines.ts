interface IDisciplineCreateInsertionPayload {
    name: string;
    categoryIndex: number;
}

const disciplinePayloads:IDisciplineCreateInsertionPayload[] = [
    {
        name: "Python",
        categoryIndex: 0
    },
    {
        name: "Java",
        categoryIndex: 0
    },
    {
        name: "IOT",
        categoryIndex: 1
    },
    {
        name: "Usinagem",
        categoryIndex: 1
    },
]

export default disciplinePayloads