import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, TableInheritance, UpdateDateColumn } from "typeorm";
import { Student } from "./student.entity";
import { Instructor } from "./instructor.entity";
import { Administrator } from "./administrator.entity";

@Entity('person')
export class User {
    @PrimaryGeneratedColumn("uuid")
    idUser!: string;

    @Column({type: 'varchar', length: 50})
    username!: string;

    @Column({type: 'varchar', length: 255})
    password!: string;

    @Column({type: 'varchar', length: 255, nullable: true})
    name!: string | null;

    @Column({type: 'varchar', length: 255, nullable: true})
    email!: string | null;

    @Column({type: 'datetime', nullable: true})
    dateOfBirth!: Date | null;

    @Column({type: 'varchar', length: 20, nullable: true})
    contact!: string | null;

    @CreateDateColumn({type: 'datetime'})
    createdAt!: Date;

    @UpdateDateColumn({type: 'datetime'})
    updatedAt!: Date;

    @DeleteDateColumn({type: 'datetime', nullable: true})
    deletedAt!: Date | null;

    @OneToOne(() => Student, (student) => student.user)
    student!: Student;

    @OneToOne(() => Instructor, (instructor) => instructor.user)
    instructor!: Instructor;

    @OneToOne(() => Administrator, (administrator) => administrator.user)
    administrator!: Administrator;
}