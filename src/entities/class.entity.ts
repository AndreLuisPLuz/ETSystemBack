import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { DisciplineClass } from "./disciplineClass.entity";

@Entity('class')
export class Class {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({type: 'varchar', length: 255})
    name!: string;

    @Column({type: 'datetime'})
    dateOfStart!: Date;

    @Column({type: 'datetime', nullable: true})
    dateOfFinish!: Date | null;

    @Column({type: 'char', length: 1})
    workPeriod!: string;

    @CreateDateColumn({type:  'datetime'})
    createdAt!: Date;

    @UpdateDateColumn({type: 'datetime'})
    updatedAt!: Date;

    @DeleteDateColumn({type: 'datetime', nullable: true})
    deletedAt!: Date | null;

    @OneToMany(() => DisciplineClass, (disciplineClass) => disciplineClass.class)
    disciplineClasses!: DisciplineClass[];
}