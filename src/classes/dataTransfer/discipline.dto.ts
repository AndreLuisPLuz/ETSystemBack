import { Discipline } from "../../entities";
import { DisciplineCategoryDTO } from "./disciplineCategory.dto";

export class DisciplineDTO {
    idDiscipline!: string;
    name!: string;
    category!: DisciplineCategoryDTO;

    public constructor(discipline: Discipline) {
        this.idDiscipline = discipline.idDiscipline;
        this.name = discipline.name;
        this.category = new DisciplineCategoryDTO(discipline.disciplineCategory);
    }
};