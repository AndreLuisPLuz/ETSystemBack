import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Discipline } from "./discipline.entity";
import { Competence } from "./competence.entity";
import { AppliedDiscipline } from "./appliedDiscipline.entity";

@Entity('competence_group')
export class CompetenceGroup {
    @PrimaryGeneratedColumn('uuid')
    idCompetenceGroup!: string;

    @Column({type: "nvarchar", length: 4000})
    description!: string;

    @CreateDateColumn({type: 'datetime'})
    createdAt!: Date;

    @UpdateDateColumn({type: 'datetime'})
    updatedAt!: Date;

    @DeleteDateColumn({type: 'datetime', nullable: true})
    deletedAt!: Date | null;

    @OneToMany(() => Competence, (competence) => competence.competenceGroup)
    competences!: Competence[];

    @ManyToOne(() => AppliedDiscipline, (appliedDiscipline) => appliedDiscipline.competenceGroups)
    appliedDiscipline!: AppliedDiscipline;
}