import { CreateDateColumn, DeleteDateColumn, JoinColumn, OneToOne, UpdateDateColumn, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Institution } from "./institution.entity";

@Entity('instructor')
export class Instructor {
    @PrimaryGeneratedColumn("uuid")
    instructorId!: string;

    @CreateDateColumn({type: 'datetime'})
    createdAt!: Date;

    @UpdateDateColumn({type: 'datetime'})
    updatedAt!: Date;

    @DeleteDateColumn({type: 'datetime'})
    deletedAt?: Date;

    @OneToOne(type => User)
    @JoinColumn()
    user!: User;

    @OneToOne(type => Institution)
    @JoinColumn()
    institution!: Institution;
}