import { User } from "../../entities"
import AdministratorDTO from "./administrator.dto";
import InstructorDTO from "./instructor.dto";

export default class UserDTO {
    idUser!: string;
    username!: string;
    name!: string | null;
    email!: string | null;
    dateOfBirth!: Date | null;
    contact!: string | null;
    administrator!: AdministratorDTO | null;
    instructor!: InstructorDTO | null;

    public constructor(user: User) {
        this.idUser = user.idUser;
        this.username = user.username;
        this.name = user.name;
        this.email = user.email;
        this.dateOfBirth = user.dateOfBirth;
        this.contact = user.contact;
        this.administrator = user.administrator ? new AdministratorDTO(user.administrator) : null;
        this.instructor = user.instructor ? new InstructorDTO(user.instructor) : null;
    }
}