import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Instructor } from "./instructor.entity";
import { Administrator } from "./administrator.entity";

@Entity()
export class Institution {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({type: 'varchar', length: 100})
    name!: string;

    @Column({type: 'bit'})
    isBosch!: boolean;

    @CreateDateColumn({type: 'datetime'})
    createdAt!: Date;

    @UpdateDateColumn({type: 'datetime'})
    updatedAt!: Date;

    @DeleteDateColumn({type: 'datetime', nullable: true})
    deletedAt!: Date | null;

    @OneToMany(() => Instructor, (instructor) => instructor.institution)
    instructors!: Instructor[];

    @OneToMany(() => Administrator, (administrator) => administrator.institution)
    administrators!: Administrator[];
}