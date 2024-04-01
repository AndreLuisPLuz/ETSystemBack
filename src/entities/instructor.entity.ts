import { CreateDateColumn, DeleteDateColumn, JoinColumn, OneToOne, UpdateDateColumn, Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";
import { User } from "./user.entity";
import { AppliedDiscipline } from "./appliedDiscipline.entity";

@Entity('instructor')
export class Instructor {
    @PrimaryGeneratedColumn("uuid")
    instructorId!: string;

    @CreateDateColumn({type: 'datetime'})
    createdAt!: Date;

    @UpdateDateColumn({type: 'datetime'})
    updatedAt!: Date;

    @DeleteDateColumn({type: 'datetime'})
    deletedAt!: Date | null;

    @OneToOne(() => User)
    @JoinColumn()
    user!: User;

    @OneToMany(() => AppliedDiscipline, (appliedDiscipline) => appliedDiscipline.instructor)
    appliedDisciplines!: AppliedDiscipline[];
}