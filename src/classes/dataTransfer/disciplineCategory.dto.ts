import { Discipline, DisciplineCategory } from "../../entities";

export class DisciplineCategoryDTO {
    idDisciplineCategory!: string;
    name!: string;

    public constructor(disciplineCategory: DisciplineCategory) {
        this.idDisciplineCategory = disciplineCategory.idDisciplineCategory;
        this.name = disciplineCategory.name;
    }
}

export class DisciplineCategorySingleDTO extends DisciplineCategoryDTO {
    disciplines!: Discipline[] // TODO: change to DisciplineDTO when available

    public constructor(disciplineCategory: DisciplineCategory) {
        super(disciplineCategory);
        this.disciplines = disciplineCategory.disciplines;
    }
}