import { IsBosch } from "../../../src/entities";

interface IDisciplineCreateInsertionPayload {
    name: string;
    isBosch: IsBosch;
    categoryIndex: number;
}

const disciplinePayloads:IDisciplineCreateInsertionPayload[] = [
    {
        name: "Python",
        categoryIndex: 0,
        isBosch: IsBosch.TRUE,
    },
    {
        name: "Java",
        categoryIndex: 0,
        isBosch: IsBosch.TRUE
    },
    {
        name: "IOT",
        categoryIndex: 1,
        isBosch: IsBosch.TRUE,
    },
    {
        name: "Usinagem",
        categoryIndex: 1,
        isBosch: IsBosch.TRUE,
    },
]

export default disciplinePayloads