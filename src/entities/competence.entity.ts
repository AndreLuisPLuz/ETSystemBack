import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CompetenceGroup } from "./competenceGroup.entity";
import { CompetenceStudent } from "./competenceStudent.entity";

@Entity('competence')
export class Competence {
    @PrimaryGeneratedColumn("uuid")
    idDiscipline!: string;

    @Column({type: 'varchar', length: 255})
    name!: string;

    @Column({type: 'text'})
    description!: string;

    @Column({type: 'smallint'})
    weight!: number;

    @CreateDateColumn({type: 'datetime'})
    createdAt!: Date;

    @UpdateDateColumn({type: 'datetime'})
    updatedAt!: Date;

    @DeleteDateColumn({type: 'datetime', nullable: true})
    deletedAt!: Date | null;

    @OneToMany(() => CompetenceStudent, (competenceStudent) => competenceStudent.competence)
    students!: CompetenceStudent[];

    @ManyToOne(() => CompetenceGroup, (competenceGroup) => competenceGroup.competences)
    competenceGroup!: CompetenceGroup;
}