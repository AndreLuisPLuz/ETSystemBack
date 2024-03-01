import { Entity, OneToOne, JoinColumn, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn} from "typeorm";
import { User } from "./user.entity";
import { Class } from "./class.entity";

@Entity('student')
export class Student  {
    @PrimaryGeneratedColumn("uuid")
    idStudent!: string;

    @CreateDateColumn({type: 'datetime'})
    createdAt!: Date;

    @UpdateDateColumn({type: 'datetime'})
    updatedAt!: Date;

    @DeleteDateColumn({type: 'datetime'})
    deletedAt?: Date;

    @OneToOne(type => User)
    @JoinColumn()
    user!: User;

    @OneToOne(type => Class)
    @JoinColumn()
    class!: Class;
}