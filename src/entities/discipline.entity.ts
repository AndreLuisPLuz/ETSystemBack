import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { DisciplineCategory } from "./disciplineCategory.entity";
import { CompetenceGroup } from "./competenceGroup.entity";
import { AppliedDiscipline } from "./appliedDiscipline.entity";
import { IsBosch } from "./institution.entity";

@Entity('discipline')
export class Discipline {

    @PrimaryGeneratedColumn("uuid")
    idDiscipline!: string;

    @Column({ type: "varchar", length: 255 })
    name!: string;

    @Column({type: 'bit'})
    isBosch!: IsBosch;

    @CreateDateColumn({type: 'datetime'})
    createdAt!: Date;

    @UpdateDateColumn({type: 'datetime'})
    updatedAt!: Date;

    @DeleteDateColumn({type: 'datetime', nullable: true})
    deletedAt!: Date | null;

    @ManyToOne(() => DisciplineCategory, (disciplineCategory) => disciplineCategory.disciplines)
    disciplineCategory: DisciplineCategory;

    @OneToMany(() => AppliedDiscipline, (appliedDiscipline) => appliedDiscipline.discipline)
    appliedDisciplines!: AppliedDiscipline[];
}