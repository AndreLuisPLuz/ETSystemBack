import { Administrator, User } from "../../entities";
import { UserDTO } from "./user.dto";

export default class AdministratorDTO {
    isMaster: boolean;

    public constructor(administrator: Administrator) {
        this.isMaster = administrator.isMaster;
    }
}