import { CompetenceGroup } from "../../entities";
import { CompetenceDTO } from "./competence.dto";

export class CompetenceGroupDTO {
    idCompetenceGroup!: string;
    idAppliedDiscipline!: string;
    description!: string;

    public constructor(competenceGroup: CompetenceGroup) {
        this.idCompetenceGroup = competenceGroup.idCompetenceGroup;
        this.idAppliedDiscipline = competenceGroup.appliedDiscipline.idAppliedDiscipline;
        this.description = competenceGroup.description;
    }
};

export class CompetenceGroupSingleDTO extends CompetenceGroupDTO {
    competences!: CompetenceDTO[];

    public constructor(competenceGroup: CompetenceGroup) {
        super(competenceGroup);

        this.competences = competenceGroup.competences.map((competence) => 
            new CompetenceDTO(competence)
        );
    }
}