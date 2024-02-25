import { ChildEntity, CreateDateColumn, DeleteDateColumn, JoinColumn, OneToOne, UpdateDateColumn, Column } from "typeorm";
import { Person } from "./person.entity";
import { Institution } from "./institution.entity";

@ChildEntity('instructor')
export class Instructor extends Person {
    @OneToOne(type => Institution)
    @JoinColumn()
    institution!: Institution;
}