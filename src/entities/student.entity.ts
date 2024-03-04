import { Entity, OneToOne, JoinColumn, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany} from "typeorm";
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

    @OneToOne(type => Class)
    @JoinColumn()
    class!: Class;

    @OneToMany(() => CompetenceStudent, (competenceStudent) => competenceStudent.student)
    competences!: CompetenceStudent[];
}