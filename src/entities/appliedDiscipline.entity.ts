import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Discipline } from "./discipline.entity";
import { StudentGroup } from "./studentGroup.entity";
import { Instructor } from "./instructor.entity";

@Entity('applied_discipline')
export class AppliedDiscipline {

    @PrimaryGeneratedColumn("uuid")
    idAppliedDiscipline!: string;

    @Column({ type: 'smallint' })
    period!: number;

    @Column({ type: 'bit', default: 0 })
    isComplete: boolean = false;

    @Column({ type: 'float' })
    totalHours!: number;

    @ManyToOne(() => Discipline, (discipline) => discipline.appliedDisciplines, {nullable: false})
    discipline!: Discipline;

    @ManyToOne(() => StudentGroup, (studentGroup) => studentGroup.appliedDisciplines, {nullable: false})
    studentGroup!: StudentGroup;

    @ManyToOne(() => Instructor, (instructor) => instructor.appliedDisciplines, {nullable: false})
    instructor!: Instructor;
}