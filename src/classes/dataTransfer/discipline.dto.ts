import { Discipline } from "../../entities";
import { DisciplineCategoryDTO } from "./disciplineCategory.dto";

export class DisciplineDTO {
    idDiscipline!: string;
    name!: string;

    public constructor(discipline: Discipline) {
        this.idDiscipline = discipline.idDiscipline;
        this.name = discipline.name;
    }
}

export class DisciplineSingleDTO extends DisciplineDTO {
    category!: DisciplineCategoryDTO;

    public constructor(discipline: Discipline) {
        super(discipline);
        this.category = new DisciplineCategoryDTO(discipline.disciplineCategory);
    }
}