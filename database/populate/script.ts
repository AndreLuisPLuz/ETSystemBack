import { IncomingMessage, Server, ServerResponse } from "http";
import { AppDataSource } from "../../src/data-source";
import { Administrator, AppliedDiscipline, Competence, CompetenceGroup, Discipline, DisciplineCategory, Institution, Instructor, Student, StudentGroup, User } from "../../src/entities";
import { Repository } from "typeorm";
import { hashSync } from "bcryptjs";
import app from "../../src/app"
import institutionPayloads from "./payloads/institutions";
import userPayloads from "./payloads/users";
import studentGroupPayloads from "./payloads/studentGroups";
import studentPayloads from "./payloads/students";
import instructorPayloads from "./payloads/instructor";
import adminPayloads from "./payloads/admin";
import disciplineCategoryPayloads from "./payloads/disciplineCategory";
import disciplinePayloads from "./payloads/disciplines";
import appliedDisciplinePayloads from "./payloads/appliedDisciplines";

async function populateDatabase() {

  let server:Server<typeof IncomingMessage, typeof ServerResponse>|null = null

  try {
    await AppDataSource.initialize()

    const PORT: number = Number(process.env.PORT) || 3000;
    server = app.listen(PORT, () => console.log('Server running'));

    const institutionRepo:Repository<Institution> = AppDataSource.getRepository(Institution);
    const userRepo:Repository<User> = AppDataSource.getRepository(User);
    const studentGroupRepo: Repository<StudentGroup> = AppDataSource.getRepository(StudentGroup);
    const adminRepo:Repository<Administrator> = AppDataSource.getRepository(Administrator);
    const instructorRepo: Repository<Instructor> = AppDataSource.getRepository(Instructor);
    const studentRepo: Repository<Student> = AppDataSource.getRepository(Student);
    const disciplineCategoryRepo: Repository<DisciplineCategory> = AppDataSource.getRepository(DisciplineCategory);
    const disciplineRepo:Repository<Discipline> = AppDataSource.getRepository(Discipline);
    const appliedDisciplineRepo:Repository<AppliedDiscipline> = AppDataSource.getRepository(AppliedDiscipline);
    const competenceGroupRepo:Repository<CompetenceGroup> = AppDataSource.getRepository(CompetenceGroup)
    const competenceRepo:Repository<Competence> = AppDataSource.getRepository(Competence);


    const institutions = institutionPayloads.map(async (payload) => {
      const current = institutionRepo.create(payload)
      await institutionRepo.save(current)
      return current
    })

    const users = userPayloads.map(async (payload) => { 
      const current = userRepo.create(payload)
      current.institution = await institutions[payload.institutionIndex]
      current.password = hashSync("ets@Bosch200");
      await userRepo.save(current)
      return current
    })

    const studentGroups = studentGroupPayloads.map(async (payload) => {
      const current = studentGroupRepo.create(payload)
      await studentGroupRepo.save(current)
      return current
    })

    const students = studentPayloads.map(async (payload) => {
      const current = studentRepo.create({
        user: await users[payload.userIndex],
        studentGroup: await studentGroups[payload.studentGroupIndex]
      })
      await studentRepo.save(current)
      return current
    })

    const instructors = instructorPayloads.map(async (payload) => {
      const current = instructorRepo.create({user: await users[payload.userIndex]})
      await instructorRepo.save(current)
      return current
    })

    const admins = adminPayloads.map(async (payload) => {
      const current = adminRepo.create({
        isMaster: payload.isMaster,
        user: await users[payload.userIndex]
      })
      await adminRepo.save(current)
      return current
    })

    const disciplineCategories = disciplineCategoryPayloads.map(async (payload) => {
      const current = disciplineCategoryRepo.create(payload)
      await disciplineCategoryRepo.save(current)
      return current
    })

    const disciplines = disciplinePayloads.map(async (payload) => {
      const current = disciplineRepo.create({
        name: payload.name,
        isBosch: payload.isBosch,
        disciplineCategory: await disciplineCategories[payload.categoryIndex]
      })
      await disciplineRepo.save(current)
      return current
    })

    const appliedDisciplines = appliedDisciplinePayloads.map(async (payload) => {
      const current = appliedDisciplineRepo.create({
        studentGroup: await studentGroups[payload.studentGroupIndex],
        discipline: await disciplines[payload.disciplineIndex],
        instructor: await instructors[payload.instructorIndex],
        period: payload.period,
        totalHours: payload.total_hours,
      })
      await appliedDisciplineRepo.save(current)
      return current
    })
  } catch (error) {
      console.error('Error populating database:', error);
  } finally {
    if(server) {
      console.log('Database populated successfully');
      server.close();
    }
  }
}

populateDatabase();