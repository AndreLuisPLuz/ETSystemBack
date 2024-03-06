import { Entity, OneToOne, JoinColumn, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, ManyToOne} from "typeorm";
import { User } from "./user.entity";
import { StudentGroup } from "./studentGroup.entity";
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

    @ManyToOne(() => StudentGroup, (studentGroup) => studentGroup.students)
    studentGroup!: StudentGroup;

    @OneToMany(() => CompetenceStudent, (competenceStudent) => competenceStudent.student)
    competences!: CompetenceStudent[];
}