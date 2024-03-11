import { MigrationInterface, QueryRunner } from "typeorm";

export class Latest1709906805153 implements MigrationInterface {
    name = 'Latest1709906805153'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "discipline_category" ("idDisciplineCategory" uniqueidentifier NOT NULL CONSTRAINT "DF_dc902187a298c23f80bffc853bc" DEFAULT NEWSEQUENTIALID(), "name" varchar(50) NOT NULL, CONSTRAINT "PK_dc902187a298c23f80bffc853bc" PRIMARY KEY ("idDisciplineCategory"))`);
        await queryRunner.query(`CREATE TABLE "competence_student" ("idCompetenceStudent" uniqueidentifier NOT NULL CONSTRAINT "DF_b7374e235e0af736d020867e69c" DEFAULT NEWSEQUENTIALID(), "status" char NOT NULL, "competenceIdDiscipline" uniqueidentifier, "studentIdStudent" uniqueidentifier, CONSTRAINT "PK_b7374e235e0af736d020867e69c" PRIMARY KEY ("idCompetenceStudent"))`);
        await queryRunner.query(`CREATE TABLE "competence" ("idDiscipline" uniqueidentifier NOT NULL CONSTRAINT "DF_0e872b386ccfedbed4d4139463f" DEFAULT NEWSEQUENTIALID(), "name" varchar(255) NOT NULL, "description" text NOT NULL, "weight" smallint NOT NULL, "createdAt" datetime NOT NULL CONSTRAINT "DF_cc1c9c6c223c432e6b3d53caf1c" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_96121f28c0c984a6e27cab3cf39" DEFAULT getdate(), "deletedAt" datetime, "competenceGroupIdCompetence" uniqueidentifier, CONSTRAINT "PK_0e872b386ccfedbed4d4139463f" PRIMARY KEY ("idDiscipline"))`);
        await queryRunner.query(`CREATE TABLE "competence_group" ("idCompetence" uniqueidentifier NOT NULL CONSTRAINT "DF_c1872e51e9f60ae77ed386d5f76" DEFAULT NEWSEQUENTIALID(), "name" varchar(255) NOT NULL, "createdAt" datetime NOT NULL CONSTRAINT "DF_e734b97ce01e4c0db24b3123dfb" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_e794fbfa1d5cec1f9656e168d67" DEFAULT getdate(), "deletedAt" datetime, "disciplineIdDiscipline" uniqueidentifier, CONSTRAINT "PK_c1872e51e9f60ae77ed386d5f76" PRIMARY KEY ("idCompetence"))`);
        await queryRunner.query(`CREATE TABLE "discipline" ("idDiscipline" uniqueidentifier NOT NULL CONSTRAINT "DF_9a950767454aebbb1d975c7ea3b" DEFAULT NEWSEQUENTIALID(), "name" varchar(255) NOT NULL, "createdAt" datetime NOT NULL CONSTRAINT "DF_69daf06e85caf5fb8bf58778ea2" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_b02498c9efe3eb21d2978a593fb" DEFAULT getdate(), "deletedAt" datetime, "disciplineCategoryIdDisciplineCategory" uniqueidentifier, CONSTRAINT "PK_9a950767454aebbb1d975c7ea3b" PRIMARY KEY ("idDiscipline"))`);
        await queryRunner.query(`CREATE TABLE "administrator" ("idAdministrator" uniqueidentifier NOT NULL CONSTRAINT "DF_32a49ba33b4f901c1644681e355" DEFAULT NEWSEQUENTIALID(), "isMaster" bit NOT NULL CONSTRAINT "DF_2176caadaadad01f7ddcce759a4" DEFAULT 0, "createdAt" datetime NOT NULL CONSTRAINT "DF_eea6af2e47d5dcf51350e508bde" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_8a957bf61341b281791d6640a94" DEFAULT getdate(), "deletedAt" datetime, "userIdUser" uniqueidentifier, "institutionIdInstitution" uniqueidentifier, CONSTRAINT "PK_32a49ba33b4f901c1644681e355" PRIMARY KEY ("idAdministrator"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_f247fcd75fa581a06da4ed1a74" ON "administrator" ("userIdUser") WHERE "userIdUser" IS NOT NULL`);
        await queryRunner.query(`CREATE TABLE "institution" ("idInstitution" uniqueidentifier NOT NULL CONSTRAINT "DF_6f0d9c72471c4caab31ac118499" DEFAULT NEWSEQUENTIALID(), "name" varchar(100) NOT NULL, "isBosch" bit NOT NULL, "createdAt" datetime NOT NULL CONSTRAINT "DF_bddda33015bc18a5afb81fd2e03" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_b02a30b49196269f8709ab8f896" DEFAULT getdate(), "deletedAt" datetime, CONSTRAINT "PK_6f0d9c72471c4caab31ac118499" PRIMARY KEY ("idInstitution"))`);
        await queryRunner.query(`CREATE TABLE "instructor" ("instructorId" uniqueidentifier NOT NULL CONSTRAINT "DF_28ab3f815da4525599068c0d0e1" DEFAULT NEWSEQUENTIALID(), "createdAt" datetime NOT NULL CONSTRAINT "DF_c4f38bd80b29768909d94022599" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_d78689696f600d4c451d41f399d" DEFAULT getdate(), "deletedAt" datetime, "userIdUser" uniqueidentifier, "institutionIdInstitution" uniqueidentifier, CONSTRAINT "PK_28ab3f815da4525599068c0d0e1" PRIMARY KEY ("instructorId"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_fea2208c1e29ae902431c1e546" ON "instructor" ("userIdUser") WHERE "userIdUser" IS NOT NULL`);
        await queryRunner.query(`CREATE TABLE "discipline_student_group" ("idDisciplineStudentGroup" uniqueidentifier NOT NULL CONSTRAINT "DF_44621c4128f00f4d48626d79f7b" DEFAULT NEWSEQUENTIALID(), "period" smallint NOT NULL, "is_complete" bit NOT NULL CONSTRAINT "DF_0e0e21994f9015e24f1be0c4362" DEFAULT 0, "total_hours" float NOT NULL, "disciplineIdDiscipline" uniqueidentifier, "studentGroupIdStudentGroup" uniqueidentifier, "instructorInstructorId" uniqueidentifier, CONSTRAINT "PK_44621c4128f00f4d48626d79f7b" PRIMARY KEY ("idDisciplineStudentGroup"))`);
        await queryRunner.query(`CREATE TABLE "student_group" ("idStudentGroup" uniqueidentifier NOT NULL CONSTRAINT "DF_c9e2a54806d432c101f74c6f30b" DEFAULT NEWSEQUENTIALID(), "name" varchar(255) NOT NULL, "dateOfStart" datetime NOT NULL, "dateOfFinish" datetime, "workPeriod" char(1) NOT NULL, "createdAt" datetime NOT NULL CONSTRAINT "DF_bd10c7b5e498a1707cfc6b53439" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_6517ef8f9bf90e9bc0d6b0cee2b" DEFAULT getdate(), "deletedAt" datetime, CONSTRAINT "PK_c9e2a54806d432c101f74c6f30b" PRIMARY KEY ("idStudentGroup"))`);
        await queryRunner.query(`CREATE TABLE "student" ("idStudent" uniqueidentifier NOT NULL CONSTRAINT "DF_9dea2a51adf70b1fc16bd213b55" DEFAULT NEWSEQUENTIALID(), "createdAt" datetime NOT NULL CONSTRAINT "DF_c04389662909caffbe494673c94" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_00376a179004fd1b897ba7c800b" DEFAULT getdate(), "deletedAt" datetime, "userIdUser" uniqueidentifier, "studentGroupIdStudentGroup" uniqueidentifier, CONSTRAINT "PK_9dea2a51adf70b1fc16bd213b55" PRIMARY KEY ("idStudent"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_f2e4228a7870dc2bc6d97040fd" ON "student" ("userIdUser") WHERE "userIdUser" IS NOT NULL`);
        await queryRunner.query(`CREATE TABLE "user" ("idUser" uniqueidentifier NOT NULL CONSTRAINT "DF_c815460ecf7189b12a7ddd2d635" DEFAULT NEWSEQUENTIALID(), "username" varchar(50) NOT NULL, "password" varchar(255) NOT NULL, "name" varchar(255), "email" varchar(255), "dateOfBirth" datetime, "contact" varchar(20), "createdAt" datetime NOT NULL CONSTRAINT "DF_e11e649824a45d8ed01d597fd93" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_80ca6e6ef65fb9ef34ea8c90f42" DEFAULT getdate(), "deletedAt" datetime, CONSTRAINT "PK_c815460ecf7189b12a7ddd2d635" PRIMARY KEY ("idUser"))`);
        await queryRunner.query(`ALTER TABLE "competence_student" ADD CONSTRAINT "FK_4976315325f318cfe723b261961" FOREIGN KEY ("competenceIdDiscipline") REFERENCES "competence"("idDiscipline") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "competence_student" ADD CONSTRAINT "FK_ec7c012bb97b4d47083b4046bb2" FOREIGN KEY ("studentIdStudent") REFERENCES "student"("idStudent") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "competence" ADD CONSTRAINT "FK_b534b84da9727318754153aac29" FOREIGN KEY ("competenceGroupIdCompetence") REFERENCES "competence_group"("idCompetence") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "competence_group" ADD CONSTRAINT "FK_d7e5f02a2d26b8cbe8e1f274a50" FOREIGN KEY ("disciplineIdDiscipline") REFERENCES "discipline"("idDiscipline") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "discipline" ADD CONSTRAINT "FK_5a070fa7848f195e4490da1a54a" FOREIGN KEY ("disciplineCategoryIdDisciplineCategory") REFERENCES "discipline_category"("idDisciplineCategory") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "administrator" ADD CONSTRAINT "FK_f247fcd75fa581a06da4ed1a742" FOREIGN KEY ("userIdUser") REFERENCES "user"("idUser") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "administrator" ADD CONSTRAINT "FK_11062c71fc55debfc5fccafa095" FOREIGN KEY ("institutionIdInstitution") REFERENCES "institution"("idInstitution") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "instructor" ADD CONSTRAINT "FK_fea2208c1e29ae902431c1e5466" FOREIGN KEY ("userIdUser") REFERENCES "user"("idUser") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "instructor" ADD CONSTRAINT "FK_2113daac151237030d0aaccba25" FOREIGN KEY ("institutionIdInstitution") REFERENCES "institution"("idInstitution") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "discipline_student_group" ADD CONSTRAINT "FK_1b03eac4defe1d00bf75c338e30" FOREIGN KEY ("disciplineIdDiscipline") REFERENCES "discipline"("idDiscipline") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "discipline_student_group" ADD CONSTRAINT "FK_afe908b3d56a7340bae6bb57cf8" FOREIGN KEY ("studentGroupIdStudentGroup") REFERENCES "student_group"("idStudentGroup") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "discipline_student_group" ADD CONSTRAINT "FK_9ccd3bbca22d5ba283c182cd786" FOREIGN KEY ("instructorInstructorId") REFERENCES "instructor"("instructorId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "FK_f2e4228a7870dc2bc6d97040fd7" FOREIGN KEY ("userIdUser") REFERENCES "user"("idUser") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "FK_79d9ff2f1402a37be31ae2bb645" FOREIGN KEY ("studentGroupIdStudentGroup") REFERENCES "student_group"("idStudentGroup") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "FK_79d9ff2f1402a37be31ae2bb645"`);
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "FK_f2e4228a7870dc2bc6d97040fd7"`);
        await queryRunner.query(`ALTER TABLE "discipline_student_group" DROP CONSTRAINT "FK_9ccd3bbca22d5ba283c182cd786"`);
        await queryRunner.query(`ALTER TABLE "discipline_student_group" DROP CONSTRAINT "FK_afe908b3d56a7340bae6bb57cf8"`);
        await queryRunner.query(`ALTER TABLE "discipline_student_group" DROP CONSTRAINT "FK_1b03eac4defe1d00bf75c338e30"`);
        await queryRunner.query(`ALTER TABLE "instructor" DROP CONSTRAINT "FK_2113daac151237030d0aaccba25"`);
        await queryRunner.query(`ALTER TABLE "instructor" DROP CONSTRAINT "FK_fea2208c1e29ae902431c1e5466"`);
        await queryRunner.query(`ALTER TABLE "administrator" DROP CONSTRAINT "FK_11062c71fc55debfc5fccafa095"`);
        await queryRunner.query(`ALTER TABLE "administrator" DROP CONSTRAINT "FK_f247fcd75fa581a06da4ed1a742"`);
        await queryRunner.query(`ALTER TABLE "discipline" DROP CONSTRAINT "FK_5a070fa7848f195e4490da1a54a"`);
        await queryRunner.query(`ALTER TABLE "competence_group" DROP CONSTRAINT "FK_d7e5f02a2d26b8cbe8e1f274a50"`);
        await queryRunner.query(`ALTER TABLE "competence" DROP CONSTRAINT "FK_b534b84da9727318754153aac29"`);
        await queryRunner.query(`ALTER TABLE "competence_student" DROP CONSTRAINT "FK_ec7c012bb97b4d47083b4046bb2"`);
        await queryRunner.query(`ALTER TABLE "competence_student" DROP CONSTRAINT "FK_4976315325f318cfe723b261961"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP INDEX "REL_f2e4228a7870dc2bc6d97040fd" ON "student"`);
        await queryRunner.query(`DROP TABLE "student"`);
        await queryRunner.query(`DROP TABLE "student_group"`);
        await queryRunner.query(`DROP TABLE "discipline_student_group"`);
        await queryRunner.query(`DROP INDEX "REL_fea2208c1e29ae902431c1e546" ON "instructor"`);
        await queryRunner.query(`DROP TABLE "instructor"`);
        await queryRunner.query(`DROP TABLE "institution"`);
        await queryRunner.query(`DROP INDEX "REL_f247fcd75fa581a06da4ed1a74" ON "administrator"`);
        await queryRunner.query(`DROP TABLE "administrator"`);
        await queryRunner.query(`DROP TABLE "discipline"`);
        await queryRunner.query(`DROP TABLE "competence_group"`);
        await queryRunner.query(`DROP TABLE "competence"`);
        await queryRunner.query(`DROP TABLE "competence_student"`);
        await queryRunner.query(`DROP TABLE "discipline_category"`);
    }

}
