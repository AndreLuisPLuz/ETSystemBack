import { User } from "../../entities"
import InstitutionDTO from "./institution.dto";

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
    idAdministrator!: string | null;
    idInstructor!: string | null;
    idStudent!: string | null;
    institution!: InstitutionDTO;

    /**
     * Builds an UserSingleDTO instance with only relevant, non-sensible data.
     * @param user - The user this DTO represents.
     */
    public constructor(user: User) {
        super(user);

        this.idAdministrator = (user.administrator != undefined)
            ? user.administrator.idAdministrator
            : null;

        this.idInstructor = (user.instructor != undefined)
            ? user.instructor.instructorId
            : null;

        this.idStudent = (user.student != undefined)
            ? user.student.idStudent
            :null;

        this.institution = new InstitutionDTO(user.institution);
    }
}

export {
    UserDTO,
    UserSingleDTO
};