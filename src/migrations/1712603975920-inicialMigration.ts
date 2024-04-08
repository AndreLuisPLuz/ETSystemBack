import { MigrationInterface, QueryRunner } from "typeorm";

export class InicialMigration1712603975920 implements MigrationInterface {
    name = 'InicialMigration1712603975920'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "discipline_category" ("idDisciplineCategory" uniqueidentifier NOT NULL CONSTRAINT "DF_dc902187a298c23f80bffc853bc" DEFAULT NEWSEQUENTIALID(), "name" varchar(50) NOT NULL, CONSTRAINT "PK_dc902187a298c23f80bffc853bc" PRIMARY KEY ("idDisciplineCategory"))`);
        await queryRunner.query(`CREATE TABLE "institution" ("idInstitution" uniqueidentifier NOT NULL CONSTRAINT "DF_6f0d9c72471c4caab31ac118499" DEFAULT NEWSEQUENTIALID(), "name" varchar(100) NOT NULL, "isBosch" bit NOT NULL, "createdAt" datetime NOT NULL CONSTRAINT "DF_bddda33015bc18a5afb81fd2e03" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_b02a30b49196269f8709ab8f896" DEFAULT getdate(), "deletedAt" datetime, CONSTRAINT "PK_6f0d9c72471c4caab31ac118499" PRIMARY KEY ("idInstitution"))`);
        await queryRunner.query(`CREATE TABLE "discipline" ("idDiscipline" uniqueidentifier NOT NULL CONSTRAINT "DF_9a950767454aebbb1d975c7ea3b" DEFAULT NEWSEQUENTIALID(), "name" varchar(255) NOT NULL, "isBosch" bit NOT NULL, "createdAt" datetime NOT NULL CONSTRAINT "DF_69daf06e85caf5fb8bf58778ea2" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_b02498c9efe3eb21d2978a593fb" DEFAULT getdate(), "deletedAt" datetime, "disciplineCategoryIdDisciplineCategory" uniqueidentifier NOT NULL, CONSTRAINT "PK_9a950767454aebbb1d975c7ea3b" PRIMARY KEY ("idDiscipline"))`);
        await queryRunner.query(`CREATE TABLE "student_group" ("idStudentGroup" uniqueidentifier NOT NULL CONSTRAINT "DF_c9e2a54806d432c101f74c6f30b" DEFAULT NEWSEQUENTIALID(), "name" varchar(255) NOT NULL, "dateOfStart" datetime NOT NULL, "dateOfFinish" datetime, "workPeriod" char(1) NOT NULL, "createdAt" datetime NOT NULL CONSTRAINT "DF_bd10c7b5e498a1707cfc6b53439" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_6517ef8f9bf90e9bc0d6b0cee2b" DEFAULT getdate(), "deletedAt" datetime, CONSTRAINT "PK_c9e2a54806d432c101f74c6f30b" PRIMARY KEY ("idStudentGroup"))`);
        await queryRunner.query(`CREATE TABLE "competence" ("idCompetence" uniqueidentifier NOT NULL CONSTRAINT "DF_39d8241f5fd82c873224dc85669" DEFAULT NEWSEQUENTIALID(), "description" nvarchar(4000) NOT NULL, "weight" smallint NOT NULL, "createdAt" datetime NOT NULL CONSTRAINT "DF_cc1c9c6c223c432e6b3d53caf1c" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_96121f28c0c984a6e27cab3cf39" DEFAULT getdate(), "deletedAt" datetime, "competenceGroupIdCompetenceGroup" uniqueidentifier, CONSTRAINT "PK_39d8241f5fd82c873224dc85669" PRIMARY KEY ("idCompetence"))`);
        await queryRunner.query(`CREATE TABLE "competence_group" ("idCompetenceGroup" uniqueidentifier NOT NULL CONSTRAINT "DF_46cf8926d5446915c62d7bcea41" DEFAULT NEWSEQUENTIALID(), "description" nvarchar(4000) NOT NULL, "createdAt" datetime NOT NULL CONSTRAINT "DF_e734b97ce01e4c0db24b3123dfb" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_e794fbfa1d5cec1f9656e168d67" DEFAULT getdate(), "deletedAt" datetime, "appliedDisciplineIdAppliedDiscipline" uniqueidentifier, CONSTRAINT "PK_46cf8926d5446915c62d7bcea41" PRIMARY KEY ("idCompetenceGroup"))`);
        await queryRunner.query(`CREATE TABLE "student_avaliation" ("idStudentAvaliation" uniqueidentifier NOT NULL CONSTRAINT "DF_e73802b5ec86388ffcc1d398fd5" DEFAULT NEWSEQUENTIALID(), "general_grade" float NOT NULL, "competencesJson" nvarchar(4000) NOT NULL, "observations" nvarchar(4000) NOT NULL, "createdAt" datetime NOT NULL CONSTRAINT "DF_64cf64b58b21b8732eaacc17013" DEFAULT getdate(), "studentIdStudent" uniqueidentifier NOT NULL, "appliedDisciplineIdAppliedDiscipline" uniqueidentifier NOT NULL, CONSTRAINT "PK_e73802b5ec86388ffcc1d398fd5" PRIMARY KEY ("idStudentAvaliation"))`);
        await queryRunner.query(`CREATE TABLE "applied_discipline" ("idAppliedDiscipline" uniqueidentifier NOT NULL CONSTRAINT "DF_b1d3592a2dfb350ad85976fd061" DEFAULT NEWSEQUENTIALID(), "period" smallint NOT NULL, "isComplete" bit NOT NULL CONSTRAINT "DF_7cf958ca50e287884783f2890c1" DEFAULT 0, "totalHours" float NOT NULL, "createdAt" datetime NOT NULL CONSTRAINT "DF_d00ddab0571c34f807cf6a3a937" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_889bcf67604a135695d8f6d49e0" DEFAULT getdate(), "deletedAt" datetime, "disciplineIdDiscipline" uniqueidentifier NOT NULL, "studentGroupIdStudentGroup" uniqueidentifier NOT NULL, "instructorInstructorId" uniqueidentifier NOT NULL, CONSTRAINT "PK_b1d3592a2dfb350ad85976fd061" PRIMARY KEY ("idAppliedDiscipline"))`);
        await queryRunner.query(`CREATE TABLE "instructor" ("instructorId" uniqueidentifier NOT NULL CONSTRAINT "DF_28ab3f815da4525599068c0d0e1" DEFAULT NEWSEQUENTIALID(), "createdAt" datetime NOT NULL CONSTRAINT "DF_c4f38bd80b29768909d94022599" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_d78689696f600d4c451d41f399d" DEFAULT getdate(), "deletedAt" datetime, "userIdUser" uniqueidentifier, CONSTRAINT "PK_28ab3f815da4525599068c0d0e1" PRIMARY KEY ("instructorId"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_fea2208c1e29ae902431c1e546" ON "instructor" ("userIdUser") WHERE "userIdUser" IS NOT NULL`);
        await queryRunner.query(`CREATE TABLE "administrator" ("idAdministrator" uniqueidentifier NOT NULL CONSTRAINT "DF_32a49ba33b4f901c1644681e355" DEFAULT NEWSEQUENTIALID(), "isMaster" bit NOT NULL CONSTRAINT "DF_2176caadaadad01f7ddcce759a4" DEFAULT 0, "createdAt" datetime NOT NULL CONSTRAINT "DF_eea6af2e47d5dcf51350e508bde" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_8a957bf61341b281791d6640a94" DEFAULT getdate(), "deletedAt" datetime, "userIdUser" uniqueidentifier, CONSTRAINT "PK_32a49ba33b4f901c1644681e355" PRIMARY KEY ("idAdministrator"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_f247fcd75fa581a06da4ed1a74" ON "administrator" ("userIdUser") WHERE "userIdUser" IS NOT NULL`);
        await queryRunner.query(`CREATE TABLE "person" ("idUser" uniqueidentifier NOT NULL CONSTRAINT "DF_a9f512264baa71edd60729a369b" DEFAULT NEWSEQUENTIALID(), "username" varchar(50) NOT NULL, "password" varchar(255) NOT NULL, "name" varchar(255), "email" varchar(255), "dateOfBirth" datetime, "contact" varchar(20), "createdAt" datetime NOT NULL CONSTRAINT "DF_db4ea75ef504a464b3fbad24410" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_2925497ddfc32befd5ea32f2617" DEFAULT getdate(), "deletedAt" datetime, "institutionIdInstitution" uniqueidentifier NOT NULL, CONSTRAINT "PK_a9f512264baa71edd60729a369b" PRIMARY KEY ("idUser"))`);
        await queryRunner.query(`CREATE TABLE "student" ("idStudent" uniqueidentifier NOT NULL CONSTRAINT "DF_9dea2a51adf70b1fc16bd213b55" DEFAULT NEWSEQUENTIALID(), "createdAt" datetime NOT NULL CONSTRAINT "DF_c04389662909caffbe494673c94" DEFAULT getdate(), "updatedAt" datetime NOT NULL CONSTRAINT "DF_00376a179004fd1b897ba7c800b" DEFAULT getdate(), "deletedAt" datetime, "userIdUser" uniqueidentifier, "studentGroupIdStudentGroup" uniqueidentifier, CONSTRAINT "PK_9dea2a51adf70b1fc16bd213b55" PRIMARY KEY ("idStudent"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_f2e4228a7870dc2bc6d97040fd" ON "student" ("userIdUser") WHERE "userIdUser" IS NOT NULL`);
        await queryRunner.query(`ALTER TABLE "discipline" ADD CONSTRAINT "FK_5a070fa7848f195e4490da1a54a" FOREIGN KEY ("disciplineCategoryIdDisciplineCategory") REFERENCES "discipline_category"("idDisciplineCategory") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "competence" ADD CONSTRAINT "FK_7268d7159c9a138312ee08b53f1" FOREIGN KEY ("competenceGroupIdCompetenceGroup") REFERENCES "competence_group"("idCompetenceGroup") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "competence_group" ADD CONSTRAINT "FK_3811e1db86e136ef1e80f827ec3" FOREIGN KEY ("appliedDisciplineIdAppliedDiscipline") REFERENCES "applied_discipline"("idAppliedDiscipline") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student_avaliation" ADD CONSTRAINT "FK_305a430cc31d2e95374697e2263" FOREIGN KEY ("studentIdStudent") REFERENCES "student"("idStudent") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student_avaliation" ADD CONSTRAINT "FK_de7305aa08a0e9f7324b6fd2d0e" FOREIGN KEY ("appliedDisciplineIdAppliedDiscipline") REFERENCES "applied_discipline"("idAppliedDiscipline") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "applied_discipline" ADD CONSTRAINT "FK_ced445b8a76f684a39dfe2acf45" FOREIGN KEY ("disciplineIdDiscipline") REFERENCES "discipline"("idDiscipline") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "applied_discipline" ADD CONSTRAINT "FK_555269e65e05950ddd288b8f1c7" FOREIGN KEY ("studentGroupIdStudentGroup") REFERENCES "student_group"("idStudentGroup") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "applied_discipline" ADD CONSTRAINT "FK_63ca83094d7d1aeadcb22057e22" FOREIGN KEY ("instructorInstructorId") REFERENCES "instructor"("instructorId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "instructor" ADD CONSTRAINT "FK_fea2208c1e29ae902431c1e5466" FOREIGN KEY ("userIdUser") REFERENCES "person"("idUser") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "administrator" ADD CONSTRAINT "FK_f247fcd75fa581a06da4ed1a742" FOREIGN KEY ("userIdUser") REFERENCES "person"("idUser") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "person" ADD CONSTRAINT "FK_9c5425ceebb4bcdf99e23173f7c" FOREIGN KEY ("institutionIdInstitution") REFERENCES "institution"("idInstitution") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "FK_f2e4228a7870dc2bc6d97040fd7" FOREIGN KEY ("userIdUser") REFERENCES "person"("idUser") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "FK_79d9ff2f1402a37be31ae2bb645" FOREIGN KEY ("studentGroupIdStudentGroup") REFERENCES "student_group"("idStudentGroup") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "FK_79d9ff2f1402a37be31ae2bb645"`);
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "FK_f2e4228a7870dc2bc6d97040fd7"`);
        await queryRunner.query(`ALTER TABLE "person" DROP CONSTRAINT "FK_9c5425ceebb4bcdf99e23173f7c"`);
        await queryRunner.query(`ALTER TABLE "administrator" DROP CONSTRAINT "FK_f247fcd75fa581a06da4ed1a742"`);
        await queryRunner.query(`ALTER TABLE "instructor" DROP CONSTRAINT "FK_fea2208c1e29ae902431c1e5466"`);
        await queryRunner.query(`ALTER TABLE "applied_discipline" DROP CONSTRAINT "FK_63ca83094d7d1aeadcb22057e22"`);
        await queryRunner.query(`ALTER TABLE "applied_discipline" DROP CONSTRAINT "FK_555269e65e05950ddd288b8f1c7"`);
        await queryRunner.query(`ALTER TABLE "applied_discipline" DROP CONSTRAINT "FK_ced445b8a76f684a39dfe2acf45"`);
        await queryRunner.query(`ALTER TABLE "student_avaliation" DROP CONSTRAINT "FK_de7305aa08a0e9f7324b6fd2d0e"`);
        await queryRunner.query(`ALTER TABLE "student_avaliation" DROP CONSTRAINT "FK_305a430cc31d2e95374697e2263"`);
        await queryRunner.query(`ALTER TABLE "competence_group" DROP CONSTRAINT "FK_3811e1db86e136ef1e80f827ec3"`);
        await queryRunner.query(`ALTER TABLE "competence" DROP CONSTRAINT "FK_7268d7159c9a138312ee08b53f1"`);
        await queryRunner.query(`ALTER TABLE "discipline" DROP CONSTRAINT "FK_5a070fa7848f195e4490da1a54a"`);
        await queryRunner.query(`DROP INDEX "REL_f2e4228a7870dc2bc6d97040fd" ON "student"`);
        await queryRunner.query(`DROP TABLE "student"`);
        await queryRunner.query(`DROP TABLE "person"`);
        await queryRunner.query(`DROP INDEX "REL_f247fcd75fa581a06da4ed1a74" ON "administrator"`);
        await queryRunner.query(`DROP TABLE "administrator"`);
        await queryRunner.query(`DROP INDEX "REL_fea2208c1e29ae902431c1e546" ON "instructor"`);
        await queryRunner.query(`DROP TABLE "instructor"`);
        await queryRunner.query(`DROP TABLE "applied_discipline"`);
        await queryRunner.query(`DROP TABLE "student_avaliation"`);
        await queryRunner.query(`DROP TABLE "competence_group"`);
        await queryRunner.query(`DROP TABLE "competence"`);
        await queryRunner.query(`DROP TABLE "student_group"`);
        await queryRunner.query(`DROP TABLE "discipline"`);
        await queryRunner.query(`DROP TABLE "institution"`);
        await queryRunner.query(`DROP TABLE "discipline_category"`);
    }

}
