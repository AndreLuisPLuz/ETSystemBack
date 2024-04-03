import { Student } from "../../entities";
import { StudentGroupDTO } from "./studentGroup.dto";

/**
 * Data-transfer object representing a student without its relations. Should
 * be used on the context of paginated data or inside a DTO as a relation.
 */
export class StudentDTO {
    idStudent!: string;

    public constructor(student: Student) {
        this.idStudent = student.idStudent;
    }
};

/**
 * Data-transfer object representing a student with its relations. Should be
 * used on the context of requests that return a single user, such as the ones
 * with idStudent path parameter.
 */
export class StudentSingleDTO extends StudentDTO {
    studentGroup!: StudentGroupDTO;

    /**
     * Builds a StudentSingleDTO instance with only relevant, non-sensible
     * data.
     * @param student - The Student this DTO represents.
     */
    public constructor(student: Student) {
        super(student);
        this.studentGroup = new StudentGroupDTO(student.studentGroup);
    }
};