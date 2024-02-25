import { ChildEntity, JoinColumn, OneToOne } from "typeorm";
import { Person } from "./person.entity";
import { Institution } from "./institution.entity";

@ChildEntity()
export class Administrator extends Person {
    @OneToOne(type => Institution)
    @JoinColumn()
    institution!: Institution;
}