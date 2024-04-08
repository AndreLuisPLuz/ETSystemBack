import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeWeigthToFloat1712603192953 implements MigrationInterface {
    name = 'ChangeWeigthToFloat1712603192953'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "competence" DROP COLUMN "weight"`);
        await queryRunner.query(`ALTER TABLE "competence" ADD "weight" float NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "competence" DROP COLUMN "weight"`);
        await queryRunner.query(`ALTER TABLE "competence" ADD "weight" smallint NOT NULL`);
    }

}
