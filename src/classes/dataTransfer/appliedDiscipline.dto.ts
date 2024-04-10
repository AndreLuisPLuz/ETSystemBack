import { AppliedDiscipline } from "../../entities";
import { CompetenceGroupSingleDTO } from "./competenceGroup.dto";
import { UserSingleDTO } from "./user.dto";

export class AppliedDisciplineDTO {
    idAppliedDiscipline!: string;
    idDiscipline!: string;
    disciplineName!: string;
    idStudentGroup!: string;
    idInstructor!: string;
    period!: number;
    totalHours!: number;
    isComplete!: boolean;

    public constructor(appliedDiscipline: AppliedDiscipline) {
        this.idAppliedDiscipline = appliedDiscipline.idAppliedDiscipline;
        this.idDiscipline = appliedDiscipline.discipline.idDiscipline;
        this.disciplineName = appliedDiscipline.discipline.name;
        this.idStudentGroup = appliedDiscipline.studentGroup.idStudentGroup;
        this.idInstructor = appliedDiscipline.instructor.instructorId;
        this.period = appliedDiscipline.period;
        this.totalHours = appliedDiscipline.totalHours;
        this.isComplete = appliedDiscipline.isComplete;
    }
};

export class AppliedDisciplineSingleDTO extends AppliedDisciplineDTO {
    competenceGroups!: CompetenceGroupSingleDTO[] | null;
    instructorUser!: UserSingleDTO;

    public constructor(appliedDiscipline: AppliedDiscipline) {
        super(appliedDiscipline);

        this.competenceGroups = (appliedDiscipline.competenceGroups)
            ? appliedDiscipline.competenceGroups.map(
                (group) => new CompetenceGroupSingleDTO(group)
            )
            : null;

        if (appliedDiscipline.instructor.user) {
            this.instructorUser = new UserSingleDTO(appliedDiscipline.instructor.user);
            this.instructorUser.administrator = undefined;
            this.instructorUser.instructor = undefined;
            this.instructorUser.student = undefined;
        }
    }
};