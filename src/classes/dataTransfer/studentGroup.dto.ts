import { StudentGroup, Student, WorkPeriod } from "../../entities";
import { StudentDTO } from "./student.dto";

/**
 * Data-transfer object representing a student group without its relations.
 * Should be used on the context of paginated data or inside a DTO as a
 * relation.
 */
class StudentGroupDTO {
    idStudentGroup!: string;
    name!: string;
    dateOfStart!: Date;
    dateOfFinish!: Date | null;
    workPeriod!: WorkPeriod;

    /**
     * Builds a studentGroupDTO instance with only relevant, non-sensible
     * data.
     * @param studentGroup The StudentGroup this DTO represents.
     * @param studentId ID of a Student whose StudentGroup we wish to fetch.
     */
    public constructor(studentGroup: StudentGroup) {
        this.idStudentGroup = studentGroup.idStudentGroup;
        this.name = studentGroup.name;
        this.dateOfStart = studentGroup.dateOfStart;
        this.dateOfFinish = studentGroup.dateOfFinish;
        this.workPeriod = studentGroup.workPeriod;
    }
}

/**
 * Data-transfer object representing a student group with its relations.
 * Should be used on the context of requests that return a single user,
 * such as tne ones with idStudentGroup path parameter.
 */
class StudentGroupSingleDTO extends StudentGroupDTO {
    students!: StudentDTO[] | null;

    /**
     * Builds a studentGroupSingleDTO instance with only relevant,
     * non-sensible data.
     * @param studentGroup - The StudentGroup this DTO represents.
     */
    public constructor(studentGroup: StudentGroup) {
        super(studentGroup);

        this.students = (studentGroup.students)
            ? studentGroup.students.map((student) => new StudentDTO(student))
            : null;
    }
}

export {
    StudentGroupDTO,
    StudentGroupSingleDTO
};