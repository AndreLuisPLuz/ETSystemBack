import { ChildEntity, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Column } from "typeorm";
import { Person } from "./person.entity";
import { Class } from "./class.entity";

@ChildEntity('student')
export class Student extends Person {
    @OneToOne(type => Class)
    @JoinColumn()
    class!: Class;
}