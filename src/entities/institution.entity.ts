import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Instructor } from "./instructor.entity";
import { Administrator } from "./administrator.entity";
import { User } from "./user.entity";

export enum IsBosch {
    FALSE = 0,
    TRUE
}

@Entity()
export class Institution {
    @PrimaryGeneratedColumn("uuid")
    idInstitution!: string;

    @Column({type: 'varchar', length: 100})
    name!: string;

    @Column({type: 'bit'})
    isBosch!: IsBosch;

    @CreateDateColumn({type: 'datetime'})
    createdAt!: Date;

    @UpdateDateColumn({type: 'datetime'})
    updatedAt!: Date;

    @DeleteDateColumn({type: 'datetime', nullable: true})
    deletedAt!: Date | null;

    @OneToMany(() => User, (user) => user.institution)
    users!: User[];
}