import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AppliedDiscipline } from "./appliedDiscipline.entity";
import { Student } from "./student.entity";

export enum WorkPeriod {
    MORNING = 'm',
    AFTERNOON = 'a'
}

@Entity('student_group')
export class StudentGroup {
    @PrimaryGeneratedColumn("uuid")
    idStudentGroup!: string;

    @Column({type: 'varchar', length: 255})
    name!: string;

    @Column({type: 'datetime'})
    dateOfStart!: Date;

    @Column({type: 'datetime', nullable: true})
    dateOfFinish!: Date | null;

    @Column({type: 'char', length: 1})
    workPeriod!: WorkPeriod;

    @CreateDateColumn({type:  'datetime'})
    createdAt!: Date;

    @UpdateDateColumn({type: 'datetime'})
    updatedAt!: Date;

    @DeleteDateColumn({type: 'datetime', nullable: true})
    deletedAt!: Date | null;

    @OneToMany(() => AppliedDiscipline, (appliedDisciplines) => appliedDisciplines.studentGroup)
    appliedDisciplines!: AppliedDiscipline[];

    @OneToMany(() => Student, (student) => student.studentGroup)
    students!: Student[];
}