import { IStudentAvaliationCreatePayload, ISubCompetenceGroupPayload, ISubCompetencePayload } from "../contracts";
import { AppDataSource } from "../data-source";
import {
    StudentAvaliation,
    AppliedDiscipline,
    Student,
    CompetenceGroup,
    Competence,
    IsBosch
} from "../entities";
import {
    StudentAvaliationDTO,
    StudentAvaliationManyDTO,
    CompetenceStatus,
    AccessLevel
} from "../classes";

import { ObjectId, Repository } from "typeorm";
import { AppError } from "../errors";

type CompetenceObject = {
    description: string;
    weight: number;
    status: CompetenceStatus;
};

type CompetenceGroupObject = {
    description: string;
    competences: CompetenceObject[];
};

const generateCompetencesJsonService = async(
    competenceRepo: Repository<Competence>,
    competenceObj: ISubCompetencePayload
): Promise<CompetenceObject> => {

    const competence = await competenceRepo.findOneBy({
        idCompetence: competenceObj.idCompetence
    });
    
    if (!competence) {
        throw new AppError("Competence not found.", 404);
    }
    
    return {
        description: competence.description,
        weight: competence.weight,
        status: competenceObj.status
    };
};

const generateCompetenceGroupsJsonService = async(
    competenceGroupRepo: Repository<CompetenceGroup>,
    competenceRepo: Repository<Competence>,
    groupObj: ISubCompetenceGroupPayload
): Promise<CompetenceGroupObject> => {

    const competenceGroup = await competenceGroupRepo.findOneBy({
        idCompetenceGroup: groupObj.idCompetenceGroup
    });
    
    if (!competenceGroup) {
        throw new AppError("Competence group not found.", 404);
    }
    
    const competenceObjectPromises = groupObj.competences.map(
        async(competenceObj) => await generateCompetencesJsonService(
            competenceRepo,
            competenceObj
        )
    );
    
    return {
        description: competenceGroup.description,
        competences: await Promise.all(competenceObjectPromises)
    };
}

const calculateGeneralGradeService = (
    competenceGroups: CompetenceGroupObject[]
): number => {
    let totalWeightedScore = 0;
    let totalWeight = 0;
  
    competenceGroups.forEach((group) => {
        group.competences.forEach((competence) => {
            let competenceScore = competence.status / 2;
    
            totalWeightedScore += competenceScore * competence.weight;
            totalWeight += competence.weight;
        });
    });
  
    if (totalWeight === 0) {
      return 0;
    }
  
    return (totalWeightedScore / totalWeight) * 100;
};

const listStudentAvaliationsService = async(
    isBosch: IsBosch,
    idAppliedDiscipline: string
): Promise<StudentAvaliationDTO[]> => {

    const findQuery = AppDataSource
        .getRepository(StudentAvaliation)
        .createQueryBuilder("studentAvaliation")
        .select()
        .innerJoinAndSelect("studentAvaliation.student", "student")
        .innerJoinAndSelect("studentAvaliation.appliedDiscipline", "appliedDiscipline")
        .innerJoinAndSelect("appliedDiscipline.discipline", "discipline")
        .where(
            `appliedDiscipline.idAppliedDiscipline = :idAppliedDiscipline AND
            discipline.isBosch = :isBosch`,
            {
                idAppliedDiscipline: idAppliedDiscipline,
                isBosch: isBosch
            }
        );
    
    const avaliations = await findQuery.getMany();
    const avaliationsShown = avaliations.map((avaliation) =>
        new StudentAvaliationDTO(avaliation)
    );

    return avaliationsShown;
}

const listStudentAvaliationsByStudentService = async(
    isBosch: IsBosch,
    accessLevel: AccessLevel,
    idAppliedDiscipline: string,
    idStudent: string
): Promise<StudentAvaliationManyDTO> => {

    const studentAvaliationRepo = AppDataSource
        .getRepository(StudentAvaliation);
    let findQuery = studentAvaliationRepo
        .createQueryBuilder("studentAvaliation")
        .select()
        .where(
            `studentIdStudent = :idStudent AND
            appliedDisciplineIdAppliedDiscipline = :idAppliedDiscipline`,
            {
                idStudent: idStudent,
                idAppliedDiscipline: idAppliedDiscipline
            }
        );
    
    if (accessLevel in [AccessLevel.ADMINISTRATOR, AccessLevel.MASTER]) {
        findQuery = findQuery
            .innerJoin("studentAvaliation.appliedDiscipline", "appliedDiscipline")
            .innerJoin("appliedDiscipline.discipline", "discipline")
            .andWhere(
                "discipline.isBosch = :isBosch",
                { isBosch: isBosch }
            );
    }

    const studentAvaliations = await findQuery.getMany();

    return new StudentAvaliationManyDTO(
        idStudent,
        idAppliedDiscipline,
        studentAvaliations
    );
};

const createStudentAvaliationService = async(
    idAppliedDiscipline: string,
    idStudent: string,
    payload: IStudentAvaliationCreatePayload
): Promise<void> => {

    const appliedDisciplineRepo = AppDataSource
        .getRepository(AppliedDiscipline);
    const appliedDiscipline = await appliedDisciplineRepo.findOneBy({
        idAppliedDiscipline: idAppliedDiscipline
    });

    if (!appliedDiscipline) {
        throw new AppError("Applied discipline not found.", 404);
    }

    const studentRepo = AppDataSource.getRepository(Student);
    const student = await studentRepo.findOneBy({idStudent: idStudent});

    if (!student) {
        throw new AppError("Student not found.", 404);
    }
    
    const competenceGroupRepo = AppDataSource.getRepository(CompetenceGroup);
    const competenceRepo = AppDataSource.getRepository(Competence);

    const competenceGroupObjectPromises = payload.competenceGroups.map(
        async(group) => await generateCompetenceGroupsJsonService(
            competenceGroupRepo,
            competenceRepo,
            group
        )
    );

    const competenceGroupsObj = await Promise.all(competenceGroupObjectPromises);
    
    const studentAvaliationRepo = AppDataSource
        .getRepository(StudentAvaliation);
    const studentAvaliation = studentAvaliationRepo.create({
        appliedDiscipline: appliedDiscipline,
        student: student,
        observations: payload.observations,
        generalGrade: calculateGeneralGradeService(competenceGroupsObj),
        competencesJson: JSON.stringify(competenceGroupsObj)
    });

    await studentAvaliationRepo.save(studentAvaliation);
};

const deleteStudentAvaliationService = async(
    idStudentAvaliation: string
): Promise<void> => {

    const studentAvaliationRepo = AppDataSource.getRepository(StudentAvaliation);
    const result = await studentAvaliationRepo.delete(idStudentAvaliation);

    if (result.affected == 0 || result.affected === undefined) {
        throw new AppError("Avaliation not found.", 404);
    }
};

export {
    listStudentAvaliationsService,
    listStudentAvaliationsByStudentService,
    createStudentAvaliationService,
    deleteStudentAvaliationService,
};