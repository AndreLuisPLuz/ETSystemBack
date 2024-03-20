import { 
    Instructor,
    DisciplineStudentGroup
} from "../../entities";

export default class InstructorDTO {
    disciplineStudentGroups!: DisciplineStudentGroup[];

    public constructor(instructor: Instructor) {
        this.disciplineStudentGroups = instructor.disciplineStudentGroups;
    }
}