import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Discipline } from "./discipline.entity";

@Entity("discipline_category")
export class DisciplineCategory {

    @PrimaryGeneratedColumn("uuid")
    idDisciplineCategory!: string;

    @Column({ type: "varchar", length: 50 })
    name!: string;

    @OneToMany(() => Discipline, (discipline) => discipline.disciplineCategory)
    disciplines: Discipline[]
}