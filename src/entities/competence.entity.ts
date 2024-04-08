import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CompetenceGroup } from "./competenceGroup.entity";

@Entity('competence')
export class Competence {
    @PrimaryGeneratedColumn("uuid")
    idCompetence!: string;

    @Column({type: "nvarchar", length: 4000})
    description!: string;

    @Column({type: 'float'})
    weight!: number;

    @CreateDateColumn({type: 'datetime'})
    createdAt!: Date;

    @UpdateDateColumn({type: 'datetime'})
    updatedAt!: Date;

    @DeleteDateColumn({type: 'datetime', nullable: true})
    deletedAt!: Date | null;

    @ManyToOne(() => CompetenceGroup, (competenceGroup) => competenceGroup.competences)
    competenceGroup!: CompetenceGroup;
}