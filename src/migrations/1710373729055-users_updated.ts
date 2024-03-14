import { MigrationInterface, QueryRunner } from "typeorm";

export class UsersUpdated1710373729055 implements MigrationInterface {
    name = 'UsersUpdated1710373729055'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "instructor" DROP CONSTRAINT "FK_2113daac151237030d0aaccba25"`);
        await queryRunner.query(`ALTER TABLE "administrator" DROP CONSTRAINT "FK_11062c71fc55debfc5fccafa095"`);
        await queryRunner.query(`ALTER TABLE "instructor" DROP COLUMN "institutionIdInstitution"`);
        await queryRunner.query(`ALTER TABLE "administrator" DROP COLUMN "institutionIdInstitution"`);
        await queryRunner.query(`ALTER TABLE "person" ADD "institutionIdInstitution" uniqueidentifier`);
        await queryRunner.query(`ALTER TABLE "person" ADD CONSTRAINT "FK_9c5425ceebb4bcdf99e23173f7c" FOREIGN KEY ("institutionIdInstitution") REFERENCES "institution"("idInstitution") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "person" DROP CONSTRAINT "FK_9c5425ceebb4bcdf99e23173f7c"`);
        await queryRunner.query(`ALTER TABLE "person" DROP COLUMN "institutionIdInstitution"`);
        await queryRunner.query(`ALTER TABLE "administrator" ADD "institutionIdInstitution" uniqueidentifier`);
        await queryRunner.query(`ALTER TABLE "instructor" ADD "institutionIdInstitution" uniqueidentifier`);
        await queryRunner.query(`ALTER TABLE "administrator" ADD CONSTRAINT "FK_11062c71fc55debfc5fccafa095" FOREIGN KEY ("institutionIdInstitution") REFERENCES "institution"("idInstitution") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "instructor" ADD CONSTRAINT "FK_2113daac151237030d0aaccba25" FOREIGN KEY ("institutionIdInstitution") REFERENCES "institution"("idInstitution") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
