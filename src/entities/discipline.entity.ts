import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { DisciplineCategory } from "./disciplineCategory.entity";
import { CompetenceGroup } from "./competence_group.entity";

@Entity('discipline')
export class Discipline {

    @PrimaryGeneratedColumn("uuid")
    idDiscipline!: string;

    @Column({ type: "varchar", length: 255 })
    name!: string;

    @CreateDateColumn({type: 'datetime'})
    createdAt!: Date;

    @UpdateDateColumn({type: 'datetime'})
    updatedAt!: Date;

    @DeleteDateColumn({type: 'datetime', nullable: true})
    deletedAt?: Date;

    @ManyToOne(() => DisciplineCategory, (disciplineCategory) => disciplineCategory.disciplines)
    disciplineCategory: DisciplineCategory

    @OneToMany(() => CompetenceGroup, (competenceGroup) => competenceGroup.discipline)
    competenceGroups: CompetenceGroup[];
}