import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Class {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({type: 'varchar', length: 100})
    name!: string;

    @Column({type: 'datetime'})
    dateOfStart!: Date;

    @Column({type: 'datetime', nullable: true})
    dateOfFinish?: Date;

    @Column({type: 'char', length: 1})
    workPeriod!: string;

    @CreateDateColumn({type:  'datetime'})
    createdAt!: Date;

    @UpdateDateColumn({type: 'datetime'})
    updatedAt!: Date;

    @DeleteDateColumn({type: 'datetime', nullable: true})
    deletedAt?: Date;
}