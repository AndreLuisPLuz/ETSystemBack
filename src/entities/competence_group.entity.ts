import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Discipline } from "./discipline.entity";
import { Competence } from "./competence.entity";

@Entity('competence_group')
export class CompetenceGroup {
    @PrimaryGeneratedColumn('uuid')
    idCompetence!: string;

    @Column({type: 'varchar', length: 255})
    name!: string;

    @CreateDateColumn({type: 'datetime'})
    createdAt!: Date;

    @UpdateDateColumn({type: 'datetime'})
    updatedAt!: Date;

    @DeleteDateColumn({type: 'datetime', nullable: true})
    deletedAt!: Date | null;

    @OneToMany(() => Competence, (competence) => competence.competenceGroup)
    competences!: Competence[];

    @ManyToOne(() => Discipline, (discipline) => discipline.competenceGroups)
    discipline!: Discipline;
}