import { Administrator } from "../../entities";

export default class AdministratorDTO {
    isMaster: boolean;

    public constructor(administrator: Administrator) {
        this.isMaster = administrator.isMaster;
    }
}