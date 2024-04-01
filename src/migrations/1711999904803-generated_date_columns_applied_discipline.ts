import { MigrationInterface, QueryRunner } from "typeorm";

export class GeneratedDateColumnsAppliedDiscipline1711999904803 implements MigrationInterface {
    name = 'GeneratedDateColumnsAppliedDiscipline1711999904803'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "applied_discipline" ADD "createdAt" datetime NOT NULL CONSTRAINT "DF_d00ddab0571c34f807cf6a3a937" DEFAULT getdate()`);
        await queryRunner.query(`ALTER TABLE "applied_discipline" ADD "updatedAt" datetime NOT NULL CONSTRAINT "DF_889bcf67604a135695d8f6d49e0" DEFAULT getdate()`);
        await queryRunner.query(`ALTER TABLE "applied_discipline" ADD "deletedAt" datetime`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "applied_discipline" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "applied_discipline" DROP CONSTRAINT "DF_889bcf67604a135695d8f6d49e0"`);
        await queryRunner.query(`ALTER TABLE "applied_discipline" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "applied_discipline" DROP CONSTRAINT "DF_d00ddab0571c34f807cf6a3a937"`);
        await queryRunner.query(`ALTER TABLE "applied_discipline" DROP COLUMN "createdAt"`);
    }

}
