import { CompetenceStatus } from "../classes";

interface ISubCompetencePayload {
    idCompetence: string;
    status: CompetenceStatus;
}

interface ISubCompetenceGroupPayload {
    idCompetenceGroup: string;
    competences: ISubCompetencePayload[];
}

interface IStudentAvaliationCreatePayload {
    observation: string;
    competenceGroups: ISubCompetenceGroupPayload[];
}

export type { IStudentAvaliationCreatePayload };