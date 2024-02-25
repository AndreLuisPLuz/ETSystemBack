import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1708899450693 implements MigrationInterface {
    name = 'InitialMigration1708899450693'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "person" ("idPerson" uniqueidentifier NOT NULL CONSTRAINT "DF_bac9b8cb8f5eb2d221a90f147ea" DEFAULT NEWSEQUENTIALID(), "name" varchar(255) NOT NULL, "email" varchar(255) NOT NULL, "dateOfBirth" datetime NOT NULL, "contact" varchar(20) NOT NULL, "accessType" smallint NOT NULL, "createdAt" datetime NOT NULL CONSTRAINT "DF_db4ea75ef504a464b3fbad24410" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_2925497ddfc32befd5ea32f2617" DEFAULT getdate(), "deletedAt" datetime, "category" varchar(255) NOT NULL, "institutionId" uniqueidentifier, "classId" uniqueidentifier, CONSTRAINT "PK_bac9b8cb8f5eb2d221a90f147ea" PRIMARY KEY ("idPerson"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_38f5dc8561ed768d1e0312b649" ON "person" ("institutionId") WHERE "institutionId" IS NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_c2fbf05cd5892331fa83298eb1" ON "person" ("classId") WHERE "classId" IS NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_eed8b6d968665abb71b68e67f6" ON "person" ("category") `);
        await queryRunner.query(`CREATE TABLE "institution" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_f60ee4ff0719b7df54830b39087" DEFAULT NEWSEQUENTIALID(), "name" varchar(100) NOT NULL, "createdAt" datetime NOT NULL CONSTRAINT "DF_bddda33015bc18a5afb81fd2e03" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_b02a30b49196269f8709ab8f896" DEFAULT getdate(), "deletedAt" datetime, CONSTRAINT "PK_f60ee4ff0719b7df54830b39087" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "class" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_0b9024d21bdfba8b1bd1c300eae" DEFAULT NEWSEQUENTIALID(), "name" varchar(100) NOT NULL, "dateOfStart" datetime NOT NULL, "dateOfFinish" datetime NOT NULL, "workPeriod" char(1) NOT NULL, "createdAt" datetime NOT NULL CONSTRAINT "DF_1a4a9f0e18104605bb001072ed4" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_d8959bf384d3ef185482b078a86" DEFAULT getdate(), "deletedAt" datetime, CONSTRAINT "PK_0b9024d21bdfba8b1bd1c300eae" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "person" ADD CONSTRAINT "FK_38f5dc8561ed768d1e0312b6497" FOREIGN KEY ("institutionId") REFERENCES "institution"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "person" ADD CONSTRAINT "FK_c2fbf05cd5892331fa83298eb1c" FOREIGN KEY ("classId") REFERENCES "class"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "person" DROP CONSTRAINT "FK_c2fbf05cd5892331fa83298eb1c"`);
        await queryRunner.query(`ALTER TABLE "person" DROP CONSTRAINT "FK_38f5dc8561ed768d1e0312b6497"`);
        await queryRunner.query(`DROP TABLE "class"`);
        await queryRunner.query(`DROP TABLE "institution"`);
        await queryRunner.query(`DROP INDEX "IDX_eed8b6d968665abb71b68e67f6" ON "person"`);
        await queryRunner.query(`DROP INDEX "REL_c2fbf05cd5892331fa83298eb1" ON "person"`);
        await queryRunner.query(`DROP INDEX "REL_38f5dc8561ed768d1e0312b649" ON "person"`);
        await queryRunner.query(`DROP TABLE "person"`);
    }

}
