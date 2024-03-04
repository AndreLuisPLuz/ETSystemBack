import { CreateDateColumn, DeleteDateColumn, JoinColumn, OneToOne, UpdateDateColumn, Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";
import { User } from "./user.entity";
import { Institution } from "./institution.entity";
import { DisciplineClass } from "./disciplineClass.entity";

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

    @ManyToOne(() => Institution, (institution) => institution.instructors)
    institution!: Institution;

    @OneToMany(() => DisciplineClass, (disciplineClass) => disciplineClass.instructor)
    disciplineClasses!: DisciplineClass[];
}