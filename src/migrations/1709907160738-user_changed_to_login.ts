import { MigrationInterface, QueryRunner } from "typeorm";

export class UserChangedToLogin1709907160738 implements MigrationInterface {
    name = 'UserChangedToLogin1709907160738'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "administrator" DROP CONSTRAINT "FK_f247fcd75fa581a06da4ed1a742"`);
        await queryRunner.query(`ALTER TABLE "instructor" DROP CONSTRAINT "FK_fea2208c1e29ae902431c1e5466"`);
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "FK_f2e4228a7870dc2bc6d97040fd7"`);
        await queryRunner.query(`CREATE TABLE "login" ("idUser" uniqueidentifier NOT NULL CONSTRAINT "DF_9e4619a30542d685615c6c1a1d1" DEFAULT NEWSEQUENTIALID(), "username" varchar(50) NOT NULL, "password" varchar(255) NOT NULL, "name" varchar(255), "email" varchar(255), "dateOfBirth" datetime, "contact" varchar(20), "createdAt" datetime NOT NULL CONSTRAINT "DF_a1c79d33d36e08ee34fa3be7bd2" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_ec25f637f69d33b05a2812101e4" DEFAULT getdate(), "deletedAt" datetime, CONSTRAINT "PK_9e4619a30542d685615c6c1a1d1" PRIMARY KEY ("idUser"))`);
        await queryRunner.query(`ALTER TABLE "administrator" ADD CONSTRAINT "FK_f247fcd75fa581a06da4ed1a742" FOREIGN KEY ("userIdUser") REFERENCES "login"("idUser") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "instructor" ADD CONSTRAINT "FK_fea2208c1e29ae902431c1e5466" FOREIGN KEY ("userIdUser") REFERENCES "login"("idUser") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "FK_f2e4228a7870dc2bc6d97040fd7" FOREIGN KEY ("userIdUser") REFERENCES "login"("idUser") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "FK_f2e4228a7870dc2bc6d97040fd7"`);
        await queryRunner.query(`ALTER TABLE "instructor" DROP CONSTRAINT "FK_fea2208c1e29ae902431c1e5466"`);
        await queryRunner.query(`ALTER TABLE "administrator" DROP CONSTRAINT "FK_f247fcd75fa581a06da4ed1a742"`);
        await queryRunner.query(`DROP TABLE "login"`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "FK_f2e4228a7870dc2bc6d97040fd7" FOREIGN KEY ("userIdUser") REFERENCES "user"("idUser") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "instructor" ADD CONSTRAINT "FK_fea2208c1e29ae902431c1e5466" FOREIGN KEY ("userIdUser") REFERENCES "user"("idUser") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "administrator" ADD CONSTRAINT "FK_f247fcd75fa581a06da4ed1a742" FOREIGN KEY ("userIdUser") REFERENCES "user"("idUser") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
