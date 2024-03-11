import { MigrationInterface, QueryRunner } from "typeorm";

export class UserChangedPerson1710182510353 implements MigrationInterface {
    name = 'UserChangedPerson1710182510353'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "administrator" DROP CONSTRAINT "FK_f247fcd75fa581a06da4ed1a742"`);
        await queryRunner.query(`ALTER TABLE "instructor" DROP CONSTRAINT "FK_fea2208c1e29ae902431c1e5466"`);
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "FK_f2e4228a7870dc2bc6d97040fd7"`);
        await queryRunner.query(`CREATE TABLE "person" ("idUser" uniqueidentifier NOT NULL CONSTRAINT "DF_a9f512264baa71edd60729a369b" DEFAULT NEWSEQUENTIALID(), "username" varchar(50) NOT NULL, "password" varchar(255) NOT NULL, "name" varchar(255), "email" varchar(255), "dateOfBirth" datetime, "contact" varchar(20), "createdAt" datetime NOT NULL CONSTRAINT "DF_db4ea75ef504a464b3fbad24410" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_2925497ddfc32befd5ea32f2617" DEFAULT getdate(), "deletedAt" datetime, CONSTRAINT "PK_a9f512264baa71edd60729a369b" PRIMARY KEY ("idUser"))`);
        await queryRunner.query(`ALTER TABLE "administrator" ADD CONSTRAINT "FK_f247fcd75fa581a06da4ed1a742" FOREIGN KEY ("userIdUser") REFERENCES "person"("idUser") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "instructor" ADD CONSTRAINT "FK_fea2208c1e29ae902431c1e5466" FOREIGN KEY ("userIdUser") REFERENCES "person"("idUser") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "FK_f2e4228a7870dc2bc6d97040fd7" FOREIGN KEY ("userIdUser") REFERENCES "person"("idUser") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "FK_f2e4228a7870dc2bc6d97040fd7"`);
        await queryRunner.query(`ALTER TABLE "instructor" DROP CONSTRAINT "FK_fea2208c1e29ae902431c1e5466"`);
        await queryRunner.query(`ALTER TABLE "administrator" DROP CONSTRAINT "FK_f247fcd75fa581a06da4ed1a742"`);
        await queryRunner.query(`DROP TABLE "person"`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "FK_f2e4228a7870dc2bc6d97040fd7" FOREIGN KEY ("userIdUser") REFERENCES "user"("idUser") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "instructor" ADD CONSTRAINT "FK_fea2208c1e29ae902431c1e5466" FOREIGN KEY ("userIdUser") REFERENCES "user"("idUser") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "administrator" ADD CONSTRAINT "FK_f247fcd75fa581a06da4ed1a742" FOREIGN KEY ("userIdUser") REFERENCES "user"("idUser") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
