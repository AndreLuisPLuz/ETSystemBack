import { MigrationInterface, QueryRunner } from "typeorm";

export class IsBoschAddedDiscipline1711562622473 implements MigrationInterface {
    name = 'IsBoschAddedDiscipline1711562622473'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "discipline" ADD "isBosch" bit NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "discipline" DROP COLUMN "isBosch"`);
    }

}
