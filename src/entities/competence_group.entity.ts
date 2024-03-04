import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('competence_group')
export class CompetenceGroup {
    @PrimaryGeneratedColumn('uuid')
    id_competence!: string;

    @Column({type: 'varchar', length: 255})
    name!: string;

    @CreateDateColumn({type: 'datetime'})
    created_at!: Date;

    @UpdateDateColumn({type: 'datetime'})
    updated_at!: Date;

    @DeleteDateColumn({type: 'datetime', nullable: true})
    deleted_at!: Date | null;
}