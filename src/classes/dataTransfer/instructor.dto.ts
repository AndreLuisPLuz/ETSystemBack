import { 
    Instructor,
    AppliedDiscipline
} from "../../entities";

/**
 * Data-transfer object representing an instructor with its relations. Should
 * be used on the context of requests that return a single user, such as the
 * ones with idInstructor path parameter.
 */
export class InstructorSingleDTO {
    appliedDisciplines!: AppliedDiscipline[]; // TODO: change to DTO when available

    /**
     * Builds an InstructorSingleDTO instance with only relevant, non-sensible
     * data.
     * @param instructor - The Instructor this DTO represents.
     */
    public constructor(instructor: Instructor) {
        this.appliedDisciplines = instructor.appliedDisciplines; // TODO: change to DTO when available
    }
}