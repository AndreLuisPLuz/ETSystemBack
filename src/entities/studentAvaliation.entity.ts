import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Student } from "./student.entity";
import { AppliedDiscipline } from "./appliedDiscipline.entity";

@Entity('student_avaliation')
export class StudentAvaliation {
    @PrimaryGeneratedColumn("uuid")
    idStudentAvaliation!: string;

    @Column({type: "float"})
    general_grade!: number;

    @Column({type: "nvarchar", length: 4000})
    competencesJson!: string;

    @Column({type: "nvarchar", length: 4000})
    observations!: string;

    @CreateDateColumn({type:'datetime'})
    createdAt!: Date;

    @ManyToOne(() => Student, (student) => student.avaliations, {nullable: false})
    student!: Student;

    @ManyToOne(() => AppliedDiscipline, (appliedDiscipline) => appliedDiscipline.avaliations, {nullable: false})
    appliedDiscipline!: AppliedDiscipline;
};