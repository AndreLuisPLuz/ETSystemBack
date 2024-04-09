import { MigrationInterface, QueryRunner } from "typeorm";

export class GeneralGradeNameChange1712681014804 implements MigrationInterface {
    name = 'GeneralGradeNameChange1712681014804'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`EXEC sp_rename "ETSystem.dbo.student_avaliation.general_grade", "generalGrade"`);
        await queryRunner.query(`ALTER TABLE "discipline" DROP CONSTRAINT "FK_5a070fa7848f195e4490da1a54a"`);
        await queryRunner.query(`ALTER TABLE "discipline" ALTER COLUMN "disciplineCategoryIdDisciplineCategory" uniqueidentifier NOT NULL`);
        await queryRunner.query(`ALTER TABLE "discipline" ADD CONSTRAINT "FK_5a070fa7848f195e4490da1a54a" FOREIGN KEY ("disciplineCategoryIdDisciplineCategory") REFERENCES "discipline_category"("idDisciplineCategory") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "discipline" DROP CONSTRAINT "FK_5a070fa7848f195e4490da1a54a"`);
        await queryRunner.query(`ALTER TABLE "discipline" ALTER COLUMN "disciplineCategoryIdDisciplineCategory" uniqueidentifier`);
        await queryRunner.query(`ALTER TABLE "discipline" ADD CONSTRAINT "FK_5a070fa7848f195e4490da1a54a" FOREIGN KEY ("disciplineCategoryIdDisciplineCategory") REFERENCES "discipline_category"("idDisciplineCategory") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`EXEC sp_rename "ETSystem.dbo.student_avaliation.generalGrade", "general_grade"`);
    }

}
