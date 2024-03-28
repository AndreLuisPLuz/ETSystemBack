import { MigrationInterface, QueryRunner } from "typeorm";

export class NonNullablesAppliedDiscipline1711652132959 implements MigrationInterface {
    name = 'NonNullablesAppliedDiscipline1711652132959'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "applied_discipline" DROP CONSTRAINT "FK_ced445b8a76f684a39dfe2acf45"`);
        await queryRunner.query(`ALTER TABLE "applied_discipline" DROP CONSTRAINT "FK_555269e65e05950ddd288b8f1c7"`);
        await queryRunner.query(`ALTER TABLE "applied_discipline" DROP CONSTRAINT "FK_63ca83094d7d1aeadcb22057e22"`);
        await queryRunner.query(`ALTER TABLE "applied_discipline" ALTER COLUMN "disciplineIdDiscipline" uniqueidentifier NOT NULL`);
        await queryRunner.query(`ALTER TABLE "applied_discipline" ALTER COLUMN "studentGroupIdStudentGroup" uniqueidentifier NOT NULL`);
        await queryRunner.query(`ALTER TABLE "applied_discipline" ALTER COLUMN "instructorInstructorId" uniqueidentifier NOT NULL`);
        await queryRunner.query(`ALTER TABLE "applied_discipline" ADD CONSTRAINT "FK_ced445b8a76f684a39dfe2acf45" FOREIGN KEY ("disciplineIdDiscipline") REFERENCES "discipline"("idDiscipline") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "applied_discipline" ADD CONSTRAINT "FK_555269e65e05950ddd288b8f1c7" FOREIGN KEY ("studentGroupIdStudentGroup") REFERENCES "student_group"("idStudentGroup") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "applied_discipline" ADD CONSTRAINT "FK_63ca83094d7d1aeadcb22057e22" FOREIGN KEY ("instructorInstructorId") REFERENCES "instructor"("instructorId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "applied_discipline" DROP CONSTRAINT "FK_63ca83094d7d1aeadcb22057e22"`);
        await queryRunner.query(`ALTER TABLE "applied_discipline" DROP CONSTRAINT "FK_555269e65e05950ddd288b8f1c7"`);
        await queryRunner.query(`ALTER TABLE "applied_discipline" DROP CONSTRAINT "FK_ced445b8a76f684a39dfe2acf45"`);
        await queryRunner.query(`ALTER TABLE "applied_discipline" ALTER COLUMN "instructorInstructorId" uniqueidentifier`);
        await queryRunner.query(`ALTER TABLE "applied_discipline" ALTER COLUMN "studentGroupIdStudentGroup" uniqueidentifier`);
        await queryRunner.query(`ALTER TABLE "applied_discipline" ALTER COLUMN "disciplineIdDiscipline" uniqueidentifier`);
        await queryRunner.query(`ALTER TABLE "applied_discipline" ADD CONSTRAINT "FK_63ca83094d7d1aeadcb22057e22" FOREIGN KEY ("instructorInstructorId") REFERENCES "instructor"("instructorId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "applied_discipline" ADD CONSTRAINT "FK_555269e65e05950ddd288b8f1c7" FOREIGN KEY ("studentGroupIdStudentGroup") REFERENCES "student_group"("idStudentGroup") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "applied_discipline" ADD CONSTRAINT "FK_ced445b8a76f684a39dfe2acf45" FOREIGN KEY ("disciplineIdDiscipline") REFERENCES "discipline"("idDiscipline") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
