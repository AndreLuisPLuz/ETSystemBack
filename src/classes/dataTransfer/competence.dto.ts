import { Competence } from "../../entities";

export class CompetenceDTO {
    idCompetence!: string;
    description!: string;
    weight!: number;

    public constructor(competence: Competence) {
        this.idCompetence = competence.idCompetence;
        this.description = competence.description;
        this.weight = competence.weight;
    }
};