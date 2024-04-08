import { CompetenceGroup } from "../../entities";
import { CompetenceDTO } from "./competence.dto";

export class CompetenceGroupDTO {
    idCompetenceGroup!: string;
    description!: string;

    public constructor(competenceGroup: CompetenceGroup) {
        this.idCompetenceGroup = competenceGroup.idCompetenceGroup;
        this.description = competenceGroup.description;
    }
};

export class CompetenceGroupSingleDTO extends CompetenceGroupDTO {
    competences!: CompetenceDTO[] | null;

    public constructor(competenceGroup: CompetenceGroup) {
        super(competenceGroup);

        this.competences = (competenceGroup.competences)
            ? competenceGroup.competences.map(
                (competence) => new CompetenceDTO(competence)
            )
            : null;
    }
}