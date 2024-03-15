import { Administrator, User } from "../../entities";
import { UserDTO } from "./user.dto";

export default class AdministratorDTO {
    isMaster: boolean;
    user: UserDTO | null;

    public constructor(administrator: Administrator) {
        this.isMaster = administrator.isMaster;
        this.user = new UserDTO(administrator.user);
    }
}