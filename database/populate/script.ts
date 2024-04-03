import { IncomingMessage, Server, ServerResponse } from "http";
import { AppDataSource } from "../../src/data-source";
import { Administrator, AppliedDiscipline, Discipline, DisciplineCategory, Institution, Instructor, Student, StudentGroup, User } from "../../src/entities";
import institutionPayloads from "./payloads/institutions";
import userPayloads from "./payloads/users";
import app from "../../src/app"
import { Repository } from "typeorm";
import { hashSync } from "bcryptjs";

async function populateDatabase() {

  let server:Server<typeof IncomingMessage, typeof ServerResponse>|null = null

  try {
    await AppDataSource.initialize()

    const PORT: number = Number(process.env.PORT) || 3000;
    server = app.listen(PORT, () => console.log('Server running'));

    const institutionRepo:Repository<Institution> = AppDataSource.getRepository(Institution);
    const userRepo:Repository<User> = AppDataSource.getRepository(User);
    const studentGroupRepo: Repository<StudentGroup> = AppDataSource.getRepository(StudentGroup);
    const administratorRepo:Repository<Administrator> = AppDataSource.getRepository(Administrator);
    const instructorRepo: Repository<Instructor> = AppDataSource.getRepository(Instructor);
    const studentRepo: Repository<Student> = AppDataSource.getRepository(Student);
    const disciplineCategoryRepo: Repository<DisciplineCategory> = AppDataSource.getRepository(DisciplineCategory);
    const disciplineRepo:Repository<Discipline> = AppDataSource.getRepository(Discipline);
    const appliedDisciplineRepo:Repository<AppliedDiscipline> = AppDataSource.getRepository(AppliedDiscipline);

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


    console.log('Database populated successfully');
  } catch (error) {
    console.error('Error populating database:', error);
  } finally {
    if(server) {
      await server.close();
    }
  }
}

populateDatabase();