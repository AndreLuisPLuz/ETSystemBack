import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Discipline } from "./discipline.entity";
import { StudentGroup } from "./studentGroup.entity";
import { Instructor } from "./instructor.entity";

@Entity('applied_discipline')
export class AppliedDiscipline {

    @PrimaryGeneratedColumn("uuid")
    idDisciplineStudentGroup!: string;

    @Column({ type: 'smallint' })
    period!: number;

    @Column({ type: 'bit', default: 0 })
    is_complete!: number;

    @Column({ type: 'float' })
    total_hours!: number;

    @ManyToOne(() => Discipline, (discipline) => discipline.appliedDisciplines)
    discipline!: Discipline;

    @ManyToOne(() => StudentGroup, (studentGroup) => studentGroup.appliedDisciplines)
    studentGroup!: StudentGroup;

    @ManyToOne(() => Instructor, (instructor) => instructor.appliedDisciplines)
    instructor!: Instructor;
}