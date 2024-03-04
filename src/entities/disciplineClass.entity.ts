import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Discipline } from "./discipline.entity";
import { Class } from "./class.entity";
import { Instructor } from "./instructor.entity";

@Entity('discipline_class')
export class DisciplineClass {

    @PrimaryGeneratedColumn("uuid")
    idDisciplineCategory!: string;

    @Column({ type: 'smallint' })
    period!: number;

    @Column({ type: 'bit', default: 0 })
    is_complete!: number;

    @Column({ type: 'float' })
    total_hours!: number;

    @ManyToOne(() => Discipline, (discipline) => discipline.disciplineClasses)
    discipline!: Discipline;

    @ManyToOne(() => Class, (class_obj) => class_obj.disciplineClasses)
    class!: Class;

    @ManyToOne(() => Instructor, (instructor) => instructor.disciplineClasses)
    instructor!: Instructor;
}