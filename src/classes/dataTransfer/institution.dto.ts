import { Institution, IsBosch } from "../../entities";

export default class InstitutionDTO {
    idInstitution!: string;
    name!: string;
    isBosch!: IsBosch;

    public constructor(institution: Institution) {
        this.idInstitution = institution.idInstitution;
        this.name = institution.name;
        this.isBosch = institution.isBosch;
    }
}