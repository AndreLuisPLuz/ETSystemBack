import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Discipline } from "./discipline.entity";
import { StudentGroup } from "./studentGroup.entity";
import { Instructor } from "./instructor.entity";

@Entity('discipline_student_group')
export class DisciplineStudentGroup {

    @PrimaryGeneratedColumn("uuid")
    idDisciplineStudentGroup!: string;

    @Column({ type: 'smallint' })
    period!: number;

    @Column({ type: 'bit', default: 0 })
    is_complete!: number;

    @Column({ type: 'float' })
    total_hours!: number;

    @ManyToOne(() => Discipline, (discipline) => discipline.disciplineStudentGroups)
    discipline!: Discipline;

    @ManyToOne(() => StudentGroup, (studentGroup) => studentGroup.disciplineStudentGroups)
    studentGroup!: StudentGroup;

    @ManyToOne(() => Instructor, (instructor) => instructor.disciplineClasses)
    instructor!: Instructor;
}