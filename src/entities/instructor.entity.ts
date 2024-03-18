import { CreateDateColumn, DeleteDateColumn, JoinColumn, OneToOne, UpdateDateColumn, Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";
import { User } from "./user.entity";
import { Institution } from "./institution.entity";
import { DisciplineStudentGroup } from "./disciplineStudentGroup.entity";

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

    @OneToMany(() => DisciplineStudentGroup, (disciplineStudentGroup) => disciplineStudentGroup.instructor)
    disciplineStudentGroups!: DisciplineStudentGroup[];
}