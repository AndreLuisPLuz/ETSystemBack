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
    observations: string;
    competenceGroups: ISubCompetenceGroupPayload[];
}

export type {
    ISubCompetencePayload,
    ISubCompetenceGroupPayload,
    IStudentAvaliationCreatePayload
};