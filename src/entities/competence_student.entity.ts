import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Competence } from "./competence.entity";
import { Student } from "./student.entity";

export enum CompetenceStatus {
    INAPTO = 'I',
    EM_DESENVOLVIMENTO = 'E',
    APTO = 'A'
}

@Entity('competence_student')
export class CompetenceStudent {
    @PrimaryGeneratedColumn("uuid")
    idCompetenceStudent!: string;

    @Column({type: 'char'})
    status!: CompetenceStatus;

    @ManyToOne(() => Competence, (competence) => competence.students)
    competence!: Competence;

    @ManyToOne(() => Student, (student) => student.competences)
    student!: Student;
}