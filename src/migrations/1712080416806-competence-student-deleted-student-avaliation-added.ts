import { MigrationInterface, QueryRunner } from "typeorm";

export class CompetenceStudentDeletedStudentAvaliationAdded1712080416806 implements MigrationInterface {
    name = 'CompetenceStudentDeletedStudentAvaliationAdded1712080416806'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "student_avaliation" ("idStudentAvaliation" uniqueidentifier NOT NULL CONSTRAINT "DF_e73802b5ec86388ffcc1d398fd5" DEFAULT NEWSEQUENTIALID(), "general_grade" float NOT NULL, "competencesJson" nvarchar(4000) NOT NULL, "observations" nvarchar(4000) NOT NULL, "createdAt" datetime NOT NULL CONSTRAINT "DF_64cf64b58b21b8732eaacc17013" DEFAULT getdate(), "studentIdStudent" uniqueidentifier NOT NULL, "appliedDisciplineIdAppliedDiscipline" uniqueidentifier NOT NULL, CONSTRAINT "PK_e73802b5ec86388ffcc1d398fd5" PRIMARY KEY ("idStudentAvaliation"))`);
        await queryRunner.query(`ALTER TABLE "student_avaliation" ADD CONSTRAINT "FK_305a430cc31d2e95374697e2263" FOREIGN KEY ("studentIdStudent") REFERENCES "student"("idStudent") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student_avaliation" ADD CONSTRAINT "FK_de7305aa08a0e9f7324b6fd2d0e" FOREIGN KEY ("appliedDisciplineIdAppliedDiscipline") REFERENCES "applied_discipline"("idAppliedDiscipline") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student_avaliation" DROP CONSTRAINT "FK_de7305aa08a0e9f7324b6fd2d0e"`);
        await queryRunner.query(`ALTER TABLE "student_avaliation" DROP CONSTRAINT "FK_305a430cc31d2e95374697e2263"`);
        await queryRunner.query(`DROP TABLE "student_avaliation"`);
    }

}
