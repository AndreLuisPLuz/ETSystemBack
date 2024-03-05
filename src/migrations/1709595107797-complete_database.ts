import { MigrationInterface, QueryRunner } from "typeorm";

export class CompleteDatabase1709595107797 implements MigrationInterface {
    name = 'CompleteDatabase1709595107797'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("idUser" uniqueidentifier NOT NULL CONSTRAINT "DF_c815460ecf7189b12a7ddd2d635" DEFAULT NEWSEQUENTIALID(), "username" varchar(50) NOT NULL, "password" varchar(255) NOT NULL, "name" varchar(255), "email" varchar(255), "dateOfBirth" datetime, "contact" varchar(20), "createdAt" datetime NOT NULL CONSTRAINT "DF_e11e649824a45d8ed01d597fd93" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_80ca6e6ef65fb9ef34ea8c90f42" DEFAULT getdate(), "deletedAt" datetime, CONSTRAINT "PK_c815460ecf7189b12a7ddd2d635" PRIMARY KEY ("idUser"))`);
        await queryRunner.query(`CREATE TABLE "discipline_category" ("idDisciplineCategory" uniqueidentifier NOT NULL CONSTRAINT "DF_dc902187a298c23f80bffc853bc" DEFAULT NEWSEQUENTIALID(), "name" varchar(50) NOT NULL, CONSTRAINT "PK_dc902187a298c23f80bffc853bc" PRIMARY KEY ("idDisciplineCategory"))`);
        await queryRunner.query(`CREATE TABLE "competence_student" ("idCompetenceStudent" uniqueidentifier NOT NULL CONSTRAINT "DF_b7374e235e0af736d020867e69c" DEFAULT NEWSEQUENTIALID(), "status" char NOT NULL, "competenceIdDiscipline" uniqueidentifier, "studentIdStudent" uniqueidentifier, CONSTRAINT "PK_b7374e235e0af736d020867e69c" PRIMARY KEY ("idCompetenceStudent"))`);
        await queryRunner.query(`CREATE TABLE "competence" ("idDiscipline" uniqueidentifier NOT NULL CONSTRAINT "DF_0e872b386ccfedbed4d4139463f" DEFAULT NEWSEQUENTIALID(), "name" varchar(255) NOT NULL, "description" text NOT NULL, "weight" smallint NOT NULL, "createdAt" datetime NOT NULL CONSTRAINT "DF_cc1c9c6c223c432e6b3d53caf1c" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_96121f28c0c984a6e27cab3cf39" DEFAULT getdate(), "deletedAt" datetime, "competenceGroupIdCompetence" uniqueidentifier, CONSTRAINT "PK_0e872b386ccfedbed4d4139463f" PRIMARY KEY ("idDiscipline"))`);
        await queryRunner.query(`CREATE TABLE "competence_group" ("idCompetence" uniqueidentifier NOT NULL CONSTRAINT "DF_c1872e51e9f60ae77ed386d5f76" DEFAULT NEWSEQUENTIALID(), "name" varchar(255) NOT NULL, "createdAt" datetime NOT NULL CONSTRAINT "DF_e734b97ce01e4c0db24b3123dfb" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_e794fbfa1d5cec1f9656e168d67" DEFAULT getdate(), "deletedAt" datetime, "disciplineIdDiscipline" uniqueidentifier, CONSTRAINT "PK_c1872e51e9f60ae77ed386d5f76" PRIMARY KEY ("idCompetence"))`);
        await queryRunner.query(`CREATE TABLE "discipline" ("idDiscipline" uniqueidentifier NOT NULL CONSTRAINT "DF_9a950767454aebbb1d975c7ea3b" DEFAULT NEWSEQUENTIALID(), "name" varchar(255) NOT NULL, "createdAt" datetime NOT NULL CONSTRAINT "DF_69daf06e85caf5fb8bf58778ea2" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_b02498c9efe3eb21d2978a593fb" DEFAULT getdate(), "deletedAt" datetime, "disciplineCategoryIdDisciplineCategory" uniqueidentifier, CONSTRAINT "PK_9a950767454aebbb1d975c7ea3b" PRIMARY KEY ("idDiscipline"))`);
        await queryRunner.query(`CREATE TABLE "administrator" ("administratorId" uniqueidentifier NOT NULL CONSTRAINT "DF_10057fa406f12bf462fa20d607c" DEFAULT NEWSEQUENTIALID(), "isMaster" bit NOT NULL CONSTRAINT "DF_2176caadaadad01f7ddcce759a4" DEFAULT 0, "createdAt" datetime NOT NULL CONSTRAINT "DF_eea6af2e47d5dcf51350e508bde" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_8a957bf61341b281791d6640a94" DEFAULT getdate(), "deletedAt" datetime, "userIdUser" uniqueidentifier, "institutionId" uniqueidentifier, CONSTRAINT "PK_10057fa406f12bf462fa20d607c" PRIMARY KEY ("administratorId"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_f247fcd75fa581a06da4ed1a74" ON "administrator" ("userIdUser") WHERE "userIdUser" IS NOT NULL`);
        await queryRunner.query(`CREATE TABLE "instructor" ("instructorId" uniqueidentifier NOT NULL CONSTRAINT "DF_28ab3f815da4525599068c0d0e1" DEFAULT NEWSEQUENTIALID(), "createdAt" datetime NOT NULL CONSTRAINT "DF_c4f38bd80b29768909d94022599" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_d78689696f600d4c451d41f399d" DEFAULT getdate(), "deletedAt" datetime, "userIdUser" uniqueidentifier, "institutionId" uniqueidentifier, CONSTRAINT "PK_28ab3f815da4525599068c0d0e1" PRIMARY KEY ("instructorId"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_fea2208c1e29ae902431c1e546" ON "instructor" ("userIdUser") WHERE "userIdUser" IS NOT NULL`);
        await queryRunner.query(`CREATE TABLE "discipline_class" ("idDisciplineCategory" uniqueidentifier NOT NULL CONSTRAINT "DF_675e92e8d5a3b916c4f72c220d4" DEFAULT NEWSEQUENTIALID(), "period" smallint NOT NULL, "is_complete" bit NOT NULL CONSTRAINT "DF_0221b647e76706760556de21919" DEFAULT 0, "total_hours" float NOT NULL, "disciplineIdDiscipline" uniqueidentifier, "classId" uniqueidentifier, "instructorInstructorId" uniqueidentifier, CONSTRAINT "PK_675e92e8d5a3b916c4f72c220d4" PRIMARY KEY ("idDisciplineCategory"))`);
        await queryRunner.query(`CREATE TABLE "student" ("idStudent" uniqueidentifier NOT NULL CONSTRAINT "DF_9dea2a51adf70b1fc16bd213b55" DEFAULT NEWSEQUENTIALID(), "createdAt" datetime NOT NULL CONSTRAINT "DF_c04389662909caffbe494673c94" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_00376a179004fd1b897ba7c800b" DEFAULT getdate(), "deletedAt" datetime, "userIdUser" uniqueidentifier, "classId" uniqueidentifier, CONSTRAINT "PK_9dea2a51adf70b1fc16bd213b55" PRIMARY KEY ("idStudent"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_f2e4228a7870dc2bc6d97040fd" ON "student" ("userIdUser") WHERE "userIdUser" IS NOT NULL`);
        await queryRunner.query(`ALTER TABLE "institution" ADD "isBosch" bit NOT NULL`);
        await queryRunner.query(`ALTER TABLE "class" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "class" ADD "name" varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "class" ALTER COLUMN "dateOfFinish" datetime`);
        await queryRunner.query(`ALTER TABLE "competence_student" ADD CONSTRAINT "FK_4976315325f318cfe723b261961" FOREIGN KEY ("competenceIdDiscipline") REFERENCES "competence"("idDiscipline") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "competence_student" ADD CONSTRAINT "FK_ec7c012bb97b4d47083b4046bb2" FOREIGN KEY ("studentIdStudent") REFERENCES "student"("idStudent") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "competence" ADD CONSTRAINT "FK_b534b84da9727318754153aac29" FOREIGN KEY ("competenceGroupIdCompetence") REFERENCES "competence_group"("idCompetence") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "competence_group" ADD CONSTRAINT "FK_d7e5f02a2d26b8cbe8e1f274a50" FOREIGN KEY ("disciplineIdDiscipline") REFERENCES "discipline"("idDiscipline") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "discipline" ADD CONSTRAINT "FK_5a070fa7848f195e4490da1a54a" FOREIGN KEY ("disciplineCategoryIdDisciplineCategory") REFERENCES "discipline_category"("idDisciplineCategory") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "administrator" ADD CONSTRAINT "FK_f247fcd75fa581a06da4ed1a742" FOREIGN KEY ("userIdUser") REFERENCES "user"("idUser") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "administrator" ADD CONSTRAINT "FK_5c80f319d954105eaeafed615c9" FOREIGN KEY ("institutionId") REFERENCES "institution"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "instructor" ADD CONSTRAINT "FK_fea2208c1e29ae902431c1e5466" FOREIGN KEY ("userIdUser") REFERENCES "user"("idUser") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "instructor" ADD CONSTRAINT "FK_8fc00d8d39e4528460afcca1707" FOREIGN KEY ("institutionId") REFERENCES "institution"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "discipline_class" ADD CONSTRAINT "FK_b9606c2b9d6a88a62fce20c70e9" FOREIGN KEY ("disciplineIdDiscipline") REFERENCES "discipline"("idDiscipline") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "discipline_class" ADD CONSTRAINT "FK_d86b662a95e4b6c4410bcb204de" FOREIGN KEY ("classId") REFERENCES "class"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "discipline_class" ADD CONSTRAINT "FK_3307bb686bd916344a5d0e39026" FOREIGN KEY ("instructorInstructorId") REFERENCES "instructor"("instructorId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "FK_f2e4228a7870dc2bc6d97040fd7" FOREIGN KEY ("userIdUser") REFERENCES "user"("idUser") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "FK_bd5c8f2ef67394162384a484ba1" FOREIGN KEY ("classId") REFERENCES "class"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "FK_bd5c8f2ef67394162384a484ba1"`);
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "FK_f2e4228a7870dc2bc6d97040fd7"`);
        await queryRunner.query(`ALTER TABLE "discipline_class" DROP CONSTRAINT "FK_3307bb686bd916344a5d0e39026"`);
        await queryRunner.query(`ALTER TABLE "discipline_class" DROP CONSTRAINT "FK_d86b662a95e4b6c4410bcb204de"`);
        await queryRunner.query(`ALTER TABLE "discipline_class" DROP CONSTRAINT "FK_b9606c2b9d6a88a62fce20c70e9"`);
        await queryRunner.query(`ALTER TABLE "instructor" DROP CONSTRAINT "FK_8fc00d8d39e4528460afcca1707"`);
        await queryRunner.query(`ALTER TABLE "instructor" DROP CONSTRAINT "FK_fea2208c1e29ae902431c1e5466"`);
        await queryRunner.query(`ALTER TABLE "administrator" DROP CONSTRAINT "FK_5c80f319d954105eaeafed615c9"`);
        await queryRunner.query(`ALTER TABLE "administrator" DROP CONSTRAINT "FK_f247fcd75fa581a06da4ed1a742"`);
        await queryRunner.query(`ALTER TABLE "discipline" DROP CONSTRAINT "FK_5a070fa7848f195e4490da1a54a"`);
        await queryRunner.query(`ALTER TABLE "competence_group" DROP CONSTRAINT "FK_d7e5f02a2d26b8cbe8e1f274a50"`);
        await queryRunner.query(`ALTER TABLE "competence" DROP CONSTRAINT "FK_b534b84da9727318754153aac29"`);
        await queryRunner.query(`ALTER TABLE "competence_student" DROP CONSTRAINT "FK_ec7c012bb97b4d47083b4046bb2"`);
        await queryRunner.query(`ALTER TABLE "competence_student" DROP CONSTRAINT "FK_4976315325f318cfe723b261961"`);
        await queryRunner.query(`ALTER TABLE "class" ALTER COLUMN "dateOfFinish" datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE "class" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "class" ADD "name" varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "institution" DROP COLUMN "isBosch"`);
        await queryRunner.query(`DROP INDEX "REL_f2e4228a7870dc2bc6d97040fd" ON "student"`);
        await queryRunner.query(`DROP TABLE "student"`);
        await queryRunner.query(`DROP TABLE "discipline_class"`);
        await queryRunner.query(`DROP INDEX "REL_fea2208c1e29ae902431c1e546" ON "instructor"`);
        await queryRunner.query(`DROP TABLE "instructor"`);
        await queryRunner.query(`DROP INDEX "REL_f247fcd75fa581a06da4ed1a74" ON "administrator"`);
        await queryRunner.query(`DROP TABLE "administrator"`);
        await queryRunner.query(`DROP TABLE "discipline"`);
        await queryRunner.query(`DROP TABLE "competence_group"`);
        await queryRunner.query(`DROP TABLE "competence"`);
        await queryRunner.query(`DROP TABLE "competence_student"`);
        await queryRunner.query(`DROP TABLE "discipline_category"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
