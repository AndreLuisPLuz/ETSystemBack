import { AppliedDiscipline } from "../../entities";
import { CompetenceGroupSingleDTO } from "./competenceGroup.dto";

export class AppliedDisciplineDTO {
    idAppliedDiscipline!: string;
    idDiscipline!: string;
    idStudentGroup!: string;
    idInstructor!: string;
    period!: number;
    totalHours!: number;
    isComplete!: boolean;

    public constructor(appliedDiscipline: AppliedDiscipline) {
        this.idAppliedDiscipline = appliedDiscipline.idAppliedDiscipline;
        this.idDiscipline = appliedDiscipline.discipline.idDiscipline;
        this.idStudentGroup = appliedDiscipline.studentGroup.idStudentGroup;
        this.idInstructor = appliedDiscipline.instructor.instructorId;
        this.period = appliedDiscipline.period;
        this.totalHours = appliedDiscipline.totalHours;
        this.isComplete = appliedDiscipline.isComplete;
    }
};

export class AppliedDisciplineSingleDTO extends AppliedDisciplineDTO {
    competenceGroups!: CompetenceGroupSingleDTO[] | null;

    public constructor(appliedDiscipline: AppliedDiscipline) {
        super(appliedDiscipline);

        this.competenceGroups = (appliedDiscipline.competenceGroups)
            ? appliedDiscipline.competenceGroups.map(
                (group) => new CompetenceGroupSingleDTO(group)
            )
            : null;
    }
};