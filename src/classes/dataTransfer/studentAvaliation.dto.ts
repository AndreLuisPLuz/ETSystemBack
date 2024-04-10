import { StudentAvaliation } from "../../entities";

class StudentAvaliationDTO {
    idStudent!: string;
    idAppliedDiscipline!: string;
    disciplineName!: string;
    generalGrade!: number;
    createdAt!: Date;

    public constructor(avaliation: StudentAvaliation) {
        this.idStudent = avaliation.student.idStudent;
        this.idAppliedDiscipline = avaliation.appliedDiscipline.idAppliedDiscipline;
        this.disciplineName = avaliation.appliedDiscipline.discipline.name;
        this.generalGrade = avaliation.generalGrade;
        this.createdAt = avaliation.createdAt;
    }
}

type SubStudentAvaliation = {
    idStudentAvaliation: string;
    generalGrade: number;
    createdAt: Date;
    competences: JSON;
    observations: string;
}

class StudentAvaliationManyDTO {
    idStudent!: string;
    idAppliedDiscipline!: string;
    avaliations: SubStudentAvaliation[];

    public constructor(
        idStudent: string,
        idAppliedDiscipline: string,
        avaliations: StudentAvaliation[]
    ) {

        this.idStudent = idStudent;
        this.idAppliedDiscipline = idAppliedDiscipline

        this.avaliations = avaliations.map((avaliation) => {
            return {
                idStudentAvaliation: avaliation.idStudentAvaliation,
                generalGrade: avaliation.generalGrade,
                createdAt: avaliation.createdAt,
                competences: JSON.parse(avaliation.competencesJson),
                observations: avaliation.observations
            };
        });
    }
}

export {
    StudentAvaliationDTO,
    StudentAvaliationManyDTO
};