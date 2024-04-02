import { Administrator } from "../../entities";

/**
 * Data-transfer object representing a administrator without its relations.
 * Should be used on the context of paginated data or inside a DTO as a
 * relation.
 */
export default class AdministratorDTO {
    idAdministrator: string
    isMaster: boolean;

    /**
     * Builds an AdministratorDTO instance with only relevant,
     * non-sensible data.
     * @param administrator - Administrator that this DTO represents.
     */
    public constructor(administrator: Administrator) {
        this.isMaster = administrator.isMaster;
        this.idAdministrator = administrator.idAdministrator
    }
}