import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, TableInheritance, UpdateDateColumn } from "typeorm";

export enum AccessType {
    SENAI = 1,
    BOSCH = 2,
    MASTER = 3
}

@Entity('user')
export class User {
    @PrimaryGeneratedColumn("uuid")
    idUser!: string;

    @Column({type: 'varchar', length: 255})
    name!: string;

    @Column({type: 'varchar', length: 255})
    email!: string;

    @Column({type: 'varchar', length: 255})
    password!: string;

    @Column({type: 'datetime'})
    dateOfBirth!: Date;

    @Column({type: 'varchar', length: 20})
    contact!: string;

    @Column({type: 'smallint'})
    accessType!: number;

    @CreateDateColumn({type: 'datetime'})
    createdAt!: Date;

    @UpdateDateColumn({type: 'datetime'})
    updatedAt!: Date;

    @DeleteDateColumn({type: 'datetime', nullable: true})
    deletedAt?: Date;
}