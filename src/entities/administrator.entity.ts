import { Entity, Column, CreateDateColumn, DeleteDateColumn, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { User } from "./user.entity";
import { Institution } from "./institution.entity";

@Entity("administrator")
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

    @OneToOne(() => User)
    @JoinColumn()
    user!: User;

    @ManyToOne(() => Institution, (institution) => institution.administrators)
    institution!: Institution;
}