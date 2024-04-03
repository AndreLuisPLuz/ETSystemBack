import { IStudentGroupCreatePayload } from "../../../src/contracts"
import { WorkPeriod } from "../../../src/entities"


const studentGroupPayloads:IStudentGroupCreatePayload[] = [
    {
        name: "DTA 1",
        dateOfStart: new Date("2023-08-14"),
        workPeriod: WorkPeriod.AFTERNOON
    },
    {
        name: "DTA 2",
        dateOfStart: new Date("2024-02-05"),
        workPeriod: WorkPeriod.MORNING
    },
    {
        name: "DTA Campinas",
        dateOfStart: new Date("2023-08-14"),
        workPeriod: WorkPeriod.AFTERNOON
    },
]

export default studentGroupPayloads