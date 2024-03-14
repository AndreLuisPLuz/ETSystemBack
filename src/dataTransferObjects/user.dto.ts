import { User } from "../entities"

export class UserDTO {
    username!: string;
    name!: string | null;
    email!: string | null;
    dateOfBirth!: Date | null;
    contact!: string | null;

    public constructor(user: User) {
        this.username = user.username;
        this.name = user.name;
        this.email = user.email;
        this.dateOfBirth = user.dateOfBirth;
        this.contact = user.contact;
    }
}