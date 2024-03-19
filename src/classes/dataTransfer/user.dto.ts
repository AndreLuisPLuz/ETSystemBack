import { User } from "../../entities"
import AdministratorDTO from "./administrator.dto";

export default class UserDTO {
    idUser!: string;
    username!: string;
    name!: string | null;
    email!: string | null;
    dateOfBirth!: Date | null;
    contact!: string | null;
    administrator!: AdministratorDTO | null;

    public constructor(user: User) {
        this.idUser = user.idUser;
        this.username = user.username;
        this.name = user.name;
        this.email = user.email;
        this.dateOfBirth = user.dateOfBirth;
        this.contact = user.contact;
        this.administrator = user.administrator ? new AdministratorDTO(user.administrator) : null;
    }
}