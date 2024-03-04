import { Entity, OneToOne, JoinColumn, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, ManyToOne} from "typeorm";
import { User } from "./user.entity";
import { Class } from "./class.entity";
import { CompetenceStudent } from "./competenceStudent.entity";

@Entity('student')
export class Student  {
    @PrimaryGeneratedColumn("uuid")
    idStudent!: string;

    @CreateDateColumn({type: 'datetime'})
    createdAt!: Date;

    @UpdateDateColumn({type: 'datetime'})
    updatedAt!: Date;

    @DeleteDateColumn({type: 'datetime'})
    deletedAt!: Date | null;

    @OneToOne(type => User)
    @JoinColumn()
    user!: User;

    @ManyToOne(() => Class, (class_obj) => class_obj.students)
    class!: Class;

    @OneToMany(() => CompetenceStudent, (competenceStudent) => competenceStudent.student)
    competences!: CompetenceStudent[];
}