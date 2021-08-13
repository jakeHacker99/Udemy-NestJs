import { Exclude } from "class-transformer";
import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, AfterRemove, AfterUpdate } from "typeorm";


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    email: string;
    @Column()
    @Exclude()
    password: string;
    @AfterInsert()
    logInsert() {
        console.log("insered user with id ", this.id)
    }

    @AfterUpdate()
    logUpdate() {
        console.log("updated user With id ", this.id)
    }

    @AfterRemove()
    logRemove() {
        console.log("removed user with id ", this.id)
    }
}