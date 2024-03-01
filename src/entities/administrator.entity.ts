import { ChildEntity, Column, CreateDateColumn, DeleteDateColumn, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { Institution } from "./institution.entity";

@ChildEntity()
export class Administrator {
    @PrimaryGeneratedColumn("uuid")
    administratorId!: string;

    @Column({type: 'bit', default: 0})
    isMaster: boolean = false;

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