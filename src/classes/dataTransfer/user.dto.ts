import { User } from "../../entities"
import { StudentDTO, StudentSingleDTO } from "./student.dto";
import { InstructorSingleDTO } from "./instructor.dto";
import AdministratorDTO from "./administrator.dto";

/**
 * Data-transfer object representing a user without its relations. Should be
 * be used on the context of paginated data or inside a DTO as a relation.
 */
class UserDTO {
    idUser!: string;
    username!: string;
    name!: string | null;
    email!: string | null;
    dateOfBirth!: Date | null;
    contact!: string | null;

    /**
     * Builds an UserDTO instance with only relevant, non-sensible data.
     * @param user - The user this DTO represents.
     */
    public constructor(user: User) {
        this.idUser = user.idUser;
        this.username = user.username;
        this.name = user.name;
        this.email = user.email;
        this.dateOfBirth = user.dateOfBirth;
        this.contact = user.contact;
    }
}

/**
 * Data-transfer object representing a user with its relations. Should be used
 * on the context of requests that return a single user, such as tne ones with
 * idUser path parameter.
 */
class UserSingleDTO extends UserDTO {
    administrator!: AdministratorDTO | null;
    instructor!: InstructorSingleDTO | null;
    student!: StudentDTO | null;

    /**
     * Builds an UserSingleDTO instance with only relevant, non-sensible data.
     * @param user - The user this DTO represents.
     */
    public constructor(user: User) {
        super(user);

        this.administrator = user.administrator ? new AdministratorDTO(user.administrator) : null;
        this.instructor = user.instructor ? new InstructorSingleDTO(user.instructor) : null;
        this.student = user.student ? new StudentDTO(user.student) : null;
    }
}

export {
    UserDTO,
    UserSingleDTO
};