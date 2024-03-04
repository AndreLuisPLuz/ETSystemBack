import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('competence')
export class Competence {
    @PrimaryGeneratedColumn("uuid")
    id_discipline!: string;

    @Column({type: 'varchar', length: 255})
    name!: string;

    @Column({type: 'text'})
    description!: string;

    @Column({type: 'smallint'})
    weight!: number;

    @CreateDateColumn({type: 'datetime'})
    created_at!: Date;

    @UpdateDateColumn({type: 'datetime'})
    updated_at!: Date;

    @DeleteDateColumn({type: 'datetime', nullable: true})
    deleted_at!: Date | null;

    // @ManyToOne({})
}