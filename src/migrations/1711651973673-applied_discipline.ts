import { MigrationInterface, QueryRunner } from "typeorm";

export class AppliedDiscipline1711651973673 implements MigrationInterface {
    name = 'AppliedDiscipline1711651973673'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "applied_discipline" ("idAppliedDiscipline" uniqueidentifier NOT NULL CONSTRAINT "DF_b1d3592a2dfb350ad85976fd061" DEFAULT NEWSEQUENTIALID(), "period" smallint NOT NULL, "isComplete" bit NOT NULL CONSTRAINT "DF_7cf958ca50e287884783f2890c1" DEFAULT 0, "totalHours" float NOT NULL, "disciplineIdDiscipline" uniqueidentifier, "studentGroupIdStudentGroup" uniqueidentifier, "instructorInstructorId" uniqueidentifier, CONSTRAINT "PK_b1d3592a2dfb350ad85976fd061" PRIMARY KEY ("idAppliedDiscipline"))`);
        await queryRunner.query(`ALTER TABLE "applied_discipline" ADD CONSTRAINT "FK_ced445b8a76f684a39dfe2acf45" FOREIGN KEY ("disciplineIdDiscipline") REFERENCES "discipline"("idDiscipline") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "applied_discipline" ADD CONSTRAINT "FK_555269e65e05950ddd288b8f1c7" FOREIGN KEY ("studentGroupIdStudentGroup") REFERENCES "student_group"("idStudentGroup") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "applied_discipline" ADD CONSTRAINT "FK_63ca83094d7d1aeadcb22057e22" FOREIGN KEY ("instructorInstructorId") REFERENCES "instructor"("instructorId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "applied_discipline" DROP CONSTRAINT "FK_63ca83094d7d1aeadcb22057e22"`);
        await queryRunner.query(`ALTER TABLE "applied_discipline" DROP CONSTRAINT "FK_555269e65e05950ddd288b8f1c7"`);
        await queryRunner.query(`ALTER TABLE "applied_discipline" DROP CONSTRAINT "FK_ced445b8a76f684a39dfe2acf45"`);
        await queryRunner.query(`DROP TABLE "applied_discipline"`);
    }

}
